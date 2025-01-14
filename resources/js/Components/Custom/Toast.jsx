import { Fragment, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function Toast({ 
    show, 
    message, 
    type = 'success',
    onClose,
    duration = 3000 
}) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [show, duration, onClose]);

    return (
        <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="fixed bottom-4 left-4 z-50">
                <div className={`
                    max-w-sm w-full shadow-lg rounded-lg pointer-events-auto overflow-hidden
                    ${type === 'success' ? 'bg-green-500/20 backdrop-blur-xl border border-green-500/30' : 'bg-red-500/20 backdrop-blur-xl border border-red-500/30'}
                `}>
                    <div className="p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                {type === 'success' ? (
                                    <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                                ) : (
                                    <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
                                )}
                            </div>
                            <div className="ml-3 w-0 flex-1">
                                <p className={`text-sm font-medium ${type === 'success' ? 'text-green-200' : 'text-red-200'}`}>
                                    {message}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    );
}
