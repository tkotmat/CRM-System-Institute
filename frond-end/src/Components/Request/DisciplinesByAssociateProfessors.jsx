import { useEffect, useState } from "react";
import { getRequest } from "../apiService";

const DisciplinesByAssociateProfessors = () => {
    const [departmentFilter, setDepartmentFilter] = useState("");
    const [departments, setDepartments] = useState([]);
    const [docentDisciplines, setDocentDisciplines] = useState([]);
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
                console.error("Помилка при завантаженні відділів:", err);
            }
        };
        fetchDepartments();
    }, []);

    const fetchDisciplines = async () => {
        setLoading(true);
        setError(null);
        try {
            const employees = await getRequest("/api/Employee");
            const docents = employees.filter(
                (e) =>
                    e.position?.toLowerCase() === "доцент" &&
                    (!departmentFilter || e.departmentName === departmentFilter)
            );
            const docentPassports = docents.map((d) => d.passportNumber);

            const loadData = await getRequest("/api/PedagogicalLoad");
            const filteredLoads = loadData.filter((l) =>
                docentPassports.includes(l.passportNumber)
            );

            const disciplines = filteredLoads.map((l) => {
                const docent = docents.find(
                    (d) => d.passportNumber === l.passportNumber
                );
                return {
                    fullName: docent?.fullName || l.passportNumber,
                    discipline: l.discipline,
                    groupNumber: l.groupNumber,
                    hoursCount: l.hoursCount,
                    semester: l.semester,
                };
            });

            setDocentDisciplines(disciplines);
        } catch (err) {
            console.error("Помилка при отриманні дисциплін:", err);
            setError("Помилка при завантаженні дисциплін.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-[#121212] text-[#D1D5DB] min-h-screen p-6'>
            <h1 className='text-2xl font-bold mb-6 text-white'>
                Дисципліни доцентів по кафедрі
            </h1>

            <div className='flex gap-4 items-center mb-4'>
                <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className='px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:ring-2 focus:ring-[#E6A17E]'
                >
                    <option value=''>Оберіть кафедру</option>
                    {departments.map((dep, idx) => (
                        <option key={idx} value={dep}>
                            {dep}
                        </option>
                    ))}
                </select>
                <button
                    onClick={fetchDisciplines}
                    className='bg-[#E6A17E] text-black px-6 py-2 rounded hover:bg-[#cf8a6d] transition'
                >
                    Показати дисципліни
                </button>
            </div>

            {loading && <p className='text-white'>Завантаження...</p>}
            {error && <p className='text-red-500'>{error}</p>}

            {!loading && !error && docentDisciplines.length > 0 && (
                <div className='overflow-x-auto rounded-lg border border-[#3C4D6B] bg-[#171F2F] shadow-lg mt-6'>
                    <table className='w-full table-auto'>
                        <thead>
                            <tr className='bg-[#101828]'>
                                <th className='py-3 px-4 text-left'>ПІБ</th>
                                <th className='py-3 px-4 text-left'>
                                    Дисципліна
                                </th>
                                <th className='py-3 px-4 text-left'>Група</th>
                                <th className='py-3 px-4 text-right'>Години</th>
                                <th className='py-3 px-4 text-right'>
                                    Семестр
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {docentDisciplines.map((item, idx) => (
                                <tr
                                    key={`${item.fullName}-${item.discipline}-${idx}`}
                                    className={
                                        idx % 2 === 0
                                            ? "bg-[#1C263A]"
                                            : "bg-[#141C2B]"
                                    }
                                >
                                    <td className='py-2 px-4'>
                                        {item.fullName}
                                    </td>
                                    <td className='py-2 px-4'>
                                        {item.discipline}
                                    </td>
                                    <td className='py-2 px-4'>
                                        {item.groupNumber}
                                    </td>
                                    <td className='py-2 px-4 text-right'>
                                        {item.hoursCount}
                                    </td>
                                    <td className='py-2 px-4 text-right'>
                                        {item.semester}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {!loading && docentDisciplines.length === 0 && departmentFilter && (
                <p className='text-gray-400 italic mt-4'>
                    Немає дисциплін для доцентів кафедри "{departmentFilter}".
                </p>
            )}
        </div>
    );
};

export default DisciplinesByAssociateProfessors;
