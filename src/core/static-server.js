/**
 * Minimal static file server for HTML projects.
 * Used only when devtunnel detects an HTML project and no server is running.
 * Usage: node static-server.js <directory> <port>
 */
import http from "http";
import fs from "fs";
import path from "path";
const ROOT = path.resolve(process.argv[2] || ".");
const PORT = parseInt(process.argv[3] || "5500", 10);

const MIME = {
  ".html": "text/html",
  ".htm": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain",
};

const server = http.createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method Not Allowed");
    return;
  }
  // Use only pathname (strip query string and hash) so /style.css?v=1 resolves to style.css
  const pathname = (req.url || "/").split("?")[0].split("#")[0];
  // Forward slashes only so /css/style.css works on Windows (path.normalize can break with \)
  const relative = (pathname || "/").replace(/^\/+/, "").replace(/\\/g, "/") || ".";
  let p = path.join(ROOT, relative);
  if (!path.isAbsolute(p)) p = path.join(ROOT, p);
  if (!p.startsWith(ROOT)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("Forbidden");
    return;
  }
  fs.stat(p, (err, stat) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
      return;
    }
    if (stat.isDirectory()) {
      p = path.join(p, "index.html");
      return fs.stat(p, (e2, s2) => {
        if (e2 || !s2.isFile()) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Not Found");
          return;
        }
        serveFile(p, s2, req, res);
      });
    }
    serveFile(p, stat, req, res);
  });
});

function serveFile(filePath, stat, req, res) {
  const ext = path.extname(filePath);
  const contentType = MIME[ext] || "application/octet-stream";
  res.setHeader("Content-Type", contentType);
  if (req.method === "HEAD") {
    res.setHeader("Content-Length", stat.size);
    res.end();
    return;
  }
  // For HTML: rewrite absolute localhost URLs so CSS/JS work when viewed through tunnel
  if (ext === ".html" || ext === ".htm") {
    try {
      let body = fs.readFileSync(filePath, "utf8");
      body = body.replace(/https?:\/\/127\.0\.0\.1:\d+\//g, "/");
      body = body.replace(/https?:\/\/localhost:\d+\//g, "/");
      res.setHeader("Content-Length", Buffer.byteLength(body, "utf8"));
      res.end(body);
      return;
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
      return;
    }
  }
  res.setHeader("Content-Length", stat.size);
  const stream = fs.createReadStream(filePath);
  stream.on("error", () => {
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  });
  stream.pipe(res);
}

server.listen(PORT, "127.0.0.1", () => {
  // Server ready; no console output to avoid cluttering devtunnel output
});
server.on("error", (err) => {
  process.exit(1);
});
