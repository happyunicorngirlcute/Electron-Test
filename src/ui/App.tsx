import { TasksProvider } from './context/TasksContext';
import { TitleBar } from './components/TitleBar/TitleBar';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { TaskManager } from './components/TaskManager/TaskManager';
import './App.css';

function AppContent() {
  return (
    <div className="app-layout">
      <TitleBar />
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
