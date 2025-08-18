// AccessCode.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./BASE_URL";

export const AccessCode = () => {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.get(`${BASE_URL}/api/access`, {
                headers: { Authorization: `Bearer ${code}` },
            });
            sessionStorage.setItem("accessGranted", "true");
            window.location.href = "/home";
        } catch (err) {
            setError("Невірний код доступу");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-[#1A1F2D]">
            <div className="bg-[#1C263A] p-10 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">
                    Введіть код доступу
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Код доступу"
                        className="p-3 rounded-lg border border-[#2F3F5B] bg-[#121827] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E6A17E]"
                    />
                    <button
                        type="submit"
                        className="bg-[#E6A17E] hover:bg-[#C77C4E] text-[#121212] font-semibold py-3 rounded-lg transition"
                    >
                        Увійти
                    </button>
                    {error && (
                        <p className="text-red-500 text-center">{error}</p>
                    )}
                </form>
            </div>
        </div>
    );
};
