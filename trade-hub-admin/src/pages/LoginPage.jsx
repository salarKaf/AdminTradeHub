import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../API/auth.jsx";
import { Loader2 } from 'lucide-react'; // آیکون لودر

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');

    const [loading, setLoading] = useState(false); // اضافه کن بالا

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(''); // پاک کردن پیام قبلی
        try {
            const data = await loginAdmin(email, password);
            localStorage.setItem("admin", data.access_token);
            navigate('/dashboard');
        } catch (error) {
            const message = error.response?.data?.detail || "مشکلی در ورود پیش آمد.";
            setErrorMessage(message);
            console.error("Login failed:", message);
        } finally {
            setLoading(false);
        }
    };






    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/public/Images/why-do-mountains-look-so-small-in-photos-v0-oc095cqy2fnd1 1.png" // مسیر تصویر پس‌زمینه شما
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/90 z-10"></div>
            </div>

            {/* Glass Morphism Form Container */}
            <div className="relative z-40 w-full max-w-lg p-8">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-2xl overflow-hidden">
                    {/* Wave Pattern Inside Form (Top) */}
                    <div className="absolute top-0 left-0 right-0 h-20 opacity-30">
                        <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 1440 120"
                            preserveAspectRatio="none"
                            className="w-full h-full"
                        >
                            <path
                                d="M0,0 L1440,0 L1440,60 C1200,120 960,0 720,60 C480,120 240,0 0,60 Z"
                                fill="url(#waveGradient)"
                            />
                        </svg>
                    </div>

                    {/* Form Content */}
                    <div className="relative z-50  mb-[140px]">
                        {/* Logo and Title */}
                        <div className="text-center mb-16 mt-10">
                            <h1 className="text-3xl font-bold text-white mb-5">Trade Hub</h1>
                            <p className="text-gray-300 text-sm">
                                لطفاً برای دسترسی به بخش مدیریت، اطلاعات ورود خود را وارد کنید.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 text-center">
                            {/* Email Field */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-300" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="admin@gmail.com"
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-300" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="••••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-300 hover:text-white transition-colors duration-200"
                                >
                                    {showPassword ? (
                                        <Eye className="h-5 w-5" />
                                    ) : (
                                        <EyeOff className="h-5 w-5" />
                                    )}

                                </button>
                            </div>
                            {errorMessage && (
                                <div className="text-red-400 bg-red-500/10 border border-red-400 rounded-md p-3 text-sm text-center">
                                    {errorMessage}
                                </div>
                            )}

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-6/12 mx-auto flex justify-center items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold py-3 px-4 rounded-3xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl ${loading ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin h-5 w-5" />
                                        در حال ورود...
                                    </>
                                ) : (
                                    "ورود"
                                )}
                            </button>

                        </form>


                    </div>
                    {/* Wave Pattern Below Form (Your Custom Image) */}
                    <div className="absolute bottom-0 left-0 right-0   z-10  ">
                        <img
                            src="/public/Images/layered-waves-haikei 1.png"
                            alt="Wave Pattern"
                            className="w-full opacity-70 object-cover"
                            style={{ height: "100px" }} // اینو خودت می‌تونی تغییر بدی
                        />
                    </div>


                </div>


            </div>

        </div>
    );
};

export default LoginPage;