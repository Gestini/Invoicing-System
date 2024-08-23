import { Button } from '@nextui-org/react'
import { useSelector } from 'react-redux'
import { SearchProduct } from './SarchProduct'
import { reqCreateInvoice } from '@renderer/api/requests'

export const TopContent = () => {
  const unit = useSelector((state: any) => state.currentUnit)
  const newInvoicing = useSelector((state: any) => state.unit.newInvoicing)
  const currentTab = newInvoicing?.tabs?.find((item: any) => item.id === newInvoicing.currentTabId)

  const onSubmmit = async () => {
    try {
      await reqCreateInvoice({
        ...currentTab.formData,
        products: currentTab.products,
        businessUnit: {
          id: unit?.id,
        },
        total: currentTab.total,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex gap-2'>
      <SearchProduct />
      <Button
        className='bg-c-primary-variant-1'
        color='secondary'
        onPress={() => onSubmmit()}
        radius='sm'
      >
        Crear factura
      </Button>
    </div>
  )
}
