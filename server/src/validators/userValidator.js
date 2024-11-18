import * as Yup from 'yup';
export const updateUserValidator = Yup.object()
    .shape({
        userName: Yup.string(),
        fullName: Yup.string(),
        bio: Yup.string(),
    })
    .test(
        'at-least-one',
        'At least one field userName, fullName or bio is required',
        (value) => {
            return value.userName || value.fullName || value.bio; // Ít nhất một trường phải có giá trị
        }
    );
export const updatePeerIdValidator = Yup.object().shape({
    peerId: Yup.string().required('Please provide a peer id'),
});
export const getUserByIdvalidator = Yup.object().shape({
    userId: Yup.string().required('Please provide userId'),
});
