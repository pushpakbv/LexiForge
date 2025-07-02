//-----------Libraries-----------//
import { useContext, useState, useEffect } from "react";
import { useParams, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { getDoc, listDocs, setDoc, deleteDoc } from "@junobuild/core";
import { nanoid } from "nanoid";

//-----------Components-----------//
import { MineProgressBar } from "../Details/ProgressBar";
import InputSubjects from "../Details/InputSubjects";

//-----------Providers-----------//
import { AuthContext } from "../Auth";
import FeedbackButton from "../components/FeedbackButton";

const MinePage = () => {
  const { user } = useContext(AuthContext);

  // Project Data
  const { id } = useParams(); // Project ID
  const [paraphraseCount, setParaphraseCount] = useState(0); // Parapharse_needed for proj
  const [projectTitle, setProjectTitle] = useState("");

  // Subject data
  const [subject, setSubject] = useState([]);
  const [paraphrases, setParaphrases] = useState([]);
  const location = useLocation(); // Subject ID

  // Other variables
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [progress, setProgress] = useState(0);

  // Miner transaction format
  const [transaction, setTransaction] = useState({
    project_title: "",
    miner_id: "", // UserId
    subject_id: location.state,
    paraphrase: "",
    gem_payout: 0,
    isApproved: null,
    approvalCount: 0,
    rejectionCount: 0,
  });

  // Get subject data - for title
  const getSubject = async () => {
    const item = await getDoc({
      collection: "projects",
      key: id,
    });

    setParaphraseCount(item.data.paraphrases_needed);
    setProjectTitle(item.data.title);

    const filteredData = item.data.subjects.find(
      (subject) => subject.id === location.state,
    );

    console.log("subject data", filteredData);

    setSubject(filteredData);
  };

  useEffect(() => {
    getSubject();
    getParaphrase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Method - Add paraphases to subject and refresh list
  const updateParaphrase = async () => {
    try {
      const para_id = nanoid();

      const updatedData = {
        ...transaction,
        miner_id: user.key,
      };

      await setDoc({
        collection: "paraphrases",
        doc: {
          key: para_id,
          data: updatedData,
        },
      });

      console.log("Paraphrase updated successfully", updatedData);

      // Reset form to blank
      setTransaction({
        miner_id: "",
        subject_id: location.state,
        paraphrase: "",
        isApproved: null,
      });

      getParaphrase();
    } catch (error) {
      console.error("Error updating paraphrases:", error);
    }
  };

  // get parahrase and check progress
  const getParaphrase = async () => {
    try {
      const data = await listDocs({
        collection: "paraphrases",
      });

      const filteredData = data.items.filter(
        (item) => item.data.subject_id === location.state,
      );

      console.log("filter paraphrases", filteredData);

      const taskProgress = filteredData.length;
      console.log(taskProgress);

      if (taskProgress !== Infinity) setProgress(taskProgress);

      setParaphrases(filteredData);
    } catch (error) {
      console.error("Error retrieving paraphrases:", error);
    }
  };

  // Table status for approval
  const getApprovalStatus = (isApproved) => {
    if (isApproved === null) {
      return "Pending";
    } else if (isApproved === true) {
      return "Approved ✅";
    } else {
      return "Rejected ❌";
    }
  };

  // Helper function text change for transaction
  const textChange = (e) => {
    const name = e.target.id;
    let value = e.target.value;
    // value = value.replace("$", "");
    setTransaction((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  // Input validation for response
  const isFilled = () => {
    return transaction.paraphrase.trim() !== "";
  };

  // Check against existing parapharses for current subject for duplicates
  const checkForDuplicateParaphrase = () => {
    const newParaphrase = transaction.paraphrase.trim().toLowerCase();

    // Loop through object to check
    for (let obj of paraphrases) {
      const existingParaphrase = obj.data.paraphrase.trim().toLowerCase();
      if (newParaphrase === existingParaphrase) {
        return false;
      }
    }
    return true;
  };

  // Valid new parapharse (not empty + not duplicate)
  const isValidParaphrase = () => {
    return isFilled() && checkForDuplicateParaphrase();
  };

  const deletePara = async (item) => {
    console.log("delete", item);
    try {
      // Delete item based on key
      await deleteDoc({
        collection: "paraphrases",
        doc: item,
      });
      // Refresh list
      await getParaphrase();
    } catch (err) {
      console.error("Unable to delete", err);
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
          {/* Left Section - Mining Area */}
          <section className="w-[65%] rounded-xl bg-[#2d2d2d] p-8 border border-[#404040] shadow-lg">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-[#d4d4d4] mb-2">{projectTitle}</h1>
              <div className="h-1 w-24 bg-gradient-to-r from-[#F58853] to-[#4C85FB] rounded-full" />
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#d4d4d4] mb-4">
                Task: <span className="bg-gradient-to-r from-[#F58853] to-[#4C85FB] bg-clip-text text-transparent">
                  Rephrase these requests for an FAQ page
                </span>
              </h2>
              <div className="p-6 rounded-xl bg-[#333333] border border-[#404040] relative overflow-hidden group transition-all duration-300 hover:border-[#F58853]">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-r from-[#F58853] to-[#4C85FB]" />
                <p className="text-xl text-[#d4d4d4] italic relative z-10">
                  {subject.title}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#d4d4d4]">Enter your response:</h3>
              <div className="relative">
                <InputSubjects
                  id="paraphrase"
                  placeholder="Enter your paraphrased version here..."
                  handleChange={textChange}
                  value={transaction.paraphrase}
                  className="w-full p-4 bg-[#333333] text-[#d4d4d4] rounded-lg border border-[#404040] focus:border-[#F58853] transition-colors"
                />
                <button
                  onClick={updateParaphrase}
                  disabled={!isValidParaphrase()}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isValidParaphrase()
                      ? 'bg-gradient-to-r from-[#F58853] to-[#4C85FB] text-white hover:opacity-90'
                      : 'bg-[#404040] text-[#a0a0a0] cursor-not-allowed'
                  }`}
                >
                  Submit
                </button>
              </div>
              {!checkForDuplicateParaphrase() && (
                <p className="text-red-500 text-sm">
                  ❌ Duplicate paraphrase, please enter a different answer.
                </p>
              )}
            </div>
          </section>

          {/* Right Section - Progress & Responses */}
          <section className="w-[35%] space-y-8">
            {/* Progress Card */}
            <div className="rounded-xl bg-[#2d2d2d] p-6 border border-[#404040] shadow-lg">
              <h2 className="text-xl font-bold text-[#d4d4d4] mb-4">Task Progress</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#a0a0a0]">Mining Progress</span>
                  <span className="text-[#F58853] font-medium">
                    {progress ? `${Math.round((progress / paraphraseCount) * 100)}%` : "0%"}
                  </span>
                </div>
                <MineProgressBar
                  progress={(progress / paraphraseCount) * 100}
                  color="bg-[#F58853]"
                  bar="bg-[#333333]"
                />
                <p className="text-xs text-[#a0a0a0]">
                  Subject ID: {subject.id}
                </p>
              </div>
            </div>

            {/* Responses Card */}
            <div className="rounded-xl bg-[#2d2d2d] p-6 border border-[#404040] shadow-lg">
              <h2 className="text-xl font-bold text-[#d4d4d4] mb-4">Your Responses</h2>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {paraphrases.map((paraphrase) => (
                  <div 
                    key={paraphrase.key}
                    className="p-4 bg-[#333333] rounded-lg border border-[#404040] group hover:border-[#F58853] transition-colors"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <p className="text-[#d4d4d4] text-sm">
                        {paraphrase.data.paraphrase}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs ${
                          paraphrase.data.isApproved === true
                            ? 'text-green-500'
                            : paraphrase.data.isApproved === false
                            ? 'text-red-500'
                            : 'text-[#a0a0a0]'
                        }`}>
                          {getApprovalStatus(paraphrase.data.isApproved)}
                        </span>
                        <button
                          onClick={() => deletePara(paraphrase)}
                          className="text-xs text-red-500 hover:text-red-400 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {paraphrases.length === 0 && (
                  <div className="text-center py-8 text-[#a0a0a0]">
                    No responses yet
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        <FeedbackButton id={location.state} />
      </div>
    </motion.div>
  );
};

export default MinePage;
