# Cloudflare Worker Setup

Deploy the API proxy to Cloudflare so users don't need their own API keys.

## Quick Deploy

If you have [sanatan-verse-sdk](https://github.com/sanatan-learnings/sanatan-verse-sdk) installed:

```bash
verse-deploy
```

Otherwise, follow the setup steps below.

## Why Use This?

- Users don't need to enter API keys
- Your provider secrets stay secure on Cloudflare
- Free tier: 100,000 requests/day
- Cost: ~$0.01 per user query

## Setup

### 1. Install Wrangler

```bash
npm install -g wrangler
wrangler login
```

### 2. Configure Account

Get your account ID from https://dash.cloudflare.com/ → Workers & Pages

Edit `wrangler.toml`:
```toml
account_id = "your-account-id-here"
```

### 3. Set Secrets

```bash
wrangler secret put OPENAI_API_KEY
# Optional, if using Hugging Face embeddings
wrangler secret put HF_TOKEN

# Optional, if using Bedrock embeddings
wrangler secret put AWS_ACCESS_KEY_ID
wrangler secret put AWS_SECRET_ACCESS_KEY
wrangler secret put AWS_SESSION_TOKEN   # only for temporary credentials
```

### 4. Deploy

```bash
wrangler deploy
```

Copy the worker URL from the output: `https://krishna-gpt-api.your-subdomain.workers.dev`

### 5. Configure Runtime URL

Set the deployed worker URL in `assets/js/guidance.js`:

```javascript
const WORKER_URL = 'https://krishna-gpt-api.your-subdomain.workers.dev';
```

Commit and push:

```bash
git add assets/js/guidance.js
git commit -m "Configure Cloudflare Worker URL"
git push
```

### 6. Test

Visit your site's guidance page and ask a question. It should work without entering a user API key.

## Monitor Usage

- **Cloudflare**: https://dash.cloudflare.com/ → Workers & Pages
- **OpenAI**: https://platform.openai.com/usage

Expected costs: ~$10/month for 1,000 daily queries.

## Troubleshooting

**Worker not found:**
```bash
wrangler whoami
wrangler deploy
```

**CORS errors (local testing):**

Edit `workers/cloudflare-worker.js` temporarily:
```javascript
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',  // Change back to your domain before deploying
  // ...
};
```

**Secrets errors:**
```bash
wrangler secret list           # Check if set
wrangler secret put OPENAI_API_KEY  # Update
```

**Rate limiting:**

Edit `workers/cloudflare-worker.js` to adjust:
```javascript
const RATE_LIMIT = {
  requests: 10,     // Increase if needed
  per: 60 * 1000,
};
```

## Local Development

Test locally before deploying:

```bash
# Create .dev.vars file
cat > .dev.vars <<'EOF'
OPENAI_API_KEY=sk-...
# Optional:
# HF_TOKEN=hf_...
# AWS_ACCESS_KEY_ID=...
# AWS_SECRET_ACCESS_KEY=...
# AWS_SESSION_TOKEN=...
EOF

# Start local server
wrangler dev

# Test
curl -X POST http://localhost:8787 \
  -H "Content-Type: application/json" \
  -d '{"type":"chat_openai","messages":[{"role":"user","content":"Test"}]}'
```

## Update Worker

After editing `workers/cloudflare-worker.js`:

```bash
wrangler deploy
```

Secrets persist across deployments.

## Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [OpenAI API Docs](https://platform.openai.com/docs/)
