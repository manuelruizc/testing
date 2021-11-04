import vimeoParser from 'kwivrr-common/vimeoParser';
import moment from 'moment';

const getEventType = (isInPerson) => {
    if (isInPerson) {
        return 'physical';
    }
    return 'digital';
};

const booleanToNumber = (bool) => (bool ? 1 : 0);

const getProviderName = (provider) => {
    if (provider === undefined || provider === null || provider.length === 0)
        return '';
    if (provider === 'youtube') return 'YouTube';
    return provider[0].toUpperCase() + provider.substr(1);
};

const getDate = (date) => (date === null ? null : new Date(date));

const youtube_parser = (url) => {
    var regExp =
        /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
        return match[2];
    } else {
        //error
    }
};

const createEmbedCode = (url, provider) => {
    let link;
    if (provider === 'youtube') {
        link = youtube_parser(url);
        return `<iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/${link}"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                >
                </iframe>`;
    }
    if (provider === 'vimeo') {
        link = vimeoParser(url);
        return `<iframe src="https://player.vimeo.com/video/${link}?h=66b8434e92&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    }
};

const getEndDate = (endDate, startDate) => {
    return moment(startDate).add(1, 'hour');
};

export const createPayloadForNewEvent = (values, errors) => {
    const { isInPerson, isStream, isTicketed, coverUrl } = values;
    const isImmediateEvent = values.startTime === null;
    const startDate =
        values.startTime === null ? new Date() : getDate(values.startTime);
    const endDate =
        values.startTime === null && values.endTime === null
            ? getEndDate(values.endTime)
            : getDate(values.endTime);
    // initializing payload with default data
    const payload = {
        count_down_display: booleanToNumber(values.hasCountdown), // 0=false, 1=true,
        description: values.description,
        disclaimer: values.disclaimer,
        event_type: getEventType(isInPerson),
        // end_date: endDate,
        // event_image: values.cover_url,
        learnmore_url: values.learnMoreUrl,
        languages_supported: values.languagesSupported,
        // languages_supported: ['en'],
        name: values.title,
        // publish_date: getDate(values.publish),
        // start_date: startDate,
        visibility: booleanToNumber(values.isPrivate), // 0 | 1 0=public, 1=private,
        // embed_code: values.embed_code,
        // shop_url: values.shop_url,
    };

    if (isImmediateEvent) {
        payload.livestream_type = 'is_immediate';
    } else {
        payload.start_date = startDate;
        payload.end_date = endDate;
        payload.archive_date = getDate(values.archive);
        payload.publish_date = getDate(values.publish);
    }

    if (coverUrl.base64.length > 0 || coverUrl.url.length > 0) {
        if (coverUrl.source === 'base64') {
            payload.event_image_base64 = coverUrl.base64;
        } else {
            payload.event_image_url = coverUrl.url;
        }
    }

    // if it's a digital event
    if (isStream) {
        const provider = getProviderName(values.provider);
        const embed_code = createEmbedCode(values.embedCode, provider);
        payload.shop_url = values.shopUrl;
        payload.embed_code = embed_code;
        payload.provider_attributes = {
            embed_code,
            provider_type: provider,
        };
    }

    if (!isTicketed) {
        payload.vip_ticket_description = '';
        payload.general_ticket_description = '';
        payload.vip_capacity = 5000;
        payload.general_ticket_price = 0;
        payload.vip_ticket_price = 0;
        payload.general_capacity = 95000;
        payload.total_capacity = 100000;
    }

    if (isTicketed) {
        payload.vip_capacity = values.vipQuantity;
        payload.general_ticket_description = values.generalTicketDescription;
        payload.vip_ticket_description = values.vipTicketDescription;
        payload.general_ticket_price = values.price;
        payload.vip_ticket_price = values.vipPrice;
        payload.general_capacity = values.quantity;
        payload.total_capacity =
            Number(values.vipQuantity) + Number(values.quantity);
    }
    // console.log('$$value', values)
    // console.log('$$errorrs', errors)
    return payload;
};

export const createPayloadForNewEventPublicMethod = (values) => {
    try {
        const { isInPerson, isStream, isTicketed, coverUrl } = values;
        const isImmediateEvent = values.startTime === null;
        const startDate = getDate(values.startTime);
        const endDate = getDate(values.endTime);

        const payload = {
            description: values.description,
            disclaimer: values.disclaimer,
            startDate: startDate,
            endDate: endDate,
            publishDate: getDate(values.publish),
            archiveDate: getDate(values.archive),
            userId: 'me',
            title: values.title,
            isPhysical: isInPerson,
            description: values.description,
            disclaimer: values.disclaimer,
            // promotionalVideoEmbedCode, // test it later
            isPrivate: values.isPrivate,
            eventType: getEventType(isInPerson),
            learnMoreUrl: values.learnMoreUrl,
            availableLanguages: values.languagesSupported,
            withCountdownDisplay: values.hasCountdown,
        };

        if (isStream) {
            const provider = values.provider;
            payload.shopUrl = values.shopLink;
            payload.embedCode = createEmbedCode(values.embedCode, provider);
            payload.streamType = provider;
        }

        if (!isTicketed) {
            payload.vipTicketDescription = '';
            payload.generalTicketDescription = '';
            payload.vipCapacity = 5000;
            payload.generalTicketPrice = 0;
            payload.vipTicketPrice = 0;
            payload.generalCapacity = 95000;
            payload.totalCapacity = 100000;
        } else {
            payload.generalCapacity = Number(values.quantity);
            payload.vipCapacity = Number(values.vipQuantity);
            payload.generalTicketPrice = Number(values.price);
            payload.vipTicketPrice = Number(values.vipPrice);
            payload.generalTicketDescription = values.generalTicketDescription;
            payload.vipTicketDescription = values.vipTicketDescription;
            payload.totalCapacity =
                Number(values.quantity) + Number(values.vipQuantity);
        }
        if (coverUrl.itChanged) {
            payload.eventImageBase64 = coverUrl.base64;
        }
        payload.eventSpeakers = values.speakers;
        console.log('paypersload', payload);
        return payload;
    } catch (e) {
        console.log(e);
    }
};
