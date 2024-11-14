import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import CardContainer from "@/Components/Custom/CardContainer";

export default function Create({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    Create Animation
                </h2>
            }
        >
            <Head title="Create Animation" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Animation Editor Panel */}
                        <CardContainer className="lg:col-span-2 bg-white/10 border border-white/20 p-6">
                            {/* Canvas Area */}
                            <div className="aspect-video bg-black/30 rounded-lg mb-6 flex items-center justify-center">
                                <p className="text-gray-400">Animation Canvas</p>
                            </div>

                            {/* Timeline */}
                            <div className="h-32 bg-black/30 rounded-lg p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex space-x-2">
                                        <button className="p-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors">
                                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>
                                        <button className="p-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors">
                                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <span className="text-white">00:00:00</span>
                                </div>
                                <div className="h-8 bg-black/20 rounded-md"></div>
                            </div>
                        </CardContainer>

                        {/* Controls Panel */}
                        <CardContainer className="bg-white/10 border border-white/20 p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Animation Settings</h3>
                            
                            {/* Project Settings */}
                            <div className="space-y-4 mb-6">
                                <div>
                                    <InputLabel htmlFor="title" value="Title" className="text-white" />
                                    <TextInput
                                        id="title"
                                        className="mt-1 block w-full bg-white/10 border-white/20 focus:border-purple-500 focus:ring-purple-500 text-white"
                                        placeholder="My Animation"
                                    />
                                </div>
                                <div>
                                    <InputLabel htmlFor="description" value="Description" className="text-white" />
                                    <textarea
                                        id="description"
                                        className="mt-1 block w-full bg-white/10 border-white/20 focus:border-purple-500 focus:ring-purple-500 text-white rounded-md"
                                        rows="3"
                                        placeholder="Describe your animation..."
                                    ></textarea>
                                </div>
                            </div>

                            {/* Animation Properties */}
                            <div className="space-y-4 mb-6">
                                <h4 className="text-sm font-semibold text-gray-300">Properties</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel htmlFor="width" value="Width" className="text-white" />
                                        <TextInput
                                            id="width"
                                            type="number"
                                            className="mt-1 block w-full bg-white/10 border-white/20 focus:border-purple-500 focus:ring-purple-500 text-white"
                                            placeholder="1920"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="height" value="Height" className="text-white" />
                                        <TextInput
                                            id="height"
                                            type="number"
                                            className="mt-1 block w-full bg-white/10 border-white/20 focus:border-purple-500 focus:ring-purple-500 text-white"
                                            placeholder="1080"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3">
                                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-md hover:from-purple-700 hover:to-pink-600 transition-all duration-200">
                                    Save
                                </button>
                                <button className="flex-1 px-4 py-2 bg-white/10 text-white rounded-md hover:bg-white/20 transition-all duration-200">
                                    Preview
                                </button>
                            </div>
                        </CardContainer>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
