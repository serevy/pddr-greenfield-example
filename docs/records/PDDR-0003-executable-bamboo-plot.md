---
id: PDDR-0003
title: Use a tiny Bamboo Plot as the executable product sample
decision_date: 2026-09-23
recorded_date: 2026-09-23
decision_status: accepted
delivery_status: in-progress
scope:
  - project
  - product
owners:
  - serevy
evidence:
  - "Maintainer approved evolving the sample into a small bamboo-growing serverless web app while keeping PDDR as the main subject, 2026-09-23 (private)"
  - "https://github.com/serevy/pddr-greenfield-example/issues/7"
  - "https://github.com/serevy/pddr-greenfield-example/pull/8"
related:
  - PDDR-0001
supersedes: []
superseded_by: null
---

# PDDR-0003: Use a tiny Bamboo Plot as the executable product sample

## Summary

PDDR Greenfield Exampleを、ドキュメントだけのサンプルから、Pocket Garden内の小さな「Bamboo Plot」を実際に触りながらPDDRの判断・実装・検証・見直しを辿れる実行可能サンプルへ育てる。

竹アプリそのものを主目的にはしない。アプリはPDDRのライフサイクルを現実的に発生させるためのfixtureとして、ストレスなく触れる最小限の品質を保つ。

## Context and observations

- 既存サンプルは、架空のPocket Gardenに対するProduct判断PDDR-0001と、実際のrepository運用に対するProcess判断PDDR-0002を持っている。
- PDDR-0001にはローカル時刻のリマインダーという具体的なProduct判断があるが、現時点では実際に操作できるProduct実装へ接続されていない。
- maintainerは、Pocket Gardenにちなんで竹を育てる小さなserverless Web appをサンプルとして進める案を承認した。
- 同時に、竹そのものが主役になってPDDRサンプルの目的を侵食しないよう、アプリ開発のスコープを抑える必要があることも確認した。
- ただし実装が形だけでは、悩み・判断・実装・振り返りのループが発生せず、PDDRの教材として弱い。ある程度は実際に触れて育てられる必要がある。

## Options considered

### ドキュメントだけのサンプルを維持する

- Description: Pocket Gardenの実装を追加せず、架空Evidenceとrepository運用例だけを維持する。
- Benefits: 最小構成を保ちやすく、アプリ保守が不要。
- Costs / constraints: Product判断が実装・検証へ繋がるループを実体験しにくい。
- Status: rejected

### 竹育成アプリ自体を本格的なプロダクトとして開発する

- Description: 認証、複数竹、ゲーム要素、ランキングなどを積極的に追加する。
- Benefits: 多数のProduct判断が発生する。
- Costs / constraints: PDDRより竹アプリ開発が主役になり、サンプルの理解コストと保守負担が増える。
- Status: rejected

### 小さなBamboo Plotを実行可能fixtureとして育てる

- Description: Pocket Gardenの一部として、竹の子を水やりして少し育てられる小さなWeb UIを実装し、必要な判断だけ段階的に追加する。
- Benefits: 実際のProductループを作りつつ、PDDRを主役として保てる。
- Costs / constraints: 最低限のUI・状態管理・将来のdeploymentを保守する必要がある。
- Status: accepted

## Decision

- Pocket Gardenの実行可能サンプルとしてBamboo Plotを追加する。
- Phase 1では、竹の子1本、水やり、段階的な見た目の変化、ブラウザrefresh後の状態保持、resetだけを提供する。
- Phase 1の状態はbrowser local storageへ保存し、server-side durable persistenceはまだ採用しない。
- serverless hosting provider、durable persistence、identity / authentication、reminder delivery、anti-abuseはこの判断では決めない。
- 新機能は、PDDRの判断・実装・検証・見直しを実演する、サンプルを触れる状態に保つ、または現実的な技術判断のEvidenceを作る場合に優先する。
- Bamboo Plotの機能拡張がPDDRの説明より大きくなり始めた場合は、機能追加を停止するか別repositoryへの分離を検討する。

## Delivery and validation

Issue #7でPhase 1のacceptance criteriaとdeferred decisionsを整理し、Bamboo Plotの初回実装を進める。

初回実装PRがmainへmergeされ、静的frontendが読み込めること、local storageによる状態保持、水やり・resetの基本動作、PDDR validationを確認するまでは、`delivery_status`を`in-progress`とする。

## Consequences

- PDDRのProduct判断を、実際のUIと実装へ接続して説明できる。
- Bamboo Plotを触った結果から、serverless hostingやdurable stateなど次の判断に必要なEvidenceを作れる。
- Phase 1ではlocal storageに限定するため、別端末・別browser間で状態は共有されない。
- serverless appという最終方向は維持するが、provider選定を急がないことで最初の判断を小さく保てる。
- 竹を面白くするだけの機能追加は、PDDRサンプルの目的に照らして抑制する。

## Revisit when

- Bamboo Plotを公開URLで触れる状態にするとき。
- browser local storageでは検証したいProduct判断を表現できなくなったとき。
- PDDR-0001のreminder判断を実機能へ接続するとき。
- server-side durable persistenceが必要になったとき。
- Bamboo Plotの保守量がPDDRサンプルとして妥当な範囲を超えたとき。

## Evidence

- Maintainer approval to evolve the sample into a small bamboo-growing serverless web app while keeping PDDR as the main subject, 2026-09-23 (private).
- [Issue #7: Pocket Garden Bamboo Plot Phase 1](https://github.com/serevy/pddr-greenfield-example/issues/7)
- [Implementation PR #8](https://github.com/serevy/pddr-greenfield-example/pull/8)

## Related records

- PDDR-0001: Default reminders follow the user's local time
