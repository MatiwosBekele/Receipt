import React, { useEffect } from 'react';
import { FaRegSmile } from 'react-icons/fa'; // Importing an icon for the thank-you section
import Logo from '../../assets/E.png';
import { convertDateFormat } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../state/userSlice';
const ReceiptPEDS = ({
  selectedProducts,
  products,
  total,
  tax,
  totalWithTax,
  totalItems,
  preparedBy,
  to,
  buyersTIN,
  receiptRef,
  date,
  time,
  code,
  rfNo,
  fsNo,
  invoiceNo,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    renderProductRows();
  }, [selectedProducts]);
  useEffect(() => {
    dispatch(getUser());
  }, []);
  const { user, getUserStatus } = useSelector((state) => state.user);
  console.log(user);
  // Function to get the product details (name and price) based on the selectedProducts object
  const renderProductRows = () => {
    const productEntries = Object.entries(selectedProducts);

    return productEntries.map(([productId, quantity], index) => {
      const product = products.find((p) => p._id === productId);
      if (product && quantity > 0) {
        const amount = product.price * quantity;
        // Check if it's the last item in the array
        const isLastItem = index === productEntries.length - 1;

        return (
          <tr key={productId} className='leading-none'>
            <td className={`${isLastItem ? 'pb-2' : ''}`}>
              {product.name.toUpperCase()}
            </td>
            <td className={`${isLastItem ? 'pb-2' : ''} text-center`}>
              {quantity}
            </td>
            <td className={`${isLastItem ? 'pb-2' : ''} text-right`}>
              {product.price.toFixed(2)}
            </td>
            <td className={`${isLastItem ? 'pb-2' : ''} text-right`}>
              *{amount.toFixed(2)}
            </td>
          </tr>
        );
      }
      return null;
    });
  };

  return (
    <div
      className='bg-white w-full px-4 mx-auto font-noto border rounded-md py-2 shadow-md border-gray-300'
      ref={receiptRef}
    >
      {/* Header Section */}
      {getUserStatus === 'succeeded' && (
        <div className='text-center flex flex-col mb-4 leading-tight'>
          <p>TIN: {user?.tinNumber}</p>
          <p>
            {user?.firstName.toUpperCase()} {user?.middleName.toUpperCase()}{' '}
            {user?.lastName.toUpperCase()}
          </p>
          <p>{user?.shopName.toUpperCase()}</p>
          <p>
            A.A S/C-{user?.shopAddress.subCity.toUpperCase()}{' '}
            {user?.shopAddress.woreda.toUpperCase()}
          </p>
          <p>HNO-{user?.shopAddress.houseNumber}</p>
          <p>TEL-{user?.telephone}</p>
          <p>{user?.shopAddress.streetName.toUpperCase()}</p>
        </div>
      )}

      {/* Invoice Details */}
      <div className='flex justify-between mb-4'>
        <div className='leading-tight'>
          <p>FS NO. {fsNo}</p>
          <p>{date}</p>
        </div>
        <div className='text-right leading-tight'>
          <p>
            #<span className='font-extrabold font-biondi'>A</span>
          </p>
          <p>{time}</p>
        </div>
      </div>
      <div className='flex justify-center items-center gap-1'>
        <div className='h-2 w-40 flex-1 border-b-2 border-t-2 border-dashed border-black'></div>
        <p className='text-center flex-2'>CASH INVOICE</p>
        <div className='h-2 flex-1 border-b-2 border-t-2 border-dashed border-black'></div>
      </div>

      <div className='mb-3 leading-tight'>
        <p>REF NO.: {rfNo}</p>
        <p>INVOICE NO. : {invoiceNo}</p>
        <p>CUSTOMER NAME: {to?.toUpperCase()}</p>
        <p>CASHIER: {preparedBy?.toUpperCase()}</p>
        <p>BUYER’S TIN: {buyersTIN}</p>
      </div>

      {/* Table Section */}
      <table className='w-full mb-4'>
        <thead>
          <tr className='border-b-2 border-t-2 border-dashed border-black'>
            <td className='text-left pb-2'>DESCRIPTION</td>
            <td className='text-center pb-2'>QTY</td>
            <td className='text-center pl-6 pb-2'>PRICE</td>
            <td className='text-right pb-2'>AMOUNT</td>
          </tr>
        </thead>
        <tbody className='leading-tight'>
          {renderProductRows()}
          <tr className='border-t-2 border-dashed border-black'>
            <td>TXBL 1</td>
            <td></td>
            <td></td>
            <td className='text-right'>*{total}</td>
          </tr>
          <tr className='border-b-2 border-dashed border-black'>
            <td className='pb-3'>TAX 1 (15.00%)</td>
            <td className='pb-3'></td>
            <td className='pb-3'></td>
            <td className='text-right pb-3'>*{tax}</td>
          </tr>
        </tbody>
      </table>

      {/* Total Section */}
      <div className='leading-none'>
        <div className='flex justify-between leading-tight'>
          <p>TOTAL</p>
          <p>*{totalWithTax}</p>
        </div>

        <div className='flex justify-between leading-tight'>
          <p>CASH</p>
          <p>*{totalWithTax}</p>
        </div>
        <div className='flex justify-between mb-4 leading-tight'>
          <p>ITEM#</p>
          <p>{totalItems}</p>
        </div>
      </div>

      {/* Footer Section */}
      <div className='text-center leading-tight'>
        <p className='font-extrabold font-myriad text-3xl tracking-wide'>
          ERCA
        </p>
        <p className='flex justify-center items-center gap-2'>
          <img src={Logo} className='w-5 h-4' alt='logo' /> {code}
        </p>
        <p>SYSTEM BY PEDS</p>
        <p className='flex justify-center items-center gap-1'>
          THANK YOU! PLEASE COME AGAIN
        </p>
      </div>
    </div>
  );
};

export default ReceiptPEDS;
