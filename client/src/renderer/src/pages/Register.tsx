import React from 'react'
import Aas from '../assets/image/loginform.png'
import Google from '../assets/image/google.svg'
import { Input } from '@nextui-org/react'
import { BsEye } from 'react-icons/bs'
import { BsEyeSlash } from 'react-icons/bs'
import { Checkbox } from '@nextui-org/react'
import { BiChevronLeft } from 'react-icons/bi'
import './Login.scss'

const Register = () => {
  const [isVisible, setIsVisible] = React.useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <div className=" h-[100vh] flex ">
      <div className="formlogin w-[55%] h-[100vh] bg-white flex justify-center">
        <div className=" flex flex-col w-[420px]  ">
          <div className="backtomain mt-[40px] flex items-center gap-1">
            <BiChevronLeft className=" text-[20px] text-[#a0aec0] " />
            <a href="/#/general" className="  text-[#a0aec0] ">
              Back to Simmmple
            </a>
          </div>

          <div className="titleform flex flex-col mb-[36px] mt-[14vh] ">
            <h3 className=" text-[36px] font-[700] mb-[10px] ">Register</h3>
            <p className=" text-[#A0AEC0] ">Registra tu cuenta!</p>
          </div>
          <button className=" inline-flex appearance-none items-center justify-center select-none relative whitespace-nowrap align-middle outline-transparent outline-2 outline-offset-2 w-auto leading-6 rounded-2xl font-medium shadow-sm transition-all duration-250 ease-in-out box-border h-12 min-w-10 text-sm px-4 bg-secondaryGray-300 mb-6 pt-4 pb-4 text-navy-700 bg-[#F4F7FE] mb-[26px] ">
            <img src={Google} className="w-[20px] h-[20px] mr-[10px] " alt="" />
            Sign in with Google
          </button>
          <div className="or flex items-center mb-[25px] ">
            <div className="flex h-[1px] w-[100%] bg-[#878cbd4d] "></div>
            <p className=" mx-[14px] text-[#a0aec0] ">or</p>
            <div className="flex h-[1px] w-[100%] bg-[#878cbd4d] "></div>
          </div>
          <div className="formloginddiv w-full ">
            <label
              htmlFor=""
              className="flex text-left text-sm font-medium leading-normal transition-opacity duration-300 opacity-100 mr-3 mb-2 ml-1 text-navy-700"
            >
              Email
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              className=" mb-[24px] "
              variant="bordered"
            />
            <label
              htmlFor=""
              className="flex text-left text-sm font-medium leading-normal transition-opacity duration-300 opacity-100 mr-3 mb-2 ml-1 text-navy-700"
            >
              password
            </label>
            <Input
              variant="bordered"
              //   isInvalid={true}
              //   errorMessage="Please enter a valid email"
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <BsEye className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <BsEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? 'text' : 'password'}
              placeholder="Enter your password"
              className=" mb-[24px] "
            />
            <label
              htmlFor=""
              className="flex text-left text-sm font-medium leading-normal transition-opacity duration-300 opacity-100 mr-3 mb-2 ml-1 text-navy-700"
            >
              Confirm password
            </label>
            <Input
              variant="bordered"
              //   isInvalid={true}
              //   errorMessage="Please enter a valid email"
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <BsEye className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <BsEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? 'text' : 'password'}
              placeholder="Enter your password"
              className=" mb-[24px] "
            />
          </div>
          <div className="flex items-center justify-between mb-[24px] ">
            <div className=" w-full relative flex items-center ">
              <Checkbox defaultSelected radius="sm"></Checkbox>
              Keep me logged in
            </div>
            <a href="/recovery-password" className=" text-[14px] w-[150px] ">
              Forgot password?
            </a>
          </div>
          <button className="inline-flex appearance-none items-center justify-center select-none relative whitespace-nowrap align-middle outline-transparent outline-2 outline-offset-2 w-full leading-6 rounded-2xl font-medium shadow-md transition-all duration-250 ease-in-out box-border h-12 min-w-10 text-sm px-4 bg-[#422afb] text-white mb-[24px] ">
            Sign In
          </button>
          <div className=" flex  items-center gap-2 justify-start max-w-full ">
            <p className=" font-[400] text-[14px]  ">Ya tienes una cuenta?</p>
            <a href="/#/login">
              <span className="text-[#422afb] font-[500] ">Logeate aquí</span>
            </a>
          </div>
        </div>
      </div>
      <div className="rightlogin w-[45%] h-[100vh] bg-white ">
        <img src={Aas} alt="" className="w-full h-full object-cover rounded-bl-[250px] " />
      </div>
    </div>
  )
}

export default Register
