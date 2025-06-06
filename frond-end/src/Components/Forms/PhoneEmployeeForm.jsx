import React, { useState } from "react";
import { postRequest } from "../apiService";

const PhoneEmployeeForm = () => {
    const [form, setForm] = useState({
        PhoneNumber: "",
        PassportNumber: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
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
            alert("Пожалуйста, заполните все поля");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                PhoneNumber: form.PhoneNumber,
                PassportNumber: form.PassportNumber,
            };
            const response = await postRequest("/api/References", payload);
            alert("Телефон сотрудника успешно добавлен");
            console.log("Ответ сервера:", response);
            handleReset();
        } catch (error) {
            console.error("Ошибка при добавлении телефона сотрудника:", error);
            alert("Ошибка при отправке данных. Посмотрите консоль.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='max-w-3xl mx-auto p-6 mb-8 mt-10 bg-[#1C263A] border border-[#3C4D6B] rounded-lg shadow-lg text-[#D1D5DB]'>
            <h2 className='text-xl font-semibold mb-6 text-white'>
                Добавить телефон сотрудника
            </h2>
            <form
                onSubmit={handleSubmit}
                className='grid grid-cols-1 md:grid-cols-2 gap-4'
            >
                <div>
                    <label className='block text-[#AFC6E0] mb-1'>Телефон</label>
                    <input
                        type='text'
                        name='PhoneNumber'
                        value={form.PhoneNumber}
                        onChange={handleChange}
                        placeholder='+380 (999) 123-45-67'
                        className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                    />
                </div>

                <div>
                    <label className='block text-[#AFC6E0] mb-1'>
                        Номер паспорта
                    </label>
                    <input
                        type='text'
                        name='PassportNumber'
                        value={form.PassportNumber}
                        onChange={handleChange}
                        placeholder='123456'
                        className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                    />
                </div>

                <div className='md:col-span-2 flex justify-end gap-4 mt-4'>
                    <button
                        type='button'
                        onClick={handleReset}
                        disabled={loading}
                        className='bg-[#3C4D6B] hover:bg-[#586A91] text-white font-semibold py-2 px-6 rounded transition disabled:opacity-50'
                    >
                        Очистить
                    </button>
                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-[#E6A17E] hover:bg-[#C77C4E] text-[#121212] font-semibold py-2 px-6 rounded transition disabled:opacity-50'
                    >
                        {loading ? "Отправка..." : "Добавить"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PhoneEmployeeForm;
