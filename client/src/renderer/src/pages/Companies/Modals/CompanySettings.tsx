import { TabsRender } from '@renderer/components/TabsRender'
import { useModal, modalTypes } from '@renderer/utils/useModal'
import { WarehouseCardCompany } from '@renderer/pages/Warehouse/WarehouseCard/OnCompanySettings'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'

export const CompanySettings = () => {
  const [isOpen, toggleModal] = useModal(modalTypes.companySettingsModal)

  const tabs = [
    { name: 'General', content: <></> },
    { name: 'Depósitos', content: <WarehouseCardCompany /> },
    { name: 'Integraciones', content: <></> },
    { name: 'Plan', content: <></> },
  ]

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
          <TabsRender tabs={tabs} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
