//-----------Library-----------//
import { useContext, useState } from "react";
// import axios from "axios";
import { setDoc } from "@junobuild/core";
import { nanoid } from "nanoid";

//-----------Components-----------//
import InputText from "../../Details/InputText.jsx";
import { Button } from "../../Details/Button.jsx";
import InputNumber from "../../Details/InputNumber.jsx";
import InputSubjects from "../../Details/InputSubjects.jsx";

//-----------Utilities-----------//
import { AuthContext } from "../../Auth.jsx";

const NewProject = () => {
  const { user } = useContext(AuthContext);

  // Project data structure
  const [formInfo, setFormInfo] = useState({
    title: "",
    creator_id: "",
    subjects: [],
    language: "",
    miner_payout: 10,
    inspector_payout: 1,
    paraphrases_needed: 20,
    validations_needed: 10,
    creation_date: "", // Set to current date
  });

  // Subject data structure
  const [subject, setSubject] = useState({
    id: "",
    title: "",
    isMined: false,
    isValidated: false,
    completion_date: "",
  });

  const textChange = (e) => {
    const name = e.target.id;
    let value = e.target.value;
    // value = value.replace("$", "");
    setFormInfo((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const subjectTextChange = (e) => {
    const name = e.target.id;
    let value = e.target.value;

    const key = nanoid(); // Not an efficent way of adding id - changes with each text input

    setSubject((prevState) => {
      return { ...prevState, [name]: value, id: key };
    });
  };

  // Add subject to project
  const addSubject = (e) => {
    e.preventDefault();

    setFormInfo((prevState) => {
      return { ...prevState, subjects: [...prevState.subjects, subject] };
    });
    console.log("Project", formInfo);

    // Set to blank
    setSubject({
      id: "",
      title: "",
      paraphrases: [],
      isMined: false,
      isValidated: false,
      completion_date: "",
    });
  };

  // Input validation to prevent empty subjects from being submitted
  const isFilled = () => {
    return subject.title.trim() !== "";
  };

  // Remove subject yet to push as a project
  const deleteSubject = (id) => {
    // Filter out the subject with the matching id
    const updatedSubjects = formInfo.subjects.filter(
      (subject) => subject.id !== id,
    );

    // Update formInfo with the filtered subjects
    setFormInfo((prevState) => {
      return { ...prevState, subjects: updatedSubjects };
    });
  };

  const selectChange = (e) => {
    const value = e.target.value;
    setFormInfo((prevState) => {
      return { ...prevState, language: value };
    });
  };

  // Data validation
  // const isFilled = () => {
  //   return (
  //     formInfo.title.trim() !== "" &&
  //     formInfo.subjects.trim() !== "" &&
  //     formInfo.languages.trim() !== "" &&
  //     formInfo.builder_payout.trim() !== "" &&
  //     formInfo.validator_payout.trim() !== "" &&
  //     formInfo.time_required_min.trim() !== ""
  //   );
  // };

  const postNewProject = async () => {
    try {
      // Generate random id
      const key = nanoid();

      const updatedFormInfo = {
        ...formInfo,
        creator_id: user.key, // Update with the sponsor id
        creation_date: new Date().toISOString(), // Set creation_date to current date and time
      };

      await setDoc({
        collection: "projects",
        doc: {
          key,
          data: updatedFormInfo,
        },
      });
      document.getElementById("new_project_modal").close(); // Close modal if successful
      //Set form to blank
      setFormInfo({
        title: "",
        sponsor_id: "",
        builders_id: [], // user_id
        validators_id: [],
        subjects: [],
        languages: [],
        builder_payout: 0,
        validator_payout: 0,
        creation_date: "", // Set to current date
      });
      console.log("Uploaded Project", updatedFormInfo);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button
        className="btn bg-creatorDark text-white hover:bg-creatorDark"
        onClick={() => document.getElementById("new_project_modal").showModal()}
      >
        Create New Project
      </button>
      <dialog id="new_project_modal" className="modal">
        <div className="modal-box shadow-lg">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2 ">
              ✕
            </button>
          </form>
          <h1 className=" text-[20px] font-bold ">Create New Project</h1>
          <h2 className=" mb-2 text-[10px] ">* indicates a required field</h2>
          <form className="grid grid-cols-2 gap-y-1 text-black">
            <p>Project title:*</p>
            <InputText
              id="title"
              placeholder="Fintech Chatbot"
              handleChange={textChange}
              value={formInfo.title}
            />

            <p>Miner Payout (Gems): *</p>
            <InputNumber
              id="miner_payout"
              type="number"
              step="1"
              min="10"
              placeholder="10"
              handleChange={textChange}
              value={formInfo.miner_payout}
            />

            <p>Inspector Payout (Gems): *</p>
            <InputNumber
              id="inspector_payout"
              type="number"
              step="1"
              min="1"
              placeholder="1"
              handleChange={textChange}
              value={formInfo.inspector_payout}
            />

            <p>Paraphrases Needed: *</p>
            <InputNumber
              id="paraphrases_needed"
              type="number"
              step="10"
              min="20"
              placeholder="20"
              handleChange={textChange}
              value={formInfo.paraphrases_needed}
            />

            <p>Inspections Needed: *</p>
            <InputNumber
              id="validations_needed"
              type="number"
              step="1"
              min="10"
              placeholder="10"
              handleChange={textChange}
              value={formInfo.validations_needed}
            />

            <p>Language: *</p>

            <select
              className="border-text text-text h-12 w-full rounded-lg border-[1px] bg-transparent p-2 hover:translate-y-[-2px] hover:border-[2px]"
              onChange={(e) => selectChange(e)}
              id="language"
              defaultValue="" // Set the defaultValue to an empty string
            >
              <option value="0" disabled>
                Choose One
              </option>
              <option value="English">English</option>
              <option value="Chinese">Chinese</option>
              <option value="Spanish">Spanish</option>
              <option value="German">German</option>
              <option value="Japanese">Japanese</option>
            </select>

            <p className="">Subjects:</p>
            <InputSubjects
              id="title"
              // placeholder=""
              handleChange={subjectTextChange}
              value={subject.title}
              onClick={addSubject}
              disabled={!isFilled()}
            />
            <div className="ml-2 mr-6 h-min rounded-lg bg-creatorLight px-2 font-bold">
              Gem cost:{" "}
              {formInfo.subjects.length *
                formInfo.miner_payout *
                formInfo.paraphrases_needed +
                formInfo.subjects.length *
                  formInfo.inspector_payout *
                  formInfo.paraphrases_needed *
                  formInfo.validations_needed}{" "}
              💎
            </div>
            {/* Display list of subjects adding */}
            <ul>
              {formInfo.subjects.map((subject) => {
                return (
                  <li
                    key={subject.id}
                    className="my-1 flex items-center justify-between rounded-lg bg-creatorDark px-2"
                  >
                    <label className="text-sm text-white">
                      {subject.title}
                    </label>
                    <button
                      onClick={() => deleteSubject(subject.id)}
                      className="text-xs text-white hover:font-semibold"
                    >
                      <svg
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 29 29"
                        fill="currentColor"
                      >
                        <g>
                          <rect
                            fill="none"
                            className="opacity-25"
                            width="29"
                            height="29"
                          />
                          <path
                            fill="#fff"
                            d="M14.5,6.26H5.19l1.26,17.82c.09,1.21,1.09,2.14,2.3,2.14h11.49c1.21,0,2.22-.94,2.3-2.14l1.26-17.82h-9.31Z"
                          />
                          <path d="M26.17,5.26h-6.88v-1.26c0-1.35-1.09-2.44-2.44-2.44h-4.7c-1.35,0-2.44,1.1-2.44,2.44v1.26H2.83c-.55,0-1,.45-1,1s.45,1,1,1h1.43l1.2,16.89c.12,1.72,1.57,3.07,3.3,3.07h11.49c1.73,0,3.18-1.35,3.3-3.07l1.2-16.89h1.43c.55,0,1-.45,1-1s-.45-1-1-1ZM11.71,4c0-.24.2-.44.44-.44h4.7c.24,0,.44.2.44.44v1.26h-5.58v-1.26ZM21.55,24.01c-.05.68-.62,1.21-1.3,1.21h-11.49c-.68,0-1.25-.53-1.3-1.21l-1.18-16.75h16.47l-1.18,16.75Z" />
                          <path d="M11.29,8.71c-.55,0-1,.45-1,1v12.81c0,.55.45,1,1,1s1-.45,1-1v-12.81c0-.55-.45-1-1-1Z" />
                          <path d="M17.71,8.71c-.55,0-1,.45-1,1v12.81c0,.55.45,1,1,1s1-.45,1-1v-12.81c0-.55-.45-1-1-1Z" />
                        </g>
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          </form>

          <div className="mt-2 flex w-full justify-center">
            <Button
              onClick={postNewProject}
              // disabled={!isFilled()}
            >
              Create
            </Button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default NewProject;
