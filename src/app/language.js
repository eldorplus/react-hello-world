import cookie from 'react-cookie';

const language = (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;

// Split locales with a region code
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

let lang, l = languageWithoutRegionCode;
if (location.search) {
  lang = `${location.search.split('l=')[1].split('&')[0]}`;
  cookie.save('l', lang);
} else if (l = cookie.load('l')) {
  lang = l
}

if (!lang) {
  lang = languageWithoutRegionCode;
  if (!lang) {
    lang = 'en';
  }
  cookie.save('l', lang);
}

module.exports = () => {
  return lang;
};
