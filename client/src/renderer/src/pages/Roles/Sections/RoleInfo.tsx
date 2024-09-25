import React from 'react'
import { RootState } from '@renderer/store'
import { RoleModel } from '@renderer/interfaces/role'
import { Button, cn, Input } from '@nextui-org/react'
import { DeleteDocumentIcon } from '@renderer/components/Icons/DeleteDocumentIcon'
import { deleteRole, editRole } from '@renderer/features/roleSlice'
import { useDispatch, useSelector } from 'react-redux'
import { reqDeleteRole, reqEditRole } from '@renderer/api/requests'

export const RoleInfo = () => {
  const dispatch = useDispatch()
  const roles = useSelector((state: RootState) => state.unit.roles)
  const currentRole = roles.data.find((item) => item.id === roles.currentRoleIdEdit)
  const [inputs, setInputs] = React.useState({
    name: '',
  })
  const [role, setRole] = React.useState<RoleModel | null>(null)

  React.useEffect(() => {
    if (currentRole) {
      setInputs({
        name: currentRole.name || '',
      })
      setRole(currentRole)
    }
  }, [currentRole])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }))
  }

  const handleEditRole = async () => {
    if (!role) return
    try {
      dispatch(editRole({ data: inputs, id: role.id }))
      await reqEditRole(role.id, inputs)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteRole = async () => {
    if (!role) return
    try {
      await reqDeleteRole(role.id)
      dispatch(deleteRole(role.id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col gap-4 mt-2'>
      <Input
        type='text'
        label='Nombre'
        name='name'
        value={inputs.name}
        onChange={handleChange}
        placeholder='Ingresa el nombre del rol'
        labelPlacement='outside'
      />
      <div className='flex gap-4'>
        <Button
          onPress={() => null}
          variant='light'
          endContent={
            <DeleteDocumentIcon
              className={cn(
                'text-xl text-default-500 pointer-events-none flex-shrink-0',
                'text-danger',
              )}
            />
          }
          radius='sm'
          color='danger'
          onClick={handleDeleteRole}
        >
          Borrar
        </Button>
        <Button
          onPress={() => null}
          className='bg-c-primary'
          color='secondary'
          radius='sm'
          onClick={handleEditRole}
        >
          Guardar
        </Button>
      </div>
    </div>
  )
}
