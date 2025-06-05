import React, { useState } from "react";

const data = [
    {
        Discipline: "Математика",
        GroupNumber: 101,
        PassportNumber: 123456,
        DepartmentName: "Физико-математический",
        Semester: 1,
        HoursCount: 72,
    },
    {
        Discipline: "История",
        GroupNumber: 202,
        PassportNumber: 654321,
        DepartmentName: "Гуманитарный",
        Semester: 2,
        HoursCount: 54,
    },
    {
        Discipline: "Информатика",
        GroupNumber: 101,
        PassportNumber: 111222,
        DepartmentName: "Физико-математический",
        Semester: 1,
        HoursCount: 80,
    },
];

const PedagogicalLoadTable = () => {
    const [search, setSearch] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("");

    // Фильтрация по дисциплине и отделу
    const filteredData = data.filter((item) => {
        const matchSearch = item.Discipline.toLowerCase().includes(
            search.toLowerCase()
        );
        const matchDepartment = departmentFilter
            ? item.DepartmentName === departmentFilter
            : true;
        return matchSearch && matchDepartment;
    });

    const departments = Array.from(
        new Set(data.map((item) => item.DepartmentName))
    );

    return (
        <div className='bg-[#121212] font-sans min-h-screen text-[#D1D5DB] p-6'>
            <h1 className='text-2xl font-bold mb-6 text-white'>
                Нагрузка преподавателей
            </h1>

            {/* Поиск и фильтр */}
            <div className='flex flex-col md:flex-row gap-4 mb-6 max-w-4xl'>
                <input
                    type='text'
                    placeholder='Поиск по дисциплине'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='flex-1 px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                />
                <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className='w-full md:w-1/3 px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                >
                    <option value=''>Все отделы</option>
                    {departments.map((dep) => (
                        <option key={dep} value={dep}>
                            {dep}
                        </option>
                    ))}
                </select>
            </div>

            {/* Таблица */}
            <div className='max-w-7xl overflow-x-auto rounded-lg border border-[#3C4D6B] bg-[#171F2F] shadow-lg'>
                <table className='w-full table-auto border-collapse text-[#D1D5DB]'>
                    <thead>
                        <tr className='bg-[#101828]'>
                            <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                Дисциплина
                            </th>
                            <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-right'>
                                Номер группы
                            </th>
                            <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                Паспорт
                            </th>
                            <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                Отдел
                            </th>
                            <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-right'>
                                Семестр
                            </th>
                            <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-right'>
                                Кол-во часов
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((load, index) => (
                            <tr
                                key={`${load.PassportNumber}-${load.Discipline}-${load.GroupNumber}`}
                                className={`${
                                    index % 2 === 0
                                        ? "bg-[#1C263A]"
                                        : "bg-[#141C2B]"
                                } hover:bg-[#2F3F5B] transition-colors duration-200 cursor-pointer`}
                            >
                                <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                    {load.Discipline}
                                </td>
                                <td className='py-3 px-6 border-b border-[#3C4D6B] text-right'>
                                    {load.GroupNumber}
                                </td>
                                <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                    {load.PassportNumber}
                                </td>
                                <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                    {load.DepartmentName}
                                </td>
                                <td className='py-3 px-6 border-b border-[#3C4D6B] text-right'>
                                    {load.Semester}
                                </td>
                                <td className='py-3 px-6 border-b border-[#3C4D6B] text-right'>
                                    {load.HoursCount}
                                </td>
                            </tr>
                        ))}
                        {filteredData.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
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

export default PedagogicalLoadTable;
