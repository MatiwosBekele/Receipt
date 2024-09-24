import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../state/productsSlice';
import { TailSpin } from 'react-loader-spinner';
import { useReactToPrint } from 'react-to-print';
import Logo from '../../assets/E.png';
import { RiAsterisk } from 'react-icons/ri';
// import Receipt from '../../components/user/ReceiptMarakiPOS';
import Receipt from '../../components/user/ReceiptPeds';
import { formatDateAndTime } from '../../utils';
import ReceiptPEDS from '../../components/user/ReceiptPeds';
import ReceiptMarakiPOS from '../../components/user/ReceiptMarakiPOS';
import Attachment from '../../components/user/Attachment';

const VAT_RATE = 0.15;

const CheckOut = () => {
  const dispatch = useDispatch();
  const { products, getProductStatus } = useSelector((state) => state.products);
  const currentDate = new Date();
  const formatted = formatDateAndTime(currentDate);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [total, setTotal] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalWithTax, setTotalWithTax] = useState(0);
  const [date, setDate] = useState(formatted.date);
  const [time, setTime] = useState(formatted.time);
  const [preparedBy, setPreparedBy] = useState('');
  const [to, setTo] = useState('');
  const [buyersTIN, setBuyersTIN] = useState('');
  const [code, setCode] = useState('');
  const [rfNo, setRfNo] = useState('');
  const [fsNo, setFsNo] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');

  // Ref for printing
  const receiptRef = useRef();
  const attachmentRef = useRef(); // New ref for Attachment

  useEffect(() => {
    dispatch(getProducts()); // Fetch products from backend
  }, [dispatch]);

  const handleQuantityChange = (productId, quantity) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  const calculateTotal = () => {
    let totalPrice = 0;
    let totalQuantity = 0;

    Object.entries(selectedProducts).forEach(([productId, quantity]) => {
      const product = products.find((p) => p._id === productId);
      if (product && quantity > 0) {
        totalPrice += product.price * quantity;
        totalQuantity += quantity;
      }
    });

    const calculatedTax = totalPrice * VAT_RATE;
    const totalWithVAT = totalPrice + calculatedTax;

    setTotal(totalPrice.toFixed(2)); // Set total before tax with 2 decimal places
    setTax(calculatedTax.toFixed(2)); // Set VAT
    setTotalWithTax(totalWithVAT.toFixed(2)); // Set total with VAT
    setTotalItems(totalQuantity); // Set total number of items
  };

  // Handle print receipt action
  const handlePrintReceipt = useReactToPrint({
    content: () => receiptRef.current,
  });

  // Handle print attachment action
  const handlePrintAttachment = useReactToPrint({
    content: () => attachmentRef.current,
  });

  const [receiptNumber, setReceiptNumber] = useState(1);

  const handleCheckboxChange = (number) => {
    setReceiptNumber(number);
  };
  const [search, setSearch] = useState('');
  return (
    <div className='flex flex-col font-poppins'>
      <div className='flex justify-between '>
        <div className='w-1/2 p-4 '>
          <h2 className=' font-bold mb-1'>Select Products</h2>
          <div className='max-h-80 overflow-scroll space-y-1 p-4 border-2 border-yellow-400 rounded-md'>
            <input
              type='text'
              placeholder='Search products...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='border p-2 mb-2 w-full'
            />

            {getProductStatus === 'loading' ? (
              <div className='flex items-center justify-center'>
                <TailSpin
                  height='40'
                  width='40'
                  color='orange'
                  ariaLabel='loading'
                />
              </div>
            ) : getProductStatus === 'error' ? (
              <p>Error fetching products</p>
            ) : products.filter((product) => {
                return search.toLowerCase() === ''
                  ? true
                  : product.name.toLowerCase().includes(search.toLowerCase());
              }).length === 0 ? (
              <p className='text-center text-gray-500'>No results found</p>
            ) : (
              products
                .filter((product) => {
                  return search.toLowerCase() === ''
                    ? true
                    : product.name.toLowerCase().includes(search.toLowerCase());
                })
                .map((product) => (
                  <div
                    key={product._id}
                    className='flex justify-between items-center'
                  >
                    <div className='text-sm'>
                      {product.name} - {product.price.toFixed(2)}
                      <span className='text-xs receipt-font text-gray-600'>
                        {' '}
                        (In stock: {product.stock})
                      </span>
                    </div>
                    <input
                      type='number'
                      min='0'
                      className='border p-2 w-16 h-8'
                      placeholder='Qty'
                      onChange={(e) =>
                        handleQuantityChange(
                          product._id,
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                ))
            )}
          </div>
          <div className='flex justify-center'>
            <button
              className='mt-4 bg-yellow-400 text-xl text-black font-medium hover:bg-yellow-300 w-full rounded-md px-4 py-2'
              onClick={calculateTotal}
            >
              Calculate
            </button>
          </div>

          <div className='mt-4 border-yellow-400 rounded-md border-2 flex-col flex gap-2 text-sm p-2'>
            <input
              type='text'
              placeholder='Prepared by'
              value={preparedBy}
              onChange={(e) => setPreparedBy(e.target.value)}
              className='border p-2 w-full mb-2'
            />
            <input
              type='text'
              placeholder='To'
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className='border p-2 w-full mb-2'
            />
            <input
              type='text'
              placeholder="Buyer's TIN"
              value={buyersTIN}
              onChange={(e) => setBuyersTIN(e.target.value)}
              className='border p-2 w-full'
            />

            <input
              type='text'
              placeholder='Code'
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className='border p-2 w-full'
            />
            <input
              type='text'
              placeholder='Reference'
              value={rfNo}
              onChange={(e) => setRfNo(e.target.value)}
              className='border p-2 w-full'
            />
            <input
              type='text'
              placeholder='FS No.'
              value={fsNo}
              onChange={(e) => setFsNo(e.target.value)}
              className='border p-2 w-full'
            />
            <input
              type='text'
              placeholder='Invoice Number'
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
              className='border p-2 w-full'
            />
            <input
              type='date'
              placeholder='Date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className='border p-2 w-full'
            />
            <input
              type='time'
              placeholder='Time'
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className='border p-2 w-full'
            />
          </div>
        </div>

        <div className='w-1/2 p-4 border-l border-gray-300 bg-slate-200'>
          <div className='flex justify-center'>
            <h2 className=' font-bold mb-2'>Choose receipt template</h2>
          </div>
          <div className='flex justify-center gap-4 mb-2'>
            <label>
              <input
                type='checkbox'
                checked={receiptNumber === 1}
                onChange={() => handleCheckboxChange(1)}
              />
              PEDS
            </label>
            <label>
              <input
                type='checkbox'
                checked={receiptNumber === 2}
                onChange={() => handleCheckboxChange(2)}
              />
              MarakiPOS
            </label>
          </div>

          {receiptNumber === 1 && (
            <ReceiptPEDS
              selectedProducts={selectedProducts}
              products={products}
              total={total}
              tax={tax}
              totalWithTax={totalWithTax}
              totalItems={totalItems}
              preparedBy={preparedBy}
              to={to}
              date={date}
              time={time}
              buyersTIN={buyersTIN}
              receiptRef={receiptRef}
              code={code}
              rfNo={rfNo}
              fsNo={fsNo}
              invoiceNo={invoiceNo}
            />
          )}
          {receiptNumber === 2 && (
            <ReceiptMarakiPOS
              selectedProducts={selectedProducts}
              products={products}
              total={total}
              tax={tax}
              totalWithTax={totalWithTax}
              totalItems={totalItems}
              preparedBy={preparedBy}
              to={to}
              date={date}
              time={time}
              buyersTIN={buyersTIN}
              receiptRef={receiptRef}
              code={code}
              rfNo={rfNo}
              fsNo={fsNo}
              invoiceNo={invoiceNo}
            />
          )}

          {/* Print Receipt Button */}
          <button
            className='mt-4 bg-yellow-400 text-xl text-black font-medium hover:bg-yellow-300 w-full rounded-md px-4 py-2'
            onClick={handlePrintReceipt}
          >
            Print Receipt
          </button>

          {/* Print Attachment Button */}
          <button
            className='mt-4 bg-yellow-400 text-xl text-black font-medium hover:bg-yellow-300 w-full rounded-md px-4 py-2'
            onClick={handlePrintAttachment}
          >
            Print Attachment
          </button>
        </div>
      </div>

      {/* Render the Attachment component and reference it for printing */}
      <div>
        <Attachment
          selectedProducts={selectedProducts}
          products={products}
          total={total}
          tax={tax}
          totalWithTax={totalWithTax}
          totalItems={totalItems}
          preparedBy={preparedBy}
          to={to}
          date={date}
          time={time}
          buyersTIN={buyersTIN}
          attachmentRef={attachmentRef}
          code={code}
          rfNo={rfNo}
          fsNo={fsNo}
          invoiceNo={invoiceNo}
        />
      </div>
    </div>
  );
};

export default CheckOut;
