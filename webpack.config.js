const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/script.ts', // Arquivo TypeScript de entrada
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'script.js', // Nome do arquivo de saída
    path: path.resolve(__dirname, 'src') // Diretório de saída como "src"
  }
};

