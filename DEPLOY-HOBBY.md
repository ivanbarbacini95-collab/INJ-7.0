# Pubblicazione su GitHub + Vercel Hobby

## 1. GitHub

Carica **tutti** i file di questa cartella nel branch principale del repository, inclusa la cartella nascosta:

```text
.github/workflows/cloud-history-sync.yml
```

In GitHub apri **Settings → Secrets and variables → Actions**:

### Variable

Crea una *Repository variable*:

- Nome: `VERCEL_APP_URL`
- Valore: il dominio Production completo, ad esempio `https://nome-progetto.vercel.app`

### Secret

Crea un *Repository secret*:

- Nome: `CRON_SECRET`
- Valore: una stringa casuale di almeno 16 caratteri

Il workflow GitHub richiama il backend ogni 30 minuti e può essere avviato anche manualmente da **Actions → Cloud history sync → Run workflow**.

## 2. Vercel

1. Importa il repository GitHub.
2. Collega uno storage **Vercel Blob Private**.
3. In **Settings → Environment Variables** aggiungi `CRON_SECRET` usando esattamente lo stesso valore salvato in GitHub.
4. Esegui un deploy Production.
5. Apri `/api/health` e controlla:
   - `blobConfigured: true`
   - `cronProtected: true`
6. Apri la dashboard, seleziona il wallet e premi una volta **Sincronizza cloud**.

## Frequenze

- Dashboard aperta: sincronizzazione automatica immediata e poi periodica.
- Dashboard chiusa: GitHub Actions richiama il server ogni 30 minuti.
- Backup Vercel Hobby: cron giornaliero alle 03:17 UTC, eseguito da Vercel entro quella fascia oraria.
- Riapertura della dashboard: recupero immediato di tutte le transazioni non ancora registrate.

## Verifica manuale

Apri GitHub **Actions**, seleziona `Cloud history sync` e premi **Run workflow**. Il risultato deve contenere:

```json
{"ok":true}
```

Se compare `Unauthorized`, i due valori `CRON_SECRET` non coincidono.
