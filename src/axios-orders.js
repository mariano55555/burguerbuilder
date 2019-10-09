import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-b9049.firebaseio.com/'
});

export default instance;