import axios from "axios"

export const postAPI = async (url: string, field?: object) => {
    const res = await axios.post(`${process.env.REACT_APP_HOST}/${url}`, field)

    return res.data
}