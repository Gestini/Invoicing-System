import React, { useEffect, useState, useRef } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { ColorType, createChart } from 'lightweight-charts';
import { Card, CardBody, CardHeader } from '@nextui-org/react';

// Función para convertir un color hex a HSL
const hexToHSL = (hex) => {
  hex = hex.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
};

// Función para generar variantes del color principal
const generateColorVariants = (mainColor, count) => {
  const [h, s, l] = hexToHSL(mainColor);
  const variants = [];

  for (let i = 0; i < count; i++) {
    const newL = (l + (i * 10)) % 100; // ajustar el nivel de luz
    variants.push(`hsl(${h}, ${s}%, ${newL}%)`);
  }

  return variants;
};

const ChartComponent = ({ data, colors }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

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
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor: colors.lineColor,
      topColor: colors.areaTopColor,
      bottomColor: colors.areaBottomColor,
    });
    newSeries.setData(data);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, colors]);

  return <div ref={chartContainerRef} />;
};

export const GraphView = () => {
  const [mainColor, setMainColor] = useState('');

  useEffect(() => {
    const style = getComputedStyle(document.body);
    const computedMainColor = style.getPropertyValue('--c-primary').trim();
    setMainColor(computedMainColor);

    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'id') {
          const newMainColor = getComputedStyle(document.body).getPropertyValue('--c-primary').trim();
          setMainColor(newMainColor);
        }
      }
    });

    observer.observe(document.body, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  const graphList = [
    {
      title: 'Ventas diarias',
      colors: {
        backgroundColor: 'transparent',
        lineColor: mainColor,
        textColor: '#71717a',
        areaTopColor: mainColor,
        areaBottomColor: `rgba(${parseInt(mainColor.slice(1, 3), 16)}, ${parseInt(mainColor.slice(3, 5), 16)}, ${parseInt(mainColor.slice(5, 7), 16)}, 0.1)`,
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
    {
      title: 'Pedidos',
      colors: {
        backgroundColor: 'transparent',
        lineColor: mainColor,
        textColor: '#71717a',
        areaTopColor: mainColor,
        areaBottomColor: `rgba(${parseInt(mainColor.slice(1, 3), 16)}, ${parseInt(mainColor.slice(3, 5), 16)}, ${parseInt(mainColor.slice(5, 7), 16)}, 0.1)`,
      },
      initialData: [
        { time: '2018-12-22', value: 1 },
        { time: '2018-12-23', value: 2 },
        { time: '2018-12-24', value: 3 },
        { time: '2018-12-25', value: 5 },
        { time: '2018-12-26', value: 5 },
        { time: '2018-12-27', value: 3 },
        { time: '2018-12-28', value: 7 },
        { time: '2018-12-29', value: 7 },
        { time: '2018-12-30', value: 9 },
        { time: '2018-12-31', value: 8 },
      ],
    },
  ];

  const pieChartData = generateColorVariants(mainColor, 3).map((color, index) => ({
    title: `Variant ${index + 1}`,
    value: 10, // o cualquier otro valor que necesites
    color,
  }));

  return (
    <div className='flex gap-4'>
      <Card className='w-full bg-c-card'>
        <CardHeader>
          <h3 className='font-medium'>Stock</h3>
        </CardHeader>
        <CardBody className='flex items-center'>
          <PieChart
            style={{ maxWidth: '220px' }}
            data={pieChartData}
          />
        </CardBody>
      </Card>
      {graphList.map((item, index) => (
        <Card className='w-full bg-c-card' key={index}>
          <CardHeader>
            <h3 className='font-medium'>{item.title}</h3>
          </CardHeader>
          <CardBody>
            <ChartComponent data={item.initialData} colors={item.colors} />
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
