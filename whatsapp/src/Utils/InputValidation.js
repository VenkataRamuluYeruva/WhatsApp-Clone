
export function PasswordValidation(password) {
    if (password.length < 8) {
        return 'Password must be greater than 8 characters';
    }
    else if(!/[A-Z]/.test(password)){
        return 'Upper case letter required';
    }
    else if(!/[a-z]/.test(password)){
        return "Lower case letter required";
    }
    else if(!/[0-9]/.test(password)){
        return "Number required";
    }
    else if(!/[@$!%*?&#]/.test(password)){
        return "Special character required";
    }
    else{
        return null;
    }
}

export const EmailValidation=(email)=>{

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email)
        return 'Email is required';
    else if (!emailRegex.test(email))
        return 'Invalid email format';
    else
        return null;
}

export const UsernameValidation=(username)=>{
    if(!username)
        return 'Username is required';
    else if(username.length<3)
        return 'Username must be greater than 3 characters';
    else
        return null;
}