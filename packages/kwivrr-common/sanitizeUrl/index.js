function sanitizeUrl(url) {
    let newUrl;
    if (!url.startsWith('http') || !url.startsWith('https')) {
        newUrl = 'https://' + url;
    } else {
        return url;
    }
    return newUrl;
}

export default sanitizeUrl;
