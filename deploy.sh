#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
KEY="$ROOT/../../work/github-deploy-key/codex_pages_deploy"
KNOWN_HOSTS="$ROOT/../../work/github-deploy-key/known_hosts"
REMOTE="git@github.com:wjcqu2026-lang/codex-pages.git"

cd "$ROOT"

if [ ! -f "$KEY" ]; then
  echo "Missing deploy key: $KEY" >&2
  exit 1
fi

mkdir -p "$(dirname "$KNOWN_HOSTS")"
if [ ! -f "$KNOWN_HOSTS" ]; then
  ssh-keyscan github.com > "$KNOWN_HOSTS"
fi

git remote set-url origin "$REMOTE" 2>/dev/null || git remote add origin "$REMOTE"
git config user.name "Codex"
git config user.email "codex@local"

git add .
if git diff --cached --quiet; then
  echo "No changes to deploy."
  exit 0
fi

git commit -m "Update Codex pages site"
GIT_SSH_COMMAND="ssh -i '$KEY' -o UserKnownHostsFile='$KNOWN_HOSTS' -o IdentitiesOnly=yes" git push -u origin main
