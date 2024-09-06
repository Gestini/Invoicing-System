import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { useSelector } from 'react-redux'
import { ChartComponent } from './ChartComponent'
import { Card, CardBody, CardHeader } from '@nextui-org/react'

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
    const newL = (l + i * 3.5) % 100 // ajustar el nivel de luz
    variants.push(`hsl(${h}, ${s}%, ${newL}%)`)
  }

  return variants
}

export const GraphView = () => {
  const [mainColor, setMainColor] = React.useState('transparent')
  const [parsedMainColor, setParsedMainColor] = React.useState('transparent')
  const currentTheme = useSelector((state: any) => state.user.currentTheme)
  const sidebarState = useSelector((state: any) => state.sidebar)
  
  React.useEffect(() => {
    const style = getComputedStyle(document.body)
    const computedMainColor = style.getPropertyValue('--c-primary').trim()
    setMainColor(computedMainColor)
    setParsedMainColor(
      `rgba(${parseInt(computedMainColor?.slice(1, 3), 16)}, ${parseInt(computedMainColor?.slice(3, 5), 16)}, ${parseInt(computedMainColor?.slice(5, 7), 16)}, 0.1)`,
    )
  }, [currentTheme])

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
      initialData: [
        { time: '2018-12-22', value: 1 },
        { time: '2018-12-23', value: 2 },
        { time: '2018-12-24', value: 3 },
        { time: '2018-12-25', value: 5 },
        { time: '2018-12-26', value: 4 },
        { time: '2018-12-27', value: 5 },
        { time: '2018-12-28', value: 6 },
        { time: '2018-12-29', value: 7 },
        { time: '2018-12-30', value: 6 },
        { time: '2018-12-31', value: 7 },
      ],
    },
  ]

  const pieChartData = generateColorVariants(mainColor, 7).map((color, index) => ({
    title: `Variant ${index + 1}`,
    value: 10, // o cualquier otro valor que necesites
    color,
  }))

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
      <Card className='w-full z-0' classNames={{ base: 'rounded-lg' }}>
        <CardHeader>
          <h3 className='font-medium'>Stock</h3>
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
            <ChartComponent data={item.initialData} colors={item.colors} sidebarState={sidebarState} />
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
