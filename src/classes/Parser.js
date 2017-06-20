import cheerio from 'cheerio';
import unirest from 'unirest';
import Iconv from 'iconv-lite';

export default class ParserClass {

  constructor() {}

  getLinks(obj) {
    return new Promise((resolve, reject) => {
      const url = obj.url;
      const selector = obj.selector;
      unirest.get(url).end((response) => {
        const html = response.body;
        const $ = cheerio.load(html);
        const elems = $(selector);
        let urls = [];
        elems.map((i, elem) => {
          let link = $(elem).attr('href');
          if (obj.prefix && link.indexOf('://') == -1) {
            link = obj.prefix + link;
          }
          urls.push( link );
        });
        if (!urls.length) reject();
        resolve(urls);
      });
    });
  }

  /**
   * getPost - получение записи
   *
   * @param  {объект} obj - опции для парсинга
   * @param  {строка} obj.url - ссылка на запись
   *
   * @param  {объект} obj.details - детали парсинга
   *
   * @param  {строка} obj.details.title - селектор заголовка
   * @param  {строка} obj.details.submitted - селектор даты добавления записи
   * @param  {строка} obj.details.content - селектор содержания записи
   * @param  {строка} obj.details.image - селектор главного изображения
   * @param  {строка} obj.details.tags - селектор тегов записи
   * @param  {строка} obj.details.category - селектор категории
   * @param  {строка} obj.details.views - селектор количества просмотров
   * @param  {строка} obj.details.comments - селектор количества комментариев
   *
   * @return {[type]}     [description]
   */
  getPost(obj) {
    return new Promise((resolve) => {

      const url = obj.url;
      const details = obj.details;

      unirest.get(url).end((response) => {

        let html = response.body;

        const $ = cheerio.load(html);

        const post = {};

        for (var key in details) {
          let val = key == 'image' ? $(details[key]).attr('src') : $(details[key]).text();
          val = key == 'image' && obj.prefix ? obj.prefix + val : val;
          post[key] = {
            value: val,
            html: $(details[key]).html(),
          }
        }

        resolve(post);

      });

    });
  }

}
