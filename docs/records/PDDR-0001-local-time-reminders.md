---
id: PDDR-0001
title: Default reminders follow the user's local time
decision_date: 2026-09-18
recorded_date: 2026-09-18
decision_status: accepted
delivery_status: validated
scope:
  - product
owners:
  - Example Maintainer
evidence:
  - docs/evidence/reminder-discovery.md
  - example/reminder-policy.json
  - docs/evidence/reminder-validation.md
related: []
supersedes: []
superseded_by: null
---

# PDDR-0001: Default reminders follow the user's local time

## Summary

Pocket Garden v0.1の水やり通知は、ユーザーのローカル時刻で午前9時を既定値とする。タイムゾーンを確認できない場合は通知を推測で予約せず、設定を求める。

## Context and observations

架空の探索メモでは、利用者は「朝に通知される」と理解しており、固定UTC時刻では地域によって夜間に通知されることが確認された。一方、初回起動時に通知時刻の入力を必須にすると、植物登録までの手順が増える。

この判断はPocket Garden v0.1の水やり通知だけを対象とする。通知チャネル、クラウド同期、複数端末間の競合解決は対象外である。

## Options considered

### Option A: 固定UTC時刻

- Description: 全ユーザーへ09:00 UTCに通知する。
- Benefits: サーバー側の処理が単純。
- Costs / constraints: 地域によって夜間や夕方に通知され、「朝」という意図を満たさない。
- Status: rejected

### Option B: 初回起動時に時刻設定を必須にする

- Description: 通知を有効化する前に、全ユーザーへ時刻選択を求める。
- Benefits: 明示的な選択を保存できる。
- Costs / constraints: 初回登録の手順が増える。
- Status: considered

### Option C: ローカル時刻の既定値と安全なfallback

- Description: 端末のローカル時刻で09:00を既定値とし、タイムゾーン不明時は通知を予約しない。
- Benefits: 追加操作なしで「朝」の意図に近づき、推測による誤配信を避けられる。
- Costs / constraints: タイムゾーン変更への追従と、未取得時の設定案内が必要。
- Status: accepted

## Decision

Example Maintainerは2026-09-18にOption CをPocket Garden v0.1へ採用した。ユーザーは既定時刻を変更または通知を無効化できる。

この判断から、他の種類の通知も同じ時刻にすることや、タイムゾーンを取得するための追加権限を要求することは導けない。

## Delivery and validation

判断は[`example/reminder-policy.json`](../../example/reminder-policy.json)へ反映した。架空の検証シナリオで、ローカル時刻の既定値、ユーザー設定の優先、タイムゾーン不明時のfallbackを確認したため、`delivery_status`を`validated`とする。

## Consequences

- 利用者の地域にかかわらず、既定通知を現地の朝として説明できる。
- タイムゾーンを確認できない場合、通知より誤配信回避を優先する。
- 旅行や端末設定変更時の再計算が必要になる。
- 通知チャネルやクラウド同期の方針は未決定のまま残る。

## Revisit when

- タイムゾーン移動後に通知時刻がずれる事例が確認されたとき
- 複数端末同期を設計するとき
- 利用者が既定時刻を変更する割合を実データで確認できるようになったとき

## Evidence

- [架空の探索メモ](../evidence/reminder-discovery.md)
- [判断を反映した設定](../../example/reminder-policy.json)
- [架空の検証結果](../evidence/reminder-validation.md)

## Related records

なし。
