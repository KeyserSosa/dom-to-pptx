#!/usr/bin/env node

/**
 * dom-to-pptx-exporter  ─  Headless PPTX Exporter CLI
 *
 * Usage:
 *   dom-to-pptx-exporter <htmlFile> [options]
 *
 * Options:
 *   --output, -o   <path>          Output .pptx file path  [default: same dir as input]
 *   --selector     <css>           CSS selector for slide elements  [default: .slide]
 *   --inject                       Force-inject the local browser bundle even if lib detected
 *   --title        <text>          Presentation title metadata
 *   --author       <text>          Presentation author metadata
 *   --width        <number>        Slide width in inches  [default: 10]
 *   --height       <number>        Slide height in inches [default: 5.625]
 *   --help, -h                     Show this help message
 */

import path from 'path';
import fs from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── ANSI helpers ─────────────────────────────────────────────────────────────
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
};

const logo = `
${c.cyan} ____   ___  __  __   _____ ___    ____  ____  _____ ${c.reset}
${c.cyan}|  _ \\ / _ \\|  \\/  | |_   _/ _ \\  |  _ \\|  _ \\|_   _|${c.reset}
${c.cyan}| | | | | | | |\\/| |   | || | | | | |_) | |_) || |  ${c.reset}
${c.cyan}| |_| | |_| | |  | |   | || |_| | |  __/|  __/ | |  ${c.reset}
${c.cyan}|____/ \\___/|_|  |_|   |_| \\___/  |_|   |_|    |_|  ${c.reset}

       ${c.bold}${c.green}E X P O R T E R${c.reset}   ${c.dim}— Headless HTML to PPTX Conversion CLI${c.reset}
       ${c.dim}------------------------------------------------------${c.reset}
`;

// ─── Help Text ────────────────────────────────────────────────────────────────
function printHelp() {
  console.log(logo);
  console.log(`${c.bold}Usage:${c.reset}`);
  console.log(`  ${c.cyan}dom-to-pptx-exporter${c.reset} ${c.yellow}<htmlFile>${c.reset} [options]\n`);

  console.log(`${c.bold}Export Options:${c.reset}`);
  const opts = [
    ['--output,  -o  <path>', 'Output .pptx path (default: <input>.pptx)'],
    ['--selector, -s  <css>', 'CSS selector for slide elements (default: .slide)'],
    ['--inject', 'Force-inject the local browser bundle into the page'],
    ['--title        <text>', 'Presentation title metadata'],
    ['--author       <text>', 'Presentation author metadata'],
    ['--width        <num>', 'Slide width in inches (default: 10)'],
    ['--height       <num>', 'Slide height in inches (default: 5.625)'],
    ['--help,    -h', 'Show this help message'],
  ];
  opts.forEach(([flag, desc]) => {
    console.log(`  ${c.yellow}${flag.padEnd(26)}${c.reset}  ${c.dim}${desc}${c.reset}`);
  });

  console.log(`\n${c.bold}Examples:${c.reset}`);
  console.log(`  ${c.dim}# Raw HTML — inject lib and auto-detect .slide elements${c.reset}`);
  console.log(`  ${c.cyan}dom-to-pptx-exporter${c.reset} slides.html\n`);

  console.log(`  ${c.dim}# Use a custom CSS selector${c.reset}`);
  console.log(`  ${c.cyan}dom-to-pptx-exporter${c.reset} slides.html ${c.yellow}-s${c.reset} ".presentation-slide"\n`);
}

// ─── Arg Parser ───────────────────────────────────────────────────────────────
function parseArgs(argv) {
  const args = { _: [] };
  let i = 0;
  while (i < argv.length) {
    const a = argv[i];
    if (a === '--help' || a === '-h') {
      args.help = true;
    } else if ((a === '--output' || a === '-o') && argv[i + 1]) {
      args.output = argv[++i];
    } else if ((a === '--selector' || a === '-s') && argv[i + 1]) {
      args.selector = argv[++i];
    } else if (a === '--inject') {
      args.inject = true;
    } else if (a === '--title' && argv[i + 1]) {
      args.title = argv[++i];
    } else if (a === '--author' && argv[i + 1]) {
      args.author = argv[++i];
    } else if (a === '--width' && argv[i + 1]) {
      args.width = parseFloat(argv[++i]);
    } else if (a === '--height' && argv[i + 1]) {
      args.height = parseFloat(argv[++i]);
    } else if (!a.startsWith('-')) {
      args._.push(a);
    }
    i++;
  }
  return args;
}

