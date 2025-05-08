import "./InputDate.css";

const InputDate = ({ id, placeholder, handleChange, value }) => {
  return (
    <input
      className="h-12 min-w-[150px] rounded-lg border-[1px] bg-transparent p-2 text-text hover:translate-y-[-2px] hover:border-[2px] "
      id={id}
      type="date"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default InputDate;
