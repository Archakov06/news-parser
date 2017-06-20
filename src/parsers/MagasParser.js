import ParserClass from '../classes/Parser';
import beautify from 'json-beautify';
import fs from 'fs';

const Parser = new ParserClass();
let posts = [];

export default class MagasParser {

  start() {
    // Получаем все ссылки
    Parser.getLinks({
      url: 'http://magas.ru/', // URL записи
      selector: '.node h2 a', // Селектор ссылки на запись
      prefix: 'http://magas.ru/', // Добавлять URL к каждой ссылке
    }).then((urls) => {

      let promises = urls.map((url, index) => Parser.getPost({
        url: url,
        details: {
          title: 'h2#page-title',
          content: '.page-content .content p',
          image: '.imagecache-image_small img',
        }
      }).then((post) => {
        if (post.title.value.indexOf('реклама') == -1) posts.push(post)
      }));

      Promise.all(promises).then(() => fs.writeFile('magas.json', beautify(posts, null, 2, 80), (err) => {
        if (err) console.log('Error write file: ', err); else console.log('SAVED!');
      }));

    }).catch((err) => {
      console.log('error2', err);
    });
  }

}
