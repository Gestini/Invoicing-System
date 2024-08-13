import { RoleTable } from './RoleTable'
import { RoleSections } from './Sections'

export const Roles = () => {
  return (
    <section className='flex gap-4 w-full h-full'>
      <RoleTable />
      <RoleSections />
    </section>
  )
}
