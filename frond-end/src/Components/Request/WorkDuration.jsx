import { useEffect, useState } from "react";
import { getRequest } from "../apiService";

const WorkDuration = () => {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getRequest("/api/Employee");
                setEmployees(data);
            } catch (err) {
                setError("Ошибка при загрузке данных сотрудников.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const formatDate = (dateStr) => {
        if (!dateStr || dateStr === "0001-01-01T00:00:00") return "-";
        return new Date(dateStr).toLocaleDateString();
    };

    const calculateDaysWorked = (startDate) => {
        if (!startDate || startDate === "0001-01-01T00:00:00") return "-";
        const start = new Date(startDate);
        const now = new Date();
        return Math.floor((now - start) / (1000 * 60 * 60 * 24));
    };

    const filteredEmployees = employees.filter((emp) => {
        const fullName =
            `${emp.surname} ${emp.name} ${emp.middleName}`.toLowerCase();
        return fullName.includes(search.toLowerCase());
    });

    return (
        <div className="bg-[#121212] font-sans min-h-screen text-[#D1D5DB] p-6">
            <h1 className="text-2xl font-bold mb-6 text-white">
                📅 Тривалість роботи
            </h1>

            <div className="max-w-4xl mb-6">
                <input
                    type="text"
                    placeholder="Пошук по ПІБ працівника"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E6A17E]"
                />
            </div>

            {loading ? (
                <p className="text-white">Завантаження...</p>
            ) : error ? (
                <p className="text-red-400">{error}</p>
            ) : (
                <div className="max-w-4xl overflow-x-auto rounded-lg border border-[#3C4D6B] bg-[#171F2F] shadow-lg">
                    <table className="w-full table-auto border-collapse text-[#D1D5DB]">
                        <thead>
                            <tr className="bg-[#101828]">
                                <th className="py-3 px-6 border-b border-[#3C4D6B] text-white text-left">
                                    ПІБ
                                </th>
                                <th className="py-3 px-6 border-b border-[#3C4D6B] text-white text-left">
                                    Дата початку
                                </th>
                                <th className="py-3 px-6 border-b border-[#3C4D6B] text-white text-right">
                                    Кількість днів
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map((emp, index) => {
                                const fullName = `${emp.lastName} ${emp.firstName} ${emp.middleName}`;
                                const startDate = formatDate(
                                    emp.contractStartDate
                                );
                                const days = calculateDaysWorked(
                                    emp.contractStartDate
                                );

                                return (
                                    <tr
                                        key={index}
                                        className={`${
                                            index % 2 === 0
                                                ? "bg-[#1C263A]"
                                                : "bg-[#141C2B]"
                                        } hover:bg-[#2F3F5B] transition-colors duration-200 cursor-pointer`}
                                    >
                                        <td className="py-3 px-6 border-b border-[#3C4D6B]">
                                            {fullName}
                                        </td>
                                        <td className="py-3 px-6 border-b border-[#3C4D6B]">
                                            {startDate}
                                        </td>
                                        <td className="py-3 px-6 border-b border-[#3C4D6B] text-right font-semibold">
                                            {typeof days === "number"
                                                ? `${days} днів`
                                                : "—"}
                                        </td>
                                    </tr>
                                );
                            })}

                            {filteredEmployees.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="py-4 text-center text-[#BFA18D] italic"
                                    >
                                        Працівників не знайдено
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

export default WorkDuration;
