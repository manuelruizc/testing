import * as Yup from 'yup';

export const FormSchema = Yup.object().shape({
    streamDetails: Yup.object().shape({
        inPersonEvent: Yup.boolean(),
        streamEvent: Yup.boolean(),
        streamTitle: Yup.string().required('Required'),
        provider: Yup.string().required(),
        streamEmbeddedCode: Yup.string(),
        private: Yup.boolean(),
        tickets: Yup.boolean(),
    }),
    marketing: Yup.object().shape({
        coverUrl: Yup.string(),
        description: Yup.string(),
        shopLink: Yup.string(),
        languagesSupported: Yup.array(),
        groups: Yup.array(),
    }),
    schedulingAndTicketing: Yup.object().shape({
        archiveDate: Yup.string(),
        customTimeZone: Yup.boolean(),
        eventCountdown: Yup.boolean(),
        scheduledStartTime: Yup.string(),
        scheduledEndTime: Yup.string(),
        publishDate: Yup.string(),
        tickets: Yup.boolean(),
        ticketsInfo: Yup.object(),
        paymentAccount: Yup.object().nullable(),
    }),
    speakers: Yup.array(),
    surveys: Yup.array(),
});

export const ValidationSchema = Yup.object().shape({
    archive: Yup.date().nullable(),
    coverUrl: Yup.object().shape({
        source: Yup.string(),
        url: Yup.string(),
        base64: Yup.string(),
    }),
    customTimezone: Yup.bool(),
    embedCode: Yup.string().when(['isStream', 'provider'], {
        is: (isStream, provider) => {
            if (isStream) {
                if (provider === 'Zoom') {
                    return false;
                }
                if (provider === 'kwivrr') {
                    return false;
                }
                return true;
            }
        },
        then: Yup.string().required('Required'),
    }),
    description: Yup.string(),
    disclaimer: Yup.string(),
    endTime: Yup.date()
        .nullable()
        .when(['isInPerson', 'startTime'], {
            is: (isInPerson, startTime) => isInPerson || startTime !== null,
            then: Yup.date()
                .min(Yup.ref('startTime'), 'end date cant be before startTime')
                .required('Required'),
        }),
    generalTicketDescription: Yup.string(),
    // .when(['isTicketed', 'isInPerson'], {
    //     is: (isTicketed, isInPerson) => isTicketed || isInPerson,
    //     then: Yup.string().required('Required'),
    // }),
    groups: Yup.array(),
    hasCountdown: Yup.bool(),
    isPrivate: Yup.bool().required('Required'),
    isTicketed: Yup.bool().required('Required'),
    isInPerson: Yup.bool().required('Required'),
    isStream: Yup.bool().required('Required'),
    languagesSupported: Yup.array(),
    learnMoreUrl: Yup.string().matches(
        /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
        'Enter correct url!'
    ),
    provider: Yup.string().when('isStream', {
        is: true,
        then: Yup.string().required('Required'),
    }),
    price: Yup.number().nullable(),
    // .when(['isTicketed', 'isInPerson'], {
    //     is: (isTicketed, isInPerson) => isTicketed || isInPerson,
    //     then: Yup.number().required('Required'),
    // }),
    publish: Yup.date()
        .nullable()
        .when(['startTime', 'archive'], {
            is: (startTime, archive) => startTime || archive,
            then: Yup.date()
                .max(
                    Yup.ref('startTime'),
                    'publish date cant be after startTime'
                )
                .required('Required'),
        }),
    quantity: Yup.number().nullable(),
    // .when(['isTicketed', 'isInPerson'], {
    //     is: (isTicketed, isInPerson) => isTicketed || isInPerson,
    //     then: Yup.number().required('Required'),
    // }),
    shopLink: Yup.string().matches(
        /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
        'Enter correct url!'
    ),
    speakers: Yup.array(),
    startTime: Yup.date()
        .nullable()
        .when('isInPerson', {
            is: true,
            then: Yup.date().required('Required'),
        }),
    title: Yup.string().required('Required'),
    vipPrice: Yup.number().nullable(),
    // .when(['isTicketed', 'isInPerson'], {
    //     is: (isTicketed, isInPerson) => isTicketed || isInPerson,
    //     then: Yup.number().required('Required'),
    // }),
    vipQuantity: Yup.number().nullable(),
    // .when(['isTicketed', 'isInPerson'], {
    //     is: (isTicketed, isInPerson) => isTicketed || isInPerson,
    //     then: Yup.number().required('Required'),
    // }),
    vipTicketDescription: Yup.string(),
    // .when(['isTicketed', 'isInPerson'], {
    //     is: (isTicketed, isInPerson) => isTicketed || isInPerson,
    //     then: Yup.string().required('Required'),
    // }),
});

export const StreamDetailsSchema = Yup.object().shape({
    streamTitle: Yup.string().required('Required'),
    provider: Yup.string().required(),
    streamEmbeddedCode: Yup.string(),
    private: Yup.boolean(),
    tickets: Yup.boolean(),
});

export const AdvancedDetailsSchema = Yup.object().shape({
    // coverImage: Yup.string(),
    coverUrl: Yup.string(),
    description: Yup.string(),
    shopLink: Yup.string(),
    languagesSupported: Yup.array(),
});

export const SchedulingAndTicketingSchema = Yup.object().shape({
    archiveDate: Yup.string(),
    customTimeZone: Yup.boolean(),
    eventCountdown: Yup.boolean(),
    scheduledStartTime: Yup.string(),
    scheduledEndTime: Yup.string(),
    publishDate: Yup.string(),
    tickets: Yup.boolean(),
});

export const SpeakersSchema = Yup.object().shape({
    speakers: Yup.array(),
});

export const aa = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    emailAddress: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string()
        .min(8, '8 characters min.')
        .required('Password is required'),
    passwordConfirmation: Yup.string()
        .min(8, '8 characters min.')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm your password'),
});
