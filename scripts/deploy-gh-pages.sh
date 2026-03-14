#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
BUILD_DIR="$REPO_ROOT/out"
WORKTREE_DIR="$REPO_ROOT/.gh-pages-tmp"
BRANCH="gh-pages"

cd "$REPO_ROOT"

echo ">>> Validating release path from main"
bash "$SCRIPT_DIR/validate-release.sh"

echo ">>> Pruning stale worktrees"
git worktree prune >/dev/null 2>&1 || true

echo ">>> Fetching $BRANCH"
git fetch origin "$BRANCH" >/dev/null 2>&1 || true

if [ ! -d "$BUILD_DIR" ]; then
  echo "Build output not found at $BUILD_DIR. Ensure next.config.js has output: \"export\"."
  exit 1
fi

echo ">>> Preparing worktree at $WORKTREE_DIR for $BRANCH"
if [ -d "$WORKTREE_DIR" ] && [ ! -e "$WORKTREE_DIR/.git" ]; then
  echo ">>> Removing stale $WORKTREE_DIR"
  rm -rf "$WORKTREE_DIR"
fi

if ! git worktree list --porcelain | grep -q "worktree $WORKTREE_DIR"; then
  git worktree add --force -B "$BRANCH" "$WORKTREE_DIR" "origin/$BRANCH" 2>/dev/null \
    || git worktree add --force -B "$BRANCH" "$WORKTREE_DIR" HEAD
fi

if [ ! -e "$WORKTREE_DIR/.git" ]; then
  echo "Expected a git worktree at $WORKTREE_DIR, but no .git file was found."
  exit 1
fi

echo ">>> Ensuring branch $BRANCH is checked out in worktree"
git -C "$WORKTREE_DIR" checkout -B "$BRANCH" >/dev/null 2>&1
git -C "$WORKTREE_DIR" reset --hard "origin/$BRANCH" >/dev/null 2>&1 || true

echo ">>> Syncing export into worktree"
rsync -a --delete --exclude='.git' "$BUILD_DIR"/ "$WORKTREE_DIR"/

DEFAULT_SUMMARY="$(git log -1 --pretty=%s HEAD | sed -E 's/"/\\"/g')"
COMMIT_MSG=${1:-"Deploy: ${DEFAULT_SUMMARY} ($(date -u +"%Y-%m-%dT%H:%M:%SZ"))"}

echo ">>> Committing static files..."
# The gh-pages worktree lives under .gh-pages-tmp, but force-add keeps staging behavior
# .gitignore. Force-add so exported files inside the worktree are staged reliably.
git -C "$WORKTREE_DIR" add -A -f
if git -C "$WORKTREE_DIR" diff --cached --quiet; then
  echo "Nothing to commit; deploy skipped."
  exit 0
fi
git -C "$WORKTREE_DIR" commit -m "$COMMIT_MSG"

echo ">>> Pushing to origin/$BRANCH..."
git -C "$WORKTREE_DIR" push origin "$BRANCH"

echo ">>> Done. You can remove the worktree with: git worktree remove $WORKTREE_DIR"
