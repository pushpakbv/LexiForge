//-----------Libraries-----------//

//-----------Components-----------//
import NavBar from "../components/NavBar";
import Chart from "../components/Dashboard/Chart";
import Wallet from "../components/Dashboard/Wallet";
import ToolBar from "../components/Dashboard/Toolbar";
import OngoingProjects from "../components/Dashboard/OngoingProjects";
import ProjectDetails from "../components/Dashboard/ProjectDetails";
import { useEffect, useState } from "react";
import NewProject from "../components/marketplace/NewProject";
import CreatorChart from "../components/Dashboard/CreatorChart";
import { useDarkMode } from "../providers/DarkModeProvider";

const DashboardPage = () => {
  const [projectKey, setProjectKey] = useState(null);
  const [isCreator, setIsCreator] = useState(false);
  const darkModeContext = useDarkMode();
  const { darkMode } = darkModeContext || { darkMode: false };

  useEffect(() => {
    console.log("toggle creator");
    setProjectKey(null);
  }, [isCreator]);

  const selectProjectDetails = (key) => {
    setProjectKey(key);
  };

  const toggleCreatorView = () => {
    setIsCreator(!isCreator);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[#1e1e1e]">
      <NavBar />
      <ToolBar toggleCreatorView={toggleCreatorView} toggle={isCreator} />
      
      <main className="mt-4 flex w-[95%] gap-6 rounded-lg py-1">
        <div className="flex w-full flex-row gap-6">
          {/* Left Section - Project List */}
          <section className="w-[30%]">
            <div className="rounded-xl bg-[#2d2d2d] p-6 border border-[#404040] shadow-lg transition-all duration-300 hover:border-[#505050]">
              <div className="mb-6">
                {isCreator && (
                  <div className="mb-6">
                    <NewProject />
                  </div>
                )}
                <div className="relative">
                  <h2 className="text-2xl font-bold text-[#d4d4d4] mb-4">
                    {isCreator ? "Your Projects" : "Available Projects"}
                  </h2>
                  <div className="h-1 w-24 bg-gradient-to-r from-[#4169E1] to-[#F58853] rounded-full" />
                </div>
              </div>
              <OngoingProjects
                selectProjectDetails={selectProjectDetails}
                toggle={isCreator}
              />
            </div>
          </section>

          {/* Middle Section - Project Details */}
          <section className="w-[40%]">
            <div className="rounded-xl bg-[#2d2d2d] p-6 border border-[#404040] shadow-lg transition-all duration-300 hover:border-[#505050] min-h-[600px]">
              <div className="relative mb-6">
                <h2 className="text-2xl font-bold text-[#d4d4d4] mb-4">
                  Project Details
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-[#F58853] to-[#4C85FB] rounded-full" />
              </div>
              <ProjectDetails projectId={projectKey} toggle={isCreator} />
            </div>
          </section>

          {/* Right Section - Stats & Wallet */}
          <section className="w-[30%] space-y-6">
            {!isCreator ? (
              <>
                {/* Activity Chart */}
                <div className="rounded-xl bg-[#2d2d2d] p-6 border border-[#404040] shadow-lg">
                  <div className="relative mb-6">
                    <h2 className="text-2xl font-bold text-[#d4d4d4] mb-4">
                      Activity Overview
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-[#4C85FB] to-purple-400 rounded-full" />
                  </div>
                  <Chart />
                </div>
                
                {/* Wallet Section */}
                <div className="rounded-xl bg-[#2d2d2d] p-6 border border-[#404040] shadow-lg">
                  <div className="relative mb-6">
                    <h2 className="text-2xl font-bold text-[#d4d4d4] mb-4">
                      Wallet
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-[#F58853] to-[#4169E1] rounded-full" />
                  </div>
                  <Wallet />
                </div>
              </>
            ) : (
              <div className="rounded-xl bg-[#2d2d2d] p-6 border border-[#404040] shadow-lg">
                <div className="relative mb-6">
                  <h2 className="text-2xl font-bold text-[#d4d4d4] mb-4">
                    Creator Analytics
                  </h2>
                  <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-[#4169E1] rounded-full" />
                </div>
                <CreatorChart />
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;