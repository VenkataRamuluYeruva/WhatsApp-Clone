import React, { useState} from "react";  
import '../styles/login.css';
import Input from "../Components/Input";
import { PasswordValidation,EmailValidation } from "../Utils/InputValidation";
import { Link,useNavigate} from "react-router-dom";
import { useNotification } from "../Contexts/NotificationContext";
import useApiServices from "../Utils/ApiServices";

export default function Login() {
    const { showNotification } = useNotification();
    const { LoginAPI } = useApiServices();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError,setEmailError]=useState(null);
    const [passwordError,setPasswordError]=useState(null);

    const handleLogin =async (e) => {
        e.preventDefault();

        const emailValidationError = EmailValidation(email);
        const passwordValidationError = PasswordValidation(password);

        if(emailValidationError || passwordValidationError){
            showNotification('Please fill the form correctly','error');
            return;
        }
        const data={email,password};
        const response=await LoginAPI(data);
        if(response){
            setEmail('');
            setPassword('');
            setTimeout(()=>{
                navigate('/home/chat');
            },3000);
        }
        
    }
    
    return (
        <div className="Container">

            <div className="Login-Container">
                <div className="Login-header">
                    <div className="header-img">
                        <img src="/WhatsApp-icon.png" alt="whatsapp" />
                        <p>WhatsApp</p>
                    </div>
                    <div className="header-title">
                        <p>Login to Continue</p>
                    </div>
                </div>
                
                <form method="POST" onSubmit={handleLogin}>
                    <Input 
                        label='Email'
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        placeholder='Enter Email'
                        errorMessage={emailError}
                        onchange={(e)=>{setEmail(e.target.value);
                            setEmailError(EmailValidation(e.target.value));
                        }}
                    />
                    <Input
                        label='Password'
                        type='password'
                        id='password'
                        name='password'
                        value={password}
                        placeholder='Enter Password'
                        errorMessage={passwordError}
                        onchange={(e)=>{setPassword(e.target.value);
                        setPasswordError(PasswordValidation(e.target.value));
                        }}
                    />
                    <div className="form-button">
                        <button><span>Login</span></button>
                    </div>
                    <div className="signup-link">
                        <p>
                            Don't have an account? click <Link to='/authentication/signup'  style={{color:'blue',textDecoration:'none'}}>
                            <span>signup</span></Link> here
                        </p>
                    </div>
                    
                </form>
            </div>

        </div>
    )
}
