import PropTypes from "prop-types";

export const Button = ({ children, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 transition-all rounded-full py-1 px-8 my-2 font-medium text-black hover:translate-y-[-2px] bg-white shadow-lg ${disabled ? "opacity-25" : "hover:bg-slate-200"}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
