import ParserClass from '../classes/Parser';
import beautify from 'json-beautify';
import fs from 'fs';

const Parser = new ParserClass();
let posts = [];

export default class IngNewsParser {

  start() {
    // Получаем все ссылки
    Parser.getLinks({
      url: 'http://ingnews.ru/', // URL записи
      selector: '.contentheading a', // Селектор ссылки на запись
      prefix: 'http://ingnews.ru/', // Добавлять URL к каждой ссылке
    }).then((urls) => {

      let promises = urls.map((url, index) => Parser.getPost({
        url: url,
        prefix: 'http://ingnews.ru/',
        details: {
          title: '.contentheading',
          content: '.contentpaneopen tr td p',
          image: '.contentpaneopen td img',
        }
      }).then((post) => {

        post.title.value = post.title.value.replace(/(\t|\n)/g, '');
        posts.push(post);

      }));

      Promise.all(promises).then(() => fs.writeFile('ingnews.json', beautify(posts, null, 2, 80), (err) => {
        if (err) console.log('Error write file: ', err); else console.log('SAVED!');
      }));

    }).catch((err) => {
      console.log('error2', err);
    });
  }

}
