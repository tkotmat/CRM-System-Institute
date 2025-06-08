import { useState, useEffect } from "react";
import { getRequest, deleteRequest, putRequest } from "../apiService";

const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

const toInputDate = (date) => {
    return date ? new Date(date).toISOString().slice(0, 10) : "";
};

const VacationTables = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const [editingKey, setEditingKey] = useState(null);
    const [editForm, setEditForm] = useState({
        vacationType: "",
        passportNumber: "",
        startDate: "",
        endDate: "",
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getRequest("/api/Vacation");
            setData(response);
        } catch (err) {
            setError("Помилка при завантаженні даних.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (vacationType, passportNumber) => {
        if (!window.confirm("Ви дійсно хочете видалити цю відпустку?")) return;

        const key = `${vacationType}-${passportNumber}`;
        try {
            setDeleting(key);
            await deleteRequest(
                `/api/Vacation/${encodeURIComponent(
                    vacationType
                )}/${encodeURIComponent(passportNumber)}`
            );
            setData((prev) =>
                prev.filter(
                    (vac) =>
                        !(
                            vac.vacationType === vacationType &&
                            vac.passportNumber === passportNumber
                        )
                )
            );
        } catch (err) {
            alert("Помилка при видаленні відпустки.");
            console.error(err);
        } finally {
            setDeleting(null);
        }
    };

    const startEditing = (vac) => {
        const key = `${vac.vacationType}-${vac.passportNumber}`;
        setEditingKey(key);
        setEditForm({
            vacationType: vac.vacationType,
            passportNumber: vac.passportNumber,
            startDate: toInputDate(vac.startDate),
            endDate: toInputDate(vac.endDate),
        });
    };

    const cancelEditing = () => {
        setEditingKey(null);
        setEditForm({
            vacationType: "",
            passportNumber: "",
            startDate: "",
            endDate: "",
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({
            ...prev,
            [name]: name === "passportNumber" ? Number(value) || "" : value,
        }));
    };

    const saveChanges = async () => {
        if (
            !editForm.vacationType.trim() ||
            !editForm.passportNumber ||
            !editForm.startDate ||
            !editForm.endDate
        ) {
            alert("Всі поля мають бути заповнені");
            return;
        }
        if (new Date(editForm.startDate) > new Date(editForm.endDate)) {
            alert("Дата початку не може бути пізніше дати закінчення");
            return;
        }

        setSaving(true);
        try {
            const updatedVacation = {
                vacationType: editForm.vacationType.trim(),
                passportNumber: Number(editForm.passportNumber),
                startDate: new Date(editForm.startDate).toISOString(),
                endDate: new Date(editForm.endDate).toISOString(),
            };

            await putRequest(
                `/api/Vacation/${encodeURIComponent(
                    updatedVacation.vacationType
                )}/${encodeURIComponent(updatedVacation.passportNumber)}`,
                updatedVacation
            );

            setData((prev) =>
                prev.map((vac) =>
                    vac.vacationType === editingKey.split("-")[0] &&
                    vac.passportNumber === Number(editingKey.split("-")[1])
                        ? updatedVacation
                        : vac
                )
            );

            setEditingKey(null);
        } catch (err) {
            alert("Помилка при збереженні змін.");
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className='bg-[#121212] font-sans min-h-screen text-[#D1D5DB] p-6'>
            <h1 className='text-2xl font-bold mb-6 text-white'>
                Таблиця відпусток
            </h1>

            {loading ? (
                <p className='text-white'>Завантаження даних...</p>
            ) : error ? (
                <p className='text-red-500'>{error}</p>
            ) : (
                <div className='max-w-4xl overflow-x-auto rounded-lg border border-[#3C4D6B] bg-[#171F2F] shadow-lg'>
                    <table className='w-full table-auto border-collapse text-[#D1D5DB]'>
                        <thead>
                            <tr className='bg-[#101828]'>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                    Тип відпустки
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                    Паспорт
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                    Дата початку
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                    Дата закінчення
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-center'>
                                    Редагувати
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-center'>
                                    Видалити
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length ? (
                                data.map((vac, index) => {
                                    const key = `${vac.vacationType}-${vac.passportNumber}`;
                                    const isEditing = editingKey === key;
                                    return (
                                        <tr
                                            key={key}
                                            className={`${
                                                index % 2 === 0
                                                    ? "bg-[#1C263A]"
                                                    : "bg-[#141C2B]"
                                            } hover:bg-[#2F3F5B] transition-colors duration-200`}
                                        >
                                            <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                                {isEditing ? (
                                                    <input
                                                        type='text'
                                                        name='vacationType'
                                                        value={
                                                            editForm.vacationType
                                                        }
                                                        onChange={handleChange}
                                                        className='w-full bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1'
                                                        disabled={saving}
                                                    />
                                                ) : (
                                                    vac.vacationType
                                                )}
                                            </td>
                                            <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                                {isEditing ? (
                                                    <input
                                                        type='number'
                                                        name='passportNumber'
                                                        value={
                                                            editForm.passportNumber
                                                        }
                                                        onChange={handleChange}
                                                        className='w-full bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1'
                                                        disabled={saving}
                                                    />
                                                ) : (
                                                    vac.passportNumber
                                                )}
                                            </td>
                                            <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                                {isEditing ? (
                                                    <input
                                                        type='date'
                                                        name='startDate'
                                                        value={
                                                            editForm.startDate
                                                        }
                                                        onChange={handleChange}
                                                        className='w-full bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1'
                                                        disabled={saving}
                                                    />
                                                ) : (
                                                    formatDate(vac.startDate)
                                                )}
                                            </td>
                                            <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                                {isEditing ? (
                                                    <input
                                                        type='date'
                                                        name='endDate'
                                                        value={editForm.endDate}
                                                        onChange={handleChange}
                                                        className='w-full bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1'
                                                        disabled={saving}
                                                    />
                                                ) : (
                                                    formatDate(vac.endDate)
                                                )}
                                            </td>
                                            <td className='py-3 px-6 border-b border-[#3C4D6B] text-center'>
                                                {isEditing ? (
                                                    <div className='flex justify-center space-x-2'>
                                                        <button
                                                            onClick={
                                                                saveChanges
                                                            }
                                                            disabled={saving}
                                                            className='bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white'
                                                            title='Зберегти зміни'
                                                        >
                                                            💾
                                                        </button>
                                                        <button
                                                            onClick={
                                                                cancelEditing
                                                            }
                                                            disabled={saving}
                                                            className='bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-white'
                                                            title='Відмінити редагування'
                                                        >
                                                            ✖
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            startEditing(vac)
                                                        }
                                                        className='bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white'
                                                        title='Редагувати'
                                                    >
                                                        ✏️
                                                    </button>
                                                )}
                                            </td>
                                            <td className='py-3 px-6 border-b border-[#3C4D6B] text-center'>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            vac.vacationType,
                                                            vac.passportNumber
                                                        )
                                                    }
                                                    disabled={deleting === key}
                                                    title='Видалити відпустку'
                                                    className='bg-black hover:bg-gray-800 px-3 py-1 rounded text-red-500'
                                                >
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        fill='none'
                                                        viewBox='0 0 24 24'
                                                        stroke='currentColor'
                                                        className='w-5 h-5 mx-auto'
                                                    >
                                                        <path
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                            strokeWidth={2}
                                                            d='M6 18L18 6M6 6l12 12'
                                                        />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className='py-4 text-center text-[#BFA18D] italic'
                                    >
                                        Дані не знайдені
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default VacationTables;
