import { motion } from "framer-motion";

const UpgradeMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#4169E1] to-[#F58853] text-white text-center py-1 text-sm font-medium z-50"
    >
      🚀 UPGRADE IN PROGRESS: We're evolving to LEXIFORGE! 
    </motion.div>
  );
};

export default UpgradeMessage;