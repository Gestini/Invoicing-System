import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { TooltipComponent, TitleComponent, LegendComponent } from 'echarts/components';
import { GraphView } from "./ChartComponent"
import { CanvasRenderer } from 'echarts/renderers';

// Registra los componentes que necesitas
echarts.use([TooltipComponent, TitleComponent, LegendComponent, GridComponent, LineChart, CanvasRenderer]);

const DailySalesChart: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            const chart = echarts.init(chartRef.current);

            const daysOfMonth = generateDaysOfMonth(); // Genera los días del mes actual
            const salesData = generateSalesData(daysOfMonth.length); // Genera datos ficticios de ventas

            const option = {
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: daysOfMonth // Utiliza los días generados dinámicamente
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: salesData, // Utiliza los datos ficticios de ventas
                    type: 'line'
                }]
            };

            chart.setOption(option);

            return () => {
                chart.dispose();
            };
        }
    }, []);

    const generateDaysOfMonth = (): string[] => {
        const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(); // Obtiene el número de días del mes actual
        const daysArray: string[] = [];

        for (let i = 1; i <= daysInMonth; i++) {
            daysArray.push(`Día ${i}`);
        }

        return daysArray;
    };

    const generateSalesData = (length: number): number[] => {
        const currentDate = new Date();
        const daysInMonth = currentDate.getDate(); // Obtiene el número de días del mes actual
        const data: number[] = [];

        for (let i = 1; i <= daysInMonth; i++) {
            if (i <= currentDate.getDate()) {
                data.push(Math.floor(Math.random() * 100) + 50); // Datos aleatorios de ventas hasta la fecha actual
            } else {
                data.push(0); // Añadir 0 para días futuros donde no hay ventas registradas
            }
        }

        return data;
    };

    return (
        <>
            {/* <div ref={chartRef} style={{ width: '100%', height: '400px' }} /> */}
            <GraphView />
        </>
    );
};

export default DailySalesChart;
