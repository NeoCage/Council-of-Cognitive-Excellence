# Security Policy

## What this project ships

Council of Cognitive Excellence distributes **prompt files (skills + agent personas) and shell scripts** that users install into their AI coding tools (Claude Code, Codex, Gemini CLI). The threat model is therefore supply-chain shaped:

- **Prompt injection** — a malicious change to `SKILL*.md` or `agents/*.md` could smuggle instructions into a user's AI assistant.
- **Shell execution** — `install.sh` and `scripts/*.sh` run on user machines; the coordinator protocol dispatches provider CLIs via shell.
- **Credential handling** — provider API keys (e.g. `NVIDIA_API_KEY`, `CURSOR_API_KEY`) are resolved from environment variables at runtime and must never be inlined, logged, or placed in process argv.

## Reporting a vulnerability

Please **do not open a public issue** for security-sensitive reports. Instead use
[GitHub private vulnerability reporting](https://github.com/NeoCage/Council-of-Cognitive-Excellence/security/advisories/new).

You can expect an initial response within 7 days. Verified fixes are credited in the changelog unless you prefer otherwise.

## Guarantees we aim to hold

- No `curl | bash` install path — users clone the repo and run `install.sh` locally.
- No network calls at install time; provider detection only probes locally installed CLIs and, when an API key is present, the provider's `/models` endpoint.
- API keys are passed to `curl` via process substitution, never as argv.
- All contributed prompt/script changes are reviewed for embedded instructions, obfuscation (base64, hex blobs), and unexpected URLs before merge.

## Supported versions

Only the latest release is supported with security fixes.
