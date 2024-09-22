import { Box } from "@chakra-ui/react";
import SIgnUp from "./components/SignUpPage/SIgnUp";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";

function App() {
    return (
        <Box>
            <Navbar />
            <Routes>
                <Route path = "/" element = {<SIgnUp />} />
                <Route path = "/home" element = {<HomePage />}/>
            </Routes>
        </Box>
    );
}

export default App;
