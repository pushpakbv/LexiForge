const InputSubjects = ({ id, placeholder, handleChange, value }) => {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
      className="w-full min-h-[120px] p-4 bg-[#333333] text-[#d4d4d4] rounded-lg border border-[#404040] focus:border-[#F58853] focus:ring-1 focus:ring-[#F58853] outline-none resize-none transition-all duration-200 placeholder-[#666666]"
    />
  );
};

export default InputSubjects;
