#!/bin/bash

set -e

pnpm install --frozen-lockfile

pnpm run build

pnpm turbo lint:es

pnpm turbo format

pnpm run test:unit

pnpm run test:e2e
