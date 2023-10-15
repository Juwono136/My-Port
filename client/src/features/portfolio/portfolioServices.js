import axios from 'axios';

const API_URL = "/api/portfolio"

const getPortfolios = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

const createPortfolio = async (data, tokenObj) => {
    const response = await axios.post(API_URL + '/add', data, {
        headers: { Authorization: tokenObj.token }
    })

    return response.data
}

const updatePortfolio = async (data, tokenObj) => {
    const response = await axios.put(API_URL + `/update/${data.id}`, data, {
        headers: { Authorization: tokenObj.token }
    })
    return response.data
}

const deletePortfolio = async (portfolioId, tokenObj) => {
    const response = await axios.delete(API_URL + `/delete/${portfolioId}`, {
        headers: { Authorization: tokenObj.token }
    })

    return response.data
}

const portfolioService = {
    getPortfolios,
    createPortfolio,
    updatePortfolio,
    deletePortfolio
}

export default portfolioService;