(function () {
  let index = 0
  const $body = document.querySelector('body')

  const createDiagram = ($template) => {
    const content = $template.textContent.trim()
    const $node = document.createElement('div')

    $node.classList.add('mermaid-container')
    $template.classList.forEach(className => {
      $template.classList.remove(className)
      $node.classList.add(className)
    })
    $node.innerHTML = mermaid.render('diagram' + index++, content)

    $template.insertAdjacentElement('afterend', $node);
  }

  const addWorkaround = () => {
    $body.insertAdjacentHTML('afterbegin', `
    <style>
      #svgMarkerWorkaround {
        position: absolute;
        width: 1px;
        height: 1px;
      }
    </style>
    <svg id="svgMarkerWorkaround">
      <defs>
        <marker id="arrowhead" refX="5" refY="2" markerWidth="6" markerHeight="4" class="marker-arrowhead" orient="auto">
          <path d="M 0,0 V 4 L6,2 Z"></path>
        </marker>
      </defs>
    </svg>
    `)
  }

  const init = () => {
    addWorkaround()
    mermaid.initialize({
      startOnLoad: false,
      theme: null, // dark | default | forest | neutral
      flowchart: {
        curve: 'bundle' // https://github.com/d3/d3-shape/blob/master/README.md#curves
      },
      sequence: {
        width: 150,
        height: 40,
        mirrorActors: false
      }
    })

    const templates = document.querySelectorAll('[data-diagram]')
    Array.from(templates).forEach(createDiagram)
    Reveal.layout()
  }

  if (Reveal.isReady()) {
    init()
  } else {
    Reveal.addEventListener('ready', () => init())
  }
}())
