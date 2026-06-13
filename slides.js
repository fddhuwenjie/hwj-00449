#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const FONT = {
  'A': ' ██ |█  █|█████|█   █|█   █',
  'B': '████ |█   █|████ |█   █|████ ',
  'C': ' ████|█   |█   |█   | ████',
  'D': '████ |█   █|█   █|█   █|████ ',
  'E': '█████|█   |████ |█   |█████',
  'F': '█████|█   |████ |█   |█   ',
  'G': ' ████|█   |█  ██|█   █| ████',
  'H': '█   █|█   █|█████|█   █|█   █',
  'I': '█████|  █  |  █  |  █  |█████',
  'J': '  ███|    █|    █|█   █| ███ ',
  'K': '█  █ |█ █  |██   |█ █  |█  █ ',
  'L': '█   |█   |█   |█   |█████',
  'M': '█   █|██ ██|█ █ █|█   █|█   █',
  'N': '█   █|██  █|█ █ █|█  ██|█   █',
  'O': ' ███ |█   █|█   █|█   █| ███ ',
  'P': '████ |█   █|████ |█   |█   ',
  'Q': ' ███ |█   █|█ █ █|█  █ | ██ █',
  'R': '████ |█   █|████ |█ █  |█  █ ',
  'S': ' ████|█   | ███ |    █|████ ',
  'T': '█████|  █  |  █  |  █  |  █  ',
  'U': '█   █|█   █|█   █|█   █| ███ ',
  'V': '█   █|█   █|█   █| █ █ |  █  ',
  'W': '█   █|█   █|█ █ █|██ ██|█   █',
  'X': '█   █| █ █ |  █  | █ █ |█   █',
  'Y': '█   █| █ █ |  █  |  █  |  █  ',
  'Z': '█████|   █ |  █  | █   |█████',
  '0': ' ███ |█  ██|█ █ █|██  █| ███ ',
  '1': '  █  | ██  |  █  |  █  | ███ ',
  '2': ' ███ |█   █|   █ |  █  |█████',
  '3': '████ |    █| ███ |    █|████ ',
  '4': '█  █ |█  █ |█████|   █ |   █ ',
  '5': '█████|█   |████ |    █|████ ',
  '6': ' ███ |█   |████ |█   █| ███ ',
  '7': '█████|    █|   █ |  █  |  █  ',
  '8': ' ███ |█   █| ███ |█   █| ███ ',
  '9': ' ███ |█   █| ████|    █| ███ ',
  '.': '     |     |     |  █  |     ',
  ',': '     |     |  █  |  █  | █   ',
  '!': '  █  |  █  |  █  |     |  █  ',
  '?': ' ███ |█   █|  █  |     |  █  ',
  '-': '     |     |█████|     |     ',
  '_': '     |     |     |     |█████',
  ':': '     |  █  |     |  █  |     ',
  '/': '    █|   █ |  █  | █   |█    ',
  '(': '  █  | █   |█    | █   |  █  ',
  ')': '  █  |   █ |    █|   █ |  █  ',
  "'": '  █  | █   |     |     |     ',
  '"': ' █ █ |     |     |     |     ',
  '&': ' ██  |█  █| ██  |█  ██| ██ █',
  '+': '     |  █  |█████|  █  |     ',
  '=': '     |█████|     |█████|     ',
  '#': ' █ █ |█████| █ █ |█████| █ █ ',
  ' ': '     |     |     |     |     ',
  '@': ' ███ |█ █ █|█ ██ |█    | ███ ',
  '<': '   █ |  █  | █   |  █  |   █ ',
  '>': ' █   |  █  |   █ |  █  | █   ',
  ';': '     |  █  |     |  █  | █   ',
  '*': ' █ █ |  █  |█████|  █  | █ █ ',
  '█': '█████|█████|█████|█████|█████',
};

const THEMES = {
  dark: {
    name: 'Dark',
    bg: '\x1b[48;5;235m',
    fg: '\x1b[38;5;252m',
    heading: '\x1b[38;5;81m',
    subheading: '\x1b[38;5;153m',
    accent: '\x1b[38;5;214m',
    code: '\x1b[38;5;78m',
    codeBg: '\x1b[48;5;236m',
    keyword: '\x1b[38;5;203m',
    string: '\x1b[38;5;150m',
    number: '\x1b[38;5;215m',
    comment: '\x1b[38;5;245m',
    bullet: '\x1b[38;5;214m',
    bold: '\x1b[1m',
    italic: '\x1b[3m',
    underline: '\x1b[4m',
    dim: '\x1b[38;5;243m',
    progressBar: '\x1b[48;5;81m',
    progressBg: '\x1b[48;5;239m',
    reset: '\x1b[0m',
  },
  light: {
    name: 'Light',
    bg: '\x1b[48;5;231m',
    fg: '\x1b[38;5;232m',
    heading: '\x1b[38;5;25m',
    subheading: '\x1b[38;5;31m',
    accent: '\x1b[38;5;166m',
    code: '\x1b[38;5;28m',
    codeBg: '\x1b[48;5;255m',
    keyword: '\x1b[38;5;161m',
    string: '\x1b[38;5;28m',
    number: '\x1b[38;5;202m',
    comment: '\x1b[38;5;247m',
    bullet: '\x1b[38;5;166m',
    bold: '\x1b[1m',
    italic: '\x1b[3m',
    underline: '\x1b[4m',
    dim: '\x1b[38;5;249m',
    progressBar: '\x1b[48;5;25m',
    progressBg: '\x1b[48;5;252m',
    reset: '\x1b[0m',
  },
  solarized: {
    name: 'Solarized',
    bg: '\x1b[48;5;230m',
    fg: '\x1b[38;5;240m',
    heading: '\x1b[38;5;33m',
    subheading: '\x1b[38;5;61m',
    accent: '\x1b[38;5;136m',
    code: '\x1b[38;5;37m',
    codeBg: '\x1b[48;5;229m',
    keyword: '\x1b[38;5;203m',
    string: '\x1b[38;5;64m',
    number: '\x1b[38;5;215m',
    comment: '\x1b[38;5;244m',
    bullet: '\x1b[38;5;136m',
    bold: '\x1b[1m',
    italic: '\x1b[3m',
    underline: '\x1b[4m',
    dim: '\x1b[38;5;245m',
    progressBar: '\x1b[48;5;33m',
    progressBg: '\x1b[48;5;229m',
    reset: '\x1b[0m',
  },
};

const ansi = {
  clear: '\x1b[2J\x1b[H',
  hideCursor: '\x1b[?25l',
  showCursor: '\x1b[?25h',
  reset: '\x1b[0m',
  move: (row, col) => `\x1b[${row};${col}H`,
  clearLine: '\x1b[2K',
  clearDown: '\x1b[J',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  fg: (n) => `\x1b[38;5;${n}m`,
  bg: (n) => `\x1b[48;5;${n}m`,
};

const JS_KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for',
  'while', 'do', 'switch', 'case', 'break', 'continue', 'new', 'this',
  'class', 'extends', 'import', 'export', 'default', 'from', 'as',
  'try', 'catch', 'finally', 'throw', 'typeof', 'instanceof', 'in',
  'of', 'async', 'await', 'yield', 'true', 'false', 'null', 'undefined',
  'void', 'delete', 'with', 'super', 'static', 'get', 'set',
]);

const PY_KEYWORDS = new Set([
  'def', 'class', 'import', 'from', 'return', 'if', 'elif', 'else',
  'for', 'while', 'try', 'except', 'finally', 'raise', 'with', 'as',
  'lambda', 'yield', 'pass', 'break', 'continue', 'and', 'or', 'not',
  'in', 'is', 'True', 'False', 'None', 'global', 'nonlocal', 'async',
  'await', 'del', 'assert',
]);

const LANG_KEYWORDS = {
  javascript: JS_KEYWORDS,
  js: JS_KEYWORDS,
  python: PY_KEYWORDS,
  py: PY_KEYWORDS,
  typescript: JS_KEYWORDS,
  ts: JS_KEYWORDS,
};

