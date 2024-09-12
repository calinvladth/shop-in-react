type InputGroutTypes = {
  isTextArea?: boolean;
  labelName: string;
  isError: boolean;
  onChange: (e: FormData<HTMLFormElement>) => void;
  [key: string]: Function | string | boolean | undefined;
};

function InputGroup(props: InputGroutTypes) {
  const { isTextArea = false, labelName = '', isError = false } = props;
  return (
    <div
      className={`${props.type === 'radio' ? 'flex items-center gap-2' : ''}`}
    >
      <label className={`text-sm ${isError && 'text-red-500'}`}>
        {labelName}
      </label>
      {isTextArea ? (
        <textarea
          {...props}
          className={`text-sm box-border appearance-none w-full h-20 py-2 px-3 text-gray-700 leading-tight border ${
            isError ? 'border-red-500' : 'border-black '
          } focus:outline-none focus:border-blue-700`}
        />
      ) : (
        <input
          {...props}
          className={`text-sm box-border ${props.type === 'radio' ? '' : 'appearance-none w-full'} py-2 px-3 text-gray-700 leading-tight border ${
            isError ? 'border-red-500' : 'border-black'
          } focus:outline-none focus:border-blue-700`}
        />
      )}
    </div>
  );
}

export default InputGroup;
