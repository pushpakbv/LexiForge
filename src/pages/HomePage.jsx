import { Table } from "../Table";
import { Modal } from "../Modal";
import { Footer } from "../Footer";
import NavBar from "../components/NavBar";
import { Button } from "../Details/Button";
import FaqPage from "../components/Home/faqPage";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import ICPlogo from "../Media/ICPlogo.png";

const Section = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  
  return (
    <motion.section
      ref={ref}
      className={`min-h-screen w-full flex items-center justify-center ${className}`}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 1, ease: [0.17, 0.55, 0.55, 1] }}
    >
      {children}
    </motion.section>
  );
};

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="flex w-full flex-col items-center bg-[#1e1e1e] text-[#d4d4d4]">
      <NavBar />
      
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4169E1] to-[#4169E1] origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <div className="min-h-screen w-full flex items-center justify-center bg-[#1e1e1e] relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div 
          className="absolute w-[800px] h-[800px] bg-gradient-to-r from-[#4169E1]/10 to-[#4169E1]/5 rounded-full blur-[80px] -z-10"
          animate={{
            scale: [1, 1.2, 1],
            x: [-200, 200, -200],
            rotate: [0, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 flex flex-col items-center">
          <motion.div
            className="relative flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Title with new animation */}
            <motion.h1
              className="text-8xl font-black"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                duration: 1
              }}
            >
              <motion.div
                className="inline-block"
                style={{
                  background: 'linear-gradient(90deg, #4169E1 0%, #4C85FB 50%, #F58853 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 8px 30px rgba(65, 105, 225, 0.3)',
                  letterSpacing: '-0.04em',
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                LEXIFORGE
              </motion.div>
            </motion.h1>

            {/* Animated Underline */}
            <motion.div
              className="relative h-1 mb-12 overflow-hidden rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "24rem" }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#4169E1] via-[#4C85FB] to-[#F58853]" />
              <motion.div
                className="absolute inset-0 bg-white/30"
                animate={{
                  x: ["-100%", "100%"]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.div
              className="text-center space-y-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <h2 className="text-4xl font-light tracking-wide bg-gradient-to-r from-[#4B61F2] to-[#F58853] bg-clip-text text-transparent">
                Revolutionizing AI Language Understanding
              </h2>
              <p className="text-xl text-[#a0a0a0]">
                Join the future of decentralized AI training
              </p>
            </motion.div>

            {/* Feature Pills */}
            <motion.div
              className="flex gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {[
                { text: "Transparent", color: "bg-[#4169E1]" },
                { text: "Decentralized", color: "bg-[#4169E1]" },
                { text: "Innovative", color: "bg-[#4169E1]" }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className={`px-6 py-2 rounded-full ${feature.color} text-white shadow-lg`}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(65, 105, 225, 0.3)"
                  }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.4 + i * 0.1 }}
                >
                  {feature.text}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Steps Section */}
      <Section>
        <div className="glass-effect min-w-[80vw] rounded-[60px] bg-[#2d2d2d] shadow-lg p-12 border border-[#404040]">
          <motion.h1 
            className="text-5xl font-bold tracking-tight text-center mb-12 text-[#d4d4d4]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Improve Your Chatbots in 3 Steps
          </motion.h1>

          <div className="flex justify-center items-center gap-8">
            {[
              { 
                title: "Creators", 
                step: "1. Launch Project", 
                desc: "Upload your chatbot data and define tasks.", 
                color: "text-[#4169E1]",
                titleColor: "text-[#4169E1]",
                bgGradient: "bg-gradient-to-br from-[#4169E1]/10 to-transparent",
                icon: "🚀"
              },
              { 
                title: "Miners", 
                step: "2. Create Data", 
                desc: "Miners create varied paraphrases.", 
                color: "text-[#F58853]",
                titleColor: "text-[#F58853]",
                bgGradient: "bg-gradient-to-br from-[#F58853]/10 to-transparent",
                icon: "⛏️"
              },
              { 
                title: "Inspectors", 
                step: "3. Ensure Quality", 
                desc: "Inspectors approve, or reject submissions.", 
                color: "text-purple-400",
                titleColor: "text-purple-400",
                bgGradient: "bg-gradient-to-br from-purple-400/10 to-transparent",
                icon: "🔍"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                className={`flex-1 min-w-[300px] max-w-[300px] h-[300px] bg-[#333333] rounded-xl p-6 border border-[#404040] ${item.bgGradient} relative overflow-hidden cursor-pointer`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                whileHover={{ 
                  y: -5,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 opacity-50"
                  animate={{
                    background: [
                      `linear-gradient(45deg, ${item.color.split('-')[1]}/0 0%, transparent 100%)`,
                      `linear-gradient(45deg, ${item.color.split('-')[1]}/20 50%, transparent 100%)`,
                      `linear-gradient(45deg, ${item.color.split('-')[1]}/0 100%, transparent 100%)`
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                <div className="relative text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: i * 0.3 
                    }}
                    className={`text-5xl mb-6 ${item.titleColor}`}
                  >
                    {item.icon}
                  </motion.div>
                  
                  <motion.h3 
                    className={`text-xl font-bold ${item.titleColor}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.3 + 0.2 }}
                  >
                    {item.title}
                  </motion.h3>
                  
                  <motion.h4 
                    className="text-2xl font-semibold text-[#d4d4d4]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.3 + 0.3 }}
                  >
                    {item.step}
                  </motion.h4>
                  
                  <motion.p 
                    className="text-[#a0a0a0]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.3 + 0.4 }}
                  >
                    {item.desc}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="tracking-tight mb-4 text-[#d4d4d4]">↓ Join our mailing list for Beta access ↓</p>
            <div className="max-w-md mx-auto">
              <label className="input input-bordered flex items-center gap-2 bg-[#333333] border-[#404040] text-[#d4d4d4]">
                <span className="text-[#a0a0a0]">Email</span>
                <input 
                  type="text" 
                  className="grow bg-transparent focus:outline-none" 
                  placeholder="YourEmail@AI.com" 
                />
              </label>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Humanize Data Section */}
      <Section className="bg-[#1e1e1e]">
        <div className="max-w-[80vw] relative">
          {/* Decorative circles */}
          <motion.div 
            className="absolute -top-20 -left-20 w-[200px] h-[200px] bg-gradient-to-br from-[#F58853]/20 to-transparent rounded-full blur-[50px] -z-10"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute -bottom-20 -right-20 w-[200px] h-[200px] bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-[50px] -z-10"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <div className="text-center relative z-10">
            <motion.h1 
              className="text-7xl font-bold mb-8 inline-block"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-[#F58853] via-purple-400 to-[#4C85FB] bg-clip-text text-transparent">
                Humanise
              </span>
              <span className="ml-4 bg-gradient-to-r from-[#4C85FB] via-purple-400 to-[#F58853] bg-clip-text text-transparent">
                Data
              </span>
            </motion.h1>

            <motion.div
              className="max-w-3xl mx-auto bg-[#2d2d2d] p-8 rounded-2xl border border-[#404040] shadow-xl relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  background: [
                    'linear-gradient(45deg, #F58853 0%, transparent 100%)',
                    'linear-gradient(45deg, #4C85FB 50%, transparent 100%)',
                    'linear-gradient(45deg, #F58853 100%, transparent 100%)'
                  ]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              <motion.p 
                className="text-xl mb-8 text-[#d4d4d4] leading-relaxed relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Our goal is to be leaders in decentralised and transparent AI data
                crowdsourcing that is powered by blockchain.
              </motion.p>

              <motion.h2 
                className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#F58853] to-[#4C85FB] bg-clip-text text-transparent relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                About LexiForge
              </motion.h2>

              <motion.p 
                className="text-xl text-[#d4d4d4] leading-relaxed relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Imagine a world where access to unbiased and large-scale
                training data is not a bottleneck for AI development.
              </motion.p>

              {/* Stats Section */}
              <motion.div 
                className="grid grid-cols-3 gap-6 mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                {[
                  { number: "500K+", label: "Data Points", color: "from-[#F58853]" },
                  { number: "10K+", label: "Contributors", color: "from-purple-400" },
                  { number: "99%", label: "Accuracy", color: "from-[#4C85FB]" }
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    className="text-center p-4 rounded-xl bg-[#333333]/50 backdrop-blur-sm"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <motion.p 
                      className={`text-3xl font-bold mb-2 bg-gradient-to-r ${stat.color} to-transparent bg-clip-text text-transparent`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 1.2 + i * 0.1, type: "spring" }}
                    >
                      {stat.number}
                    </motion.p>
                    <p className="text-[#a0a0a0]">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-[#1e1e1e]">
        <div className="min-w-[80vw] max-w-[80vw]">
          <motion.h1 
            className="text-5xl font-bold text-center mb-4 text-[#d4d4d4]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            FAQ
          </motion.h1>
          <motion.p 
            className="text-center mb-8 text-[#a0a0a0]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Frequently Asked Questions
          </motion.p>
          <motion.div 
            className="max-h-[600px] overflow-y-auto rounded-xl bg-[#2d2d2d] p-8 border border-[#404040]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <FaqPage />
          </motion.div>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default HomePage;
