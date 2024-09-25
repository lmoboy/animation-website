import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import anime from "animejs";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="p-2 w-screen h-screen">
                <div className=" w-full h-full grid grid-cols-2 gap-4">
                    <div className="px-4 py-2 w-[400px] bg-green-500 rounded-md cursor-pointer">
                        Create an animation
                    </div>
                    <div className="px-4 py-2 bg-red-500 rounded-md cursor-pointer">
                        Explore
                    </div>
                    <div className="px-4 py-2 bg-blue-500 rounded-md cursor-pointer">
                        Search
                    </div>
                    <div className="px-4 py-2 bg-yellow-500 rounded-md cursor-pointer">
                        DESCRIPTION!
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
