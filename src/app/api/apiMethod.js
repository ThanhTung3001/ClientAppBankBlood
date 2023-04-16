import axios from "axios";
import { useSelector } from "react-redux"





export const PostWithToken = async ({url,body})=>{
    const token = useSelector(state=>state.SignUp.token);
        var response = await axios.post(url,body,{
            headers:{
                'Authorization':token
            }
        }) ;
        return response;
}
export const GetWithToken = async ({url,token})=>{
  //  const token = useSelector(state=>state.SignUp.token);
    // console.log(token);
     var response =  await axios.get(url,{
        headers:{
            'Authorization':token
        }
     });
  
     return response;
}