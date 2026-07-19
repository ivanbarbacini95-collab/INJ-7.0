# Injective Terminal v7.5.1 — Cloud History Hobby

Questa versione salva e sincronizza tra dispositivi, per ogni indirizzo Injective:

- **Storico Reward**: prelievi reward rilevati on-chain.
- **Crescita staking**: un punto per ogni nuova delega, compound, restake o unstake.
- **Migrazione locale**: i dati già presenti nel browser vengono fusi nel cloud senza duplicati.
- **Recupero a pagina chiusa**: il backend riprende dalla block height già elaborata e importa tutti i nuovi eventi.

## Perché ci sono due scheduler

Vercel Hobby permette un cron soltanto una volta al giorno. Questa release usa:

1. **GitHub Actions ogni 30 minuti** come sincronizzazione principale a pagina chiusa.
2. **Vercel Cron giornaliero** alle 03:17 UTC come sicurezza.
3. **Sincronizzazione all’apertura** per aggiornare immediatamente il wallet visualizzato.

La configurazione completa è in [`DEPLOY-HOBBY.md`](./DEPLOY-HOBBY.md).

## Pubblicazione essenziale

1. Carica tutta la cartella su GitHub, inclusa `.github`.
2. Importa il repository in Vercel.
3. Collega un archivio Vercel Blob privato.
4. Imposta lo stesso `CRON_SECRET` in Vercel e nei GitHub Actions secrets.
5. In GitHub crea la variabile `VERCEL_APP_URL` con il dominio Production Vercel.
6. Esegui il deploy Production.
7. Apri `/api/health` e verifica `blobConfigured: true` e `cronProtected: true`.
8. Apri ogni wallet almeno una volta e premi **Sincronizza cloud** per registrarlo e migrare lo storico locale.

## Funzionamento dei punti staking

Il server conserva `lastProcessedHeight` per ogni indirizzo. A ogni controllo legge tutte le transazioni successive e aggiunge un punto distinto per ciascuna variazione di staking. Non crea punti temporali artificiali e non sostituisce la serie con un solo snapshot.

Se il numero di transazioni arretrate supera il limite di sicurezza, la sincronizzazione non avanza il cursore: restituisce un errore invece di saltare punti.

## Modalità locale

Se Vercel Blob o il backend non sono configurati, la dashboard continua a funzionare con `localStorage`, ma la sincronizzazione tra dispositivi e il controllo a pagina chiusa non sono disponibili.
