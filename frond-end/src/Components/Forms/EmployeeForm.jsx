import React, { useState } from "react";

const departments = ["комп`ютерної інженерії", "філософії і права"];

const positions = ["асистент", "викладач", "доцент"];

const EmployeeForm = () => {
    const [form, setForm] = useState({
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
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleReset = () => {
        setForm({
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
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь можно отправить данные на сервер
        console.log("Отправка данных сотрудника:", form);
    };

    return (
        <div className='max-w-3xl mx-auto p-6 mt-10 bg-[#1C263A] border border-[#3C4D6B] rounded-lg shadow-lg text-[#D1D5DB]'>
            <h2 className='text-xl font-semibold mb-6 text-white'>
                Добавить сотрудника
            </h2>
            <form
                onSubmit={handleSubmit}
                className='grid grid-cols-1 md:grid-cols-2 gap-4'
            >
                <div>
                    <label className='block text-[#AFC6E0] mb-1'>Паспорт</label>
                    <input
                        type='text'
                        name='PassportNumber'
                        value={form.PassportNumber}
                        onChange={handleChange}
                        placeholder='Введите номер паспорта'
                        className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                    />
                </div>

                <div>
                    <label className='block text-[#AFC6E0] mb-1'>ИНН</label>
                    <input
                        type='text'
                        name='TIN'
                        value={form.TIN}
                        onChange={handleChange}
                        placeholder='Введите ИНН'
                        className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                    />
                </div>

                <div>
                    <label className='block text-[#AFC6E0] mb-1'>Фамилия</label>
                    <input
                        type='text'
                        name='Surname'
                        value={form.Surname}
                        onChange={handleChange}
                        placeholder='Введите фамилию'
                        className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                    />
                </div>

                <div>
                    <label className='block text-[#AFC6E0] mb-1'>Имя</label>
                    <input
                        type='text'
                        name='Name'
                        value={form.Name}
                        onChange={handleChange}
                        placeholder='Введите имя'
                        className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                    />
                </div>

                <div>
                    <label className='block text-[#AFC6E0] mb-1'>
                        Отчество
                    </label>
                    <input
                        type='text'
                        name='MiddleName'
                        value={form.MiddleName}
                        onChange={handleChange}
                        placeholder='Введите отчество'
                        className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                    />
                </div>

                <div>
                    <label className='block text-[#AFC6E0] mb-1'>Отдел</label>
                    <select
                        name='DepartmentName'
                        value={form.DepartmentName}
                        onChange={handleChange}
                        className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                    >
                        <option value=''>Выберите отдел</option>
                        {departments.map((dep) => (
                            <option key={dep} value={dep}>
                                {dep}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className='block text-[#AFC6E0] mb-1'>
                        Должность
                    </label>
                    <select
                        name='Position'
                        value={form.Position}
                        onChange={handleChange}
                        className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                    >
                        <option value=''>Выберите должность</option>
                        {positions.map((pos) => (
                            <option key={pos} value={pos}>
                                {pos}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className='block text-[#AFC6E0] mb-1'>
                        Опыт работы (лет)
                    </label>
                    <input
                        type='number'
                        name='WorkExperience'
                        value={form.WorkExperience}
                        onChange={handleChange}
                        min='0'
                        placeholder='Введите опыт работы'
                        className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                    />
                </div>

                <div>
                    <label className='block text-[#AFC6E0] mb-1'>Город</label>
                    <input
                        type='text'
                        name='City'
                        value={form.City}
                        onChange={handleChange}
                        placeholder='Введите город'
                        className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                    />
                </div>

                <div>
                    <label className='block text-[#AFC6E0] mb-1'>Улица</label>
                    <input
                        type='text'
                        name='Street'
                        value={form.Street}
                        onChange={handleChange}
                        placeholder='Введите улицу'
                        className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                    />
                </div>

                {/* Кнопки */}
                <div className='md:col-span-2 flex justify-end gap-4 mt-4'>
                    <button
                        type='button'
                        onClick={handleReset}
                        className='bg-[#3C4D6B] hover:bg-[#586A91] text-white font-semibold py-2 px-6 rounded transition'
                    >
                        Очистить
                    </button>
                    <button
                        type='submit'
                        className='bg-[#E6A17E] hover:bg-[#C77C4E] text-[#121212] font-semibold py-2 px-6 rounded transition'
                    >
                        Отправить
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;
