import React, { useState, useEffect } from 'react'
import { BiSolidMessageDetail } from 'react-icons/bi'

const TeamMember = ({ name, role, roleColor }) => {
  return (
    <div className='itemmemberteamdashboard items-center flex justify-between'>
      <div className='imageandinfomemberteam flex gap-2 items-center'>
        <div className='profilememberteam w-[35px] h-[35px] bg-blue-500 rounded-full'></div>
        <div className='nameandrolteamdashboard flex justify-center gap-1 flex-col'>
          <span className='text-c-title font-[500] text-[13px]'>{name}</span>
          <div
            className={`text-[10px] px-[0px] flex justify-center items-center rounded-md`}
            style={{ color: roleColor.text, backgroundColor: roleColor.bg }}
          >
            {role}
          </div>
        </div>
      </div>
      <BiSolidMessageDetail className='text-[30px] cursor-pointer text-c-gray' />
    </div>
  )
}

const TeamDashboard = () => {
  const [visibleItems, setVisibleItems] = useState(5)
  const teamMembers = [
    { name: 'Mario Carmen', role: 'Vendedor', roleColor: { text: '#32ADE6', bg: '#32ade621' } },
    { name: 'Mario Carmen', role: 'Vendedor', roleColor: { text: '#32ADE6', bg: '#32ade621' } },
    { name: 'Mario Carmen', role: 'Vendedor', roleColor: { text: '#32ADE6', bg: '#32ade621' } },
    {
      name: 'Mario Carmen',
      role: 'Asst. Administrativo',
      roleColor: { text: '#831f97', bg: '#ad32e621' },
    },
    { name: 'Mario Carmen', role: 'Vendedor', roleColor: { text: '#32ADE6', bg: '#32ade621' } },
  ]

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight < 900) {
        setVisibleItems(3)
      } else {
        setVisibleItems(5)
      }
    }

    handleResize() // Call once initially to set the value
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className='membersteamdashboard flex w-full gap-4 flex-col'>
      {teamMembers.slice(0, visibleItems).map((member, index) => (
        <TeamMember
          key={index}
          name={member.name}
          role={member.role}
          roleColor={member.roleColor}
        />
      ))}
    </div>
  )
}

export default TeamDashboard
