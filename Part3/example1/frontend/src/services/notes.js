import axios from "axios";

const baseUrl = '/api/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(r => r.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(r => r.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(r => r.data)
}

export default { getAll, create, update }