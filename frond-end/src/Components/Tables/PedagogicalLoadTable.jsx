import { useState, useEffect } from "react";
import { getRequest, deleteRequest, putRequest } from "../apiService";

const PedagogicalLoadTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const [editingKey, setEditingKey] = useState(null);
    const [editForm, setEditForm] = useState({
        discipline: "",
        groupNumber: 0,
        passportNumber: 0,
        departmentName: "",
        semester: 0,
        hoursCount: 0,
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getRequest("/api/PedagogicalLoad");
            setData(response);
        } catch (err) {
            setError("Помилка при завантаженні даних.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (discipline, groupNumber, passportNumber) => {
        if (
            !window.confirm(
                `Видалити навантаження:\nДисципліна: ${discipline}\nГрупа: ${groupNumber}\nПаспорт: ${passportNumber}?`
            )
        )
            return;

        try {
            setDeleting(`${discipline}-${groupNumber}-${passportNumber}`);

            const url = `/api/PedagogicalLoad/${encodeURIComponent(
                discipline
            )}/${encodeURIComponent(groupNumber)}/${encodeURIComponent(
                passportNumber
            )}`;

            await deleteRequest(url);

            setData((prev) =>
                prev.filter(
                    (item) =>
                        !(
                            item.discipline === discipline &&
                            item.groupNumber === groupNumber &&
                            item.passportNumber === passportNumber
                        )
                )
            );
        } catch (err) {
            alert("Помилка при видаленні запису навантаження.");
            console.error(err);
        } finally {
            setDeleting(null);
        }
    };

    const startEditing = (load) => {
        setEditingKey(
            `${load.discipline}-${load.groupNumber}-${load.passportNumber}`
        );
        setEditForm({ ...load });
    };

    const cancelEditing = () => {
        setEditingKey(null);
        setEditForm({
            discipline: "",
            groupNumber: 0,
            passportNumber: 0,
            departmentName: "",
            semester: 0,
            hoursCount: 0,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({
            ...prev,
            [name]:
                name === "groupNumber" ||
                name === "passportNumber" ||
                name === "semester" ||
                name === "hoursCount"
                    ? Number(value)
                    : value,
        }));
    };

    const saveChanges = async () => {
        const { discipline, groupNumber, passportNumber } = editForm;
        if (!discipline.trim()) {
            alert("Дисципліна не може бути порожньою");
            return;
        }

        setSaving(true);

        try {
            const url = `/api/PedagogicalLoad/${encodeURIComponent(
                discipline
            )}/${encodeURIComponent(groupNumber)}/${encodeURIComponent(
                passportNumber
            )}`;

            await putRequest(url, editForm);

            setData((prev) =>
                prev.map((item) =>
                    item.discipline === discipline &&
                    item.groupNumber === groupNumber &&
                    item.passportNumber === passportNumber
                        ? { ...editForm }
                        : item
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
                Навантаження викладачів
            </h1>

            {loading ? (
                <p className='text-white'>Завантаження даних...</p>
            ) : error ? (
                <p className='text-red-500'>{error}</p>
            ) : data.length === 0 ? (
                <p className='text-[#BFA18D] italic'>Немає даних за запитом</p>
            ) : (
                <div className='max-w-7xl overflow-x-auto rounded-lg border border-[#3C4D6B] bg-[#171F2F] shadow-lg'>
                    <table className='w-full table-auto border-collapse text-[#D1D5DB]'>
                        <thead>
                            <tr className='bg-[#101828]'>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-left text-white'>
                                    Дисципліна
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-right text-white'>
                                    Номер групи
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-left text-white'>
                                    Паспорт
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-left text-white'>
                                    Відділ
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-right text-white'>
                                    Семестр
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-right text-white'>
                                    Кількість годин
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-center text-white'>
                                    Редагувати
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-center text-white'>
                                    Видалити
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((load, index) => {
                                const key = `${load.passportNumber}-${load.discipline}-${load.groupNumber}-${index}`;
                                const deletingKey = `${load.discipline}-${load.groupNumber}-${load.passportNumber}`;
                                const isEditing = editingKey === deletingKey;

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
                                                    name='discipline'
                                                    value={editForm.discipline}
                                                    onChange={handleChange}
                                                    className='w-full bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1'
                                                    disabled={saving}
                                                />
                                            ) : (
                                                load.discipline
                                            )}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B] text-right'>
                                            {isEditing ? (
                                                <input
                                                    type='number'
                                                    name='groupNumber'
                                                    value={editForm.groupNumber}
                                                    onChange={handleChange}
                                                    min={0}
                                                    className='w-20 bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1 text-right'
                                                    disabled={saving}
                                                />
                                            ) : (
                                                load.groupNumber
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
                                                    min={0}
                                                    className='w-full bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1'
                                                    disabled={saving}
                                                />
                                            ) : (
                                                load.passportNumber
                                            )}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                            {isEditing ? (
                                                <input
                                                    type='text'
                                                    name='departmentName'
                                                    value={
                                                        editForm.departmentName
                                                    }
                                                    onChange={handleChange}
                                                    className='w-full bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1'
                                                    disabled={saving}
                                                />
                                            ) : (
                                                load.departmentName
                                            )}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B] text-right'>
                                            {isEditing ? (
                                                <input
                                                    type='number'
                                                    name='semester'
                                                    value={editForm.semester}
                                                    onChange={handleChange}
                                                    min={0}
                                                    className='w-20 bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1 text-right'
                                                    disabled={saving}
                                                />
                                            ) : (
                                                load.semester
                                            )}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B] text-right'>
                                            {isEditing ? (
                                                <input
                                                    type='number'
                                                    name='hoursCount'
                                                    value={editForm.hoursCount}
                                                    onChange={handleChange}
                                                    min={0}
                                                    className='w-20 bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1 text-right'
                                                    disabled={saving}
                                                />
                                            ) : (
                                                load.hoursCount
                                            )}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B] text-center'>
                                            {isEditing ? (
                                                <>
                                                    <button
                                                        onClick={saveChanges}
                                                        disabled={saving}
                                                        className='bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white mr-2'
                                                        title='Зберегти зміни'
                                                    >
                                                        💾
                                                    </button>
                                                    <button
                                                        onClick={cancelEditing}
                                                        disabled={saving}
                                                        className='bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-white'
                                                        title='Відмінити редагування'
                                                    >
                                                        ✖
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        startEditing(load)
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
                                                        load.discipline,
                                                        load.groupNumber,
                                                        load.passportNumber
                                                    )
                                                }
                                                disabled={
                                                    deleting === deletingKey ||
                                                    isEditing ||
                                                    saving
                                                }
                                                title={`Видалити навантаження за дисципліною ${load.discipline}`}
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
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PedagogicalLoadTable;
