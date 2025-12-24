"use client"

import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle sign in logic here
        console.log('Sign in:', { email, password });
    };

    return (
        <div className="min-h-screen bg-black flex">
            {/* Left Side - Sign In Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Logo & Brand */}
                    <div className="flex flex-col items-center mb-10">
                        <Link href="/" className="flex items-center">
                            <Image src="/last-legends-logo.png" alt="LastLegends" width={500} height={500} className="h-20 w-auto mb-2" />
                        </Link>
                        <div className="w-16 h-1 bg-red-600" />
                    </div>

                    {/* Welcome Text */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl text-white uppercase tracking-wider mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-gray-400 tracking-wide">
                            Sign in to access exclusive merch and events
                        </p>
                    </div>

                    {/* Sign In Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label className="block text-gray-400 uppercase tracking-wider text-sm mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="YOUR EMAIL"
                                    className="w-full bg-zinc-900 border border-zinc-700 pl-12 pr-4 py-3 text-gray-300 placeholder-gray-600 uppercase tracking-wide focus:outline-none focus:border-red-600 transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-gray-400 uppercase tracking-wider text-sm mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="YOUR PASSWORD"
                                    className="w-full bg-zinc-900 border border-zinc-700 pl-12 pr-12 py-3 text-gray-300 placeholder-gray-600 tracking-wide focus:outline-none focus:border-red-600 transition-colors"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 bg-zinc-900 border border-zinc-700 rounded-sm checked:bg-red-600 checked:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black"
                                />
                                <span className="text-gray-400 text-sm uppercase tracking-wide">
                                    Remember Me
                                </span>
                            </label>
                            <a href="#" className="text-red-600 hover:text-red-500 text-sm uppercase tracking-wide transition-colors">
                                Forgot Password?
                            </a>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white py-4 uppercase tracking-widest hover:bg-red-700 transition-colors"
                        >
                            Sign In
                        </button>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-zinc-800" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-black text-gray-500 uppercase tracking-wider">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        {/* Social Sign In */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                className="bg-zinc-900 border border-zinc-700 text-gray-300 py-3 uppercase tracking-wide hover:border-red-600 hover:text-white transition-all duration-300"
                            >
                                Google
                            </button>
                            <button
                                type="button"
                                className="bg-zinc-900 border border-zinc-700 text-gray-300 py-3 uppercase tracking-wide hover:border-red-600 hover:text-white transition-all duration-300"
                            >
                                Facebook
                            </button>
                        </div>

                        {/* Sign Up Link */}
                        <div className="text-center pt-6 border-t border-zinc-800">
                            <p className="text-gray-400 mb-2">
                                Don&apos;t have an account?
                            </p>
                            <a href="#" className="text-red-600 hover:text-red-500 uppercase tracking-wider transition-colors">
                                Create Account
                            </a>
                        </div>
                    </form>

                    {/* Footer Note */}
                    <div className="mt-8 p-4 bg-zinc-900 border-l-2 border-red-600">
                        <p className="text-gray-500 text-sm text-center">
                            By signing in, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Image & Branding */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <Image
                    src="/signin-background.png"
                    alt="Rock Stage"
                    className="w-full h-full object-cover"
                    fill
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />

                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-center px-16">
                    <h2 className="text-5xl text-white uppercase tracking-wider mb-6">
                        Join The Legend
                    </h2>
                    <div className="w-20 h-1 bg-red-600 mb-6" />
                    <p className="text-gray-300 text-lg leading-relaxed max-w-md mb-8">
                        Access exclusive 90&apos;s band merchandise, early ticket sales, and special events reserved for members only.
                    </p>

                    {/* Features */}
                    <div className="space-y-4 max-w-md">
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-red-600 mt-2" />
                            <div>
                                <h4 className="text-white uppercase tracking-wider mb-1">Exclusive Merch</h4>
                                <p className="text-gray-400 text-sm">Limited edition tees and early access to new drops</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-red-600 mt-2" />
                            <div>
                                <h4 className="text-white uppercase tracking-wider mb-1">Event Priority</h4>
                                <p className="text-gray-400 text-sm">First access to concert tickets and VIP passes</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-red-600 mt-2" />
                            <div>
                                <h4 className="text-white uppercase tracking-wider mb-1">Member Discounts</h4>
                                <p className="text-gray-400 text-sm">Special pricing on all merchandise and events</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
