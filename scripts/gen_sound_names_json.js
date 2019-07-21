const fs = require('fs');
const path = require('path');
const soundFileFolder = path.resolve(__dirname, '../public/sounds');
const outputJsonPath = path.resolve(__dirname, '../src/sound_names.json');

fs.readdir(soundFileFolder, { encoding: 'utf8' }, (err, files) => {
  if (err) {
    throw err;
  }

  fs.writeFile(outputJsonPath, JSON.stringify(files), err => {
    if (err) {
      throw err;
    }
    console.log(`Generate ${outputJsonPath} done.`);
  });
});
