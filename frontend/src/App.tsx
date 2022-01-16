import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LogosHeader from "./components/LogosHeader";
import Navbar from "./components/Navbar";
import Discussion from "./pages/Discussion";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import Overview from "./pages/Overview";
import Rules from "./pages/Rules";
import Submission from "./pages/Submission";
function App() {
  return (
    <div className="bg-gray-100 min-h-screen text-slate-700">
      <div className="container mx-auto px-4 rounded-sm">
        <header>
          <LogosHeader />
        </header>
        <Navbar />

        <main>
          <Routes>
            <Route
              path={"/"}
              element={<Navigate to="/overview" replace={true} />}
            />
            <Route path={"/overview/*"} element={<Overview />} />
            <Route path={"/leaderboard/*"} element={<Leaderboard />} />
            <Route path={"/submission/*"} element={<Submission />} />
            <Route path={"/rules"} element={<Rules />} />
            <Route path={"/discussion"} element={<Discussion />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"*"} element={<NoMatch />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
