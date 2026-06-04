import { useEffect, useRef, useState } from 'react';
import { AnnouncementBar } from './AnnouncementBar';
import './Header.css';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const lastScroll = useRef(0);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      if (scrollY > lastScroll.current && scrollY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScroll.current = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      ref={headerRef}
      className="site-header"
      data-scrolled={scrolled}
      data-hidden={hidden}
    >
      <AnnouncementBar />
      <div className="nav-inner">
        <a href="/" className="nav-logo" aria-label="Home">
          <span className="nav-logo-icon">T</span>
          Task Manager
        </a>

        <nav className="nav-links" role="navigation">
          <div
            className={`nav-item${openMenu === 'tasks' ? ' is-open' : ''}`}
            onMouseEnter={() => setOpenMenu('tasks')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="nav-trigger">Tasks</button>
            <div className="mega-menu" role="dialog" aria-hidden={openMenu !== 'tasks'}>
              <div className="mega-menu-grid">
                <a className="mega-item" href="#all-tasks">
                  <span className="mega-category">All Tasks</span>
                  <span className="mega-desc">View and manage every task across all boards</span>
                </a>
                <a className="mega-item" href="#kanban">
                  <span className="mega-category">Kanban Board</span>
                  <span className="mega-desc">Drag-and-drop columns for visual workflow</span>
                </a>
                <a className="mega-item" href="#calendar">
                  <span className="mega-category">Calendar</span>
                  <span className="mega-desc">Tasks grouped by due date — coming soon</span>
                </a>
              </div>
            </div>
          </div>

          <div
            className={`nav-item${openMenu === 'stats' ? ' is-open' : ''}`}
            onMouseEnter={() => setOpenMenu('stats')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="nav-trigger">Stats</button>
            <div className="mega-menu" role="dialog" aria-hidden={openMenu !== 'stats'}>
              <div className="mega-menu-grid">
                <a className="mega-item" href="#cpu">
                  <span className="mega-category">CPU</span>
                  <span className="mega-desc">CPU usage and process monitoring — placeholder</span>
                </a>
                <a className="mega-item" href="#memory">
                  <span className="mega-category">Memory</span>
                  <span className="mega-desc">RAM usage and memory allocation — placeholder</span>
                </a>
                <a className="mega-item" href="#storage">
                  <span className="mega-category">Storage</span>
                  <span className="mega-desc">Disk usage and storage analytics — placeholder</span>
                </a>
              </div>
            </div>
          </div>

          <a className="nav-link" href="#settings">Settings</a>
        </nav>

        <div className="nav-ctas">
          <button className="nav-cta nav-cta--ghost">Log in</button>
          <button className="nav-cta nav-cta--primary">Sign up</button>
        </div>
      </div>
    </header>
  );
}
