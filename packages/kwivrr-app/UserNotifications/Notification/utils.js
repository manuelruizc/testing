import React from 'react';
import faker from 'faker';
import moment from 'moment';
import TextRegular from 'kwivrr-ui/TextRegular';

export const createTimeString = (event_time) => {
    const currentTime = moment(new Date());
    const eventTime = moment(event_time);
    const difference = currentTime.diff(eventTime);
    if (difference <= 60000) return 'now';
    else if (difference > 60000 && difference <= 3600000) {
        let minutes = Math.floor(difference / 60000);
        return `${minutes} min`;
    } else if (difference > 3600000 && difference <= 43200000) {
        let hours = Math.floor(difference / 3600000);
        return `${hours} ${hours > 1 ? 'hours' : 'hour'}`;
    }
    return eventTime.format('hh:mm A');
};

export const createMessage = (message, message_vars, isColorElement) => {
    const messageArray = [];
    const regex = /{{(.*?)}}/g;
    const oxxo = message.split(/( )/g).forEach((axa, i) => {
        axa.split(/(\n)/g).forEach((k) => {
            let rawText = k;

            if (regex.test(k)) {
                let typeOfColoring = '';
                const splitMessage = k.replace(
                    /{{(.*?)}}/g,
                    (replaceString) => {
                        const objKey = replaceString.replace(/[{{}}]/g, '');
                        if (objKey === 'event_name')
                            typeOfColoring = 'event_name';
                        if (objKey === 'event_link')
                            typeOfColoring = 'event_link';
                        return message_vars[objKey];
                    }
                );
                if (typeOfColoring === 'event_name') {
                    rawText = (
                        <TextRegular key={faker.datatype.uuid()} color="green">
                            {splitMessage}
                        </TextRegular>
                    );
                } else if (typeOfColoring === 'event_link') {
                    rawText = (
                        <TextRegular key={faker.datatype.uuid()} color="blue">
                            {splitMessage}
                        </TextRegular>
                    );
                } else {
                    rawText = splitMessage;
                }
            }
            let textComponent;
            if (isColorElement) {
                textComponent = (
                    <TextRegular key={faker.datatype.uuid()}>
                        {rawText}
                    </TextRegular>
                );
            } else {
                textComponent = (
                    <TextRegular key={faker.datatype.uuid()}>
                        {rawText}
                    </TextRegular>
                );
            }
            messageArray.push(textComponent);
        });
    });
    return messageArray;
    const splitMessage = message.replace(/{{(.*?)}}/g, (replaceString) => {
        const objKey = replaceString.replace(/[{{}}]/g, '');
        return message_vars[objKey];
    });
    return splitMessage;
};
