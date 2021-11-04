export const ADVANCED_FORMS = [
    {
        type: 'doubleTextInput',
        inputType: ['date', 'date'],
        name: ['scheduledStartTime', 'scheduledEndTime'],
        label: ['Scheduled Start Time', 'Scheduled End Time'],
        placeholder: ['00/00/0000 00:00:00', '00/00/0000 00:00:00']
    },
    {
        type: 'doubleTextInput',
        inputType: ['date', 'date'],
        name: ['publish', 'archive'],
        label: ['Publish', 'Archive'],
        placeholder: ['00/00/0000 00:00:00', '00/00/0000 00:00:00']
    },
    {
        name: 'description',
        type: 'textInput',
        label: 'Description',
        placeholder: `Stream Description & Disclaimer`,
        className: 'inputStyleDescription',
        _props: {
            multiline: true
        }
    },
    {
        name: 'shopLink',
        type: 'textInput',
        label: 'Shop Link',
        placeholder: "Shop URL"
    },
    {
        name: 'languages',
        type: 'textInput',
        label: 'Languages Supported',
        placeholder: "Not Specified"
    },
    {
        name: 'eventCountdown',
        type: 'switch',
        label: 'Event Countdown',
        placeholder: undefined
    }
];