import * as Yup from 'yup';
export const createChatroomSchema = Yup.object().shape({
    name: Yup.string()
        .required('Please enter name of chatroom')
        .max(30, 'Chatroom name cannot exceed 30 characters'),
});
