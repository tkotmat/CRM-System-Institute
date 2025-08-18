import { useEffect, useState } from "react";
import { getRequest, deleteRequest, putRequest } from "../apiService";

const DepartmentTable = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const [editingDep, setEditingDep] = useState(null);
    const [editForm, setEditForm] = useState({
        departmentName: "",
        head: "",
        lecturerCount: 0,
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getRequest("/api/Department");
            setDepartments(data);
        } catch {
            setError("Помилка під час завантаження даних.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (departmentName) => {
        if (!window.confirm(`Видалити відділ "${departmentName}"?`)) return;
        try {
            setDeleting(departmentName);
            await deleteRequest(
                `/api/Department/${encodeURIComponent(departmentName)}`
            );
            setDepartments((prev) =>
                prev.filter((d) => d.departmentName !== departmentName)
            );
        } catch {
            alert("Помилка видалення відділу.");
        } finally {
            setDeleting(null);
        }
    };

    const startEditing = (dep) => {
        setEditingDep(dep.departmentName);
        setEditForm({
            departmentName: dep.departmentName,
            head: dep.head || "",
            lecturerCount: dep.lecturerCount || 0,
        });
    };

    const cancelEditing = () => {
        setEditingDep(null);
        setEditForm({ departmentName: "", head: "", lecturerCount: 0 });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({
            ...prev,
            [name]: name === "lecturerCount" ? Number(value) : value,
        }));
    };

    const saveChanges = async () => {
        if (!editForm.departmentName.trim()) {
            alert("Назва відділу не може бути порожньою");
            return;
        }
        setSaving(true);
        try {
            await putRequest(
                `/api/Department/${encodeURIComponent(editingDep)}`,
                {
                    departmentName: editForm.departmentName,
                    head: editForm.head,
                    lecturerCount: editForm.lecturerCount,
                }
            );
            setDepartments((prev) =>
                prev.map((d) =>
                    d.departmentName === editingDep ? { ...editForm } : d
                )
            );
            setEditingDep(null);
        } catch {
            alert("Помилка збереження змін.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-[#121212] font-sans min-h-screen text-[#D1D5DB] p-6">
            <h1 className="text-2xl font-bold mb-6 text-white">Відділи</h1>
            {loading ? (
                <p className="text-white">Завантаження...</p>
            ) : error ? (
                <p className="text-red-400">{error}</p>
            ) : (
                <div className="max-w-4xl overflow-x-auto rounded-lg border border-[#3C4D6B] bg-[#171F2F] shadow-lg">
                    <table className="w-full table-auto border-collapse text-[#D1D5DB]">
                        <thead>
                            <tr className="bg-[#101828]">
                                <th className="py-3 px-6 border-b border-[#3C4D6B] text-white text-left">
                                    Назва відділу
                                </th>
                                <th className="py-3 px-6 border-b border-[#3C4D6B] text-white text-left">
                                    Керівник
                                </th>
                                <th className="py-3 px-6 border-b border-[#3C4D6B] text-white text-right">
                                    Кількість викладачів
                                </th>
                                <th className="py-3 px-6 border-b border-[#3C4D6B] text-white text-center">
                                    Редагувати
                                </th>
                                <th className="py-3 px-6 border-b border-[#3C4D6B] text-white text-center">
                                    Видалити
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map((dep, index) => {
                                const isEditing =
                                    editingDep === dep.departmentName;

                                return (
                                    <tr
                                        key={
                                            dep.id ||
                                            `${dep.departmentName}-${index}`
                                        }
                                        className={`${
                                            index % 2 === 0
                                                ? "bg-[#1C263A]"
                                                : "bg-[#141C2B]"
                                        } hover:bg-[#2F3F5B] transition-colors duration-200`}
                                    >
                                        <td className="py-3 px-6 border-b border-[#3C4D6B]">
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="departmentName"
                                                    value={
                                                        editForm.departmentName
                                                    }
                                                    onChange={handleChange}
                                                    className="w-full bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1"
                                                    disabled={saving}
                                                />
                                            ) : (
                                                dep.departmentName || "—"
                                            )}
                                        </td>
                                        <td className="py-3 px-6 border-b border-[#3C4D6B]">
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="head"
                                                    value={editForm.head}
                                                    onChange={handleChange}
                                                    className="w-full bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1"
                                                    disabled={saving}
                                                />
                                            ) : (
                                                dep.head || "—"
                                            )}
                                        </td>
                                        <td className="py-3 px-6 border-b border-[#3C4D6B] text-right font-semibold">
                                            {isEditing ? (
                                                <input
                                                    type="number"
                                                    name="lecturerCount"
                                                    value={
                                                        editForm.lecturerCount
                                                    }
                                                    onChange={handleChange}
                                                    min={0}
                                                    className="w-20 bg-[#171F2F] text-white border border-gray-600 rounded px-2 py-1 text-right"
                                                    disabled={saving}
                                                />
                                            ) : (
                                                dep.lecturerCount ?? "—"
                                            )}
                                        </td>
                                        <td className="py-3 px-6 border-b border-[#3C4D6B] text-center">
                                            {isEditing ? (
                                                <>
                                                    <button
                                                        onClick={saveChanges}
                                                        disabled={saving}
                                                        className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white mr-2"
                                                        title="Сохранить изменения"
                                                    >
                                                        💾
                                                    </button>
                                                    <button
                                                        onClick={cancelEditing}
                                                        disabled={saving}
                                                        className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-white"
                                                        title="Отменить редактирование"
                                                    >
                                                        ✖
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        startEditing(dep)
                                                    }
                                                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
                                                    title="Редактировать"
                                                >
                                                    ✏️
                                                </button>
                                            )}
                                        </td>
                                        <td className="py-3 px-6 border-b border-[#3C4D6B] text-center">
                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        dep.departmentName
                                                    )
                                                }
                                                disabled={
                                                    deleting ===
                                                    dep.departmentName
                                                }
                                                title={`Удалить отдел ${dep.departmentName}`}
                                                className="bg-black hover:bg-gray-800 px-3 py-1 rounded text-red-500"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    className="w-5 h-5 mx-auto"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            {departments.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="py-4 text-center text-[#BFA18D] italic"
                                    >
                                        Нет данных по запросу
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

export default DepartmentTable;
