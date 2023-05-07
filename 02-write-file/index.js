const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fileStream = fs.createWriteStream('./02-write-file/text.txt', { flags: 'a' });

console.log('Напишите что-то ( "exit" для выхода):');

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('Уже завершаю работу...');
    rl.close();
  } else {
    fileStream.write(`${input}\n`);
  }
});

rl.on('close', () => {
  console.log('Ну все, прога завершена');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Окей, быстрое завершение работы');
  rl.close();
});
