const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
function PlayList (audioLists = [], indexCurrent) {
  this.audioLists = audioLists
  this.indexCurrent = indexCurrent || 0
  this._playList = $('.playlist')
  this._imageCurrent = $('.cd-thumb')
  this._currentSongTitle = $('.current-song-title')
  this._currentSongSinger = $('.current-song-singer')
  this._progressBar = $('.progress-bar')
  this._audioPlayer = $('.audio-player')
  this._btnTogglePlay = $('.btn-toggle-play')
  this._btnLoop = $('.btn-loop')
  this._btnPrev = $('.btn-prev')
  this._btnNext = $('.btn-next')
  this._btnShuffle = $('.btn-shuffle')
  this._playerSong = $('.player-left')
  this._init = () => {
    console.log(this.audioLists)
    //Kiểm tra tham số đầu vào
    if (!Array.isArray(this.audioLists)) {
      console.error('Tham số truyền vào phải là một mảng obj')
      return
    }
    const stringInnerList = this.audioLists
      .map(audio => {
        return `
           <div class="song" data-id="${audio.id}">
            <div class="thumb">
              <img
                src="${audio.profile}"
                alt="312"
                width="48px"
                height="48px"
              />
            </div>
            <div class="body">
              <h3 class="title">${audio.name}</h3>
              <p class="author">${audio.singer}</p>
            </div>
            <div class="option"><i class="fas fa-ellipsis-h"></i></div>
          </div>
      `
      })
      .join('')
    this._playList.innerHTML = stringInnerList
    //Render bài hát
    this._renderCurrent(this.indexCurrent, false)
    //Click nút tooglePlay
    this._btnTogglePlay.onclick = () => {
      this._togglePlay()
    }
    //Chọn bài
    this._playList.querySelectorAll('.song').forEach(element => {
      element.onclick = () => {
        this._renderCurrent(element.dataset.id, true)
      }
    })
    // Lặp lại
    this._isSongLoop = false
    this._btnLoop.onclick = event => {
      this._changeLoop(event)
    }
    // next preve
    this._btnNext.onclick = () => {
      this._changeSong('next')
    }
    this._btnPrev.onclick = () => {
      this._changeSong('prev')
    }
    //Random songs
    this._btnShuffle.onclick = () => {
      this._shuffle()
    }
  }
  this._shuffle = () => {
    this.audioLists = this.audioLists.sort(() => Math.random() - 0.5)
    const stringInnerList = this.audioLists
      .map(audio => {
        return `
           <div class="song ${
             +this._playerSong.dataset.id === +audio.id ? 'active' : ''
           }" data-id="${audio.id}">
            <div class="thumb">
              <img
                src="${audio.profile}"
                alt="312"
                width="48px"
                height="48px"
              />
            </div>
            <div class="body">
              <h3 class="title">${audio.name}</h3>
              <p class="author">${audio.singer}</p>
            </div>
            <div class="option"><i class="fas fa-ellipsis-h"></i></div>
          </div>
      `
      })
      .join('')
    this._playList.innerHTML = stringInnerList
  }
  this._changeLoop = event => {
    this._isSongLoop = !this._isSongLoop
    event.target
      .closest('.btn-loop')
      .classList.toggle('active', this._isSongLoop)
    this._audioPlayer.loop = this._isSongLoop
  }
  this._getIndexById = idSong => {
    return this.audioLists.findIndex(audio => +audio.id === +idSong)
  }
  this._renderCurrent = (idSong, isPlay = false) => {
    // Đổi ảnh, tên, thêm src nhạc
    this._playerSong.dataset.id = idSong
    let validIndex = this._getIndexById(+idSong)
    if (validIndex === -1) validIndex = 0
    this._imageCurrent.src = this.audioLists[validIndex].profile
    this._currentSongTitle.innerText = this.audioLists[validIndex].name
    this._currentSongSinger.innerText = this.audioLists[validIndex].singer
    this._playList.querySelectorAll('.song').forEach(element => {
      if (+element.dataset.id === +idSong) {
        element.classList.add('active')
      } else {
        element.classList.remove('active')
      }
    })
    if (this._audioPlayer) {
      this._audioPlayer.src = this.audioLists[validIndex].audio
      ;(this._audioPlayer.oncanplay = () => {
        this._changStatusAudio(isPlay)
        this._audioPlayer.onended = () => {
          this._changeSong('next')
        }
      }),
        { once: true }
    }
  }
  this._togglePlay = () => {
    if (this._audioPlayer.paused) {
      this._changStatusAudio(true)
    } else {
      this._changStatusAudio(false)
    }
  }
  this._changStatusAudio = (status = false) => {
    //
    if (status) {
      this._audioPlayer.play()
      this._btnTogglePlay.querySelector('i').classList.remove('fa-play')
      this._btnTogglePlay.querySelector('i').classList.add('fa-pause')
    } else {
      this._audioPlayer.pause()
      this._btnTogglePlay.querySelector('i').classList.add('fa-play')
      this._btnTogglePlay.querySelector('i').classList.remove('fa-pause')
    }
  }
  this._changeSong = string => {
    let idSong = null
    if (string === 'next') {
      if (!$('.song.active').nextElementSibling) {
        idSong = +$$('.song')[0].dataset.id
      } else {
        idSong = +$('.song.active').nextElementSibling.dataset.id
      }
    } else if (string === 'prev') {
      if (!$('.song.active').previousElementSibling) {
        idSong = +$$('.song')[audioLists.length - 1].dataset.id
      } else {
        idSong = +$('.song.active').previousElementSibling.dataset.id
      }
    } else {
      console.error('Không hợp lệ', string)
    }
    if (idSong) {
      this._renderCurrent(idSong, true)
    }
  }
}

// window.addEventListener("DOMContentLoaded", () => {
const audioLists = [
  {
    id: 1,
    singer: 'Bình Gold',
    name: 'Bật chế độ bay lên',
    audio: './asset/audio/BatCheDoBayLen-BinhGold-7199741.mp3',
    profile: './asset/images/ace.jpg'
  },
  {
    id: 2,
    singer: 'Bình Gold',
    name: 'Bốc bát họ',
    audio: './asset/audio/BocBatHo-BinhGold-6476612.mp3',
    profile: './asset/images/brook.jpg'
  },
  {
    id: 3,
    singer: 'Bình Gold',
    name: 'Lái máy bay',
    audio: './asset/audio/LaiMayBay-BinhGold-6011731.mp3',
    profile: './asset/images/nami.jpg'
  },
  {
    id: 4,
    singer: 'Bình Gold',
    name: 'Ông bà già tao lo hết',
    audio: './asset/audio/OngBaGiaTaoLoHet-BinhGoldLilShady-6720293.mp3',
    profile: './asset/images/robin.jpg'
  },
  {
    id: 5,
    singer: 'Xavi Phạm',
    name: 'Thằng bé cầm quyền',
    audio: './asset/audio/ThangBeCamQuyen2PipoRemix-XAVIPham-7494322.mp3',
    profile: './asset/images/zoro.jpg'
  },
  {
    id: 6,
    singer: 'Bình Gold',
    name: 'Quan hệ rộng',
    audio: './asset/audio/QuanHeRong-BinhGold-6472896.mp3',
    profile: './asset/images/Sanji.jpg'
  }
]
const newPlayList = new PlayList(audioLists, 4)
newPlayList._init()
// });
