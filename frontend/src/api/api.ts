// login user
import axios from 'axios';

const BASE_URL = 'http://localhost:4004/api/v1';

interface LoginData {
    email:string;
    password: string;
}

interface RegisterData {
    email:string;
    username:string;
    password:string;
    role?:string;
    phoneNumber:string;
}

interface ForgotPassword{
    email: string
}
export const Login = async function(data: LoginData){
    try {
        // send data to the database
        const response = await axios.post(`${BASE_URL}/user/login`, data);
        
        return response.data;

    } catch (error) {
        if(axios.isAxiosError(error)){
            console.error(`Login error: ${error.response?.data?.message || error.message}`);
            throw new Error(error.response?.data?.message || 'Login failed, please try again.')
        }else{
            console.error(`Unexpected error occured: ${error}`);
            throw new Error(`An expected error occured.Please try again.`);
        }
    }
}

export const Register = async function(data: RegisterData){
    try {
        // send data to the database
        const response = await axios.post(`${BASE_URL}/user/register`, data);
        console.log(response.data)
        
        return response.data;

    } catch (error) {
        if(axios.isAxiosError(error)){
            console.error(`Login error: ${error.response?.data?.message || error.message}`);
            throw new Error(error.response?.data?.message || 'Login failed, please try again.')
        }else{
            console.error(`Unexpected error occured: ${error}`);
            throw new Error(`An expected error occured.Please try again.`);
        }
    }
}
export const forgotPassword = async function(data: ForgotPassword){
    try {
        // send data to the database
        const response = await axios.patch(`${BASE_URL}/user/forgotPassword`, data);
        console.log(response.data)
        
        return response.data;

    } catch (error) {
        if(axios.isAxiosError(error)){
            console.error(`Login error: ${error.response?.data?.message || error.message}`);
            throw new Error(error.response?.data?.message || 'Login failed, please try again.')
        }else{
            console.error(`Unexpected error occured: ${error}`);
            throw new Error(`An expected error occured.Please try again.`);
        }
    }
}