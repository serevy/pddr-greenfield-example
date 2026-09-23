---
id: PDDR-0004
title: Host the public Bamboo Plot on Cloudflare Workers
decision_date: 2026-09-23
recorded_date: 2026-09-23
decision_status: accepted
delivery_status: validated
scope:
  - project
  - product
  - process
owners:
  - serevy
evidence:
  - docs/evidence/hosting-options-2026-09-23.md
  - "https://github.com/serevy/pddr-greenfield-example/issues/10"
  - "Maintainer approved Cloudflare Workers for Bamboo Plot hosting, 2026-09-23 (private)"
  - "https://github.com/serevy/pddr-greenfield-example/pull/11"
  - docs/evidence/workers-deployment-2026-09-23.md
  - "Maintainer reported the initial Cloudflare Workers deployment completed successfully, 2026-09-23 (private)"
  - "Maintainer confirmed https://pddr-greenfield-example.serevy.workers.dev/ is publicly reachable, 2026-09-23 (private)"
related:
  - PDDR-0003
supersedes: []
superseded_by: null
---

# PDDR-0004: Host the public Bamboo Plot on Cloudflare Workers

## Summary

Bamboo Plotの公開hostingとして、Cloudflare Workers + Static Assetsを採用する。

maintainerは、API周りを過度に複雑化せずに将来の拡張余地を残せる点を重視し、2026-09-23にWorkers採用を承認した。

## Context and observations

- PDDR-0003でBamboo Plot Phase 1はstatic frontend + browser local storageとして実装・検証された。
- PDDR-0003のrevisit conditionには、Bamboo Plotを公開URLで触れる状態にするときが含まれている。
- 現在のappはHTML / CSS / JavaScriptだけで構成され、server-side API、durable persistence、authenticationを持たない。
- Phase 2ではまず公開URLで触れることを目的とし、D1 / KV / Durable Objects等のdurable persistenceはまだ決めない。
- GitHub Pagesはstatic site hostingとして現在のappを小さく公開できる。
- Cloudflare Pagesもstatic hostingとGit integrationを提供するが、Cloudflare公式は2026年時点で新規applicationにはWorkersをprimary platformとして案内している。
- Cloudflare Workersはstatic assetsを直接配信でき、後から同じapplicationにWorker logicやbindingsを追加できる。
- Workers BuildsはGitHub repositoryと連携してbuild / deployし、preview workflowも提供する。

## Options considered

### GitHub Pages

- Benefits: static-onlyな現在には最小構成。repositoryから直接公開しやすい。
- Costs / constraints: 将来server-side stateやAPIが必要になると、別runtimeやproviderを追加する必要がある。
- Status: rejected

### Cloudflare Pages

- Benefits: static hosting、Git integration、preview deploymentが揃う。
- Costs / constraints: Cloudflare自身が新規applicationではWorkersをprimary platformとして推奨しており、将来のWorker logicまで考えると中間レイヤーになりやすい。
- Status: rejected

### Cloudflare Workers + Static Assets

- Benefits: 現在のstatic assetsを配信でき、将来APIやdurable stateへ同じapplication内で進める。GitHub連携とpreviewも利用できる。
- Costs / constraints: static-onlyな現在には設定が少し増え、Cloudflare account側のGit integrationが必要。
- Status: accepted

## Decision

- Phase 2のpublic hostingとしてCloudflare Workers + Static Assetsを採用する。
- initial deploymentではstatic assetsだけを配信し、Worker APIは追加しない。
- GitHub連携またはWrangler deploymentのうち、repository運用として最小で追跡可能な方法を選ぶ。
- public URLでBamboo Plot Phase 1の基本操作を確認する。
- deployment EvidenceをPDDRへ還流してから`delivery_status`を更新する。
- D1 / KV / Durable Objects、identity、reminder API、custom domain、analyticsはこの判断に含めない。

## Delivery and validation

`wrangler.jsonc`で`app/`をWorkers Static Assetsとして配信する最小configurationを追加した。

repository側のprovider-specific configurationはmainへmerge済みで、maintainerからCloudflare Workersへの初回deployment完了と `https://pddr-greenfield-example.serevy.workers.dev/` の公開到達性が確認された。

Workersへ配信しているのはPhase 1で検証済みのstatic `app/` artifactであり、水やり、browser-local stateの復元、resetは `docs/evidence/bamboo-phase1-validation.md` で検証済みである。

assistant実行環境からは `workers.dev` hostへの外向きアクセス制限によりremote browser checkを独立実施できなかったため、その点はEvidenceに明記した。公開到達性はmaintainer確認、client-side挙動は同一static artifactの既存validationを根拠とする。

以上から、採用したhostingが実装・deploy・公開され、対象artifactのPhase 1動作も検証済みであるため、`delivery_status`を`validated`とする。

## Consequences

- 将来server-side stateが必要になった場合、hosting providerを変えずWorkers ecosystem内で次の判断を行える。
- repositoryへCloudflare固有configurationが追加される。
- GitHub Pagesよりplatform dependencyは増えるが、後続のAPI / persistence判断に繋げやすい。
- static hostingだけで終わる場合は、GitHub Pagesより構成が少し重い可能性がある。

## Revisit when

- maintainerが別providerを選択したとき。
- public deployment後もserver-side capabilityが不要で、Workers設定がサンプルの理解コストを過度に増やすと判明したとき。
- durable persistence候補を比較するとき。
- PDDRサンプルのhostingが運用負荷になったとき。

## Evidence

- [Hosting options 2026-09-23](../evidence/hosting-options-2026-09-23.md)
- [Issue #10: Phase 2 hosting selection](https://github.com/serevy/pddr-greenfield-example/issues/10)
- Maintainer approval of Cloudflare Workers, 2026-09-23 (private).
- [Implementation PR #11](https://github.com/serevy/pddr-greenfield-example/pull/11)
- [Workers deployment evidence](../evidence/workers-deployment-2026-09-23.md)
- Maintainer report that the initial Cloudflare Workers deployment completed successfully, 2026-09-23 (private).
- [main PDDR validation after PR #11](https://github.com/serevy/pddr-greenfield-example/actions/runs/35815995475)
- Maintainer confirmation that https://pddr-greenfield-example.serevy.workers.dev/ is publicly reachable, 2026-09-23 (private).

## Related records

- PDDR-0003: Use a tiny Bamboo Plot as the executable product sample