function processIncludes(content, baseDir, visited) {
  visited = visited || new Set();
  const lines = content.split('\n');
  let result = [];
  for (const line of lines) {
    const includeMatch = line.match(/^!include\((.+)\)\s*$/);
    if (includeMatch) {
      const includePath = path.resolve(baseDir, includeMatch[1].trim());
      if (visited.has(includePath)) {
        result.push(`<!-- Circular include skipped: ${includePath} -->`);
        continue;
      }
      if (!fs.existsSync(includePath)) {
        result.push(`<!-- Include file not found: ${includePath} -->`);
        continue;
      }
      visited.add(includePath);
      const includedContent = fs.readFileSync(includePath, 'utf-8');
      const processed = processIncludes(includedContent, path.dirname(includePath), visited);
      result.push(processed);
    } else {
      result.push(line);
    }
  }
  return result.join('\n');
}

function processConditionals(content, activeTags) {
  const tagSet = new Set(activeTags || []);
  const lines = content.split('\n');
  const result = [];
  let ifStack = [];
  let conditionTags = [];
  let slideHasConditional = false;
  let slideTags = new Set();
  const conditionalSlides = new Map();
  let currentSlide = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.match(/^---\s*$/)) {
      if (slideHasConditional) {
        conditionalSlides.set(currentSlide, new Set(slideTags));
      }
      currentSlide++;
      slideHasConditional = false;
      slideTags = new Set();
      result.push(line);
      continue;
    }

    const ifMatch = line.match(/^!if\(([^)]+)\)\s*$/);
    if (ifMatch) {
      const tag = ifMatch[1].trim();
      ifStack.push(tag);
      conditionTags.push(tag);
      slideHasConditional = true;
      slideTags.add(tag);
      continue;
    }

    if (line.match(/^!endif\s*$/)) {
      ifStack.pop();
      conditionTags.pop();
      continue;
    }

    let show = true;
    for (const tag of conditionTags) {
      if (!tagSet.has(tag)) {
        show = false;
        break;
      }
    }

    if (show) {
      result.push(line);
    }
  }

  if (slideHasConditional) {
    conditionalSlides.set(currentSlide, new Set(slideTags));
  }

  return { content: result.join('\n'), conditionalSlides };
}

function parseChartData(lines) {
  let chartType = null;
  const data = [];
  let title = '';

  function parsePair(str) {
    const eqIdx = str.indexOf('=');
    if (eqIdx === -1) return null;
    const label = str.slice(0, eqIdx).trim();
    let valStr = str.slice(eqIdx + 1).trim();
    const hasPercent = valStr.endsWith('%');
    if (hasPercent) valStr = valStr.slice(0, -1);
    const val = parseFloat(valStr);
    if (isNaN(val)) return null;
    return { label, value: val, hasPercent };
  }

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const typeMatch = trimmed.match(/^(bar|line|pie)\s*[:：]\s*(.*)$/i);
    if (typeMatch) {
      chartType = typeMatch[1].toLowerCase();
      const rest = typeMatch[2].trim();
      if (rest) {
        const pairs = rest.split(/[,，]/);
        for (const pair of pairs) {
          const p = parsePair(pair.trim());
          if (p) data.push(p);
        }
      }
      continue;
    }

    const pair = parsePair(trimmed);
    if (pair) {
      data.push(pair);
      continue;
    }

    if (!title && !chartType) {
      title = trimmed;
    }
  }

  return { type: chartType, data, title };
}

