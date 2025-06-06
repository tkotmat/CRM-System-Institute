import React, { useEffect, useState } from "react";
import { getRequest } from "../apiService";

const ExpiredContractsTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterDate, setFilterDate] = useState(() => {
        // по умолчанию - сегодня в формате YYYY-MM-DD для input[type=date]
        const today = new Date();
        return today.toISOString().slice(0, 10);
    });

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getRequest("/api/Employee");
                setTeachers(data);
            } catch (err) {
                setError("Ошибка при загрузке данных преподавателей.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    // Парсим выбранную дату для сравнения
    const filterDateObj = new Date(filterDate);

    // Фильтруем преподавателей с contractEndDate меньше выбранной даты
    const expiredTeachers = teachers.filter((t) => {
        if (!t.contractEndDate) return false;
        return new Date(t.contractEndDate) < filterDateObj;
    });

    return (
        <div>
            <h2>Преподаватели с истекшим сроком контракта</h2>

            <label>
                Показать преподавателей с контрактом, истекшим до даты:{" "}
                <input
                    type='date'
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                />
            </label>

            {expiredTeachers.length === 0 ? (
                <p>Преподавателей с истекшим контрактом нет.</p>
            ) : (
                <ul>
                    {expiredTeachers.map((t) => (
                        <li key={t.id}>
                            {t.surname} {t.name} {t.middleName} — Должность:{" "}
                            {t.position} — Контракт закончился:{" "}
                            {new Date(t.contractEndDate).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ExpiredContractsTeachers;
