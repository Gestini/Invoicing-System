import { RootState } from '@renderer/store'
import { changeView, viewTypes } from '@renderer/features/fileSlice'
import { MdViewList, MdViewModule } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'

export const ChangeView = () => {
  const dispatch = useDispatch()
  const { viewType } = useSelector((state: RootState) => state.documents)

  const toggleViewType = () => {
    const newViewType = viewType === viewTypes.squere ? viewTypes.table : viewTypes.squere
    dispatch(changeView(newViewType))
    localStorage.setItem('viewType', newViewType)
  }

  return (
    <div className='flex'>
      <button
        onClick={toggleViewType}
        className='rounded-xl text-c-primary'
      >
        {viewType === viewTypes.squere ? (
          <MdViewList className='flex items-center justify-center h-[32px] w-[32px]' />
        ) : (
          <MdViewModule className='flex items-center justify-center h-[32px] w-[32px]' />
        )}
      </button>
    </div>
  )
}
