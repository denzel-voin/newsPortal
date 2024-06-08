const apiKey = 'apiKey=16cd62b7e752472586a561b2daab6ac9';
const apiUrl = 'https://newsapi.org/v2/top-headlines?country=us&category=';
const newsContainer = document.querySelector('#newsContainer');

class NewsApp {
  fetchNews(category) {
    fetch(`${apiUrl}${category}&${apiKey}`)
      .then((response) => {
        if (!response.ok) return new Error('Ошибка запроса');
        return response.json();
      })
      .then((result) => this.renderNews(result.articles))
      .catch((error) => {
        newsContainer.innerHTML = `<p class="error">${error.message}</p>`;
      });
  }

  renderNews(newsArray) {
    newsContainer.innerHTML = '';
    newsArray.forEach((el) => {
      const newsItem = new NewsItem(el.title, el.description, el.urlToImage, el.url);
      newsContainer.append(newsItem.render());
    });
  }

  init() {
    const tabs = document.querySelectorAll('.category-tab');
    tabs.forEach((tab) => {
      tab.addEventListener('click', (event) => {
        const category = event.target.getAttribute('data-category');
        this.fetchNews(category === 'all' ? '' : category);
      });
    });

    this.fetchNews();
  }
}

class NewsItem {
  constructor(title, description, src, href) {
    this.title = title;
    this.description = description;
    this.src = src;
    this.href = href;
  }

  render() {
    const article = document.createElement('a');
    article.className = 'news-item';
    article.href = this.href;
    article.target = '_blank';

    const artHeader = document.createElement('h2');
    artHeader.className = 'news-title';
    artHeader.textContent = this.title;

    const image = document.createElement('img');
    image.className = 'image';
    image.src = this.src ? this.src : '';

    const description = document.createElement('p');
    description.className = 'news-description';
    description.textContent = this.description ? this.description : '';

    article.append(artHeader);
    article.append(image);
    article.append(description);

    return article;
  }
}

const news = new NewsApp();

news.init();
