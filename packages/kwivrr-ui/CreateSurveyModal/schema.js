import * as Yup from 'yup';

export const SurveySchema = Yup.object().shape({
    type: Yup.number().required(),
    question: Yup.string().required(),
    options: Yup.array(),
    deliveryType: Yup.string().required(),
    scheduleRelease: Yup.string().required(),
});
