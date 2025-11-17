
import React, { useState, FormEvent, useEffect } from 'react';
import { useDataContext } from '../../hooks/useDataContext';
import { ContactInfo } from '../../types';

const AdminContacts = () => {
    const { contactInfo, updateContactInfo } = useDataContext();
    const [formData, setFormData] = useState<ContactInfo>(contactInfo);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setFormData(contactInfo);
    }, [contactInfo]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        updateContactInfo(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Контактна інформація</h1>

            <div className="max-w-2xl bg-white p-8 rounded-xl shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Телефон</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-madagaskar-blue focus:border-madagaskar-blue"
                        />
                    </div>
                    <div>
                        <label htmlFor="viber" className="block text-sm font-medium text-gray-700">Viber</label>
                        <input
                            type="text"
                            id="viber"
                            name="viber"
                            value={formData.viber}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-madagaskar-blue focus:border-madagaskar-blue"
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Адреса</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-madagaskar-blue focus:border-madagaskar-blue"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            className="bg-madagaskar-blue hover:bg-madagaskar-blue-dark text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors duration-300"
                        >
                            Зберегти зміни
                        </button>
                        {isSaved && <span className="text-green-600 font-medium">Збережено!</span>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminContacts;
