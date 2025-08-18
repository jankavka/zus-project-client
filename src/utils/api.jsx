export const API_URL = "http://localhost:8080";
//export const API_URL = "http://10.0.0.192:8080"

const fetchData = async (apiUrl, requestOptions) => {
  //const allRequestOptions = {...requestOptions}
  const allRequestOptions = { credentials: "include", ...requestOptions };

  const response = await fetch(apiUrl, allRequestOptions)

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error("Network error " + errorResponse.message);
    }

    return response.json();
  ;
};

export const apiGet = async (url, params) => {
  const requestParams = Object.fromEntries(
    Object.entries(params || {}).filter(([_, value]) => value != null)
  );
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };
  const apiUrl = `${API_URL}${url}?${new URLSearchParams(requestParams)}`;
  console.log(apiUrl)

  const response = await fetch(apiUrl, requestOptions)
  const body = await response.json()

  if (!response.ok){
    const error = new Error("Error: Internal server Error")
    throw error

  }
  
  
  return body;
};

export const apiPost = async (url, data) => {
  const requestOptions = {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const apiUrl = `${API_URL}${url}`;
  const json = await fetchData(apiUrl, requestOptions);

  return json;
};

export const apiDelete = async (url) => {
  const requestOptions = {
    method: "DELETE",
    credentials: "include",
  };
  const apiUrl = `${API_URL}${url}`;
  const data = await fetch(apiUrl, requestOptions);
  const json = await data.json();
  
  return json
};


export const apiPut = async (url, data) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const apiUrl = `${API_URL}${url}`;
  const json = await fetchData(apiUrl, requestOptions);
  return json;
};
