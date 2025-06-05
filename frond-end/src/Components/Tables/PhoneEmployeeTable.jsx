import React, { useState } from "react";

const data = [
    { PhoneNumber: "+380 (999) 123-45-67", PassportNumber: 123456 },
    { PhoneNumber: "+380 (888) 987-65-43", PassportNumber: 654321 },
    { PhoneNumber: "+380 (777) 555-44-33", PassportNumber: 112233 },
];

const PhoneEmployeeTable = () => {
    const [search, setSearch] = useState("");

    const filteredData = data.filter(
        (item) =>
            item.PhoneNumber.toLowerCase().includes(search.toLowerCase()) ||
            item.PassportNumber.toString().includes(search)
    );

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

            {/* Таблица */}
            <div className='max-w-4xl overflow-x-auto rounded-lg border border-[#3C4D6B] bg-[#171F2F] shadow-lg'>
                <table className='w-full table-auto border-collapse text-[#D1D5DB]'>
                    <thead>
                        <tr className='bg-[#101828]'>
                            <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                Телефон
                            </th>
                            <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-right'>
                                Номер паспорта
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr
                                key={`${item.PhoneNumber}-${item.PassportNumber}`}
                                className={`${
                                    index % 2 === 0
                                        ? "bg-[#1C263A]"
                                        : "bg-[#141C2B]"
                                } hover:bg-[#2F3F5B] transition-colors duration-200 cursor-pointer`}
                            >
                                <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                    {item.PhoneNumber}
                                </td>
                                <td className='py-3 px-6 border-b border-[#3C4D6B] text-right font-semibold'>
                                    {item.PassportNumber}
                                </td>
                            </tr>
                        ))}
                        {filteredData.length === 0 && (
                            <tr>
                                <td
                                    colSpan={2}
                                    className='py-4 text-center text-[#BFA18D] italic'
                                >
                                    Нет данных по запросу
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PhoneEmployeeTable;
