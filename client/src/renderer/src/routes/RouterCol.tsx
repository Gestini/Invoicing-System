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
    <div className="flex h-full sticky top-0">
      <Sidebar>
        <SidebarItem path="" icon={<BiCrown />} text={'Premium'} />
        <SidebarItem path="/" icon={<BiHome />} text={'General'} />
        <SidebarItem path="/ventas" icon={<BiLabel />} text={'Ventas'} />
        <SidebarItem path="/stock" icon={<BiCart />} text={'Stock'} />
        <SidebarItem path="/pedidos" icon={<BiBadgeCheck />} text={'Pedidos'} />
        <SidebarItem path="/facturar" icon={<BiCalculator />} text={'Facturar'} />
        <SidebarItem path="/presupuestos" icon={<BiDetail />} text={'Presupuestos'} />
        <SidebarItem path="/informes" icon={<BiStats />} text={'Informes'} />
        <SidebarItem path="/ajustes" icon={<BiCog />} text={'Ajustes'} />
        <SidebarItem path="/ayuda" icon={<BiHelpCircle />} text={'Ayuda'} />
        <SidebarItem path="" icon={<BiMoon />} text={'Darkmode'} />
      </Sidebar>
    </div>
  )
}

export default RouterCol
