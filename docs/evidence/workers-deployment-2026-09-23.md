# Cloudflare Workers deployment evidence — 2026-09-23

PDDR-0004で採用したCloudflare Workers + Static Assetsについて、初回deploymentの進捗を記録します。

## Confirmed

- maintainer reported that the Cloudflare Workers deployment completed successfully on 2026-09-23.
- maintainer enabled the public `workers.dev` route using account subdomain `serevy`.
- public endpoint: https://example.serevy.workers.dev/
- maintainer confirmed the Worker is publicly reachable on 2026-09-23.
- maintainer confirmed it opens normally without a Zero Trust / Access authentication challenge.
- maintainer provided a mobile browser screenshot showing the Pocket Garden UI rendered successfully at the public endpoint on 2026-09-23.
- repository-side Workers configuration is present on main:
  - `wrangler.jsonc`
  - static asset directory: `./app`
- implementation merge commit:
  - `608a6f34353a1af8d52266302c011ed4b11a5cff`
- main PDDR validation succeeded:
  - https://github.com/serevy/pddr-greenfield-example/actions/runs/35815995475

## Runtime behavior evidence

The Bamboo Plot delivered to Workers is the same static `app/` artifact already validated in Phase 1.

Phase 1 validation confirmed:

- page assets load from a static HTTP server
- watering advances the bamboo state
- browser-local state survives reload-equivalent initialization
- reset restores the initial state

See:

- `docs/evidence/bamboo-phase1-validation.md`
- https://github.com/serevy/pddr-greenfield-example/pull/8

The assistant environment could not directly fetch the `workers.dev` endpoint because outbound access to that host was restricted, so this record does not claim an independent remote-browser check. Public reachability is supported by maintainer confirmation; client-side behavior is supported by the previously validated static artifact that was deployed unchanged.

## Result

The selected hosting is deployed and publicly reachable, and the deployed artifact already has validated Phase 1 behavior.

PDDR-0004 may move to `delivery_status: validated`.
