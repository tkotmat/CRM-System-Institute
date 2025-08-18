import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import { AccessCode } from "./Components/AsccesCode";

function App() {
    const accessGranted = sessionStorage.getItem("accessGranted") === "true";

    return (
        <div className="App">
            <Routes>
                {!accessGranted && <Route path="*" element={<AccessCode />} />}

                {accessGranted && (
                    <>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home/*" element={<Home />} />
                    </>
                )}
            </Routes>
        </div>
    );
}

export default App;
