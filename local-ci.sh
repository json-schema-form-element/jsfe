#!/bin/bash

set -e

pnpm install --frozen-lockfile

node --run audit

node --run clean
node --run build

node --run lint:es

node --run lint:style

node --run format

node --run test:unit
node --run test:e2e
