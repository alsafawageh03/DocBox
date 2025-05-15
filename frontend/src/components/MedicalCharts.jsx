import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const MedicalCharts = () => {
  const barData = {
    labels: ['Stethoscope', 'Syringe', 'Thermometer', 'Scalpel'],
    datasets: [
      {
        label: 'Stock Quantity',
        data: [50, 120, 30, 45],
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#f44336']
      }
    ]
  };

  const pieData = {
    labels: ['Diagnostic', 'Surgical', 'Monitoring', 'Therapeutic'],
    datasets: [
      {
        label: 'Tool Categories',
        data: [30, 25, 20, 25],
        backgroundColor: ['#03a9f4', '#8bc34a', '#ffeb3b', '#e91e63']
      }
    ]
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Usage',
        data: [20, 35, 40, 60, 45, 70],
        fill: false,
        borderColor: '#2196f3',
        tension: 0.3
      }
    ]
  };

  const doughnutData = {
    labels: ['New', 'Used', 'Damaged'],
    datasets: [
      {
        label: 'Tool Condition',
        data: [60, 30, 10],
        backgroundColor: ['#4caf50', '#ffc107', '#f44336']
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: false }
    }
  };
  return (
    <div className="h-screen  px-4 py-4 box-border bg-gray-100">
      <div className="flex flex-col ">
        <h2 className="text-xl font-semibold text-center mb-4">Medical Tools Dashboard</h2>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow overflow-auto pb-4">
          {[
            { title: "Inventory (Bar)", chart: <Bar data={barData} options={options} /> },
            { title: "Categories (Pie)", chart: <Pie data={pieData} options={options} /> },
            { title: "Monthly Usage (Line)", chart: <Line data={lineData} options={options} /> },
            { title: "Tool Condition (Doughnut)", chart: <Doughnut data={doughnutData} options={options} /> },
          ].map(({ title, chart }, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-4 flex flex-col min-h-[300px]">
              <h4 className="text-md font-medium mb-2">{title}</h4>
              <div className="flex-grow">{chart}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  

};

export default MedicalCharts;
