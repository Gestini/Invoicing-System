import { FaHome } from 'react-icons/fa'
import { FaCrown } from "react-icons/fa6";
import { FaChartArea } from "react-icons/fa";
import { FaTag } from "react-icons/fa6";
import { FaCheckSquare } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaSheetPlastic } from "react-icons/fa6";
import { FaCalculator } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import Sidebar from '@renderer/components/navbar/Navbar'
import { SidebarItem } from '@renderer/components/navbar/Navbar'
import { ChangeTheme } from '@renderer/components/Theme';

const RouterCol = () => {
    return (
        <div className='flex h-full sticky top-0'>
            <Sidebar>
                <SidebarItem path='' icon={<FaCrown />} text={'Premium'} />
                <SidebarItem path='/' icon={<FaHome />} text={'General'} />
                <SidebarItem path='/ventas' icon={<FaTag />} text={'Ventas'} />
                <SidebarItem path='/stock' icon={<FaCartShopping />} text={'Stock'} />
                <SidebarItem path='/pedidos' icon={<FaCheckSquare />} text={'Pedidos'} />
                <SidebarItem path='/facturar' icon={<FaCalculator />} text={'Facturar'} />
                <SidebarItem path='/presupuestos' icon={<FaSheetPlastic />} text={'Presupuestos'} />
                <SidebarItem path='/informes' icon={<FaChartArea />} text={'Informes'} />
                <SidebarItem path='/ajustes' icon={<FaCog />} text={'Ajustes'} />
                <SidebarItem path='/ayuda' icon={<FaQuestionCircle />} text={'Ayuda'} />
                <SidebarItem path='' icon={<ChangeTheme />} text={'Darkmode'} />
            </Sidebar>
        </div>
    )
}

export default RouterCol
