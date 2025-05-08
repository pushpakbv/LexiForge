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
  const [item, setItem] = useState({
    title: '',
    subjects: [],
    paraphrases_needed: 0,
    validations_needed: 0,
    miner_payout: 0,
    inspector_payout: 0,
    creation_date: new Date()
  });
  const [loading, setLoading] = useState(true);

  const getProject = async () => {
    try {
      setLoading(true);
      const response = await getDoc({
        collection: "projects",
        key: id,
      });

      console.log("Retrieve project", response.data);
      
      if (response && response.data) {
        setItem(response.data);
      } else {
        console.error("Project data not found or invalid");
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProject();
  }, [id]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[#1A1A1A] text-[#d4d4d4]">
      <NavBar />
      <header className="m-3 mt-24 flex w-11/12 flex-col">
        <h1 className="mb-2 text-3xl font-bold text-[#d4d4d4]">Project: {item?.title || 'Loading...'}</h1>
        {/* Project details */}
        <article className="mb-2 flex flex-row gap-2">
          <figure className="min-w-36 rounded-lg border border-[#404040] bg-[#2d2d2d] p-4 text-center leading-snug hover:translate-y-[-2px] transition-transform">
            Available Tasks:
            <br />
            {item?.subjects && <div className="text-xl font-bold">{item.subjects.length} 💼</div>}
          </figure>
          <figure className="min-w-36 rounded-lg border border-[#404040] bg-[#2d2d2d] p-4 text-center leading-snug hover:translate-y-[-2px] transition-transform">
            Paraphrases:
            <br />
            <div className="text-xl font-bold">{item?.paraphrases_needed || 0} 💬</div>
          </figure>
          <figure className="min-w-36 rounded-lg border border-[#404040] bg-[#2d2d2d] p-4 text-center leading-snug hover:translate-y-[-2px] transition-transform">
            Inspections:
            <br />
            <div className="text-xl font-bold">{item?.validations_needed || 0} 🔍</div>
          </figure>
          <figure className="min-w-36 rounded-lg border border-[#404040] bg-[#2d2d2d] p-4 text-center leading-snug hover:translate-y-[-2px] transition-transform">
            Miner Payout:
            <br />
            <div className="text-xl font-bold text-[#F58853]">{item?.miner_payout || 0} 💎</div>
          </figure>
          <figure className="min-w-36 rounded-lg border border-[#404040] bg-[#2d2d2d] p-4 text-center leading-snug hover:translate-y-[-2px] transition-transform">
            Inspector Payout: <br />
            <div className="text-xl font-bold text-[#4C85FB]">{item?.inspector_payout || 0} 💎</div>
          </figure>
        </article>
        <p className="text-sm text-[#a0a0a0]">
          Posted: {getLastUpdatedText(item?.creation_date || new Date())}{" "}
        </p>
        <div className="mt-4 mb-6">
          <h2 className="text-2xl font-bold text-[#d4d4d4]">
            Task: <span className="bg-gradient-to-r from-[#F58853] to-[#4C85FB] bg-clip-text text-transparent">
              Rephrase these requests for an FAQ page
            </span>
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-[#F58853] to-[#4C85FB] rounded-full mt-2" />
        </div>
      </header>
      <div className="w-11/12 overflow-y-scroll">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <p className="text-[#a0a0a0] text-lg">Loading project data...</p>
          </div>
        ) : item?.subjects && item.subjects.length > 0 ? (
          item.subjects.map((subject, index) => {
            if (!subject) return null;
            return (
              <figure
                key={subject.id || index}
                className="my-3 flex flex-row items-center justify-between rounded-xl bg-[#2d2d2d] border border-[#404040] px-6 py-5 shadow-lg"
              >
                <div className="flex flex-row items-center">
                  <div className="mr-4 flex items-center justify-center w-8 h-8 rounded-full bg-[#333333] text-lg font-bold text-[#d4d4d4]">
                    {index + 1}
                  </div>
                  <p className="text-[#d4d4d4]">{subject.title || 'Untitled Subject'}</p>
                </div>
                <article className="flex gap-4">
                  <figure className="flex w-36 flex-col items-center justify-center">
                    <NavLink
                      to="mine"
                      state={subject.id} // Send state to mine
                      className="mb-1 w-36 px-4 py-2 bg-[#333333] border border-[#404040] hover:bg-[#3c3c3c] text-[#d4d4d4] rounded-lg flex items-center justify-center gap-2 hover:border-[#F58853] transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F58853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 4h6v6h-6z"/>
                        <path d="M4 14h6v6H4z"/>
                        <path d="M17 10 7 20"/>
                      </svg>
                      Mine 💬
                    </NavLink>
                    <div className="w-full h-2 bg-[#333333] rounded-full overflow-hidden">
                      <div className="h-full bg-[#F58853] rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </figure>
                  <figure className="flex w-36 flex-col items-center justify-center">
                    <NavLink
                      to="inspect"
                      state={subject.id} // Send state to inspect
                      className="mb-1 w-36 px-4 py-2 bg-[#333333] border border-[#404040] hover:bg-[#3c3c3c] text-[#d4d4d4] rounded-lg flex items-center justify-center gap-2 hover:border-[#4C85FB] transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4C85FB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m21.21 15.89-9.02 4.68a1.98 1.98 0 0 1-1.86 0l-9.02-4.68a2 2 0 0 1-1.11-1.79V8.32c0-.76.43-1.45 1.11-1.79L10.33 2a1.98 1.98 0 0 1 1.86 0l9.02 4.68a2 2 0 0 1 1.11 1.79v5.63c0 .76-.43 1.45-1.11 1.79Z"/>
                      </svg>
                      Inspect 🔍
                    </NavLink>
                    <div className="w-full h-2 bg-[#333333] rounded-full overflow-hidden">
                      <div className="h-full bg-[#4C85FB] rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </figure>
                </article>
              </figure>
            );
          })
        ) : (
          <div className="flex justify-center items-center py-12">
            <p className="text-[#a0a0a0] text-lg">No subjects available for this project</p>
          </div>
        )}
      </div>
      {/* Outlet to minepage/inspectpage with proj data */}
      <Outlet context={item} />
    </div>
  );
};

export default ProjectPage;
