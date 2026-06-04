import { useEffect, useRef, useState } from 'react';
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
      <div className="nav-inner">
        <a href="/" className="nav-logo" aria-label="Home">
          Tasks
        </a>

        <nav className="nav-links" role="navigation">
          <div
            className={`nav-item${openMenu === 'tasks' ? ' is-open' : ''}`}
            onMouseEnter={() => setOpenMenu('tasks')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="nav-trigger">Boards</button>
            <div className="mega-menu" role="dialog" aria-hidden={openMenu !== 'tasks'}>
              <div className="mega-menu-grid">
                <a className="mega-item" href="#all-tasks">
                  <span className="mega-category">All Tasks</span>
                  <span className="mega-desc">View and manage every task across all boards</span>
                </a>
                <a className="mega-item" href="#kanban">
                  <span className="mega-category">Kanban Board</span>
                  <span className="mega-desc">Organize work across backlog, in-progress, and done columns</span>
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
            <button className="nav-trigger">System</button>
            <div className="mega-menu" role="dialog" aria-hidden={openMenu !== 'stats'}>
              <div className="mega-menu-grid">
                <a className="mega-item" href="#cpu">
                  <span className="mega-category">CPU</span>
                  <span className="mega-desc">Processor utilization and workload distribution</span>
                </a>
                <a className="mega-item" href="#memory">
                  <span className="mega-category">Memory</span>
                  <span className="mega-desc">RAM consumption and allocation details</span>
                </a>
                <a className="mega-item" href="#storage">
                  <span className="mega-category">Storage</span>
                  <span className="mega-desc">Disk usage and available capacity</span>
                </a>
              </div>
            </div>
          </div>

        </nav>
      </div>
    </header>
  );
}
