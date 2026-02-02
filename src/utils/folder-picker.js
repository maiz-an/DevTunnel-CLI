import { spawn } from "child_process";
import { platform } from "os";
import { writeFileSync, readFileSync, unlinkSync, existsSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

// Cross-platform native folder picker
export async function selectFolder() {
  const os = platform();
  const tempFile = join(tmpdir(), `folder-picker-${Date.now()}.txt`);
  
  try {
    if (os === "win32") {
      // Windows - Use MODERN OpenFileDialog (like website file uploads)
      const script = `
        Add-Type -AssemblyName System.Windows.Forms
        [System.Windows.Forms.Application]::EnableVisualStyles()
        
        $dialog = New-Object System.Windows.Forms.OpenFileDialog
        $dialog.Title = "Select your project folder"
        $dialog.Filter = "All files (*.*)|*.*"
        $dialog.CheckFileExists = $false
        $dialog.CheckPathExists = $true
        $dialog.ValidateNames = $false
        $dialog.FileName = "Folder Selection"
        $dialog.Multiselect = $false
        $dialog.InitialDirectory = [Environment]::GetFolderPath("UserProfile")
        
        $result = $dialog.ShowDialog()
        if ($result -eq [System.Windows.Forms.DialogResult]::OK) {
          $folderPath = Split-Path -Parent $dialog.FileName
          if (-not $folderPath) {
            $folderPath = $dialog.FileName
          }
          $folderPath | Out-File -FilePath "${tempFile.replace(/\\/g, '\\\\')}" -Encoding UTF8 -NoNewline
        }
      `;
      
      await runPowerShell(script);
      
    } else if (os === "darwin") {
      // macOS - Use osascript
      const script = `
        set folderPath to choose folder with prompt "Select your project folder"
        set posixPath to POSIX path of folderPath
        do shell script "echo " & quoted form of posixPath & " > '${tempFile}'"
      `;
      
      await runCommand("osascript", ["-e", script]);
      
    } else {
      // Linux - Try zenity first, then kdialog
      try {
        await runCommand("zenity", [
          "--file-selection",
          "--directory",
          "--title=Select your project folder"
        ], tempFile);
      } catch {
        await runCommand("kdialog", [
          "--getexistingdirectory",
          process.env.HOME || "/",
          "--title", "Select your project folder"
        ], tempFile);
      }
    }
    
    // Read the selected folder
    if (existsSync(tempFile)) {
      const folderPath = readFileSync(tempFile, "utf8").trim();
      unlinkSync(tempFile);
      return folderPath;
    }
    
    return null;
    
  } catch (error) {
    const msg = error && error.message ? error.message : String(error);
    if (os === "win32" && (msg.includes("ENOENT") || msg.includes("spawn powershell"))) {
      console.error("Folder picker: PowerShell not found. Run from a path or pass the project path as an argument.");
    } else if (os !== "win32" && os !== "darwin" && (msg.includes("ENOENT") || msg.includes("spawn"))) {
      console.error("Folder picker: zenity or kdialog not found. Install one (e.g. apt install zenity) or pass the project path as an argument.");
    } else {
      console.error("Folder picker error:", msg);
    }
    return null;
  }
}

// Run PowerShell command
function runPowerShell(script) {
  return new Promise((resolve, reject) => {
    const proc = spawn("powershell", [
      "-NoProfile",
      "-NonInteractive",
      "-ExecutionPolicy", "Bypass",
      "-Command", script
    ], { 
      stdio: ["ignore", "pipe", "pipe"],
      shell: false
    });
    
    let stderr = "";
    proc.stderr?.on("data", (data) => stderr += data.toString());
    
    proc.on("close", (code, signal) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(stderr || `PowerShell exited with code ${code ?? signal ?? 1}`));
      }
    });
    
    proc.on("error", (err) => {
      if (err.code === "ENOENT") {
        reject(new Error("PowerShell not found. Install it or use a different method to select the folder."));
      } else {
        reject(err);
      }
    });
  });
}

// Run generic command
function runCommand(command, args, outputFile) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, { 
      stdio: outputFile ? ["ignore", "pipe", "pipe"] : "pipe",
      shell: true
    });
    
    let stdout = "";
    
    if (outputFile) {
      proc.stdout?.on("data", (data) => {
        stdout += data.toString();
      });
    }
    
    proc.on("close", (code, signal) => {
      const exitCode = code ?? (signal ? 1 : 0);
      if (exitCode === 0) {
        if (outputFile && stdout) {
          try { writeFileSync(outputFile, stdout.trim()); } catch (_) {}
        }
        resolve();
      } else {
        reject(new Error(`Command failed with code ${exitCode}`));
      }
    });
    
    proc.on("error", (err) => {
      if (err.code === "ENOENT") {
        reject(new Error(`Command not found: ${command}`));
      } else {
        reject(err);
      }
    });
  });
}
