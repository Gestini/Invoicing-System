export interface permsMap {
    title: string
    permission: string
    description: string
}

export const permissions = [
  {
    title: 'Gestionar stock',
    permission: 'MANAGE_STOCK',
    description: 'Permite a los usuarios gestionar el stock.',
  },
  {
    title: 'Gestionar proveedores',
    permission: 'MANAGE_SUPPLIER',
    description: 'Permite a los usuarios gestionar el proveedores.',
  },
  {
    title: 'Gestionar ventas',
    permission: 'MANAGE_SALES',
    description: 'Permite a los usuarios gestionar el ventas.',
  },
  {
    title: 'Gestionar pedidos',
    permission: 'MANAGE_ORDERS',
    description: 'Permite a los usuarios gestionar los pedidos.',
  },
  {
    title: 'Gestionar clientes',
    permission: 'MANAGE_CLIENT',
    description: 'Permite a los usuarios gestionar el clientes.',
  },
]
