import { useState, useEffect } from "react";
import { getRequest } from "../apiService";

const TeachersByDepartment = () => {
    const [departmentList, setDepartmentList] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const deps = await getRequest("/api/Department");
                setDepartmentList(deps);
            } catch (err) {
                console.error(err);
                setError("Помилка при завантаженні списку відділів");
            }
        };
        fetchDepartments();
    }, []);

    useEffect(() => {
        if (!selectedDepartment) {
            setTeachers([]);
            setLoading(false);
            return;
        }

        const fetchTeachers = async () => {
            setLoading(true);
            setError(null);
            try {
                const allEmployees = await getRequest("/api/Employee");
                const filtered = allEmployees.filter(
                    (emp) => emp.departmentName === selectedDepartment
                );
                setTeachers(filtered);
            } catch (err) {
                console.error(err);
                setError("Помилка при завантаженні працівників відділу");
            } finally {
                setLoading(false);
            }
        };
        fetchTeachers();
    }, [selectedDepartment]);

    const formatDate = (dateStr) => {
        if (!dateStr || dateStr === "0001-01-01T00:00:00") return "-";
        return new Date(dateStr).toLocaleDateString();
    };

    return (
        <div className='bg-[#121212] font-sans min-h-screen text-[#D1D5DB] p-6'>
            <h1 className='text-2xl font-bold mb-6 text-white'>
                Вчителі по відділу
            </h1>

            <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className='mb-6 w-full max-w-xl px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
            >
                <option value=''>Виберіть відділ</option>
                {departmentList.map((dep) => (
                    <option
                        key={dep.id || dep.departmentName}
                        value={dep.departmentName || dep.name}
                    >
                        {dep.departmentName || dep.name}
                    </option>
                ))}
            </select>

            {loading ? (
                <p className='text-white'>Завантаження...</p>
            ) : error ? (
                <p className='text-red-500'>{error}</p>
            ) : selectedDepartment === "" ? (
                <p className='italic text-[#BFA18D]'>
                    Виберіть відділ зі списку
                </p>
            ) : teachers.length === 0 ? (
                <p className='italic text-[#BFA18D]'>
                    У цьому відділі немає працівників
                </p>
            ) : (
                <div className='max-w-6xl overflow-x-auto rounded-lg border border-[#3C4D6B] bg-[#171F2F] shadow-lg'>
                    <table className='w-full table-auto border-collapse text-[#D1D5DB]'>
                        <thead>
                            <tr className='bg-[#101828]'>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-left'>
                                    Прізвище
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-left'>
                                    Ім'я
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-left'>
                                    По батькові
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-left'>
                                    Категорія
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-left'>
                                    Дата прийому
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.map((t, idx) => (
                                <tr
                                    key={t.id || idx}
                                    className={`${
                                        idx % 2 === 0
                                            ? "bg-[#1C263A]"
                                            : "bg-[#141C2B]"
                                    } hover:bg-[#2F3F5B] transition-colors`}
                                >
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {t.surname || "-"}
                                    </td>
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {t.name || "-"}
                                    </td>
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {t.middleName || "-"}
                                    </td>
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {t.category || "-"}
                                    </td>
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {formatDate(t.contractStartDate)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TeachersByDepartment;
