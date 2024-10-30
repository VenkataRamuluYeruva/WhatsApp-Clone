import React,{useState} from "react";
import '../styles/Input.css';

export default function Input({
    label=null,
    type,
    id,
    value,
    placeholder,
    onchange,
    showPassword=false,
    errorMessage
}) {

    const [isPassword,setIsPassword]=useState(false);

    return (
        <div className="form-group">
            <div className="input-group">
                {label && <label htmlFor={id}>{label}</label>}
                <input 
                    type={isPassword ?'text': type}
                    id={id}
                    name={id}
                    value={value}
                    placeholder={placeholder}
                    onChange={onchange}
                />
            </div>
            {errorMessage && <div className="field-error">
                <p>{errorMessage}</p>
            </div>}
            {type==='password' &&
            <div className="password-container">
                <div className="show-password">
                    <input type='checkbox' id={`show-${id}`} onChange={()=>setIsPassword(!isPassword)}/>
                    <label htmlFor={`show-${id}`}>Show Password</label>
                </div>
                
            </div>}
        </div>
    );
}