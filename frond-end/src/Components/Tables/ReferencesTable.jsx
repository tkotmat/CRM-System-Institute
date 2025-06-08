import { useEffect, useState } from "react";
import { getRequest, deleteRequest, putRequest } from "../apiService";

const ReferencesTable = () => {
    const [references, setReferences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const [editingRefId, setEditingRefId] = useState(null);
    const [editForm, setEditForm] = useState({
        passportNumber: "",
        releaseDate: "",
        referenceType: "",
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchReferences();
    }, []);

    const fetchReferences = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getRequest("/api/References");
            setReferences(data);
        } catch {
            setError("Помилка при завантаженні даних.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm(`Видалити довідку з id ${id}?`)) return;
        try {
            setDeleting(id);
            await deleteRequest(`/api/References/${id}`);
            setReferences((prev) => prev.filter((r) => r.id !== id));
        } catch {
            alert("Помилка при видаленні довідки.");
        } finally {
            setDeleting(null);
        }
    };

    const startEditing = (ref) => {
        setEditingRefId(ref.id);
        setEditForm({
            passportNumber: ref.passportNumber || "",
            releaseDate: ref.releaseDate
                ? new Date(ref.releaseDate).toISOString().slice(0, 10)
                : "",
            referenceType: ref.referenceType || "",
        });
    };

    const cancelEditing = () => {
        setEditingRefId(null);
        setEditForm({ passportNumber: "", releaseDate: "", referenceType: "" });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({
            ...prev,
            [name]: name === "passportNumber" ? Number(value) : value,
        }));
    };

    const saveChanges = async () => {
        if (!editForm.passportNumber || !editForm.referenceType.trim()) {
            alert("Паспорт і тип довідки не можуть бути порожніми");
            return;
        }
        setSaving(true);
        try {
            const updatedReference = {
                id: editingRefId,
                passportNumber: Number(editForm.passportNumber),
                releaseDate: editForm.releaseDate
                    ? new Date(editForm.releaseDate).toISOString()
                    : null,
                referenceType: editForm.referenceType.trim(),
            };

            await putRequest(
                `/api/References/${editingRefId}`,
                updatedReference
            );

            setReferences((prev) =>
                prev.map((r) => (r.id === editingRefId ? updatedReference : r))
            );
            setEditingRefId(null);
        } catch {
            alert("Помилка при збереженні змін.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className='bg-[#121212] font-sans min-h-screen text-[#D1D5DB] p-6'>
            <h1 className='text-2xl font-bold mb-6 text-white'>
                Таблиця довідок
            </h1>

            {loading ? (
                <p className='text-white'>Завантаження...</p>
            ) : error ? (
                <p className='text-red-400'>{error}</p>
            ) : (
                <div className='max-w-4xl overflow-x-auto rounded-lg border border-[#3C4D6B] bg-[#171F2F] shadow-lg'>
                    <table className='w-full table-auto border-collapse text-[#D1D5DB]'>
                        <thead>
                            <tr className='bg-[#101828]'>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                    Паспорт
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                    Дата видачі
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                    Тип довідки
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
                            {references.length > 0 ? (
                                references.map((ref, index) => {
                                    const isEditing = editingRefId === ref.id;

                                    return (
                                        <tr
                                            key={ref.id || index}
                                            className={`${
                                                index % 2 === 0
                                                    ? "bg-[#1C263A]"
                                                    : "bg-[#141C2B]"
                                            } hover:bg-[#2F3F5B] transition-colors duration-200`}
                                        >
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
                                                    ref.passportNumber || "—"
                                                )}
                                            </td>
                                            <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                                {isEditing ? (
                                                    <input
                                                        type='date'
                                                        name='releaseDate'
                                                        value={
                                                            editForm.releaseDate
                                                        }
                                                        onChange={handleChange}
                                                        className='w-full bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1'
                                                        disabled={saving}
                                                    />
                                                ) : ref.releaseDate ? (
                                                    new Date(ref.releaseDate)
                                                        .toISOString()
                                                        .slice(0, 10)
                                                ) : (
                                                    "—"
                                                )}
                                            </td>
                                            <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                                {isEditing ? (
                                                    <input
                                                        type='text'
                                                        name='referenceType'
                                                        value={
                                                            editForm.referenceType
                                                        }
                                                        onChange={handleChange}
                                                        className='w-full bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1'
                                                        disabled={saving}
                                                    />
                                                ) : (
                                                    ref.referenceType || "—"
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
                                                            startEditing(ref)
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
                                                        handleDelete(ref.id)
                                                    }
                                                    disabled={
                                                        deleting === ref.id
                                                    }
                                                    title={`Видалити довідку ${ref.id}`}
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
                                        colSpan={5}
                                        className='py-4 text-center text-[#BFA18D] italic'
                                    >
                                        Дані відсутні
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

export default ReferencesTable;
