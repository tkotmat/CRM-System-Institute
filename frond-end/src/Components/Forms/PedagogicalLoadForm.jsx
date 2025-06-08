import React, { useState } from "react";
import { postRequest } from "../apiService";

const initialForm = {
    Discipline: "",
    GroupNumber: "",
    PassportNumber: "",
    DepartmentName: "",
    Semester: "",
    HoursCount: "",
};

const PedagogicalLoadForm = () => {
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
            !form.Discipline.trim() ||
            !form.GroupNumber ||
            !form.PassportNumber ||
            !form.DepartmentName.trim() ||
            !form.Semester ||
            !form.HoursCount
        ) {
            alert("Будь ласка, заповніть всі поля.");
            return;
        }

        const newLoad = {
            Discipline: form.Discipline,
            GroupNumber: Number(form.GroupNumber),
            PassportNumber: Number(form.PassportNumber),
            DepartmentName: form.DepartmentName,
            Semester: Number(form.Semester),
            HoursCount: Number(form.HoursCount),
        };

        setLoading(true);
        try {
            const response = await postRequest("/api/PedagogicalLoad", newLoad);
            console.log("Відповідь від сервера:", response);
            alert("Навантаження успішно додано!");
            handleReset();
        } catch (error) {
            console.error("Помилка при відправці навантаження:", error);
            alert("Сталася помилка при додаванні навантаження.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='max-w-4xl mx-auto p-6 mb-8 mt-10 bg-[#1C263A] border border-[#3C4D6B] rounded-lg shadow-lg text-[#D1D5DB]'>
            <h2 className='text-xl font-semibold mb-6 text-white'>
                Додати навантаження викладача
            </h2>
            <form
                onSubmit={handleSubmit}
                className='grid grid-cols-1 md:grid-cols-3 gap-4'
            >
                <div>
                    <label
                        htmlFor='Discipline'
                        className='block text-[#AFC6E0] mb-1'
                    >
                        Дисципліна
                    </label>
                    <input
                        id='Discipline'
                        name='Discipline'
                        type='text'
                        value={form.Discipline}
                        onChange={handleChange}
                        placeholder='Математика'
                        className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                    />
                </div>

                <div>
                    <label
                        htmlFor='GroupNumber'
                        className='block text-[#AFC6E0] mb-1'
                    >
                        Номер групи
                    </label>
                    <input
                        id='GroupNumber'
                        name='GroupNumber'
                        type='number'
                        value={form.GroupNumber}
                        onChange={handleChange}
                        placeholder='101'
                        className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                    />
                </div>

                <div>
                    <label
                        htmlFor='PassportNumber'
                        className='block text-[#AFC6E0] mb-1'
                    >
                        Номер паспорта
                    </label>
                    <input
                        id='PassportNumber'
                        name='PassportNumber'
                        type='number'
                        value={form.PassportNumber}
                        onChange={handleChange}
                        placeholder='123456'
                        className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                    />
                </div>

                <div>
                    <label
                        htmlFor='DepartmentName'
                        className='block text-[#AFC6E0] mb-1'
                    >
                        Відділ
                    </label>
                    <input
                        id='DepartmentName'
                        name='DepartmentName'
                        type='text'
                        value={form.DepartmentName}
                        onChange={handleChange}
                        placeholder='Фізико-математичний'
                        className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                    />
                </div>

                <div>
                    <label
                        htmlFor='Semester'
                        className='block text-[#AFC6E0] mb-1'
                    >
                        Семестр
                    </label>
                    <input
                        id='Semester'
                        name='Semester'
                        type='number'
                        value={form.Semester}
                        onChange={handleChange}
                        placeholder='1'
                        className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                    />
                </div>

                <div>
                    <label
                        htmlFor='HoursCount'
                        className='block text-[#AFC6E0] mb-1'
                    >
                        Кількість годин
                    </label>
                    <input
                        id='HoursCount'
                        name='HoursCount'
                        type='number'
                        value={form.HoursCount}
                        onChange={handleChange}
                        placeholder='72'
                        className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                    />
                </div>

                <div className='md:col-span-3 flex justify-end gap-4 mt-4'>
                    <button
                        type='button'
                        onClick={handleReset}
                        className='bg-[#3C4D6B] hover:bg-[#586A91] text-white font-semibold py-2 px-6 rounded transition'
                    >
                        Очистити
                    </button>
                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-[#E6A17E] hover:bg-[#C77C4E] text-[#121212] font-semibold py-2 px-6 rounded transition'
                    >
                        {loading ? "Відправка..." : "Додати"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PedagogicalLoadForm;
