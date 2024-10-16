import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CardContainer from "@/Components/Custom/CardContainer";
export default function Forum({ auth }) {
    const [featured, setFeatured] = useState([]);

    useEffect(() => {
        fetch("/api/featured")
            .then((res) => res.json())
            .then((data) => setFeatured(data));
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Explore
                </h2>
            }
        >
            <div className="grid-cols-4 grid w-fit h-full">
                {featured.map((item, index) => (
                    <CardContainer className="bg-gray-300 opacity-75 m-4 p-4" key={index}>
                        {item.name}<br/><br/><br/>
                        {item.description}
                    </CardContainer>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
