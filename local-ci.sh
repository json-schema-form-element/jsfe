#!/bin/bash

set -e

pnpm install --frozen-lockfile

node --run run build

node --run turbo lint:es

node --run turbo format

node --run run test:unit

node --run run test:e2e
