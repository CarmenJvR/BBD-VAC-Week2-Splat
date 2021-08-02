let options = {
    move: {
      scrollbars: {
        horizontal: true,
        vertical: true,
      },
      drag: true,
    },
    zoom:
    {controls: true,
     startScale: 1.0,
     maxScale: 1.4,
     minScale: 0.6,
     scaleSpeed: 1.2,
     pinch: true},
    toolbox: document.getElementById('toolbox'),
    trashcan: true,
};

// Injection (Adding a Blockly workspace)
const workspace = Blockly.inject('blocklyDiv',options);