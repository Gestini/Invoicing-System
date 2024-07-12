import { ColorType, createChart } from 'lightweight-charts'
import React from 'react'

export const ChartComponent = ({ data, colors }) => {
  const chartContainerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (!chartContainerRef.current) return

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth })
      }
    }

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.backgroundColor },
        textColor: colors.textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      grid: {
        vertLines: {
          color: 'transparent',
        },
        horzLines: {
          color: 'transparent',
        },
      },
    })
    chart.timeScale().fitContent()

    const newSeries = chart.addAreaSeries({
      lineColor: colors.lineColor,
      topColor: colors.areaTopColor,
      bottomColor: colors.areaBottomColor,
    })
    newSeries.setData(data)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [data, colors])

  return <div ref={chartContainerRef} />
}
