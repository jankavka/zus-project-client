export const API_URL = "http://localhost:8080";
// export const API_URL = "http://10.0.0.3:8080"

export const apiGet = async (url, params) => {
  const requestParams = Object.fromEntries(
    Object.entries(params || {}).filter(([_, value]) => value != null)
  );
  const requestOptions = {
    method: "GET",
  };
  const apiUrl = `${API_URL}${url}?${new URLSearchParams(requestParams)}`;
  const json = await fetch(apiUrl, requestOptions).then((response) =>
    response.json()
  );
  return json;
};
