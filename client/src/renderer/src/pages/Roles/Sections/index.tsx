import { Role } from '@renderer/features/roleSlice'
import { RoleInfo } from './RoleInfo'
import { RolePerms } from './RolePerms'
import { RoleUsers } from './RoleUsers'
import { useSelector } from 'react-redux'
import { Card, CardBody, CardHeader, Tab, Tabs } from '@nextui-org/react'

export const RoleSections = () => {
  const roles = useSelector((state: any) => state.roles)
  const currentRole = roles.data.find((item: Role) => item.id === roles.currentRoleIdEdit)

  return (
    <div className='w-[50%] rounded-md'>
      {currentRole && (
        <Card>
          <CardHeader>
            <h3 className='text-3xl font-semibold text-c-title'>{currentRole.name}</h3>
          </CardHeader>
          <CardBody>
            <div>
              <Tabs
                variant='underlined'
                aria-label='Tabs variants'
                classNames={{
                  tabList: 'gap-6 w-full relative rounded-none p-0',
                  cursor: 'w-full bg-[var(--c-primary)]',
                  tabContent: 'group-data-[selected=true]:text-[var(--c-primary)]',
                }}
              >
                <Tab key='info' title='Informacion'>
                  <RoleInfo />
                </Tab>
                <Tab key='perms' title='Permisos'>
                  <RolePerms />
                </Tab>
                <Tab key='users' title='Miembros'>
                  <RoleUsers />
                </Tab>
              </Tabs>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  )
}
