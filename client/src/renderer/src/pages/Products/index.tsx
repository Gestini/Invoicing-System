import { Tabs } from '@renderer/components/tab/Tabs'
import React from 'react'
import { StockTable } from './StockTable'
import BulkUpload from './BulkUpload'

const index = () => {
    const tabs = [
        { name: 'Productos', content: 'Contenido de Productos' },
        { name: 'Carga masiva de productos', content: 'Contenido de Stock Pendiente' },
    ]
    return (
        <div className='flex gap-2 flex-col'>
            <Tabs tabs={tabs} />
            <StockTable />
            {/* <BulkUpload /> */}
        </div>
    )
}

export default index