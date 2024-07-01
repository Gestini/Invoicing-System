import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { ColorType, createChart } from 'lightweight-charts';
import { Card, CardBody, CardHeader } from '@nextui-org/react';

const ChartComponent = ({ data, colors }) => {
  const chartContainerRef = React.useRef();

  React.useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
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
          const bodyId = document.body.id;
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
        areaTopColor: '#007BFF',
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
        areaTopColor: '#4C9EFF',
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

  return (
    <div className='flex gap-4'>
      <Card className='w-full'>
        <CardHeader>
          <h3 className='font-medium'>Stock</h3>
        </CardHeader>
        <CardBody className='flex items-center'>
          <PieChart
            style={{ maxWidth: '220px' }}
            data={[
              { title: 'One', value: 10, color: mainColor },
              { title: 'Two', value: 10, color: '#6ad2ff' },
              { title: 'Three', value: 5, color: '#eff4fb' },
            ]}
          />
        </CardBody>
      </Card>
      {graphList.map((item, index) => (
        <Card className='w-full' key={index}>
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
