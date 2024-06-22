import { ChangeEvent, FC } from 'react'
import './ChatBox.css';

/*
finish later. have a div to contain the messages, allow a scroll inside that div for overflows.
each message is contain in a <p> container, customize it later with the .css
allow a button to go all the way to the end of chat
*/ 
interface BoxProps {
    label: string;
    name: string;
    disabled?: boolean;
  }
  
  const Input: FC<BoxProps> = ({
    type,
    label,
    name,
    disabled,
  }) => {
    return (
      <div className="box-wrapper">
        <label htmlFor={label}>{label}</label>
        <label type='text'>

        </label>
      </div>
    )
  }
  
  export default Input