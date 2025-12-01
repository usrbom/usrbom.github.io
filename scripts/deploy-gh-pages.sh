#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
BUILD_DIR="$REPO_ROOT/out"
TMP_EXPORT_DIR="$REPO_ROOT/.out-tmp"
BRANCH="gh-pages"

cd "$REPO_ROOT"

echo ">>> Pruning stale worktrees"
git worktree prune >/dev/null 2>&1 || true

echo ">>> Building static export..."
npm run build >/dev/null

# Move build output aside so we can place a worktree at $BUILD_DIR
echo ">>> Staging export to $TMP_EXPORT_DIR"
rm -rf "$TMP_EXPORT_DIR"
mv "$BUILD_DIR" "$TMP_EXPORT_DIR"

echo ">>> Preparing worktree at $BUILD_DIR for $BRANCH"
# Clean existing out/ if it's not a worktree
if [ ! -d "$BUILD_DIR/.git" ] && [ -d "$BUILD_DIR" ]; then
  echo ">>> Removing stale $BUILD_DIR"
  rm -rf "$BUILD_DIR"
fi

# Ensure worktree exists (create branch from current HEAD if needed)
if ! git worktree list --porcelain | grep -q "worktree $BUILD_DIR"; then
  git worktree add --force -B "$BRANCH" "$BUILD_DIR" HEAD
fi

echo ">>> Ensuring branch $BRANCH is checked out in worktree"
git -C "$BUILD_DIR" checkout -B "$BRANCH" >/dev/null 2>&1

echo ">>> Syncing export into worktree"
rsync -a --delete "$TMP_EXPORT_DIR"/ "$BUILD_DIR"/
rm -rf "$TMP_EXPORT_DIR"

cd "$BUILD_DIR"

COMMIT_MSG=${1:-"Deploy $(date -u +"%Y-%m-%dT%H:%M:%SZ")"}

echo ">>> Committing static files..."
git add -f .
if git diff --cached --quiet; then
  echo "Nothing to commit; deploy skipped."
  exit 0
fi
git commit -m "$COMMIT_MSG"

echo ">>> Pushing to origin/$BRANCH..."
git push origin "$BRANCH"

echo ">>> Done. You can remove the worktree with: git worktree remove $BUILD_DIR"
