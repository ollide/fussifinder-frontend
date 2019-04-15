export const handleFetchJsonResponse = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
    } else {
        throw Error(`Invalid response type '${contentType}'`);
    }
}
