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

  // get paraphrase and check progress
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

  // Method - Add paraphrases to subject and refresh list

  const updateInspection = async (booleanInput) => {
    try {
      // First check if an inspection already exists for this user and paraphrase
      const existingInspections = await listDocs({
        collection: "inspections",
        filter: {
          data: {
            inspector_id: user.key,
            paraphrase_id: paraphrases[index][1],
          },
        },
      });

      const updatedData = {
        ...transaction,
        inspector_id: user.key,
        isValid: booleanInput,
        paraphrase_id: paraphrases[index][1],
      };

      // Handle existing or new inspection appropriately
      if (existingInspections.items.length > 0) {
        // Update existing inspection
        const existingInspection = existingInspections.items[0];
        await setDoc({
          collection: "inspections",
          doc: {
            key: existingInspection.key,
            data: updatedData,
            version: existingInspection.version, // Include version
          },
        });
      } else {
        // Create new inspection
        const key = nanoid();
        await setDoc({
          collection: "inspections",
          doc: {
            key,
            data: updatedData,
          },
        });
      }

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

    } catch (error) {
      console.error("Error updating inspection:", error);
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
          key: data.key,
          data: updatedData,
          version: data.version
        },
      });
    } catch (error) {
      console.log("Error updating votes", error);
    }
  };

  const advanceIndex = () => {
    if (index + 1 > paraphrases.length) {
      return;
    }

    setIndex(index + 1);
    setCurrentCount(paraphrases[index][1]);
    setIsSubmitted(false);
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
          className="absolute left-8 top-8 flex items-center gap-2 px-4 py-2 text-[#d4d4d4] bg-[#333333] rounded-lg border border-[#404040] hover:bg-[#3c3c3c] transition-colors"
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

        <div className="mt-24 w-[95%] flex flex-row gap-8">
          {/* Left Section - Inspection Area */}
          <section className="w-[65%] rounded-xl bg-[#2d2d2d] p-8 border border-[#404040] shadow-lg">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-[#d4d4d4] mb-2">{projectTitle}</h1>
              <div className="h-1 w-24 bg-gradient-to-r from-[#F58853] to-[#4C85FB] rounded-full" />
            </div>

            <div>
              <label className="text-[#d4d4d4] mb-2 block">Original Subject:</label>
              <div className="mb-6 p-4 bg-[#333333] rounded-lg border border-[#404040]">
                <p className="text-xl text-[#d4d4d4] italic">{subject.title}</p>
              </div>

              <label className="text-[#d4d4d4] mb-2 block">Paraphrase:</label>
              <div className="mb-6 p-4 bg-[#333333] rounded-lg border border-[#404040]">
                <p className="text-xl text-[#d4d4d4] italic">
                  {paraphrases.length > 0 && paraphrases[index]
                    ? paraphrases[index][0]
                    : "Loading..."}
                </p>
              </div>

              {/* Inspection Actions */}
              {isSubmitted ? (
                <button
                  onClick={advanceIndex}
                  className="w-full py-3 bg-gradient-to-r from-[#F58853] to-[#4C85FB] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Next ➡️
                </button>
              ) : (
                <div className="flex gap-4">
                  <button
                    onClick={() => updateInspection(true)}
                    className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Approve ✅
                  </button>
                  <button
                    onClick={() => updateInspection(false)}
                    className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reject ❌
                  </button>
                </div>
              )}

              {/* Progress Indicator */}
              <div className="mt-6 p-4 bg-[#333333] rounded-lg border border-[#404040]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#d4d4d4]">Inspection Progress</span>
                  <span className="text-[#d4d4d4]">
                    {currentCount ? `${Math.round((currentCount / validationsNeeded) * 100)}%` : '0%'}
                  </span>
                </div>
                <div className="h-2 bg-[#404040] rounded-full">
                  <div
                    className="h-full bg-gradient-to-r from-[#F58853] to-[#4C85FB] rounded-full transition-all"
                    style={{
                      width: `${currentCount ? Math.round((currentCount / validationsNeeded) * 100) : 0}%`,
                    }}
                  />
                </div>
                <p className="mt-2 text-xs text-[#a0a0a0]">Subject ID: {subject.id}</p>
              </div>

              {/* See Additional Examples Button */}
              <button
                onClick={() => document.getElementById('examples-modal').showModal()}
                className="mt-6 w-full py-3 bg-[#333333] text-[#d4d4d4] rounded-lg border border-[#404040] hover:bg-[#3c3c3c] transition-colors"
              >
                See Additional Examples
              </button>
            </div>
          </section>

          {/* Right Section - Guidelines */}
          <section className="w-[35%] rounded-xl bg-[#2d2d2d] p-8 border border-[#404040] shadow-lg">
            <h2 className="text-xl font-bold text-[#d4d4d4] mb-6">Guidelines for Inspecting 🔍</h2>
            
            <div className="mb-6">
              <h3 className="text-[#d4d4d4] mb-2 font-semibold">What should I approve?</h3>
              <ul className="space-y-2 text-[#a0a0a0]">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Original meaning of sentence is preserved
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Paraphrased statement is relevant and accurate
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Keywords are present
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-[#d4d4d4] mb-2 font-semibold">What should I reject?</h3>
              <ul className="space-y-2 text-[#a0a0a0]">
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  Paraphrase simply replaces words
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  Paraphrase changes the meaning of the original text
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  Poor grammar, typos and awkward phrasing
                </li>
              </ul>
            </div>

            <GuidelineModal />
          </section>
        </div>

        {/* Examples Modal */}
        <dialog id="examples-modal" className="modal bg-[#1e1e1e]/80">
          <div className="modal-box max-w-4xl max-h-[80vh] bg-[#2d2d2d] text-[#d4d4d4] overflow-hidden">
            <h3 className="font-bold text-lg mb-4">Additional Examples</h3>
            <div className="overflow-y-auto max-h-[calc(80vh-8rem)]">
              <table className="w-full">
                <thead className="sticky top-0 bg-[#2d2d2d]">
                  <tr className="border-b border-[#404040]">
                    <th className="py-3 px-4 text-left">Original Subject</th>
                    <th className="py-3 px-4 text-left">Paraphrases</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#404040]">
                    <td className="py-4 px-4 align-top">I want to order bak chor mee.</td>
                    <td className="py-4 px-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-green-500">
                          <span>✓</span> Can I have a plate of bak chor mee?
                        </div>
                        <div className="flex items-center gap-2 text-red-500">
                          <span>✗</span> I want to eat chicken rice. <span className="text-[#a0a0a0] text-sm">(not relevant)</span>
                        </div>
                        <div className="flex items-center gap-2 text-red-500">
                          <span>✗</span> I am consumed by the great desire to devour some bak chor mee now. <span className="text-[#a0a0a0] text-sm">(not natural)</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[#404040]">
                    <td className="py-4 px-4 align-top">How do I get to Marina Bay Sands?</td>
                    <td className="py-4 px-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-green-500">
                          <span>✓</span> What's the best way to reach Marina Bay Sands?
                        </div>
                        <div className="flex items-center gap-2 text-green-500">
                          <span>✓</span> Could you direct me to Marina Bay Sands?
                        </div>
                        <div className="flex items-center gap-2 text-red-500">
                          <span>✗</span> Where is Sentosa? <span className="text-[#a0a0a0] text-sm">(different location)</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[#404040]">
                    <td className="py-4 px-4 align-top">The museum opens at 9 AM daily.</td>
                    <td className="py-4 px-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-green-500">
                          <span>✓</span> You can visit the museum from 9 AM every day.
                        </div>
                        <div className="flex items-center gap-2 text-red-500">
                          <span>✗</span> The museum open at 9 AM daily. <span className="text-[#a0a0a0] text-sm">(grammatical error)</span>
                        </div>
                        <div className="flex items-center gap-2 text-red-500">
                          <span>✗</span> The museum closes at 6 PM. <span className="text-[#a0a0a0] text-sm">(different information)</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-action mt-4 sticky bottom-0 bg-[#2d2d2d] py-2">
              <form method="dialog">
                <button className="px-4 py-2 bg-[#333333] rounded-lg border border-[#404040] hover:bg-[#3c3c3c] transition-colors">
                  Close
                </button>
              </form>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        <div className="mt-8 flex justify-center">
          <FeedbackButton id={location.state} />
        </div>
      </div>
    </motion.div>
  );
};

export default InspectPage;
