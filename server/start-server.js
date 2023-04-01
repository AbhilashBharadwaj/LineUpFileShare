const { spawn } = require('child_process');

const startServer = () => {
  const nodemon = spawn(
    /^win/.test(process.platform) ? 'npx.cmd' : 'npx',
    ['nodemon', '--watch', 'src/**/*.ts', '--exec', 'npx', 'ts-node', 'src/index.ts'],
    { stdio: 'inherit' }
  );

  nodemon.on('error', (error) => {
    console.error('Failed to start server:', error);
  });
};

startServer();
