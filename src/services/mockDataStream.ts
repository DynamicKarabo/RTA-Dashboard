export interface SystemMetrics {
  cpu: { timestamp: number; value: number }[];
  memory: { timestamp: number; value: number }[];
  network: { timestamp: number; in: number; out: number }[];
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
  const cpu = [];
  const memory = [];
  const network = [];
  
  for (let i = count; i > 0; i--) {
    const t = now - i * 1000;
    cpu.push({ timestamp: t, value: 30 + Math.sin(t / 5000) * 20 + Math.random() * 10 });
    memory.push({ timestamp: t, value: 50 + Math.cos(t / 10000) * 30 + Math.random() * 5 });
    network.push({ timestamp: t, in: 100 + Math.random() * 50, out: 80 + Math.random() * 40 });
  }
  
  return { cpu, memory, network };
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
