# Cloudflare Visitor Map Worker

This Worker queries Cloudflare GraphQL Analytics and exposes two endpoints:

- `/`
  Returns JSON for the homepage footer module, including `embed_url`.
- `/embed`
  Returns a self-contained HTML visitor map panel that can be embedded in an iframe.

## Required token scope

Create a Cloudflare API token with:

- `Analytics & Logs` → `Account Analytics` → `Read`

Scope the token only to the account and zone that serve this website.

## Setup

1. Install Wrangler and log in.
2. Update `CF_ZONE_TAG` in `wrangler.toml`.
3. Save the API token as a secret:

```bash
wrangler secret put CF_API_TOKEN
```

4. Deploy:

```bash
wrangler deploy
```

5. Copy the deployed Worker URL and set it in [_config.yml](../../_config.yml):

```yml
visitor_map:
  enabled: true
  cloudflare_endpoint: https://visitor-map-api.<your-subdomain>.workers.dev
  gaode_key: "YOUR_GAODE_WEB_KEY"
  # 二选一（与高德「JS API 安全密钥」文档一致）:
  # gaode_service_host: "https://your-domain.com/_AMapService"  # 代理（生产推荐）
  gaode_security_key: "YOUR_SECURITY_JS_CODE"  # 明文（仅便捷开发）
```

The homepage visitor map uses **AntV L7** with a **Gaode (高德)** basemap. Apply a [Web 端 (JS API) Key](https://lbs.amap.com/) and either **proxy** (`serviceHost` → `gaode_service_host`) or **plaintext** (`securityJsCode` → `gaode_security_key`). The layout sets `window._AMapSecurityConfig` in `<head>` **before** the L7 bundle (same order as official sync load). Run `npm run build:visitor-map` after editing [`assets/js/visitor-map.entry.js`](../../assets/js/visitor-map.entry.js).

## Notes

- The Worker uses `httpRequestsAdaptiveGroups` with `requestSource: "eyeball"` to avoid counting internal Cloudflare traffic.
- The homepage fetches the Worker root endpoint, reads `embed_url`, and loads the iframe automatically.
- `VISITOR_MAP_DAYS` and `VISITOR_MAP_LIMIT` are optional knobs for the displayed time window and country count.
