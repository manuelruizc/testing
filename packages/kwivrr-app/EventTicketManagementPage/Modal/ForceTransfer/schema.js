import * as Yup from 'yup';

export const ForceTransferSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().required('Required').email('Invalid Email'),
    password: Yup.string()
        .min(8, "8 characters min.")
        .required('Password is required'),
    passwordConfirmation: Yup.string()
            .min(8, "8 characters min.")
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm your password')
})