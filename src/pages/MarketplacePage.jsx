//-----------Libraries-----------//

//-----------Components-----------//

import NavBar from "../components/NavBar";
import Projects from "../components/marketplace/Projects";
import { useDarkMode } from "../providers/DarkModeProvider";

const MarketplacePage = () => {
  const darkModeContext = useDarkMode();
  const { darkMode } = darkModeContext || { darkMode: false };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[#1e1e1e]">
      <NavBar />
      <header className="mt-24 w-full max-w-[95%] mb-8">
        <div className="flex items-center justify-between">
          <div className="relative">
            <h1 className="text-5xl font-bold text-[#d4d4d4] mb-4">
              Marketplace
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-[#F58853] to-[#4C85FB] rounded-full" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-[#F58853]/20 via-purple-400/10 to-transparent rounded-full blur-[30px] -z-10" />
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2d2d2d] border border-[#404040]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4d4d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.91 8.84L8.56 21.19a4.24 4.24 0 0 1-6-6L14.91 2.84a2.83 2.83 0 0 1 4 4L7.56 18.19a1.41 1.41 0 0 1-2-2L17.91 3.84" />
              </svg>
              <span className="text-[#d4d4d4]">Active Projects: 45</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2d2d2d] border border-[#404040]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4d4d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>
              <span className="text-[#d4d4d4]">Top Rated</span>
            </div>
          </div>
        </div>
        <p className="text-[#a0a0a0] mt-2">Find and contribute to ongoing AI training projects</p>
      </header>
      <Projects />
    </div>
  );
};

export default MarketplacePage;
