function httpGet(apiPath) {
    return fetch(apiPath)
        .then(response => response.json())
        .catch(() => null);
}

export default httpGet;
