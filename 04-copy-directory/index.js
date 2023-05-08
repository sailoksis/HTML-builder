const fs = require('fs/promises');
const path = require('path');

const sourcePath = path.join(__dirname, 'files');
const destinationPath = path.join(__dirname, 'files-copy');

async function copyDir() {
  try {
    await fs.mkdir(destinationPath, { recursive: true });
    
    const files = await fs.readdir(sourcePath, { withFileTypes: true });

    for (const file of files) {
      const sourceFilePath = path.join(sourcePath, file.name);
      const destinationFilePath = path.join(destinationPath, file.name);

      if (file.isDirectory()) {
        await copyDir(sourceFilePath, destinationFilePath);
      } else {
        await fs.copyFile(sourceFilePath, destinationFilePath);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

copyDir();