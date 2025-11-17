
import React, { useState, FormEvent } from 'react';
import { useDataContext } from '../../hooks/useDataContext';
import { Plus, Trash2 } from 'lucide-react';

const AdminCategories = () => {
    const { categories, addCategory, deleteCategory } = useDataContext();
    const [newCategoryName, setNewCategoryName] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (newCategoryName.trim()) {
            addCategory({ name: newCategoryName.trim() });
            setNewCategoryName('');
        }
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Категорії</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Додати нову категорію</h2>
                    <form onSubmit={handleSubmit} className="flex gap-4">
                        <input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="Назва категорії"
                            className="flex-grow p-2 border rounded-md"
                            required
                        />
                        <button type="submit" className="flex items-center gap-2 bg-madagaskar-green hover:bg-madagaskar-green-dark text-white font-bold py-2 px-4 rounded-lg">
                           <Plus size={20} /> Додати
                        </button>
                    </form>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Існуючі категорії</h2>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {categories.map(category => (
                            <div key={category.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="font-medium text-gray-700">{category.name}</span>
                                <button onClick={() => deleteCategory(category.id)} className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCategories;
