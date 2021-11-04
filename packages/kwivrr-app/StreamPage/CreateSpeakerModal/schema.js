import * as Yup from 'yup';

export const NewSpeakerSchema = Yup.object().shape({
    username: Yup.string(),
    name: Yup.string().required('Required'),
    about: Yup.string().required('Required'),
    avatarBase64: Yup.string(),
});
