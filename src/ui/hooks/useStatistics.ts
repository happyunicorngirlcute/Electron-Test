import { useEffect } from 'react';

/**
 * PLACEHOLDER — IPC subscription is wired but data is NOT rendered.
 * TODO: Connect real CPU/RAM/storage data from IPC to StatsPanel
 *
 * Current behavior: subscribes to statistics IPC channel and logs to console.
 * No state is set or returned — this is intentional until real data integration.
 */
export function useStatistics() {
  useEffect(() => {
    if (!window.electron?.subscribeStatistics) return;

    const unsub = window.electron.subscribeStatistics(() => {
      // Placeholder: data received but not rendered
    });

    return () => unsub();
  }, []);
}
