type Statistics = {
  cpuUsage: number;
  ramUsage: number;
  storageData: {
    usage: number;
  };
};

type StaticData = {
  totalStorage: number;
  cpuModel: string;
  totalMemoryGB: number;
};

type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
};

type UnsubscribeFunction = () => void;

interface WindowControls {
  minimize: () => void;
  maximize: () => void;
  close: () => void;
}

interface Window {
    electron: {
        subscribeStatistics: (callback: (statistics: Statistics) => void) => UnsubscribeFunction;
        getStaticData: () => Promise<StaticData>;
        windowControls: WindowControls;
    };
}
