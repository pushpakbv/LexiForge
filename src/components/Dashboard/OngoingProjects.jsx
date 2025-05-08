//-----------Libraries-----------//
import { listDocs } from "@junobuild/core";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Auth";

const OngoingProjects = ({ selectProjectDetails, toggle }) => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  const getProjects = async () => {
    let { items } = await listDocs({
      collection: "projects",
    });
    console.log("Retrieved Projects", items, toggle);

    // If toggle = true, creator filter
    if (toggle) {
      items = items.filter((item) => item.data.creator_id === user.key);
    }

    setItems(items);
  };

  useEffect(() => {
    getProjects();
  }, [toggle]);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const {
          key,
          data: { title },
        } = item;

        return (
          <button
            onClick={() => selectProjectDetails(key)}
            key={key}
            className="w-full p-4 bg-[#333333] rounded-lg border border-[#404040] flex items-center justify-between group hover:border-[#F58853] hover:bg-[#3c3c3c] transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4169E1] to-[#F58853] flex items-center justify-center text-white font-medium">
                {title.charAt(0)}
              </div>
              <div className="text-left">
                <p className="text-[#d4d4d4] font-medium group-hover:text-white transition-colors">
                  {title}
                </p>
                <p className="text-xs text-[#a0a0a0]">
                  Last updated: 2 hours ago
                </p>
              </div>
            </div>
            
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
              className="text-[#a0a0a0] group-hover:text-white transition-colors"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        );
      })}
      
      {items.length === 0 && (
        <div className="text-center py-8">
          <p className="text-[#a0a0a0]">No projects available</p>
        </div>
      )}
    </div>
  );
};

export default OngoingProjects;