function parseSlides(content) {
  const rawSlides = content.split(/\n---\n/);
  return rawSlides.map((raw, i) => {
    const lines = raw.split('\n');
    const elements = [];
    let inCode = false;
    let codeLang = '';
    let codeLines = [];
    let notes = '';

    for (const line of lines) {
      const noteMatch = line.match(/<!--\s*notes:\s*(.*?)\s*-->/);
      if (noteMatch) {
        notes += (notes ? '\n' : '') + noteMatch[1];
        continue;
      }

      if (inCode) {
        if (line.trim().match(/^```/)) {
          if (codeLang === 'chart') {
            const chartData = parseChartData(codeLines);
            elements.push({ type: 'chart', chartType: chartData.type, data: chartData.data, title: chartData.title });
          } else {
            elements.push({ type: 'code', lang: codeLang, lines: [...codeLines] });
          }
          codeLines = [];
          inCode = false;
        } else {
          codeLines.push(line);
        }
        continue;
      }

      if (line.trim().match(/^```/)) {
        inCode = true;
        codeLang = line.trim().replace(/^```/, '').trim();
        continue;
      }

      if (line.match(/^# /)) {
        elements.push({ type: 'heading', text: line.replace(/^# /, '') });
      } else if (line.match(/^## /)) {
        elements.push({ type: 'subheading', text: line.replace(/^## /, '') });
      } else if (line.match(/^### /)) {
        elements.push({ type: 'subsubheading', text: line.replace(/^### /, '') });
      } else if (line.match(/^[-*] /)) {
        elements.push({ type: 'list', text: line.replace(/^[-*] /, '') });
      } else if (line.match(/^\d+\. /)) {
        elements.push({ type: 'olist', text: line.replace(/^\d+\. /, ''), num: line.match(/^(\d+)\./)[1] });
      } else if (line.trim() === '') {
        elements.push({ type: 'blank' });
      } else {
        elements.push({ type: 'text', text: line });
      }
    }

    if (inCode) {
      if (codeLang === 'chart') {
        const chartData = parseChartData(codeLines);
        elements.push({ type: 'chart', chartType: chartData.type, data: chartData.data, title: chartData.title });
      } else {
        elements.push({ type: 'code', lang: codeLang, lines: [...codeLines] });
      }
    }

    let title = '';
    for (const el of elements) {
      if (el.type === 'heading') { title = el.text; break; }
      if (el.type === 'subheading') { title = el.text; break; }
    }

    return { index: i, title, elements, notes };
  });
}

function parseInlineFormats(text, theme) {
  const segments = [];
  let remaining = text;
  const pattern = /(\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*|__(.+?)__|_(.+?)_)/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(remaining)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: remaining.slice(lastIndex, match.index), style: '' });
    }
    const full = match[0];
    if (full.startsWith('***') && full.endsWith('***')) {
      segments.push({ text: match[2], style: theme.bold + theme.italic });
    } else if (full.startsWith('**') && full.endsWith('**')) {
      segments.push({ text: match[3], style: theme.bold });
    } else if (full.startsWith('_') && full.endsWith('_') && !full.startsWith('__')) {
      segments.push({ text: match[6], style: theme.italic });
    } else if (full.startsWith('__') && full.endsWith('__')) {
      segments.push({ text: match[5], style: theme.underline });
    } else if (full.startsWith('*') && full.endsWith('*')) {
      segments.push({ text: match[4], style: theme.italic });
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < remaining.length) {
    segments.push({ text: remaining.slice(lastIndex), style: '' });
  }

  return segments.length > 0 ? segments : [{ text, style: '' }];
}

function highlightLine(line, lang, theme) {
  const keywords = LANG_KEYWORDS[lang] || new Set();
  const hashCommentLangs = new Set(['python', 'py', 'bash', 'sh', 'shell', 'ruby', 'rb', 'perl', 'r']);
  const result = [];
  let i = 0;

  while (i < line.length) {
    if (line[i] === '/' && line[i + 1] === '/') {
      result.push(theme.comment + line.slice(i) + theme.reset);
      break;
    }
    if (hashCommentLangs.has(lang) && line[i] === '#') {
      result.push(theme.comment + line.slice(i) + theme.reset);
      break;
    }
    if (line[i] === '"' || line[i] === "'" || line[i] === '`') {
      const quote = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== quote) {
        if (line[j] === '\\') j++;
        j++;
      }
      result.push(theme.string + line.slice(i, j + 1) + theme.reset);
      i = j + 1;
      continue;
    }
    if (/[0-9]/.test(line[i]) && (i === 0 || /[\s(,=+\-*/<>[\]{}!]/.test(line[i - 1]))) {
      let j = i;
      while (j < line.length && /[0-9.xXa-fA-F]/.test(line[j])) j++;
      result.push(theme.number + line.slice(i, j) + theme.reset);
      i = j;
      continue;
    }
    if (/[a-zA-Z_$]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[a-zA-Z0-9_$]/.test(line[j])) j++;
      const word = line.slice(i, j);
      if (keywords.has(word)) {
        result.push(theme.keyword + word + theme.reset);
      } else {
        result.push(word);
      }
      i = j;
      continue;
    }
    result.push(line[i]);
    i++;
  }

  return result.join('');
}

function renderAsciiArt(text) {
  const chars = text.toUpperCase().split('');
  const rows = [[], [], [], [], []];

  for (const ch of chars) {
    const fontData = FONT[ch];
    if (!fontData) {
      for (let r = 0; r < 5; r++) rows[r].push('     ');
      continue;
    }
    const charRows = fontData.split('|');
    const maxW = Math.max(...charRows.map(r => r.length));
    for (let r = 0; r < 5; r++) {
      const row = r < charRows.length ? charRows[r] : '';
      rows[r].push(row.padEnd(maxW));
    }
  }

  return rows.map(r => r.join(' '));
}

function getTerminalSize() {
  return {
    cols: process.stdout.columns || 80,
    rows: process.stdout.rows || 24,
  };
}

function centerText(text, width) {
  const strippedLen = stripAnsi(text).length;
  const padding = Math.max(0, Math.floor((width - strippedLen) / 2));
  return ' '.repeat(padding) + text;
}

function stripAnsi(str) {
  return str.replace(/\x1b\[[0-9;]*m/g, '');
}

function padRight(str, len) {
  const strippedLen = stripAnsi(str).length;
  if (strippedLen >= len) return str;
  return str + ' '.repeat(len - strippedLen);
}

function renderBarChart(data, theme, termCols) {
  const lines = [];
  if (data.length === 0) return [{ content: centerText(theme.dim + '(no data)' + theme.reset, termCols) }];

  const maxLabelLen = Math.max(...data.map(d => d.label.length));
  const maxVal = Math.max(...data.map(d => d.value));
  let chartWidth = Math.min(termCols - maxLabelLen - 15, 50);
  chartWidth = Math.max(chartWidth, 10);

  const colors = [theme.accent, theme.heading, theme.subheading, theme.bullet, theme.code];

  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    const barLen = Math.round((d.value / maxVal) * chartWidth);
    const bar = '#'.repeat(barLen);
    const color = colors[i % colors.length];
    const label = d.label.padStart(maxLabelLen);
    const valStr = d.hasPercent ? `${d.value}%` : d.value.toString();
    const line = `  ${label} │ ${color}${bar}${theme.reset} ${theme.dim}${valStr}${theme.reset}`;
    lines.push({ content: centerText(line, termCols) });
  }

  return lines;
}

function renderLineChart(data, theme, termCols) {
  const lines = [];
  if (data.length < 2) return [{ content: centerText(theme.dim + '(need at least 2 points)' + theme.reset, termCols) }];

  const chartWidth = Math.min(termCols - 20, 60);
  const chartHeight = 10;
  const maxVal = Math.max(...data.map(d => d.value));
  const minVal = Math.min(...data.map(d => d.value));
  const range = maxVal - minVal || 1;

  const grid = [];
  for (let y = 0; y < chartHeight; y++) {
    grid.push(new Array(chartWidth).fill(' '));
  }

  for (let i = 0; i < data.length - 1; i++) {
    const x1 = Math.round((i / (data.length - 1)) * (chartWidth - 1));
    const x2 = Math.round(((i + 1) / (data.length - 1)) * (chartWidth - 1));
    const y1 = chartHeight - 1 - Math.round(((data[i].value - minVal) / range) * (chartHeight - 1));
    const y2 = chartHeight - 1 - Math.round(((data[i + 1].value - minVal) / range) * (chartHeight - 1));

    const steps = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
    for (let s = 0; s <= steps; s++) {
      const t = steps === 0 ? 0 : s / steps;
      const x = Math.round(x1 + (x2 - x1) * t);
      const y = Math.round(y1 + (y2 - y1) * t);
      if (x >= 0 && x < chartWidth && y >= 0 && y < chartHeight) {
        grid[y][x] = '●';
      }
    }
  }

  const yAxisWidth = 6;
  for (let y = 0; y < chartHeight; y++) {
    const val = maxVal - (y / (chartHeight - 1)) * range;
    const yLabel = Math.round(val).toString().padStart(yAxisWidth - 2);
    const row = `${theme.dim}${yLabel} │${theme.reset}${theme.accent}${grid[y].join('')}${theme.reset}`;
    lines.push({ content: centerText(row, termCols) });
  }

  const xAxis = `${' '.repeat(yAxisWidth - 1)}${theme.dim}└${'─'.repeat(chartWidth)}${theme.reset}`;
  lines.push({ content: centerText(xAxis, termCols) });

  let labelLine = ' '.repeat(yAxisWidth + 1);
  const labelStep = Math.max(1, Math.floor(data.length / Math.min(data.length, chartWidth / 6)));
  let labelPositions = [];
  for (let i = 0; i < data.length; i += labelStep) {
    const x = Math.round((i / (data.length - 1)) * (chartWidth - 1));
    labelPositions.push({ x, label: data[i].label });
  }
  let currentX = 0;
  let labelStr = '';
  for (const lp of labelPositions) {
    while (currentX < lp.x) { labelStr += ' '; currentX++; }
    labelStr += lp.label;
    currentX += lp.label.length;
  }
  lines.push({ content: centerText(theme.dim + labelStr + theme.reset, termCols) });

  return lines;
}

function renderPieChart(data, theme, termCols) {
  const lines = [];
  if (data.length === 0) return [{ content: centerText(theme.dim + '(no data)' + theme.reset, termCols) }];

  let total = data.reduce((sum, d) => sum + d.value, 0);
  if (total === 0) return [{ content: centerText(theme.dim + '(no data)' + theme.reset, termCols) }];

  const pieChars = ['█', '▓', '▒', '░', '●', '○', '◆', '◇'];
  const colors = [theme.accent, theme.heading, theme.subheading, theme.bullet, theme.code, theme.keyword, theme.string, theme.number];

  const pieRadius = 6;
  const pieHeight = pieRadius * 2;
  const pieWidth = pieRadius * 4;

  const segments = [];
  let cumulative = 0;
  for (let i = 0; i < data.length; i++) {
    const startAngle = (cumulative / total) * Math.PI * 2;
    cumulative += data[i].value;
    const endAngle = (cumulative / total) * Math.PI * 2;
    segments.push({ startAngle, endAngle, colorIdx: i, label: data[i].label, value: data[i].value, hasPercent: data[i].hasPercent });
  }

  const pieGrid = [];
  for (let y = 0; y < pieHeight; y++) {
    pieGrid.push(new Array(pieWidth).fill(' '));
  }

  for (let y = 0; y < pieHeight; y++) {
    for (let x = 0; x < pieWidth; x++) {
      const dx = (x - pieWidth / 2) / 2;
      const dy = y - pieHeight / 2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= pieRadius - 0.5) {
        let angle = Math.atan2(dy, dx);
        if (angle < 0) angle += Math.PI * 2;
        for (let s = 0; s < segments.length; s++) {
          const seg = segments[s];
          if (angle >= seg.startAngle && angle < seg.endAngle) {
            pieGrid[y][x] = pieChars[s % pieChars.length];
            break;
          }
        }
      }
    }
  }

  for (let y = 0; y < pieHeight; y++) {
    let line = '';
    for (let x = 0; x < pieWidth; x++) {
      const ch = pieGrid[y][x];
      const segIdx = pieChars.indexOf(ch);
      if (segIdx >= 0) {
        line += colors[segIdx % colors.length] + ch + theme.reset;
      } else {
        line += ch;
      }
    }
    lines.push({ content: centerText(line, termCols) });
  }

  lines.push({ content: '' });

  const legendCols = 2;
  for (let i = 0; i < segments.length; i += legendCols) {
    let legendLine = '  ';
    for (let j = 0; j < legendCols && i + j < segments.length; j++) {
      const seg = segments[i + j];
      const pct = ((seg.value / total) * 100).toFixed(1);
      const marker = colors[seg.colorIdx % colors.length] + pieChars[seg.colorIdx % pieChars.length] + theme.reset;
      legendLine += `${marker} ${seg.label} ${theme.dim}(${pct}%)${theme.reset}    `;
    }
    lines.push({ content: centerText(legendLine, termCols) });
  }

  return lines;
}

function renderChart(el, theme, termCols) {
  const lines = [];

  if (el.title) {
    lines.push({ content: centerText(theme.bold + theme.accent + el.title + theme.reset, termCols) });
    lines.push({ content: '' });
  }

  let chartLines = [];
  switch (el.chartType) {
    case 'bar':
      chartLines = renderBarChart(el.data, theme, termCols);
      break;
    case 'line':
      chartLines = renderLineChart(el.data, theme, termCols);
      break;
    case 'pie':
      chartLines = renderPieChart(el.data, theme, termCols);
      break;
    default:
      chartLines = [{ content: centerText(theme.dim + '(unknown chart type: ' + (el.chartType || 'none') + ')' + theme.reset, termCols) }];
  }

  for (const l of chartLines) lines.push(l);
  lines.push({ content: '' });

  return lines;
}

function buildSlideLines(slide, theme, termCols) {
  const lines = [];

  for (const el of slide.elements) {
    switch (el.type) {
      case 'heading': {
        const artLines = renderAsciiArt(el.text);
        for (const artLine of artLines) {
          lines.push({ content: centerText(theme.heading + artLine + theme.reset, termCols), isArt: true });
        }
        lines.push({ content: '' });
        break;
      }
      case 'subheading': {
        const segs = parseInlineFormats(el.text, theme);
        const text = segs.map(s => s.style + s.text + theme.reset).join('');
        lines.push({ content: centerText(theme.subheading + theme.bold + text + theme.reset, termCols) });
        lines.push({ content: '' });
        break;
      }
      case 'subsubheading': {
        const segs = parseInlineFormats(el.text, theme);
        const text = segs.map(s => s.style + s.text + theme.reset).join('');
        lines.push({ content: centerText(theme.accent + theme.bold + text + theme.reset, termCols) });
        lines.push({ content: '' });
        break;
      }
      case 'list': {
        const segs = parseInlineFormats(el.text, theme);
        const text = segs.map(s => s.style + s.text + theme.reset).join('');
        const bullet = theme.bullet + '  • ' + theme.reset;
        const indent = '    ';
        lines.push({ content: indent + bullet + text, isCode: false });
        break;
      }
      case 'olist': {
        const segs = parseInlineFormats(el.text, theme);
        const text = segs.map(s => s.style + s.text + theme.reset).join('');
        const num = theme.accent + el.num + '. ' + theme.reset;
        const indent = '    ';
        lines.push({ content: indent + num + text, isCode: false });
        break;
      }
      case 'code': {
        const headerLine = theme.codeBg + theme.dim + ' ┌─ ' + (el.lang || 'code') + ' ' + '─'.repeat(Math.min(termCols - 10, 60)) + theme.reset;
        lines.push({ content: headerLine, isCode: true });
        for (const codeLine of el.lines) {
          const highlighted = highlightLine(codeLine, el.lang, theme);
          const padded = padRight(theme.codeBg + ' │ ' + highlighted + theme.reset, termCols);
          lines.push({ content: padded, isCode: true, rawCode: codeLine, codeLang: el.lang });
        }
        const footerLine = theme.codeBg + theme.dim + ' └' + '─'.repeat(Math.min(termCols - 6, 60)) + theme.reset;
        lines.push({ content: footerLine, isCode: true });
        lines.push({ content: '' });
        break;
      }
      case 'chart': {
        const chartLines = renderChart(el, theme, termCols);
        for (const cl of chartLines) {
          lines.push(cl);
        }
        break;
      }
      case 'text': {
        const segs = parseInlineFormats(el.text, theme);
        const text = segs.map(s => s.style + s.text + theme.reset).join('');
        lines.push({ content: centerText(text, termCols) });
        break;
      }
      case 'blank': {
        lines.push({ content: '' });
        break;
      }
    }
  }

  return lines;
}

function renderStatusBar(currentSlide, totalSlides, theme, termCols, termRows) {
  const row = termRows;
  const pct = Math.round(((currentSlide + 1) / totalSlides) * 100);
  const barWidth = Math.min(30, Math.floor(termCols / 4));
  const filled = Math.round((barWidth * (currentSlide + 1)) / totalSlides);
  const empty = barWidth - filled;
  const bar = theme.progressBar + ' '.repeat(filled) + theme.progressBg + ' '.repeat(empty) + theme.reset;
  const pageInfo = theme.bold + ` ${currentSlide + 1}/${totalSlides} ` + theme.reset;
  const pctInfo = theme.dim + ` ${pct}% ` + theme.reset;
  const hints = theme.dim + ' ←→:nav  space:next  g/G  o:outline  q:quit ' + theme.reset;

  process.stdout.write(ansi.move(row, 1) + theme.bg + ansi.clearLine);
  process.stdout.write(ansi.move(row, 1) + theme.bg + pageInfo + bar + pctInfo + hints + theme.reset + theme.bg + ' '.repeat(Math.max(0, termCols - stripAnsi(pageInfo + bar + pctInfo + hints).length)) + theme.reset);
}

function renderPlaybackStatusBar(currentSlide, totalSlides, progressPct, elapsedTime, remainingTime, speed, theme, termCols, termRows) {
  const row = termRows;
  const barWidth = Math.floor(termCols * 0.4);
  const filled = Math.round((barWidth * progressPct) / 100);
  const empty = barWidth - filled;
  const bar = theme.progressBar + ' '.repeat(filled) + theme.progressBg + ' '.repeat(empty) + theme.reset;

  const pageInfo = theme.bold + ` ${currentSlide + 1}/${totalSlides} ` + theme.reset;
  const playIcon = theme.accent + '▶ ' + theme.reset;
  const speedInfo = theme.dim + ` ${speed}x ` + theme.reset;
  const timeInfo = theme.dim + ` ${formatTime(Math.floor(elapsedTime))} / ${formatTime(Math.ceil(remainingTime))} ` + theme.reset;

  const leftPart = playIcon + pageInfo + bar + timeInfo + speedInfo;

  process.stdout.write(ansi.move(row, 1) + theme.bg + ansi.clearLine);
  process.stdout.write(ansi.move(row, 1) + theme.bg + leftPart + theme.reset + theme.bg + ' '.repeat(Math.max(0, termCols - stripAnsi(leftPart).length)) + theme.reset);
}

function renderSlideToScreen(slideLines, revealLine, theme, termCols, termRows) {
  process.stdout.write(ansi.clear + theme.bg);
  const totalContent = slideLines.length;
  const availableHeight = termRows - 2;
  const startRow = Math.max(2, Math.floor((availableHeight - Math.min(revealLine, totalContent)) / 2));

  for (let i = 0; i < revealLine && i < totalContent; i++) {
    const row = startRow + i;
    if (row >= termRows - 1) break;
    const line = slideLines[i];
    process.stdout.write(ansi.move(row, 1) + theme.bg + padRight(line.content, termCols) + theme.reset);
  }
}

async function typewriterReveal(lineObj, row, col, theme, termCols, speed) {
  const content = lineObj.content;
  const rawCode = lineObj.rawCode || '';
  const codeLang = lineObj.codeLang || '';

  if (!rawCode || speed <= 0) {
    process.stdout.write(ansi.move(row, col) + theme.bg + padRight(content, termCols) + theme.reset);
    return;
  }

  const baseLine = theme.codeBg + ' │ ' + theme.reset;
  process.stdout.write(ansi.move(row, col) + theme.bg + baseLine + theme.reset);

  for (let i = 0; i < rawCode.length; i++) {
    if (skipTypewriter) break;
    const partial = rawCode.slice(0, i + 1);
    const highlighted = highlightLine(partial, codeLang, theme);
    const fullLine = theme.codeBg + ' │ ' + highlighted + theme.reset;
    process.stdout.write(ansi.move(row, col) + theme.bg + padRight(fullLine, termCols) + theme.reset);
    await sleep(speed);
  }

  process.stdout.write(ansi.move(row, col) + theme.bg + padRight(content, termCols) + theme.reset);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let skipTypewriter = false;

async function transitionSlide(fromLines, toLines, direction, theme, termCols, termRows) {
  const totalLines = Math.min(toLines.length, termRows - 3);
  const startRow = Math.max(2, Math.floor((termRows - 2 - totalLines) / 2));

  for (let i = 0; i < totalLines; i++) {
    const row = startRow + i;
    process.stdout.write(ansi.move(row, 1) + theme.bg + ansi.clearLine + theme.reset);
    await sleep(8);
  }

  for (let i = 0; i < totalLines; i++) {
    const row = startRow + i;
    if (i < toLines.length) {
      process.stdout.write(ansi.move(row, 1) + theme.bg + padRight(toLines[i].content, termCols) + theme.reset);
    }
    await sleep(12);
  }
}

function renderOutline(slides, theme, termCols, termRows) {
  process.stdout.write(ansi.clear + theme.bg);
  const title = theme.heading + theme.bold + ' OUTLINE ' + theme.reset;
  process.stdout.write(ansi.move(2, 1) + centerText(title, termCols));

  for (let i = 0; i < slides.length; i++) {
    const row = 4 + i;
    if (row >= termRows - 2) break;
    const num = theme.accent + theme.bold + ` ${i + 1}. ` + theme.reset;
    const titleText = theme.fg + (slides[i].title || '(untitled)') + theme.reset;
    process.stdout.write(ansi.move(row, 1) + theme.bg + '    ' + num + titleText + theme.reset);
  }

  const hint = theme.dim + ' Press any key to return ' + theme.reset;
  process.stdout.write(ansi.move(termRows - 1, 1) + centerText(hint, termCols));
}

function updateSpeakerDisplay(slide, elapsed, avgTime, totalSlides, currentIndex) {
  const remaining = avgTime > 0 ? Math.round(avgTime * (totalSlides - currentIndex - 1)) : 0;
  const elapsedStr = formatTime(elapsed);
  const remainingStr = formatTime(remaining);
  const notes = slide.notes || '(no notes)';

  const output = [
    `\x1b[K\x1b[1m--- Speaker View ---\x1b[0m`,
    `\x1b[KSlide: ${currentIndex + 1}/${totalSlides}  |  Elapsed: ${elapsedStr}  |  Est. Remaining: ${remainingStr}`,
    `\x1b[KNotes: ${notes}`,
    `\x1b[K${'─'.repeat(60)}`,
  ].join('\n');

  process.stderr.write('\x1b[s\x1b[1;1H' + output + '\x1b[u');
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function barChartSVG(data, colors) {
  const width = 600;
  const barHeight = 30;
  const labelWidth = 100;
  const valueWidth = 60;
  const chartWidth = width - labelWidth - valueWidth - 20;
  const height = data.length * (barHeight + 10) + 20;
  const maxVal = Math.max(...data.map(d => d.value));

  const palette = [colors.accent, colors.heading, colors.bullet, colors.string, colors.keyword];

  let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;

  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    const y = i * (barHeight + 10) + 10;
    const barLen = Math.max(2, (d.value / maxVal) * chartWidth);
    const color = palette[i % palette.length];
    const valStr = d.hasPercent ? `${d.value}%` : d.value.toString();

    svg += `<text x="${labelWidth - 5}" y="${y + barHeight / 2 + 5}" text-anchor="end" fill="${colors.fg}" font-size="14" font-family="monospace">${escapeHTML(d.label)}</text>`;
    svg += `<rect x="${labelWidth}" y="${y}" width="${barLen}" height="${barHeight}" fill="${color}" rx="3"/>`;
    svg += `<text x="${labelWidth + barLen + 8}" y="${y + barHeight / 2 + 5}" fill="${colors.fg}" font-size="13" font-family="monospace">${valStr}</text>`;
  }

  svg += '</svg>';
  return svg;
}

function lineChartSVG(data, colors) {
  const width = 600;
  const height = 300;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const maxVal = Math.max(...data.map(d => d.value));
  const minVal = Math.min(...data.map(d => d.value));
  const range = maxVal - minVal || 1;

  let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;

  svg += `<line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${height - padding.bottom}" stroke="${colors.fg}" stroke-opacity="0.3"/>`;
  svg += `<line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="${colors.fg}" stroke-opacity="0.3"/>`;

  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (i / 4) * chartH;
    const val = maxVal - (i / 4) * range;
    svg += `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="${colors.fg}" stroke-opacity="0.1" stroke-dasharray="4,4"/>`;
    svg += `<text x="${padding.left - 5}" y="${y + 4}" text-anchor="end" fill="${colors.fg}" font-size="11" font-family="monospace">${Math.round(val)}</text>`;
  }

  const points = [];
  for (let i = 0; i < data.length; i++) {
    const x = padding.left + (i / (data.length - 1)) * chartW;
    const y = padding.top + chartH - ((data[i].value - minVal) / range) * chartH;
    points.push({ x, y });
  }

  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    pathD += ` L ${points[i].x} ${points[i].y}`;
  }
  svg += `<path d="${pathD}" fill="none" stroke="${colors.accent}" stroke-width="2"/>`;

  for (const p of points) {
    svg += `<circle cx="${p.x}" cy="${p.y}" r="4" fill="${colors.accent}"/>`;
  }

  const labelStep = Math.max(1, Math.floor(data.length / 8));
  for (let i = 0; i < data.length; i += labelStep) {
    const x = padding.left + (i / (data.length - 1)) * chartW;
    svg += `<text x="${x}" y="${height - padding.bottom + 20}" text-anchor="middle" fill="${colors.fg}" font-size="11" font-family="monospace">${escapeHTML(data[i].label)}</text>`;
  }

  svg += '</svg>';
  return svg;
}

function pieChartSVG(data, colors) {
  const width = 500;
  const height = 350;
  const cx = width / 2 - 80;
  const cy = height / 2;
  const radius = Math.min(cx, cy) - 20;

  let total = data.reduce((sum, d) => sum + d.value, 0);
  if (total === 0) total = 1;

  const palette = [colors.accent, colors.heading, colors.bullet, colors.string, colors.keyword, colors.number];

  let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;

  let startAngle = -Math.PI / 2;
  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    const angle = (d.value / total) * Math.PI * 2;
    const endAngle = startAngle + angle;

    const x1 = cx + radius * Math.cos(startAngle);
    const y1 = cy + radius * Math.sin(startAngle);
    const x2 = cx + radius * Math.cos(endAngle);
    const y2 = cy + radius * Math.sin(endAngle);

    const largeArc = angle > Math.PI ? 1 : 0;

    if (data.length === 1) {
      svg += `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${palette[i % palette.length]}"/>`;
    } else {
      svg += `<path d="M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z" fill="${palette[i % palette.length]}" stroke="${colors.bg}" stroke-width="2"/>`;
    }

    startAngle = endAngle;
  }

  const legendX = cx + radius + 30;
  let legendY = 30;
  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    const pct = ((d.value / total) * 100).toFixed(1);
    svg += `<rect x="${legendX}" y="${legendY}" width="16" height="16" fill="${palette[i % palette.length]}" rx="2"/>`;
    svg += `<text x="${legendX + 24}" y="${legendY + 13}" fill="${colors.fg}" font-size="13" font-family="monospace">${escapeHTML(d.label)} (${pct}%)</text>`;
    legendY += 26;
  }

  svg += '</svg>';
  return svg;
}

