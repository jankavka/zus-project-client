const API_URL = "http://localhost:8080"

export const apiGet = async(url) => {
    const apiUrl = `${API_URL}${url}`
    const requestParams = {
        method: "GET",
    }

    const json = await fetch(apiUrl,requestParams).then((response) => response.json());
    return json;
}