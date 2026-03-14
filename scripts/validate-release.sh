#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd -- "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

current_branch="$(git branch --show-current)"

if [ "$current_branch" != "main" ]; then
  echo "Release validation must run from main. Current branch: $current_branch"
  exit 1
fi

if [ -n "$(git status --short)" ]; then
  if [ -t 0 ]; then
    printf 'Uncommitted changes detected in the source repo. Continue with release validation? [y/N] '
    read -r reply
    case "$reply" in
      [Yy]|[Yy][Ee][Ss]) ;;
      *)
        echo "Release validation cancelled."
        exit 1
        ;;
    esac
  else
    echo "Uncommitted changes detected in the source repo. Re-run interactively to confirm or clean the tree first."
    exit 1
  fi
fi

echo ">>> Running lint"
npm run lint

echo ">>> Running build"
npm run build

if [ ! -d "$REPO_ROOT/out" ]; then
  echo "Expected static export at $REPO_ROOT/out but it was not created."
  exit 1
fi

echo "Release validation passed."
