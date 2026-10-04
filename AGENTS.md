# Project guidance

このリポジトリはPDDR Kitの最小サンプルです。

## PDDRを作成・更新する条件

- Project / Product / Processに関する重要な判断が、明示的に採用、不採用、保留、または置換されたとき
- 実装や検証によって既存判断の`delivery_status`または前提が変わったとき
- 将来の担当者が理由を知らないと、同じ議論や事故を繰り返しそうなとき

日々の作業、仮説、実験途中の結果、単純な実装詳細はIssueへ残し、それだけを理由にPDDRを作成しません。

## PDDR checkpoints

次のような節目では、最近のIssue、PR、既存PDDR、検証Evidenceを通常のPDDR thresholdで再点検します。

- 大きな実験・リリース・開発フェーズの境界
- Issueまたはroadmapの棚卸し
- Evidenceを持つ複数Issue / PRをまとめてclose・統合するタイミング

棚卸し対象はcheckpointに関係する最近の作業へ限定します。同じ判断が既存PDDRにある場合は更新を優先し、将来も理由を参照すべきProject / Product / Process判断だけを新規PDDRへ昇格します。

checkpointを実施したこと自体はPDDR作成理由にしません。通常実装、途中観測、依存更新、実験完了だけなら追加記録なしを正常な結果とします。


### Pending checkpoint marker

PR本文に `## PDDR checkpoint` と `Review: pending` がある場合は、PDDRが必要だと決めつけず、そのsignalに関係する最近のIssue / PR / Evidenceだけを対象にbounded auditします。

durableなProject / Product / Process判断が見つからなければno-opを正常結果とし、review後はPR本文のcurrent stateを `Review: completed` へ更新します。過去のCheck / Job Summaryはsignal発生時点の履歴として扱い、同期更新しません。

## 記録時のルール

- `.pddr/template.md`から`docs/records/PDDR-NNNN-short-title.md`を作成する
- 会話やEvidenceにない理由を補完しない
- 人の承認が確認できない提案を`accepted`にしない
- `decision_status`と`delivery_status`を別々に判断する
- `validated`には、確認内容が分かるEvidenceを付ける
- PDDRを無条件のPolicyや実行命令として扱わない
- 現在のタスクに関係する最小限のPDDRだけを参照する
- 変更後に`python .pddr/pddr.py validate`を実行する

## CIを作成・変更するとき

- workflowを追加する前に、trigger、job数、matrix、checkoutとsetupの重複を確認する。既存の軽量jobへまとめる場合も、必要な検証と失敗時の検知を維持する。
- read-onlyの検証では、同一workflow・同一PRの古い実行だけを取り消す。PR以外は`github.ref`と`github.run_id`を含むgroupで独立させ、mainや手動実行の待機中runを置き換えない。
- jobごとに実測に見合う`timeout-minutes`を明示する。このサンプルのPDDR検証・checkpoint・markerは各5分を上限とする。
- required checkの名前と起動条件、検証コマンド、Python版を保つ。checkpointの`edited` / `labeled` event、PR headの`fetch-depth: 0`、read-only signalとtrusted default-branch writerの権限分離を維持する。
- cacheは復元・保存時間と容量まで含めて効果を確認してから導入する。依存installを持たない短い検証へ一律に追加しない。
- PRへ変更前後のjob数・通常実行の観測結果・未確認事項を記録する。workflow全体の経過時間、各jobの実行時間、請求上の使用量を混同せず、不要なrerunやdispatchで測定しない。

導入元の公開ガイドは[PDDR Kitの導入](https://github.com/serevy/pddr-kit/blob/main/docs/adoption.md)、今回の改善範囲は[PDDR Kit Issue #47](https://github.com/serevy/pddr-kit/issues/47)を参照する。`init` / `upgrade`はこのプロジェクト固有の規則やCIを自動更新しないため、今後も差分を個別にreviewする。
