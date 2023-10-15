import axios from 'axios';

const API_URL = '/api/user'

const fetchUser = async (data) => {
    const response = await axios.get(API_URL + '/infor', data)
    // console.log("response fetch user ", response.config.headers.Authorization)
    return response.data
}

const updateUser = async (data, tokenObj) => {
    const response = await axios.patch(API_URL + '/update', data, {
        headers: { Authorization: tokenObj.token }
    })
    // console.log(console.log("response update user ", response.config.headers.Authorization))
    return response.data
}

const userService = {
    fetchUser,
    updateUser
}

export default userService;