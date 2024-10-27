import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import backgroundImage from '../../assets/Attachment.png';
import { numberToWords } from '../../utils';
import { getUser } from '../../state/userSlice';
const Attachment = ({
  selectedProducts,
  products,
  total,
  tax,
  totalWithTax,
  preparedBy,
  to,
  buyersTIN,
  attachmentRef,
  date,
  code,
  rfNo,
  fsNo,
  time,
  invoiceNo,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);
  const { user, getUserStatus } = useSelector((state) => state.user);
  // Function to render the product rows
  const renderProductRows = () => {
    const productEntries = Object.entries(selectedProducts);

    return productEntries.map(([productId, quantity], index) => {
      const product = products.find((p) => p._id === productId);
      if (product && quantity > 0) {
        const amount = product.price * quantity;
        return (
          <tr key={productId} className='leading-none'>
            <td className='border border-gray-800 px-4 text-left'>
              {product.code}
            </td>
            <td className='border border-gray-800 px-4 text-left'>
              {product.name}
            </td>
            <td className='border border-gray-800 px-4 text-left'>PCS</td>
            <td className='border border-gray-800 px-4 text-right'>
              {quantity}
            </td>
            <td className='border border-gray-800 px-4 text-right'>
              {product.price.toFixed(2)}
            </td>
            <td className='border border-gray-800 px-4 text-right'>
              {amount.toFixed(2)}
            </td>
          </tr>
        );
      }
      return null;
    });
  };

  return (
    <div
      className='attachment-container mx-auto p-6  bg-white bg-cover bg-center bg-no-repeat shadow-md border border-gray-300 font-times flex flex-col'
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
      ref={attachmentRef}
    >
      {/* Header */}
      <div className='flex justify-end mb-4 pt-3'>
        <p className='text-sm'>
          6b54486b-ab40-4014-9саc-c89ceac52299 | {date} {time}
        </p>
      </div>
      {getUserStatus === 'succeeded' && (
        <div className='text-start mb-8'>
          <h2 className='text-xl font-bold'>
            {' '}
            {user?.firstName.toUpperCase()} {user?.middleName.toUpperCase()}{' '}
            {user?.lastName.toUpperCase()}
          </h2>
          <h2 className='text-xl font-bold'>{user?.shopName.toUpperCase()}</h2>
          <p className='text-sm'>
            A.A/S/C {user?.shopAddress.subCity.toUpperCase()}{' '}
            {user?.shopAddress.woreda.toUpperCase()} H.NO{' '}
            {user?.shopAddress.houseNumber} AROUND{' '}
            {user?.shopAddress.streetName.toUpperCase()}
          </p>
          <p className='text-sm'>TEL: {user?.telephone}</p>
          <p className='text-sm'>TIN: {user?.tinNumber}</p>
        </div>
      )}

      {/* Title */}
      <h3 className='text-lg font-bold text-center mb-4'>
        Cash Sales Attachment
      </h3>

      {/* Date & Reference */}
      <div className='flex gap-[2px] mb-4 text-xs'>
        <div className='flex flex-col gap-[2px]'>
          <p className='flex gap-[2px]'>
            <span className='border border-gray-400 px-1 rounded-none w-32'>
              Date:
            </span>
            <span className='border border-gray-400 px-1 rounded-none w-64'>
              {date}
            </span>
          </p>
          <p className='flex gap-[2px]'>
            <span className='border border-gray-400 px-1 rounded-none w-32'>
              Bill to:
            </span>
            <span className='border border-gray-400 px-1 rounded-none w-64'>
              {to}
            </span>
          </p>
          <p className='flex gap-[2px]'>
            <span className='border border-gray-400 px-1 rounded-none w-32'>
              TIN:
            </span>
            <span className='border border-gray-400 px-1 rounded-none w-64'>
              {buyersTIN}
            </span>
          </p>
          <p className='flex gap-[2px]'>
            <span className='border border-gray-400 px-1 rounded-none w-32'>
              Address
            </span>
            <span className='border border-gray-400 px-1 rounded-none w-64'></span>
          </p>
        </div>
        <div className='flex flex-col gap-[2px]'>
          <p className='flex gap-[2px]'>
            <span className='border border-gray-400 px-1 rounded-none w-28'>
              Reference:
            </span>
            <span className='border border-gray-400 px-1 rounded-none w-36'>
              {rfNo}
            </span>
          </p>
          <p className='flex gap-[2px]'>
            <span className='border border-gray-400 px-1 rounded-none w-28'>
              FS.NO:
            </span>
            <span className='border border-gray-400 px-1 rounded-none w-36'>
              {fsNo}
            </span>
          </p>
        </div>
      </div>

      {/* Table */}
      <table className='w-full mb-4 border-collapse border border-gray-800'>
        <thead className='text-sm'>
          <tr>
            <th className='border border-gray-800 px-2'>ID</th>
            <th className='border border-gray-800 px-8'>Description</th>
            <th className='border border-gray-800 px-2'>Unit</th>
            <th className='border border-gray-800 px-2'>Quantity</th>
            <th className='border border-gray-800 px-2'>Unit Price</th>
            <th className='border border-gray-800 px-2'>Line Total</th>
          </tr>
        </thead>
        <tbody className='text-xs'>{renderProductRows()}</tbody>
      </table>

      {/* Totals */}
      <div className='flex text-xs justify-between'>
        <div className='flex flex-col'>
          <p>Payment Method</p>
          <p>Amount in Words</p>
        </div>
        <div className='flex flex-col w-60'>
          <p>-</p>
          <p>{numberToWords(totalWithTax)}</p>
        </div>
        <div className='flex text-xs flex-col items-end'>
          <div className='w-64'>
            <p className='border border-b-0 border-gray-800 px-2 flex justify-between'>
              <span className='border-r border-black w-1/2'>Subtotal:</span>
              <span>{total}</span>
            </p>
            <p className='border border-gray-800 px-2 flex justify-between'>
              <span className='border-r border-black w-1/2'>VAT:</span>
              <span>{tax}</span>
            </p>
            <p className='border border-t-0 border-gray-800 px-2 flex justify-between'>
              <span className='border-r border-black w-1/2'>Grand Total:</span>
              <span>{totalWithTax}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='text-xs text-black mt-auto'>
        <div className='flex flex-col'>
          <p>Prepared by: {preparedBy}</p>
          <p>{code}</p>
          <p>
            <span>Received by: __________________________</span>
            <span> Signature __________________________</span>
          </p>
          <p className='font-semibold'>
            NOT VALID WITHOUT FISCAL RECEIPT ATTACHED
          </p>
        </div>
      </div>

      {/* Print-specific styles */}
      <style jsx>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
          }
          .attachment-container {
            width: 210mm;
            height: 297mm;
            border: 1px solid black;
            padding: 0 20mm 20mm; /* No padding at the top, 20mm padding on right and left, 20mm padding at the bottom */
            box-sizing: border-box;
          }
          .shadow-md {
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Attachment;
