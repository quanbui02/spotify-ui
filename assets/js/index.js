const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const playlists = $('.list-music');
const songName = $('.music-playsong-a1 h1');
const singerSong = $('.music-playsong-a1 h3');
const audio = $('#audio');
const playbtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const pcsArea = $('.process-area');
const next = $('.btn-next');
const pre = $('.btn-prev');
const btnRandom = $('.icon-random');
const loadImg = $('.background-music-a1');
const loadFavourite = $('.like-song-name');
const volumeBtn = $('#volume');
const notification = $('.notification');
const favourite = $('.like-song-name');
const repeat = $('.icon-repeat');
const OnVolume = $('.OnVolume');
const OffVolume = $('.OffVolume');
const btnSound = $('.btn-volumeOnOff');
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isVolume: false,
    isLikeSong: false,
    isRepeatSong: false,
    songs: [
        {
            name: 'At My Worst',
            singer: 'Pink Sweat',
            path: './assets/music/1.mp3',
            image: './assets/img/6OhOObZ.jpg',
        },
        {
            name: 'Gangstas Paradise',
            singer: 'Coolio',
            path: './assets/music/2.mp3',
            image: './assets/img/Coolio.jpg',
        },
        {
            name: 'Hear Me Now',
            singer: 'Alok Bruno Martini',
            path: './assets/music/3.mp3',
            image: './assets/img/hqdefault.jpg',
        },
        {
            name: 'In Your Eyes',
            singer: 'The Weeknd',
            path: './assets/music/4.mp3',
            image: './assets/img/Ca-Si-The-Weeknd.jpg',
        },
        {
            name: 'Monsters',
            singer: 'Timeflies Katie Sky',
            path: './assets/music/5.mp3',
            image: './assets/img/6OhOObZ.jpg',
        },
        {
            name: 'Save Your Tears',
            singer: 'The Weeknd',
            path: './assets/music/6.mp3',
            image: './assets/img/Ca-Si-The-Weeknd.jpg',
        },
        {
            name: 'Sing me to sleep',
            singer: 'Alan Walker',
            path: './assets/music/7.mp3',
            image: './assets/img/alan-walker-press-cr-rikkard-haggbom-2016-billboard-1548-1502369168.jpg',
        },
        {
            name: 'Starboy',
            singer: 'The Weeknd',
            path: './assets/music/8.mp3',
            image: './assets/img/Ca-Si-The-Weeknd.jpg',
        },
        {
            name: 'Sweet but Psycho',
            singer: 'Ava Max',
            path: './assets/music/9.mp3',
            image: './assets/img/ava-max-ayntk.jpg',
        },
        {
            name: 'Why not me',
            singer: 'Enrique Iglesias',
            path: './assets/music/10.mp3',
            image: './assets/img/Enrique-Iglesias-1-2.jpeg',
        },
    ],
    render: function () {
        const htmls = this.songs.map((song, index) => {
            console.log(song.name);
            return `
            <div class="list-music--title-namesong ${index === this.currentIndex}" data-index = "${index}">
                <div class="list-music--title-song">
                <img
                            src="${song.image}"
                            alt=""
                            class="list-img-song"
                        />
                        <div class="title-music">
                            <h1>${song.name}</h1>
                            <h3>${song.singer}</h3>
                        </div>
                    </div>
                        <span class="album-music">${song.name}</span>
            </div>
          `;
        });
        playlists.innerHTML = htmls.join('');
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
    },
    handleEvent: function () {
        playbtn.onclick = function () {
            if (app.isPlaying) {
                app.isPlaying = false;
                audio.pause();
                player.classList.remove('playing');
            } else {
                app.isPlaying = true;
                audio.play();
                player.classList.add('playing');
            }
        };
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = (audio.currentTime / audio.duration) * 100;
                progress.value = progressPercent;
            }
        };
        progress.onchange = function (e) {
            const sinkAudio = (audio.duration * progress.value) / 100;
            audio.currentTime = sinkAudio;
            audio.play();
            player.classList.add('playing');
        };
        volumeBtn.onchange = function () {
            const sinkVolume = volumeBtn.value / 100;
            audio.volume = sinkVolume;
            if(audio.volume === 0) {
                OffVolume.classList.remove('hidden');
                OnVolume.classList.add('hidden');
            }
            else if(audio.volume > 0) {
                OffVolume.classList.add('hidden');
                OnVolume.classList.remove('hidden');
            }
        };
        next.onclick = function () {
            if (app.isRandom) {
                app.playRandom();
            } else {
                app.nextSong();
            }
            audio.play();
            player.classList.add('playing');
        };
        pre.onclick = function () {
            if (app.isRandom) {
                app.playRandom();
            } else {
                app.preSong();
            }
            audio.play();
            player.classList.add('playing');
        };

        //error handler updating
        btnSound.onclick = function () {
            app.isVolume = !app.isVolume;
            btnSound.classList.toggle('activeSound', app.isVolume);
            if ($('.btn-volumeOnOff.activeSound') != null) {
                OffVolume.classList.remove('hidden');
                OnVolume.classList.add('hidden');
                volumeBtn.value = 0;
                audio.volume = 0;
            } else {
                OffVolume.classList.add('hidden');
                OnVolume.classList.remove('hidden');
                volumeBtn.value = 50;
                audio.volume = 0.5;
            }
        };
        //updating :)))
        favourite.onclick = function () {
            app.isLikeSong = !app.isLikeSong;
            favourite.classList.toggle('favourite', app.isLikeSong);
            notification.classList.add('slideOntop');
            if (!app.isLikeSong) {
                notification.classList.remove('slideOntop');
            }
            setTimeout(() => {
                notification.classList.remove('slideOntop');
            }, 3000);
        };

        //done random songs :)))
        btnRandom.onclick = function () {
            app.isRandom = !app.isRandom;
            btnRandom.classList.toggle('swap', app.isRandom);
        };
        audio.onended = function () {
            if (app.isRepeat) {
                audio.play();
            } else {
                next.click();
            }
        };
        repeat.onclick = function () {
            app.isRepeat = !app.isRepeat;
            repeat.classList.toggle('swap');
        };
        playlists.onclick = function (e) {
            const songIndex = e.target.closest('.list-music--title-namesong');
            if (songIndex) {
                app.currentIndex = songIndex.dataset.index;
                app.loadCurrentSong();
                audio.play();
                player.classList.add('playing');
            }
        };
    }
    ,
    playRandom: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        app.loadCurrentSong();
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    preSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    loadCurrentSong: function () {
        songName.textContent = this.currentSong.name;
        singerSong.textContent = this.currentSong.singer;
        audio.src = this.currentSong.path;
        loadImg.src = this.currentSong.image;
        if ($('.like-song-name.favourite')) {
            favourite.classList.remove('favourite');
        }
    },
    start: function () {
        this.defineProperties();
        this.render();
        this.loadCurrentSong();
        this.handleEvent();
        this.nextSong();
        this.preSong();
    },
};

app.start();
