# Maintenance audit — 2026-09-22

この文書は、Pocket Gardenの架空Product Evidenceではなく、`pddr-greenfield-example`リポジトリ自身を実際に棚卸ししたmaintenance Evidenceです。

## Review window

- 初回サンプルPR #1のmerge（2026-09-18）以降
- 2026-09-22時点のPDDR Kit mainと、このサンプルの導入状態
- open / recently merged Pull Requestと既存PDDR

## Findings

### PDDR Kit managed files

導入済みのKit管理ファイル3件をPDDR Kit mainの対応元と比較したところ、Git blob SHAがそれぞれ一致しました。

| Installed file | PDDR Kit source | Git blob SHA |
| --- | --- | --- |
| `.pddr/pddr.py` | `scripts/pddr.py` | `5adbd2187a18b2739832cd4fed2dbf2d331ebebf` |
| `.pddr/specification.md` | `docs/specification.md` | `186501612a689e8b650f4a9dbbab1a1af42a468b` |
| `.pddr/template.md` | `templates/pddr.md` | `cdcbd74aedfa4584ffe67a92a22cd4d5fa573dd4` |

`.pddr/manifest.json`の`kit_version`とPDDR Kitの`VERSION`はいずれも`0.1.0`です。このため、Kit管理ファイルのupgradeは不要と判断しました。

### Routine maintenance

PR #2はGitHub ActionsをDependabotで監視するための設定追加です。既存のPDDR判断やPocket GardenのProduct要件を変更せず、通常のrepository maintenanceに該当するため、この変更自体を新規PDDRへ昇格しませんでした。

- https://github.com/serevy/pddr-greenfield-example/pull/2

PR #2のmerge後、Dependabotはmajor update候補としてPR #3（`actions/checkout` v4 → v7）とPR #4（`actions/setup-python` v5 → v7）を作成しました。これらは現時点ではdependency updateのレビュー案件であり、採否や新しいProcess方針は確定していません。そのため、新規PDDRではなくPR上で評価を継続します。

- https://github.com/serevy/pddr-greenfield-example/pull/3
- https://github.com/serevy/pddr-greenfield-example/pull/4

### Milestone audit guidance

PDDR Kitではdogfoodingの結果、個々の作業中のopportunistic captureだけでなく、major phase boundary、Issue / roadmap audit、複数Evidence-bearing Issue / PRの統合時にrecent workを再点検するmilestone auditが標準guidanceへ追加されました。

- https://github.com/serevy/pddr-kit/pull/29
- https://github.com/serevy/pddr-kit/blob/main/docs/records/PDDR-0008-milestone-audits.md

PDDR Kitの`init` / `upgrade`は導入先の`AGENTS.md`を自動変更しないため、このguidanceをサンプルへ適用するにはproject-specific ruleとして明示する必要があります。

## Audit result

今回のcheckpointでは、routine maintenanceであるDependabot導入はPDDRへ昇格しませんでした。

一方、今後のPDDR取りこぼしを節目で再点検するcheckpointをこのサンプル自身の運用へ接続することは、将来のmaintainer / agentが理由を知るべきdurableなProcess判断と評価しました。この判断をPDDR-0002へ記録し、実装PR #5でproject-specific ruleへ反映します。

- https://github.com/serevy/pddr-greenfield-example/pull/5

したがって、今回のaudit結果は「すべてを記録する」ではなく、routine workを除外し、1件のProcess判断だけを昇格した例です。
