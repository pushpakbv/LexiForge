const InputSubjects = ({ id, placeholder, handleChange, value, onClick, disabled }) => {
  return (
    <div className="flex flex-col gap-2">
      <textarea
        id={id}
        placeholder={placeholder || "Enter subject..."}
        onChange={handleChange}
        value={value}
        className="w-full min-h-[80px] p-3 bg-[#333333] text-[#d4d4d4] rounded-lg border border-[#404040] focus:border-[#F58853] focus:ring-1 focus:ring-[#F58853] outline-none resize-none transition-all duration-200 placeholder-[#666666]"
      />
      <button
        onClick={onClick}
        disabled={disabled}
        className={`self-end py-1 px-4 rounded-lg bg-[#333333] border border-[#404040] text-[#d4d4d4] ${
          disabled ? "opacity-50 cursor-not-allowed" : "hover:border-[#F58853] hover:text-[#F58853] transition-colors"
        }`}
        type="button"
      >
        Add Subject
      </button>
    </div>
  );
};

export default InputSubjects;
