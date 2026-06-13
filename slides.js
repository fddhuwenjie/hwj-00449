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
          elements.push({ type: 'code', lang: codeLang, lines: [...codeLines] });
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
      elements.push({ type: 'code', lang: codeLang, lines: [...codeLines] });
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
    output += `  ${i + 1}. ${slides[i].title || '(untitled)'}\n`;
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
    --help, -h        Show this help message

  Navigation:
    ←/→ or Space     Navigate between slides/lines
    g                Go to first slide
    G                Go to last slide
    o                Show outline
    q                Quit
    <number>+Enter   Jump to slide number
`);
    process.exit(0);
  }

  const mdFile = args.find(a => !a.startsWith('--'));
  if (!mdFile) {
    console.error('Error: No markdown file specified.');
    process.exit(1);
  }

  const filePath = path.resolve(mdFile);
  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found: ${filePath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const slides = parseSlides(content);

  if (slides.length === 0) {
    console.error('Error: No slides found in the presentation.');
    process.exit(1);
  }

  const themeIdx = args.indexOf('--theme');
  const themeName = themeIdx !== -1 && args[themeIdx + 1] ? args[themeIdx + 1] : 'dark';
  const theme = THEMES[themeName] || THEMES.dark;
  const speakerMode = args.includes('--speaker');
  const exportIdx = args.indexOf('--export');
  const exportFormat = exportIdx !== -1 && args[exportIdx + 1] ? args[exportIdx + 1] : null;
  const listMode = args.includes('--list');

  if (listMode) {
    console.log(listSlides(slides));
    process.exit(0);
  }

  if (exportFormat === 'html') {
    const html = exportHTML(slides, themeName);
    const outFile = mdFile.replace(/\.md$/i, '.html');
    fs.writeFileSync(outFile, html, 'utf-8');
    console.log(`Exported HTML to: ${outFile}`);
    process.exit(0);
  }

  if (exportFormat === 'pdf') {
    const text = exportPDF(slides);
    const outFile = mdFile.replace(/\.md$/i, '.txt');
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

    const { cols, rows } = getTerminalSize();
    const slideLines = getSlideLines(currentSlide);

    transitionSlide([], slideLines, 'forward', theme, cols, rows).then(() => {
      render();
      if (speakerMode) {
        const totalElapsed = Math.round((Date.now() - presentationStart) / 1000);
        updateSpeakerDisplay(slides[currentSlide], totalElapsed, getAvgSlideTime(), slides.length, currentSlide);
      }
    });
  }

  process.stdout.write(ansi.hideCursor);
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

  render();

  if (speakerMode) {
    const speakerInterval = setInterval(() => {
      if (!running) { clearInterval(speakerInterval); return; }
      const totalElapsed = Math.round((Date.now() - presentationStart) / 1000);
      updateSpeakerDisplay(slides[currentSlide], totalElapsed, getAvgSlideTime(), slides.length, currentSlide);
    }, 1000);
  }
}

main().catch(err => {
  process.stdout.write(ansi.showCursor + ansi.clear);
  console.error('Error:', err.message);
  process.exit(1);
});
