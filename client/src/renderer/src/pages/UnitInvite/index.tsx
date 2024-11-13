import React from 'react'
import { useState } from 'react'
import { MdPeople } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { unitInviteModel } from '@renderer/interfaces/unitInvite'
import { reqGetInviteUnitByToken, reqAcceptInviteUnit } from '@renderer/api/requests'

export const UnitInvite = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [invite, setInvite] = React.useState<unitInviteModel | null>(null)

  React.useEffect(() => {
    if (!token) return
    reqGetInviteUnitByToken(token)
      .then((res) => setInvite(res.data))
      .catch(() => navigate('/'))
      .finally(openModal)
  }, [])

  const acceptInvite = () => {
    if (!invite) return
    reqAcceptInviteUnit(invite?.token)
      .catch(console.log)
      .finally(() => navigate('/'))
  }

  const openModal = () => setIsOpen(true)

  return (
    <div>
      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50 '>
          <div className='relative backdrop-blur-3xl bg-white/5  rounded-lg p-8 shadow-lg z-10 w-[537px] flex items-center justify-center flex-col gap-[25px]'>
            <div className='text-[12px] text-[#FAFAFA]/30 w-40 rounded-full border border-white/10 flex items-center justify-center gap-2 px-[14px] py-[5px]'>
              <MdPeople className='text-c-primary w-[16px] h-[16px]' /> Invitación Entrante
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-[30px] h-[30px] uppercase flex items-center justify-center text-[#FFB16C] bg-[#785537] rounded-full text-[14px] font-bold'>
                {invite?.inviter.username?.slice(0, 1)}
              </div>
              <p className='text-white text-[14px] flex items-center'>
                <span className='text-[#FFB16C]'>{invite?.inviter.username} &nbsp;</span>
                te han invitado a unirte a {invite?.businessUnit.company.name}
              </p>
            </div>
            <div className='w-full flex flex-col'>
              <div className='mb-2 h-[184px] justify-center items-center gap-5 bg-[#7e828773] flex border backdrop-blur-3xl border-white/10 rounded-md'>
                {invite?.businessUnit.company.image ? (
                  <img
                    src={invite?.businessUnit.company.image}
                    className='rounded-2xl w-[94px] h-[94px] object-cover'
                  />
                ) : (
                  <div
                    className={`transition-all duration-500 ease-in-out w-[94px] h-[94px] uppercase flex items-center justify-center font-semibold text-c-title border rounded-md`}
                  >
                    <span>{invite?.businessUnit.company.name.slice(0, 2)}</span>
                  </div>
                )}
                <div>
                  <h5 className='text-[32px] font-semibold text-[#FFFFFF]'>
                    {invite?.businessUnit.company.name}
                  </h5>
                  <span className='text-[14px] text-[#FAFAFA]/30'>
                    {invite?.businessUnit.company.description}
                  </span>
                </div>
              </div>
              <span className='text-[12px] text-[#FAFAFA]/30 text-center'>
                Esta invitación la pueden anular o puede ser anulada en un determinado tiempo.
              </span>
            </div>
            <button
              className='text-white rounded-lg w-full text-[14px] bg-[#7e828773] text-semibold py-4'
              onClick={acceptInvite}
            >
              Aceptar invitación
            </button>
            <button className='text-white rounded-lg w-full text-[14px] text-semibold text-[#7e828773] transition-all duration-300 hover:underline'>
              Rechazar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
