import React, { useState } from "react";

const data = [
    {
        id: 1,
        name: "Иванов Иван",
        position: "Менеджер",
        status: "Активен",
        salary: "120000 ₽",
    },
    {
        id: 2,
        name: "Петрова Анна",
        position: "Аналитик",
        status: "В отпуске",
        salary: "110000 ₽",
    },
    {
        id: 3,
        name: "Сидоров Алексей",
        position: "Разработчик",
        status: "Активен",
        salary: "130000 ₽",
    },
];

const Tect = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const filteredData = data.filter((item) => {
        const matchSearch =
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.position.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter ? item.status === statusFilter : true;
        return matchSearch && matchStatus;
    });

    return (
        <div className='bg-[#121212] font-sans min-h-screen text-[#D1D5DB] flex'>
            {/* Боковая навигация */}
            <aside className='w-64 bg-[#1A1F2D] p-6 border-r border-[#2F3F5B] hidden md:block'>
                <h2 className='text-xl text-white font-semibold mb-4'>
                    Навигация
                </h2>
                <nav className='space-y-4'>
                    <a
                        href='#'
                        className='block text-[#AFC6E0] hover:text-[#E6A17E] transition'
                    >
                        Таблицы
                    </a>
                    <a
                        href='#'
                        className='block text-[#AFC6E0] hover:text-[#E6A17E] transition'
                    >
                        Сотрудники
                    </a>
                    <a
                        href='#'
                        className='block text-[#AFC6E0] hover:text-[#E6A17E] transition'
                    >
                        Отчёты
                    </a>
                </nav>
            </aside>

            {/* Контент */}
            <div className='flex-1 p-6'>
                {/* Шапка */}
                <header className='bg-[#1C263A] p-4 rounded border border-[#2F3F5B] mb-6 flex justify-between items-center shadow-md'>
                    <h1 className='text-2xl font-bold text-white'>
                        Тёмная Админка
                    </h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className='bg-[#E6A17E] hover:bg-[#C77C4E] text-[#121212] font-semibold py-2 px-4 rounded transition'
                    >
                        Открыть окно
                    </button>
                </header>

                <p className='mb-6'>
                    Основной текст светло-серый,{" "}
                    <span className='text-[#E6A17E]'>акценты</span> и глубокие
                    тени.
                </p>

                {/* Карточка */}
                <div className='mb-8 p-6 rounded border border-[#3C4D6B] bg-[#171F2F] text-[#AFC6E0] max-w-md shadow-lg'>
                    <h2 className='text-2xl font-semibold mb-4 text-white'>
                        Карточка с синим фоном
                    </h2>
                    <p>
                        Глубокий тёмно-синий фон с холодными акцентами и светлым
                        текстом.
                    </p>
                </div>

                {/* Фильтры и поиск */}
                <div className='max-w-4xl mx-auto mb-4 flex flex-col md:flex-row gap-4 items-center justify-between'>
                    <input
                        type='text'
                        placeholder='Поиск по имени или должности'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='w-full md:w-1/2 px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className='w-full md:w-1/3 px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                    >
                        <option value=''>Все статусы</option>
                        <option value='Активен'>Активен</option>
                        <option value='В отпуске'>В отпуске</option>
                        <option value='Неактивен'>Неактивен</option>
                    </select>
                </div>

                {/* Таблица */}
                <div className='max-w-4xl mx-auto mt-4 overflow-x-auto rounded-lg border border-[#3C4D6B] bg-[#171F2F] shadow-lg'>
                    <table className='w-full table-auto border-collapse text-[#D1D5DB]'>
                        <thead>
                            <tr className='bg-[#101828]'>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                    ФИО
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                    Должность
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                    Статус
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-right'>
                                    Зарплата
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map(
                                (
                                    { id, name, position, status, salary },
                                    index
                                ) => (
                                    <tr
                                        key={id}
                                        className={`${
                                            index % 2 === 0
                                                ? "bg-[#1C263A]"
                                                : "bg-[#141C2B]"
                                        } hover:bg-[#2F3F5B] transition-colors duration-200 cursor-pointer`}
                                    >
                                        <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                            {name}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                            {position}
                                        </td>
                                        <td
                                            className={`py-3 px-6 border-b border-[#3C4D6B] ${
                                                status === "Активен"
                                                    ? "text-[#E6A17E]"
                                                    : "text-[#BFA18D] italic"
                                            }`}
                                        >
                                            {status}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B] text-right font-semibold text-white'>
                                            {salary}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Форма */}
                <div className='max-w-xl mx-auto mt-12 p-6 bg-[#1C263A] border border-[#3C4D6B] rounded-lg shadow-lg'>
                    <h2 className='text-xl text-white font-semibold mb-4'>
                        Добавить сотрудника
                    </h2>

                    <form className='space-y-4'>
                        <div>
                            <label className='block text-[#AFC6E0] mb-1'>
                                ФИО
                            </label>
                            <input
                                type='text'
                                placeholder='Введите имя'
                                className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                            />
                        </div>

                        <div>
                            <label className='block text-[#AFC6E0] mb-1'>
                                Должность
                            </label>
                            <input
                                type='text'
                                placeholder='Введите должность'
                                className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                            />
                        </div>

                        <div>
                            <label className='block text-[#AFC6E0] mb-1'>
                                Статус
                            </label>
                            <select className='w-full px-4 py-2 bg-[#121212] border border-[#3C4D6B] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'>
                                <option value=''>Выберите статус</option>
                                <option value='active'>Активен</option>
                                <option value='vacation'>В отпуске</option>
                                <option value='inactive'>Неактивен</option>
                            </select>
                        </div>

                        <button
                            type='submit'
                            className='bg-[#E6A17E] hover:bg-[#C77C4E] text-[#121212] font-semibold py-2 px-6 rounded transition'
                        >
                            Сохранить
                        </button>
                    </form>
                </div>
            </div>

            {/* Модальное окно */}
            {isModalOpen && (
                <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'>
                    <div className='bg-[#1C263A] border border-[#3C4D6B] p-6 rounded-lg shadow-2xl max-w-md w-full text-[#D1D5DB]'>
                        <h3 className='text-xl font-bold text-white mb-4'>
                            Модальное окно
                        </h3>
                        <p className='mb-4'>
                            Это пример всплывающего окна в тёмной теме с синим
                            акцентом.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className='bg-[#E6A17E] hover:bg-[#C77C4E] text-[#121212] font-semibold py-2 px-4 rounded transition'
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tect;
