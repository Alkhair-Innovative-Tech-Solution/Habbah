const fs = require('fs');
const path = require('path');

const blocksDir = path.join(__dirname, '..', 'src', 'blocks');
const files = fs.readdirSync(blocksDir);

files.forEach(file => {
  if (!file.endsWith('.ts')) return;
  const filePath = path.join(blocksDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has styling fields
  if (content.includes('textColor')) {
    console.log(`Skipping ${file} - already modified`);
    return;
  }

  // Find the last index of "],\n};" or "],\r\n};" or similar
  const matchStr = '  ],\n};';
  const matchStrWindows = '  ],\r\n};';
  let idx = content.lastIndexOf(matchStr);
  let length = matchStr.length;
  
  if (idx === -1) {
    idx = content.lastIndexOf(matchStrWindows);
    length = matchStrWindows.length;
  }

  if (idx !== -1) {
    let fieldsToAdd = `    { name: "textColor", type: "text", label: "Text Color Override (Hex)" },\n` +
                      `    { name: "backgroundColor", type: "text", label: "Background Color Override (Hex)" },\n` +
                      `    { name: "backgroundImage", type: "text", label: "Background Image URL" },\n`;

    if (file === 'CardsGrid.ts' || file === 'Testimonials.ts') {
      fieldsToAdd += `    { name: "cardBgColor", type: "text", label: "Card Background Color (Hex)" },\n` +
                     `    { name: "cardTextColor", type: "text", label: "Card Text Color (Hex)" },\n`;
    }

    const modifiedContent = content.substring(0, idx) + fieldsToAdd + content.substring(idx);
    fs.writeFileSync(filePath, modifiedContent, 'utf8');
    console.log(`Successfully modified ${file}`);
  } else {
    console.log(`Could not find end pattern in ${file}`);
  }
});
