import MagasParser from './parsers/MagasParser'
import IngNewsParser from './parsers/IngNewsParser'
import IngushetiaParser from './parsers/IngushetiaParser'
import YugaParser from './parsers/YugaParser'
import { exec } from 'child_process';

const parsers = [
  new MagasParser(),
  new IngNewsParser(),
  new IngushetiaParser(),
  new YugaParser(),
];

parsers.forEach((p) => p.start());

setTimeout(() => {
  exec('git add .');
  console.log('GIT ADD');
    setTimeout(() => {
      const date = `updated - ${new Date().getDate()}.${new Date().getMonth()+1 < 10 ? '0' + new Date().getMonth()+1 : new Date().getMonth()+1}.${new Date().getFullYear()} - ${new Date().getHours()}:${new Date().getMinutes()}`;
      exec(`git commit -m "${date}"`);
      console.log('GIT COMMIT - ' + date);
        setTimeout(() => {
          exec('git push origin master');
          console.log('GIT PUSH');
        }, 1000);
    }, 1000);
}, 10000);
