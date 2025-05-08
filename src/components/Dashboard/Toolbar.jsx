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
