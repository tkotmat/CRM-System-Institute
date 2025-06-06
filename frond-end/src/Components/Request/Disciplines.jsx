import React, { useState, useEffect } from "react";
import { getRequest } from "../apiService";

const Disciplines = () => {
    const [disciplinesList, setDisciplinesList] = useState([]);
    const [discipline, setDiscipline] = useState("");
    const [teachers, setTeachers] = useState([]);
    const [loadingDisciplines, setLoadingDisciplines] = useState(false);
    const [loadingTeachers, setLoadingTeachers] = useState(false);
    const [error, setError] = useState(null);

    // Загрузка списка дисциплин при монтировании
    useEffect(() => {
        const fetchDisciplines = async () => {
            setLoadingDisciplines(true);
            setError(null);
            try {
                const data = await getRequest("/api/Department");
                setDisciplinesList(data);
            } catch (err) {
                setError("Ошибка при загрузке списка дисциплин");
            } finally {
                setLoadingDisciplines(false);
            }
        };
        fetchDisciplines();
    }, []);

    const fetchTeachers = async (selectedDiscipline) => {
        if (!selectedDiscipline) {
            setError("Выберите дисциплину");
            setTeachers([]);
            return;
        }
        setLoadingTeachers(true);
        setError(null);
        setTeachers([]);
        try {
            const data = await getRequest(
                `/api/teachers/by-discipline?name=${encodeURIComponent(
                    selectedDiscipline
                )}`
            );
            setTeachers(data);
        } catch (err) {
            setError("Ошибка при загрузке преподавателей");
        } finally {
            setLoadingTeachers(false);
        }
    };

    const onDisciplineChange = (e) => {
        const selected = e.target.value;
        setDiscipline(selected);
        fetchTeachers(selected);
    };

    return (
        <div className='p-4 text-white bg-[#121212] min-h-screen'>
            <h1 className='text-2xl mb-4'>Преподаватели по дисциплине</h1>

            <div className='mb-4 flex gap-2 items-center'>
                <label htmlFor='discipline-select' className='mr-2'>
                    Выберите дисциплину:
                </label>

                {loadingDisciplines ? (
                    <p>Загрузка списка дисциплин...</p>
                ) : (
                    <select
                        id='discipline-select'
                        value={discipline}
                        onChange={onDisciplineChange}
                        className='p-2 rounded border border-gray-600 bg-[#1E293B] text-white'
                    >
                        <option value=''>-- Выберите дисциплину --</option>
                        {disciplinesList.map((d, index) => {
                            // Безопасное получение id и name, на случай, если d - объект с такими полями
                            const key = d?.id ?? index;
                            const name =
                                typeof d === "object"
                                    ? d?.name ?? "Без названия"
                                    : d;
                            return (
                                <option key={key} value={name}>
                                    {name}
                                </option>
                            );
                        })}
                    </select>
                )}
            </div>

            {error && <p className='text-red-500 mb-4'>{error}</p>}

            {loadingTeachers && <p>Загрузка преподавателей...</p>}

            {!loadingTeachers && teachers.length === 0 && !error && (
                <p className='italic text-gray-400'>
                    Выберите дисциплину для отображения преподавателей
                </p>
            )}

            {teachers.length > 0 && (
                <table className='w-full text-left border-collapse border border-gray-600'>
                    <thead>
                        <tr className='bg-[#1E293B]'>
                            <th className='border border-gray-600 p-2'>ФИО</th>
                            <th className='border border-gray-600 p-2'>
                                Кафедра
                            </th>
                            <th className='border border-gray-600 p-2'>
                                Должность
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher) => (
                            <tr key={teacher.id} className='hover:bg-[#374151]'>
                                <td className='border border-gray-600 p-2'>{`${teacher.surname} ${teacher.name} ${teacher.middleName}`}</td>
                                <td className='border border-gray-600 p-2'>
                                    {teacher.departmentName}
                                </td>
                                <td className='border border-gray-600 p-2'>
                                    {teacher.position}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Disciplines;
