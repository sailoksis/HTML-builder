const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = 'components';
const STYLES_DIR = 'styles';
const ASSETS_DIR = 'assets';
const TEMPLATE_FILE = 'template.html';
const DIST_DIR = 'project-dist';
const INDEX_FILE = 'index.html';
const STYLES_FILE = 'style.css';

if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR);
}

const template = fs.readFileSync(path.join(__dirname, TEMPLATE_FILE), 'utf-8');

const componentRegex = /{{(.+?)}}/g;
const indexHtml = template.replace(componentRegex, (match, componentName) => {
  const componentPath = path.join(__dirname, COMPONENTS_DIR, componentName + '.html');
  return fs.readFileSync(componentPath, 'utf-8');
});
fs.writeFileSync(path.join(__dirname, DIST_DIR, INDEX_FILE), indexHtml);

const stylesDir = path.join(__dirname, STYLES_DIR);
const stylesFiles = fs.readdirSync(stylesDir).filter((fileName) => path.extname(fileName) === '.css');
const stylesContent = stylesFiles.map((fileName) => {
  return fs.readFileSync(path.join(stylesDir, fileName), 'utf-8');
}).join('\n');
fs.writeFileSync(path.join(__dirname, DIST_DIR, STYLES_FILE), stylesContent);

const assetsDir = path.join(__dirname, ASSETS_DIR);
const distAssetsDir = path.join(__dirname, DIST_DIR, ASSETS_DIR);
fs.mkdirSync(distAssetsDir, { recursive: true }); 
const copyRecursiveSync = (src, dest) => {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    const files = fs.readdirSync(src);
    for (const file of files) {
      copyRecursiveSync(path.join(src, file), path.join(dest, file));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
};
copyRecursiveSync(assetsDir, distAssetsDir);

