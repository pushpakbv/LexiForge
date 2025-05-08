import { motion } from "framer-motion";

const ProgressBar = ({ progress, color, bar }) => {
  // Check if progress is 100%
  const isCompleted = progress === 100;

  // Conditionally set the color class
  const colorClass = isCompleted ? "bg-slate-400" : color;

  return (
    <div className={`h-2 w-[142px] rounded-full ${bar}`}>
      <div
        className={`h-full rounded-full ${colorClass}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export const MineProgressBar = ({ progress = 50, color = "bg-[#F58853]", bar = "bg-[#333333]" }) => {
  return (
    <div className="mb-1 h-3 w-full overflow-hidden rounded-full bg-[#333333]">
      <motion.div
        className={`h-full ${color} rounded-full transition-all duration-300`}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
};

export { ProgressBar };
