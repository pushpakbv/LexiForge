//-----------Libraries-----------//
import { getDoc } from "@junobuild/core";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

//-----------Providers-----------//
import { getLastUpdatedText } from "../../Utilities/formatting";

const ProjectDetails = ({ projectId, toggle }) => {
  const [item, setItem] = useState([]);

  const getProject = async () => {
    const item = await getDoc({
      collection: "projects",
      key: projectId,
    });

    console.log("Retrieve project", item.data);
    setItem(item.data);
  };

  useEffect(() => {
    getProject();
  }, [projectId, toggle]);

  if (!item.title) {
    return (
      <div className="flex items-center justify-center h-[400px] text-[#a0a0a0]">
        Select a project to view details
      </div>
    );
  }

  return (
    <div className="text-[#d4d4d4]">
      {/* Project Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-[#333333] rounded-lg border border-[#404040] flex flex-col items-center">
          <span className="text-[#a0a0a0] text-sm mb-1">Available Tasks</span>
          <span className="text-2xl font-bold">{item.subjects?.length || 0} 💼</span>
        </div>
        <div className="p-4 bg-[#333333] rounded-lg border border-[#404040] flex flex-col items-center">
          <span className="text-[#a0a0a0] text-sm mb-1">Paraphrases</span>
          <span className="text-2xl font-bold">{item.paraphrases_needed} 💬</span>
        </div>
        <div className="p-4 bg-[#333333] rounded-lg border border-[#404040] flex flex-col items-center">
          <span className="text-[#a0a0a0] text-sm mb-1">Miner Payout</span>
          <span className="text-2xl font-bold text-[#F58853]">{item.miner_payout} 💎</span>
        </div>
        <div className="p-4 bg-[#333333] rounded-lg border border-[#404040] flex flex-col items-center">
          <span className="text-[#a0a0a0] text-sm mb-1">Inspector Payout</span>
          <span className="text-2xl font-bold text-[#4C85FB]">{item.inspector_payout} 💎</span>
        </div>
      </div>

      {/* Creation Date */}
      <div className="mb-6">
        <p className="text-sm text-[#a0a0a0]">
          Posted: {getLastUpdatedText(item.creation_date)}
        </p>
      </div>

      {/* Task Description */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Task Description</h3>
        <p className="text-[#a0a0a0]">
          Rephrase these requests for an FAQ page
        </p>
      </div>

      {/* Subject List */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium mb-3">Subjects</h3>
        {item.subjects?.map((subject, index) => (
          <div
            key={subject.id}
            className="p-4 bg-[#333333] rounded-lg border border-[#404040] group hover:border-[#505050]"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#404040] flex items-center justify-center text-[#d4d4d4] font-medium">
                {index + 1}
              </div>
              <p className="text-[#d4d4d4] font-medium">{subject.title}</p>
            </div>

            <div className="flex gap-4">
              {toggle ? (
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-[#4169E1] to-[#4C85FB] text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                  Export Data
                </button>
              ) : (
                <>
                  <NavLink
                    to={`/project/${projectId}/mine`}
                    state={subject.id}
                    className="flex-1 px-4 py-2 bg-[#404040] text-[#d4d4d4] rounded-lg font-medium hover:bg-[#505050] transition-colors text-center"
                  >
                    Mine 💬
                  </NavLink>
                  <NavLink
                    to={`/project/${projectId}/inspect`}
                    state={subject.id}
                    className="flex-1 px-4 py-2 bg-[#404040] text-[#d4d4d4] rounded-lg font-medium hover:bg-[#505050] transition-colors text-center"
                  >
                    Inspect 🔍
                  </NavLink>
                </>
              )}
            </div>
          </div>
        ))}

        {(!item.subjects || item.subjects.length === 0) && (
          <div className="text-center py-8">
            <p className="text-[#a0a0a0]">No subjects available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
