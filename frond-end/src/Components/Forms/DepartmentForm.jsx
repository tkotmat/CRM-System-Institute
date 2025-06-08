import React, { useState } from "react";

const initialForm = {
    DepartmentName: "",
    Head: "",
    LecturerCount: "",
};

const DepartmentForm = () => {
    const [form, setForm] = useState(initialForm);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setForm(initialForm);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.DepartmentName.trim()) {
            alert("Введіть назву відділу");
            return;
        }

        if (!form.Head.trim()) {
            alert("Введіть ПІБ керівника");
            return;
        }

        if (
            !form.LecturerCount ||
            isNaN(form.LecturerCount) ||
            form.LecturerCount <= 0
        ) {
            alert("Введіть коректну кількість викладачів");
            return;
        }

        const newDepartment = {
            DepartmentName: form.DepartmentName.trim(),
            Head: form.Head.trim(),
            LecturerCount: Number(form.LecturerCount),
        };

        try {
            const response = await fetch("/api/Department", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newDepartment),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Помилка при додаванні відділу");
            }

            const data = await response.json();
            console.log("Відділ додано:", data);
            alert("Відділ успішно додано!");
            handleReset();
        } catch (error) {
            console.error("Помилка при додаванні:", error);
            alert(`Помилка при додаванні: ${error.message}`);
        }
    };

    return (
        <div className='max-w-4xl mx-auto p-6 mb-8 mt-10 bg-[#1C263A] border border-[#3C4D6B] rounded-lg shadow-lg text-[#D1D5DB]'>
            <h2 className='text-xl font-semibold mb-6 text-white'>
                Додати відділ
            </h2>
            <form
                onSubmit={handleSubmit}
                className='grid grid-cols-1 md:grid-cols-3 gap-4'
            >
                <div>
                    <label
                        htmlFor='DepartmentName'
                        className='block text-[#AFC6E0] mb-1'
                    >
                        Назва відділу *
                    </label>
                    <input
                        id='DepartmentName'
                        name='DepartmentName'
                        type='text'
                        value={form.DepartmentName}
                        onChange={handleChange}
                        placeholder='Гуманітарний'
                        className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                        required
                    />
                </div>

                <div>
                    <label htmlFor='Head' className='block text-[#AFC6E0] mb-1'>
                        Керівник відділу *
                    </label>
                    <input
                        id='Head'
                        name='Head'
                        type='text'
                        value={form.Head}
                        onChange={handleChange}
                        placeholder='Петрова Анна Сергіївна'
                        className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor='LecturerCount'
                        className='block text-[#AFC6E0] mb-1'
                    >
                        Кількість викладачів *
                    </label>
                    <input
                        id='LecturerCount'
                        name='LecturerCount'
                        type='number'
                        value={form.LecturerCount}
                        onChange={handleChange}
                        placeholder='18'
                        min='1'
                        className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                        required
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
                        className='bg-[#E6A17E] hover:bg-[#C77C4E] text-[#121212] font-semibold py-2 px-6 rounded transition'
                    >
                        Додати
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DepartmentForm;
