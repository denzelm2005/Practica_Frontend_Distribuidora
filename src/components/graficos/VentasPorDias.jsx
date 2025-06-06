import { Card } from "react-bootstrap";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';



const VentasPorDias = ({ dias, totales_por_dia }) => {

  const data = {
    labels: dias, // Nombres de los meses
    datasets: [
        {
            label: 'VENTAS(C$)', // Total de ventas por mes
            data:totales_por_dia , // Total de ventas por mes
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
            borderWidth: 2,
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Ventas por dias',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Dias',
                },
            },
        },
    },
};
return (<Card style={{ height: '100%' }}>
    <Card.Title>Ventas por Dias</Card.Title>
    <div style={{ height: "300px", justifyContent: "center", alignItems: "center", display: "flex" }}>
        <Line data={data} options={options} />
    </div>
</Card>);
};
export default VentasPorDias;