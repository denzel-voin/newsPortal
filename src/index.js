const apiKey = '16cd62b7e752472586a561b2daab6ac9';
const apiUrl = 'http://localhost:3000'; // Изменение пути для запросов к серверу
const newsContainer = document.querySelector('#newsContainer');

class NewsApp {
  async fetchNews(category = 'general') {
    try {
      const response = await fetch(`${apiUrl}/news?category=${category}`); // Изменение пути запроса
      if (!response.ok) {
        throw new Error('Ошибка запроса');
      }
      const result = await response.json();
      this.renderNews(result.articles);
    } catch (error) {
      console.error(error);
      newsContainer.innerHTML = '<p>Не удалось загрузить новости. Пожалуйста, попробуйте позже.</p>';
    }
  }

  renderNews(newsArray) {
    newsContainer.innerHTML = '';
    newsArray.forEach((el) => {
      const article = document.createElement('a');
      article.className = 'news-item';
      article.href = el.url;
      article.target = '_blank';
      const artHeader = document.createElement('h2');
      artHeader.className = 'news-title';
      artHeader.textContent = el.title;
      const description = document.createElement('p');
      description.className = 'news-description';
      description.textContent = el.description ? el.description : '';
      const image = document.createElement('img');
      image.className = 'image';
      image.src = el.urlToImage ? el.urlToImage : '';
      article.append(artHeader);
      article.append(image);
      article.append(description);
      newsContainer.append(article);
    });
  }

  init() {
    this.fetchNews();
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        const category = e.target.getAttribute('data-category');
        this.fetchNews(category || 'general');
      });
    });
  }
}

const app = new NewsApp();
app.init();
