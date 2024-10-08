import { Button } from '@nextui-org/react'
import { RootState } from '@renderer/store'
import { useSelector } from 'react-redux'
import { SearchProduct } from './SarchProduct'
import { reqCreateInvoice } from '@renderer/api/requests'

export const TopContent = () => {
  const unit = useSelector((state: RootState) => state.currentUnit)
  const newInvoicing = useSelector((state: RootState) => state.unit.newInvoicing)
  const currentTab = newInvoicing?.tabs?.find((item) => item.id === newInvoicing.currentTabId)

  const onSubmmit = async () => {
    try {
      reqCreateInvoice({
        ...currentTab?.formData,
        total: currentTab?.total,
        products: currentTab?.products,
        businessUnitId: unit?.id,
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
