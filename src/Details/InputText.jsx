const InputText = ({ id, placeholder, handleChange, value }) => {
  return (
    <input
      className="h-12 w-full rounded-lg border border-[#404040] bg-[#333333] p-2 text-[#d4d4d4] hover:border-[#505050] transition-all duration-200"
      id={id}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default InputText;
