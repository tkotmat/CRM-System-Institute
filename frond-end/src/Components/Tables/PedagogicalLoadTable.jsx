import React, { useState, useEffect } from "react";
import { getRequest } from "../apiService";

const PedagogicalLoadTable = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRequest("/api/PedagogicalLoad");
                setData(response);
                console.log("Загруженные данные нагрузки:", response);
            } catch (err) {
                setError("Ошибка при загрузке данных.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Фильтрация данных
    const filteredData = data.filter((item) => {
        const discipline = item.discipline || "";
        const department = item.departmentName || "";
        const matchSearch = discipline
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchDepartment = departmentFilter
            ? department === departmentFilter
            : true;
        return matchSearch && matchDepartment;
    });

    // Уникальные отделы для селекта
    const departments = Array.from(
        new Set(data.map((item) => item.departmentName))
    ).filter(Boolean);

    return (
        <div className='bg-[#121212] font-sans min-h-screen text-[#D1D5DB] p-6'>
            <h1 className='text-2xl font-bold mb-6 text-white'>
                Нагрузка преподавателей
            </h1>

            {/* Фильтры */}
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
                    {departments.map((dep, idx) => (
                        <option key={`${dep}-${idx}`} value={dep}>
                            {dep}
                        </option>
                    ))}
                </select>
            </div>

            {/* Контент */}
            {loading ? (
                <p className='text-white'>Загрузка данных...</p>
            ) : error ? (
                <p className='text-red-500'>{error}</p>
            ) : filteredData.length === 0 ? (
                <p className='text-[#BFA18D] italic'>Нет данных по запросу</p>
            ) : (
                <div className='max-w-7xl overflow-x-auto rounded-lg border border-[#3C4D6B] bg-[#171F2F] shadow-lg'>
                    <table className='w-full table-auto border-collapse text-[#D1D5DB]'>
                        <thead>
                            <tr className='bg-[#101828]'>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-left text-white'>
                                    Дисциплина
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-right text-white'>
                                    Номер группы
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-left text-white'>
                                    Паспорт
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-left text-white'>
                                    Отдел
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-right text-white'>
                                    Семестр
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-right text-white'>
                                    Кол-во часов
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((load, index) => (
                                <tr
                                    key={`${load.passportNumber}-${load.discipline}-${load.groupNumber}-${index}`}
                                    className={`${
                                        index % 2 === 0
                                            ? "bg-[#1C263A]"
                                            : "bg-[#141C2B]"
                                    } hover:bg-[#2F3F5B] transition-colors duration-200 cursor-pointer`}
                                >
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {load.discipline}
                                    </td>
                                    <td className='py-3 px-6 border-b border-[#3C4D6B] text-right'>
                                        {load.groupNumber}
                                    </td>
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {load.passportNumber}
                                    </td>
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {load.departmentName}
                                    </td>
                                    <td className='py-3 px-6 border-b border-[#3C4D6B] text-right'>
                                        {load.semester}
                                    </td>
                                    <td className='py-3 px-6 border-b border-[#3C4D6B] text-right'>
                                        {load.hoursCount}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Для отладки структуры данных */}
            {/* <pre style={{ color: "white", marginTop: 20 }}>
        {JSON.stringify(data, null, 2)}
      </pre> */}
        </div>
    );
};

export default PedagogicalLoadTable;
