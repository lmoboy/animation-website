import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "axios";

export default function ManageUsers({ auth }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/api/users").then((response) => {
            setUsers(response.data);
            setLoading(false);
        });
    }, []);

    const deleteUser = (id) => {
        if (confirm("Are you sure you want to delete this user?")) {
            axios.delete(`/api/users/${id}`).then(() => {
                setUsers(users.filter((user) => user.id !== id));
            });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-gray-400">Loading users...</div>
            </div>
        );
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="p-6">
                <h1 className="text-2xl font-bold text-purple-300 mb-6">
                    Manage Users
                </h1>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-800 text-sm sm:text-base">
                        <thead>
                            <tr className="bg-gray-800 text-gray-300">
                                <th className="border border-gray-700 p-3 text-left">
                                    Name
                                </th>
                                <th className="border border-gray-700 p-3 text-left">
                                    Email
                                </th>
                                <th className="border border-gray-700 p-3 text-left">
                                    Role
                                </th>
                                <th className="border border-gray-700 p-3 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-gray-800 transition-colors"
                                >
                                    <td className="border border-gray-700 p-3 text-gray-300">
                                        {user.name}
                                    </td>
                                    <td className="border border-gray-700 p-3 text-gray-300">
                                        {user.email}
                                    </td>
                                    <td className="border border-gray-700 p-3 text-gray-300">
                                        {user.is_admin ? "Admin" : "User"}
                                    </td>
                                    <td className="border border-gray-700 p-3 text-center">
                                        <button
                                            onClick={() => deleteUser(user.id)}
                                            className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-center text-gray-400 p-6"
                                    >
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
