// Helper functions for different tunnel services

export async function startLocalTunnel(port) {
  try {
    const localtunnel = await import("localtunnel");
    const tunnel = await localtunnel.default({ port });
    
    console.log("\n" + "=".repeat(50));
    console.log("✅ PUBLIC URL:");
    console.log(`   ${tunnel.url}`);
    console.log("=".repeat(50) + "\n");
    
    tunnel.on("close", () => {
      console.log("\n🛑 Tunnel closed");
      process.exit(0);
    });
    
    // Keep the process running
    process.on("SIGINT", () => {
      tunnel.close();
    });
    
  } catch (error) {
    console.error("❌ LocalTunnel error:", error.message);
    process.exit(1);
  }
}

// If called directly from command line
if (process.argv[2] === "localtunnel") {
  const port = parseInt(process.argv[3]);
  if (port) {
    startLocalTunnel(port);
  }
}
