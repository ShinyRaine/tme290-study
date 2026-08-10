// TME290 错题本跨端同步 —— Vercel Serverless Function（无需 Next.js / 无依赖）
//
// 存储后端：Upstash Redis。在 Vercel 项目里接入 Upstash（Storage → Marketplace →
// Upstash Redis，或 KV）后，会自动注入下列环境变量之一组，本函数按存在的读取：
//   KV_REST_API_URL / KV_REST_API_TOKEN          （Vercel KV 命名）
//   UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
//
// 接口：
//   GET  /api/errors?code=<口令>              → { data:{...}, updatedAt }
//   POST /api/errors  { code, data, updatedAt } → { ok:true }
// 口令即数据的 key，换设备输同样口令即可拉到同一份错题本。

var REST_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
var REST_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(command) {
  var r = await fetch(REST_URL, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + REST_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
  });
  if (!r.ok) throw new Error('redis ' + r.status);
  var j = await r.json();
  return j.result;
}

function isValidCode(c) { return /^[A-Za-z0-9_-]{4,64}$/.test(c); }
function keyFor(c) { return 'tme290:wrongbook:' + c; }

module.exports = async function (req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!REST_URL || !REST_TOKEN) {
    res.status(500).json({ error: 'backend-not-configured', hint: '在 Vercel 里接入 Upstash Redis 并重新部署' });
    return;
  }
  try {
    if (req.method === 'GET') {
      var code = (req.query.code || '').toString().trim();
      if (!isValidCode(code)) { res.status(400).json({ error: 'bad-code' }); return; }
      var raw = await redis(['GET', keyFor(code)]);
      res.status(200).json(raw ? JSON.parse(raw) : { data: {}, updatedAt: 0 });
      return;
    }
    if (req.method === 'POST') {
      var body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      var pcode = (body.code || '').toString().trim();
      if (!isValidCode(pcode)) { res.status(400).json({ error: 'bad-code' }); return; }
      var payload = JSON.stringify({ data: body.data || {}, updatedAt: body.updatedAt || 0 });
      if (payload.length > 1024 * 1024) { res.status(413).json({ error: 'too-large' }); return; }
      await redis(['SET', keyFor(pcode), payload]);
      res.status(200).json({ ok: true });
      return;
    }
    res.status(405).json({ error: 'method-not-allowed' });
  } catch (e) {
    res.status(500).json({ error: 'server', detail: String((e && e.message) || e) });
  }
};
