import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-project-d8331.firebaseio.com'
});

export default instance;