
import React from 'react';
import { useDataContext } from '../../hooks/useDataContext';
import { Package, Tag, ShoppingCart } from 'lucide-react';

const StatCard = ({ title, value, icon, colorClass }: { title: string, value: number, icon: React.ReactNode, colorClass: string }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4">
        <div className={`p-4 rounded-full ${colorClass}`}>
            {icon}
        </div>
        <div>
            <p className="text-gray-500 text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);


const AdminDashboard = () => {
    const { products, categories, orders } = useDataContext();
    const totalRevenue = orders.reduce((sum, order) => 
        sum + order.items.reduce((orderSum, item) => orderSum + item.product.price * item.quantity, 0), 0);

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Панель управління</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Всього товарів" 
                    value={products.length} 
                    icon={<Package size={28} className="text-white"/>}
                    colorClass="bg-madagaskar-blue"
                />
                <StatCard 
                    title="Категорій" 
                    value={categories.length} 
                    icon={<Tag size={28} className="text-white"/>}
                    colorClass="bg-madagaskar-green"
                />
                <StatCard 
                    title="Замовлень" 
                    value={orders.length} 
                    icon={<ShoppingCart size={28} className="text-white"/>}
                    colorClass="bg-madagaskar-sand-dark"
                />
                <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4">
                    <div className="p-4 rounded-full bg-red-400">
                         <span className="text-white font-bold text-2xl">₴</span>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Загальний дохід</p>
                        <p className="text-3xl font-bold text-gray-800">{totalRevenue.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <div className="mt-10 bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Останні замовлення</h2>
                {orders.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Номер замовлення</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">К-ть позицій</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Сума</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {orders.slice(0, 5).map(order => {
                                    const orderTotal = order.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
                                    return (
                                        <tr key={order.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.timestamp).toLocaleString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items.length}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{orderTotal.toFixed(2)} грн</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">Поки що немає замовлень.</p>
                )}
            </div>

        </div>
    );
};

export default AdminDashboard;
