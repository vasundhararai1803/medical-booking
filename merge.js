const fs = require('fs');

const files = [
  'client/src/components/landing/Hero.tsx',
  'client/src/components/landing/OurServices.tsx',
  'client/src/components/landing/Reviews.tsx',
  'client/src/pages/Home.tsx'
];

let allImports = [];
let allBody = [];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  
  lines.forEach(line => {
    if (line.startsWith('import ')) {
      // Don't import self components since they are now in the same file
      if (!line.includes('./components/landing/')) {
        allImports.push(line);
      }
    } else {
      allBody.push(line);
    }
  });
});

// Deduplicate imports
const uniqueImports = [...new Set(allImports)];

// We will manually fix any missing imports or weird stuff
const finalContent = uniqueImports.join('\n') + '\n\n' + allBody.join('\n');
fs.writeFileSync('client/src/pages/Home.tsx', finalContent);
console.log('Merged Home.tsx');
