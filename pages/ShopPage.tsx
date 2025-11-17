
import React, { useState, useMemo } from 'react';
import { useDataContext } from '../hooks/useDataContext';
import { Product } from '../types';
import { Category } from '../types';

// Define ProductCard component here to avoid re-rendering issues
interface ProductCardProps {
    product: Product;
    onAddToCart: (productId: string, size: string) => void;
    categoryName: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, categoryName }) => {
    const [selectedSize, setSelectedSize] = useState<string | null>(product.sizes[0] || null);

    const handleAddToCart = () => {
        if (selectedSize) {
            onAddToCart(product.id, selectedSize);
        } else {
            alert('Будь ласка, оберіть розмір');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="relative">
                <img className="h-64 w-full object-cover" src={product.imageUrl} alt={product.name} />
                {!product.isAvailable && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white text-lg font-bold">Немає в наявності</span>
                    </div>
                )}
            </div>
            <div className="p-4 flex-grow flex flex-col">
                <p className="text-sm text-gray-500">{categoryName}</p>
                <h3 className="text-lg font-bold text-gray-800 flex-grow">{product.name}</h3>
                <div className="mt-2">
                    <span className="text-xl font-black text-madagaskar-green-dark">{product.price} грн</span>
                </div>
                <div className="mt-4">
                    <label className="text-sm font-medium text-gray-700">Розмір:</label>
                    <select
                        value={selectedSize || ''}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-madagaskar-blue focus:border-madagaskar-blue sm:text-sm rounded-md"
                        disabled={!product.isAvailable}
                    >
                        {product.sizes.map(size => <option key={size} value={size}>{size}</option>)}
                    </select>
                </div>
            </div>
            <div className="p-4 bg-gray-50">
                <button
                    onClick={handleAddToCart}
                    disabled={!product.isAvailable}
                    className="w-full bg-madagaskar-blue-dark text-white font-bold py-2 px-4 rounded-lg hover:bg-madagaskar-blue-darker transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    Додати в кошик
                </button>
            </div>
        </div>
    );
};

// Define FilterSidebar component here
interface FilterSidebarProps {
    categories: Category[];
    allSizes: string[];
    onFilterChange: (filters: { category: string; size: string; }) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ categories, allSizes, onFilterChange }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSize, setSelectedSize] = useState('');

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = e.target.value;
        setSelectedCategory(newCategory);
        onFilterChange({ category: newCategory, size: selectedSize });
    };

    const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = e.target.value;
        setSelectedSize(newSize);
        onFilterChange({ category: selectedCategory, size: newSize });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-madagaskar-green-dark">Фільтри</h3>
            <div className="space-y-6">
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Категорія</label>
                    <select id="category" value={selectedCategory} onChange={handleCategoryChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-madagaskar-blue focus:border-madagaskar-blue sm:text-sm rounded-md">
                        <option value="">Всі категорії</option>
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="size" className="block text-sm font-medium text-gray-700">Розмір</label>
                    <select id="size" value={selectedSize} onChange={handleSizeChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-madagaskar-blue focus:border-madagaskar-blue sm:text-sm rounded-md">
                        <option value="">Всі розміри</option>
                        {allSizes.map(size => <option key={size} value={size}>{size}</option>)}
                    </select>
                </div>
            </div>
        </div>
    );
};

// Main ShopPage component
const ShopPage = () => {
    const { products, categories, addToCart, getCategoryById } = useDataContext();
    const [filters, setFilters] = useState({ category: '', size: '' });

    const allSizes = useMemo(() => {
        const sizes = new Set<string>();
        products.forEach(p => p.sizes.forEach(s => sizes.add(s)));
        return Array.from(sizes).sort((a,b) => parseInt(a) - parseInt(b));
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const categoryMatch = filters.category ? product.categoryId === filters.category : true;
            const sizeMatch = filters.size ? product.sizes.includes(filters.size) : true;
            return categoryMatch && sizeMatch;
        });
    }, [products, filters]);

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-1/4">
                <FilterSidebar categories={categories} allSizes={allSizes} onFilterChange={setFilters} />
            </aside>
            <div className="lg:w-3/4">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map(product => {
                        const category = getCategoryById(product.categoryId);
                        return (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                onAddToCart={addToCart} 
                                categoryName={category?.name || 'Без категорії'}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
