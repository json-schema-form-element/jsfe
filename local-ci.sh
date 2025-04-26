#!/bin/bash

set -e

pnpm install --frozen-lockfile

pnpm run ts:build

pnpm turbo lint

pnpm turbo format

pnpm run test:unit

pnpm run test:e2e
