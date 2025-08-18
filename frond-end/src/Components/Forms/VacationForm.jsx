import { useState } from "react";
import { postRequest } from "../apiService";

const initialForm = {
    VacationType: "",
    PassportNumber: "",
    StartDate: "",
    EndDate: "",
};

const VacationForm = () => {
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setForm(initialForm);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !form.VacationType.trim() ||
            !form.PassportNumber.trim() ||
            !form.StartDate ||
            !form.EndDate
        ) {
            alert("Будь ласка, заповніть усі поля.");
            return;
        }

        if (new Date(form.StartDate) > new Date(form.EndDate)) {
            alert("Дата початку не може бути більшою за дату закінчення.");
            return;
        }

        const payload = {
            VacationType: form.VacationType.trim(),
            PassportNumber: parseInt(form.PassportNumber, 10),
            StartDate: new Date(form.StartDate + "T00:00:00Z").toISOString(),
            EndDate: new Date(form.EndDate + "T00:00:00Z").toISOString(),
        };

        try {
            setLoading(true);
            await postRequest("/api/Vacation", payload);
            alert("Відпустку успішно додано!");
            handleReset();
        } catch (error) {
            console.error("Помилка при збереженні:", error);
            alert("Помилка при збереженні даних. Спробуйте пізніше.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 mb-8 mt-10 bg-[#1C263A] border border-[#3C4D6B] rounded-lg shadow-lg text-[#D1D5DB]">
            <h2 className="text-xl font-semibold mb-6 text-white">
                Додати відпустку
            </h2>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <div>
                    <label
                        className="block text-[#AFC6E0] mb-1"
                        htmlFor="VacationType"
                    >
                        Тип відпустки
                    </label>
                    <input
                        id="VacationType"
                        type="text"
                        name="VacationType"
                        value={form.VacationType}
                        onChange={handleChange}
                        placeholder="Наприклад: Щорічна відпустка"
                        className="w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]"
                        required
                    />
                </div>

                <div>
                    <label
                        className="block text-[#AFC6E0] mb-1"
                        htmlFor="PassportNumber"
                    >
                        Номер паспорта
                    </label>
                    <input
                        id="PassportNumber"
                        type="number"
                        name="PassportNumber"
                        value={form.PassportNumber}
                        onChange={handleChange}
                        placeholder="123456"
                        className="w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]"
                        required
                    />
                </div>

                <div>
                    <label
                        className="block text-[#AFC6E0] mb-1"
                        htmlFor="StartDate"
                    >
                        Дата початку
                    </label>
                    <input
                        id="StartDate"
                        type="date"
                        name="StartDate"
                        value={form.StartDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]"
                        required
                    />
                </div>

                <div>
                    <label
                        className="block text-[#AFC6E0] mb-1"
                        htmlFor="EndDate"
                    >
                        Дата закінчення
                    </label>
                    <input
                        id="EndDate"
                        type="date"
                        name="EndDate"
                        value={form.EndDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]"
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

export default VacationForm;
