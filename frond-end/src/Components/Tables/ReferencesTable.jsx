import React, { useState } from "react";

const data = [
    {
        Id: "1f9c8f5e-9e8d-4d71-9b84-72b8a6272bc0",
        PassportNumber: 123456,
        ReleaseDate: new Date("2023-10-01"),
        ReferenceType: "Робоча довідка",
    },
    {
        Id: "2d7e07b1-e9d2-44f5-8ecb-e67542a6bcb7",
        PassportNumber: 654321,
        ReleaseDate: new Date("2024-01-15"),
        ReferenceType: "Медична довідка",
    },
    {
        Id: "3e6b9a4a-c13f-4a6e-9f56-cf8aef5722a9",
        PassportNumber: 123456,
        ReleaseDate: new Date("2023-05-20"),
        ReferenceType: "Освітня довідка",
    },
];

const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

const ReferencesTable = () => {
    const [search, setSearch] = useState("");
    const [passportFilter, setPassportFilter] = useState("");

    const passports = Array.from(
        new Set(data.map((item) => item.PassportNumber))
    );

    const filteredData = data.filter((item) => {
        const matchSearch = item.ReferenceType.toLowerCase().includes(
            search.toLowerCase()
        );
        const matchPassport = passportFilter
            ? item.PassportNumber === Number(passportFilter)
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
                        {filteredData.length ? (
                            filteredData.map((ref, index) => (
                                <tr
                                    key={ref.Id}
                                    className={`${
                                        index % 2 === 0
                                            ? "bg-[#1C263A]"
                                            : "bg-[#141C2B]"
                                    } hover:bg-[#2F3F5B] transition-colors duration-200 cursor-pointer`}
                                >
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {ref.PassportNumber}
                                    </td>
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {formatDate(ref.ReleaseDate)}
                                    </td>
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {ref.ReferenceType}
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
        </div>
    );
};

export default ReferencesTable;
