import React, { useEffect, useState } from "react";
import { getRequest } from "../apiService";

const WarVeteranMedalEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVeterans = async () => {
            try {
                const data = await getRequest("/api/Employee/war-veterans");
                setEmployees(data);
            } catch (err) {
                setError(
                    "Ошибка при загрузке списка сотрудников с медалью 'Ветеран Війни'."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchVeterans();
    }, []);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (employees.length === 0)
        return <p>Нет сотрудников с медалью «Ветеран Війни».</p>;

    return (
        <div>
            <h2>Сотрудники, награждённые медалью «Ветеран Війни»</h2>
            <table>
                <thead>
                    <tr>
                        <th>ФИО</th>
                        <th>Паспорт</th>
                        <th>Должность</th>
                        {/* Добавьте нужные столбцы */}
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id || emp.passportNumber}>
                            <td>{`${emp.surname} ${emp.name} ${emp.middleName}`}</td>
                            <td>{emp.passportNumber}</td>
                            <td>{emp.position}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WarVeteranMedalEmployees;
