import { useState, useEffect } from "react";
import { getRequest, postRequest } from "../apiService";

const initialForm = {
    PassportNumber: "",
    ReleaseDate: "",
    ReferenceType: "",
};

const toUTCDateString = (localDate) => {
    const date = new Date(localDate);
    return new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    ).toISOString();
};

const ReferencesForm = () => {
    const [form, setForm] = useState(initialForm);
    const [passportList, setPassportList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPassports = async () => {
            try {
                const employees = await getRequest("/api/Employee");
                const uniquePassports = [
                    ...new Set(employees.map((e) => e.passportNumber)),
                ];
                setPassportList(uniquePassports);
            } catch (error) {
                console.error("Помилка при отриманні співробітників:", error);
            }
        };

        fetchPassports();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "PassportNumber" ? parseInt(value, 10) : value,
        }));
    };

    const handleReset = () => {
        setForm(initialForm);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !form.PassportNumber ||
            !form.ReleaseDate ||
            !form.ReferenceType.trim()
        ) {
            alert("Будь ласка, заповніть усі поля.");
            return;
        }

        const newReference = {
            Id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
            PassportNumber: parseInt(form.PassportNumber),
            ReleaseDate: toUTCDateString(form.ReleaseDate),
            ReferenceType: form.ReferenceType.trim(),
        };

        try {
            setLoading(true);
            await postRequest("/api/References", newReference);
            alert("Довідку успішно додано!");
            handleReset();
        } catch (error) {
            console.error("Помилка при додаванні довідки:", error);
            alert("Помилка при додаванні довідки.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 mb-8 mt-10 bg-[#1C263A] border border-[#3C4D6B] rounded-lg shadow-lg text-[#D1D5DB]">
            <h2 className="text-xl font-semibold mb-6 text-white">
                Додати довідку
            </h2>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <div>
                    <label
                        htmlFor="PassportNumber"
                        className="block text-[#AFC6E0] mb-1"
                    >
                        Номер паспорта
                    </label>
                    <select
                        id="PassportNumber"
                        name="PassportNumber"
                        value={form.PassportNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E6A17E]"
                        required
                    >
                        <option value="">-- Оберіть номер паспорта --</option>
                        {passportList.map((passport) => (
                            <option key={passport} value={passport}>
                                {passport}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="ReleaseDate"
                        className="block text-[#AFC6E0] mb-1"
                    >
                        Дата видачі
                    </label>
                    <input
                        id="ReleaseDate"
                        name="ReleaseDate"
                        type="date"
                        value={form.ReleaseDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E6A17E]"
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <label
                        htmlFor="ReferenceType"
                        className="block text-[#AFC6E0] mb-1"
                    >
                        Тип довідки
                    </label>
                    <input
                        id="ReferenceType"
                        name="ReferenceType"
                        type="text"
                        value={form.ReferenceType}
                        onChange={handleChange}
                        placeholder="Наприклад: Робоча довідка"
                        className="w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E6A17E]"
                        required
                    />
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

export default ReferencesForm;
