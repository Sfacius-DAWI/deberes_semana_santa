import path from 'path';

export default {
  // Punto de entrada de tu app
  entry: './view/src/index.js',

  // Dónde va a salir tu bundle final
  output: {
    filename: 'bundle.js',
    path: path.resolve(process.cwd(), './view/dist'),
    publicPath: '', // rutas relativas
  },

  module: {
    rules: [
      {
        // 1. Procesa CSS
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // 2. Procesa JS y JSX con Babel
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',    // convierte ES2025+ a ES5 según browserslist
              '@babel/preset-react',  // convierte JSX a JS
            ],
          },
        },
      },
      {
        // 3. Asset Modules para imágenes
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },

  // Para que puedas omitir extensiones al importar
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
      modules: ['src', 'node_modules'],
  },

  mode: 'development',
};
