import AvatarHelp from '@renderer/components/Avatar/Avatar'
import React from 'react'
import { BiMenu, BiCog, BiBell } from 'react-icons/bi'

const Units = () => {
  return (
    <div className="flex flex-col">
      <div className="navunits w-full  py-[30px] absolute px-[30px]  flex justify-between ">
        <BiMenu className=" text-[50px] text-gray-600 " />
        <AvatarHelp />
      </div>
      <div className=" viewunits  3xl:h-[75vh] bg-[#f4f7fe] flex flex-col justify-center items-center w-full 2xl:px-[150px] md:px-[20px] gap-6 px-[10px] ">
        <div className="bartitleandaction w-full flex justify-between items-center cursor-pointer mt-[110px]">
          <h1 className="  font-[500] text-start md:text-[20px] xl:text-[40px]  ">
            Unidades de negocio
          </h1>
          <div className=" xl:h-[40px] xl:w-[150px] xl:text-[20px] bg-[#721ff7] rounded-2xl text-white flex justify-center items-center  font-[500] md:h-[30px] md:w-[100px] md:text-[15px] text-[10px] w-[100px] h-[30px] ">
            + add units
          </div>
        </div>

        <div className=" flex w-full lg:justify-between   md:justify-start flex-wrap justify-center">
          <div className="cardunits cursor-pointer  m-5">
            <div className="imagecard w-[370px] h-[250px] bg-[#721ff7]  "></div>
            <div className="textcard flex flex-col py-[15px]">
              <h3 className=" font-[600] ">El Electricista</h3>
              <h4>Materiales electricos</h4>
            </div>
          </div>
          <div className="cardunits cursor-pointer m-5">
            <div className="imagecard w-[370px] h-[250px] bg-[#721ff7] "></div>
            <div className="textcard flex flex-col py-[15px] ">
              <h3 className="font-[600]">El Electricista</h3>
              <h4>Materiales electricos</h4>
            </div>
          </div>
          <div className="cardunits cursor-pointer m-5">
            <div className="imagecard w-[370px] h-[250px] bg-[#721ff7] "></div>
            <div className="textcard flex flex-col py-[15px]">
              <h3 className="font-[600]">El Electricista</h3>
              <h4>Materiales electricos</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[100vh] bg-[#a41bff]"></div>
    </div>
  )
}

export default Units
