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

export const preventFocus = (e) => {
    e && e.preventDefault();
}

const kickoffFormat = new Intl.DateTimeFormat('default', { hour: '2-digit', minute: '2-digit' });
export const formatKickoff = (date) => kickoffFormat.format(new Date(date));

// serverFailed: the server was reachable and reported a fatal error itself
export const streamError = (streamTotal, matchCount, serverFailed = false) => {
    if (serverFailed) {
        return matchCount > 0
            ? new Error('Nicht alle Spiele konnten geladen werden. Die angezeigten Ergebnisse sind möglicherweise unvollständig.')
            : new Error('Die Spiele konnten nicht geladen werden. Bitte versuche es später erneut.');
    }
    if (!navigator.onLine) {
        return new Error('Keine Internetverbindung. Bitte prüfe deine Verbindung und versuche es erneut.');
    }
    if (streamTotal > 0) {
        return matchCount > 0
            ? new Error('Verbindung unterbrochen. Die angezeigten Ergebnisse sind möglicherweise unvollständig.')
            : new Error('Verbindung unterbrochen.');
    }
    return new Error('Server nicht erreichbar. Bitte versuche es später erneut.');
};

export const busyError = () => new Error('Der Server ist gerade ausgelastet. Bitte versuche es erneut.');

export const groupMatchesByDate = (flatMatches) => {
    const sorted = [...flatMatches].sort((a, b) => a.date.localeCompare(b.date));
    const groups = new Map();
    for (const match of sorted) {
        const day = match.date.slice(0, 10);
        if (!groups.has(day)) groups.set(day, []);
        groups.get(day).push(match);
    }
    return Array.from(groups.entries()).map(([day, matches]) => ({ day, matches }));
};
