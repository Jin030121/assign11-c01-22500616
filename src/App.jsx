import CourseList from './components/CourseList.jsx';

export default function App() {
  return (
    <main className="page">
      <header className="hero">
        <div>
          <p className="topline">COURSE PLANNING · SEMESTER TRACKER</p>
          <h1>My Semester Planner</h1>
          <p className="subtitle">
            Organize your courses and track your progress throughout the semester.
          </p>
        </div>
        <span className="tag">MY STUDY PLAN</span>
      </header>

      <CourseList />

      <footer className="bottom">
        <span>Semester Planner · React</span>
        <span>Session-only progress · Refresh resets data</span>
      </footer>
    </main>
  );
}