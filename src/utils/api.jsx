export const API_URL = "http://localhost:8080";
// export const API_URL = "http://10.0.0.3:8080"

const fetchData = async (apiUrl, requestOptions) => {
  await fetch(apiUrl, requestOptions).then((response) => {
    if (!response.ok) {
      const errorResponse = response.json();
      throw new Error("Network error " + errorResponse.message);
    }
    response.json();
  });
};

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

export const apiPost = async (url, data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const apiUrl = `${API_URL}${url}`;
  const json = fetchData(apiUrl, requestOptions);

  return json;
};

export const apiDelete = async (url) => {
  const requestOptions = {
    method: "DELETE",
  };
  const apiUrl = `${API_URL}${url}`;
  const json = await fetch(apiUrl, requestOptions).then((response) =>
    response.json()
  );

  return json;
};

export const apiPut = async (url, data) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const apiUrl = `${API_URL}${url}`;
  const json = fetchData(apiUrl, requestOptions);
  return json;
};
