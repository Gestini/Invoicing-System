import React from 'react'
import { RoleInfo } from './RoleInfo'
import { RootState } from '@renderer/store'
import { RolePerms } from './RolePerms'
import { RoleUsers } from './RoleUsers'
import { useSelector } from 'react-redux'
import { Card, CardBody, CardHeader, Tab, Tabs } from '@nextui-org/react'

export const RoleSections = () => {
  const roles = useSelector((state: RootState) => state.unit.roles)
  const currentRole = roles.data.find((item) => item.id === roles.currentRoleIdEdit)

  return (
    <React.Fragment>
      {currentRole ? (
        <Card className='h-full flex flex-col w-[50%]'>
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
                <Tab key='info' title='Información'>
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
      ) : (
        <Card className='flex flex-col w-[50%]'>
          <CardBody className='items-center flex content-center justify-center'>
            <p className='text-foreground-400 align-middle text-center'>
              Selecciona un rol para ver su información.
            </p>
          </CardBody>
        </Card>
      )}
    </React.Fragment>
  )
}
