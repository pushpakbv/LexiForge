import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import faqs from "./faqs.json";

export default function FaqPage() {
  const [openCategories, setOpenCategories] = useState({});
  const [openQuestions, setOpenQuestions] = useState({});

  const toggleCategory = (category) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const toggleQuestion = (categoryQuestion) => {
    setOpenQuestions(prev => ({
      ...prev,
      [categoryQuestion]: !prev[categoryQuestion]
    }));
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto">
      {Object.keys(faqs).map((category) => (
        <motion.div 
          key={category} 
          className="w-full mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={() => toggleCategory(category)}
            className="w-full flex items-center justify-between text-2xl font-bold mb-4 text-[#d4d4d4] border-b border-[#404040] pb-2 hover:text-[#4169E1] transition-colors"
          >
            <span>{category}</span>
            <motion.span
              animate={{ rotate: openCategories[category] ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="transform origin-center"
            >
              ▼
            </motion.span>
          </button>
          
          <AnimatePresence>
            {openCategories[category] && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3 overflow-hidden"
              >
                {faqs[category].map((faq) => {
                  const questionId = `${category}-${faq.question}`;
                  return (
                    <motion.div
                      key={questionId}
                      className="rounded-lg border border-[#404040] overflow-hidden bg-[#333333] hover:border-[#505050] transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <button
                        onClick={() => toggleQuestion(questionId)}
                        className="w-full flex items-center justify-between p-4 text-left text-[#d4d4d4] hover:bg-[#3c3c3c] transition-colors"
                      >
                        <span className="text-lg font-medium">{faq.question}</span>
                        <motion.span
                          animate={{ rotate: openQuestions[questionId] ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="transform origin-center"
                        >
                          ▼
                        </motion.span>
                      </button>
                      
                      <AnimatePresence>
                        {openQuestions[questionId] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-4 py-3 bg-[#2d2d2d] text-[#a0a0a0] border-t border-[#404040]">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
