import React, { useState } from 'react'
import ButtonAuth from './components/ButtonAuth'
import LoginOptions from './components/LoginOptions'
import LoginEmail from './components/LoginEmail'
import { QuestionCircleOutlined } from '@ant-design/icons'
export type Variant = "LOGIN_EMAIL" | "LOGIN" | "REGISTER_EMAIL" | "REGISTER"
const Auth = () => {
  const [variant,setVariant] = useState<Variant>('LOGIN')
  return (
    <div className='bg-white flex justify-center items-center w-full flex-col h-dvh'>
      <header className='flex justify-between px-6 mt-3 w-full'>
        <a href="/" className=''>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 118 42" width="118" height="42" ><path fill="#25F4EE" d="M9.875 16.842v-1.119A8.836 8.836 0 008.7 15.64c-4.797-.006-8.7 3.9-8.7 8.707a8.706 8.706 0 003.718 7.135A8.675 8.675 0 011.38 25.55c0-4.737 3.794-8.598 8.495-8.707z"></path><path fill="#25F4EE" d="M10.086 29.526c2.14 0 3.89-1.707 3.967-3.83l.006-18.968h3.463a6.78 6.78 0 01-.11-1.202h-4.726l-.006 18.969a3.978 3.978 0 01-3.967 3.829 3.93 3.93 0 01-1.846-.46 3.949 3.949 0 003.22 1.662zM23.992 13.166v-1.055a6.506 6.506 0 01-3.583-1.068 6.571 6.571 0 003.583 2.123z"></path><path fill="#FE2C55" d="M20.409 11.043a6.54 6.54 0 01-1.616-4.315h-1.265a6.557 6.557 0 002.88 4.316zM8.706 20.365a3.98 3.98 0 00-3.973 3.976c0 1.528.869 2.858 2.134 3.523a3.936 3.936 0 01-.754-2.321 3.98 3.98 0 013.973-3.976c.409 0 .805.07 1.175.185v-4.833a8.837 8.837 0 00-1.175-.083c-.07 0-.134.006-.204.006v3.708a3.999 3.999 0 00-1.176-.185z"></path><path fill="#FE2C55" d="M23.992 13.166v3.676c-2.453 0-4.727-.786-6.58-2.116v9.621c0 4.802-3.902 8.714-8.706 8.714a8.669 8.669 0 01-4.988-1.579 8.69 8.69 0 006.368 2.781c4.797 0 8.707-3.906 8.707-8.714v-9.621a11.25 11.25 0 006.579 2.116v-4.73c-.48 0-.94-.052-1.38-.148z"></path><path fill="black" d="M17.413 24.348v-9.622a11.251 11.251 0 006.58 2.116v-3.676a6.571 6.571 0 01-3.584-2.123 6.61 6.61 0 01-2.888-4.315H14.06l-.006 18.968a3.978 3.978 0 01-3.967 3.83A3.99 3.99 0 016.86 27.87a3.991 3.991 0 01-2.133-3.523A3.98 3.98 0 018.7 20.372c.409 0 .805.07 1.175.185v-3.708c-4.701.103-8.495 3.964-8.495 8.701 0 2.29.888 4.373 2.338 5.933a8.669 8.669 0 004.988 1.58c4.798 0 8.707-3.913 8.707-8.714zM30.048 13.179h14.774l-1.354 4.232h-3.832v15.644h-4.778V17.41l-4.804.006-.006-4.238zM69.032 13.179h15.12l-1.355 4.232h-4.17v15.644h-4.785V17.41l-4.804.006-.006-4.238zM45.73 19.502h4.733v13.553h-4.708l-.026-13.553zM52.347 13.128h4.733v9.257l4.689-4.61h5.646l-5.934 5.76 6.644 9.52h-5.213l-4.433-6.598-1.405 1.362v5.236H52.34V13.128h.006zM102.49 13.128h4.734v9.257l4.688-4.61h5.647l-5.934 5.76 6.643 9.52h-5.206l-4.433-6.598-1.405 1.362v5.236h-4.734V13.128zM48.093 17.954a2.384 2.384 0 002.382-2.384 2.384 2.384 0 10-2.382 2.384z"></path><path fill="#25F4EE" d="M83.544 24.942a8.112 8.112 0 017.474-8.087 8.748 8.748 0 00-.709-.026c-4.478 0-8.106 3.631-8.106 8.113 0 4.482 3.628 8.113 8.106 8.113.21 0 .498-.013.71-.026-4.178-.326-7.475-3.823-7.475-8.087z"></path><path fill="#FE2C55" d="M92.858 16.83c-.217 0-.505.012-.716.025a8.111 8.111 0 017.468 8.087 8.112 8.112 0 01-7.468 8.087c.211.02.499.026.716.026 4.478 0 8.106-3.631 8.106-8.113 0-4.482-3.628-8.113-8.106-8.113z"></path><path fill="black" d="M91.58 28.887a3.94 3.94 0 01-3.94-3.945 3.94 3.94 0 117.882 0c0 2.18-1.77 3.945-3.942 3.945zm0-12.058c-4.477 0-8.106 3.631-8.106 8.113 0 4.482 3.629 8.113 8.106 8.113 4.478 0 8.106-3.631 8.106-8.113 0-4.482-3.628-8.113-8.106-8.113z"></path></svg>
        </a>
        <div className='flex gap-3 my-auto gap-2'>
        <QuestionCircleOutlined className='my-auto' />
        <p className='font-semibold hidden md:block'>Feedback and help</p>
        </div>
      </header>
      <div className='flex-1 w-full justify-center flex overflow-y-scroll px-3'>
        <div className=" flex  mt-10 md:mt-16 min-w-[330px] max-w-[390px]">
          { variant=== 'LOGIN' && <LoginOptions setVariant={setVariant}/>}
          { variant=== 'LOGIN_EMAIL' && <LoginEmail setVariant={setVariant}/>}
        </div>
      </div>
      <div className='w-full flex flex-col items-center'>
        {
          (variant === "LOGIN" || variant === "REGISTER") && 
          <p className='text-center w-[337px] mb-5 lg:mb-12 text-gray-500 text-[12px]'>
            By continuing, you agree to TikTok’s 
            <span><a href="#" className='font-medium text-black'> Terms of Service </a></span> 
            and confirm that you have read TikTok’s <span><a href="#" className='font-medium text-black'> Privacy Policys </a></span> .
          </p>
        }
        <hr className='bg-gray-200 w-full h-[0.4px]'/>
        <p className='font-semibold py-6 text-center bg-[#f0f0f07f] md:bg-white w-full'>
          Don't have an account? 
          <a href="#" className='text-[#fe2c55]'> Sign up</a>
        </p>
        <div className='bg-[#121212] h-[75px] px-[100px] w-full justify-between hidden md:flex'>
            <div className='border-[0.5px] border-[#ffffff8e] h-fit my-auto text-white px-3 py-1  pe-16'>
              English
            </div>
            <p className='text-gray-400 font-semibold opacity-60 my-auto'>© 2024 TikTok</p>
        </div>
      </div>
    </div>
  )
}

export default Auth