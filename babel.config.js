module.exports = {
    presets: [
      ['@babel/preset-env', {
        targets: {
          node: '14' // Asegura que Babel transpile a una versión compatible con Node.js v14
        }
      }]
    ]
  };
  