#!/usr/bin/env bash
set -euo pipefail

if ! command -v npx >/dev/null 2>&1; then
  echo "[error] npx is required to run Prisma migrations"
  exit 1
fi

npx prisma migrate dev
