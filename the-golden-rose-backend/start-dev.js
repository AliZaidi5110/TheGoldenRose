#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting The Golden Rose Backend Development Server...\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found!');
  console.log('📝 Please create a .env file based on .env.example');
  console.log('💡 Run: cp .env.example .env');
  process.exit(1);
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('📦 Installing dependencies...');
  const install = spawn('npm', ['install'], { stdio: 'inherit' });
  
  install.on('close', (code) => {
    if (code === 0) {
      console.log('✅ Dependencies installed successfully');
      startServer();
    } else {
      console.log('❌ Failed to install dependencies');
      process.exit(1);
    }
  });
} else {
  startServer();
}

function startServer() {
  console.log('🔧 Starting development server with nodemon...\n');
  
  const server = spawn('npx', ['nodemon', 'server.js'], { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'development' }
  });
  
  server.on('close', (code) => {
    console.log(`\n🛑 Server stopped with code ${code}`);
  });
  
  // Handle Ctrl+C
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down development server...');
    server.kill('SIGINT');
    process.exit(0);
  });
}