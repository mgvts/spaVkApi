#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build-only

git add dist -f
git commit -m "add dist"

git subtree push --prefix dist origin gh-pages