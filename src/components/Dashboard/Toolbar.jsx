  import { useState } from "react";

const ToolBar = ({ toggleCreatorView, toggle }) => {
  const [message, setMessage] = useState("Switch to Creator View 🪨✨");
  const [isCreator, setIsCreator] = useState(false);

  const updateMessage = () => {
    if (!isCreator) {
      setMessage("Switch to Mine/Inspect 💬🔍");
    } else {
      setMessage("Switch to Creator View 🪨✨");
    }
    setIsCreator(!isCreator);
  };

  return (
    <header className="mt-24 w-full max-w-[95%] mb-4">
      <div className="flex items-center justify-between p-6 rounded-xl bg-[#2d2d2d] border border-[#404040] shadow-lg">
        {/* Quick Actions */}
        <div className="flex items-center gap-6">
          <h3 className="text-[#d4d4d4] font-medium">Quick Actions:</h3>
          <div className="flex gap-4">
            <button 
              className="px-6 py-2 bg-[#333333] text-[#d4d4d4] rounded-lg border border-[#404040] hover:bg-[#3c3c3c] hover:text-white transition-all duration-200 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 4h6v6h-6z"/>
                <path d="M4 14h6v6H4z"/>
                <path d="M17 10 7 20"/>
              </svg>
              Mine
            </button>
            <button 
              className="px-6 py-2 bg-[#333333] text-[#d4d4d4] rounded-lg border border-[#404040] hover:bg-[#3c3c3c] hover:text-white transition-all duration-200 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m21.21 15.89-9.02 4.68a1.98 1.98 0 0 1-1.86 0l-9.02-4.68a2 2 0 0 1-1.11-1.79V8.32c0-.76.43-1.45 1.11-1.79L10.33 2a1.98 1.98 0 0 1 1.86 0l9.02 4.68a2 2 0 0 1 1.11 1.79v5.63c0 .76-.43 1.45-1.11 1.79Z"/>
              </svg>
              Inspect
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6">
          <h3 className="text-[#d4d4d4] font-medium">Lifetime Stats:</h3>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-[#333333] rounded-lg border border-[#404040] flex flex-col items-center">
              <span className="text-[#a0a0a0] text-sm">Total Jobs</span>
              <span className="text-[#d4d4d4] font-bold">3,423 💼</span>
            </div>
            <div className="px-4 py-2 bg-[#333333] rounded-lg border border-[#404040] flex flex-col items-center">
              <span className="text-[#a0a0a0] text-sm">Total Gems</span>
              <span className="text-[#d4d4d4] font-bold">13,921 💎</span>
            </div>
          </div>
        </div>

        {/* Toggle View Button */}
        <button
          onClick={() => {
            toggleCreatorView();
            updateMessage();
          }}
          className={`px-6 py-2 rounded-lg border transition-all duration-300 font-medium ${
            toggle 
              ? 'bg-gradient-to-r from-[#F58853] to-[#4C85FB] text-white border-transparent' 
              : 'bg-[#333333] text-[#d4d4d4] border-[#404040] hover:bg-[#3c3c3c]'
          }`}
        >
          {message}
        </button>
      </div>
    </header>
  );
};

export default ToolBar;
