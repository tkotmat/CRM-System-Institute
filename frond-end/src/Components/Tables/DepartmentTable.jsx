import React, { useEffect, useState } from "react";
import { getRequest } from "../apiService";

const DepartmentTable = () => {
    const [departments, setDepartments] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const data = await getRequest("/api/Department");
                console.log("Загруженные отделы:", data);
                setDepartments(data);
            } catch (err) {
                setError("Ошибка при загрузке данных.");
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    const filteredData = departments.filter((item) => {
        const name = item?.departmentName?.toLowerCase() || "";
        const head = item?.head?.toLowerCase() || "";
        return (
            name.includes(search.toLowerCase()) ||
            head.includes(search.toLowerCase())
        );
    });

    return (
        <div className='bg-[#121212] font-sans min-h-screen text-[#D1D5DB] p-6'>
            <h1 className='text-2xl font-bold mb-6 text-white'>Отделы</h1>

            <div className='max-w-4xl mb-6'>
                <input
                    type='text'
                    placeholder='Поиск по названию отдела или руководителю'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                />
            </div>

            {loading ? (
                <p className='text-white'>Загрузка...</p>
            ) : error ? (
                <p className='text-red-400'>{error}</p>
            ) : (
                <div className='max-w-4xl overflow-x-auto rounded-lg border border-[#3C4D6B] bg-[#171F2F] shadow-lg'>
                    <table className='w-full table-auto border-collapse text-[#D1D5DB]'>
                        <thead>
                            <tr className='bg-[#101828]'>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                    Название отдела
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                    Руководитель
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-right'>
                                    Количество преподавателей
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((dep, index) => (
                                <tr
                                    key={
                                        dep.id ||
                                        `${dep.departmentName}-${index}`
                                    }
                                    className={`${
                                        index % 2 === 0
                                            ? "bg-[#1C263A]"
                                            : "bg-[#141C2B]"
                                    } hover:bg-[#2F3F5B] transition-colors duration-200 cursor-pointer`}
                                >
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {dep.departmentName || "—"}
                                    </td>
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {dep.head || "—"}
                                    </td>
                                    <td className='py-3 px-6 border-b border-[#3C4D6B] text-right font-semibold'>
                                        {dep.lecturerCount ?? "—"}
                                    </td>
                                </tr>
                            ))}
                            {filteredData.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className='py-4 text-center text-[#BFA18D] italic'
                                    >
                                        Нет данных по запросу
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

export default DepartmentTable;
