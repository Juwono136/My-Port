import axios from "axios";

const API_URL = "/api/skill"

const getSkills = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

const createSkill = async (data, tokenObj) => {
    const response = await axios.post(API_URL + "/add", data, {
        headers: { Authorization: tokenObj.token }
    })

    return response.data
}

const updateSkill = async (data, tokenObj) => {
    const response = await axios.put(API_URL + `/update/${data.id}`, data, {
        headers: { Authorization: tokenObj.token }
    })
    // console.log(response.data)
    return response.data
}

const deleteSKill = async (skillId, tokenObj) => {
    const response = await axios.delete(API_URL + `/delete/${skillId}`, {
        headers: { Authorization: tokenObj.token }
    })
    // console.log(response)
    return response.data
}

const skillService = {
    getSkills,
    createSkill,
    updateSkill,
    deleteSKill
}

export default skillService;