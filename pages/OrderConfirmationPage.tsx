
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useDataContext } from '../hooks/useDataContext';

const OrderConfirmationPage = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const { contactInfo } = useDataContext();

    return (
        <div className="max-w-2xl mx-auto text-center p-8 sm:p-12 bg-white rounded-2xl shadow-2xl">
            <CheckCircle className="mx-auto h-20 w-20 text-madagaskar-green" />
            <h1 className="mt-6 text-3xl font-extrabold text-madagaskar-green-dark">Дякуємо за ваше замовлення!</h1>
            <p className="mt-4 text-lg text-gray-600">Ваше замовлення було успішно прийнято.</p>
            
            <div className="mt-8 bg-madagaskar-sand-light p-6 rounded-lg border-2 border-dashed border-madagaskar-sand-dark">
                <p className="text-md text-gray-800">Ваш номер замовлення:</p>
                <p className="text-4xl font-mono font-bold text-madagaskar-green-dark tracking-widest my-2">{orderId}</p>
            </div>

            <div className="mt-8 text-left bg-madagaskar-blue-light p-6 rounded-lg">
                <h2 className="font-bold text-lg text-madagaskar-blue-dark">Наступні кроки:</h2>
                <p className="mt-2 text-gray-700">
                    Для подальшого оформлення замовлення, будь ласка, напишіть номер вашого замовлення нашому менеджеру у <strong className="text-madagaskar-blue-dark">Viber</strong> на номер:
                </p>
                <p className="text-2xl font-bold text-center text-madagaskar-blue-dark mt-4">{contactInfo.viber}</p>
            </div>
            
            <Link to="/" className="mt-10 inline-block bg-madagaskar-green hover:bg-madagaskar-green-dark text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300">
                Продовжити покупки
            </Link>
        </div>
    );
};

export default OrderConfirmationPage;
