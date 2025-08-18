import { useEffect, useState } from "react";
import { getRequest } from "../apiService";

const WarVeteranMedalEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getRequest("/api/Employee");

                const veterans = data.filter(
                    (emp) => emp.isWarVeteran === true
                );
                setEmployees(veterans);
                console.log("Ветерани війни:", veterans);
            } catch (err) {
                setError("Помилка при завантаженні даних співробітників.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const formatDate = (dateStr) => {
        if (!dateStr || dateStr === "0001-01-01T00:00:00") return "-";
        const d = new Date(dateStr);
        return d.toLocaleDateString();
    };

    return (
        <div className="bg-[#121212] font-sans min-h-screen text-[#D1D5DB] p-6">
            <h1 className="text-2xl font-bold mb-6 text-white">
                Працівники з медаллю ветерана війни
            </h1>

            {loading ? (
                <p className="text-white">Завантаження...</p>
            ) : error ? (
                <p className="text-red-400">{error}</p>
            ) : employees.length === 0 ? (
                <p className="text-[#BFA18D] italic">Немає даних по запиту</p>
            ) : (
                <div className="max-w-7xl rounded-lg border border-[#3C4D6B] bg-[#171F2F] shadow-lg">
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
                                    ІПН
                                </th>
                                <th className="py-3 px-6 border-b border-[#3C4D6B] text-left">
                                    Відділ
                                </th>
                                <th className="py-3 px-6 border-b border-[#3C4D6B] text-left">
                                    Посада
                                </th>
                                <th className="py-3 px-6 border-b border-[#3C4D6B] text-left">
                                    Категорія
                                </th>
                                <th className="py-3 px-6 border-b border-[#3C4D6B] text-right">
                                    Досвід роботи (років)
                                </th>
                                <th className="py-3 px-6 border-b border-[#3C4D6B] text-left">
                                    Дата початку контракту
                                </th>
                                <th className="py-3 px-6 border-b border-[#3C4D6B] text-left">
                                    Дата закінчення контракту
                                </th>
                                <th className="py-3 px-6 border-b border-[#3C4D6B] text-center">
                                    Ветеран війни
                                </th>
                                <th className="py-3 px-6 border-b border-[#3C4D6B] text-left">
                                    Місто
                                </th>
                                <th className="py-3 px-6 border-b border-[#3C4D6B] text-left">
                                    Вулиця
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp, index) => {
                                const fullName = `${emp.lastName} ${emp.firstName} ${emp.middleName}`;
                                return (
                                    <tr
                                        key={`${emp.passportNumber}-${index}`}
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
                                            {emp.passportNumber}
                                        </td>
                                        <td className="py-3 px-6 border-b border-[#3C4D6B]">
                                            {emp.tin}
                                        </td>
                                        <td className="py-3 px-6 border-b border-[#3C4D6B]">
                                            {emp.departmentName}
                                        </td>
                                        <td className="py-3 px-6 border-b border-[#3C4D6B]">
                                            {emp.position}
                                        </td>
                                        <td className="py-3 px-6 border-b border-[#3C4D6B]">
                                            {emp.category || "-"}
                                        </td>
                                        <td className="py-3 px-6 border-b border-[#3C4D6B] text-right">
                                            {emp.workExperience}
                                        </td>
                                        <td className="py-3 px-6 border-b border-[#3C4D6B]">
                                            {formatDate(emp.contractStartDate)}
                                        </td>
                                        <td className="py-3 px-6 border-b border-[#3C4D6B]">
                                            {formatDate(emp.contractEndDate)}
                                        </td>
                                        <td className="py-3 px-6 border-b border-[#3C4D6B] text-center">
                                            {emp.isWarVeteran ? "✔️" : "-"}
                                        </td>
                                        <td className="py-3 px-6 border-b border-[#3C4D6B]">
                                            {emp.city}
                                        </td>
                                        <td className="py-3 px-6 border-b border-[#3C4D6B]">
                                            {emp.street}
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

export default WarVeteranMedalEmployees;
