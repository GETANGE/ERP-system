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
export const Login = async function(data: LoginData){
    try {
        if(!data.email || !data.password){
            throw new Error(`Email and password is required`)
        }

        // send data to the database
        const response = await axios.post(`${BASE_URL}/user/login`, data, {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        });
        
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
        if(!data.email || !data.password){
            throw new Error(`Email and password is required`)
        }
        if(!data.username || !data.phoneNumber){
            throw new Error(`Username and phoneNumber is required`)
        }

        // send data to the database
        const response = await axios.post(`${BASE_URL}/user/register`, data, {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        });
        
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