const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const distDir = path.join(__dirname, 'project-dist');
const bundlePath = path.join(distDir, 'bundle.css');

fs.readdir(stylesDir, (err, files) => {
  if (err) throw err;

  const styles = [];

  files.forEach(file => {
    const filePath = path.join(stylesDir, file);

    if (fs.statSync(filePath).isFile() && path.extname(filePath) === '.css') {
      const content = fs.readFileSync(filePath, 'utf-8');
      styles.push(content);
    }
  });

  fs.writeFileSync(bundlePath, styles.join('\n'), 'utf-8');

  console.log('Styles now in bundle.css!');
});