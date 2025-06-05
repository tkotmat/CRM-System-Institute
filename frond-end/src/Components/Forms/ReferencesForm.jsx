import React, { useState } from "react";

const initialForm = {
    PassportNumber: "",
    ReleaseDate: "",
    ReferenceType: "",
};

const ReferencesForm = () => {
    const [form, setForm] = useState(initialForm);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setForm(initialForm);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !form.PassportNumber.trim() ||
            !form.ReleaseDate ||
            !form.ReferenceType.trim()
        ) {
            alert("Будь ласка, заповніть усі поля.");
            return;
        }

        // Можно добавить генерацию уникального Id, если нужно
        const newReference = {
            Id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
            PassportNumber: form.PassportNumber,
            ReleaseDate: new Date(form.ReleaseDate),
            ReferenceType: form.ReferenceType,
        };

        console.log("Додати довідку:", newReference);

        // Сброс формы
        handleReset();
    };

    return (
        <div className='max-w-3xl mx-auto p-6 mb-8 mt-10 bg-[#1C263A] border border-[#3C4D6B] rounded-lg shadow-lg text-[#D1D5DB]'>
            <h2 className='text-xl font-semibold mb-6 text-white'>
                Додати довідку
            </h2>
            <form
                onSubmit={handleSubmit}
                className='grid grid-cols-1 md:grid-cols-2 gap-4'
            >
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
                        type='text'
                        value={form.PassportNumber}
                        onChange={handleChange}
                        placeholder='123456'
                        className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                    />
                </div>

                <div>
                    <label
                        htmlFor='ReleaseDate'
                        className='block text-[#AFC6E0] mb-1'
                    >
                        Дата видачі
                    </label>
                    <input
                        id='ReleaseDate'
                        name='ReleaseDate'
                        type='date'
                        value={form.ReleaseDate}
                        onChange={handleChange}
                        className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                    />
                </div>

                <div className='md:col-span-2'>
                    <label
                        htmlFor='ReferenceType'
                        className='block text-[#AFC6E0] mb-1'
                    >
                        Тип довідки
                    </label>
                    <input
                        id='ReferenceType'
                        name='ReferenceType'
                        type='text'
                        value={form.ReferenceType}
                        onChange={handleChange}
                        placeholder='Наприклад: Робоча довідка'
                        className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                    />
                </div>

                <div className='md:col-span-2 flex justify-end gap-4 mt-4'>
                    <button
                        type='button'
                        onClick={handleReset}
                        className='bg-[#3C4D6B] hover:bg-[#586A91] text-white font-semibold py-2 px-6 rounded transition'
                    >
                        Очистити
                    </button>
                    <button
                        type='submit'
                        className='bg-[#E6A17E] hover:bg-[#C77C4E] text-[#121212] font-semibold py-2 px-6 rounded transition'
                    >
                        Додати
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReferencesForm;
