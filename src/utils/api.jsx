import { emitAuthExpired } from "./authEvents";

export const API_URL = ""

const handleErrorResponse = async (response, fallbackMessage) => {
  if (response.status === 401 || response.status === 403) {
    emitAuthExpired();
  }

  let message = fallbackMessage;
  try {
    const errorResponse = await response.json();
    message = errorResponse.message || message;
  } catch {
    // response body wasn't JSON, keep fallbackMessage
  }

  const error = new Error(message);
  error.status = response.status;
  return error;
};

const fetchData = async (apiUrl, requestOptions) => {
  const allRequestOptions = { credentials: "include", ...requestOptions };

  const response = await fetch(apiUrl, allRequestOptions)

    if (!response.ok) {
      throw await handleErrorResponse(response, "Network error");
    }

    return response.json();
  ;
};

export const apiGet = async (url, params) => {
  const requestParams = Object.fromEntries(
    Object.entries(params || {}).filter(([, value]) => value != null)
  );
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };
  const apiUrl = `${API_URL}${url}?${new URLSearchParams(requestParams)}`;

  const response = await fetch(apiUrl, requestOptions)

  if (!response.ok){
    throw await handleErrorResponse(response, "Error: Internal server Error");
  }

  const body = await response.json()

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
  if (!data.ok){
    throw await handleErrorResponse(data, "Error");
  }
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
