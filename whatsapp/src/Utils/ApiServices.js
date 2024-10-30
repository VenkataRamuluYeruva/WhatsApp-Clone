import axios from "axios";
import { useDispatch } from "react-redux";
import { useNotification } from "../Contexts/NotificationContext";
import { setUserDetails,setRemainingUser,setTokenData} from "../Contexts/store"; // Adjust the import path accordingly

const useApiServices = () => {
    const dispatch = useDispatch();
    const { showNotification } = useNotification();

    const LoginAPI = async (body) => {
        try {
            const response = await axios.post("http://localhost:4000/authentication/login", body);
            if(response.data.message){
                showNotification(response.data.message,'success');
                const {message,...userDetails}=response.data;
                const modifiedUserDetails={...userDetails};
                dispatch(setTokenData(modifiedUserDetails));
                localStorage.setItem('userId',response.data.userId);
                localStorage.setItem('accessToken',response.data.accessToken);
                return true;
            }
        } catch (error) {
            showNotification(error.response.data.error,'error');
            return false; 
        }
    };

    const SignupAPI = async (body) => {
        try {
            const response = await axios.post("http://localhost:4000/authentication/signup", body);
            if(response.data.message){
                showNotification(response.data.message,'success');
                return true;
            }

        } catch (error) {
            showNotification(error.response.data.error,'error');
            return false; 
        }
    };

    const OtherUsersAPI = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:4000/chat/otherusers/${userId}`);
            dispatch(setRemainingUser(response.data.result));
        } catch (error) {
            showNotification("Failed to fetch users!",'error');
            return null; 
        }
    };

    const UserDataAPI = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:4000/chat/user/${userId}`);
            dispatch(setUserDetails(response.data.result[0]));
            return true;
        } catch (error) {
            showNotification("Failed to fetch user data!",'error');
            return false; 
        }
    };

    return { LoginAPI, SignupAPI,OtherUsersAPI,UserDataAPI }; 
};

export default useApiServices;
