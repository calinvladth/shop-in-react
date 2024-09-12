function Button(props) {
  return (
    <button
      className="text-gray-700 border border-black px-3 py-2 text-sm"
      {...props}
    >
      {props?.children}
    </button>
  );
}
export default Button;
