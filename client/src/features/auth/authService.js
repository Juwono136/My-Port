import axios from 'axios';

const API_URL = '/api/user'

// signin user
const signin = async (userData) => {
    const response = await axios.post(API_URL + '/signin', userData)

    if (response.data) {
        localStorage.setItem('profile', JSON.stringify(response.data))
    }

    // console.log(response.data)
    return response.data
}

const forgotPassword = async (email) => {
    const response = await axios.post(API_URL + '/forgot', email)

    // console.log(response.data)
    return response.data
}

const resetPassword = async (data, token) => {
    const response = await axios.post(API_URL + '/reset', data, {
        headers: { Authorization: token }
    })

    // console.log(response.data)
    return response.data
}

const logout = async () => {
    const response = await axios.get(API_URL + '/logout')
    localStorage.removeItem('profile')
    // window.location.href = "/auth"
    return response.data
}

const authService = {
    signin,
    logout,
    forgotPassword,
    resetPassword,
}

export default authService;