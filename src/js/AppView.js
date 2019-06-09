
export default class AppView {
    constructor() {
        this.temp = document.querySelector('#card_template');
        this.wrapper = document.querySelector('.cards');
        this.dotsWrapper = document.querySelector('.dots');
        this.dots = document.querySelector('.slider-dots');
        this.fragment = document.createDocumentFragment();
        this.idCounter = {
            count: 0,
        }
    }


    generateCards(items) {

        let l = 0;
        for (let i = 0; i < items.length; i++) {
            const newArticle = document.importNode(this.temp.content, true);
            const cardID = newArticle.querySelector('.cards_item');
            if (i === l * 5) {
                cardID.id = `${l + this.idCounter.count}`;
                l += 1;
            }

            const title = newArticle.querySelector('.title');
            title.innerHTML = items[i].snippet.title;

            const imgLink = items[i].snippet.thumbnails.high.url;

            const prevImage = newArticle.querySelector('#prevImage');
            prevImage.src = imgLink;

            const info = newArticle.querySelector('.info');
            info.innerHTML = items[i].snippet.description;

            const time = newArticle.querySelector('.time');
            time.innerHTML = items[i].snippet.publishedAt.slice(0, 10);

            const watchVideo = newArticle.querySelector('.btn');
            watchVideo.href = `https://www.youtube.com/watch?v=${items[i].id}`;

            const views = newArticle.querySelector('.views');
            views.innerHTML = items[i].statistics.viewCount;

            const likes = newArticle.querySelector('.likes');
            likes.innerHTML = items[i].statistics.likeCount;

            this.fragment.appendChild(newArticle);

        }
        this.generateDots();
        this.wrapper.appendChild(this.fragment);
    }

    generateDots() {
        for (let i = 0; i < 3; i += 1) {
            const point = document.createElement('a');
            point.classList.add('slider-dots_item');
            point.href = `#${i + this.idCounter.count}`;
            point.style.setProperty('num', i);
            this.dotsWrapper.appendChild(point);
        }
        this.idCounter.count += 3;
    }
}