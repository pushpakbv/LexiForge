const InputText = ({ id, placeholder, handleChange, value }) => {
  return (
    <input
      className=" h-12 w-full rounded-lg border-[1px] bg-transparent p-2 text-text hover:translate-y-[-2px] hover:border-[2px]"
      id={id}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default InputText;
