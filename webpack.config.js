import { resolve } from 'path';

export const entry = './src/index.js';
export const output = {
  filename: 'main.js',
  path: resolve(__dirname, 'dist'),
  clean: true,
};
export const mode = 'development';
export const module = {
  rules: [
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    },
  ],
};