import { useEffect, useState } from "react";
import { getRequest } from "../apiService";

const ExpiredContractTeachers = () => {
    const [expiredTeachers, setExpiredTeachers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExpiredTeachers = async () => {
            setLoading(true);
            setError(null);

            try {
                const employees = await getRequest("/api/Employee");
                const now = new Date();

                const expired = employees.filter((emp) => {
                    if (!emp.contractEndDate) return false;

                    const endDate = new Date(emp.contractEndDate);

                    const isDefaultDate =
                        endDate.getFullYear() === 1 &&
                        endDate.getMonth() === 0 &&
                        endDate.getDate() === 1;

                    return !isDefaultDate && endDate < now;
                });

                setExpiredTeachers(expired);
            } catch (err) {
                console.error("Помилка при завантаженні даних:", err);
                setError("Помилка при завантаженні даних.");
            } finally {
                setLoading(false);
            }
        };

        fetchExpiredTeachers();
    }, []);

    const formatDate = (dateStr) => {
        if (!dateStr || dateStr === "0001-01-01T00:00:00") return "-";
        const d = new Date(dateStr);
        return d.toLocaleDateString();
    };

    return (
        <div className="bg-[#121212] font-sans min-h-screen text-[#D1D5DB] p-6">
            <h1 className="text-2xl font-bold mb-6 text-white">
                Вчителі з простроченим контрактом
            </h1>

            {loading ? (
                <p className="text-white">Завантаження...</p>
            ) : error ? (
                <p className="text-red-400">{error}</p>
            ) : expiredTeachers.length === 0 ? (
                <p className="text-[#BFA18D] italic">
                    Немає прострочених контрактів
                </p>
            ) : (
                <div className="max-w-6xl overflow-x-auto rounded-lg border border-[#3C4D6B] bg-[#171F2F] shadow-lg">
                    <table className="w-full table-auto border-collapse text-[#D1D5DB]">
                        <thead>
                            <tr className="bg-[#101828]">
                                <th className="py-3 px-6 border-b border-[#3C4D6B] text-left">
                                    ПІБ
                                </th>
                                <th className="py-3 px-6 border-b border-[#3C4D6B] text-left">
                                    Паспорт
                                </th>
                                <th className="py-3 px-6 border-b border-[#3C4D6B] text-left">
                                    Кафедра
                                </th>
                                <th className="py-3 px-6 border-b border-[#3C4D6B] text-left">
                                    Посада
                                </th>
                                <th className="py-3 px-6 border-b border-[#3C4D6B] text-left">
                                    Дата закінчення контракту
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {expiredTeachers.map((emp, index) => {
                                const fullName = `${emp.lastName} ${emp.firstName} ${emp.middleName}`;
                                return (
                                    <tr
                                        key={`${emp.passportNumber}-${index}`}
                                        className={`${
                                            index % 2 === 0
                                                ? "bg-[#1C263A]"
                                                : "bg-[#141C2B]"
                                        } hover:bg-[#2F3F5B] transition-colors duration-200`}
                                    >
                                        <td className="py-3 px-6 border-b border-[#3C4D6B]">
                                            {fullName}
                                        </td>
                                        <td className="py-3 px-6 border-b border-[#3C4D6B]">
                                            {emp.passportNumber}
                                        </td>
                                        <td className="py-3 px-6 border-b border-[#3C4D6B]">
                                            {emp.departmentName}
                                        </td>
                                        <td className="py-3 px-6 border-b border-[#3C4D6B]">
                                            {emp.position}
                                        </td>
                                        <td className="py-3 px-6 border-b border-[#3C4D6B]">
                                            {formatDate(emp.contractEndDate)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ExpiredContractTeachers;
