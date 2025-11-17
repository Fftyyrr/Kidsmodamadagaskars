import React, { useState, FormEvent, useEffect } from 'react';
import { useDataContext } from '../../hooks/useDataContext';
import { Product } from '../../types';
import { Plus, Edit, Trash2 } from 'lucide-react';

// Fix for line 31: Define a type for the form state to handle sizes as either string or array.
type ProductFormState = Omit<Partial<Product>, 'sizes'> & { sizes?: string | string[] };

const AdminProducts = () => {
    const { products, categories, addProduct, updateProduct, deleteProduct } = useDataContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<ProductFormState | null>(null);

    const openModal = (product: Partial<Product> | null = null) => {
        setCurrentProduct(product || { name: '', categoryId: '', price: 0, imageUrl: '', sizes: [], isAvailable: true });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentProduct(null);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!currentProduct) return;
        
        const productData = {
            ...currentProduct,
            price: Number(currentProduct.price) || 0,
            sizes: Array.isArray(currentProduct.sizes) 
                ? currentProduct.sizes 
                : (typeof currentProduct.sizes === 'string' ? currentProduct.sizes.split(',').map(s => s.trim()) : []),
        };

        if (currentProduct.id) {
            updateProduct(productData as Product);
        } else {
            addProduct(productData as Omit<Product, 'id'>);
        }
        closeModal();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        // Fix for line 46: Check target type directly to allow TypeScript to narrow it correctly.
        const { name, value } = e.target;
        
        if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
            setCurrentProduct(prev => ({ ...prev, [name]: e.target.checked }));
        } else {
            setCurrentProduct(prev => ({ ...prev, [name]: value }));
        }
    };

    const ProductModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">{currentProduct?.id ? 'Редагувати товар' : 'Додати новий товар'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Назва товару</label>
                        <input type="text" name="name" value={currentProduct?.name || ''} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Категорія</label>
                        <select name="categoryId" value={currentProduct?.categoryId || ''} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" required>
                            <option value="">Оберіть категорію</option>
                            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium">Ціна (грн)</label>
                        <input type="number" name="price" value={currentProduct?.price || ''} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">URL зображення</label>
                        <input type="text" name="imageUrl" value={currentProduct?.imageUrl || ''} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Розміри (через кому)</label>
                        <input type="text" name="sizes" value={Array.isArray(currentProduct?.sizes) ? currentProduct?.sizes.join(', ') : currentProduct?.sizes || ''} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" required />
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" id="isAvailable" name="isAvailable" checked={currentProduct?.isAvailable || false} onChange={handleInputChange} className="h-4 w-4 text-madagaskar-blue border-gray-300 rounded" />
                        <label htmlFor="isAvailable" className="ml-2 block text-sm">В наявності</label>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Скасувати</button>
                        <button type="submit" className="px-4 py-2 bg-madagaskar-blue text-white rounded-md hover:bg-madagaskar-blue-dark">Зберегти</button>
                    </div>
                </form>
            </div>
        </div>
    );
    
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Товари</h1>
                <button onClick={() => openModal()} className="flex items-center gap-2 bg-madagaskar-green hover:bg-madagaskar-green-dark text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                    <Plus size={20} /> Додати товар
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Зображення</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Назва</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ціна</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Наявність</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Дії</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td className="px-6 py-4"><img src={product.imageUrl} alt={product.name} className="h-12 w-12 rounded-md object-cover"/></td>
                                    <td className="px-6 py-4 font-medium">{product.name}</td>
                                    <td className="px-6 py-4">{product.price} грн</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${product.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {product.isAvailable ? 'В наявності' : 'Немає'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button onClick={() => openModal(product)} className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-full"><Edit size={18}/></button>
                                        <button onClick={() => deleteProduct(product.id)} className="p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-full"><Trash2 size={18}/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && <ProductModal />}
        </div>
    );
};

export default AdminProducts;