import * as prettier from 'prettier';
import * as parserBabel from 'prettier/parser-babel';

export const debounce = (func, delay) => {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => func.apply(this, args), delay);
  };
};

export const formatCodeJS = (code) =>
  prettier.format(code, {
    parser: 'babel',
    plugins: [parserBabel],
  });
