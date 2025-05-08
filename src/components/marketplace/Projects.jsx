//-----------Libraries-----------//
import { useContext, useEffect, useState } from "react";
import { listDocs, deleteDoc } from "@junobuild/core";
import { NavLink } from "react-router-dom";

//-----------Providers-----------//
import { AuthContext } from "../../Auth";

//-----------Utilities-----------//
import { getLastUpdatedText } from "../../Utilities/formatting";

const Projects = ({ onProjectCountChange }) => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Helper function to filter out duplicate projects
  const filterDuplicateProjects = (projects) => {
    const seen = new Map();
    const filteredProjects = [];
    
    // Keep only one instance of projects with the same title
    for (const project of projects) {
      if (project.data.title && project.data.title.toLowerCase() === 'jain project') {
        // If we've already seen a 'jain project', skip it
        if (!seen.has(project.data.title.toLowerCase())) {
          seen.set(project.data.title.toLowerCase(), project);
          filteredProjects.push(project);
        }
      } else {
        // Keep all non-'jain project' projects
        filteredProjects.push(project);
      }
    }
    
    return filteredProjects;
  };

  // Delete duplicate 'jain project' entries
  const deleteDuplicateJainProjects = async () => {
    setIsDeleting(true);
    try {
      // Get all projects
      const { items } = await listDocs({
        collection: "projects",
      });
      
      // Find all 'jain project' entries
      const jainProjects = items.filter(
        item => item.data.title && item.data.title.toLowerCase() === 'jain project'
      );
      
      // Keep the first one, delete the rest
      if (jainProjects.length > 1) {
        console.log(`Found ${jainProjects.length} 'jain project' entries, keeping one and deleting ${jainProjects.length - 1}`);
        
        // Skip the first one (index 0) and delete the rest
        for (let i = 1; i < jainProjects.length; i++) {
          await deleteDoc({
            collection: "projects",
            doc: jainProjects[i],
          });
          console.log(`Deleted duplicate 'jain project' with key: ${jainProjects[i].key}`);
        }
      }
      
      // Refresh the list
      await getProjects();
    } catch (err) {
      console.error("Error deleting duplicate projects:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Retrieve projects
  const getProjects = async () => {
    try {
      const { items } = await listDocs({
        collection: "projects",
      });
      console.log("Retrieved Projects", items);

      // Filter out duplicate 'jain project' entries
      const filteredItems = filterDuplicateProjects(items);
      setItems(filteredItems);
      
      // Notify parent component about the project count
      if (onProjectCountChange) {
        onProjectCountChange(filteredItems.length);
      }
      
      // Check if we need to clean up duplicates (when component loads)
      if (items.length !== filteredItems.length && !isDeleting) {
        console.log(`Found ${items.length - filteredItems.length} duplicate 'jain project' entries`);
        deleteDuplicateJainProjects();
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
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
    <div className="mt-8 w-full max-w-[95%] pb-12">
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
              <div className="rounded-xl bg-[#2d2d2d] border border-[#404040] shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-[#d4d4d4]">
                      {title}
                    </h3>
                    <span className="px-3 py-1 text-sm rounded-full bg-[#333333] text-[#d4d4d4] border border-[#404040]">
                      {language || "English"}
                    </span>
                  </div>
                  
                  <p className="text-sm text-[#a0a0a0] mb-6">
                    Posted: {getLastUpdatedText(creation_date)}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <NavLink
                      to={"/project/" + key + "/mine"}
                      className="flex flex-col items-center px-6 py-4 rounded-lg bg-[#333333] border border-[#404040] hover:bg-[#3a3a3a] transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F58853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 4h6v6h-6z"/>
                          <path d="M4 14h6v6H4z"/>
                          <path d="M17 10 7 20"/>
                        </svg>
                        <span className="text-sm font-medium text-[#d4d4d4]">Mine</span>
                      </div>
                      <p className="text-2xl font-bold text-[#F58853]">{miner_payout} 💎</p>
                    </NavLink>

                    <NavLink
                      to={"/project/" + key + "/inspect"}
                      className="flex flex-col items-center px-6 py-4 rounded-lg bg-[#333333] border border-[#404040] hover:bg-[#3a3a3a] transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4C85FB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m21.21 15.89-9.02 4.68a1.98 1.98 0 0 1-1.86 0l-9.02-4.68a2 2 0 0 1-1.11-1.79V8.32c0-.76.43-1.45 1.11-1.79L10.33 2a1.98 1.98 0 0 1 1.86 0l9.02 4.68a2 2 0 0 1 1.11 1.79v5.63c0 .76-.43 1.45-1.11 1.79Z"/>
                        </svg>
                        <span className="text-sm font-medium text-[#d4d4d4]">Inspect</span>
                      </div>
                      <p className="text-2xl font-bold text-[#4C85FB]">{inspector_payout} 💎</p>
                    </NavLink>
                  </div>
                </div>
              </div>
              
              <button
                onClick={async () => user && user.key === item.data.creator_id && await deleteProj(item)}
                className="mt-2 w-full py-3 text-red-500 font-medium bg-[#2d2d2d] border border-[#404040] rounded-lg text-center"
              >
                Delete Project
              </button>
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
