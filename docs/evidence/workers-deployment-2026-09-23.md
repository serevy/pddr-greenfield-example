# Cloudflare Workers deployment evidence — 2026-09-23

PDDR-0004で採用したCloudflare Workers + Static Assetsについて、初回deploymentの進捗を記録します。

## Confirmed

- maintainer reported that the Cloudflare Workers deployment completed successfully on 2026-09-23.
- repository-side Workers configuration is present on main:
  - `wrangler.jsonc`
  - static asset directory: `./app`
- implementation merge commit:
  - `608a6f34353a1af8d52266302c011ed4b11a5cff`
- main PDDR validation succeeded:
  - https://github.com/serevy/pddr-greenfield-example/actions/runs/35815995475

## Validation still required

PDDR-0004 defines public deployment validation as more than deployment completion.

The following still needs repository-traceable evidence or maintainer-confirmed verification:

- public Workers URL
- Bamboo Plot loads on the public URL
- watering interaction works
- browser-local state survives reload
- reset works

GitHub metadata does not currently expose the Cloudflare public URL for this deployment, so this record does not invent one.

Until public endpoint behavior is confirmed, PDDR-0004 remains `delivery_status: in-progress`.
