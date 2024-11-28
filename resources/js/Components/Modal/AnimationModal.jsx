import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function AnimationModal({ isOpen, onClose, animation }) {
    if (!animation) return null;

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-white/10 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                                {/* Glow Effects */}
                                <div className="absolute inset-0 bg-linear-to-br from-purple-500/20 via-fuchsia-500/20 to-pink-500/20 opacity-50"></div>
                                
                                <div className="relative">
                                    {/* Close Button */}
                                    <div className="absolute right-0 top-0 pr-4 pt-4 z-10">
                                        <button
                                            type="button"
                                            className="rounded-lg bg-gray-900/50 backdrop-blur-sm text-gray-400 hover:text-gray-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500/50 p-2 transition-colors duration-200"
                                            onClick={onClose}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    <div className="px-6 pb-6 pt-5">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                                <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400">
                                                    {animation.name}
                                                </Dialog.Title>
                                                
                                                {/* Animation Preview */}
                                                <div className="mt-6 bg-black/50 rounded-xl p-4 aspect-video relative overflow-hidden border border-white/10">
                                                    <div ref={animation.previewRef} className="absolute left-1/2 top-1/2 w-12 h-12 bg-purple-500" />
                                                </div>

                                                {/* Animation Details */}
                                                <div className="mt-6 grid grid-cols-2 gap-6">
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-400">Creator</h4>
                                                        <p className="mt-1 text-sm text-white">{animation.user?.name}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-400">Price</h4>
                                                        <div className="mt-1">
                                                            {animation.price === 0 ? (
                                                                <span className="inline-flex items-center rounded-md bg-emerald-500/10 backdrop-blur-sm px-2 py-1 text-xs font-medium text-emerald-300 ring-1 ring-inset ring-emerald-500/30">
                                                                    Free
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center rounded-md bg-purple-500/10 backdrop-blur-sm px-2 py-1 text-xs font-medium text-purple-300 ring-1 ring-inset ring-purple-500/30">
                                                                    ${animation.price}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-400">Views</h4>
                                                        <p className="mt-1 text-sm text-white">{animation.views}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-400">Created</h4>
                                                        <p className="mt-1 text-sm text-white">{new Date(animation.created_at).toLocaleDateString()}</p>
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <div className="mt-6">
                                                    <h4 className="text-sm font-medium text-gray-400">Description</h4>
                                                    <p className="mt-1 text-sm text-white">{animation.description}</p>
                                                </div>

                                                {/* Timeline */}
                                                <div className="mt-6">
                                                    <h4 className="text-sm font-medium text-gray-400">Animation Timeline</h4>
                                                    <pre className="mt-1 text-sm text-white bg-black/50 p-4 rounded-xl overflow-auto border border-white/10">
                                                        {JSON.stringify(animation.timeline, null, 2)}
                                                    </pre>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="mt-8 sm:flex sm:flex-row-reverse gap-3">
                                            <button
                                                type="button"
                                                className="w-full sm:w-auto rounded-lg px-6 py-2.5 bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold transform hover:scale-105 transition-all duration-300 hover:from-purple-600 hover:to-pink-600 focus:outline-hidden focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                                                onClick={onClose}
                                            >
                                                Download
                                            </button>
                                            <button
                                                type="button"
                                                className="mt-3 sm:mt-0 w-full sm:w-auto rounded-lg px-6 py-2.5 bg-gray-900/50 backdrop-blur-sm text-gray-300 font-semibold transform hover:scale-105 transition-all duration-300 hover:bg-gray-800/50 focus:outline-hidden focus:ring-2 focus:ring-purple-500/50 border border-white/10"
                                                onClick={onClose}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
