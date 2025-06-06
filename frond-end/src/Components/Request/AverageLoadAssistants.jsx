import React, { useEffect, useState } from "react";
import { getRequest } from "../apiService";

const AverageLoadAssistants = () => {
    const [departmentFilter, setDepartmentFilter] = useState("");
    const [averageLoad, setAverageLoad] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const employees = await getRequest("/api/Employee");
                const uniqueDepartments = Array.from(
                    new Set(employees.map((e) => e.departmentName))
                ).filter(Boolean);
                setDepartments(uniqueDepartments);
            } catch (err) {
                console.error("Ошибка при загрузке отделов:", err);
            }
        };
        fetchDepartments();
    }, []);

    const calculateAverageLoad = async () => {
        setLoading(true);
        setError(null);
        try {
            const employees = await getRequest("/api/Employee");
            const assistants = employees.filter(
                (e) =>
                    e.position?.toLowerCase() === "асистент" &&
                    (!departmentFilter || e.departmentName === departmentFilter)
            );
            const assistantPassports = assistants.map((a) => a.passportNumber);

            const loadData = await getRequest("/api/PedagogicalLoad");
            const filteredLoads = loadData.filter((l) =>
                assistantPassports.includes(l.passportNumber)
            );

            const totalHours = filteredLoads.reduce(
                (sum, l) => sum + (l.hoursCount || 0),
                0
            );
            const average =
                assistants.length > 0
                    ? (totalHours / assistants.length).toFixed(2)
                    : 0;

            setAverageLoad(average);
        } catch (err) {
            console.error("Ошибка при расчете:", err);
            setError("Ошибка при расчете средней нагрузки.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-[#121212] text-[#D1D5DB] min-h-screen p-6'>
            <h1 className='text-2xl font-bold mb-6 text-white'>
                Средняя нагрузка ассистентов по кафедре
            </h1>

            <div className='flex gap-4 items-center mb-4'>
                <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className='px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:ring-2 focus:ring-[#E6A17E]'
                >
                    <option value=''>Выберите кафедру</option>
                    {departments.map((dep, idx) => (
                        <option key={idx} value={dep}>
                            {dep}
                        </option>
                    ))}
                </select>
                <button
                    onClick={calculateAverageLoad}
                    className='bg-[#E6A17E] text-black px-6 py-2 rounded hover:bg-[#cf8a6d] transition'
                >
                    Рассчитать
                </button>
            </div>

            {loading && <p className='text-white'>Загрузка...</p>}
            {error && <p className='text-red-500'>{error}</p>}
            {averageLoad !== null && !loading && !error && (
                <p className='text-lg'>
                    Средняя нагрузка ассистентов:{" "}
                    <span className='font-bold'>{averageLoad}</span> часов
                </p>
            )}
        </div>
    );
};

export default AverageLoadAssistants;
