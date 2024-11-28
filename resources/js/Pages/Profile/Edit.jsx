import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', name: 'Profile Information', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        )},
        { id: 'password', name: 'Update Password', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
        )},
        { id: 'danger', name: 'Danger Zone', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        )}
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-2xl text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">
                    Profile Settings
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden">
                        <div className="flex">
                            {/* Sidebar */}
                            <div className="w-64 bg-white/5 border-r border-white/10">
                                <nav className="flex flex-col py-4">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                                                activeTab === tab.id
                                                    ? 'text-purple-400 bg-white/10'
                                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                                            }`}
                                        >
                                            {tab.icon}
                                            <span className="ml-3">{tab.name}</span>
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            {/* Main Content */}
                            <div className="flex-1 p-8">
                                <div className={activeTab === 'profile' ? 'block' : 'hidden'}>
                                    <UpdateProfileInformationForm
                                        mustVerifyEmail={mustVerifyEmail}
                                        status={status}
                                        className="max-w-xl"
                                    />
                                </div>

                                <div className={activeTab === 'password' ? 'block' : 'hidden'}>
                                    <UpdatePasswordForm className="max-w-xl" />
                                </div>

                                <div className={activeTab === 'danger' ? 'block' : 'hidden'}>
                                    <DeleteUserForm className="max-w-xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
