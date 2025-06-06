import React, { useEffect, useState } from "react";
import { getRequest, postRequest } from "../apiService";

const DisciplinesByAssociateProfessors = () => {
    const [departments, setDepartments] = useState([]);
    const [selectedDeptId, setSelectedDeptId] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const result = await getRequest("/api/Department");
                setDepartments(result);
            } catch (error) {
                console.error("Не удалось загрузить кафедры", error);
            }
        };

        fetchDepartments();
    }, []);

    const handleSearch = async () => {
        try {
            const result = await postRequest(
                "/api/PedagogicalLoad/GetDisciplinesByDepartment",
                {
                    departmentId: Number(selectedDeptId),
                }
            );
            setData(result);
        } catch (error) {
            console.error("Ошибка загрузки дисциплин:", error);
        }
    };

    return (
        <div className='p-4'>
            <h2 className='text-xl font-bold mb-4'>Дисциплины по кафедре</h2>

            <div className='flex gap-4 mb-4'>
                <select
                    className='border px-2 py-1'
                    value={selectedDeptId}
                    onChange={(e) => setSelectedDeptId(e.target.value)}
                >
                    <option value=''>Выберите кафедру</option>
                    {departments.map((dept, index) => (
                        <option key={dept.id || index} value={dept.id}>
                            {dept.name}
                        </option>
                    ))}
                </select>

                <button
                    className='bg-blue-600 text-white px-4 py-1 rounded'
                    onClick={handleSearch}
                    disabled={!selectedDeptId}
                >
                    Найти дисциплины
                </button>
            </div>

            {data.length > 0 ? (
                <table className='table-auto w-full border border-gray-300'>
                    <thead className='bg-gray-200'>
                        <tr>
                            <th className='border px-4 py-2'>Преподаватель</th>
                            <th className='border px-4 py-2'>Дисциплины</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td className='border px-4 py-2'>
                                    {item.teacherFullName}
                                </td>
                                <td className='border px-4 py-2'>
                                    {item.disciplines.join(", ")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                selectedDeptId && (
                    <p className='text-gray-500 mt-4'>
                        Нет данных для отображения.
                    </p>
                )
            )}
        </div>
    );
};

export default DisciplinesByAssociateProfessors;
