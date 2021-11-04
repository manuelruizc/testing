import * as Yup from 'yup';

const yupUrl = Yup.string().matches(
    /((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    'Enter a valid url'
);

export const SocialMediaSchema = Yup.object().shape({
    facebookId: Yup.string(),
    instagramId: Yup.string(),
    twitterId: Yup.string(),
    youtubeId: Yup.string(),
    linkedinId: Yup.string(),
});
