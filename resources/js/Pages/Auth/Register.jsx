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
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
                
                {/* Animated Orbs */}
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-screen filter blur-xl opacity-30 animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-screen filter blur-xl opacity-30 animate-float" style={{ animationDelay: '-2s' }}></div>
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:32px_32px]"></div>
            </div>

            <div className="register-content relative z-10 min-h-screen flex flex-col items-center justify-center">
                <div className="w-full sm:max-w-md px-6">
                    <form onSubmit={submit} className="bg-gray-900/80 backdrop-blur-md rounded-lg p-6 shadow-2xl border border-gray-800">
                        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-purple-300 text-transparent bg-clip-text text-center">Create Account</h2>

                        <div className="form-field">
                            <InputLabel className="text-gray-300" htmlFor="name" value="Name" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full bg-gray-800/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500 text-gray-200"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="form-field mt-4">
                            <InputLabel className="text-gray-300" htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full bg-gray-800/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500 text-gray-200"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="form-field mt-4">
                            <InputLabel className="text-gray-300" htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full bg-gray-800/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500 text-gray-200"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="form-field mt-4">
                            <InputLabel className="text-gray-300" htmlFor="password_confirmation" value="Confirm Password" />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full bg-gray-800/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500 text-gray-200"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="form-field mt-6 flex items-center justify-between">
                            <Link
                                href={route('login')}
                                className="text-sm text-purple-300 hover:text-purple-400 transition-colors"
                            >
                                Already registered?
                            </Link>

                            <PrimaryButton
                                className="ms-4 bg-gradient-to-r from-gray-800 to-gray-900 text-purple-300 hover:from-gray-900 hover:to-black border border-gray-700"
                                disabled={processing}
                            >
                                Register
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
