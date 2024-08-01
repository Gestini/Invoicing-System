import { RoleTable } from './RoleTable'
import { RoleSections } from './Sections'

export const Roles = () => {
  return (
    <section className='flex gap-4 w-full'>
      <RoleTable />
      <RoleSections />
    </section>
  )
}
