import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "./components/SignUpPage/SIgnUp";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import { useUser } from "./context/userContext";
import Gallery from "./components/Gallery/Gallery";

function App() {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && window.location.pathname === '/') {
            navigate('/home');
        }
    }, [user, navigate]);

    return (
        <Box>
            <Navbar />
            <Routes>
                {!user ? (
                    <Route path="/" element={<SignUp />} />
                ) : (
                    <>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/gallery" element={<Gallery />} />
                    </>
                )}
            </Routes>
        </Box>
    );
}

export default App;
