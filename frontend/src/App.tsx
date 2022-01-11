import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import EventDescription from "./components/EventDescription";
import LogosHeader from "./components/LogosHeader";
import Navbar from "./components/Navbar";
import Discussion from "./pages/Discussion";
import Leaderboard from "./pages/Leaderboard";
import NoMatch from "./pages/NoMatch";
import Overview from "./pages/Overview";
import Submission from "./pages/Submission";
function App() {
  return (
    <div className="bg-gray-100 min-h-screen text-slate-700">
      <div className="container mx-auto p-4 rounded-sm">
        <LogosHeader />
        <EventDescription />

        <Navbar />

        <Routes>
          <Route
            path={"/"}
            element={<Navigate to="/overview" replace={true} />}
          />
          <Route path={"/overview"} element={<Overview />} />
          <Route path={"/leaderboard"} element={<Leaderboard />} />
          <Route path={"/submission"} element={<Submission />} />
          <Route path={"/discussion"} element={<Discussion />} />
          <Route path={"*"} element={<NoMatch />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
