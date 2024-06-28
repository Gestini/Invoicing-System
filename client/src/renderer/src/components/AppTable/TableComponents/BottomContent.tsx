import { Button, Pagination } from '@nextui-org/react'

export const BottomContent = ({ pages, page, setPage, selectedKeys, filteredItems }) => {
  const onNextPage = () => {
    if (page < pages) {
      setPage(page + 1)
    }
  }

  const onPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  return (
    <div className='py-2 px-2 flex justify-between items-center'>
      <span className='w-[30%] text-small text-default-400'>
        {selectedKeys === 'all'
          ? 'Todos estan seleccionados'
          : `${selectedKeys.size} de ${filteredItems.length}  seleccionados`}
      </span>
      <Pagination
        isCompact
        showControls
        showShadow
        color='primary'
        page={page}
        total={pages}
        onChange={setPage}
      />
      <div className='hidden sm:flex w-[30%] justify-end gap-2'>
        <Button isDisabled={pages === 1} size='sm' variant='flat' onPress={onPreviousPage}>
          Previous
        </Button>
        <Button isDisabled={pages === 1} size='sm' variant='flat' onPress={onNextPage}>
          Next
        </Button>
      </div>
    </div>
  )
}
