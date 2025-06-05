import React, { useState } from "react";

const data = [
    {
        VacationType: "Щорічна відпустка",
        PassportNumber: 123456,
        StartDate: new Date("2024-06-01"),
        EndDate: new Date("2024-06-21"),
    },
    {
        VacationType: "Лікарняний",
        PassportNumber: 654321,
        StartDate: new Date("2024-04-15"),
        EndDate: new Date("2024-04-20"),
    },
    {
        VacationType: "Відпустка по догляду за дитиною",
        PassportNumber: 123456,
        StartDate: new Date("2023-09-01"),
        EndDate: new Date("2024-03-01"),
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

const VacationTables = () => {
    const [search, setSearch] = useState("");
    const [passportFilter, setPassportFilter] = useState("");

    const passports = Array.from(
        new Set(data.map((item) => item.PassportNumber))
    );

    const filteredData = data.filter((item) => {
        const matchSearch = item.VacationType.toLowerCase().includes(
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
                Таблиця відпусток
            </h1>

            <div className='flex flex-col md:flex-row gap-4 mb-6 max-w-4xl'>
                <input
                    type='text'
                    placeholder='Пошук за типом відпустки'
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
                                Тип відпустки
                            </th>
                            <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                Паспорт
                            </th>
                            <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                Дата початку
                            </th>
                            <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                Дата закінчення
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length ? (
                            filteredData.map((vac, index) => (
                                <tr
                                    key={`${vac.PassportNumber}-${index}`}
                                    className={`${
                                        index % 2 === 0
                                            ? "bg-[#1C263A]"
                                            : "bg-[#141C2B]"
                                    } hover:bg-[#2F3F5B] transition-colors duration-200 cursor-pointer`}
                                >
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {vac.VacationType}
                                    </td>
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {vac.PassportNumber}
                                    </td>
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {formatDate(vac.StartDate)}
                                    </td>
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {formatDate(vac.EndDate)}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={4}
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

export default VacationTables;
