INJECTIVE TERMINAL v7.5.1 — CLOUD HISTORY HOBBY

1. Carica tutta la cartella su GitHub, inclusa .github.
2. Importa il repository in Vercel.
3. Collega Vercel Blob Private.
4. Imposta CRON_SECRET in Vercel.
5. In GitHub Actions crea:
   - Repository variable VERCEL_APP_URL = dominio Production Vercel
   - Repository secret CRON_SECRET = stesso valore usato su Vercel
6. Esegui il deploy Production.
7. Controlla /api/health.
8. Apri il wallet e premi Sincronizza cloud.

GitHub Actions sincronizza ogni 30 minuti.
Vercel Hobby esegue inoltre un controllo giornaliero di sicurezza.
La dashboard sincronizza immediatamente quando viene aperta.

Istruzioni dettagliate: DEPLOY-HOBBY.md
