import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import anime from "animejs";

export default function AnimationModal({
    auth,
    isOpen,
    onClose,
    animation,
    ownedAnimations,
}) {
    const cubeRef = useRef(null);
    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    function handlePurchase(animationID) {
        console.log("Attempting to purchase animation:", animationID);
        console.log("Owned animations:", ownedAnimations);
        ownedAnimations.map((element) => {
            console.log(element);
        });
        if (ownedAnimations.includes(animationID)) {
            setToast({
                show: true,
                message: "You already own this animation!",
                type: "error",
            });
            return;
        }

        fetch(route("animation.purchase", { id: animationID }))
            .then((response) => {
                if (response.ok) {
                    setToast({
                        show: true,
                        message: "Purchase successful!",
                        type: "success",
                    });
                } else {
                    setToast({
                        show: true,
                        message: "Purchase failed!",
                        type: "error",
                    });
                }
            })
            .catch(() => {
                setToast({
                    show: true,
                    message: "An error occurred during purchase.",
                    type: "error",
                });
            });
    }

    useEffect(() => {
        if (toast.show) {
            const timer = setTimeout(
                () => setToast({ ...toast, show: false }),
                3000
            );
            return () => clearTimeout(timer);
        }
    }, [toast]);

    useEffect(() => {
        if (!cubeRef.current || !animation) return;

        anime.remove(cubeRef.current);

        const tl = anime.timeline({
            autoplay: true,
            easing: "easeOutExpo",
        });

        animation.timeline.forEach((step) => {
            const config = {
                targets: cubeRef.current,
                ...step.properties,
                duration: step.duration,
                delay: step.delay || 0,
                easing: step.easing || "linear",
                loop: step.loop || false,
                direction: step.direction || "normal",
            };

            if (step.keyframes) {
                tl.add({ ...config, keyframes: step.keyframes });
            } else {
                tl.add(config);
            }
        });

        return () => tl.pause();
    }, [animation, isOpen]);

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
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl" />
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/60 to-gray-800/50 backdrop-blur-2xl border border-white/10 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                                {/* Glowing border effect */}
                                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/30 to-pink-500/30 opacity-30 blur-3xl" />

                                <div className="relative p-1">
                                    {/* Animated gradient border */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-pink-500/20 animate-gradient-rotate opacity-50 rounded-2xl" />

                                    <div className="relative bg-gray-900/50 rounded-2xl">
                                        <div className="absolute right-4 top-4 z-10">
                                            <button
                                                type="button"
                                                className="rounded-lg p-2 bg-gray-800/50 backdrop-blur-sm text-gray-400 hover:text-purple-300 transition-colors hover:bg-gray-700/30 hover:shadow-purple-500/10 hover:shadow-sm"
                                                onClick={onClose}
                                            >
                                                <XMarkIcon className="h-6 w-6" />
                                            </button>
                                        </div>
                                        {auth.user.is_admin && (
                                            <button
                                                onClick={() => {
                                                    if (
                                                        confirm(
                                                            "Are you sure you want to remove those balls?"
                                                        )
                                                    ) {
                                                        axios
                                                            .delete(
                                                                `/api/animations/${animation.id}`
                                                            )
                                                            .then(() => {
                                                                setToast({
                                                                    show: true,
                                                                    message:
                                                                        "Animation deleted successfully!",
                                                                    type: "success",
                                                                });
                                                                onClose();
                                                            });
                                                    }
                                                }}
                                                className="absolute left-4 top-4 z-10"
                                            >
                                                <a className="inline-flex items-center rounded-md bg-yellow-500/10 backdrop-blur-sm px-2 py-1 text-xs font-medium text-yellow-300 ring-1 ring-inset ring-yellow-500/30">
                                                    Delete
                                                </a>
                                            </button>
                                        )}
                                        <div className="px-6 pb-8 pt-6">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
                                            >
                                                {animation.name}
                                            </Dialog.Title>

                                            {/* Preview Container */}
                                            <div className="mt-6 relative group bg-black/50 rounded-xl p-4 aspect-video border border-white/10 overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-20" />
                                                <div className="absolute inset-0 bg-[radial-gradient(at_center_center,rgba(168,85,247,0.1),transparent)]" />

                                                {animation?.timeline.some(
                                                    (step) => step.properties?.d
                                                ) ? (
                                                    <svg
                                                        width="100%"
                                                        height="100%"
                                                    >
                                                        <path
                                                            ref={cubeRef}
                                                            id={
                                                                animation.target
                                                            }
                                                            fill="currentColor"
                                                            className="text-purple-500"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <div
                                                        ref={cubeRef}
                                                        id={animation?.target}
                                                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-2xl transform-gpu"
                                                        style={{
                                                            transformStyle:
                                                                "preserve-3d",
                                                            perspective:
                                                                "1000px",
                                                        }}
                                                    />
                                                )}
                                            </div>

                                            {/* Details Grid */}
                                            <div className="mt-6 grid grid-cols-2 gap-4">
                                                {[
                                                    [
                                                        "Creator",
                                                        animation.user?.name,
                                                    ],
                                                    [
                                                        "Price",
                                                        animation.price ===
                                                        0 ? (
                                                            <span className="badge-free">
                                                                Free
                                                            </span>
                                                        ) : (
                                                            <span className="badge-premium">
                                                                $
                                                                {
                                                                    animation.price
                                                                }
                                                            </span>
                                                        ),
                                                    ],
                                                    ["Views", animation.views],
                                                    [
                                                        "Created",
                                                        new Date(
                                                            animation.created_at
                                                        ).toLocaleDateString(),
                                                    ],
                                                ].map(([label, value]) => (
                                                    <div
                                                        key={label}
                                                        className="p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10"
                                                    >
                                                        <p className="text-sm font-medium text-purple-300/80">
                                                            {label}
                                                        </p>
                                                        <p className="mt-1 text-lg font-medium text-white">
                                                            {value}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Description */}
                                            <div className="mt-6 p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10">
                                                <h4 className="text-sm font-medium text-purple-300/80">
                                                    Description
                                                </h4>
                                                <p className="mt-2 text-gray-200 leading-relaxed">
                                                    {animation.description ||
                                                        "No description provided"}
                                                </p>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="mt-8 flex gap-3 justify-end">
                                                <button
                                                    onClick={() =>
                                                        handlePurchase(
                                                            animation.id
                                                        )
                                                    }
                                                    disabled={ownedAnimations.includes(
                                                        animation.id
                                                    )}
                                                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all hover:shadow-lg hover:shadow-purple-500/20 transform hover:scale-[1.02] active:scale-95"
                                                >
                                                    Purchase: {animation.price}
                                                </button>

                                                <button
                                                    onClick={onClose}
                                                    className="px-6 py-2.5 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white hover:bg-gray-700/30 transition-all"
                                                >
                                                    Close
                                                </button>
                                            </div>
                                            {toast.show && (
                                                <div
                                                    className={`fixed bottom-4 left-4 z-50 px-4 py-2 rounded-lg shadow-lg ${
                                                        toast.type === "success"
                                                            ? "bg-green-500 text-white"
                                                            : "bg-red-500 text-white"
                                                    }`}
                                                >
                                                    {toast.message}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
