
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { ShoppingCart, UserCog } from 'lucide-react';
import { useDataContext } from '../hooks/useDataContext';

const SiteLayout = () => {
    const { cart, contactInfo } = useDataContext();
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="min-h-screen bg-madagaskar-sand-light font-sans text-gray-800">
            <header className="bg-white shadow-md sticky top-0 z-20">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <NavLink to="/" className="flex items-center space-x-3">
                             <img src="https://picsum.photos/seed/logo/60/60" alt="Madagaskar Logo" className="h-12 w-12 rounded-full object-cover"/>
                            <span className="text-2xl md:text-3xl font-bold text-madagaskar-green-dark tracking-wider">Madagaskar</span>
                        </NavLink>
                        <div className="flex items-center space-x-4">
                            <NavLink to="/cart" className="relative text-madagaskar-green-dark hover:text-madagaskar-blue-dark transition-colors duration-300">
                                <ShoppingCart size={28} />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-madagaskar-sand-dark text-madagaskar-green-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartItemCount}
                                    </span>
                                )}
                            </NavLink>
                             <NavLink to="/admin" className="text-gray-500 hover:text-madagaskar-green-dark transition-colors duration-300">
                                <UserCog size={28} />
                            </NavLink>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>

            <footer className="bg-madagaskar-green text-white mt-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                    <p className="font-bold text-lg">Madagaskar - Дитячий одяг</p>
                    <div className="mt-4 space-y-2">
                        <p>Телефон: {contactInfo.phone}</p>
                        <p>Viber: {contactInfo.viber}</p>
                        <p>Адреса: {contactInfo.address}</p>
                    </div>
                    <p className="mt-6 text-sm text-madagaskar-green-light">&copy; {new Date().getFullYear()} Madagaskar. Всі права захищено.</p>
                </div>
            </footer>
        </div>
    );
};

export default SiteLayout;
