const fs = require('fs');
const path = require('path');

const fixes = [
  { from: 'from "../components/cardGame"', to: 'from "../components/CardGame"' },
  { from: 'from "./cardGame"', to: 'from "./CardGame"' },
  { from: 'from "../components/navbar"', to: 'from "../components/Navbar"' },
  { from: 'from "../components/footer"', to: 'from "../components/Footer"' },
];

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  fixes.forEach(fix => {
    if (content.includes(fix.from)) {
      content = content.replaceAll(fix.from, fix.to);
      changed = true;
    }
  });
  
  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log('Fixed:', filePath);
  }
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      fixFile(fullPath);
    }
  });
}

walkDir('./src');
console.log('Done!');