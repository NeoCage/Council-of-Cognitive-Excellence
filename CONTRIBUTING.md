# Contributing

Thanks for contributing to Council of Cognitive Excellence.

## Development flow

1. Sync main:
   - `git checkout main`
   - `git pull origin main`
2. Create a feature branch:
   - `git checkout -b feat/your-change`
3. Make changes and validate:
   - `shellcheck install.sh` (for installer changes)
   - `./install.sh --dry-run`
   - `./scripts/council-simulation-checklist.sh`
   - `mvn -B -ntp package` (Maven assembly; required when changing `pom.xml` or `src/assembly/`)

Tagged releases (`v*.*.*`) run `.github/workflows/release.yml`: Maven package, GitHub Release
assets, and deploy to GitHub Packages. Keep `pom.xml` version aligned with the latest
`CHANGELOG.md` / `.claude-plugin/plugin.json` version before tagging.
4. Commit with a clear message and open a PR to `main`.

## Branch cleanup after merge

If a merged branch still appears in your local remote-tracking list, prune stale refs:

- `git fetch origin --prune`

To remove a merged local branch:

- `git branch -d feat/your-change`

## Style notes

- Keep docs and installer behavior in sync.
- Prefer explicit error handling and clear user-facing output in scripts.
- Avoid hardcoded counts when files can be discovered dynamically.
- Keep `demos/session-pack.md` aligned with active profiles and triads.
