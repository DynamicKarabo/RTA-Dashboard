# Real-Time Analytics Dashboard

![Dashboard Preview](https://via.placeholder.com/1200x600/050505/ffffff?text=Real-Time+Analytics+Dashboard)

A high-performance, real-time data visualization dashboard designed to handle large-scale, high-frequency data streams. Built with **React**, **Vite**, **TypeScript**, and **Zustand**, this application demonstrates advanced frontend architecture and performance optimization techniques modeled after enterprise trading terminals and monitoring platforms (like Bloomberg or Datadog).

## 🚀 Key Features

- **Real-Time Data Streaming:** Simulates high-frequency data ingestion (200ms tick latency) pushing dynamic system metrics and event logs.
- **Ultra-Fast Visualizations:** Integrates `uPlot`—a blazing fast `<canvas>` charting library—to render thousands of data points without the overhead of SVG-based React reconciliation.
- **Virtualized Data Tables:** Employs `@tanstack/react-virtual` to seamlessly render logs streams containing 10,000+ entries, minimizing DOM nodes to maintain 60FPS scrolling.
- **Modular Dashboard Layout:** Uses `react-grid-layout` to provide a customizable, drag-and-drop widget grid.
- **Enterprise UI Design:** Features a custom, sophisticated dark-mode UI with sharp radii, deep `#050505` backgrounds, glassmorphism layers, and subtle terminal-grid textures.
- **Performance Optimized State:** Utilizes `Zustand` to manage a high-throughput data buffer, preventing costly global re-renders.

## 🛠️ Tech Stack

- **Framework:** React 18, Vite, TypeScript
- **State Management:** Zustand
- **Data Visualization:** uPlot (`uplot-react`)
- **Virtualization:** @tanstack/react-virtual
- **Layouting:** react-grid-layout
- **Styling:** Vanilla CSS variables and utility classes
- **Icons:** lucide-react

## 📂 Architecture Highlights

### **1. Zero-Rebel State Updates (Zustand)**
Standard React Context triggers re-renders across all consumers when a single property updates. By using `Zustand`, widgets subscribe *only* to the specific slices of state they need (e.g., the LineChart only rerenders when `metrics.cpu` updates).

### **2. Canvas over DOM (uPlot)**
Traditional charting libraries like Recharts render each data point as an SVG node. In high-frequency environments, this causes the DOM to balloon, halving framerates. `uPlot` draws directly to an HTML5 canvas, skipping React's virtual DOM entirely for the chart data, supporting incredible scale.

### **3. DOM Virtualization (TanStack)**
The event log simulates an ongoing stream that quickly reaches 10,000 items. Rendering 10k rows of complex HTML would freeze the browser. DOM virtualization ensures only the ~20 rows currently visible in the viewport actually exist in the HTML document.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rta-dashboard.git
   cd rta-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` to view the dashboard.

## 📈 Future Enhancements
- **WebSocket Backend:** Replace the local `StreamProvider` mock using a true `Socket.io` Node server.
- **Persistent Layouts:** Save the `react-grid-layout` JSON configuration to `localStorage` or a database.
- **Custom Tooltips:** Build overlaid React portals synced with the `uPlot` cursor to show rich data tooltips.

---
*Built to demonstrate Elite Frontend Engineering performance standards.*
