//-----------Libraries-----------//
import { useContext, useState, useEffect } from "react";
import { useParams, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { getDoc, listDocs, setDoc } from "@junobuild/core";
import { nanoid } from "nanoid";

//-----------Components-----------//
import FeedbackButton from "../Components/FeedbackButton";

//-----------Providers-----------//
import { AuthContext } from "../Auth";
import GuidelineModal from "../Components/Inspect/GuidelineModal";

const InspectPage = () => {
  const { user } = useContext(AuthContext);

  // Project Data
  const { id } = useParams(); // Project ID
  const [projectTitle, setProjectTitle] = useState("");
  const [validationsNeeded, setValidationsNeeded] = useState(0);
  const approvalRate = 0.1;

  // Subject data
  const [subject, setSubject] = useState([]);
  const [paraphrases, setParaphrases] = useState([]);
  const location = useLocation(); // Subject ID

  // Paraphrase data
  const [currentCount, setCurrentCount] = useState(0);
  let [index, setIndex] = useState(0);

  // Other variables
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Inspector transaction format
  const [transaction, setTransaction] = useState({
    inspector_id: "", // UserId
    project_title: "",
    subject_id: location.state,
    paraphrase_id: "", // paraphrase being reviewed
    gem_payout: 0,
    isValid: null,
  });

  // Rewards transaction format
  // const [reward, setReward] = useState({
  //   project_title: "",
  //   subject_id: location.state,
  //   miner_id: "",
  //   inspector_id: "",
  //   paraphrase_id: "", // paraphrase being reviewed
  //   gem_payout: 0,
  // });

  // Get subject data - for title
  const getSubject = async () => {
    const item = await getDoc({
      collection: "projects",
      key: id,
    });

    setProjectTitle(item.data.title);
    setValidationsNeeded(item.data.validations_needed);

    const filteredData = item.data.subjects.find(
      (subject) => subject.id === location.state,
    );

    console.log("getSubject", filteredData);

    setSubject(filteredData);
  };

  // get parahrase and check progress
  const getParaphrase = async () => {
    try {
      const data = await listDocs({
        collection: "paraphrases",
      });
      // Find paraphrases with the subject
      const filteredData = data.items.filter(
        (item) => item.data.subject_id === location.state,
      );

      let results = [];

      filteredData.forEach((item) => {
        results.push([
          item.data.paraphrase,
          item.key,
          item.data.approvalCount + item.data.rejectionCount,
        ]);
      });
      setCurrentCount(results[index][2]);
      setParaphrases(results);

      console.log("getParaphrases", results);
    } catch (error) {
      console.error("Error retrieving paraphrases:", error);
    }
  };

  // Initial page call
  useEffect(() => {
    getSubject();
    getParaphrase();
  }, []);

  // Method - Add paraphases to subject and refresh list

  const updateInspection = async (booleanInput) => {
    try {
      const key = nanoid();

      const updatedData = {
        ...transaction,
        inspector_id: user.key,
        isValid: booleanInput,
        paraphrase_id: paraphrases[index][1],
      };

      // Step 1: Inspections - Add transaction validation
      await setDoc({
        collection: "inspections",
        doc: {
          key,
          data: updatedData,
        },
      });

      console.log(`${booleanInput ? "Approved" : "Rejected"}`, updatedData);

      // Step 2: Paraphrase - Update approval count and check for isApproved
      updateParaphraseVotes(booleanInput);

      // Reset tx input to blank
      setTransaction({
        paraphrase_id: "",
        isValid: null,
      });

      // Shift to next para
      setIsSubmitted(true);

      // Step 3: Rewards - Create transaction reward (KIV)
    } catch (error) {
      console.error("Error updating insepection:", error);
    }
  };

  const updateParaphraseVotes = async (booleanInput) => {
    try {
      const data = await getDoc({
        collection: "paraphrases",
        key: paraphrases[index][1],
      });
      console.log("updateParaphraseVotes", data);

      let approval, rejection;
      let validate = null;
      // Update vote based on boolean input & check for approvalRate reached
      if (booleanInput) {
        approval = data.data.approvalCount + 1;
        rejection = data.data.rejectionCount;
        if (approval >= validationsNeeded * approvalRate) validate = true;
      } else {
        approval = data.data.approvalCount;
        rejection = data.data.rejectionCount + 1;
        if (rejection >= validationsNeeded * approvalRate) validate = false;
      }

      setCurrentCount(approval + rejection);

      const updatedData = {
        ...data.data,
        isApproved: validate,
        approvalCount: approval,
        rejectionCount: rejection,
      };

      await setDoc({
        collection: "paraphrases",
        doc: {
          ...data,
          data: updatedData,
        },
      });
    } catch (error) {
      console.log("Error updating votes", error);
    }
  };

  const advanceIndex = async () => {
    try {
      // Refresh the paraphrases data first to get accurate count
      const data = await listDocs({
        collection: "paraphrases",
      });
      // Find paraphrases with the subject
      const filteredData = data.items.filter(
        (item) => item.data.subject_id === location.state,
      );

      let results = [];
      filteredData.forEach((item) => {
        results.push([
          item.data.paraphrase,
          item.key,
          item.data.approvalCount + item.data.rejectionCount,
        ]);
      });

      // Now check if we're at the end with fresh data
      if (index + 1 >= results.length) {
        // If we're at the end, show a message or handle it appropriately
        console.log("No more paraphrases to review");
        return;
      }

      // Advance to the next paraphrase
      const nextIndex = index + 1;
      console.log(`Moving from paraphrase ${index} to ${nextIndex}`);

      // Set the new index
      setIndex(nextIndex);

      // Update paraphrases state with fresh data
      setParaphrases(results);

      // Update the current count for the next paraphrase
      if (results[nextIndex] && results[nextIndex][2] !== undefined) {
        console.log(`Setting current count to ${results[nextIndex][2]}`);
        setCurrentCount(results[nextIndex][2]);
      } else {
        console.log("Count data not available for next paraphrase");
      }

      // Reset the submitted state
      setIsSubmitted(false);

      console.log("Successfully advanced to next paraphrase");
    } catch (error) {
      console.error("Error advancing to next paraphrase:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <div className="absolute left-1/2 top-1/2 z-30 flex h-full w-full -translate-x-1/2 -translate-y-[50%] transform flex-col items-center bg-[#1A1A1A] shadow-xl">
        {/* Back Button */}
        <NavLink
          to={`/project/${id}`}
          className="absolute left-8 top-8 flex items-center gap-2 rounded-lg border border-[#404040] bg-[#333333] px-4 py-2 text-[#d4d4d4] transition-colors hover:bg-[#3c3c3c]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Project
        </NavLink>

        <div className="mt-24 flex w-[95%] flex-row gap-8">
          {/* Left Section - Inspection Area */}
          <section className="w-[65%] rounded-xl border border-[#404040] bg-[#2d2d2d] p-8 shadow-lg">
            <div className="mb-8">
              <h1 className="mb-2 text-2xl font-bold text-[#d4d4d4]">
                {projectTitle}
              </h1>
              <div className="h-1 w-24 rounded-full bg-gradient-to-r from-[#4C85FB] to-[#F58853]" />
            </div>

            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-[#d4d4d4]">
                Task:{" "}
                <span className="bg-gradient-to-r from-[#4C85FB] to-[#F58853] bg-clip-text text-transparent">
                  Rephrase these requests for an FAQ page
                </span>
              </h2>

              {/* Original Subject */}
              <div className="mb-6">
                <p className="mb-2 text-[#a0a0a0]">Original Subject:</p>
                <div className="group relative overflow-hidden rounded-xl border border-[#404040] bg-[#333333] p-6 transition-all duration-300 hover:border-[#4C85FB]">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4C85FB] to-[#F58853] opacity-0 transition-opacity group-hover:opacity-10" />
                  <p className="relative z-10 text-xl italic text-[#d4d4d4]">
                    {subject.title}
                  </p>
                </div>
              </div>

              {/* Paraphrase */}
              <div className="mb-6">
                <p className="mb-2 text-[#a0a0a0]">Paraphrase:</p>
                <div className="relative overflow-hidden rounded-xl border border-[#404040] bg-[#333333] p-6 transition-all duration-300">
                  <p className="text-xl italic text-[#4C85FB]">
                    {paraphrases.length > 0 && paraphrases[index]
                      ? paraphrases[index][0]
                      : "Loading..."}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-center gap-4">
                {isSubmitted ? (
                  <button
                    onClick={advanceIndex}
                    className="rounded-lg bg-gradient-to-r from-[#4C85FB] to-[#4169E1] px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
                  >
                    Next ➡️
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => updateInspection(true)}
                      className="rounded-lg bg-gradient-to-r from-[#4C85FB] to-[#4169E1] px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
                    >
                      Approve ✅
                    </button>
                    <button
                      onClick={() => updateInspection(false)}
                      className="rounded-lg bg-[#404040] px-6 py-3 font-medium text-[#d4d4d4] transition-colors hover:bg-[#505050]"
                    >
                      Reject ❌
                    </button>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* Right Section - Guidelines & Progress */}
          <section className="w-[35%] space-y-8">
            {/* Progress Card */}
            <div className="rounded-xl border border-[#404040] bg-[#2d2d2d] p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-bold text-[#d4d4d4]">
                Inspection Progress
              </h2>
              <div className="space-y-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[#a0a0a0]">Progress</span>
                  <span className="font-medium text-[#4C85FB]">
                    {currentCount
                      ? `${Math.round((currentCount / validationsNeeded) * 100)}%`
                      : "0%"}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#333333]">
                  <div
                    className="h-full rounded-full bg-[#4C85FB]"
                    style={{
                      width: `${currentCount ? Math.round((currentCount / validationsNeeded) * 100) : 0}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-[#a0a0a0]">
                  Subject ID: {subject.id}
                </p>
              </div>
            </div>

            {/* Guidelines Card */}
            <div className="rounded-xl border border-[#404040] bg-[#2d2d2d] p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-bold text-[#d4d4d4]">
                Guidelines for Inspecting 🔍
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-lg font-medium text-[#4C85FB]">
                    What to Approve
                  </h3>
                  <ul className="list-disc space-y-2 pl-5 text-[#d4d4d4]">
                    <li>Original meaning of sentence is preserved</li>
                    <li>Paraphrased statement is relevant and accurate</li>
                    <li>Keywords are present</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium text-[#F58853]">
                    What to Reject
                  </h3>
                  <ul className="list-disc space-y-2 pl-5 text-[#d4d4d4]">
                    <li>Paraphrase simply replaces words</li>
                    <li>Paraphrase changes the meaning of the original text</li>
                    <li>Poor grammar, typos, and awkward phrasing</li>
                  </ul>
                </div>

                <button
                  onClick={() =>
                    document.getElementById("guideline_modal").showModal()
                  }
                  className="w-full rounded-lg border border-[#404040] bg-[#333333] py-2 text-sm text-[#d4d4d4] transition-colors hover:bg-[#3c3c3c]"
                >
                  View Additional Examples
                </button>
              </div>
            </div>
          </section>
        </div>

        <FeedbackButton id={location.state} />
      </div>
      <GuidelineModal />
    </motion.div>
  );
};

export default InspectPage;
