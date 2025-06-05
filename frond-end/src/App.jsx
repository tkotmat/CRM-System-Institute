import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Tect from "./Pages/tect";

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<Navigate to='/home' />} />
                <Route path='/home/*' element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;
