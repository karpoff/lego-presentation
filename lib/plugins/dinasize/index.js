(function() {
  const getLinehWidth = (string) => {
    const count = string.length
    const words = string.split(' ')

    if (words.length === 1 || count.length <= 12) {
      return {
        lines: 1,
        length: count
      }
    }

    const { result } = words.reduce(({ result, distance }, word, index) => {
      const first = words.slice(0, index).join(' ').length
      const last = words.slice(index).join(' ').length

      const currentDistance = Math.abs(first - last)

      return currentDistance < distance ? {
        result: Math.max(first, last),
        distance: currentDistance
      } : {
        result,
        distance
      }
    }, {
      result: 0,
      distance: Infinity
    })

    return {
      lines: 2,
      length: result
    }
  }

  const init = () => {
    const h1 = Array.from(document.querySelectorAll('.reveal .slides h1'))
    const contentWidth = parseInt(document.querySelector('.slides').style.width, 10) || 998

    h1.forEach(h => {
      // Don't overwrite font size if it was set manually
      if (h.style.fontSize) {
        return
      }

      const { length, lines } = getLinehWidth(h.textContent)
      const maxSize = lines === 1 ? 200 : 150
      const fontSize = (contentWidth / length) * 1.3

      h.style.fontSize = `${fontSize < maxSize ? fontSize : maxSize}px`
    })

    Reveal.layout()
  }

  if (Reveal.isReady()) {
    init()
  } else {
    Reveal.addEventListener('ready', () => init())
  }
})()
