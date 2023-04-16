
import axios  from 'axios';
import {BASE_URL} from '../../../BaseUrl';

export const SignUpApi =  async ({ username, firstName, lastName, email, password, confirmPassword })=>{
    var body = {
         username, firstName, lastName, email, password, confirmPassword 
    };
   try {
      var {data} = await axios.post(`${BASE_URL}/api/Account/register`,body);
      return data;
   } catch (error) {
        throw error;
   }
}
export const SignInApi = async ({email,password})=>{
     var {data} =  await axios.post(`${BASE_URL}/api/Account/authenticate`,{email,password});
     return data;
}