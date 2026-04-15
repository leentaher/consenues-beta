const CLIENT_ID = 'Ov23lilWuf4RoPUbZcp5';
const CLIENT_SECRET = '652fbbe782ad67968306f59f0b0fc6df199c1e06';

export default async function handler(req, res) {
  const { code } = req.query;
  if (!code) {
    return res.redirect(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo`);
  }
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code })
  });
  const data = await response.json();
  const token = data.access_token;
  res.send(`<script>
    window.opener.postMessage('authorization:github:success:{"token":"${token}","provider":"github"}', '*');
    window.close();
  </script>`);
}
