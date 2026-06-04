import { useEffect, useState } from 'react';

export function useStatistics() {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [ramUsage, setRamUsage] = useState(0);
  const [storageUsage, setStorageUsage] = useState(0);
  const [totalStorageGB, setTotalStorageGB] = useState(0);
  const [totalMemoryGB, setTotalMemoryGB] = useState(0);

  useEffect(() => {
    if (!window.electron) return;

    window.electron.getStaticData().then((data) => {
      setTotalStorageGB(data.totalStorage);
      setTotalMemoryGB(data.totalMemoryGB);
    });

    const unsub = window.electron.subscribeStatistics((stats) => {
      setCpuUsage(stats.cpuUsage);
      setRamUsage(stats.ramUsage);
      setStorageUsage(stats.storageData.usage);
    });

    return () => unsub();
  }, []);

  return { cpuUsage, ramUsage, storageUsage, totalStorageGB, totalMemoryGB };
}
