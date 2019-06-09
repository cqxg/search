
export default class AppModel {
    constructor(view) {
        this.view = view;
        this.state = {
            baseLink: 'https://www.googleapis.com/youtube/v3/',
            endpoint: 'search',
            key: 'AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y',
            type: 'video',
            part: 'snippet',
            maxResults: '15',
            pageToken: '',
            text: '',
            stringID: ''
        };

    }

    generateStatics(items) {
        const ID = [];
        for (let a = 0; a < items.length; a++) {
            const videoTest = items[a].id.videoId;
            ID.push(videoTest);
            this.state.stringID = ID.join(',');
        }
    }

    search(text) {
        const { baseLink, endpoint, key, type, part, maxResults, pageToken } = this.state;
        const tokenQuery = `&pageToken=${pageToken}`;

        fetch(`${baseLink}${endpoint}?key=${key}&type=${type}&part=${part}&maxResults=${maxResults}&q=${text}${pageToken && tokenQuery}`)
            .then(res => res.json())
            .then(response => {
                this.state.pageToken = response.nextPageToken;
                this.generateStatics(response.items);
                this.secondQuery();
            })
            .catch(err => console.log(err));
    }

    secondQuery() {
        const { baseLink, key, stringID } = this.state;
        fetch(`${baseLink}videos?key=${key}&id=${stringID}&part=snippet,statistics`)
            .then(res => res.json())
            .then(response => this.view.generateCards(response.items))
            .catch(err => console.log(err));
    }
}

