
import React from 'react';
import { useDataContext } from '../hooks/useDataContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartPage = () => {
    const { cart, getProductById, updateCartQuantity, removeFromCart, placeOrder } = useDataContext();
    const navigate = useNavigate();

    const cartDetails = cart.map(item => ({
        ...item,
        product: getProductById(item.productId)
    })).filter(item => item.product);

    const totalPrice = cartDetails.reduce((total, item) => {
        return total + (item.product!.price * item.quantity);
    }, 0);

    const handlePlaceOrder = () => {
        const newOrder = placeOrder();
        if (newOrder) {
            navigate(`/order-confirmation/${newOrder.id}`);
        } else {
            alert("Ваш кошик порожній!");
        }
    };

    if (cart.length === 0) {
        return (
            <div className="text-center p-10 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-madagaskar-green-dark mb-4">Ваш кошик порожній</h1>
                <p className="text-gray-600 mb-6">Схоже, ви ще нічого не додали. Час для покупок!</p>
                <Link to="/" className="bg-madagaskar-blue hover:bg-madagaskar-blue-dark text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                    Повернутись до магазину
                </Link>
            </div>
        );
    }
    
    return (
        <div className="bg-white p-4 sm:p-8 rounded-lg shadow-xl max-w-4xl mx-auto">
            <h1 className="text-3xl font-extrabold text-madagaskar-green-dark mb-8 border-b-2 border-madagaskar-sand-dark pb-4">Ваш кошик</h1>
            
            <div className="space-y-6">
                {cartDetails.map(({ product, size, quantity }) => product && (
                    <div key={`${product.id}-${size}`} className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center mb-4 sm:mb-0">
                            <img src={product.imageUrl} alt={product.name} className="w-24 h-24 rounded-md object-cover mr-4"/>
                            <div>
                                <h2 className="font-bold text-lg">{product.name}</h2>
                                <p className="text-gray-500">Розмір: {size}</p>
                                <p className="text-madagaskar-green-dark font-semibold">{product.price} грн</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center border rounded-md">
                                <button onClick={() => updateCartQuantity(product.id, size, quantity - 1)} className="p-2 hover:bg-gray-100 rounded-l-md"><Minus size={16}/></button>
                                <span className="px-4 py-1 font-semibold">{quantity}</span>
                                <button onClick={() => updateCartQuantity(product.id, size, quantity + 1)} className="p-2 hover:bg-gray-100 rounded-r-md"><Plus size={16}/></button>
                            </div>
                            <button onClick={() => removeFromCart(product.id, size)} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={20}/></button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t-2 border-madagaskar-sand-dark text-right">
                <h2 className="text-2xl font-bold">
                    Всього: <span className="text-madagaskar-green-dark">{totalPrice} грн</span>
                </h2>
                <button 
                    onClick={handlePlaceOrder} 
                    className="mt-6 w-full sm:w-auto bg-madagaskar-green hover:bg-madagaskar-green-dark text-white font-extrabold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                    Оформити замовлення
                </button>
            </div>
        </div>
    );
};

export default CartPage;
