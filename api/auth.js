export default async function handler(req, res) {
  const {code} = req.query;
  if (!code) return res.redirect(`https://github.com/login/oauth/authorize?client_id=Ov23lilWuf4RoPUbZcp5&scope=repo`);
  const r = await fetch("https://github.com/login/oauth/access_token", {method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({client_id:"Ov23lilWuf4RoPUbZcp5",client_secret:"652fbbe782ad67968306f59f0b0fc6df199c1e06",code})});
  const d = await r.json();
  res.send(`<script>window.opener.postMessage("authorization:github:success:{\"token\":\"${d.access_token}\",\"provider\":\"github\"}", "*");window.close();<\/script>`);
}
