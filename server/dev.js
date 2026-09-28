import { spawn } from 'node:child_process';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Cross-platform development launcher.
// Uses the current Node executable directly, so Windows does not need to spawn npm.cmd.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const node = process.execPath;
const viteCli = path.join(root, 'node_modules', 'vite', 'bin', 'vite.js');

const server = spawn(node, [path.join(root, 'server', 'index.js')], {
  cwd: root,
  stdio: 'inherit'
});

const vite = spawn(node, [viteCli], {
  cwd: root,
  stdio: 'inherit'
});

let shuttingDown = false;
const shutdown = (code = 0) => {
  if (shuttingDown) return;
  shuttingDown = true;
  if (!server.killed) server.kill();
  if (!vite.killed) vite.kill();
  process.exit(code);
};

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
server.on('error', (err) => {
  console.error('[AUREL] Backend failed to start:', err.message);
  shutdown(1);
});
vite.on('error', (err) => {
  console.error('[AUREL] Vite failed to start:', err.message);
  shutdown(1);
});
server.on('exit', (code) => {
  if (!shuttingDown && code !== 0) shutdown(code ?? 1);
});
vite.on('exit', (code) => {
  if (!shuttingDown && code !== 0) shutdown(code ?? 1);
});
