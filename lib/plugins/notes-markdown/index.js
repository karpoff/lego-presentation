(function(){
  const offsetRegex = /^(?:\s+)/
  const lineBreaks = /^\n|\n$/g

  const getOffset = (content) => {
    const offset = content
      .replace(lineBreaks, '')
      .match(offsetRegex)
    return offset ? offset[0].length : 0
  }

  const createDiagram = ($note) => {
    const textContent = $note.textContent
    const offset = getOffset(textContent)
    const content = textContent.split('\n').map(line => line.substring(offset)).join('\n')
    $note.innerHTML = marked(content)
  }

  const init = () => {
    const markdownNotes = document.querySelectorAll('[data-note-markdown]')
    Array.from(markdownNotes).forEach(createDiagram)
    Reveal.layout()
  }

  if (Reveal.isReady()) {
    init()
  } else {
    Reveal.addEventListener('ready', () => init())
  }
}())
