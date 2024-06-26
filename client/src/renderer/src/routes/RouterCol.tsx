import Sidebar, { SidebarItem } from '@renderer/components/navbar/Navbar'
import {
  BiCog,
  BiHome,
  BiMoon,
  BiCart,
  BiLabel,
  BiStats,
  BiCrown,
  BiDetail,
  BiHelpCircle,
  BiBadgeCheck,
  BiCalculator
} from 'react-icons/bi'

const RouterCol = () => {
  return (
    <div className="flex h-full sticky navbaraside top-0 ">
      <Sidebar>
        <SidebarItem path="/general" icon={<BiHome />} text={'General'} />
        <SidebarItem path="/facturar" icon={<BiCalculator />} text={'Facturar'} />
        <SidebarItem path="/stock" icon={<BiCart />} text={'Stock'} />
        <SidebarItem path="/presupuestos" icon={<BiDetail />} text={'Presupuestos'} />
        <SidebarItem path="/ventas" icon={<BiLabel />} text={'Ventas'} />
        <SidebarItem path="/pedidos" icon={<BiBadgeCheck />} text={'Pedidos'} />
        <SidebarItem path="/informes" icon={<BiStats />} text={'Informes'} />
      </Sidebar>
    </div>
  )
}

export default RouterCol
