---
id: PDDR-0004
title: Host the public Bamboo Plot on Cloudflare Workers
decision_date: unknown
recorded_date: 2026-09-23
decision_status: proposed
delivery_status: not-started
scope:
  - project
  - product
  - process
owners:
  - serevy
evidence:
  - docs/evidence/hosting-options-2026-09-23.md
  - "https://github.com/serevy/pddr-greenfield-example/issues/10"
related:
  - PDDR-0003
supersedes: []
superseded_by: null
---

# PDDR-0004: Host the public Bamboo Plot on Cloudflare Workers

## Summary

Bamboo Plotの公開hostingとして、Cloudflare Workers + Static Assetsを採用する案を提案する。

現時点ではmaintainer approvalが未確認のため、この記録は`decision_status: proposed`であり、provider固有のdeployment設定はまだmainへ導入しない。

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
- Status: considered

### Cloudflare Pages

- Benefits: static hosting、Git integration、preview deploymentが揃う。
- Costs / constraints: Cloudflare自身が新規applicationではWorkersをprimary platformとして推奨しており、将来のWorker logicまで考えると中間レイヤーになりやすい。
- Status: considered

### Cloudflare Workers + Static Assets

- Benefits: 現在のstatic assetsを配信でき、将来APIやdurable stateへ同じapplication内で進める。GitHub連携とpreviewも利用できる。
- Costs / constraints: static-onlyな現在には設定が少し増え、Cloudflare account側のGit integrationが必要。
- Status: proposed

## Decision

提案:

- Phase 2のpublic hostingとしてCloudflare Workers + Static Assetsを採用する。
- initial deploymentではstatic assetsだけを配信し、Worker APIは追加しない。
- GitHub連携またはWrangler deploymentのうち、repository運用として最小で追跡可能な方法を選ぶ。
- public URLでBamboo Plot Phase 1の基本操作を確認する。
- deployment EvidenceをPDDRへ還流してから`delivery_status`を更新する。
- D1 / KV / Durable Objects、identity、reminder API、custom domain、analyticsはこの判断に含めない。

このDecisionはmaintainer approval前のproposalである。approvalが確認できるまでは`accepted`へ変更しない。

## Delivery and validation

未着手。

maintainer approval後にprovider-specific configurationを実装し、public URL上でstatic frontendとPhase 1動作を確認する。

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

## Related records

- PDDR-0003: Use a tiny Bamboo Plot as the executable product sample
