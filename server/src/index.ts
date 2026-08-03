import { env } from './config/env.js'; // loads dotenv as a side effect — must be first
import { createApp } from './app.js';

/**
 * Server entry point — the only file that touches the network.
 * Responsibilities: build the app, bind the port, handle shutdown signals.
 */
const app = createApp();

const server = app.listen(env.port, () => {
  console.log('');
  console.log('  ┌─────────────────────────────────────────────┐');
  console.log('  │              ATLAS API Server               │');
  console.log('  ├─────────────────────────────────────────────┤');
  console.log(`  │  Mode:    ${env.nodeEnv.padEnd(34)}│`);
  console.log(`  │  Port:    ${String(env.port).padEnd(34)}│`);
  console.log(`  │  Health:  http://localhost:${env.port}/api/health`.padEnd(48) + '│');
  console.log('  └─────────────────────────────────────────────┘');
  console.log('');
});

// Graceful shutdown — lets in-flight requests finish before exiting.
function shutdown(signal: string): void {
  console.log(`\n${signal} received — shutting down gracefully...`);
  server.close(() => {
    console.log('Server closed. Goodbye!');
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
