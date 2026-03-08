import { create } from 'zustand';
import { type SystemMetrics, type LogEntry, generateInitialMetrics, generateInitialLogs } from '../services/mockDataStream';
// Wait, path was 'services/mockDataStream', not 'услуги'

interface AppState {
  isStreaming: boolean;
  setIsStreaming: (isStreaming: boolean) => void;
  metrics: SystemMetrics;
  logs: LogEntry[];
  activeUsers: number;
  addMetricTick: (cpu: number, memory: number, netIn: number, netOut: number) => void;
  addLogEntry: (log: LogEntry) => void;
  updateActiveUsers: (count: number) => void;
}

const MAX_TICKS = 100;

export const useStore = create<AppState>()((set) => ({
  isStreaming: true,
  setIsStreaming: (isStreaming) => set({ isStreaming }),
  
  metrics: generateInitialMetrics(MAX_TICKS),
  logs: generateInitialLogs(10000), // Pre-fill 10k logs for virtualized table test
  activeUsers: 1402,
  
  addMetricTick: (cpu, memory, netIn, netOut) => set((state) => {
    const now = Date.now();
    const newCpu = [...state.metrics.cpu.slice(1), { timestamp: now, value: cpu }];
    const newMemory = [...state.metrics.memory.slice(1), { timestamp: now, value: memory }];
    const newNetwork = [...state.metrics.network.slice(1), { timestamp: now, in: netIn, out: netOut }];
    
    // Update OHLC logic - every 5s roughly
    let newOhlc = [...state.metrics.ohlc];
    if (newOhlc.length > 0) {
      const last = newOhlc[newOhlc.length - 1];
      if (now - last.timestamp > 5000) {
        // Create new candle
        const open = last.close;
        newOhlc = [...newOhlc.slice(1), { timestamp: now, open, high: open, low: open, close: open }];
      } else {
        // Update current candle
        const current = { ...last };
        current.high = Math.max(current.high, cpu + 100); // Using CPU as a base for variety
        current.low = Math.min(current.low, cpu + 100);
        current.close = cpu + 100;
        newOhlc[newOhlc.length - 1] = current;
      }
    }
    
    return {
      metrics: { cpu: newCpu, memory: newMemory, network: newNetwork, ohlc: newOhlc }
    };
  }),
  
  addLogEntry: (log) => set((state) => ({
    logs: [log, ...state.logs].slice(0, 10000) // Keep max 10k items
  })),
  
  updateActiveUsers: (count) => set({ activeUsers: count })
}));
