#!/bin/sh

if [ "$NODE_ENV" = "production" ]; then
  echo -e '\x1b[33m Starting production environment \x1b[0m'
  npm run build
  npm run start
else
  echo -e '\x1b[33m Starting development environment \x1b[0m'
  npm run dev
fi
