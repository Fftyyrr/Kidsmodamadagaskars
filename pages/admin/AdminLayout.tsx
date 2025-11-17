
import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Tag, ShoppingCart, MessageSquare, Home, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const AdminLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
            isActive ? 'bg-madagaskar-green text-white shadow-md' : 'text-gray-600 hover:bg-madagaskar-green-light hover:text-madagaskar-green-dark'
        }`;

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            <aside className="w-64 bg-white shadow-lg p-4 flex flex-col">
                <div className="flex items-center space-x-3 p-4 border-b">
                     <img src="https://picsum.photos/seed/logo/40/40" alt="Madagaskar Logo" className="h-10 w-10 rounded-full object-cover"/>
                    <span className="text-xl font-bold text-madagaskar-green-dark">Admin Panel</span>
                </div>
                <nav className="flex-grow mt-6 space-y-2">
                    <NavLink to="/admin/dashboard" className={navLinkClasses}>
                        <LayoutDashboard className="mr-3" size={20} /> Панель
                    </NavLink>
                    <NavLink to="/admin/products" className={navLinkClasses}>
                        <Package className="mr-3" size={20} /> Товари
                    </NavLink>
                    <NavLink to="/admin/categories" className={navLinkClasses}>
                        <Tag className="mr-3" size={20} /> Категорії
                    </NavLink>
                    <NavLink to="/admin/orders" className={navLinkClasses}>
                        <ShoppingCart className="mr-3" size={20} /> Замовлення
                    </NavLink>
                    <NavLink to="/admin/contacts" className={navLinkClasses}>
                        <MessageSquare className="mr-3" size={20} /> Контакти
                    </NavLink>
                </nav>
                <div className="mt-auto border-t pt-4 space-y-2">
                     <NavLink to="/" className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-madagaskar-blue-light hover:text-madagaskar-blue-dark">
                        <Home className="mr-3" size={20} /> Повернутись на сайт
                    </NavLink>
                    <button onClick={handleLogout} className="w-full flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-red-100 hover:text-red-700 transition-colors duration-200">
                        <LogOut className="mr-3" size={20} /> Вийти
                    </button>
                </div>
            </aside>
            <main className="flex-1 p-6 lg:p-10 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
