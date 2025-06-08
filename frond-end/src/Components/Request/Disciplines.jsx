import { useState, useEffect } from "react";
import { getRequest } from "../apiService";

const Disciplines = () => {
    const [employees, setEmployees] = useState([]);
    const [loadData, setLoadData] = useState([]);
    const [combinedData, setCombinedData] = useState([]);
    const [selectedDiscipline, setSelectedDiscipline] = useState("");
    const [disciplines, setDisciplines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [empRes, loadRes] = await Promise.all([
                    getRequest("/api/Employee"),
                    getRequest("/api/PedagogicalLoad"),
                ]);
                setEmployees(empRes);
                setLoadData(loadRes);

                const uniqueDisciplines = [
                    ...new Set(loadRes.map((item) => item.discipline)),
                ];
                setDisciplines(uniqueDisciplines);

                const merged = loadRes
                    .map((load) => {
                        const emp = empRes.find(
                            (e) => e.passportNumber === load.passportNumber
                        );
                        if (!emp) return null;

                        return {
                            discipline: load.discipline,
                            fullName: `${emp.surname} ${emp.name} ${emp.middleName}`,
                            contractStartDate: emp.contractStartDate,
                        };
                    })
                    .filter(Boolean);

                setCombinedData(merged);
            } catch (err) {
                console.error(err);
                setError("Помилка при завантаженні даних.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filtered =
        selectedDiscipline === ""
            ? []
            : combinedData.filter(
                  (item) => item.discipline === selectedDiscipline
              );

    const formatDate = (dateStr) => {
        if (!dateStr || dateStr === "0001-01-01T00:00:00") return "-";
        return new Date(dateStr).toLocaleDateString();
    };

    return (
        <div className='bg-[#121212] font-sans min-h-screen text-[#D1D5DB] p-6'>
            <h1 className='text-2xl font-bold mb-6 text-white'>
                Працівники за дисципліною
            </h1>

            <select
                value={selectedDiscipline}
                onChange={(e) => setSelectedDiscipline(e.target.value)}
                className='mb-6 w-full max-w-xl px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
            >
                <option value=''>Оберіть дисципліну</option>
                {disciplines.map((d, idx) => (
                    <option key={idx} value={d}>
                        {d}
                    </option>
                ))}
            </select>

            {loading ? (
                <p className='text-white'>Завантаження...</p>
            ) : error ? (
                <p className='text-red-500'>{error}</p>
            ) : selectedDiscipline === "" ? (
                <p className='italic text-[#BFA18D]'>
                    Оберіть дисципліну зі списку
                </p>
            ) : filtered.length === 0 ? (
                <p className='italic text-[#BFA18D]'>
                    Немає даних за вибраною дисципліною
                </p>
            ) : (
                <div className='max-w-6xl overflow-x-auto rounded-lg border border-[#3C4D6B] bg-[#171F2F] shadow-lg'>
                    <table className='w-full table-auto border-collapse text-[#D1D5DB]'>
                        <thead>
                            <tr className='bg-[#101828]'>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-left'>
                                    ПІБ
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-left'>
                                    Дисципліна
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-left'>
                                    Дата прийому
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((item, idx) => (
                                <tr
                                    key={`${item.fullName}-${item.discipline}-${idx}`}
                                    className={`${
                                        idx % 2 === 0
                                            ? "bg-[#1C263A]"
                                            : "bg-[#141C2B]"
                                    } hover:bg-[#2F3F5B] transition-colors`}
                                >
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {item.fullName}
                                    </td>
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {item.discipline}
                                    </td>
                                    <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                        {formatDate(item.contractStartDate)}
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

export default Disciplines;
