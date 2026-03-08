export interface OHLC {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface SystemMetrics {
  cpu: { timestamp: number; value: number }[];
  memory: { timestamp: number; value: number }[];
  network: { timestamp: number; in: number; out: number }[];
  ohlc: OHLC[];
}

export type LogEntry = {
  id: string;
  timestamp: number;
  level: 'INFO' | 'WARN' | 'ERROR';
  service: string;
  message: string;
};

// Generates an initial buffer of sine wave / random data for beautiful charts
export function generateInitialMetrics(count: number): SystemMetrics {
  const now = Date.now();
  const cpu: { timestamp: number; value: number }[] = [];
  const memory: { timestamp: number; value: number }[] = [];
  const network: { timestamp: number; in: number; out: number }[] = [];
  
  const ohlc: OHLC[] = [];
  let lastClose = 150;
  
  for (let i = count; i > 0; i--) {
    const t = now - i * 5000; // 5s intervals for OHLC
    const open = lastClose + (Math.random() - 0.5) * 5;
    const high = open + Math.random() * 5;
    const low = open - Math.random() * 5;
    const close = low + Math.random() * (high - low);
    ohlc.push({ timestamp: t, open, high, low, close });
    lastClose = close;
  }
  
  return { cpu, memory, network, ohlc };
}

export function generateInitialLogs(count: number): LogEntry[] {
  const now = Date.now();
  const logs: LogEntry[] = [];
  const services = ['api-gateway', 'auth-service', 'db-worker', 'payment-processor'];
  const levels: ('INFO' | 'WARN' | 'ERROR')[] = ['INFO', 'INFO', 'INFO', 'WARN', 'ERROR'];
  
  for (let i = 0; i < count; i++) {
    logs.push({
      id: `log-${i}`,
      timestamp: now - i * 500,
      level: levels[Math.floor(Math.random() * levels.length)],
      service: services[Math.floor(Math.random() * services.length)],
      message: `System event recorded at interaction point.`,
    });
  }
  return logs;
}
