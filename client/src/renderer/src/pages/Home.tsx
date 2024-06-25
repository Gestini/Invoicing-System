import Calendar from "../components/Calendar"
import DailySalesChart from "@renderer/components/Chart";

const Home = () => {
  const ventasData = [
    { date: '2024-06-01', value: 100 },
    { date: '2024-06-02', value: 150 },
    { date: '2024-06-03', value: 120 },
    { date: '2024-06-04', value: 130 },
    { date: '2024-06-05', value: 110 },
    { date: '2024-06-06', value: 160 },
    { date: '2024-06-07', value: 140 },
    { date: '2024-06-08', value: 180 },
    { date: '2024-06-09', value: 170 },
    { date: '2024-06-10', value: 190 },
    { date: '2024-06-11', value: 200 },
    { date: '2024-06-12', value: 210 },
    { date: '2024-06-13', value: 220 },
    { date: '2024-06-14', value: 230 },
    { date: '2024-06-15', value: 240 },
    { date: '2024-06-16', value: 250 },
    { date: '2024-06-17', value: 260 },
    { date: '2024-06-18', value: 270 },
    { date: '2024-06-19', value: 280 },
    { date: '2024-06-20', value: 290 },
    { date: '2024-06-21', value: 300 },
    { date: '2024-06-22', value: 310 },
    { date: '2024-06-23', value: 320 },
    { date: '2024-06-24', value: 330 },
    { date: '2024-06-25', value: 340 },
  ];

  return (
    <div className="px-3 py-4 w-full h-full">
      <div className="w-full flex items-center flex-col">
        <Calendar />
      </div>
      <h5 className="text-4xl font-semibold text-c-primary mb-5">General</h5>
      <div className="gap-25px w-full max-w-full grid grid-cols-auto-fill-minmax-cards">
        <div className=" h-30 shadow-md rounded-xl p-3 px-5 text-c-grey flex flex-col justify-center cursor-pointer">
          <span className="mb-2 text-lg font-semibold">
            Ventas
          </span>
          <span >
            Valor: $100.000
          </span>
          <span >
            Productos: 100.000
          </span>
        </div>
        <div className=" h-30 shadow-md  rounded-xl p-3 px-5 text-c-grey flex flex-col cursor-pointer">
          <span className="mb-3 text-lg font-semibold">
            Stock
          </span>
          <span >
            Valor: $100.000
          </span>
          <span >
            Productos: 100.000
          </span>
        </div>
        <div className=" h-30 shadow-md  rounded-xl p-3 px-5 text-c-grey flex flex-col cursor-pointer">
          <span className="mb-3 text-lg font-semibold">
            Pedidos
          </span>
          <span >
            Valor: $100.000
          </span>
          <span >
            Productos: 100.000
          </span>
        </div>
        <div className=" h-30 shadow-md  rounded-xl p-3 px-5 text-c-grey flex flex-col cursor-pointer">
          <span className="mb-3 text-lg font-semibold">
            Facturar
          </span>
          <span >
            Valor: $100.000
          </span>
          <span >
            Productos: 100.000
          </span>
        </div>
      </div>
      <div className="container mx-auto py-4">

        <h1>Gráfico de Ventas Diarias</h1>
        <DailySalesChart />
      </div>
    </div>
  )
}

export default Home
