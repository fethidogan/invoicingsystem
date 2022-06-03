import axios from "axios"

export const fetchData = async (api, token) => {
    const { data } = await axios.get(`/api/${api}`,
        {
            headers: { authorization: `Bearer ${token}` },
        }
    )
    return data.message

}

export const checkIsUser = (usermail, token, api) => {
    if (!usermail || !token) {
        return "redirect"
    }
    else {
        return fetchData(api, token)
    }
}