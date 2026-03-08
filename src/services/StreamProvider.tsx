import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';

export const StreamProvider: React.FC = () => {
  const isStreaming = useStore(state => state.isStreaming);
  const addMetricTick = useStore(state => state.addMetricTick);
  const addLogEntry = useStore(state => state.addLogEntry);
  const updateActiveUsers = useStore(state => state.updateActiveUsers);

  useEffect(() => {
    if (!isStreaming) return;

    let tickCount = 0;
    const interval = setInterval(() => {
      tickCount++;
      const now = Date.now();
      
      // Simulate real-time metrics
      const cpu = 30 + Math.sin(now / 5000) * 20 + Math.random() * 10;
      const memory = 50 + Math.cos(now / 10000) * 30 + Math.random() * 5;
      const netIn = 100 + Math.random() * 50;
      const netOut = 80 + Math.random() * 40;
      addMetricTick(cpu, memory, netIn, netOut);

      // Simulate occasional log entries
      if (Math.random() > 0.8) {
        const services = ['api-gateway', 'auth-service', 'db-worker', 'payment-processor'];
        const levels = ['INFO', 'INFO', 'WARN', 'ERROR'];
        addLogEntry({
          id: `log-${Date.now()}-${Math.random()}`,
          timestamp: now,
          level: levels[Math.floor(Math.random() * levels.length)] as 'INFO' | 'WARN' | 'ERROR',
          service: services[Math.floor(Math.random() * services.length)],
          message: `Dynamic stream event simulated payload packet bytes=10${Math.floor(Math.random() * 100)}`
        });
      }

      // Simulate active users jittering
      if (tickCount % 5 === 0) {
        updateActiveUsers(1402 + Math.floor(Math.random() * 50) - 25);
      }
    }, 200); // 200ms tick latency

    return () => clearInterval(interval);
  }, [isStreaming, addMetricTick, addLogEntry, updateActiveUsers]);

  return null;
};
