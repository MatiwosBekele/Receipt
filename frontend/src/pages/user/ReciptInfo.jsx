import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getReceipts,
  addReceipt,
  updateReceipt,
  deleteReceipt,
} from '../../state/receiptSlice';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { TailSpin } from 'react-loader-spinner';
import AddReceiptInfoModal from '../../components/user/AddReceiptInfoModal';
import DeleteReceiptInfoModal from '../../components/user/DeleteReceiptInfoModal';
import EditReceiptInfoModal from '../../components/user/EditReceiptInfoModal';
const ReceiptTemplate = () => {
  const dispatch = useDispatch();
  const {
    receipts,
    getReceiptStatus,
    addReceiptStatus,
    deleteReceiptStatus,
    updateReceiptStatus,
  } = useSelector((state) => state.receipt);
  console.log('recipts: ', receipts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [receiptToDelete, setReceiptToDelete] = useState(null);

  useEffect(() => {
    dispatch(getReceipts());
  }, [dispatch]);

  const handleAddReceipt = (newReceipt) => {
    dispatch(addReceipt(newReceipt));
  };

  useEffect(() => {
    if (addReceiptStatus === 'succeeded') {
      setIsModalOpen(false);
    }
    if (deleteReceiptStatus === 'succeeded') {
      setIsDeleteModalOpen(false);
    }
    if (updateReceiptStatus === 'succeeded') {
      setIsEditModalOpen(false);
    }
  }, [addReceiptStatus, deleteReceiptStatus, updateReceiptStatus]);

  const openAddModal = () => {
    setIsModalOpen(true);
  };

  const closeAddModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (receiptId) => {
    const receipt = receipts.find((r) => r._id === receiptId);
    setSelectedReceipt(receipt);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedReceipt(null);
  };

  const handleUpdateReceipt = (updatedReceipt) => {
    dispatch(updateReceipt(updatedReceipt));
  };

  const handleDelete = (receiptId) => {
    const receipt = receipts.find((r) => r._id === receiptId);
    setReceiptToDelete(receipt);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setReceiptToDelete(null);
  };

  const confirmDeleteReceipt = () => {
    if (receiptToDelete) {
      dispatch(deleteReceipt(receiptToDelete._id));
    }
  };

  if (getReceiptStatus === 'loading') {
    return (
      <div className='flex justify-center items-center h-screen'>
        <TailSpin height='80' width='80' color='orange' ariaLabel='loading' />
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4 font-poppins'>
      <h1 className='text-sm font-medium mb-4 text-slate-400'>
        Receipt Dashboard
      </h1>
      <div className='flex justify-end mb-2'>
        <button
          onClick={openAddModal}
          className='bg-yellow-400 font-medium hover:bg-yellow-300 text-black rounded-md px-4 py-2 w-fit'
        >
          Add Receipt
        </button>
      </div>

      <AddReceiptInfoModal
        isOpen={isModalOpen}
        onClose={closeAddModal}
        onSubmit={handleAddReceipt}
      />

      <EditReceiptInfoModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        receiptData={selectedReceipt}
        onSubmit={handleUpdateReceipt}
      />

      <DeleteReceiptInfoModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        receiptData={receiptToDelete}
        onDelete={confirmDeleteReceipt}
      />

      <div className='overflow-x-auto'>
        <table className='table-auto w-full rounded-md border-collapse border-2 border-yellow-400'>
          <thead className='bg-gray-200 rounded-md'>
            <tr>
              {/* <th className='border border-gray-300 p-2'>Receipt ID</th> */}
              <th className='border border-gray-300 p-2'>Prepared By</th>
              <th className='border border-gray-300 p-2'>To</th>
              <th className='border border-gray-300 p-2'>Buyer's TIN</th>
              <th className='border border-gray-300 p-2'>Code</th>
              <th className='border border-gray-300 p-2'>Reference</th>
              <th className='border border-gray-300 p-2'>FS No</th>
              <th className='border border-gray-300 p-2'>Invoice Number</th>
              <th className='border border-gray-300 p-2'>Created At</th>
              <th className='border border-gray-300 p-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {receipts?.map((receipt) => (
              <tr key={receipt._id} className='hover:bg-gray-100 text-sm'>
                {/* <td className='border border-gray-300 p-2'>{receipt._id}</td> */}
                <td className='border border-gray-300 p-2'>
                  {receipt.preparedBy}
                </td>
                <td className='border border-gray-300 p-2'>{receipt.to}</td>
                <td className='border border-gray-300 p-2'>
                  {receipt.buyersTIN}
                </td>
                <td className='border border-gray-300 p-2'>{receipt.code}</td>
                <td className='border border-gray-300 p-2'>
                  {receipt.reference}
                </td>
                <td className='border border-gray-300 p-2'>{receipt.fsno}</td>
                <td className='border border-gray-300 p-2'>
                  {receipt.invoiceNumber}
                </td>
                <td className='border border-gray-300 p-2'>
                  {new Date(receipt.createdAt).toLocaleDateString()}
                </td>
                <td className='border border-gray-300 p-2 text-center'>
                  <button
                    onClick={() => handleEdit(receipt._id)}
                    className='mr-2 text-blue-500 hover:text-blue-700'
                  >
                    <AiFillEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(receipt._id)}
                    className='text-red-500 hover:text-red-700'
                  >
                    <AiFillDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReceiptTemplate;
