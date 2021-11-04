const HOSTS = {
    YOUTUBE: 'youtube',
    VIMEO: 'vimeo',
};

export const isYoutube = (code) => {
    if (!code) return false;
    const host = getHost(code);
    return host === HOSTS.YOUTUBE;
};

export const isVimeo = (code) => {
    const host = getHost(code);
    return host === HOSTS.VIMEO;
};

function getHost(code) {
    const youtubeRegex = new RegExp(
        '^(https?://)?(www.)?(youtube.com|youtu.?be)/.+$'
    );
    const vimeoURL = new RegExp(
        '^(https?://)?(www.|player.)?(vimeo.com)/(?:channels/(?:w+/)?|groups/(?:[^/]*)/videos/|album/(?:d+)/video/|video/|).+$'
    );
    if (vimeoURL.test(code)) {
        return 'vimeo';
    }
    if (youtubeRegex.test(code)) {
        return 'youtube';
    }
}
