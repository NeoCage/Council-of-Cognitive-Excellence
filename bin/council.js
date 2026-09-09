#!/usr/bin/env node
'use strict';

// Thin Node wrapper around install.sh so the project is installable via
// `npx @neocage/council`. The install logic itself lives in install.sh —
// this file deliberately does not reimplement it, so there is only one
// copy to keep correct.

const { spawnSync } = require('node:child_process');
const path = require('node:path');
const fs = require('node:fs');

const pkgRoot = path.resolve(__dirname, '..');
const installer = path.join(pkgRoot, 'install.sh');

if (!fs.existsSync(installer)) {
  console.error(`council: install.sh is missing from the package (${installer})`);
  process.exit(1);
}

// Accept both "council install --codex" and "council --codex".
const args = process.argv.slice(2);
if (args[0] === 'install') {
  args.shift();
}

const result = spawnSync('bash', [installer, ...args], {
  stdio: 'inherit',
  cwd: pkgRoot,
});

if (result.error) {
  if (result.error.code === 'ENOENT') {
    console.error('council: bash was not found on PATH.');
    console.error('On Windows, run this from WSL or Git Bash.');
  } else {
    console.error(`council: ${result.error.message}`);
  }
  process.exit(1);
}

process.exit(result.status === null ? 1 : result.status);
