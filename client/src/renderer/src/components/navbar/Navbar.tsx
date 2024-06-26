import { NavLink } from 'react-router-dom'
import "./Navbar.scss"

import { ReactNode, createContext, useContext, useState } from 'react'

// Define types for props
interface SidebarProps {
  children: ReactNode
}

// Define type for Sidebar context
interface SidebarContextType {
  expanded: boolean
}

// Create Sidebar context
const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

// Sidebar component
export default function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <aside className="flex navbaraside">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <SidebarContext.Provider value={{ expanded }}>
          <div className="h-full px-1 mt-[10px] flex-col gap-[30px] ">{children}</div>
        </SidebarContext.Provider>
      </nav>
    </aside>
  )
}

// SidebarItem component props
interface SidebarItemProps {
  icon: ReactNode
  text: string
  path: string
  alert?: boolean
}

// SidebarItem component
export function SidebarItem({ path, icon, text, alert }: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext)! // Use ! to assert non-null since we know it's provided by Sidebar

  return (
    <>
      {path ? (
        <NavLink
          to={path}
          className={({ isActive }) => `
            flex items-center py-3 px-2
            font-medium cursor-pointer flex-col
            transition-colors group
            ${isActive ? 'text-[#721ff7] bg-[#eadeff]' : 'hover:bg-c-primary-hover2 text-gray-600'}
            ${expanded ? '' : 'rounded-md'}
          `}
        >
          {icon}
          <span className="text-[10px]">{text}</span>
          {alert && (
            <div
              className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? '' : 'top-2'}`}
            />
          )}
          {!expanded && (
            <div
              className={`
                absolute left-full rounded-md px-2 py-1 ml-6
                bg-[#eaddff] text-[#721ff7] font-[400]
                invisible opacity-20 -translate-x-3 transition-all
              `}
              // Para agregar texto que sale hacia afuera
              // group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
            >
              {text}
            </div>
          )}
        </NavLink>
      ) : (
        <div
          className={`
            relative flex items-center py-3 px-2 font-medium cursor-pointer flex-col transition-colors group
            text-[#721ff7] hover:bg-[#721ff7] hover:text-[#ffffff] ]
            ${expanded ? '' : 'rounded-md'}
          `}
        >
          {icon}
          <span className="text-[10px]">{text}</span>
          {alert && (
            <div
              className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? '' : 'top-2'}`}
            />
          )}
          {!expanded && (
            <div
              className={`
                absolute left-full rounded-md px-2 py-1 ml-6
                bg-indigo-100 text-indigo-800 text-sm
                invisible opacity-20 -translate-x-3 transition-all

              `}
            >
              {text}
            </div>
          )}
        </div>
      )}
    </>
  )
}
