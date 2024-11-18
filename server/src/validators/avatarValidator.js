import * as Yup from 'yup';
export const avatarSchema = Yup.object().shape({
    avatarImage: Yup.string().required('Please upload an avatar'),
    userId: Yup.string().required('Please provide userId'),
});
