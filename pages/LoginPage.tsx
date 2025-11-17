
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Lock } from 'lucide-react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');
        if (login(username, password)) {
            navigate('/admin/dashboard');
        } else {
            setError('Неправильний логін або пароль');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-madagaskar-sand-light">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl">
                <div className="text-center">
                    <div className="inline-block p-4 bg-madagaskar-green rounded-full">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="mt-4 text-3xl font-extrabold text-madagaskar-green-dark">
                        Вхід в панель адміністратора
                    </h1>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Логін</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-madagaskar-blue focus:border-madagaskar-blue focus:z-10 sm:text-sm"
                                placeholder="Логін"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Пароль</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-madagaskar-blue focus:border-madagaskar-blue focus:z-10 sm:text-sm"
                                placeholder="Пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 text-center">{error}</p>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-madagaskar-green hover:bg-madagaskar-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-madagaskar-green-dark transition-colors duration-300"
                        >
                            Увійти
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
