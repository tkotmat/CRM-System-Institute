import React, { useEffect, useState } from "react";
import { getRequest } from "../apiService";

const EmloyeerTables = () => {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getRequest("/api/Employee");
                setEmployees(data);
                console.log("Загруженные сотрудники:", data);
            } catch (err) {
                setError("Ошибка при загрузке данных сотрудников.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    // Фильтрация сотрудников по поиску и отделу
    const filteredData = employees.filter((item) => {
        // Обрати внимание на регистр полей ниже!
        const fullName =
            `${item.surname} ${item.name} ${item.middleName}`.toLowerCase();
        const matchSearch =
            fullName.includes(search.toLowerCase()) ||
            (item.position &&
                item.position.toLowerCase().includes(search.toLowerCase()));

        const matchDepartment = departmentFilter
            ? item.departmentName === departmentFilter
            : true;

        return matchSearch && matchDepartment;
    });

    // Уникальные отделы для селекта
    const departments = Array.from(
        new Set(employees.map((item) => item.departmentName))
    ).filter(Boolean); // фильтруем пустые значения

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
                    {departments.map((dep, index) => (
                        <option key={`${dep}-${index}`} value={dep}>
                            {dep}
                        </option>
                    ))}
                </select>
            </div>

            {/* Таблица */}
            {loading ? (
                <p className='text-white'>Загрузка...</p>
            ) : error ? (
                <p className='text-red-400'>{error}</p>
            ) : filteredData.length === 0 ? (
                <p className='text-[#BFA18D] italic'>Нет данных по запросу</p>
            ) : (
                <div className='max-w-7xl overflow-x-auto rounded-lg border border-[#3C4D6B] bg-[#171F2F] shadow-lg'>
                    <table className='w-full table-auto border-collapse text-[#D1D5DB]'>
                        <thead>
                            <tr className='bg-[#101828]'>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-left'>
                                    ФИО
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-left'>
                                    Паспорт
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-left'>
                                    ИНН
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-left'>
                                    Отдел
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-left'>
                                    Должность
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-right'>
                                    Опыт работы (лет)
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-left'>
                                    Город
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-left'>
                                    Улица
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((emp, index) => {
                                const fullName = `${emp.surname} ${emp.name} ${emp.middleName}`;
                                return (
                                    <tr
                                        key={`${emp.passportNumber}-${index}`}
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
                                            {emp.passportNumber}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                            {emp.tin}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                            {emp.departmentName}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                            {emp.position}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B] text-right'>
                                            {emp.workExperience}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                            {emp.city}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                            {emp.street}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Для отладки структуры данных — раскомментируй */}
            {/* <pre style={{ color: "white", marginTop: 20 }}>
        {JSON.stringify(employees, null, 2)}
      </pre> */}
        </div>
    );
};

export default EmloyeerTables;
