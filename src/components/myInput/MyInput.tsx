import "./myInput.css";

interface IMyInputProps {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function MyInput({ name, type = "text", placeholder = "default text", label = "default label", value, onChange}: IMyInputProps) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input onChange={onChange} placeholder={placeholder} value={value} type={type} name={name} />
    </>
  );
}

export default MyInput;