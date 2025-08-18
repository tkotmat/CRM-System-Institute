import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { getRequest, postRequest } from "../apiService";

const positions = ["асистент", "викладач", "доцент"];

const initialFormState = {
    PassportNumber: "",
    TIN: "",
    Surname: "",
    Name: "",
    MiddleName: "",
    DepartmentName: "",
    Position: "",
    WorkExperience: "",
    City: "",
    Street: "",
    Category: "",
    ContractStartDate: "",
    ContractEndDate: "",
    IsWarVeteran: false,
};

const Employees = () => {
    const [departments, setDepartments] = useState([]);
    const [form, setForm] = useState(initialFormState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const data = await getRequest("/api/Department");
                setDepartments(data);
            } catch (error) {
                console.error("Помилка при завантаженні відділів:", error);
            }
        };

        fetchDepartments();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleReset = () => setForm(initialFormState);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            PassportNumber: Number(form.PassportNumber),
            TIN: Number(form.TIN),
            Surname: form.Surname,
            Name: form.Name,
            MiddleName: form.MiddleName,
            DepartmentName: form.DepartmentName,
            Position: form.Position,
            WorkExperience: Number(form.WorkExperience),
            City: form.City,
            Street: form.Street,
            Category: form.Category,
            ContractStartDate: form.ContractStartDate
                ? new Date(form.ContractStartDate).toISOString()
                : null,
            ContractEndDate: form.ContractEndDate
                ? new Date(form.ContractEndDate).toISOString()
                : null,
            IsWarVeteran: form.IsWarVeteran,
        };

        try {
            setLoading(true);
            await postRequest("/api/Employee", payload);
            alert("Працівник успішно доданий!");
            handleReset();
        } catch (error) {
            console.error(
                "Помилка при додаванні працівника:",
                error.response?.data || error.message
            );
            alert("Помилка при відправці даних. Спробуйте пізніше.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 mt-10 bg-[#1C263A] border border-[#3C4D6B] rounded-lg shadow-lg text-[#D1D5DB]">
            <h2 className="text-xl font-semibold mb-6 text-white">
                Додати працівника
            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                {Object.entries({
                    PassportNumber: "Паспорт",
                    TIN: "ІПН",
                    Surname: "Прізвище",
                    Name: "Ім'я",
                    MiddleName: "По батькові",
                    DepartmentName: "Відділ",
                    Position: "Посада",
                    WorkExperience: "Досвід роботи (років)",
                    City: "Місто",
                    Street: "Вулиця",
                    Category: "Категорія",
                    ContractStartDate: "Дата початку контракту",
                    ContractEndDate: "Дата закінчення контракту",
                    IsWarVeteran: "Учасник війни",
                }).map(([key, label]) => {
                    if (key === "DepartmentName") {
                        return (
                            <div key={key}>
                                <label className="block text-[#AFC6E0] mb-1">
                                    {label}
                                </label>
                                <select
                                    name={key}
                                    value={form[key]}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]"
                                    required
                                >
                                    <option value="">Виберіть відділ</option>
                                    {departments.map((dep) => (
                                        <option
                                            key={dep.id}
                                            value={dep.departmentName}
                                        >
                                            {dep.departmentName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        );
                    }

                    if (key === "Position") {
                        return (
                            <div key={key}>
                                <label className="block text-[#AFC6E0] mb-1">
                                    {label}
                                </label>
                                <select
                                    name={key}
                                    value={form[key]}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]"
                                    required
                                >
                                    <option value="">Виберіть посаду</option>
                                    {positions.map((pos) => (
                                        <option key={pos} value={pos}>
                                            {pos}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        );
                    }

                    if (key === "WorkExperience") {
                        return (
                            <div key={key}>
                                <label className="block text-[#AFC6E0] mb-1">
                                    {label}
                                </label>
                                <input
                                    type="number"
                                    name={key}
                                    value={form[key]}
                                    onChange={handleChange}
                                    placeholder={`Введіть ${label.toLowerCase()}`}
                                    className="w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]"
                                    required
                                />
                            </div>
                        );
                    }

                    if (
                        key === "ContractStartDate" ||
                        key === "ContractEndDate"
                    ) {
                        return (
                            <div key={key}>
                                <label className="block text-[#AFC6E0] mb-1">
                                    {label}
                                </label>
                                <input
                                    type="date"
                                    name={key}
                                    value={form[key]}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]"
                                    required
                                />
                            </div>
                        );
                    }

                    if (key === "IsWarVeteran") {
                        return (
                            <div key={key} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name={key}
                                    checked={form[key]}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-[#E6A17E] bg-[#121212] border border-[#3C4D6B] rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]"
                                />
                                <label className="text-[#AFC6E0]">
                                    {label}
                                </label>
                            </div>
                        );
                    }

                    return (
                        <div key={key}>
                            <label className="block text-[#AFC6E0] mb-1">
                                {label}
                            </label>
                            <input
                                type="text"
                                name={key}
                                value={form[key]}
                                onChange={handleChange}
                                placeholder={`Введіть ${label.toLowerCase()}`}
                                className="w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]"
                                required={key !== "MiddleName"}
                            />
                        </div>
                    );
                })}

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
                        className="bg-[#E6A17E] hover:bg-[#C77C4E] text-[#121212] font-semibold py-2 px-6 rounded transition flex items-center gap-2"
                        disabled={loading}
                    >
                        <Save size={18} />{" "}
                        {loading ? "Зберігаємо..." : "Зберегти"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Employees;