function chartToSVG(el, colors) {
  let svg = '';
  if (el.title) {
    svg += `<div style="text-align:center;color:${colors.accent};font-weight:bold;margin-bottom:10px">${escapeHTML(el.title)}</div>`;
  }

  switch (el.chartType) {
    case 'bar':
      svg += barChartSVG(el.data, colors);
      break;
    case 'line':
      svg += lineChartSVG(el.data, colors);
      break;
    case 'pie':
      svg += pieChartSVG(el.data, colors);
      break;
    default:
      svg += `<div style="text-align:center;color:#888">(unknown chart type)</div>`;
  }

  return `<div class="chart-container" style="margin:1em 0;display:flex;flex-direction:column;align-items:center">${svg}</div>`;
}

function exportHTML(slides, themeName) {
  const themeColors = {
    dark: { bg: '#1e1e2e', fg: '#d4d4d4', heading: '#56b6f7', accent: '#fabd5f', code: '#6bc', codeBg: '#282838', keyword: '#e06c75', string: '#98c379', number: '#d19a66', bullet: '#fabd5f' },
    light: { bg: '#ffffff', fg: '#1e1e1e', heading: '#0050a0', accent: '#d06000', code: '#007020', codeBg: '#f5f5f5', keyword: '#c43060', string: '#007020', number: '#d06000', bullet: '#d06000' },
    solarized: { bg: '#fdf6e3', fg: '#586e75', heading: '#268bd2', accent: '#b58900', code: '#2aa198', codeBg: '#eee8d5', keyword: '#dc322f', string: '#859900', number: '#cb4b16', bullet: '#b58900' },
  };
  const c = themeColors[themeName] || themeColors.dark;

  let html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Slides Presentation</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: ${c.bg}; color: ${c.fg}; font-family: 'Menlo', 'Consolas', 'Courier New', monospace; overflow: hidden; }
  .slide { display: none; height: 100vh; padding: 5vh 8vw; flex-direction: column; justify-content: center; align-items: center; }
  .slide.active { display: flex; }
  .heading { font-size: 3em; font-weight: bold; color: ${c.heading}; text-align: center; margin-bottom: 0.5em; letter-spacing: 0.1em; }
  .subheading { font-size: 1.6em; color: ${c.heading}; text-align: center; margin-bottom: 0.8em; }
  .subsubheading { font-size: 1.3em; color: ${c.accent}; text-align: center; margin-bottom: 0.5em; }
  .text { text-align: center; margin: 0.3em 0; line-height: 1.6; }
  .list-item { margin: 0.3em 0 0.3em 2em; line-height: 1.6; }
  .list-item::before { content: '• '; color: ${c.bullet}; font-weight: bold; }
  .olist-item { margin: 0.3em 0 0.3em 2em; line-height: 1.6; }
  .olist-num { color: ${c.accent}; font-weight: bold; }
  .code-block { background: ${c.codeBg}; border-radius: 6px; padding: 1em; margin: 0.8em 0; width: 90%; max-width: 800px; overflow-x: auto; }
  .code-header { color: #888; font-size: 0.8em; border-bottom: 1px solid #444; padding-bottom: 0.3em; margin-bottom: 0.5em; }
  .code-line { line-height: 1.5; white-space: pre; }
  .keyword { color: ${c.keyword}; }
  .string { color: ${c.string}; }
  .number { color: ${c.number}; }
  .comment { color: #888; font-style: italic; }
  .bold { font-weight: bold; }
  .italic { font-style: italic; }
  .underline { text-decoration: underline; }
  .status-bar { position: fixed; bottom: 0; left: 0; right: 0; height: 2em; background: ${c.codeBg}; display: flex; align-items: center; padding: 0 1em; font-size: 0.8em; justify-content: space-between; }
  .progress { height: 4px; background: ${c.heading}; flex: 1; max-width: 200px; margin: 0 1em; border-radius: 2px; }
  .progress-bg { height: 100%; background: #444; border-radius: 2px; overflow: hidden; }
  .progress-fill { height: 100%; background: ${c.heading}; transition: width 0.3s; }
  .nav-hint { color: #888; }
  .spacer { flex: 1; }
</style>
</head>
<body>
`;

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    html += `<div class="slide${i === 0 ? ' active' : ''}" data-index="${i}">\n`;
    for (const el of slide.elements) {
      switch (el.type) {
        case 'heading':
          html += `  <div class="heading">${escapeHTML(el.text)}</div>\n`;
          break;
        case 'subheading':
          html += `  <div class="subheading">${formatInlineHTML(el.text)}</div>\n`;
          break;
        case 'subsubheading':
          html += `  <div class="subsubheading">${formatInlineHTML(el.text)}</div>\n`;
          break;
        case 'text':
          html += `  <div class="text">${formatInlineHTML(el.text)}</div>\n`;
          break;
        case 'list':
          html += `  <div class="list-item">${formatInlineHTML(el.text)}</div>\n`;
          break;
        case 'olist':
          html += `  <div class="olist-item"><span class="olist-num">${el.num}.</span> ${formatInlineHTML(el.text)}</div>\n`;
          break;
        case 'code':
          html += `  <div class="code-block"><div class="code-header">${escapeHTML(el.lang || 'code')}</div>\n`;
          for (const codeLine of el.lines) {
            html += `    <div class="code-line">${highlightHTML(codeLine, el.lang)}</div>\n`;
          }
          html += `  </div>\n`;
          break;
        case 'chart':
          html += `  ${chartToSVG(el, c)}\n`;
          break;
        case 'blank':
          html += `  <div style="height:1em"></div>\n`;
          break;
      }
    }
    html += `</div>\n`;
  }

  html += `<div class="status-bar">
  <span id="page-info">1/${slides.length}</span>
  <div class="progress"><div class="progress-bg"><div class="progress-fill" id="progress-fill" style="width:${100 / slides.length}%"></div></div></div>
  <span id="pct">${Math.round(100 / slides.length)}%</span>
  <span class="spacer"></span>
  <span class="nav-hint">← → Space to navigate</span>
</div>
<script>
let current = 0;
const total = ${slides.length};
const slides = document.querySelectorAll('.slide');
const pageInfo = document.getElementById('page-info');
const progressFill = document.getElementById('progress-fill');
const pctEl = document.getElementById('pct');

function showSlide(n) {
  slides[current].classList.remove('active');
  current = Math.max(0, Math.min(n, total - 1));
  slides[current].classList.add('active');
  pageInfo.textContent = (current + 1) + '/' + total;
  const p = Math.round(((current + 1) / total) * 100);
  progressFill.style.width = p + '%';
  pctEl.textContent = p + '%';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); showSlide(current + 1); }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); showSlide(current - 1); }
  else if (e.key === 'Home' || e.key === 'g') { showSlide(0); }
  else if (e.key === 'End' || e.key === 'G') { showSlide(total - 1); }
});
</script>
</body>
</html>`;

  return html;
}

function escapeHTML(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function formatInlineHTML(text) {
  const escaped = escapeHTML(text);
  return escaped
    .replace(/\*\*\*(.+?)\*\*\*/g, '<span class="bold italic">$1</span>')
    .replace(/\*\*(.+?)\*\*/g, '<span class="bold">$1</span>')
    .replace(/\*(.+?)\*/g, '<span class="italic">$1</span>')
    .replace(/__(.+?)__/g, '<span class="underline">$1</span>')
    .replace(/_(.+?)_/g, '<span class="italic">$1</span>');
}

function highlightHTML(line, lang) {
  const keywords = LANG_KEYWORDS[lang] || new Set();
  let result = '';
  let i = 0;

  while (i < line.length) {
    if ((line[i] === '/' && line[i + 1] === '/') || (lang === 'python' && line[i] === '#')) {
      result += `<span class="comment">${escapeHTML(line.slice(i))}</span>`;
      break;
    }
    if (line[i] === '"' || line[i] === "'" || line[i] === '`') {
      const quote = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== quote) { if (line[j] === '\\') j++; j++; }
      result += `<span class="string">${escapeHTML(line.slice(i, j + 1))}</span>`;
      i = j + 1;
      continue;
    }
    if (/[0-9]/.test(line[i]) && (i === 0 || /[\s(,=+\-*/<>[\]{}!]/.test(line[i - 1]))) {
      let j = i;
      while (j < line.length && /[0-9.xXa-fA-F]/.test(line[j])) j++;
      result += `<span class="number">${escapeHTML(line.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    if (/[a-zA-Z_$]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[a-zA-Z0-9_$]/.test(line[j])) j++;
      const word = line.slice(i, j);
      if (keywords.has(word)) {
        result += `<span class="keyword">${escapeHTML(word)}</span>`;
      } else {
        result += escapeHTML(word);
      }
      i = j;
      continue;
    }
    result += escapeHTML(line[i]);
    i++;
  }

  return result;
}

function exportPDF(slides) {
  let output = '';
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    output += `${'═'.repeat(60)}\n`;
    output += `  Slide ${i + 1}: ${slide.title || '(untitled)'}\n`;
    output += `${'═'.repeat(60)}\n\n`;

    for (const el of slide.elements) {
      switch (el.type) {
        case 'heading':
          output += `  ${el.text}\n\n`;
          break;
        case 'subheading':
          output += `  ${el.text}\n\n`;
          break;
        case 'subsubheading':
          output += `    ${el.text}\n`;
          break;
        case 'text':
          output += `  ${el.text}\n`;
          break;
        case 'list':
          output += `    • ${el.text}\n`;
          break;
        case 'olist':
          output += `    ${el.num}. ${el.text}\n`;
          break;
        case 'code':
          output += `  ┌─ ${el.lang || 'code'} ${'─'.repeat(40)}\n`;
          for (const codeLine of el.lines) {
            output += `  │ ${codeLine}\n`;
          }
          output += `  └${'─'.repeat(50)}\n\n`;
          break;
        case 'blank':
          output += '\n';
          break;
      }
    }
    output += '\n';
  }
  return output;
}

function listSlides(slides) {
  let output = '';
  for (let i = 0; i < slides.length; i++) {
    let tagPrefix = '';
    if (slides[i].hasConditional && slides[i].tags && slides[i].tags.size > 0) {
      const tagList = Array.from(slides[i].tags).join(',');
      tagPrefix = `[${tagList}] `;
    } else if (slides[i].hasConditional) {
      tagPrefix = '[TAG] ';
    }
    output += `  ${i + 1}. ${tagPrefix}${slides[i].title || '(untitled)'}\n`;
  }
  return output;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
  Terminal Markdown Slideshow Tool

  Usage: node slides.js <presentation.md> [options]

  Options:
    --theme <name>    Color theme: dark, light, solarized (default: dark)
    --speaker         Enable speaker mode (notes + timer on stderr)
    --export html     Export slides as self-contained HTML file
    --export pdf      Export slides as text/PDF format
    --list            List all slide titles
    --tags <tags>     Comma-separated tags for conditional slides (e.g. --tags "dev,advanced")
    --record          Record the presentation and save to recording.json
    --playback <file> Play back a recorded presentation
    --speed <multiplier>  Playback speed multiplier (default: 1x, e.g. --speed 2x)
    --help, -h        Show this help message

  Navigation:
    ←/→ or Space     Navigate between slides/lines
    g                Go to first slide
    G                Go to last slide
    o                Show outline
    q                Quit
    <number>+Enter   Jump to slide number

  Markdown Extensions:
    !include(path.md)         Include external markdown file
    !if(tag)...!endif         Conditional content (show only with matching --tags)
    \`\`\`chart ... \`\`\`      Inline charts (bar, line, pie)
`);
    process.exit(0);
  }

  const valueArgs = new Set(['--theme', '--export', '--playback', '--speed', '--tags']);
  const consumedIndices = new Set();
  for (let i = 0; i < args.length; i++) {
    if (valueArgs.has(args[i]) && i + 1 < args.length) {
      consumedIndices.add(i + 1);
    }
  }

  const mdFile = args.find((a, i) => !a.startsWith('--') && !a.endsWith('.json') && !consumedIndices.has(i));
  if (!mdFile && !args.includes('--playback')) {
    console.error('Error: No markdown file specified.');
    process.exit(1);
  }

  const themeIdx = args.indexOf('--theme');
  const themeName = themeIdx !== -1 && args[themeIdx + 1] ? args[themeIdx + 1] : 'dark';
  const theme = THEMES[themeName] || THEMES.dark;
  const speakerMode = args.includes('--speaker');
  const exportIdx = args.indexOf('--export');
  const exportFormat = exportIdx !== -1 && args[exportIdx + 1] ? args[exportIdx + 1] : null;
  const listMode = args.includes('--list');
  const recordMode = args.includes('--record');
  const playbackIdx = args.indexOf('--playback');
  const playbackFile = playbackIdx !== -1 && args[playbackIdx + 1] ? args[playbackIdx + 1] : null;
  const speedIdx = args.indexOf('--speed');
  let speedMultiplier = 1;
  if (speedIdx !== -1 && args[speedIdx + 1]) {
    const speedStr = args[speedIdx + 1].replace(/x$/i, '');
    speedMultiplier = parseFloat(speedStr) || 1;
  }
  const tagsIdx = args.indexOf('--tags');
  const tagsStr = tagsIdx !== -1 && args[tagsIdx + 1] ? args[tagsIdx + 1] : '';
  const activeTags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(t => t) : [];

  let slides = [];
  let conditionalSlides = new Map();
  let playbackRecording = null;
  let resolvedMdFile = mdFile;

  if (playbackFile) {
    const recPath = path.resolve(playbackFile);
    if (!fs.existsSync(recPath)) {
      console.error(`Error: Recording file not found: ${recPath}`);
      process.exit(1);
    }
    try {
      playbackRecording = JSON.parse(fs.readFileSync(recPath, 'utf-8'));
    } catch (e) {
      console.error(`Error: Invalid recording file: ${e.message}`);
      process.exit(1);
    }

    if (playbackRecording.mdFile && !resolvedMdFile) {
      resolvedMdFile = playbackRecording.mdFile;
    }
    if (!resolvedMdFile) {
      console.error('Error: No markdown file specified. Provide one or ensure recording contains mdFile.');
      process.exit(1);
    }

    const filePath = path.resolve(resolvedMdFile);
    if (!fs.existsSync(filePath)) {
      console.error(`Error: Markdown file not found: ${filePath}`);
      process.exit(1);
    }

    let content = fs.readFileSync(filePath, 'utf-8');
    content = processIncludes(content, path.dirname(filePath));
    const condResult = processConditionals(content, activeTags);
    content = condResult.content;
    conditionalSlides = condResult.conditionalSlides;

    slides = parseSlides(content);
    slides.forEach((slide, idx) => {
      slide.hasConditional = conditionalSlides.has(idx);
      slide.tags = conditionalSlides.get(idx) || new Set();
    });
  } else {
    const filePath = path.resolve(mdFile);
    if (!fs.existsSync(filePath)) {
      console.error(`Error: File not found: ${filePath}`);
      process.exit(1);
    }

    let content = fs.readFileSync(filePath, 'utf-8');
    content = processIncludes(content, path.dirname(filePath));
    const condResult = processConditionals(content, activeTags);
    content = condResult.content;
    conditionalSlides = condResult.conditionalSlides;

    slides = parseSlides(content);

    slides.forEach((slide, idx) => {
      slide.hasConditional = conditionalSlides.has(idx);
      slide.tags = conditionalSlides.get(idx) || new Set();
    });
  }

  if (slides.length === 0) {
    console.error('Error: No slides found in the presentation.');
    process.exit(1);
  }

  if (listMode) {
    console.log(listSlides(slides));
    process.exit(0);
  }

  if (exportFormat === 'html') {
    const html = exportHTML(slides, themeName);
    const outFile = resolvedMdFile.replace(/\.md$/i, '.html');
    fs.writeFileSync(outFile, html, 'utf-8');
    console.log(`Exported HTML to: ${outFile}`);
    process.exit(0);
  }

  if (exportFormat === 'pdf') {
    const text = exportPDF(slides);
    const outFile = resolvedMdFile.replace(/\.md$/i, '.txt');
    fs.writeFileSync(outFile, text, 'utf-8');
    console.log(`Exported text/PDF to: ${outFile}`);
    process.exit(0);
  }

  if (!process.stdout.isTTY) {
    console.error('Error: Not running in a terminal. Use --export or --list for non-interactive output.');
    process.exit(1);
  }

  let currentSlide = 0;
  let revealLine = 0;
  let mode = 'slide';
  let numberBuffer = '';
  let slideTimes = [];
  let slideStartTime = Date.now();
  let presentationStart = Date.now();
  let running = true;
  let isPlaybackMode = !!playbackRecording;

  let recordedActions = [];
  let recordingStartTime = 0;

  function recordAction(action, data) {
    if (!recordMode || isPlaybackMode) return;
    const timestamp = Date.now() - recordingStartTime;
    recordedActions.push({ timestamp, action, data: data || null });
  }

  function saveRecording() {
    if (!recordMode || recordedActions.length === 0) return;
    const recording = {
      version: 1,
      mdFile: resolvedMdFile ? path.resolve(resolvedMdFile) : null,
      totalSlides: slides.length,
      duration: Date.now() - recordingStartTime,
      recordedAt: new Date().toISOString(),
      actions: recordedActions,
    };
    const outFile = resolvedMdFile ? resolvedMdFile.replace(/\.md$/i, '.recording.json') : 'recording.json';
    fs.writeFileSync(outFile, JSON.stringify(recording, null, 2), 'utf-8');
    console.log(`\nRecording saved to: ${outFile}`);
  }

  const slideCache = new Map();

  function getSlideLines(idx) {
    if (!slideCache.has(idx)) {
      const { cols } = getTerminalSize();
      slideCache.set(idx, buildSlideLines(slides[idx], theme, cols));
    }
    return slideCache.get(idx);
  }

  function getAvgSlideTime() {
    if (slideTimes.length === 0) return 10;
    return slideTimes.reduce((a, b) => a + b, 0) / slideTimes.length / 1000;
  }

  function render() {
    const { cols, rows } = getTerminalSize();
    if (mode === 'outline') {
      renderOutline(slides, theme, cols, rows);
      renderStatusBar(currentSlide, slides.length, theme, cols, rows);
      return;
    }
    const slideLines = getSlideLines(currentSlide);
    renderSlideToScreen(slideLines, revealLine, theme, cols, rows);
    if (isPlaybackMode) {
      return;
    }
    renderStatusBar(currentSlide, slides.length, theme, cols, rows);
  }

  function goToSlide(idx) {
    const now = Date.now();
    const elapsed = now - slideStartTime;
    slideTimes.push(elapsed);
    slideStartTime = now;

    slideCache.delete(currentSlide);
    currentSlide = Math.max(0, Math.min(idx, slides.length - 1));
    revealLine = 0;
    numberBuffer = '';

    recordAction('go_to_slide', { slide: currentSlide });

    const { cols, rows } = getTerminalSize();
    const slideLines = getSlideLines(currentSlide);

    transitionSlide([], slideLines, 'forward', theme, cols, rows).then(() => {
      render();
      if (speakerMode && !isPlaybackMode) {
        const totalElapsed = Math.round((Date.now() - presentationStart) / 1000);
        updateSpeakerDisplay(slides[currentSlide], totalElapsed, getAvgSlideTime(), slides.length, currentSlide);
      }
    });
  }

  function playbackGoToSlide(idx) {
    slideCache.delete(currentSlide);
    currentSlide = Math.max(0, Math.min(idx, slides.length - 1));
    revealLine = 0;
    const { cols, rows } = getTerminalSize();
    const slideLines = getSlideLines(currentSlide);
    renderSlideToScreen(slideLines, revealLine, theme, cols, rows);
  }

  function playbackRevealLine(lineNum) {
    const slideLines = getSlideLines(currentSlide);
    if (lineNum <= slideLines.length) {
      revealLine = lineNum;
      const { cols, rows } = getTerminalSize();
      renderSlideToScreen(slideLines, revealLine, theme, cols, rows);
    }
  }

  function updatePlaybackStatusBar(elapsed, totalDuration, speed) {
    const { cols, rows } = getTerminalSize();
    const progressPct = Math.min(100, (elapsed / totalDuration) * 100);
    const remainingTime = Math.max(0, (totalDuration - elapsed) / 1000);
    const elapsedSec = elapsed / 1000;
    renderPlaybackStatusBar(currentSlide, slides.length, progressPct, elapsedSec, remainingTime, speed, theme, cols, rows);
  }

  process.stdout.write(ansi.hideCursor);

  if (isPlaybackMode) {
    await runPlayback();
  } else {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    readline.emitKeypressEvents(process.stdin);

    const onKeypress = (str, key) => {
      if (!running) return;

      if (key.ctrl && key.name === 'c') {
        cleanup();
        return;
      }

      if (mode === 'outline') {
        mode = 'slide';
        render();
        return;
      }

      if (key.name === 'q') {
        cleanup();
        return;
      }

      if (key.name === 'o') {
        mode = 'outline';
        render();
        return;
      }

      if (key.name === 'g') {
        if (key.shift) {
          goToSlide(slides.length - 1);
        } else {
          goToSlide(0);
        }
        return;
      }

      if (key.name === 'left' || key.name === 'up') {
        if (currentSlide > 0) {
          goToSlide(currentSlide - 1);
        }
        return;
      }

      if (key.name === 'right' || key.name === 'down' || key.name === 'space') {
        const slideLines = getSlideLines(currentSlide);
        if (revealLine < slideLines.length) {
          const line = slideLines[revealLine];
          revealLine++;
          recordAction('reveal_line', { slide: currentSlide, revealLine: revealLine });

          if (line && line.isCode && line.rawCode) {
            const { cols, rows } = getTerminalSize();
            const availableHeight = rows - 2;
            const startRow = Math.max(2, Math.floor((availableHeight - Math.min(slideLines.length, availableHeight)) / 2));
            const row = startRow + revealLine - 1;
            skipTypewriter = false;
            typewriterReveal(line, row, 1, theme, cols, 15).then(() => {
              renderStatusBar(currentSlide, slides.length, theme, cols, rows);
            });
          } else {
            render();
          }
        } else {
          if (currentSlide < slides.length - 1) {
            goToSlide(currentSlide + 1);
          }
        }
        return;
      }

      if (key.name === 'return') {
        if (numberBuffer.length > 0) {
          const target = parseInt(numberBuffer, 10) - 1;
          numberBuffer = '';
          if (target >= 0 && target < slides.length) {
            goToSlide(target);
          }
        }
        return;
      }

      if (/^[0-9]$/.test(str)) {
        numberBuffer += str;
        const { cols, rows } = getTerminalSize();
        process.stdout.write(ansi.move(rows - 2, 1) + theme.bg + theme.accent + ' Go to slide: ' + numberBuffer + ' (Enter to confirm)' + theme.reset + ' '.repeat(20));
        return;
      }

      if (key.name === 'escape') {
        numberBuffer = '';
        render();
        return;
      }
    };

    process.stdin.on('keypress', onKeypress);

    function cleanup() {
      running = false;
      if (recordMode) {
        recordAction('quit');
        saveRecording();
      }
      process.stdin.setRawMode(false);
      process.stdin.removeListener('keypress', onKeypress);
      process.stdin.pause();
      process.stdout.write(ansi.clear + ansi.showCursor);
      process.exit(0);
    }

    process.on('SIGWINCH', () => {
      slideCache.clear();
      render();
    });

    if (recordMode) {
      recordingStartTime = Date.now();
      recordAction('start', { slide: 0 });
    }

    render();

    if (speakerMode) {
      const speakerInterval = setInterval(() => {
        if (!running) { clearInterval(speakerInterval); return; }
        const totalElapsed = Math.round((Date.now() - presentationStart) / 1000);
        updateSpeakerDisplay(slides[currentSlide], totalElapsed, getAvgSlideTime(), slides.length, currentSlide);
      }, 1000);
    }
  }

  async function runPlayback() {
    const actions = playbackRecording.actions;
    const totalDuration = playbackRecording.duration;
    const speed = speedMultiplier;

    process.stdin.setRawMode(true);
    process.stdin.resume();
    readline.emitKeypressEvents(process.stdin);

    let playbackAborted = false;

    const onPlaybackKeypress = (str, key) => {
      if (key && ((key.ctrl && key.name === 'c') || key.name === 'q')) {
        playbackAborted = true;
      }
    };
    process.stdin.on('keypress', onPlaybackKeypress);

    console.log(`\n  Playback starting... (${speed}x speed, ${formatTime(Math.round(totalDuration / 1000 / speed))} estimated)`);
    await sleep(1000);

    const playbackStart = Date.now();

    for (let i = 0; i < actions.length; i++) {
      if (playbackAborted) break;

      const action = actions[i];
      const targetElapsed = action.timestamp / speed;

      while (true) {
        if (playbackAborted) break;
        const actualElapsed = Date.now() - playbackStart;
        const waitTime = targetElapsed - actualElapsed;
        if (waitTime <= 0) break;

        const chunk = Math.min(waitTime, 100);
        await sleep(chunk);

        const now = Date.now();
        const currentElapsed = now - playbackStart;
        updatePlaybackStatusBar(currentElapsed, totalDuration / speed, speed);
      }

      if (playbackAborted) break;

      switch (action.action) {
        case 'start':
          playbackGoToSlide(action.data ? action.data.slide : 0);
          updatePlaybackStatusBar(Date.now() - playbackStart, totalDuration / speed, speed);
          break;
        case 'go_to_slide':
          if (action.data && action.data.slide !== undefined) {
            playbackGoToSlide(action.data.slide);
          }
          updatePlaybackStatusBar(Date.now() - playbackStart, totalDuration / speed, speed);
          break;
        case 'reveal_line':
          if (action.data && action.data.revealLine !== undefined) {
            playbackRevealLine(action.data.revealLine);
          }
          updatePlaybackStatusBar(Date.now() - playbackStart, totalDuration / speed, speed);
          break;
        case 'quit':
          playbackAborted = true;
          break;
      }
    }

    if (!playbackAborted) {
      const finalElapsed = Date.now() - playbackStart;
      updatePlaybackStatusBar(finalElapsed, totalDuration / speed, speed);
    }

    process.stdin.setRawMode(false);
    process.stdin.removeListener('keypress', onPlaybackKeypress);
    process.stdin.pause();
    process.stdout.write(ansi.clear + ansi.showCursor);

    if (playbackAborted) {
      console.log('\n  Playback stopped.');
    } else {
      console.log('\n  Playback complete.');
    }
    process.exit(0);
  }
}

main().catch(err => {
  process.stdout.write(ansi.showCursor + ansi.clear);
  console.error('Error:', err.message);
  process.exit(1);
});
