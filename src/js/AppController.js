import AppModel from './AppModel';
import AppView from './AppView';


class AppController {
    constructor() {
        this.isDown = false;
        this.startX = '';
        this.scrollLeft = '';
        this.view = new AppView();
        this.model = new AppModel(this.view);
        this.slideIndex = 1;

        this.textInput = document.querySelector('#textInput');
        this.moreVideo = document.querySelector('.more');
        this.slider = document.querySelector('#scroll');
        this.slides = document.querySelector('.card');
        this.dots = document.querySelector(".slider-dots_item");

        this.textInput.addEventListener('keyup', e => this.enterHandler(e));
        this.moreVideo.addEventListener('click', e => this.moreHandler(e));
        this.slider.addEventListener('mousedown', e => this.handleDown(e));
        this.slider.addEventListener('mouseleave', e => this.handleLeave(e));
        this.slider.addEventListener('mouseup', e => this.handleUp(e));
        this.slider.addEventListener('mousemove', e => this.handleMove(e));
    }


    enterHandler(e) {
        if (e.keyCode === 13) {
            const text = e.currentTarget.value;
            setTimeout(() => {
                this.moreVideo.style.display = 'block';
            }, 2000);
            this.model.search(text);
        }
    }

    moreHandler(e) {
        const text = e.currentTarget.value;
        this.model.search(text);
    }

    handleDown(e) {
        this.isDown = true;
        e.currentTarget.classList.add('active');
        this.startX = e.pageX - e.currentTarget.offsetLeft;
        this.scrollLeft = e.currentTarget.scrollLeft;
    }

    handleLeave(e) {
        this.isDown = false;
        e.currentTarget.classList.remove('active');
    }

    handleUp(e) {
        this.isDown = false;
        e.currentTarget.classList.remove('active');
        this.moreHandler(e);
    }

    handleMove(e) {
        if (!this.isDown) return;
        e.preventDefault();
        const x = e.pageX - e.currentTarget.offsetLeft;
        const walk = (x - this.startX) * 2;
        e.currentTarget.scrollLeft = this.scrollLeft - walk;
    }
}

export default AppController;