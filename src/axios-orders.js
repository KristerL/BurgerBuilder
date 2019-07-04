import axios from "axios"

const instance = axios.create({
    baseURL: "https://react-596ee.firebaseio.com/"
});

export default instance;