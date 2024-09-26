export interface permsMap {
  title: string
  permission: string
  description: string
}

export const permissions = Object.freeze({
  warehouse: {
    title: 'Gestionar depósitos',
    permission: 'MANAGE_STOCK',
    description: 'Permite gestionar la sección de depósitos.',
  },
  hr: {
    title: 'Gestionar recursos humanos',
    permission: 'MANAGE_HR',
    description: 'Permite gestionar la sección de recursos humanos.',
  },
  operations: {
    title: 'Gestionar operaciones',
    permission: 'MANAGE_OPERATIONS',
    description: 'Permite gestionar la sección de operaciones.',
  },
  pos: {
    title: 'Gestionar punto de venta',
    permission: 'MANAGE_POS',
    description: 'Permite gestionar la sección de puntos de venta.',
  },
  documents: {
    title: 'Gestionar documentos',
    permission: 'MANAGE_DOCUMENTS',
    description: 'Permite gestionar la sección de puntos de venta.',
  },
  admin: {
    title: 'Admin',
    permission: '*',
    description: 'Ignora las restricciones',
  },
})
