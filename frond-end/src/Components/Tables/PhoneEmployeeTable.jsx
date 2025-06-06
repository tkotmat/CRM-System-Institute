import React, { useState, useEffect } from "react";
import { getRequest } from "../apiService";

const PhoneEmployeeTable = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRequest("/api/PhoneEmployee");
                setData(response);
            } catch (err) {
                setError("Ошибка при загрузке данных.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Фильтрация с безопасной проверкой и приведением к строке
    const filteredData = data.filter((item) => {
        const phone = item.phoneNumber || "";
        const passport = item.passportNumber?.toString() || "";
        return (
            phone.toLowerCase().includes(search.toLowerCase()) ||
            passport.includes(search)
        );
    });

    return (
        <div className='bg-[#121212] font-sans min-h-screen text-[#D1D5DB] p-6'>
            <h1 className='text-2xl font-bold mb-6 text-white'>
                Телефоны сотрудников
            </h1>

            {/* Поиск */}
            <div className='max-w-4xl mb-6'>
                <input
                    type='text'
                    placeholder='Поиск по номеру телефона или паспорту'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                />
            </div>

            {/* Статусы загрузки и ошибки */}
            {loading ? (
                <p className='text-white'>Загрузка данных...</p>
            ) : error ? (
                <p className='text-red-500'>{error}</p>
            ) : filteredData.length === 0 ? (
                <p className='text-[#BFA18D] italic'>Нет данных по запросу</p>
            ) : (
                <div className='max-w-4xl overflow-x-auto rounded-lg border border-[#3C4D6B] bg-[#171F2F] shadow-lg'>
                    <table className='w-full table-auto border-collapse text-[#D1D5DB]'>
                        <thead>
                            <tr className='bg-[#101828]'>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-left text-white'>
                                    Телефон
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-right text-white'>
                                    Номер паспорта
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr
                                    key={`${item.phoneNumber}-${item.passportNumber}-${index}`}
                                    className={`${
                                        index % 2 === 0
                                            ? "bg-[#1C263A]"
                                            : "bg-[#141C2B]"
                                    } hover:bg-[#2F3F5B] transition-colors duration-200 cursor-pointer`}
                                >
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {item.phoneNumber}
                                    </td>
                                    <td className='py-3 px-6 border-b border-[#3C4D6B] text-right font-semibold'>
                                        {item.passportNumber}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PhoneEmployeeTable;
