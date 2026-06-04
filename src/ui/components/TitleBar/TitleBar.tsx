import './TitleBar.css';

export function TitleBar() {
  const handleMinimize = () => window.electron?.windowControls.minimize();
  const handleMaximize = () => window.electron?.windowControls.maximize();
  const handleClose = () => window.electron?.windowControls.close();

  return (
    <div className="title-bar">
      <span className="title-bar-label">Task Manager</span>
      <div className="title-bar-actions">
        <button className="title-bar-btn" onClick={handleMinimize} aria-label="Minimize">
          &#x2500;
        </button>
        <button className="title-bar-btn" onClick={handleMaximize} aria-label="Maximize">
          &#x25A1;
        </button>
        <button className="title-bar-btn title-bar-btn--close" onClick={handleClose} aria-label="Close">
          &#x2715;
        </button>
      </div>
    </div>
  );
}
