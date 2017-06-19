import MagasParser from './parsers/MagasParser'
import IngNewsParser from './parsers/IngNewsParser'
import IngushetiaParser from './parsers/IngushetiaParser'
import YugaParser from './parsers/YugaParser'

const parsers = [
  new MagasParser(),
  new IngNewsParser(),
  new IngushetiaParser(),
  new YugaParser(),
];

parsers.forEach((p) => p.start());
