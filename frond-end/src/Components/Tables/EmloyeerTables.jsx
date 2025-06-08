import { useEffect, useState } from "react";
import { getRequest, deleteRequest, putRequest } from "../apiService";

const EmloyeerTables = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const [editingEmp, setEditingEmp] = useState(null);
    const [editForm, setEditForm] = useState({
        passportNumber: "",
        firstName: "",
        lastName: "",
        tin: "",
        departmentName: "",
        position: "",
        category: "",
        workExperience: 0,
        contractStartDate: "",
        contractEndDate: "",
        isWarVeteran: false,
        city: "",
        street: "",
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getRequest("/api/Employee");
            setEmployees(data);
        } catch {
            setError("Помилка під час завантаження даних.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (passportNumber) => {
        if (
            !window.confirm(
                `Видалити співробітника з паспортом "${passportNumber}"?`
            )
        )
            return;
        try {
            setDeleting(passportNumber);
            await deleteRequest(
                `/api/Employee/${encodeURIComponent(passportNumber)}`
            );
            setEmployees((prev) =>
                prev.filter((emp) => emp.passportNumber !== passportNumber)
            );
        } catch {
            alert("Помилка при видаленні працівника.");
        } finally {
            setDeleting(null);
        }
    };

    const startEditing = (emp) => {
        setEditingEmp(emp.passportNumber);
        setEditForm({
            passportNumber: emp.passportNumber || "",
            firstName: emp.firstName || "",
            lastName: emp.lastName || "",
            tin: emp.tin || "",
            departmentName: emp.departmentName || "",
            position: emp.position || "",
            category: emp.category || "",
            workExperience: emp.workExperience || 0,
            contractStartDate: emp.contractStartDate
                ? emp.contractStartDate.slice(0, 10)
                : "",
            contractEndDate: emp.contractEndDate
                ? emp.contractEndDate.slice(0, 10)
                : "",
            isWarVeteran: !!emp.isWarVeteran,
            city: emp.city || "",
            street: emp.street || "",
        });
    };

    const cancelEditing = () => {
        setEditingEmp(null);
        setEditForm({
            passportNumber: "",
            firstName: "",
            lastName: "",
            tin: "",
            departmentName: "",
            position: "",
            category: "",
            workExperience: 0,
            contractStartDate: "",
            contractEndDate: "",
            isWarVeteran: false,
            city: "",
            street: "",
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const saveChanges = async () => {
        if (!editForm.passportNumber.trim()) {
            alert("Паспортний номер не може бути порожнім");
            return;
        }
        setSaving(true);
        try {
            await putRequest(
                `/api/Employee/${encodeURIComponent(editingEmp)}`,
                editForm
            );
            setEmployees((prev) =>
                prev.map((emp) =>
                    emp.passportNumber === editingEmp ? { ...editForm } : emp
                )
            );
            setEditingEmp(null);
        } catch {
            alert("Помилка збереження змін.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className='bg-[#121212] font-sans min-h-screen text-[#D1D5DB] p-6'>
            <h1 className='text-2xl font-bold mb-6 text-white'>
                Співробітники
            </h1>

            {loading ? (
                <p className='text-white'>Завантаження...</p>
            ) : error ? (
                <p className='text-red-400'>{error}</p>
            ) : (
                <div className='max-w-full rounded-lg border border-[#3C4D6B] bg-[#171F2F] shadow-lg'>
                    <table className='w-full table-auto border-collapse text-[#D1D5DB]'>
                        <thead>
                            <tr className='bg-[#101828]'>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                    Паспорт
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                    Ім'я
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                    Прізвище
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                    ІПН
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                    Відділ
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                    Посада
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                    Категорія
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-right'>
                                    Стаж роботи
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                    Початок контракту
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                    Кінець контракту
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-center'>
                                    Ветеран ВВВ
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                    Місто
                                </th>
                                <th className='py-3 px-6 border-b border-[#3C4D6B] text-white text-left'>
                                    Вулиця
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
                            {employees.map((emp, index) => {
                                const isEditing =
                                    editingEmp === emp.passportNumber;

                                return (
                                    <tr
                                        key={emp.passportNumber || index}
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
                                                    name='passportNumber'
                                                    value={
                                                        editForm.passportNumber
                                                    }
                                                    onChange={handleChange}
                                                    className='w-full bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1'
                                                    disabled={saving}
                                                />
                                            ) : (
                                                emp.passportNumber || "—"
                                            )}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                            {isEditing ? (
                                                <input
                                                    type='text'
                                                    name='firstName'
                                                    value={editForm.firstName}
                                                    onChange={handleChange}
                                                    className='w-full bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1'
                                                    disabled={saving}
                                                />
                                            ) : (
                                                emp.firstName || "—"
                                            )}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                            {isEditing ? (
                                                <input
                                                    type='text'
                                                    name='lastName'
                                                    value={editForm.lastName}
                                                    onChange={handleChange}
                                                    className='w-full bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1'
                                                    disabled={saving}
                                                />
                                            ) : (
                                                emp.lastName || "—"
                                            )}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                            {isEditing ? (
                                                <input
                                                    type='text'
                                                    name='tin'
                                                    value={editForm.tin}
                                                    onChange={handleChange}
                                                    className='w-full bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1'
                                                    disabled={saving}
                                                />
                                            ) : (
                                                emp.tin || "—"
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
                                                emp.departmentName || "—"
                                            )}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                            {isEditing ? (
                                                <input
                                                    type='text'
                                                    name='position'
                                                    value={editForm.position}
                                                    onChange={handleChange}
                                                    className='w-full bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1'
                                                    disabled={saving}
                                                />
                                            ) : (
                                                emp.position || "—"
                                            )}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                            {isEditing ? (
                                                <input
                                                    type='text'
                                                    name='category'
                                                    value={editForm.category}
                                                    onChange={handleChange}
                                                    className='w-full bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1'
                                                    disabled={saving}
                                                />
                                            ) : (
                                                emp.category || "—"
                                            )}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B] text-right'>
                                            {isEditing ? (
                                                <input
                                                    type='number'
                                                    name='workExperience'
                                                    value={
                                                        editForm.workExperience
                                                    }
                                                    onChange={handleChange}
                                                    min={0}
                                                    className='w-20 bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1 text-right'
                                                    disabled={saving}
                                                />
                                            ) : (
                                                emp.workExperience ?? "—"
                                            )}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                            {isEditing ? (
                                                <input
                                                    type='date'
                                                    name='contractStartDate'
                                                    value={
                                                        editForm.contractStartDate
                                                    }
                                                    onChange={handleChange}
                                                    className='bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1'
                                                    disabled={saving}
                                                />
                                            ) : emp.contractStartDate ? (
                                                emp.contractStartDate.slice(
                                                    0,
                                                    10
                                                )
                                            ) : (
                                                "—"
                                            )}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                            {isEditing ? (
                                                <input
                                                    type='date'
                                                    name='contractEndDate'
                                                    value={
                                                        editForm.contractEndDate
                                                    }
                                                    onChange={handleChange}
                                                    className='bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1'
                                                    disabled={saving}
                                                />
                                            ) : emp.contractEndDate ? (
                                                emp.contractEndDate.slice(0, 10)
                                            ) : (
                                                "—"
                                            )}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B] text-center'>
                                            {isEditing ? (
                                                <input
                                                    type='checkbox'
                                                    name='isWarVeteran'
                                                    checked={
                                                        editForm.isWarVeteran
                                                    }
                                                    onChange={handleChange}
                                                    disabled={saving}
                                                />
                                            ) : emp.isWarVeteran ? (
                                                "✔️"
                                            ) : (
                                                "—"
                                            )}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                            {isEditing ? (
                                                <input
                                                    type='text'
                                                    name='city'
                                                    value={editForm.city}
                                                    onChange={handleChange}
                                                    className='w-full bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1'
                                                    disabled={saving}
                                                />
                                            ) : (
                                                emp.city || "—"
                                            )}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B]'>
                                            {isEditing ? (
                                                <input
                                                    type='text'
                                                    name='street'
                                                    value={editForm.street}
                                                    onChange={handleChange}
                                                    className='w-full bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1'
                                                    disabled={saving}
                                                />
                                            ) : (
                                                emp.street || "—"
                                            )}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B] text-center whitespace-nowrap'>
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
                                                        title='Скасувати редагування'
                                                    >
                                                        ✖
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        startEditing(emp)
                                                    }
                                                    className='bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white'
                                                    title='Редагувати співробітника'
                                                >
                                                    ✏️
                                                </button>
                                            )}
                                        </td>
                                        <td className='py-3 px-6 border-b border-[#3C4D6B] text-center whitespace-nowrap'>
                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        emp.passportNumber
                                                    )
                                                }
                                                disabled={
                                                    deleting ===
                                                    emp.passportNumber
                                                }
                                                className='bg-black hover:bg-gray-800 px-3 py-1 rounded text-red-500'
                                                title='Видалити співробітника'
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

export default EmloyeerTables;
