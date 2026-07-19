# Injective Terminal v7.6.7 — Chain Edition Rewards

Versione senza cloud con card Reward prelevati letta direttamente dalle transazioni Injective.

- Rileva MsgWithdrawDelegatorReward riusciti.
- Somma gli INJ prelevati.
- Mostra ultimo prelievo, data, validator e link alla transazione.
- Pulsante Rileggi on-chain e paginazione.
- localStorage usato solo come cache.

# Injective Terminal v7.6.2 — Chain Edition

Questa versione non usa cloud, Vercel Blob, backend o cron.

## Protezione dei dati

- Storico reward: ricostruito dalle transazioni Injective on-chain.
- Crescita staking: ricostruita da delegate, compound, undelegate e redelegate on-chain.
- La cache locale serve solo per velocizzare l'apertura e per funzionare temporaneamente offline.
- Cancellando il browser, i dati on-chain vengono recuperati nuovamente caricando il wallet.
- Dati solo locali (nomi wallet, alert, obiettivi, preferenze) vanno protetti con **Esporta JSON** e possono essere ripristinati con **Importa backup**.

## Deploy

Carica `index.html`, `app.js`, `style.css`, `package.json` e `vercel.json` su GitHub e importa il repository in Vercel. Non collegare Blob e non configurare CRON_SECRET.


## Correzione v7.6.2

- I grafici espandono automaticamente la finestra visibile quando arrivano nuovi punti.
- Il canvas viene ridisegnato dopo la ricostruzione on-chain.
- Canvas Market, Net Worth e Growth forzati al 100% della larghezza disponibile.


## v7.6.2 — Dashboard essenziale

Le card **Storico Reward** e **Crescita staking** sono state rimosse insieme alle relative scansioni automatiche on-chain. La Chain Edition continua a leggere direttamente saldo, staking, reward correnti, validator e dati di mercato.
