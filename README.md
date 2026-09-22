# PDDR Greenfield Example

新規プロジェクトへ[PDDR Kit v0.1.0](https://github.com/serevy/pddr-kit/releases/tag/v0.1.0)を導入し、その後の継続運用まで示す最小リファレンスです。

このリポジトリで扱う「Pocket Garden」と、そのProduct判断に使う観測・設定・検証結果はすべて架空です。実在するユーザー調査や製品の主張ではありません。PDDR Kit自体の導入・保守に関する記録は、この公開リポジトリで実際に確認できるEvidenceを使用します。

## 何を確認できるか

- 公開済みPDDR Kitから生成された`.pddr/`管理ファイル
- プロジェクト固有のAI・開発者向けルール
- Evidenceへ辿れる、完了済みProduct判断の例
- 実際に触れるPocket GardenのBamboo Plot
- milestone auditから生まれたProcess判断の例
- checkpointを実施してもroutine workをPDDRへ昇格しない境界
- Pull Requestと`main`でPDDRを検証するGitHub Actions
- Issue / PRとPDDRを使い分ける最小運用

## 読む順番

1. [`AGENTS.md`](AGENTS.md) — いつPDDRを作り、節目でどう棚卸しするか
2. [`PDDR-0001`](docs/records/PDDR-0001-local-time-reminders.md) — 架空Product判断の完成例
3. [`reminder-discovery.md`](docs/evidence/reminder-discovery.md) — 判断前の架空観測
4. [`reminder-policy.json`](example/reminder-policy.json) — 判断を反映した架空成果物
5. [`reminder-validation.md`](docs/evidence/reminder-validation.md) — 判断後の架空検証
6. [`maintenance-audit-2026-09-22.md`](docs/evidence/maintenance-audit-2026-09-22.md) — 実際のrepository棚卸し
7. [`PDDR-0002`](docs/records/PDDR-0002-milestone-audit-checkpoints.md) — 棚卸しから昇格したProcess判断
8. [`PDDR-0003`](docs/records/PDDR-0003-executable-bamboo-plot.md) — 実行可能なBamboo Plotを持つProject / Product判断
9. [`app/`](app/) — 実際に触れる最小の竹の子

## 継続運用の例

2026-09-22のmaintenance auditでは、導入済み`.pddr/`管理ファイルがPDDR Kit mainと同一であり、Kit自体のupgradeは不要でした。また、Dependabot導入はroutine maintenanceとしてPDDRへ昇格していません。

一方、PDDR Kitのdogfoodingから得られたmilestone audit guidanceは、このサンプルでも将来の記録漏れを防ぐProcess判断として採用し、`AGENTS.md`へcheckpointを接続してPDDR-0002へ記録しています。

## Bamboo Plotを触る

Phase 1ではprovider固有のdeployment設定をまだ入れず、静的frontendとして起動できます。

```bash
python -m http.server 8000 -d app
```

ブラウザで `http://localhost:8000` を開くと、竹の子へ水をやって少し育てられます。状態はこのPhaseではbrowser local storageにだけ保存します。

- [Issue #7](https://github.com/serevy/pddr-greenfield-example/issues/7) — 最初のscopeとdeferred decisions
- [PDDR-0003](docs/records/PDDR-0003-executable-bamboo-plot.md) — なぜ実行可能な竹サンプルを持つか

serverless hosting providerやdurable persistenceは、Bamboo Plotを触った後のEvidenceを使って次の判断として扱います。

## 検証する

Python 3.10以降でPDDRを検証します。

```bash
python .pddr/pddr.py validate
```

## Issue / PRとPDDRの境界

IssueやPRには仮説、作業計画、途中経過、生の検証結果、routine maintenanceを残します。PDDRには、それらを根拠に採用・不採用・保留した、将来も理由を参照すべき重要な判断だけを残します。

このサンプルはPDDR仕様の正本ではありません。最新の仕様と導入方法は[PDDR Kit](https://github.com/serevy/pddr-kit)を参照してください。
