import React,{useState} from "react";  
import {PasswordValidation,EmailValidation,UsernameValidation} from '../Utils/InputValidation';
import { Link,useNavigate} from "react-router-dom";
import '../styles/login.css';
import Input from '../Components/Input';
import {useNotification} from '../Contexts/NotificationContext';
import useApiServices from "../Utils/ApiServices";

export default function Signup() {
    const {showNotification} = useNotification();
    const {SignupAPI} = useApiServices();
    const navigate=useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    
    const handlesignup = async (e) => {
        e.preventDefault();

        const usernameValidationError = UsernameValidation(username);
        const emailValidationError = EmailValidation(email);
        const passwordValidationError = PasswordValidation(password);

        if(usernameValidationError || emailValidationError || passwordValidationError){
            showNotification('Please fill the form correctly','error');
            return;
        }

        const data={username,email,password};
        const response=await SignupAPI(data);
        if(response){
            setUsername('');
            setEmail('');
            setPassword('');
            setTimeout(()=>{
                navigate('/authentication/login');
            },3000);
        }
    }

    return (
        <div className='Container'>
            <div className="signup-container">
                <div className="Login-header">
                    <div className="header-img">
                        <img src="/WhatsApp-icon.png" alt="whatsapp" />
                        <p>WhatsApp</p>
                    </div>
                    <div className="header-title">
                        <p>SignUp to Continue</p>
                    </div>
                </div>
                <form method="POST" onSubmit={handlesignup}>
                    <Input
                        label='Username'
                        type='text'
                        id='username'
                        value={username}
                        placeholder='Enter Username'
                        errorMessage={usernameError}
                        onchange={(e) =>{setUsername(e.target.value);
                            setUsernameError(UsernameValidation(e.target.value));
                        }}
                    />
                    <Input
                        label='Email'
                        type='email'
                        id='email'
                        value={email}
                        placeholder='Enter Email'
                        errorMessage={emailError}
                        onchange={(e) =>{setEmail(e.target.value);
                            setEmailError(EmailValidation(e.target.value));
                        }}
                    />
                    <Input
                        label='Password'
                        type='password'
                        id='password'
                        value={password}
                        placeholder='Enter Password'
                        errorMessage={passwordError}
                        onchange={(e) =>{setPassword(e.target.value);
                            setPasswordError(PasswordValidation(e.target.value));
                        }}
                    />
                    <div className="form-button">
                        <button><span>SignUp</span></button>
                    </div>
                    <div className="signup-link">
                        <p>
                            Already have an account? click <Link to='/authentication/login'  style={{color:'blue',textDecoration:'none'}}>
                            <span>login</span></Link> here
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

  
  