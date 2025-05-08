export const Footer = () => {
  return (
    <footer className="bg-[#1e1e1e] border-t border-[#404040] mx-auto flex h-24 max-w-screen-2xl items-center justify-between px-8 py-16 md:justify-start md:gap-24 md:px-24">
      <div className="flex gap-2">
        <span className="text-[#d4d4d4]">©</span>
        <p className="text-[#a0a0a0]">LEXIFORGE {new Date().getFullYear()}</p>
      </div>
      <div className="flex gap-8">
        <a href="#" className="text-[#a0a0a0] hover:text-[#d4d4d4] transition-colors">
          Privacy
        </a>
        <a href="#" className="text-[#a0a0a0] hover:text-[#d4d4d4] transition-colors">
          Terms
        </a>
        <a href="#" className="text-[#a0a0a0] hover:text-[#d4d4d4] transition-colors">
          Contact
        </a>
      </div>
    </footer>
  );
};
