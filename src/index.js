import MagasParser from './parsers/MagasParser'
import IngNewsParser from './parsers/IngNewsParser'
import IngushetiaParser from './parsers/IngushetiaParser'
import YugaParser from './parsers/YugaParser'
import { exec } from 'child_process';

exec('git add .', () => {
  exec('git commit -m "update"', () => {
    exec('git push');
  });
});
