import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'

const ImportedProductsModal = ({ isOpen, onClose, onConfirmImport, products }) => {
  return (
    <Modal isOpen={isOpen} size={'5xl'} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Productos Importados</ModalHeader>
        <ModalBody>
          <Table aria-label='Imported Products Table'>
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>Name</TableColumn>
              <TableColumn>Category</TableColumn>
              <TableColumn>Price</TableColumn>
              <TableColumn>Stock</TableColumn>
              <TableColumn>Supplier</TableColumn>
              <TableColumn>Status</TableColumn>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.supplier}</TableCell>
                  <TableCell>{product.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={onConfirmImport}>
            Importar
          </Button>
          <Button color='danger' onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ImportedProductsModal
