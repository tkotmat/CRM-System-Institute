import React, { useState } from "react";

const data = [
    {
        PassportNumber: 123456,
        TIN: 987654321,
        Surname: "Иванов",
        Name: "Иван",
        MiddleName: "Иванович",
        DepartmentName: "комп`ютерної інженерії",
        Position: "викладач",
        WorkExperience: 5,
        City: "Москва",
        Street: "Ленина, 10",
    },
    {
        PassportNumber: 654321,
        TIN: 123456789,
        Surname: "Петрова",
        Name: "Анна",
        MiddleName: "Сергеевна",
        DepartmentName: "філософії і права",
        Position: "доцент",
        WorkExperience: 3,
        City: "Санкт-Петербург",
        Street: "Невский пр., 20",
    },
    {
        PassportNumber: 111222,
        TIN: 555666777,
        Surname: "Сидоров",
        Name: "Алексей",
        MiddleName: "Владимирович",
        DepartmentName: "комп`ютерної інженерії",
        Position: "асистент",
        WorkExperience: 7,
        City: "Казань",
        Street: "Татарская, 5",
    },
];

const EmloyeerTables = () => {
    const [search, setSearch] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("");

    // Фильтрация данных по ФИО (Фамилия+Имя+Отчество) и должности + отдел
    const filteredData = data.filter((item) => {
        const fullName =
            `${item.Surname} ${item.Name} ${item.MiddleName}`.toLowerCase();
        const matchSearch =
            fullName.includes(search.toLowerCase()) ||
            item.Position.toLowerCase().includes(search.toLowerCase());

        const matchDepartment = departmentFilter
            ? item.DepartmentName === departmentFilter
            : true;

        return matchSearch && matchDepartment;
    });

    // Список отделов для фильтра
    const departments = Array.from(
        new Set(data.map((item) => item.DepartmentName))
    );

    return (
        <div className='bg-[#121212] font-sans min-h-screen text-[#D1D5DB] p-6'>
            <h1 className='text-2xl font-bold mb-6 text-white'>
                Таблица сотрудников
            </h1>

            {/* Поиск и фильтр по отделу */}
            <div className='flex flex-col md:flex-row gap-4 mb-6 max-w-4xl'>
                <input
                    type='text'
                    placeholder='Поиск по ФИО или должности'
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
                                ФИО
                            </th>
                            <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                Паспорт
                            </th>
                            <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                ИНН
                            </th>
                            <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                Отдел
                            </th>
                            <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                Должность
                            </th>
                            <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-right'>
                                Опыт работы (лет)
                            </th>
                            <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                Город
                            </th>
                            <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                Улица
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((emp, index) => {
                            const fullName = `${emp.Surname} ${emp.Name} ${emp.MiddleName}`;
                            return (
                                <tr
                                    key={emp.PassportNumber}
                                    className={`${
                                        index % 2 === 0
                                            ? "bg-[#1C263A]"
                                            : "bg-[#141C2B]"
                                    } hover:bg-[#2F3F5B] transition-colors duration-200 cursor-pointer`}
                                >
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {fullName}
                                    </td>
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {emp.PassportNumber}
                                    </td>
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {emp.TIN}
                                    </td>
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {emp.DepartmentName}
                                    </td>
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {emp.Position}
                                    </td>
                                    <td className='py-3 px-6 border-b border-[#3C4D6B] text-right'>
                                        {emp.WorkExperience}
                                    </td>
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {emp.City}
                                    </td>
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {emp.Street}
                                    </td>
                                </tr>
                            );
                        })}
                        {filteredData.length === 0 && (
                            <tr>
                                <td
                                    colSpan={8}
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

export default EmloyeerTables;
