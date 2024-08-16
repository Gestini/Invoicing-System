import React from 'react'
import { LogInAsModal } from '../Modals/LogInAsModal'
import { SettingsModal } from '../Modals/SettingsModal'
import { AddNewAccountModal } from '../Modals/AddNewAccountModal'

export const UserOptionModals = () => {
  const [errors, _] = React.useState({
    username: '',
    password: '',
  })

  return (
    <>
      <LogInAsModal errors={errors} />
      <AddNewAccountModal errors={errors} />
      <SettingsModal />
    </>
  )
}
