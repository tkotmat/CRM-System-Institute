import { useState, useEffect } from "react";
import { getRequest } from "../apiService";

const monthNames = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
];

const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

const EmployeesOnLeave = () => {
    const now = new Date();
    const [vacations, setVacations] = useState([]);
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVacations = async () => {
            try {
                const data = await getRequest("/api/Vacation");
                setVacations(data);
            } catch (err) {
                setError("Помилка завантаження даних відпусток");
            } finally {
                setLoading(false);
            }
        };
        fetchVacations();
    }, []);

    const isVacationInSelectedMonth = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);

        const monthStart = new Date(selectedYear, selectedMonth, 1);
        const monthEnd = new Date(selectedYear, selectedMonth + 1, 0);

        return startDate <= monthEnd && endDate >= monthStart;
    };

    const filteredVacations = vacations.filter((vac) =>
        isVacationInSelectedMonth(vac.startDate, vac.endDate)
    );

    return (
        <div className='bg-[#121212] font-sans min-h-screen text-[#D1D5DB] p-6'>
            <h1 className='text-2xl font-bold mb-6 text-white'>
                Співробітники у відпустці у {monthNames[selectedMonth]}{" "}
                {selectedYear}
            </h1>

            <div className='flex gap-4 mb-6'>
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    className='px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white'
                >
                    {monthNames.map((m, i) => (
                        <option key={i} value={i}>
                            {m}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className='px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white'
                >
                    {Array.from({ length: 5 }).map((_, i) => {
                        const year = now.getFullYear() - 2 + i;
                        return (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        );
                    })}
                </select>
            </div>

            {loading ? (
                <p>Завантаження даних...</p>
            ) : error ? (
                <p className='text-red-500'>{error}</p>
            ) : filteredVacations.length === 0 ? (
                <p className='italic text-[#BFA18D]'>
                    Співробітників у відпустці не знайдено.
                </p>
            ) : (
                <table className='w-full max-w-4xl border border-[#3C4D6B] rounded bg-[#171F2F] text-[#D1D5DB]'>
                    <thead className='bg-[#101828]'>
                        <tr>
                            <th className='py-3 px-6 border-b border-[#3C4D6B] text-left'>
                                Паспорт
                            </th>
                            <th className='py-3 px-6 border-b border-[#3C4D6B] text-left'>
                                Тип відпустки
                            </th>
                            <th className='py-3 px-6 border-b border-[#3C4D6B] text-left'>
                                Початок
                            </th>
                            <th className='py-3 px-6 border-b border-[#3C4D6B] text-left'>
                                Кінець
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVacations.map((vac, i) => (
                            <tr
                                key={`${vac.passportNumber}-${i}`}
                                className={
                                    i % 2 === 0
                                        ? "bg-[#1C263A]"
                                        : "bg-[#141C2B]"
                                }
                            >
                                <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                    {vac.passportNumber}
                                </td>
                                <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                    {vac.vacationType}
                                </td>
                                <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                    {formatDate(vac.startDate)}
                                </td>
                                <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                    {formatDate(vac.endDate)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default EmployeesOnLeave;
