import React from 'react'
import { Button, Input } from '@nextui-org/react'
import { BiSave, BiTrash } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { deleteRole, editRole, Role } from '@renderer/features/roleSlice'
import { reqDeleteRole, reqEditRole } from '@renderer/api/requests'

export const RoleInfo = () => {
  const dispatch = useDispatch()
  const roles = useSelector((state: any) => state.roles)
  const currentRole = roles.data.find((item: Role) => item.id === roles.currentRoleIdEdit)
  const [inputs, setInputs] = React.useState({
    name: '',
  })
  const [role, setRole] = React.useState<Role | null>(null)

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
          variant='bordered'
          endContent={<BiTrash />}
          onClick={handleDeleteRole}
        >
          Borrar
        </Button>
        <Button
          onPress={() => null}
          className='bg-c-primary'
          color='secondary'
          onClick={handleEditRole}
          endContent={<BiSave />}
        >
          Guardar
        </Button>
      </div>
    </div>
  )
}
