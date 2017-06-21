import ParserClass from '../classes/Parser';
import beautify from 'json-beautify';
import fs from 'fs';

const Parser = new ParserClass();
let posts = [];

export default class IngushetiaParser {

  start() {
    // Получаем все ссылки
    Parser.getLinks({
      url: 'http://www.ingushetia.ru/news/', // URL записи
      selector: '.content__more', // Селектор ссылки на запись
      prefix: 'http://www.ingushetia.ru', // Добавлять URL к каждой ссылке
    }).then((urls) => {

      let promises = urls.map((url, index) => Parser.getPost({
        url: url,
        prefix: 'http://www.ingushetia.ru',
        details: {
          title: 'h1.title',
          content: '.page-content p',
          image: '.page-content img',
        }
      }).then((post) => posts.push(post)));

      Promise.all(promises).then(() => fs.writeFile('ingushetia.json', beautify(posts, null, 2, 80), (err) => {
        if (err) console.log('Error write file: ', err); else console.log('Ingushetia: SAVED!');
      }));

    }).catch((err) => {
      console.log('error2', err);
    });
  }

}
