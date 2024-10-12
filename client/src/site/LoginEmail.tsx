import React, { useEffect } from 'react';
import { Input, message, Space, Spin } from 'antd';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LeftOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import Button from '@/components/Button';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@features/auth/authSlice';
import { LoginParams } from '@features/auth/authService';
import { authSelector } from '@/redux/selector';
import { AppDispatch } from '@/redux/store';
import { useNavigate } from 'react-router-dom';
const loginSchema = yup.object({
  emailOrUsername: yup.string().required('Email or username is required'),
  password: yup.string().required('Password is required'),
});
const LoginEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector(authSelector);
  const initialValues: LoginParams = {
    emailOrUsername: '',
    password: '',
  };
  const formik = useFormik<LoginParams>({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const resp = await dispatch(login(values)).unwrap();
      message.success('Logged in successfully');
      navigate('/');
    },
  });

  return (
    <div className="flex-1 w-full justify-center flex overflow-y-scroll px-3">
      <div className=" flex  mt-10 md:mt-16 min-w-[330px] max-w-[390px]">
        <div className="flex flex-col items-center w-full ">
          <h1 className="text-center font-bold text-3xl">Log In</h1>
          <div className="w-full mt-5">
            <form onSubmit={formik.handleSubmit}>
              <p className="font-semibold">Email or username</p>
              <Input
                placeholder="Email or username"
                className="mt-2 mb-1 rounded-none border-[1px] py-2 ps-3 caret-[#fe2c55] text-color"
                style={{ borderColor: '#1618231f', backgroundColor: '#F1F1F2' }}
                name="emailOrUsername"
                onChange={formik.handleChange('emailOrUsername')}
                onBlur={formik.handleBlur('emailOrUsername')}
                value={formik.values.emailOrUsername}
              />
              <p className="text-rose-500 text-sm ps-3">
                {formik.touched.emailOrUsername &&
                  formik.errors.emailOrUsername}
              </p>

              <Input.Password
                placeholder="Password"
                className="mt-2 rounded-none  border-[1px] py-2 ps-3 caret-[#fe2c55] text-color"
                style={{ borderColor: '#1618231f', backgroundColor: '#F1F1F2' }}
                name="password"
                onChange={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                value={formik.values.password}
              />
              <p className="text-rose-500 text-sm ps-3">
                {formik.touched.password && formik.errors.password}
              </p>
              <div className="mt-2">
                <a href="" className="text-color-75 text-xs font-bold">
                  Forgot password?
                </a>
              </div>
              <Button type="submit" className="mt-4">
                {authState.isLoading && (
                  <Spin
                    className=""
                    indicator={
                      <LoadingOutlined
                        style={{ fontSize: 24, color: 'white' }}
                        spin
                      />
                    }
                  />
                )}
                {!authState.isLoading && 'Log in'}
              </Button>
              <div className="mt-8 mx-auto w-fit">
                <a
                  onClick={() => {
                    navigate(-1);
                  }}
                  className="flex gap-2 hover:cursor-pointer hover:opacity-80"
                >
                  <LeftOutlined />
                  <p className="text-black text-[14px] font-semibold">
                    Go back
                  </p>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginEmail;
