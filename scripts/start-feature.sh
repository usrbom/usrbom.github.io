#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: bash scripts/start-feature.sh \"feature name\""
}

if [ $# -lt 1 ]; then
  usage
  exit 1
fi

REPO_ROOT="$(cd -- "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

if ! git rev-parse --git-dir >/dev/null 2>&1; then
  echo "This script must be run inside a git repository."
  exit 1
fi

if [ -n "$(git status --short)" ]; then
  echo "Working tree is not clean. Commit or stash changes before starting or switching feature branches."
  exit 1
fi

raw_name="$*"
slug="$(printf '%s' "$raw_name" \
  | tr '[:upper:]' '[:lower:]' \
  | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//; s/-+/-/g')"

if [ -z "$slug" ]; then
  echo "Could not derive a branch name from: $raw_name"
  exit 1
fi

branch="scratch/$slug"

if git show-ref --verify --quiet "refs/heads/$branch"; then
  echo "Switching to existing branch $branch"
  git switch "$branch"
else
  echo "Switching to main"
  git switch main
  echo "Creating branch $branch from main"
  git switch -c "$branch"
fi

echo "Current branch: $(git branch --show-current)"
