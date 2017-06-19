import ParserClass from '../classes/Parser';
import beautify from 'json-beautify';
import fs from 'fs';

const Parser = new ParserClass();
let posts = [];

export default class YugaParser {

  start() {
    // Получаем все ссылки
    Parser.getLinks({
      url: 'https://www.yuga.ru/news/ingushetia/', // URL записи
      selector: '.card-body a.title', // Селектор ссылки на запись
    }).then((urls) => {

      let promises = urls.map((url, index) => Parser.getPost({
        url: url,
        details: {
          title: '.panel-title h1',
          content: '.material-body p',
          image: '.fancybox.zoom img',
        }
      }).then((post) => posts.push(post)));

      Promise.all(promises).then(() => fs.writeFile('yuga.json', beautify(posts, null, 2, 80), (err) => {
        if (err) console.log('Error write file: ', err); else console.log('SAVED!');
      }));

    }).catch((err) => {
      console.log('error2', err);
    });
  }

}
