import React from 'react';
import Logo from '../../assets/electron.svg';
import { reqCreateUnit } from '@renderer/api/requests';
import { Modal, ModalContent, ModalHeader, ModalBody, Input, Textarea, ModalFooter, Button } from "@nextui-org/react";
import { GoUpload } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux'
import './createCompany.scss';
import { addUnit } from '@renderer/features/unitsSlice';

interface MultiStepFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ isOpen, onClose }) => {
  const companies = useSelector((state: any) => state.units.data)
  const dispatch = useDispatch()
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState<any>({
    name: '',
    description: '',
    link: '',
  });
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await reqCreateUnit(data)
      dispatch(addUnit(res.data))
      setLoading(false);
      onClose()
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Modal size='2xl' isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <form
          onSubmit={handleSubmit}
          className='animate-zoom-in-out w-full max-w-3xl py-5 px-10 bg-c-card rounded shadow-lg relative overflow-hidden'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='text-center mb-6'>
            <div className='flex justify-center items-center'>
              <img className='w-8 h-8 mb-4' src={Logo} alt='logo' />
            </div>
            <h1
              className='font-bold mb-2 text-gray-300 text-2xl'>
              Llena los detalles de tu empresa para empezar a administrar ventas, inventario, facturación y mas.
            </h1>
            {/* <h2
              className='text-lg font-medium mb-4 text-c-gray'
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Create your FREE account and get immediate access to the app
            </h2> */}
            {/* <p
              className='mb-4 text-sm font-medium text-gray-600'
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Step {step} of 1
            </p> */}
          </div>
          {/* <div className='flex justify-center mb-6'>
            <div
              onClick={prevStep}
              className={`w-8 h-3 mx-1 rounded ${step === 1 ? 'bg-c-primary' : 'bg-gray-100'}`}
            ></div>
          </div> */}
          {step === 1 && (
            <div className=''>
              <div className="flex items-center justify-center w-full h-14 mb-4">
                <label className="flex flex-col p-2 items-center bg-c-primary rounded-lg  tracking-wide border border-blue cursor-pointer hover:bg-c-primary-hover transition-all duration-300">
                  <GoUpload />
                  <span className="text-c-title text-[12px]">Selecciona una foto</span>
                  <input type="file" className="hidden " accept="image/*" />
                </label>
              </div>
              <Input
                type='text'
                variant='bordered'
                label='Nombre'
                name='name'
                value={data.name}
                radius='sm'
                onChange={handleInputChange}
                placeholder='Nombre de la empresa'
                className='mb-4'
                maxLength={30}
              />
              <Textarea
                type='text'
                variant='bordered'
                label='Descripcion'
                name='description'
                value={data.description}
                radius='sm'
                onChange={handleInputChange}
                placeholder='Descripcion de la empresa'
                className='mb-4'
                maxLength={200}
              />
              <Input
                type='text'
                variant='bordered'
                label='Link'
                name='link'
                value={data.link}
                radius='sm'
                onChange={handleInputChange}
                placeholder='Url de la empresa'
                className='mb-4'
                maxLength={50}
              />
              <Button
                color='secondary'
                className='bg-c-primary'
                isLoading={loading}
                type='submit'
              >
                {loading ? 'Cargando...' : 'Crear'}
              </Button>
            </div>
          )}
        </form>
      </ModalContent>
    </Modal>
  );
};

export default MultiStepForm;
