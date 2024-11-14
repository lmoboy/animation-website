import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import anime from 'animejs';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        anime({
            targets: '.register-content',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '.form-field',
            opacity: [0, 1],
            translateX: [-20, 0],
            delay: anime.stagger(100, { start: 300 }),
            duration: 800,
            easing: 'easeOutExpo'
        });
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register">
                <style>{`
                    @keyframes float {
                        0%, 100% { transform: translateY(0) rotate(0deg); }
                        50% { transform: translateY(-20px) rotate(5deg); }
                    }
                    .animate-float { animation: float 6s ease-in-out infinite; }
                `}</style>
            </Head>

            <div className="fixed inset-0 z-0">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-pink-900"></div>
                
                {/* Animated Orbs */}
                <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-float"></div>
                <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-pink-500 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-float" style={{ animationDelay: '-3s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-fuchsia-500 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-float" style={{ animationDelay: '-1.5s' }}></div>
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:32px_32px]"></div>
            </div>

            <div className="register-content relative z-10 min-h-screen flex flex-col items-center justify-center">
                <div className="w-full sm:max-w-md px-6">
                    <form onSubmit={submit} className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-2xl border border-white/20">
                        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text text-center">Create Account</h2>

                        <div className="form-field">
                            <InputLabel className="text-white" htmlFor="name" value="Name" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full bg-white/10 border-white/20 focus:border-purple-500 focus:ring-purple-500 text-white"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="form-field mt-4">
                            <InputLabel className="text-white" htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full bg-white/10 border-white/20 focus:border-purple-500 focus:ring-purple-500 text-white"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="form-field mt-4">
                            <InputLabel className="text-white" htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full bg-white/10 border-white/20 focus:border-purple-500 focus:ring-purple-500 text-white"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="form-field mt-4">
                            <InputLabel className="text-white" htmlFor="password_confirmation" value="Confirm Password" />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full bg-white/10 border-white/20 focus:border-purple-500 focus:ring-purple-500 text-white"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="form-field flex items-center justify-between mt-6">
                            <Link
                                href={route('login')}
                                className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                            >
                                Already registered?
                            </Link>

                            <button
                                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-md hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200 disabled:opacity-50"
                                disabled={processing}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
