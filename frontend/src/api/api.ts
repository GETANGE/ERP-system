// login user
import axios from 'axios';

const BASE_URL = 'http://localhost:4004/api/v1';

interface LoginData {
    email:string;
    password: string;
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
        }
    }
}