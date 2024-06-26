'use client'

import { BiMenu } from 'react-icons/bi'
import AvatarHelp from '@renderer/components/Avatar/Avatar'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import MultiStepForm from '@renderer/components/CreateCompanyForm'

const Units = () => {
  const navigate = useNavigate()
  const handleNavigate = () => navigate('/general')

  const businessUnits = [
    {
      name: 'El Electricista',
      description: 'Materiales electricos'
    },
    {
      name: 'El Electricista',
      description: 'Materiales electricos'
    },
    {
      name: 'El Electricista',
      description: 'Materiales electricos'
    }
  ]
  const [showForm, setShowForm] = useState(false);

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <div className="flex flex-col">
      <div className="navunits w-full py-[30px] absolute px-[30px] flex justify-between ">
        <BiMenu className=" text-[50px] text-gray-600 " />
        <AvatarHelp />
      </div>
      <div className=" viewunits  3xl:h-[75vh] bg-[#f4f7fe] flex flex-col justify-center items-center w-full 2xl:px-[150px] md:px-[20px] gap-6 px-[10px] ">
        <div className="bartitleandaction w-full flex justify-between items-center cursor-pointer mt-[110px]">
          <h1 className="  font-[500] text-start md:text-[20px] xl:text-[40px]  ">
            Unidades de negocio
          </h1>
          <div onClick={() => setShowForm(true)} className=" xl:h-[40px] xl:w-[150px] xl:text-[20px] bg-c-primary rounded-2xl text-white flex justify-center items-center  font-[500] md:h-[30px] md:w-[100px] md:text-[15px] text-[10px] w-[100px] h-[30px] ">
            + add units
          </div>
          {showForm && <MultiStepForm onClose={handleClose} />}
        </div>
        <div className=" flex w-full lg:justify-between md:justify-start flex-wrap justify-center">
          {businessUnits.map((item, index) => (
            <div className="cardunits cursor-pointer" key={index} onClick={() => handleNavigate()}>
              <div className="imagecard w-[370px] h-[250px] bg-c-primary"></div>
              <div className="textcard flex flex-col py-[15px]">
                <h3 className=" font-[600] ">{item.name}</h3>
                <h4>{item.description}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[100vh] bg-[#a41bff]"></div>
    </div>
  )
}

export default Units
