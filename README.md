# PDDR Greenfield Example

新規プロジェクトへ[PDDR Kit v0.1.0](https://github.com/serevy/pddr-kit/releases/tag/v0.1.0)を導入した、最小のリファレンスです。

このリポジトリで扱う「Pocket Garden」と、その観測・設定・検証結果はすべて架空です。実在するユーザー調査や製品の主張ではありません。

## 何を確認できるか

- 公開済みPDDR Kitから生成された`.pddr/`管理ファイル
- プロジェクト固有のAI・開発者向けルール
- Evidenceへ辿れる、完了済みProduct判断の例
- Pull Requestと`main`でPDDRを検証するGitHub Actions
- IssueとPDDRを使い分ける最小運用

## 読む順番

1. [`AGENTS.md`](AGENTS.md) — いつPDDRを作り、どう扱うか
2. [`PDDR-0001`](docs/records/PDDR-0001-local-time-reminders.md) — 判断記録の完成例
3. [`reminder-discovery.md`](docs/evidence/reminder-discovery.md) — 判断前の観測
4. [`reminder-policy.json`](example/reminder-policy.json) — 判断を反映した成果物
5. [`reminder-validation.md`](docs/evidence/reminder-validation.md) — 判断後の検証

## 検証する

Python 3.10以降で実行します。

```bash
python .pddr/pddr.py validate
```

## IssueとPDDRの境界

Issueには仮説、作業計画、途中経過、生の検証結果を残します。PDDRには、それらを根拠に採用・不採用・保留した、将来も理由を参照すべき重要な判断だけを残します。

このサンプルはPDDR仕様の正本ではありません。最新の仕様と導入方法は[PDDR Kit](https://github.com/serevy/pddr-kit)を参照してください。
