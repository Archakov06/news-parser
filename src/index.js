import ParserClass from './Parser';

const Parser = new ParserClass();

// Получаем все ссылки
Parser.getLinks({
  url: 'http://magas.ru/', // URL записи
  selector: '.node h2 a', // Селектор ссылки на запись
  prefix: true, // Добавлять URL к каждой ссылке
}).then((urls) => {

  // Вытаскиваем первую запись
  Parser.getPost({
    url: urls[0],
    details: {
      title: '#page-title',
      submitted: '.submitted',
      content: '.page-content .content',
      image: '.imagecache-image_small',
    }
  }).then((post) => {

    console.log(post.content.text);
    console.log(post.content.html);

  }).catch(() => {});

}).catch(() => {
  console.log('error');
});
