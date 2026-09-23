---
id: PDDR-0002
title: Review recent work at milestone checkpoints
decision_date: 2026-09-22
recorded_date: 2026-09-22
decision_status: accepted
delivery_status: validated
scope:
  - process
owners:
  - serevy
evidence:
  - "Maintainer requested refreshing this sample with current PDDR practices, 2026-09-22 (private)"
  - docs/evidence/maintenance-audit-2026-09-22.md
  - "https://github.com/serevy/pddr-kit/pull/29"
  - "https://github.com/serevy/pddr-kit/blob/main/docs/records/PDDR-0008-milestone-audits.md"
  - "https://github.com/serevy/pddr-greenfield-example/pull/5"
  - "https://github.com/serevy/pddr-greenfield-example/actions/runs/35742204181"
  - "https://github.com/serevy/pddr-kit/blob/main/docs/records/PDDR-0010-optional-checkpoint-ci.md"
  - "https://github.com/serevy/pddr-greenfield-example/pull/18"
  - "https://github.com/serevy/pddr-greenfield-example/actions/runs/35860389299"
  - "https://github.com/serevy/pddr-greenfield-example/actions/runs/35860389210"
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
- 2026-09-23にPDDR Kit PDDR-0010で、Agent Skillが常時観測しない変更経路を補完するoptional / recommended checkpoint CIが導入された。CIはPDDRの必要性を判定せず、high-confidence signalに対してreview markerを残す。
- 本repositoryではPR #18でoptional checkpoint CIを明示導入し、`AGENTS.md`変更をsignalとしてPR本文へ `Review: pending` markerが自動追記されるE2Eを確認した。
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
- GitHub Actionsを利用するこのsampleでは、Agent Skillが常時観測しない変更経路を補完するoptional checkpoint CIを明示導入する。CIはreview signalだけを残し、PDDR作成を要求しない。
- checkpoint CIはmanaged coreの一部として扱わず、stable v0.1.0の`.pddr/manifest.json`とmanaged filesは維持する。
- checkpointはmajor experiment / release / delivery phase boundary、Issue / roadmap audit、複数Evidence-bearing Issue / PRのclose・統合時を代表例とする。
- audit対象はcheckpointに関係するrecent workへ限定し、通常のPDDR thresholdを変更しない。
- routine implementation、途中観測、依存更新、実験完了そのものはPDDRへ昇格しない。
- 同じ判断が既存PDDRにある場合は新規作成より更新を優先する。
- durable decisionが見つからなければ追加PDDRなしを正常なaudit結果とする。

## Delivery and validation

本判断を反映する`AGENTS.md`、README、maintenance audit Evidence、PDDR-0002をPR #5で更新し、2026-09-22にmainへmergeした。

merge commit `b90c478a83fced844fb43f4da7789f0545f0b1d3` を対象にmain上の`Validate PDDR` workflowが成功し、2件のPDDRが検証を通過した。project-specific checkpointの実装とrepository-level validationが完了したため、`delivery_status`を`validated`とする。

2026-09-23のPR #18では、PDDR Kit PDDR-0010で追加されたoptional checkpoint CIをsampleへdogfoodした。PR本文にcheckpoint sectionを事前記載しない状態で`AGENTS.md`を変更し、checkpoint workflow run `35860389299` が成功、PR本文末尾へ `Signal: recommended / Review: pending` が自動追記された。既存`Validate PDDR` run `35860389210`も成功した。

pending markerをbounded auditした結果、この変更は新規durable decisionではなく、本PDDRのrevisit condition「PDDR Kit側でproject-specific checkpointを安全に自動導入する仕組みが採用されたとき」に該当すると判断したため、新規PDDRを作らず本記録を更新した。

## Consequences

- サンプルが「初回PDDRを書いた完成形」だけでなく、「導入後の節目で記録漏れを棚卸しする運用例」も示せる。
- Dependabotのようなroutine maintenanceをPDDRへ昇格しない実例を残せる。
- stable releaseから生成された`.pddr/`と、導入先固有の運用規則が別々に進化することを示せる。
- checkpoint audit自体は人またはAgentが実行する。optional checkpoint CIはauditを代替せず、Agent不在時にもreview signalを残すsafety netとしてのみ機能する。
- Check / Job Summaryはsignal発生時点のexecution trace、PR本文の`## PDDR checkpoint`はcurrent review stateとして扱う。
- optional checkpoint CIはmanaged-core upgrade対象外なので、今後の更新もsample側で明示的にreviewする必要がある。
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
- [Implementation PR #5](https://github.com/serevy/pddr-greenfield-example/pull/5)
- [main validation after PR #5](https://github.com/serevy/pddr-greenfield-example/actions/runs/35742204181)
- [PDDR Kit PDDR-0010: Optional checkpoint CI](https://github.com/serevy/pddr-kit/blob/main/docs/records/PDDR-0010-optional-checkpoint-ci.md)
- [Checkpoint CI dogfood PR #18](https://github.com/serevy/pddr-greenfield-example/pull/18)
- [Checkpoint CI first signal run](https://github.com/serevy/pddr-greenfield-example/actions/runs/35860389299)
- [PDDR validation on dogfood PR](https://github.com/serevy/pddr-greenfield-example/actions/runs/35860389210)

## Related records

なし。
