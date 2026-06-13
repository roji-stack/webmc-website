import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/index";
import ProjectsPage from "./pages/projects/index";
import ProjectDetailPage from "./pages/projects/[slug]";
import CompetitionsPage from "./pages/competitions";
import TeamPage from "./pages/team";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/competitions" element={<CompetitionsPage />} />
        <Route path="/team" element={<TeamPage />} />
      </Routes>
    </Router>
  );
}
