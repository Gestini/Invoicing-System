import { FaHome } from 'react-icons/fa'
import { FaCrown } from 'react-icons/fa6'
import { FaChartArea } from 'react-icons/fa'
import { FaTag } from 'react-icons/fa6'
import { FaCheckSquare } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'
import { FaSheetPlastic } from 'react-icons/fa6'
import { FaCalculator } from 'react-icons/fa'
import { FaCog } from 'react-icons/fa'
import { FaQuestionCircle } from 'react-icons/fa'
import Sidebar from '@renderer/components/navbar/Navbar'
import { SidebarItem } from '@renderer/components/navbar/Navbar'
import { ChangeTheme } from '@renderer/components/Theme'
import {
  BiHome,
  BiLabel,
  BiCrown,
  BiCart,
  BiBadgeCheck,
  BiCalculator,
  BiDetail,
  BiCog,
  BiHelpCircle,
  BiStats,
  BiMoon
} from 'react-icons/bi'

const RouterCol = () => {
  return (
    <div className="flex h-full sticky top-0">
        
      <Sidebar>
        <SidebarItem path="" icon={<BiCrown />} text={'Premium'} />
        <SidebarItem path="/general" icon={<BiHome />} text={'General'} />
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
