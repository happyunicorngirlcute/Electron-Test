export interface IElectronAPI {
  getStaticData: () => void;
  subscribeStatistics: (callback: (statistics: any) => void) => void;
}

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}