(function () {
    const $head = document.querySelector('head');
    const $reveal = document.querySelector('.reveal');
    const $header = document.createElement('header');
    $header.classList.add('header');
    $header.classList.add('header--hidden');
    $header.innerHTML = `
    <div class="header-container">
      <h1 class="header-title">Пример заголовка</h1>
      <div class="header-image-container">
        <img
          class="header-image"
          src="lib/plugins/tinkoff-header/tinkoff.png"
        />
      </div>
    </div>
  `;

    const $title = $header.querySelector('.header-title');
    const $image = $header.querySelector('.header-image');

    const $style = document.createElement('style');
    $style.type = 'text/css';
    $style.innerHTML = `
    .reveal .header {
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      left: 0;
      
      border-top: 3px var(--tinkoff) solid;
    
      width: 100vw;
      height: 2em;
      padding: 0 1em;
      z-index: 5;
      background-color: white;
    }
    
    .reveal .header.header--hidden {
      display: none;
    }
    
    .reveal .header h1.header-title {
      line-height: 1.2em;
      font-size: 1.2em;
      margin: 0;
      white-space: nowrap;
      position: fixed;
      top: 0;
    }
    
    .reveal .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .reveal .header-image-container {
      line-height: 2.0em;
    }
    
    .reveal .header-image {
      height: 1em;
    }
  `;

    const updateHeader = () => {
        const $title = $header.querySelector('.header-title');
        const state = Reveal.getState();
        const currentSlide = Reveal.getSlide(state.indexh, state.indexf);

        currentSlide.dataset.hasOwnProperty('disableHeader')
            ? $header.classList.add('header--hidden')
            : $header.classList.remove('header--hidden');

        currentSlide.classList.contains('slide-code')
            ? $title.classList.add('header--code')
            : $title.classList.remove('header--code');

        $title.innerHTML = currentSlide.dataset.title || '';
    };

    const initHeader = () => {
        $head.appendChild($style);
        // $reveal.appendChild($header);
        $reveal.insertBefore($header, $reveal.firstElementChild);
        updateHeader();
        Reveal.addEventListener('slidechanged', updateHeader);
    };

    if (Reveal.isReady()) {
        initHeader();
    } else {
        Reveal.addEventListener('ready', () => initHeader());
    }
})();
