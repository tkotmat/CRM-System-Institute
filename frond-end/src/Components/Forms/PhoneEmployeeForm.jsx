import { useState, useEffect } from "react";
import { getRequest, postRequest } from "../apiService";

const PhoneEmployeeForm = () => {
    const [form, setForm] = useState({
        PhoneNumber: "",
        PassportNumber: "",
    });
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getRequest("/api/Employee");
                setEmployees(data);
            } catch (error) {
                console.error(
                    "Помилка під час завантаження співробітників:",
                    error
                );
            }
        };

        fetchEmployees();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setForm({
            PhoneNumber: "",
            PassportNumber: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.PhoneNumber.trim() || !form.PassportNumber.trim()) {
            alert("Будь ласка, заповніть усі поля");
            return;
        }

        try {
            setLoading(true);
            await postRequest("/api/PhoneEmployee", form);
            alert("Телефон успішно доданий!");
            handleReset();
        } catch (error) {
            console.error(
                "Помилка при додаванні телефону:",
                error.response?.data || error.message
            );
            alert("Помилка при надсиланні даних. Спробуйте пізніше.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 mb-8 mt-10 bg-[#1C263A] border border-[#3C4D6B] rounded-lg shadow-lg text-[#D1D5DB]">
            <h2 className="text-xl font-semibold mb-6 text-white">
                Додати телефон співробітника
            </h2>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <div>
                    <label className="block text-[#AFC6E0] mb-1">Телефон</label>
                    <input
                        type="text"
                        name="PhoneNumber"
                        value={form.PhoneNumber}
                        onChange={handleChange}
                        placeholder="+380 (999) 123-45-67"
                        className="w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]"
                        required
                    />
                </div>

                <div>
                    <label className="block text-[#AFC6E0] mb-1">
                        Номер паспорта співробітника
                    </label>
                    <select
                        name="PassportNumber"
                        value={form.PassportNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]"
                        required
                    >
                        <option value="">Виберіть паспорт</option>
                        {employees.map((emp) => (
                            <option
                                key={emp.passportNumber}
                                value={emp.passportNumber}
                            >
                                {emp.passportNumber} — {emp.surname} {emp.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="bg-[#3C4D6B] hover:bg-[#586A91] text-white font-semibold py-2 px-6 rounded transition"
                        disabled={loading}
                    >
                        Очистити
                    </button>
                    <button
                        type="submit"
                        className="bg-[#E6A17E] hover:bg-[#C77C4E] text-[#121212] font-semibold py-2 px-6 rounded transition"
                        disabled={loading}
                    >
                        {loading ? "Додається..." : "Додати"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PhoneEmployeeForm;
