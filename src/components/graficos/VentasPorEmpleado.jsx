import React from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


const VentasPorEmpleado = ({ empleados, totales_por_empleado }) => {
  // Define chart data
  const data = {
    labels: empleados,// Array de nombres de empleados
    datasets: [
      {
        label: 'Ventas por Empleado (C$)',
        data: totales_por_empleado, // Array de totales de ventas
        backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
        borderWidth: 1,
      },
    ],
  };

  // Define chart options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Ventas',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Empleados',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Ventas por Empleado</Card.Title>
        <Bar data={data} options={options} />
      </Card.Body>
    </Card>
  );
};

export default VentasPorEmpleado;
