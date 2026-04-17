"use strict";
// Patches the Electron binary's Info.plist so the Dock shows "Clawd"
// instead of "Electron" in dev mode. Runs automatically after npm install.

const { execFileSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const plist = path.join(__dirname, "../node_modules/electron/dist/Electron.app/Contents/Info.plist");

if (!fs.existsSync(plist)) {
  // Non-macOS or electron not yet installed — skip silently
  process.exit(0);
}

try {
  execFileSync("/usr/libexec/PlistBuddy", ["-c", "Set :CFBundleDisplayName Clawd", plist]);
  execFileSync("/usr/libexec/PlistBuddy", ["-c", "Set :CFBundleName Clawd", plist]);
  console.log("✓ Patched Electron.app name → Clawd");
} catch (e) {
  console.warn("Could not patch Electron.app Info.plist:", e.message);
}
