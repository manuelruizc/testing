import * as Yup from 'yup';
// CreateAccountSchema
export const UpdatePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string()
        .min(8, '8 characters min.')
        .required('Password is required'),
    newPassword: Yup.string()
        .min(8, '8 characters min.')
        .required('Password is required'),
    newPasswordConfirmation: Yup.string()
        .min(8, '8 characters min.')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm your password'),
});
