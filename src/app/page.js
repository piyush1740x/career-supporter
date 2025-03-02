"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Home() {
    const [interest, setInterest] = useState("");
    const [careerIdea, setCareerIdea] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchCareerIdea = async (e) => {
        e.preventDefault();
        if (!interest.trim()) {
            setError("Bhai, pehle apna interest likho! 🤔");
            return;
        }
        setError("");
        setLoading(true);
        setCareerIdea("");

        try {
            const res = await fetch("/api/gemini", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Intrest: interest }),
            });

            const data = await res.json();
            if (res.ok) {
                setCareerIdea(data.career);
            } else {
                setError(data.error || "Kuch gadbad ho gaya! ❌");
            }
        } catch (err) {
            setError("Server ne mana kar diya! ⚠️");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-6 md:p-10">
            <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 text-white">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-3">
                    🚀 Career Idea Generator
                </h1>
                <p className="text-center text-gray-300 text-lg">
                    Get career Ideas💡 <span className="text-blue-400 font-semibold">Based on your</span> interest 🤓
                </p>

                <form onSubmit={fetchCareerIdea} className="mt-6">
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full p-3 pl-12 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Apka interest kya hai? (e.g., Coding, Music, Design...)"
                            value={interest}
                            onChange={(e) => setInterest(e.target.value)}
                        />
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 text-lg" />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 w-full px-4 py-3 text-lg font-medium bg-blue-500 hover:bg-blue-600 transition rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "⏳ Finding" : "🔍 Get Idea.."}
                    </button>
                </form>

                {error && <p className="mt-4 text-red-400 text-center text-lg">⚠️ {error}</p>}

                {careerIdea && (
                    <div className="mt-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-3 bg-green-400 rounded px-3 py-2 ">✨ Career Ideas for You</h2>
                        <p className="text-gray-200 whitespace-pre-line text-lg">{careerIdea}</p>
                    </div>
                )}
            </div>
        </div>
    );
}