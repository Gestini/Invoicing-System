import React, { useEffect, useRef, useState } from 'react'
import { ColorType, createChart, IChartApi, ISeriesApi } from 'lightweight-charts'

interface ChartComponentProps {
  data: { time: string; value: number }[]
  colors: {
    backgroundColor: string
    textColor: string
    lineColor: string
    areaTopColor: string
    areaBottomColor: string
  }
  sidebarState: boolean
}

export const ChartComponent: React.FC<ChartComponentProps> = ({ data, colors, sidebarState }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<'Area'> | null>(null)

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    if (!chartContainerRef.current) return

    const handleResize = () => {
      if (isMounted && chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth })
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
    chartRef.current = chart

    chart.timeScale().fitContent()

    const newSeries = chart.addAreaSeries({
      lineColor: colors.lineColor,
      topColor: colors.areaTopColor,
      bottomColor: colors.areaBottomColor,
    })
    seriesRef.current = newSeries
    newSeries.setData(data)

    window.addEventListener('resize', handleResize)

    setTimeout(() => {
      handleResize()
      if (isMounted && chartRef.current) {
        chartRef.current.timeScale().fitContent()
        handleResize()
      }
    }, 300)

    return () => {
      setIsMounted(false)
      window.removeEventListener('resize', handleResize)
      if (chartRef.current) {
        chartRef.current.remove()
      }
    }
  }, [data, colors, sidebarState, isMounted])

  return <div ref={chartContainerRef} />
}
