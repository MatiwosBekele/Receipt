import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from '../../state/productsSlice';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'; // Edit and Delete icons
import { TailSpin } from 'react-loader-spinner'; // Loader spinner
import ProductAddModal from '../../components/user/ProductAddModal';
import EditProductModal from '../../components/user/EditProductModal'; // Import the Edit modal
import DeleteProductModal from '../../components/user/DeleteProductModal'; // Import the Delete modal

const DashBoard = () => {
  const dispatch = useDispatch();
  const {
    products,
    getProductStatus,
    addProductStatus,
    deleteProductStatus,
    updateProductStatus,
  } = useSelector((state) => state.products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete modal
  const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product
  const [productToDelete, setProductToDelete] = useState(null); // State for product to delete

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleAddProduct = (newProduct) => {
    dispatch(addProduct(newProduct));
  };
  useEffect(() => {
    if (addProductStatus === 'succeeded') {
      setIsModalOpen(false); // Close modal after submission
    }
    if (deleteProductStatus === 'succeeded') {
      setIsDeleteModalOpen(false); // Close delete modal after deletion
    }
    if (updateProductStatus === 'succeeded') {
      setIsEditModalOpen(false); // Close edit modal after update
    }
  }, [addProductStatus, deleteProductStatus, updateProductStatus]);
  const openAddModal = () => {
    setIsModalOpen(true);
  };

  const closeAddModal = () => {
    setIsModalOpen(false);
  };

  // Open edit modal and set selected product
  const handleEdit = (productId) => {
    const product = products.find((p) => p._id === productId);
    setSelectedProduct(product); // Set the selected product
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null); // Clear selected product
  };

  const handleUpdateProduct = (updatedProduct) => {
    dispatch(updateProduct(updatedProduct)); // Dispatch updateProduct action
  };

  // Open delete modal and set product to delete
  const handleDelete = (productId) => {
    const product = products.find((p) => p._id === productId);
    setProductToDelete(product); // Set the product to delete
    setIsDeleteModalOpen(true); // Open delete confirmation modal
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null); // Clear selected product for deletion
  };

  // Handle actual product deletion
  const confirmDeleteProduct = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete._id)); // Dispatch deleteProduct action with product ID
    }
  };

  if (getProductStatus === 'loading') {
    return (
      <div className='flex justify-center items-center h-screen'>
        <TailSpin height='80' width='80' color='orange' ariaLabel='loading' />
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4 font-poppins'>
      <h1 className='text-sm font-medium mb-4 text-slate-400'>
        Product Dashboard
      </h1>
      <div className='flex justify-end mb-2'>
        <button
          onClick={openAddModal}
          className='bg-yellow-400 font-medium hover:bg-yellow-300 text-black rounded-md px-4 py-2 w-fit'
        >
          Add Product
        </button>
      </div>

      {/* Modal for adding product */}
      <ProductAddModal
        isOpen={isModalOpen}
        onClose={closeAddModal}
        onSubmit={handleAddProduct}
      />

      {/* Modal for editing product */}
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        productData={selectedProduct}
        onSubmit={handleUpdateProduct}
      />

      {/* Modal for deleting product */}
      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        productData={productToDelete}
        onDelete={confirmDeleteProduct}
      />

      <div className='overflow-x-auto'>
        <table className='table-auto w-full rounded-md border-collapse border-2 border-yellow-400'>
          <thead className='bg-gray-200 rounded-md'>
            <tr>
              <th className='border border-gray-300 p-2'>Code</th>
              <th className='border border-gray-300 p-2'>Name</th>
              <th className='border border-gray-300 p-2'>Price</th>
              <th className='border border-gray-300 p-2'>Description</th>
              <th className='border border-gray-300 p-2'>Stock</th>
              <th className='border border-gray-300 p-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id} className='hover:bg-gray-100 text-sm'>
                <td className='border border-gray-300 p-2'>{product.code}</td>
                <td className='border border-gray-300 p-2'>{product.name}</td>
                <td className='border border-gray-300 p-2'>
                  {product.price.toFixed(2)}
                </td>
                <td className='border border-gray-300 p-2'>
                  {product.description}
                </td>
                <td className='border border-gray-300 p-2'>{product.stock}</td>
                <td className='border border-gray-300 p-2 text-center'>
                  <button
                    onClick={() => handleEdit(product._id)}
                    className='mr-2 text-blue-500 hover:text-blue-700'
                  >
                    <AiFillEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
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

export default DashBoard;
