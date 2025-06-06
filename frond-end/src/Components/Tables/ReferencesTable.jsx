import React, { useState, useEffect } from "react";
import { getRequest } from "../apiService";

const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

const ReferencesTable = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [passportFilter, setPassportFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRequest("/api/References");
                console.log("Response data:", response);
                setData(response);
            } catch (err) {
                setError("Помилка при завантаженні даних.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const passports = Array.from(
        new Set(data.map((item) => item.passportNumber))
    ).filter(Boolean);

    const filteredData = data.filter((item) => {
        const matchSearch = item.referenceType
            ? item.referenceType.toLowerCase().includes(search.toLowerCase())
            : false;
        const matchPassport = passportFilter
            ? item.passportNumber === Number(passportFilter)
            : true;
        return matchSearch && matchPassport;
    });

    return (
        <div className='bg-[#121212] font-sans min-h-screen text-[#D1D5DB] p-6'>
            <h1 className='text-2xl font-bold mb-6 text-white'>
                Таблиця довідок
            </h1>

            <div className='flex flex-col md:flex-row gap-4 mb-6 max-w-4xl'>
                <input
                    type='text'
                    placeholder='Пошук за типом довідки'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='flex-1 px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                />
                <select
                    value={passportFilter}
                    onChange={(e) => setPassportFilter(e.target.value)}
                    className='w-full md:w-1/3 px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                >
                    <option value=''>Всі паспорти</option>
                    {passports.map((pn) => (
                        <option key={pn} value={pn}>
                            {pn}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <p className='text-white'>Завантаження даних...</p>
            ) : error ? (
                <p className='text-red-500'>{error}</p>
            ) : (
                <div className='max-w-4xl overflow-x-auto rounded-lg border border-[#3C4D6B] bg-[#171F2F] shadow-lg'>
                    <table className='w-full table-auto border-collapse text-[#D1D5DB]'>
                        <thead>
                            <tr className='bg-[#101828]'>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                    Паспорт
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                    Дата видачі
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                    Тип довідки
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((ref, index) => (
                                    <tr
                                        key={`${ref.id ?? index}-${index}`}
                                        className={`${
                                            index % 2 === 0
                                                ? "bg-[#1C263A]"
                                                : "bg-[#141C2B]"
                                        } hover:bg-[#2F3F5B] transition-colors duration-200 cursor-pointer`}
                                    >
                                        <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                            {ref.passportNumber}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                            {formatDate(ref.releaseDate)}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                            {ref.referenceType}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className='py-4 text-center text-[#BFA18D] italic'
                                    >
                                        Дані не знайдені
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ReferencesTable;
