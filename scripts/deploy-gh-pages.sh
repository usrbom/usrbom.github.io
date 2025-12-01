#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
BUILD_DIR="$REPO_ROOT/out"
BRANCH="gh-pages"

cd "$REPO_ROOT"

echo ">>> Building static export..."
npm run build >/dev/null
npm run export >/dev/null

echo ">>> Ensuring worktree for $BRANCH at $BUILD_DIR"
if ! git worktree list --porcelain | grep -q "worktree $BUILD_DIR"; then
  if git ls-remote --exit-code --heads origin "$BRANCH" >/dev/null 2>&1; then
    git worktree add "$BUILD_DIR" "$BRANCH"
  else
    git worktree add "$BUILD_DIR" "$BRANCH"
  fi
fi

cd "$BUILD_DIR"

COMMIT_MSG=${1:-"Deploy $(date -u +"%Y-%m-%dT%H:%M:%SZ")"}

echo ">>> Committing static files..."
git add .
if git diff --cached --quiet; then
  echo "Nothing to commit; deploy skipped."
  exit 0
fi
git commit -m "$COMMIT_MSG"

echo ">>> Pushing to origin/$BRANCH..."
git push origin "$BRANCH"

echo ">>> Done. You can remove the worktree with: git worktree remove $BUILD_DIR"
