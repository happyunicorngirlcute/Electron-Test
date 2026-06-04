import { TasksProvider } from './context/TasksContext';
import { useStatistics } from './hooks/useStatistics';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { TaskManager } from './components/TaskManager/TaskManager';
import './App.css';

function AppContent() {
  useStatistics();

  return (
    <div className="app-layout">
      <Header />
      <Sidebar />
      <main className="app-main">
        <TaskManager />
      </main>
    </div>
  );
}

function App() {
  return (
    <TasksProvider>
      <AppContent />
    </TasksProvider>
  );
}

export default App;
