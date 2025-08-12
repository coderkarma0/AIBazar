#!/usr/bin/env node

/**
 * Deployment Verification Script
 *
 * This script verifies that the production build is working correctly
 * by checking for the existence of key files and validating their content.
 */

const fs = require("fs");
const path = require("path");

const BUILD_DIR = path.join(__dirname, "..", "out");
const REQUIRED_FILES = [
  "index.html",
  "tools/index.html",
  "leaderboard/index.html",
  "coupons/index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "_next/static",
];

const SAMPLE_TOOL_PAGES = [
  "tools/chatgpt/index.html",
  "tools/midjourney/index.html",
  "tools/notion-ai/index.html",
];

function checkFileExists(filePath) {
  const fullPath = path.join(BUILD_DIR, filePath);
  const exists = fs.existsSync(fullPath);
  console.log(`${exists ? "✅" : "❌"} ${filePath}`);
  return exists;
}

function checkFileContent(filePath, expectedContent) {
  const fullPath = path.join(BUILD_DIR, filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`❌ ${filePath} - File not found`);
    return false;
  }

  const content = fs.readFileSync(fullPath, "utf8");
  const hasContent = content.includes(expectedContent);
  console.log(
    `${hasContent ? "✅" : "❌"} ${filePath} - Contains "${expectedContent}"`
  );
  return hasContent;
}

function countToolPages() {
  const toolsDir = path.join(BUILD_DIR, "tools");
  if (!fs.existsSync(toolsDir)) {
    console.log("❌ Tools directory not found");
    return 0;
  }

  const toolDirs = fs
    .readdirSync(toolsDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory()).length;

  console.log(`✅ Generated ${toolDirs} tool pages`);
  return toolDirs;
}

function checkBundleSize() {
  const nextDir = path.join(BUILD_DIR, "_next");
  if (!fs.existsSync(nextDir)) {
    console.log("❌ _next directory not found");
    return false;
  }

  const staticDir = path.join(nextDir, "static");
  if (!fs.existsSync(staticDir)) {
    console.log("❌ Static assets directory not found");
    return false;
  }

  console.log("✅ Static assets generated");
  return true;
}

function main() {
  console.log("🚀 Verifying deployment build...\n");

  // Check if build directory exists
  if (!fs.existsSync(BUILD_DIR)) {
    console.log('❌ Build directory not found. Run "npm run build" first.');
    process.exit(1);
  }

  console.log("📁 Checking required files:");
  let allFilesExist = true;
  REQUIRED_FILES.forEach((file) => {
    if (!checkFileExists(file)) {
      allFilesExist = false;
    }
  });

  console.log("\n📄 Checking sample tool pages:");
  SAMPLE_TOOL_PAGES.forEach((file) => {
    if (!checkFileExists(file)) {
      allFilesExist = false;
    }
  });

  console.log("\n🔍 Checking page content:");
  const contentChecks = [
    ["index.html", "AI Tool Marketplace"],
    ["tools/index.html", "AI Tools"],
    ["leaderboard/index.html", "Leaderboard"],
    ["coupons/index.html", "Discount Coupons"],
    ["404.html", "Page Not Found"],
    ["robots.txt", "User-Agent"],
    ["sitemap.xml", "urlset"],
  ];

  let allContentValid = true;
  contentChecks.forEach(([file, content]) => {
    if (!checkFileContent(file, content)) {
      allContentValid = false;
    }
  });

  console.log("\n📊 Checking build statistics:");
  const toolCount = countToolPages();
  const hasBundles = checkBundleSize();

  console.log("\n📋 Verification Summary:");
  console.log(`Files exist: ${allFilesExist ? "✅" : "❌"}`);
  console.log(`Content valid: ${allContentValid ? "✅" : "❌"}`);
  console.log(
    `Tool pages: ${toolCount > 90 ? "✅" : "❌"} (${toolCount} generated)`
  );
  console.log(`Static assets: ${hasBundles ? "✅" : "❌"}`);

  const success =
    allFilesExist && allContentValid && toolCount > 90 && hasBundles;

  if (success) {
    console.log("\n🎉 Deployment verification passed! Ready to deploy.");
    process.exit(0);
  } else {
    console.log(
      "\n❌ Deployment verification failed. Please check the issues above."
    );
    process.exit(1);
  }
}

main();
