import { GraphView } from '@renderer/components/Chart'
import { StatsCardGrid } from '@renderer/components/Dashbord/StatsItem'
import { TeamDashboard } from '@renderer/components/Dashbord/TeamMember'
import { SalesDashboard } from '@renderer/components/Dashbord/SalesItem'
import { DashboardHeaderInfo } from '@renderer/components/Dashbord/HeaderInfo'
import './Dashboard.scss'

export const Dashboard = () => {
  return (
    <div className='flex gap-4 w-full justify-end dashbordsection'>
      <div className='flex-grow flex flex-col gap-4'>
        <DashboardHeaderInfo />
        <StatsCardGrid />
        <GraphView />
      </div>
      <div className='columnderdashboard flex flex-col w-[350px] gap-4'>
        <TeamDashboard />
        <SalesDashboard />
      </div>
    </div>
  )
}
