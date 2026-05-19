export default function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      name: "Thread Master Orchestrator",
      status: "active",
      wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
      platform: "Thread Master",
      version: "1.0.0"
    });
  }

  if (req.method === 'POST') {
    return res.status(200).json({
      success: true,
      received: req.body,
      agent: "Thread Master Orchestrator"
    });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
