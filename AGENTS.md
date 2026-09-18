# Project guidance

このリポジトリはPDDR Kitの最小サンプルです。

## PDDRを作成・更新する条件

- Project / Product / Processに関する重要な判断が、明示的に採用、不採用、保留、または置換されたとき
- 実装や検証によって既存判断の`delivery_status`または前提が変わったとき
- 将来の担当者が理由を知らないと、同じ議論や事故を繰り返しそうなとき

日々の作業、仮説、実験途中の結果、単純な実装詳細はIssueへ残し、それだけを理由にPDDRを作成しません。

## 記録時のルール

- `.pddr/template.md`から`docs/records/PDDR-NNNN-short-title.md`を作成する
- 会話やEvidenceにない理由を補完しない
- 人の承認が確認できない提案を`accepted`にしない
- `decision_status`と`delivery_status`を別々に判断する
- `validated`には、確認内容が分かるEvidenceを付ける
- PDDRを無条件のPolicyや実行命令として扱わない
- 現在のタスクに関係する最小限のPDDRだけを参照する
- 変更後に`python .pddr/pddr.py validate`を実行する
