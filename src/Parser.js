import cheerio from 'cheerio';
import unirest from 'unirest';

export default class ParserClass {

  constructor() {
  }

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
          const link = obj.prefix ? url + $(elem).attr('href') : $(elem).attr('href');
          urls.push( link.replace(/\/\//g, '/') );
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
    const url = obj.url;
    const details = obj.details;
    if (!details || !url) reject();
    return new Promise((resolve, reject) => {
      unirest.get(url).end((response) => {
        const html = response.body;
        const $ = cheerio.load(html);

        const postDetails = {
          title: {
            text: $(details.title).text(),
            html: $(details.title).html(),
          },
          submitted: {
            text: $(details.submitted).text(),
            html: $(details.submitted).html(),
          },
          content: {
            text: $(details.content).text(),
            html: $(details.content).html(),
          },
          image: {
            text: $(details.image).text(),
            html: $(details.image).html(),
          },
          tags: {
            text: $(details.tags).text(),
            html: $(details.tags).html(),
          },
          category: {
            text: $(details.category).text(),
            html: $(details.category).html(),
          },
          views: {
            text: $(details.views).text(),
            html: $(details.views).html(),
          },
          comments: {
            text: $(details.comments).text(),
            html: $(details.comments).html(),
          },
        };
        resolve(postDetails);
      });
    });
  }

}
