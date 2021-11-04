import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    password: Yup.string()
        // .min(8, "8 characters min.")
        .max(50, 'Too Long')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});
