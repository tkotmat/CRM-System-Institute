import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Layout = () => {
    const [showSubmenu, setShowSubmenu] = useState(false);
    const [showPhonesSubmenu, setShowPhonesSubmenu] = useState(false);
    const [showReportsSubmenu, setShowReportsSubmenu] = useState(false);
    const [showNewSubmenu, setShowNewSubmenu] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = () => {
        if (location.pathname !== "/home") {
            navigate("/home");
        }
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 h-16 bg-[#1C263A] border-b border-[#2F3F5B] flex justify-between items-center px-6 shadow-md z-30">
                <h1 className="text-3xl font-bold text-white">
                    CRM-System-Institute
                </h1>
                <button
                    className="bg-[#E6A17E] hover:bg-[#C77C4E] text-[#121212] font-semibold py-2 px-4 rounded transition"
                    onClick={handleClick}
                >
                    Закрить
                </button>
            </header>

            <aside
                className="fixed top-16 left-0 bottom-0 w-64 bg-[#1A1F2D] p-6 border-r border-[#2F3F5B] hidden md:block overflow-auto"
                style={{ zIndex: 20 }}
            >
                <h2 className="text-3xl text-white font-semibold mb-4 ">
                    Навігація
                </h2>
                <nav className="space-y-1">
                    <button
                        className="w-full text-left text-[#AFC6E0] hover:text-[#E6A17E] text-2xl transition font-medium py-1"
                        onClick={() => setShowSubmenu((prev) => !prev)}
                    >
                        Таблиці
                    </button>

                    {showSubmenu && (
                        <div className="ml-4 mt-1 flex flex-col space-y-1">
                            <div
                                onMouseEnter={() => setShowPhonesSubmenu(true)}
                                onMouseLeave={() => setShowPhonesSubmenu(false)}
                                className="relative"
                            >
                                <Link
                                    to="/home/tables/employeers"
                                    className="text-[#AFC6E0] hover:text-[#E6A17E] text-lg block cursor-pointer"
                                >
                                    Працівники
                                </Link>

                                {showPhonesSubmenu && (
                                    <Link
                                        to="/home/tables/employeers/nambers-phones"
                                        className="block mt-1 ml-4 text-[#E6A17E] text-lg hover:text-[#C77C4E] transition"
                                    >
                                        Номери телефонів
                                    </Link>
                                )}
                            </div>

                            <Link
                                to="/home/tables/vacations"
                                className="text-[#AFC6E0] hover:text-[#E6A17E] text-lg"
                            >
                                Відпустка
                            </Link>
                            <Link
                                to="/home/tables/pedagogical-load"
                                className="text-[#AFC6E0] hover:text-[#E6A17E] text-lg"
                            >
                                Педагогічне навантаження
                            </Link>
                            <Link
                                to="/home/tables/department"
                                className="text-[#AFC6E0] hover:text-[#E6A17E] text-lg"
                            >
                                Відділ
                            </Link>
                            <Link
                                to="/home/tables/references"
                                className="text-[#AFC6E0] hover:text-[#E6A17E] text-lg"
                            >
                                Список літератури
                            </Link>
                        </div>
                    )}

                    <button
                        className="w-full text-left text-[#AFC6E0] hover:text-[#E6A17E] text-2xl transition font-medium py-1"
                        onClick={() => setShowReportsSubmenu((prev) => !prev)}
                    >
                        Заповнення
                    </button>

                    {showReportsSubmenu && (
                        <div className="ml-4 mt-1 flex flex-col space-y-1">
                            <Link
                                to="/home/forms/employeers"
                                className="text-[#AFC6E0] hover:text-[#E6A17E] text-lg"
                            >
                                Працівники
                            </Link>
                            <Link
                                to="/home/forms/employeers/nambers-phones"
                                className="text-[#AFC6E0] hover:text-[#E6A17E] text-lg"
                            >
                                Номери телефонів
                            </Link>
                            <Link
                                to="/home/forms/vacations"
                                className="text-[#AFC6E0] hover:text-[#E6A17E] text-lg"
                            >
                                Відпустка
                            </Link>
                            <Link
                                to="/home/forms/pedagogical-load"
                                className="text-[#AFC6E0] hover:text-[#E6A17E] text-lg"
                            >
                                Педагогічне навантаження
                            </Link>
                            <Link
                                to="/home/forms/department"
                                className="text-[#AFC6E0] hover:text-[#E6A17E] text-lg"
                            >
                                Відділ
                            </Link>
                            <Link
                                to="/home/forms/references"
                                className="text-[#AFC6E0] hover:text-[#E6A17E] text-lg"
                            >
                                Довідки
                            </Link>
                        </div>
                    )}

                    <button
                        className="w-full text-left text-[#AFC6E0] hover:text-[#E6A17E]  text-2xl transition font-medium py-1"
                        onClick={() => setShowNewSubmenu((prev) => !prev)}
                    >
                        Запити
                    </button>

                    {showNewSubmenu && (
                        <div className="ml-4 mt-1 flex flex-col space-y-1">
                            <Link
                                to="/home/requet/average-load-assistants"
                                className="text-[#AFC6E0] hover:text-[#E6A17E] text-lg"
                            >
                                Середнє навантаження асистентів
                            </Link>
                            <Link
                                to="/home/requet/disciplines"
                                className="text-[#AFC6E0] hover:text-[#E6A17E] text-lg"
                            >
                                Дисципліни
                            </Link>
                            <Link
                                to="/home/requet/disciplines-by-associate-professors"
                                className="text-[#AFC6E0] hover:text-[#E6A17E] text-lg"
                            >
                                Дисципліни за доцентами
                            </Link>
                            <Link
                                to="/home/requet/employees-on-leave"
                                className="text-[#AFC6E0] hover:text-[#E6A17E] text-lg"
                            >
                                Працівники у відпустці
                            </Link>
                            <Link
                                to="/home/requet/expired-contracts-teachers"
                                className="text-[#AFC6E0] hover:text-[#E6A17E] text-lg"
                            >
                                Вчителі з простроченими контрактами
                            </Link>
                            <Link
                                to="/home/requet/teachers-by-category-count"
                                className="text-[#AFC6E0] hover:text-[#E6A17E] text-lg"
                            >
                                Вчителі за категоріями
                            </Link>
                            <Link
                                to="/home/requet/teachers-by-department"
                                className="text-[#AFC6E0] hover:text-[#E6A17E] text-lg"
                            >
                                Вчителі за відділом
                            </Link>
                            <Link
                                to="/home/requet/war-veteran-medal-employees"
                                className="text-[#AFC6E0] hover:text-[#E6A17E] text-lg"
                            >
                                Працівники з медаллю ветерана війни
                            </Link>
                            <Link
                                to="/home/requet/work-duration"
                                className="text-[#AFC6E0] hover:text-[#E6A17E] text-lg"
                            >
                                Тривалість роботи
                            </Link>
                        </div>
                    )}
                </nav>
            </aside>
        </>
    );
};

export default Layout;
