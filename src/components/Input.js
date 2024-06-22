import { ChangeEvent, FC } from 'react'
import './Input.css';

interface InputProps {
  type: 'text';
  autoComplete: string;
  label: string;
  value: string | number;
  name: string;
  placeholder: string;
  error: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = ({
  type,
  label,
  autoComplete,
  value,
  name,
  placeholder,
  error,
  disabled,
  onChange,
}) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={label}>{label}</label>
      <input
        autoComplete={autoComplete}
        type={type}
        id={label}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
      <button className="send" type="submit">></button>
      {error && <p className="error">Ran out of tokens, sorry.</p>}
    </div>
  )
}

export default Input