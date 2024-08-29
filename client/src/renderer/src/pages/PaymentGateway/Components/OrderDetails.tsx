export const OrderDetails = ({ currentPlan }) => {
  return (
    <div className='p-8 bg-gray-50 flex flex-col gap-4'>
      <h2 className='text-2xl font-semibold text-gray-700'>Tu pedido</h2>
      <div className='flex items-center'>
        <div>
          <p className='text-lg text-gray-700'>{currentPlan?.name}</p>
          <p className='text-sm text-gray-500'>Cantidad: 1</p>
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <span className='text-sm text-gray-500 line-through'>${currentPlan?.price} USD</span>
        <span className='text-lg font-semibold text-gray-700'>${currentPlan?.price} USD</span>
      </div>
      <div className='flex gap-4 flex-col'>
        <div className='w-full flex gap-4'>
          <select
            id='form-checkout__installments'
            className='p-3 border border-gray-300 rounded-md bg-white text-gray-700 w-full'
          ></select>
          <select
            id='form-checkout__identificationType'
            className='p-3 border border-gray-300 rounded-md bg-white text-gray-700 w-full'
          ></select>
        </div>
        <input
          type='text'
          id='form-checkout__identificationNumber'
          defaultValue='123123'
          placeholder='Número de documento'
          className='p-3 border border-gray-300 rounded-md bg-white text-gray-700'
        />
        <input
          type='email'
          id='form-checkout__cardholderEmail'
          defaultValue='arviixzuh@gmail.com'
          placeholder='Correo electrónico'
          className='p-3 border border-gray-300 rounded-md bg-white text-gray-700'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex justify-between items-center'>
          <span className='text-sm text-gray-500'>Subtotal:</span>
          <span className='text-lg text-gray-700'>${currentPlan?.price} USD</span>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-sm text-gray-500'>Sales Tax:</span>
          <span className='text-lg text-gray-700'>$7.56 USD</span>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-xl font-semibold text-gray-700'>Total Price:</span>
          <span className='text-xl font-semibold text-gray-700'>${currentPlan?.price} USD</span>
        </div>
      </div>
      <a href='#' className='text-sm text-blue-500 underline'>
        Cancelar
      </a>
    </div>
  )
}
