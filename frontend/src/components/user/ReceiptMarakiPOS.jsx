import { RiAsterisk } from 'react-icons/ri';
import Logo from '../../assets/E.png';
import { convertDateFormat, formatDateAndTime } from '../../utils';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../state/userSlice';

const ReceiptMarakiPOS = ({
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
  const formattedDate = convertDateFormat(date);

  useEffect(() => {
    dispatch(getUser());
  }, []);
  const { user, getUserStatus } = useSelector((state) => state.user);
  return (
    <div
      ref={receiptRef}
      className='bg-white p-2 px-4 rounded-lg shadow-md mx-auto border border-gray-300 font-pixel'
    >
      {getUserStatus === 'succeeded' && (
        <div className='text-center text-base receipt-font mb-4'>
          <p>TIN: {user?.tinNumber}</p>
          <p>
            {user?.firstName.toUpperCase()} {user?.middleName.toUpperCase()}{' '}
            {user?.lastName.toUpperCase()}
          </p>
          <p>Addis Ababa</p>
          <p>S/C N/S: LAFT0 U 06 HNO 306/5</p>
          <p>Kera Down Town</p>
          <p>{code}</p>
        </div>
      )}

      <hr className='my-2' />

      <div className='flex flex-col justify-between text-base receipt-font mb-2'>
        <p>FS No. {fsNo}</p>
        <div className='flex justify-between'>
          <p>{formattedDate}</p>
          <p>{time}</p>
        </div>
      </div>

      <div className=' text-base receipt-font mb-4'>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <p>#</p> <p>Cash Sales Invoice</p>
          </div>
          <p>#</p>
        </div>
        <div className='flex justify-between'>
          <div className='flex flex-nowrap gap-1'>
            <p>#</p> <p>Reference:{rfNo}</p>
          </div>
          <p>#</p>
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <p>#</p> <p>Prepared by: {preparedBy}</p>
          </div>
          <p>#</p>
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <p>#</p> <p>To: {to}</p>
          </div>
          <p>#</p>
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <p>#</p> <p>Buyer’s TIN: {buyersTIN}</p>
          </div>
          <p>#</p>
        </div>
      </div>

      <hr className='my-2' />

      {/* Render selected products */}
      {Object.entries(selectedProducts).map(([productId, quantity]) => {
        const product = products.find((p) => p._id === productId);
        if (product && quantity > 0) {
          return (
            <div
              key={product._id}
              className='flex justify-between mb-2 text-base receipt-font'
            >
              <div className='flex flex-col items-center'>
                <p>
                  {quantity} x {product.price.toFixed(2)} =
                </p>
                <p className='w-3/2'>{product.name}</p>
              </div>
              <p className='flex items-center'>
                {' '}
                <span className='ml-1'>
                  <RiAsterisk size={10} />
                </span>
                {(product.price * quantity).toFixed(2)}
              </p>
            </div>
          );
        }
        return null;
      })}

      <div className='flex justify-center gap-4'>
        <div className='w-2 border border-black'></div>
        <div className='w-2 border border-black'></div>
        <div className='w-2 border border-black'></div>
        <div className='w-2 border border-black'></div>
      </div>

      {total && (
        <>
          <div className='my-2'>
            {/* TXBL1 row for total before tax */}
            <div className='flex justify-between text-base receipt-font'>
              <p>TXBL1 </p>
              <p className='flex items-center'>
                <span className='ml-1'>
                  <RiAsterisk size={10} />
                </span>
                {total}
              </p>
            </div>

            {/* TAX1 row for 15% tax */}
            <div className='flex justify-between text-base receipt-font'>
              <p>TAX1 15% </p>
              <p className='flex items-center'>
                <span className='ml-1'>
                  <RiAsterisk size={10} />
                </span>
                {tax}
              </p>
            </div>
          </div>

          <div className='flex justify-center gap-4'>
            <div className='w-2 border border-black'></div>
            <div className='w-2 border border-black'></div>
            <div className='w-2 border border-black'></div>
            <div className='w-2 border border-black'></div>
          </div>

          {/* Total with VAT */}
          <div className='flex receipt-total justify-between text-xl font-medium mt-2'>
            <p>TOTAL =</p>
            <p className='flex items-center'>
              <span className='ml-1'>
                <RiAsterisk size={14} />
              </span>
              {totalWithTax}
            </p>
          </div>

          {/* Cash (same as total with VAT) */}
          <div className='flex justify-between text-base receipt-font'>
            <p>Cash </p>
            <p className='flex items-center'>
              <span className='ml-1'>
                <RiAsterisk size={10} />
              </span>
              {totalWithTax}
            </p>
          </div>

          {/* Total number of items */}
          <div className='flex justify-between text-base receipt-font'>
            <p>ITEM# </p>
            <p>{totalItems}</p>
          </div>
        </>
      )}

      <div className='flex-col flex items-center justify-center text-center text-base receipt-font mb-4'>
        <p className='font-light text-xl tracking-[10px] receipt-footer'>
          ERCA
        </p>
        <div className='flex justify-center items-center gap-2'>
          <img src={Logo} alt='logo' className='w-auto h-3' />
          <p className='text-base receipt-img-font'>{code}</p>
        </div>
        <p className='text-xl receipt-footer'>Powered by MarakiPOS 4.0</p>
      </div>
    </div>
  );
};

export default ReceiptMarakiPOS;
