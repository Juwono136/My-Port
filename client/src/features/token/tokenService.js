import axios from 'axios';

const API_URL = '/api/user'

const accessToken = async (token) => {
    const response = await axios.post(API_URL + '/refresh_token', token)
    // console.log(response.data)
    return {
        token: response.data.access_token
    }
}

const tokenService = {
    accessToken,
}

export default tokenService;