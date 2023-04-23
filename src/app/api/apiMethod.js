import axios from "axios";
import { useSelector } from "react-redux"
import { BASE_URL } from "../../BaseUrl";





export const PostWithToken = async ({ url, body, token }) => {
  // const token = useSelector(state=>state.SignUp.token);
  console.log(`${BASE_URL}${url}`);
try {
  var response = await axios.post(`${BASE_URL}${url}`, body, {
    headers: {
      'Authorization': token
    },

  });
  return response;
} catch (error) {
    console.log(error);
}
}
export const PutWithToken = async ({ url, body, token }) => {

  // const appToken = useSelector(state=>state.SignUp.token);
  var response = await axios.put(`${BASE_URL}${url}`, body, {
    headers: {
      'Authorization': token,
    },
  });
  return response;
}
export const GetWithToken = async ({ url, token }) => {
  //  const token = useSelector(state=>state.SignUp.token);
  // console.log(token);
  var urls = `${BASE_URL}${url}`;
  // console.log({ urls, token });
  var response = await axios.get(urls, {
    headers: {
      'Authorization': token
    }
  });

  return response;
}
export const PatchWithToken = async ({ url, body, token }) => {
  //  const token = useSelector(state=>state.SignUp.token);
  // console.log(token);
  var response = await axios.patch(`${BASE_URL}${url}`, body, {
    headers: {
      'Authorization': token,
      "Content-Type": "application/json"
    },
  });
  //  console.log(response);

  return response;
}

export const DeleteWithToken = async ({ url, body, token }) => {
  //  const token = useSelector(state=>state.SignUp.token);
  console.log(token);
  var response = await axios.delete(`${BASE_URL}${url}`, {
    headers: {
      'Authorization': token,
    },
  });
  //  console.log(response);

  return response;
}

export const PostFileWithToken = async ({ url, token, file }) => {

  var data = new FormData()
  data.append('image',file,file.name);
  data.append('name', 'ABC');   //append the values with key, value pair
  data.append('age', 20);
  var response = await axios.post(`${BASE_URL}${url}`, data, {
    headers: {
      'Authorization': token,
      "Content-Type": "multipart/form-data"
    },
  });
  return response;
}