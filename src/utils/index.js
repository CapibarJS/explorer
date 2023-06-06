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

export const toJson = (json) => JSON.stringify(json, null, 2);

export const getCookie = (name) => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
};
