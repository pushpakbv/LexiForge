//-----------Libraries-----------//
import { useContext, useEffect, useState } from "react";
import { listDocs, deleteDoc } from "@junobuild/core";
import { NavLink } from "react-router-dom";

//-----------Providers-----------//
import { AuthContext } from "../../Auth";

//-----------Utilities-----------//
import { getLastUpdatedText } from "../../Utilities/formatting";

const Projects = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  // Retrieve projects
  const getProjects = async () => {
    const { items } = await listDocs({
      collection: "projects",
    });
    console.log("Retrieved Projects", items);

    setItems(items);
  };

  useEffect(() => {
    getProjects();
  }, []);

  const deleteProj = async (item) => {
    console.log("delete", item);
    try {
      // Delete item based on key
      await deleteDoc({
        collection: "projects",
        doc: item,
      });
      // Refresh list
      await getProjects();
    } catch (err) {
      console.error("Catch", err);
    }
  };

  return (
    <div className="mt-8 w-full max-w-[95%]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => {
          const {
            key,
            data: {
              title,
              miner_payout,
              inspector_payout,
              creation_date,
              language,
            },
          } = item;

          return (
            <div key={key} className="group">
              <NavLink
                to={"/project/" + key}
                className="flex flex-col h-full rounded-xl bg-[#2d2d2d] border border-[#404040] shadow-lg overflow-hidden transition-all duration-300 hover:border-[#505050] hover:translate-y-[-4px] hover:shadow-xl relative"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br from-[#4169E1] via-[#F58853] to-purple-400" />
                
                <div className="p-6 flex flex-col h-full relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#d4d4d4] mb-2 line-clamp-2">
                        {title}
                      </h3>
                      <p className="text-sm text-[#a0a0a0]">
                        Posted: {getLastUpdatedText(creation_date)}
                      </p>
                    </div>
                    <span className="px-3 py-1 text-sm rounded-full bg-[#333333] text-[#d4d4d4] border border-[#404040]">
                      {language || "English"}
                    </span>
                  </div>

                  <div className="flex gap-4 mt-auto">
                    <div className="flex-1 p-3 rounded-lg bg-[#333333] border border-[#404040] group-hover:border-[#F58853] transition-colors">
                      <div className="flex items-center gap-2 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F58853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 4h6v6h-6z"/>
                          <path d="M4 14h6v6H4z"/>
                          <path d="M17 10 7 20"/>
                        </svg>
                        <span className="text-sm font-medium text-[#d4d4d4]">Mine</span>
                      </div>
                      <p className="text-lg font-bold text-[#F58853]">{miner_payout} 💎</p>
                    </div>

                    <div className="flex-1 p-3 rounded-lg bg-[#333333] border border-[#404040] group-hover:border-[#4C85FB] transition-colors">
                      <div className="flex items-center gap-2 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4C85FB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m21.21 15.89-9.02 4.68a1.98 1.98 0 0 1-1.86 0l-9.02-4.68a2 2 0 0 1-1.11-1.79V8.32c0-.76.43-1.45 1.11-1.79L10.33 2a1.98 1.98 0 0 1 1.86 0l9.02 4.68a2 2 0 0 1 1.11 1.79v5.63c0 .76-.43 1.45-1.11 1.79Z"/>
                        </svg>
                        <span className="text-sm font-medium text-[#d4d4d4]">Inspect</span>
                      </div>
                      <p className="text-lg font-bold text-[#4C85FB]">{inspector_payout} 💎</p>
                    </div>
                  </div>
                </div>
              </NavLink>
              {user && user.key === item.data.creator_id && (
                <button
                  onClick={async () => await deleteProj(item)}
                  className="mt-2 w-full px-4 py-2 text-sm text-red-500 hover:text-red-400 bg-[#333333] rounded-lg border border-[#404040] transition-colors"
                >
                  Delete Project
                </button>
              )}
            </div>
          );
        })}
      </div>
      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#a0a0a0] text-lg">No projects available at the moment</p>
        </div>
      )}
    </div>
  );
};

export default Projects;
