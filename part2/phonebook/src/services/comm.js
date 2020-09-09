import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request  = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newAdd) => {
    const request = axios.post(baseUrl, newAdd)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request
}

const put = (id, newAdd) => {
    const request = axios.put(`${baseUrl}/${id}`, newAdd)
    return request.then(response => response.data)
}

export default { getAll, create, remove, put }