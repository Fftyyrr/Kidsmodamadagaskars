
import React, { useState } from 'react';
import { useDataContext } from '../../hooks/useDataContext';
import { Order } from '../../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

const OrderItemRow: React.FC<{ order: Order }> = ({ order }) => {
    const [isOpen, setIsOpen] = useState(false);
    const orderTotal = order.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <>
            <tr className="cursor-pointer hover:bg-gray-50" onClick={() => setIsOpen(!isOpen)}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.timestamp).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items.length}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">{orderTotal.toFixed(2)} грн</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                   {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </td>
            </tr>
            {isOpen && (
                <tr>
                    <td colSpan={5} className="p-0">
                        <div className="p-6 bg-madagaskar-sand-light">
                            <h4 className="font-bold mb-4">Деталі замовлення:</h4>
                            <div className="space-y-4">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4 p-2 bg-white rounded-md">
                                        <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded"/>
                                        <div className="flex-grow">
                                            <p className="font-semibold">{item.product.name}</p>
                                            <p className="text-sm text-gray-600">Розмір: {item.size}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm">{item.quantity} x {item.product.price.toFixed(2)} грн</p>
                                            <p className="font-bold">{(item.quantity * item.product.price).toFixed(2)} грн</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};


const AdminOrders = () => {
    const { orders } = useDataContext();

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Замовлення</h1>

            <div className="bg-white p-6 rounded-xl shadow-lg">
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Номер замовлення</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Дата</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">К-ть позицій</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Сума</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Деталі</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map(order => <OrderItemRow key={order.id} order={order} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
