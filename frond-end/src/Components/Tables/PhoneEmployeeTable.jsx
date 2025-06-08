import { useState, useEffect } from "react";
import { getRequest, deleteRequest, putRequest } from "../apiService";

const PhoneEmployeeTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const [editingKey, setEditingKey] = useState(null);
    const [editForm, setEditForm] = useState({
        phoneNumber: "",
        passportNumber: 0,
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getRequest("/api/PhoneEmployee");
            setData(response);
        } catch (err) {
            setError("Помилка при завантаженні даних.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (phoneNumber, passportNumber) => {
        if (
            !window.confirm(
                `Видалити телефон співробітника?\nТелефон: ${phoneNumber}\nПаспорт: ${passportNumber}`
            )
        )
            return;

        try {
            setDeleting(`${phoneNumber}-${passportNumber}`);

            const url = `/api/PhoneEmployee/${encodeURIComponent(
                phoneNumber
            )}/${encodeURIComponent(passportNumber)}`;
            await deleteRequest(url);

            setData((prev) =>
                prev.filter(
                    (item) =>
                        !(
                            item.phoneNumber === phoneNumber &&
                            item.passportNumber === passportNumber
                        )
                )
            );
        } catch (err) {
            alert("Помилка при видаленні телефону співробітника.");
            console.error(err);
        } finally {
            setDeleting(null);
        }
    };

    const startEditing = (item) => {
        setEditingKey(`${item.phoneNumber}-${item.passportNumber}`);
        setEditForm({
            phoneNumber: item.phoneNumber,
            passportNumber: item.passportNumber,
        });
    };

    const cancelEditing = () => {
        setEditingKey(null);
        setEditForm({ phoneNumber: "", passportNumber: 0 });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({
            ...prev,
            [name]: name === "passportNumber" ? Number(value) : value,
        }));
    };

    const saveChanges = async () => {
        const { phoneNumber, passportNumber } = editForm;
        if (!phoneNumber.trim()) {
            alert("Телефон не може бути пустим");
            return;
        }

        setSaving(true);

        try {
            const url = `/api/PhoneEmployee/${encodeURIComponent(
                phoneNumber
            )}/${encodeURIComponent(passportNumber)}`;

            await putRequest(url, {
                phoneNumber,
                passportNumber,
            });

            setData((prev) =>
                prev.map((item) =>
                    item.phoneNumber === editingKey.split("-")[0] &&
                    item.passportNumber === Number(editingKey.split("-")[1])
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
                Телефони співробітників
            </h1>

            {loading ? (
                <p className='text-white'>Завантаження даних...</p>
            ) : error ? (
                <p className='text-red-500'>{error}</p>
            ) : data.length === 0 ? (
                <p className='text-[#BFA18D] italic'>Немає даних за запитом</p>
            ) : (
                <div className='max-w-4xl overflow-x-auto rounded-lg border border-[#3C4D6B] bg-[#171F2F] shadow-lg'>
                    <table className='w-full table-auto border-collapse text-[#D1D5DB]'>
                        <thead>
                            <tr className='bg-[#101828]'>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-left text-white'>
                                    Телефон
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-right text-white'>
                                    Номер паспорта
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
                            {data.map((item, index) => {
                                const key = `${item.phoneNumber}-${item.passportNumber}-${index}`;
                                const deletingKey = `${item.phoneNumber}-${item.passportNumber}`;
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
                                                    name='phoneNumber'
                                                    value={editForm.phoneNumber}
                                                    onChange={handleChange}
                                                    className='w-full bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1'
                                                    disabled={saving}
                                                />
                                            ) : (
                                                item.phoneNumber
                                            )}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B] text-right font-semibold'>
                                            {isEditing ? (
                                                <input
                                                    type='number'
                                                    name='passportNumber'
                                                    value={
                                                        editForm.passportNumber
                                                    }
                                                    onChange={handleChange}
                                                    min={0}
                                                    className='w-24 bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1 text-right'
                                                    disabled={saving}
                                                />
                                            ) : (
                                                item.passportNumber
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
                                                        startEditing(item)
                                                    }
                                                    className='bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white'
                                                    title='Редагувати'
                                                    disabled={
                                                        deleting === deletingKey
                                                    }
                                                >
                                                    ✏️
                                                </button>
                                            )}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B] text-center'>
                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        item.phoneNumber,
                                                        item.passportNumber
                                                    )
                                                }
                                                disabled={
                                                    deleting === deletingKey ||
                                                    isEditing ||
                                                    saving
                                                }
                                                title={`Видалити телефон ${item.phoneNumber}`}
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

export default PhoneEmployeeTable;
