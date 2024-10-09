import React from 'react'
import { RootState } from '@renderer/store'
import { selectInputs, inputs } from './data'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { setFormData, setInvoiceData, clearInvoiceData } from '@renderer/features/newInvoicing'

export const InvoiceForm = () => {
  const dispatch = useDispatch()
  const unit = useSelector((state: RootState) => state.currentUnit)
  const [isInitialized, setIsInitialized] = React.useState(false)
  const newInvoicing = useSelector((state: RootState) => state.unit.newInvoicing)
  const currentTab = newInvoicing?.tabs?.find((item: any) => item.id === newInvoicing.currentTabId)

  React.useEffect(() => {
    if (isInitialized) {
      const localInvoiceData = localStorage.getItem('invoices') || '{}'

      const allInvoices = JSON.parse(localInvoiceData)
      allInvoices[unit.id] = { tabs: newInvoicing.tabs, currentTabId: newInvoicing.currentTabId }
      localStorage.setItem('invoices', JSON.stringify(allInvoices))
    }
  }, [newInvoicing, isInitialized, unit.id])

  React.useEffect(() => {
    dispatch(clearInvoiceData())
    const localInvoiceData = localStorage.getItem('invoices') || '{}'
    const allInvoices = JSON.parse(localInvoiceData)
    if (allInvoices[unit.id]) {
      const { tabs, currentTabId } = allInvoices[unit.id]
      dispatch(setInvoiceData({ tabs, currentTabId }))
    }
    setIsInitialized(true)
  }, [dispatch, unit.id])

  const handleChange = (name: string, value: string) => dispatch(setFormData({ name, value }))

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2'>
        {selectInputs.map((item, index: number) => {
          const selectedKey = currentTab?.formData[item.name] || ''
          return (
            <Select
              size='sm'
              key={index}
              name={item.name}
              label={item.label}
              className='text-c-title'
              selectedKeys={[selectedKey]}
              onChange={(e) => handleChange(item.name, e.target.value)}
            >
              {item.options.map((state) => (
                <SelectItem key={state.value} value={state.value} className='default-text-color'>
                  {state.label}
                </SelectItem>
              ))}
            </Select>
          )
        })}
      </div>
      <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2'>
        {inputs.map((input, index) => (
          <Input
            key={index}
            size='sm'
            name={input.name}
            type={input.type}
            label={input.label}
            value={currentTab?.formData[input.name] || ''}
            className='bg-c-card text-c-title'
            onChange={(e) => handleChange(input.name, e.target.value)}
          />
        ))}
      </div>
    </div>
  )
}
