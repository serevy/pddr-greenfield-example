---
id: PDDR-0002
title: Review recent work at milestone checkpoints
decision_date: 2026-09-22
recorded_date: 2026-09-22
decision_status: accepted
delivery_status: in-progress
scope:
  - process
owners:
  - serevy
evidence:
  - "Maintainer requested refreshing this sample with current PDDR practices, 2026-09-22 (private)"
  - docs/evidence/maintenance-audit-2026-09-22.md
  - "https://github.com/serevy/pddr-kit/pull/29"
  - "https://github.com/serevy/pddr-kit/blob/main/docs/records/PDDR-0008-milestone-audits.md"
related: []
supersedes: []
superseded_by: null
---

# PDDR-0002: Review recent work at milestone checkpoints

## Summary

このサンプルでは、個々の作業中にPDDR候補を拾う通常運用に加えて、大きなフェーズ境界、Issue / roadmap棚卸し、複数Evidence-bearing Issue / PRのclose・統合時に、recent workを通常のPDDR thresholdで再点検するmilestone auditを行う。

checkpointはPDDR作成quotaではない。durableなProject / Product / Process判断がなければ、追加記録なしを正常な結果とする。

## Context and observations

- このリポジトリは2026-09-18にPDDR Kit v0.1.0のgreenfield sampleとして公開され、PDDR-0001のProduct判断を1件持っていた。
- 2026-09-22のmaintenance auditで、導入済みのKit管理ファイル3件はPDDR Kit mainの対応元とGit blob SHAが一致し、Kit管理ファイルのupgradeは不要だった。
- 同auditで、PR #2のDependabot導入は通常のrepository maintenanceであり、新規PDDRへ昇格するdurable decisionではないと評価した。
- PDDR Kitではsemantic-decision-labのdogfoodingを根拠に、opportunistic captureだけでは取りこぼす可能性があるdurable decisionを節目で再点検するmilestone audit guidanceが追加された。
- PDDR Kitの`init` / `upgrade`は、導入先固有の`AGENTS.md`やCIを自動変更しない。そのため、checkpointを利用する導入先はproject-specific ruleとして明示する必要がある。
- maintainerは2026-09-22に、この放置されていたサンプルへ最新のPDDR運用知見を反映して進めるよう依頼した。

## Options considered

### 現在のAGENTS.mdを維持する

- Description: 個々の作業中にPDDR候補へ気づいた場合だけ記録する。
- Benefits: 追加の運用checkpointが不要。
- Costs / constraints: Skillを通らない作業や、複数PRに分散して後からdurableになる判断を取りこぼす可能性が残る。
- Status: rejected

### 未リリースのPDDR Kit mainを導入版として扱う

- Description: stable releaseの境界を外し、mainの状態へ導入版そのものを切り替える。
- Benefits: repository全体を常にmainへ追従できる。
- Costs / constraints: このサンプルが「公開済みstable releaseから導入する最小例」である境界を崩す。今回、Kit管理ファイル自体には差分がない。
- Status: rejected

### stable導入版を維持し、project-specific checkpointだけ追加する

- Description: `.pddr/`はv0.1.0のstable導入状態を維持しつつ、最新のmilestone audit guidanceを`AGENTS.md`へ接続する。
- Benefits: stable導入例を壊さず、導入後に運用規則がどう進化するかを示せる。routine workをPDDR化しないno-op境界も実例で示せる。
- Costs / constraints: project-specific guidanceはKit upgradeで自動同期されないため、今後も節目で見直す必要がある。
- Status: accepted

## Decision

- `.pddr/`のKit管理ファイルは、公開済みstable release v0.1.0の導入状態を維持する。
- `AGENTS.md`へmilestone audit checkpointを追加する。
- checkpointはmajor experiment / release / delivery phase boundary、Issue / roadmap audit、複数Evidence-bearing Issue / PRのclose・統合時を代表例とする。
- audit対象はcheckpointに関係するrecent workへ限定し、通常のPDDR thresholdを変更しない。
- routine implementation、途中観測、依存更新、実験完了そのものはPDDRへ昇格しない。
- 同じ判断が既存PDDRにある場合は新規作成より更新を優先する。
- durable decisionが見つからなければ追加PDDRなしを正常なaudit結果とする。

## Delivery and validation

本判断を反映する`AGENTS.md`、README、maintenance audit Evidence、PDDR-0002を同一PRで更新中である。

PRがmainへmergeされ、`python .pddr/pddr.py validate`がmain上で成功するまでは、project-specific checkpointの提供状態を`in-progress`とする。merge後のEvidenceを確認したうえで`validated`へ更新する。

## Consequences

- サンプルが「初回PDDRを書いた完成形」だけでなく、「導入後の節目で記録漏れを棚卸しする運用例」も示せる。
- Dependabotのようなroutine maintenanceをPDDRへ昇格しない実例を残せる。
- stable releaseから生成された`.pddr/`と、導入先固有の運用規則が別々に進化することを示せる。
- checkpoint自体は自動botではなく、人またはAgentが節目で実行するproject ruleである。
- 将来PDDR Kitで新しいstable releaseが公開された場合は、別途`upgrade --dry-run`から導入版更新を評価する必要がある。

## Revisit when

- PDDR Kitの新しいstable releaseが公開されたとき。
- このサンプルでmilestone auditの実行漏れが繰り返されたとき。
- checkpointがroutine workのPDDR化を増やし、最小サンプルとしての分かりやすさを損なうとき。
- PDDR Kit側でproject-specific checkpointを安全に自動導入する仕組みが採用されたとき。

## Evidence

- Maintainer request to refresh this sample with current PDDR practices, 2026-09-22 (private).
- [Maintenance audit 2026-09-22](../evidence/maintenance-audit-2026-09-22.md)
- [PDDR Kit PR #29](https://github.com/serevy/pddr-kit/pull/29)
- [PDDR Kit PDDR-0008](https://github.com/serevy/pddr-kit/blob/main/docs/records/PDDR-0008-milestone-audits.md)

## Related records

なし。
