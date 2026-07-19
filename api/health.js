export default function handler(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify({
    ok: true,
    version: '7.5.1',
    hobbyCron: 'daily 03:17 UTC',
    githubActionsSync: 'supported',
    blobConfigured: Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_OIDC_TOKEN),
    cronProtected: Boolean(process.env.CRON_SECRET),
    now: new Date().toISOString(),
  }));
}
