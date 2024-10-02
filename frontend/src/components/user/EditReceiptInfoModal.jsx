import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const EditReceiptInfoModal = ({ isOpen, onClose, receiptData, onSubmit }) => {
  const [formData, setFormData] = useState({
    preparedBy: '',
    to: '',
    buyersTIN: '',
    code: '',
    reference: '',
    fsno: '',
    invoiceNumber: '',
  });

  const { loading } = useSelector((state) => state.receipt); // Access the receipts state

  useEffect(() => {
    if (receiptData) {
      setFormData({
        preparedBy: receiptData.preparedBy,
        to: receiptData.to,
        buyersTIN: receiptData.buyersTIN,
        code: receiptData.code,
        reference: receiptData.reference,
        fsno: receiptData.fsno,
        invoiceNumber: receiptData.invoiceNumber,
      });
    }
  }, [receiptData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, _id: receiptData._id }); // Submit the updated receipt data
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50'>
      <div className='bg-white max-h-[500px] overflow-scroll p-6 rounded-lg shadow-lg w-96'>
        <h2 className='text-lg font-medium mb-4'>Edit Receipt</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block mb-2 text-sm font-medium'>
              Prepared By
            </label>
            <input
              type='text'
              name='preparedBy'
              value={formData.preparedBy}
              onChange={handleInputChange}
              className='w-full border rounded p-2'
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2 text-sm font-medium'>To</label>
            <input
              type='text'
              name='to'
              value={formData.to}
              onChange={handleInputChange}
              className='w-full border rounded p-2'
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2 text-sm font-medium'>
              Buyer's TIN
            </label>
            <input
              type='text'
              name='buyersTIN'
              value={formData.buyersTIN}
              onChange={handleInputChange}
              className='w-full border rounded p-2'
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2 text-sm font-medium'>Code</label>
            <input
              type='text'
              name='code'
              value={formData.code}
              onChange={handleInputChange}
              className='w-full border rounded p-2'
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2 text-sm font-medium'>Reference</label>
            <input
              type='text'
              name='reference'
              value={formData.reference}
              onChange={handleInputChange}
              className='w-full border rounded p-2'
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2 text-sm font-medium'>FS Number</label>
            <input
              type='text'
              name='fsno'
              value={formData.fsno}
              onChange={handleInputChange}
              className='w-full border rounded p-2'
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2 text-sm font-medium'>
              Invoice Number
            </label>
            <input
              type='text'
              name='invoiceNumber'
              value={formData.invoiceNumber}
              onChange={handleInputChange}
              className='w-full border rounded p-2'
            />
          </div>
          <div className='flex justify-end'>
            <button
              type='button'
              onClick={onClose}
              className='bg-gray-500 text-white px-4 py-2 rounded mr-2'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded'
              disabled={loading}
            >
              {loading ? 'Editing...' : 'Done'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReceiptInfoModal;