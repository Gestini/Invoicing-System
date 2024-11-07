import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { RootState } from '@renderer/store'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ChartComponent } from './ChartComponent'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { reqGetSalesByMonth, reqGetTopSellingProducts } from '@renderer/api/requests'

// Función para convertir un color hex a HSL
const hexToHSL = (hex: string): [number, number, number] => {
  hex = hex.replace('#', '')
  const r = parseInt(hex.slice(0, 2), 16) / 255
  const g = parseInt(hex.slice(2, 4), 16) / 255
  const b = parseInt(hex.slice(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h,
    s,
    l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
      default:
        break
    }
    h /= 6
  }

  return [h * 360, s * 100, l * 100]
}

// Función para generar variantes del color principal
const generateColorVariants = (mainColor: string, count: number): string[] => {
  const [h, s, l] = hexToHSL(mainColor)
  const variants: string[] = []

  for (let i = 0; i < count; i++) {
    const newL = (l + i * 13) % 100 // ajustar el nivel de luz
    variants.push(`hsl(${h}, ${s}%, ${newL}%)`)
  }

  return variants
}

export const GraphView = () => {
  const [mainColor, setMainColor] = React.useState('transparent')
  const [parsedMainColor, setParsedMainColor] = React.useState('transparent')
  const currentTheme = useSelector((state: RootState) => state.user.currentTheme)
  const sidebarState = useSelector((state: RootState) => state.sidebar)
  const [initialData, setInitialData] = React.useState([])
  const [topSellingProductos, setTopSellingProducts] = React.useState([])
  const unit = useSelector((state: RootState) => state.currentUnit)
  const params = useParams()

  React.useEffect(() => {
    const style = getComputedStyle(document.body)
    const computedMainColor = style.getPropertyValue('--c-primary').trim()
    setMainColor(computedMainColor)
    setParsedMainColor(
      `rgba(${parseInt(computedMainColor?.slice(1, 3), 16)}, ${parseInt(computedMainColor?.slice(3, 5), 16)}, ${parseInt(computedMainColor?.slice(5, 7), 16)}, 0.1)`,
    )
  }, [currentTheme])

  React.useEffect(() => {
    reqGetSalesByMonth(unit.id)
      .then((res) => setInitialData(res.data))
      .catch(() => setInitialData([]))

    reqGetTopSellingProducts(unit.id)
      .then((res) => setTopSellingProducts(res.data))
      .catch(() => setTopSellingProducts([]))
  }, [unit.id, params.companyId])

  const graphList = [
    {
      title: 'Ventas diarias',
      colors: {
        backgroundColor: 'transparent',
        lineColor: mainColor,
        textColor: '#71717a',
        areaTopColor: mainColor,
        areaBottomColor: parsedMainColor,
      },
      initialData,
    },
  ]

  const pieChartData = topSellingProductos.map((product: any, index: number) => ({
    title: `Producto: ${product.productName}\nCantidad: ${product.totalQuantitySold}`,
    value: product.totalQuantitySold, // o cualquier otro valor necesario
    color: generateColorVariants(mainColor, topSellingProductos.length)[index],
  }))

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
      <Card className='w-full z-0' classNames={{ base: 'rounded-lg' }}>
        <CardHeader>
          <h3 className='font-medium'>Mas vendido</h3>
        </CardHeader>
        <CardBody className='flex items-center'>
          <PieChart style={{ maxWidth: '220px' }} data={pieChartData} />
        </CardBody>
      </Card>
      {graphList.map((item, index) => (
        <Card className='w-full z-0' key={index} classNames={{ base: 'rounded-lg' }}>
          <CardHeader>
            <h3 className='font-medium'>{item.title}</h3>
          </CardHeader>
          <CardBody>
            {item.initialData.length > 0 && (
              <ChartComponent
                data={item.initialData}
                colors={item.colors}
                sidebarState={sidebarState.isActive || false}
              />
            )}
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
