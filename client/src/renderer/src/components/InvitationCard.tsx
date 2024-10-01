import { RootState } from '@renderer/store';
import React, { useState } from 'react';
import { MdPeople } from "react-icons/md";
import { useSelector } from 'react-redux';

const InvitationCard = () => {
    const company = useSelector((state: RootState) => state.currentCompany)
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={openModal}
            >
                Open Invitation
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50 "
                >
                    {/* Fondo oscuro detrás */}
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={closeModal}
                    ></div>

                    {/* Contenido del modal con fondo borroso */}
                    <div
                        className="relative backdrop-blur-3xl bg-white/5  rounded-lg p-8 shadow-lg z-10 w-[537px] flex items-center justify-center flex-col gap-[25px]"
                    >
                        <div className="text-[12px] text-[#FAFAFA]/30 w-40 rounded-full border border-white/10 flex items-center justify-center gap-2 px-[14px] py-[5px]"><MdPeople className='text-c-primary w-[16px] h-[16px]' /> Invitación Entrante</div>
                        <div className='flex items-center gap-2'>
                            <div className='w-[30px] h-[30px] flex items-center justify-center text-[#FFB16C] bg-[#785537] rounded-full text-[14px] font-bold'>C</div>
                            <p className="text-white text-[14px] flex items-center">
                                <span className='text-[#FFB16C]'>
                                    Carlos Gonzales &nbsp;
                                </span>
                                te han invitado a unirte como Vendedor
                            </p>
                        </div>

                        <div className='w-full flex flex-col'>
                            <div className=' mb-2 h-[184px] justify-center items-center gap-5 bg-[#7e828773] flex border backdrop-blur-3xl border-white/10 rounded-2xl'>
                                <img src={company.image} className='rounded-2xl w-[94px] h-[94px] object-cover' alt="" />

                                <div>
                                    <h5 className='text-[32px] font-semibold text-[#FFFFFF]'>Revolut</h5>
                                    <span className='text-[14px] text-[#FAFAFA]/30'>Vendedor</span>
                                </div>
                            </div>
                            <span className='text-[12px] text-[#FAFAFA]/30 text-center'>Esta invitación la pueden anular o puede ser anulada en un determinado tiempo.</span>
                        </div>

                        <button
                            className="text-white rounded-lg w-full text-[14px] bg-[#7e828773] text-semibold py-4"
                            onClick={closeModal}
                        >
                            Aceptar invitación
                        </button>

                        <button
                            className="text-white rounded-lg w-full text-[14px] text-semibold text-[#7e828773] transition-all duration-300 hover:underline"
                            onClick={closeModal}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default InvitationCard;
