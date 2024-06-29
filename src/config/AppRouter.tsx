import  DashboardScreen  from "../pages/DashboardScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
export default function AppRouter(){
    return <>
    <BrowserRouter>
        <Routes>
            <Route path="/dashboard/*" element={ <DashboardScreen/> }/>
        </Routes>
    </BrowserRouter>
    </>
}