const fs = require('fs/promises');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

async function getFilesInfo() {
  try {
    const files = await fs.readdir(folderPath, { withFileTypes: true });

    for (const file of files) {
      if (file.isFile()) {
        const ext = path.extname(file.name);
        const stats = await fs.stat(path.join(folderPath, file.name));
        const size = stats.size / 1024;
        console.log(`${file.name}-${ext}-${size.toFixed(3)}kb`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

getFilesInfo();