import * as Yup from 'yup';

// Register Schema
export const registerSchema = Yup.object().shape({
    email: Yup.string()
        .email('Please provide a valid email address.')
        .required('Email is a required field.'),
    fullName: Yup.string().required('Full name is a required field.'),
    userName: Yup.string().required('Username is a required field.'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long.')
        .required('Password is a required field.'),
    association: Yup.string().optional(),
});

// Verify Schema
export const verifySchema = Yup.object().shape({
    email: Yup.string()
        .email('Please provide a valid email address.')
        .required('Email is a required field.'),
    otp: Yup.string()
        .length(6, 'OTP must be exactly 6 characters.')
        .required('OTP is a required field.'),
});

// Login Schema
export const loginSchema = Yup.object().shape({
    emailOrUsername: Yup.string().required(
        'Email or username is a required field.'
    ),
    password: Yup.string().required('Password is a required field.'),
});
