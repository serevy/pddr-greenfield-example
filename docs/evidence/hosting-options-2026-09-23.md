# Hosting options for Bamboo Plot — 2026-09-23

Bamboo Plot Phase 1を公開URLで触れる状態にするため、2026-09-23時点の公式ドキュメントを比較したEvidenceです。

## Current product state

- static HTML / CSS / JavaScript
- browser local storage only
- server-side APIなし
- durable persistenceなし
- authenticationなし

PDDR-0003で、公開URLへ進む時点をrevisit conditionとしていました。

## Option A: GitHub Pages

GitHub Pagesはrepository内のHTML / CSS / JavaScriptを公開できるstatic site hostingです。

Advantages:

- 現在のBamboo Plotをほぼそのまま公開できる
- GitHub repositoryとの距離が近い
- static-onlyなら設定が小さい

Constraints:

- server-side APIやdurable stateを同じruntimeへ自然に追加するplatformではない
- project siteは通常`/<repository-name>/`配下になる
- 将来server-side機能を追加すると別hosting / API基盤が必要になる

Official docs:

- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

## Option B: Cloudflare Pages

Cloudflare Pagesはstatic HTMLをGit連携でdeploymentでき、preview deploymentも提供します。

Advantages:

- 現在のstatic Bamboo Plotに適合
- GitHub連携とpreview deploymentを利用できる

Constraints:

- Cloudflare公式は2026年時点で、WorkersがPagesの大半のuse caseを扱え、より広いfeature setを持つprimary application platformだと案内している
- 今から新規applicationとして採用する理由はWorkersより弱い

Official docs:

- https://developers.cloudflare.com/pages/
- https://developers.cloudflare.com/pages/configuration/git-integration/

## Option C: Cloudflare Workers + Static Assets

Cloudflare Workersはstatic assetsをWorkerと一緒にdeploymentでき、requested pathにassetがある場合はデフォルトでWorker codeをinvokeせずstatic assetを返します。

Advantages:

- Phase 1のHTML / CSS / JSをstatic assetsとしてそのまま配信できる
- 後から同じapplicationへAPI routeやserver-side logicを追加できる
- 将来D1等のCloudflare bindingsへ進む余地を残せる
- Workers BuildsでGitHub repositoryと接続し、pushからbuild / deployできる
- preview build / URLをPR reviewへ接続できる

Constraints:

- static-onlyな現在だけを見ればGitHub Pagesよりdeployment設定が増える
- Cloudflare account側のGit integration設定が必要
- provider依存のWrangler configurationをrepositoryへ追加することになる

Official docs:

- https://developers.cloudflare.com/workers/static-assets/
- https://developers.cloudflare.com/workers/static-assets/get-started/
- https://developers.cloudflare.com/workers/ci-cd/builds/
- https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/

## Assessment

現時点の第一候補は **Cloudflare Workers + Static Assets**。

理由:

1. Phase 1のstatic frontendをそのまま公開できる
2. Bamboo Plotが次にserver-side stateやAPIを必要とした場合も、hosting providerを変えず段階的に拡張できる
3. GitHub-based development flowとpreview deploymentを維持できる
4. Cloudflare自身が新規applicationにWorkersをprimary platformとして案内している

ただし、このEvidenceは選定材料であり、maintainer approvalそのものではありません。
