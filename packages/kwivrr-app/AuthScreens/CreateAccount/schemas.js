import * as Yup from 'yup';

export const CreateAccountSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('First name is required'),
    lastName: Yup.string()
        .required('Last name is required'),
    emailAddress: Yup.string()
        .email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(8, "8 characters min.")
        .required('Password is required'),
    passwordConfirmation: Yup.string()
            .min(8, "8 characters min.")
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm your password')
})