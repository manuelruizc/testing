import * as Yup from 'yup';

export const TransferEmailSchema = Yup.object().shape({
    email: Yup.string('').required('Required').email('Invalid Email')
})