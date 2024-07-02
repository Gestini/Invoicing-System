import React from 'react'
import { Button } from '@nextui-org/react'
import { BiMenu } from 'react-icons/bi'
import { PlusIcon } from '@renderer/components/Icons/PlusIcon'
import { useNavigate } from 'react-router-dom'
import MultiStepForm from '@renderer/components/CreateCompanyForm'
import { NavbarUserOptions } from '@renderer/components/Navbar/NavbarUserOption'

const Units = () => {
  const navigate = useNavigate()
  const handleNavigate = () => navigate('/general')

  const businessUnits = [
    {
      name: 'El Electricista',
      description: 'Materiales electricos',
    },
    {
      name: 'El Electricista',
      description: 'Materiales electricos',
    },
    {
      name: 'El Electricista',
      description: 'Materiales electricos',
    },
  ]

  return (
    <div className='flex flex-col'>
      <div className='navunits w-full py-[30px] absolute px-[30px] flex justify-between '>
        <BiMenu className=' text-[50px] text-gray-600 ' />
        <NavbarUserOptions />
      </div>
      <div className=' viewunits  3xl:h-[75vh] bg-[#f4f7fe] flex flex-col justify-center items-center w-full 2xl:px-[150px] md:px-[20px] gap-6 px-[10px] '>
        <div className='bartitleandaction w-full flex justify-between items-center cursor-pointer mt-[110px]'>
          <h1 className='  font-[500] text-start md:text-[20px] xl:text-[40px]  '>
            Unidades de negocio
          </h1>
          <Button
            color='secondary'
            className=' bg-c-primary'
            endContent={<PlusIcon />}
          >
            Add units
          </Button>

        </div>
        <div className=' flex w-full lg:justify-between md:justify-start flex-wrap justify-center'>
          {businessUnits.map((item, index) => (
            <div className='cardunits cursor-pointer' key={index} onClick={() => handleNavigate()}>
              <div className='imagecard w-[370px] h-[250px] bg-c-primary rounded-xl'></div>
              <div className='textcard flex flex-col py-[15px]'>
                <h3 className=' font-[600] '>{item.name}</h3>
                <h4>{item.description}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='h-[100vh] bg-[#a41bff]'></div>
    </div>
  )
}

export default Units
