//-----------Libraries-----------//
import { useContext, useState, useEffect } from "react";
import { useParams, NavLink, Outlet } from "react-router-dom";
import { getDoc } from "@junobuild/core";

//-----------Components-----------//
import NavBar from "../components/NavBar";

//-----------Providers-----------//
import { AuthContext } from "../Auth";
import { getLastUpdatedText } from "../Utilities/formatting";
import { ProgressBar } from "../Details/ProgressBar";
const ProjectPage = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [item, setItem] = useState([]);

  const getProject = async () => {
    const item = await getDoc({
      collection: "projects",
      key: id,
    });

    console.log("Retrieve project", item.data);

    setItem(item.data);
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <NavBar />
      <header className="m-3 mt-24 flex w-11/12 flex-col">
        <h1 className="mb-2 text-3xl">Project: {item.title}</h1>
        {/* Project details */}
        <article className="mb-2 flex flex-row gap-2">
          <figure className=" min-w-36 rounded-lg border-2 border-black p-2 text-center leading-snug hover:translate-y-[-2px]">
            Available Tasks:
            <br />
            {item.subjects && <div>{item.subjects.length} 💼</div>}
          </figure>
          <figure className=" min-w-36 rounded-lg border-2 border-black p-2 text-center leading-snug hover:translate-y-[-2px]">
            Paraphrases:
            <br />
            {item.paraphrases_needed} 💬
          </figure>
          <figure className=" min-w-36 rounded-lg border-2 border-black p-2 text-center leading-snug hover:translate-y-[-2px]">
            Inspections:
            <br />
            {item.validations_needed} 🔍
          </figure>
          <figure className=" min-w-36 rounded-lg border-2 border-black p-2 text-center leading-snug hover:translate-y-[-2px]">
            Miner Payout:
            <br />
            {item.miner_payout} 💎
          </figure>
          <figure className=" min-w-36 rounded-lg border-2 border-black p-2 text-center leading-snug hover:translate-y-[-2px]">
            Inspector Payout: <br />
            {item.inspector_payout} 💎
          </figure>
        </article>
        <p className="text-sm text-slate-700">
          Posted: {getLastUpdatedText(item.creation_date)}{" "}
        </p>
        <p className="mt-2 text-lg font-bold">
          Task: Rephrase these requests for an FAQ page
        </p>
      </header>
      <body className="w-11/12 overflow-y-scroll">
        {item.subjects &&
          item.subjects.map((subject, index) => {
            return (
              <figure
                key={subject.id}
                className="my-1 flex flex-row items-center justify-between rounded-lg bg-slate-200 px-4 py-4"
              >
                <div className="flex flex-row items-center">
                  <p className="mr-4 bg-slate-400 px-2 text-lg font-bold text-white">
                    {index + 1}
                  </p>
                  {subject.title}
                </div>
                <article className="flex gap-4">
                  <figure className=" flex w-36 flex-col items-center justify-center">
                    <NavLink
                      to="mine"
                      state={subject.id} // Send state to mine
                      className="btn mb-1 w-36 bg-minerDark text-white hover:bg-minerLight"
                      disabled={false}
                    >
                      Mine 💬
                    </NavLink>
                    <ProgressBar
                      progress={20}
                      color="bg-minerDark"
                      bar="bg-minerLight"
                    />
                  </figure>
                  <figure className=" flex w-36 flex-col items-center justify-center">
                    <NavLink
                      to="inspect"
                      state={subject.id} // Send state to inspect
                      className="btn mb-1 w-36 bg-inspectorDark text-white hover:bg-inspectorLight"
                      disabled={false}
                    >
                      Inspect 🔍
                    </NavLink>
                    <ProgressBar
                      progress={30}
                      color="bg-inspectorDark"
                      bar="bg-inspectorLight"
                    />
                  </figure>
                </article>
              </figure>
            );
          })}
      </body>
      {/* Outlet to minepage/inspectpage with proj data */}
      <Outlet context={item} />
    </div>
  );
};

export default ProjectPage;