// ─── Export Command Execution ──────────────────────────────────────────────────
async function runExporter(argv) {
  const args = parseArgs(argv);

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  // Find first positional argument. If it is "export", take the next positional.
  let htmlSource = args._[0];
  if (htmlSource === 'export') {
    htmlSource = args._[1];
  }

  if (!htmlSource) {
    console.error(`${c.red}❌  No HTML file specified.${c.reset}`);
    console.error(
      `${c.cyan}💡  Try:${c.reset} Specify a path to a local HTML file or a URL (e.g. \`dom-to-pptx-exporter slides.html\`).`
    );
    console.error(`${c.dim}For options: dom-to-pptx-exporter --help${c.reset}\n`);
    process.exit(1);
  }

  // Resolve output path
  const isUrl = htmlSource.startsWith('http://') || htmlSource.startsWith('https://');
  let resolvedInput = htmlSource;
  if (!isUrl) {
    resolvedInput = path.resolve(htmlSource);
    if (!fs.existsSync(resolvedInput)) {
      console.error(`${c.red}❌  HTML file not found:${c.reset} ${resolvedInput}`);
      console.error(
        `${c.cyan}💡  Try:${c.reset} Check if the file path is correct, or if it is a URL, verify the protocol prefix (http:// or https://).`
      );
      process.exit(1);
    }
  }

  const defaultOutput = isUrl
    ? path.join(process.cwd(), 'presentation.pptx')
    : resolvedInput.replace(/\.html?$/i, '') + '.pptx';
  const outputPath = args.output ? path.resolve(args.output) : defaultOutput;

  // Build options for node-exporter
  const exporterOptions = {
    selector: args.selector || '.slide',
    injectBundle: args.inject || false,
    pptxOptions: {
      ...(args.title && { title: args.title }),
      ...(args.author && { author: args.author }),
      ...(args.width && { slideWidth: args.width }),
      ...(args.height && { slideHeight: args.height }),
    },
  };

  console.log(logo);
  console.log(`${c.bold}Exporting:${c.reset}  ${c.cyan}${resolvedInput}${c.reset}`);
  console.log(`${c.bold}Output:    ${c.reset}  ${c.green}${outputPath}${c.reset}`);
  console.log(
    `${c.bold}Mode:      ${c.reset}  ${c.yellow}programmatic${c.reset} (selector: ${c.dim}${exporterOptions.selector}${c.reset})`
  );
  console.log();

  let exportHtmlToPptx;
  try {
    // Import from the built node exporter. Prefer dist/, fallback to source.
    // Use pathToFileURL so Windows drive letters (e.g. i:) are valid ESM URLs.
    const distPath = path.resolve(__dirname, '..', 'dist', 'dom-to-pptx-node.mjs');
    const srcPath = path.resolve(__dirname, '..', 'src', 'node-exporter.js');
    const importTarget = pathToFileURL(fs.existsSync(distPath) ? distPath : srcPath).href;
    ({ exportHtmlToPptx } = await import(importTarget));
  } catch (err) {
    console.error(`${c.red}❌  Failed to load the node exporter:${c.reset}`, err.message);
    console.error(`${c.cyan}💡  Try:${c.reset}`);
    console.error(`  1. Run "${c.bold}pnpm run build${c.reset}" to build the distribution bundles.`);
    console.error(
      `  2. Ensure all dependencies are installed using "${c.bold}pnpm install${c.reset}" (especially "${c.bold}puppeteer${c.reset}").`
    );
    process.exit(1);
  }

  try {
    process.stdout.write(`${c.dim}⏳  Launching headless browser...${c.reset}\n`);
    const buffer = await exportHtmlToPptx(htmlSource, exporterOptions);

    fs.writeFileSync(outputPath, buffer);
    console.log(`\n${c.green}${c.bold}✅  Export complete!${c.reset}`);
    console.log(`   ${c.dim}Saved to:${c.reset} ${c.cyan}${outputPath}${c.reset}\n`);
    process.exit(0);
  } catch (err) {
    console.error(`\n${c.red}❌  Export failed:${c.reset}`, err.message);
    console.error(`${c.cyan}💡  Try:${c.reset}`);
    if (err.message.includes('selector') || err.message.includes('matching')) {
      console.error(
        `  - Make sure elements matching the CSS selector "${exporterOptions.selector}" exist in the HTML file.`
      );
      console.error(
        `  - If the HTML loads content dynamically, verify that the slides are fully rendered when network is idle.`
      );
    } else if (
      err.message.includes('puppeteer') ||
      err.message.includes('browser') ||
      err.message.includes('chrome') ||
      err.message.includes('executable')
    ) {
      console.error(
        `  - Ensure a compatible web browser (Google Chrome, Microsoft Edge, Chromium, or Firefox) is installed on your system.`
      );
      console.error(
        `  - On Windows, install Chrome or Edge. On Linux, run "sudo apt install chromium-browser" or install Chrome.`
      );
      console.error(
        `  - Alternatively, run with internet access to let dom-to-pptx auto-download a headless Chrome binary.`
      );
    } else {
      console.error(`  - Double check that the HTML file is valid and doesn't contain syntax errors.`);
      console.error(`  - Check console logs of the browser or verify page structure.`);
    }
    process.exit(1);
  }
}

export { runExporter };

// Auto-run only when executed directly
const isMain =
  process.argv[1] && (process.argv[1].endsWith('cli-exporter.js') || process.argv[1].endsWith('dom-to-pptx-exporter'));
if (isMain) {
  runExporter(process.argv.slice(2));
}
