import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Components/Layout";

import EmloyeerTables from "../Components/Tables/EmloyeerTables";
import VacationTables from "../Components/Tables/VacationTables";
import PedagogicalLoadTables from "../Components/Tables/PedagogicalLoadTable";
import ReferencesTable from "../Components/Tables/ReferencesTable";
import DepartmentTable from "../Components/Tables/DepartmentTable";
import PhoneEmployeeTable from "../Components/Tables/PhoneEmployeeTable";

import EmployeeForm from "../Components/Forms/EmployeeForm";
import PhoneEmployeeForm from "../Components/Forms/PhoneEmployeeForm";
import DepartmentForm from "../Components/Forms/DepartmentForm";
import PedagogicalLoadForm from "../Components/Forms/PedagogicalLoadForm";
import ReferencesForm from "../Components/Forms/ReferencesForm";
import VacationForm from "../Components/Forms/VacationForm";

import AverageLoadAssistants from "../Components/Request/AverageLoadAssistants";
import Disciplines from "../Components/Request/Disciplines";
import DisciplinesByAssociateProfessors from "../Components/Request/DisciplinesByAssociateProfessors";
import EmployeesOnLeave from "../Components/Request/EmployeesOnLeave";
import ExpiredContractsTeachers from "../Components/Request/ExpiredContractsTeachers";
import TeachersByCategoryCount from "../Components/Request/TeachersByCategoryCount";
import TeachersByDepartment from "../Components/Request/TeachersByDepartment";
import WarVeteranMedalEmployees from "../Components/Request/WarVeteranMedalEmployees";
import WorkDuration from "../Components/Request/WorkDuration";

const Home = () => {
    return (
        <div className='bg-[#121212] font-sans min-h-screen text-[#D1D5DB] flex'>
            <Layout />
            <main className='flex-1 p-6 mt-16 ml-64 min-h-screen'>
                <Routes>
                    <Route
                        path='/'
                        element={<p>Добро пожаловать в админку!</p>}
                    />
                    <Route
                        path='/tables/employeers'
                        element={<EmloyeerTables />}
                    />
                    <Route
                        path='/tables/vacations'
                        element={<VacationTables />}
                    />
                    <Route
                        path='/tables/pedagogical-load'
                        element={<PedagogicalLoadTables />}
                    />
                    <Route
                        path='/tables/references'
                        element={<ReferencesTable />}
                    />
                    <Route
                        path='/tables/department'
                        element={<DepartmentTable />}
                    />
                    <Route
                        path='/tables/employeers/nambers-phones'
                        element={<PhoneEmployeeTable />}
                    />

                    <Route
                        path='/forms/employeers'
                        element={<EmployeeForm />}
                    />
                    <Route
                        path='/forms/employeers/nambers-phones'
                        element={<PhoneEmployeeForm />}
                    />
                    <Route path='/forms/vacations' element={<VacationForm />} />
                    <Route
                        path='/forms/pedagogical-load'
                        element={<PedagogicalLoadForm />}
                    />
                    <Route
                        path='/forms/references'
                        element={<ReferencesForm />}
                    />
                    <Route
                        path='/forms/department'
                        element={<DepartmentForm />}
                    />

                    <Route
                        path='/requet/average-load-assistants'
                        element={<AverageLoadAssistants />}
                    />
                    <Route
                        path='/requet/disciplines'
                        element={<Disciplines />}
                    />
                    <Route
                        path='/requet/disciplines-by-associate-professors'
                        element={<DisciplinesByAssociateProfessors />}
                    />
                    <Route
                        path='/requet/employees-on-leave'
                        element={<EmployeesOnLeave />}
                    />
                    <Route
                        path='/requet/expired-contracts-teachers'
                        element={<ExpiredContractsTeachers />}
                    />
                    <Route
                        path='/requet/teachers-by-category-count'
                        element={<TeachersByCategoryCount />}
                    />
                    <Route
                        path='/requet/teachers-by-department'
                        element={<TeachersByDepartment />}
                    />
                    <Route
                        path='/requet/war-veteran-medal-employees'
                        element={<WarVeteranMedalEmployees />}
                    />
                    <Route
                        path='/requet/work-duration'
                        element={<WorkDuration />}
                    />
                </Routes>
            </main>
        </div>
    );
};

export default Home;
