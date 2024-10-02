import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai'; // Close icon for the modal
import { useSelector } from 'react-redux';

const AddReceiptInfoModal = ({ isOpen, onClose, onSubmit }) => {
  const [receiptData, setReceiptData] = useState({
    preparedBy: '',
    to: '',
    buyersTIN: '',
    code: '',
    reference: '',
    fsno: '',
    invoiceNumber: '',
  });
  const { addReceiptStatus, loading } = useSelector((state) => state.receipt);

  useEffect(() => {
    if (addReceiptStatus === 'succeeded') {
      setReceiptData({
        preparedBy: '',
        to: '',
        buyersTIN: '',
        code: '',
        reference: '',
        fsno: '',
        invoiceNumber: '',
      });
    }
  }, [addReceiptStatus]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReceiptData({
      ...receiptData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(receiptData);
  };

  return (
    <div className='fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded-md w-full max-w-md max-h-[500px] overflow-scroll'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-medium'>Add Receipt Info</h2>
          <button onClick={onClose}>
            <AiOutlineClose size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1'>
              Prepared By
            </label>
            <input
              type='text'
              name='preparedBy'
              value={receiptData.preparedBy}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1'>To</label>
            <input
              type='text'
              name='to'
              value={receiptData.to}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1'>
              Buyer's TIN
            </label>
            <input
              type='text'
              name='buyersTIN'
              value={receiptData.buyersTIN}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1'>Code</label>
            <input
              type='text'
              name='code'
              value={receiptData.code}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1'>Reference</label>
            <input
              type='text'
              name='reference'
              value={receiptData.reference}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1'>FSNO</label>
            <input
              type='text'
              name='fsno'
              value={receiptData.fsno}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1'>
              Invoice Number
            </label>
            <input
              type='text'
              name='invoiceNumber'
              value={receiptData.invoiceNumber}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400'
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Receipt'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReceiptInfoModal;