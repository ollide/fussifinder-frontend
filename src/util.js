export const handleFetchJsonResponse = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    // data is being fetched on the server, this may take a couple of minutes
    if (response.status === 204) {
        throw Error('WAIT');
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
    } else {
        throw Error(`Invalid response type '${contentType}'`);
    }
}

export const preventFocus = (e) => {
    e && e.preventDefault();
}

const kickoffFormat = new Intl.DateTimeFormat('default', { hour: '2-digit', minute: '2-digit' });
export const formatKickoff = (date) => kickoffFormat.format(new Date(date));
