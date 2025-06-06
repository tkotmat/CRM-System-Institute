import React, { useEffect, useState } from "react";
import { getRequest } from "../apiService";

const TeachersByCategoryCount = () => {
    const [counts, setCounts] = useState({});
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRequest("/api/Employee");
                const categoryCount = {};

                data.forEach((teacher) => {
                    const category = teacher.position?.trim() || "Невідомо";
                    categoryCount[category] =
                        (categoryCount[category] || 0) + 1;
                });

                setCounts(categoryCount);
                setCategories(Object.keys(categoryCount));
            } catch (err) {
                setError("Помилка при завантаженні даних.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const displayCounts = selectedCategory
        ? { [selectedCategory]: counts[selectedCategory] }
        : counts;

    return (
        <div className='bg-[#121212] text-[#D1D5DB] p-6 rounded-lg'>
            <h2 className='text-2xl font-bold mb-4 text-white'>
                Кількість викладачів по категоріях
            </h2>

            {loading ? (
                <p>Завантаження...</p>
            ) : error ? (
                <p className='text-red-400'>{error}</p>
            ) : (
                <>
                    <div className='mb-4'>
                        <label className='block mb-2'>
                            Виберіть категорію:
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={handleChange}
                            className='w-full md:w-1/2 px-4 py-2 bg-[#121212] border border-[#3C4D6B] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E6A17E]'
                        >
                            <option value=''>Усі категорії</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <ul className='space-y-2'>
                        {Object.entries(displayCounts).map(
                            ([category, count]) => (
                                <li
                                    key={category}
                                    className='bg-[#1C263A] px-4 py-2 rounded'
                                >
                                    <span className='font-semibold'>
                                        {category}:
                                    </span>{" "}
                                    {count}
                                </li>
                            )
                        )}
                    </ul>
                </>
            )}
        </div>
    );
};

export default TeachersByCategoryCount;
