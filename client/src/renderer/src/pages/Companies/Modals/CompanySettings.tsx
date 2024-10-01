import { WarehouseCardCompany } from '@renderer/pages/Warehouse/WarehouseCard/OnCompanySettings'
import { useModal, modalTypes } from '@renderer/utils/useModal'
import { Tab, Tabs, Modal, ModalBody, ModalHeader, ModalContent } from '@nextui-org/react'

export const CompanySettings = () => {
  const [isOpen, toggleModal] = useModal(modalTypes.companySettingsModal)

  return (
    <Modal
      size='full'
      isOpen={isOpen}
      onClose={toggleModal}
      classNames={{
        base: 'border-[#292f46] bg-[var(--c-bg-color)] text-c-title',
      }}
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>Configuración</ModalHeader>
        <ModalBody>
          <div className=''>
            <Tabs key={'mis tabs'} variant={'underlined'} aria-label='Tabs variants'>
              <Tab key='general' title='General' />
              <Tab key='depositos' title='Depósitos'>
                <WarehouseCardCompany />
              </Tab>
              <Tab key='integraciones' title='Integraciones' />
              <Tab key='plan' title='Plan' />
            </Tabs>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
