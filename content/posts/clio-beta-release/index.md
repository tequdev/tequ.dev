---
title: 'XRPLのAPIサーバ Clioのベータリリース'
updated: '2022/03/23'
tags: [XRP]
---

2022/3/23、RippleX と XRPL 財団により XRP Ledger の API サーバとなる Clio のベータ版がリリースされました。

Clio は XRP Ledger の WebSocket や HTTP API に特化した API サーバです。これまで rippled ノードが担っていた API サーバの役割を代わりに果たすことにより、rippled ノードの負担を軽減することが出来ます。

トランザクションを保存するために、rippled と比較し Clio は 1/4 の容量しか必要としません。
現在、全履歴サーバを稼働させるには十数 TB の SSD が必要とされていますが、ノードの運用が必要なく、トランザクション履歴の参照のみであれば、5TB 程で全履歴を参照することが可能となります。

今後のアップデートでは Postgres への対応も予定されており、Ripple 社の Ripple Data API(現在は非推奨)のような柔軟な API が利用できることが期待されます。

---

[Release Notes](https://xrpl.org/blog/2022/introducing-clio.html)

[Repository](https://github.com/XRPLF/clio)
