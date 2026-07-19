import { listWalletAddresses } from './_lib/cloud-store.js';
import { syncWallet } from './_lib/sync-wallet.js';

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

async function runPool(items, worker, concurrency = 3) {
  const results = new Array(items.length);
  let cursor = 0;
  async function runner() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length || 1) }, runner));
  return results;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return send(res, 405, { ok: false, error: 'Metodo non consentito' });
  }

  const secret = String(process.env.CRON_SECRET || '');
  if (!secret) {
    return send(res, 503, { ok: false, error: 'CRON_SECRET non configurato' });
  }
  if (req.headers.authorization !== `Bearer ${secret}`) {
    return send(res, 401, { ok: false, error: 'Unauthorized' });
  }

  try {
    const addresses = (await listWalletAddresses()).slice(0, 50);
    const results = await runPool(addresses, async (address) => {
      try {
        const data = await syncWallet(address, { force: true });
        return {
          address,
          ok: true,
          updatedAt: data.updatedAt,
          rewards: data.rewardHistory?.length || 0,
          growthPoints: data.stakingGrowth?.length || 0,
        };
      } catch (error) {
        console.error('cron wallet', address, error);
        return { address, ok: false, error: error?.message || 'Errore' };
      }
    }, 3);

    return send(res, 200, {
      ok: true,
      source: String(req.query?.source || req.headers['user-agent'] || 'unknown'),
      checked: addresses.length,
      succeeded: results.filter((row) => row.ok).length,
      failed: results.filter((row) => !row.ok).length,
      completedAt: new Date().toISOString(),
      results,
    });
  } catch (error) {
    console.error('cron sync', error);
    return send(res, 500, { ok: false, error: error?.message || 'Errore cron' });
  }
}
