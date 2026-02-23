# MCP Image Generation Server with Web UI

A full-stack AI image generation system featuring a backend MCP server (stdio + HTTP) and a modern "UI Mastery Pro" web interface.

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   cd web && npm install
   cd ..
   ```

2. **Setup Environment**
   Ensure `.env` is configured with `PB_URL`, `HF_API_KEY`, etc. (See root `.env.example`).
   Web app uses `http://localhost:8787` for API calls.

3. **Run PocketBase**
   ```bash
   ./pocketbase serve
   ```

4. **Start Everything (MCP + API + Web)**
   ```bash
   npm run dev
   ```
   - Web UI: http://localhost:5173
   - API: http://localhost:8787
   - MCP: Stdio (hidden, for agent use)

## Architecture

- **Root**: Node.js backend (TypeScript)
  - `src/server.ts`: MCP stdio server
  - `src/httpServer.ts`: Express API for Web UI
  - `src/services/`: Shared business logic
  - `src/tools/`: Shared tool definitions
- **web/**: React + Vite + TailwindCSS frontend

## API Endpoints

- `GET /api/prompts`: List all prompts
- `POST /api/generate`: Generate image (Input: `{ promptText, width, height }`)
- `GET /api/generations`: List recent generations

## Troubleshooting

- **CORS Errors**: Check `src/httpServer.ts` CORS configuration.
- **Port Conflicts**: API defaults to 8787, Web to 5173.
