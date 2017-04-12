import React from 'react';
import T from 'i18n-react';
import cookie from 'react-cookie';
import Button from './components/Button';

class Example4 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'languages': {
        "de": "Deutsche",
        "en": "English",
        "es": "Español",
        "fr": "Français",
        "it": "Italiano",
        "nl": "Nederlands",
        "ru": "Русский"
      }
    };

    this.setLanguage = this.setLanguage.bind(this);
  }

  setLanguage(lang) {
    return () => {
      cookie.save('l', lang);
      document.location.reload();
    }
  }

  render() {
    const buttons = [];
    Object.keys(this.state.languages).map((lang) => {
      buttons.push(
        <li><Button onClick={this.setLanguage(lang)} text={`${this.state.languages[lang]}`} /></li>
      );
      return buttons;
    });
    return (
      <div>
        <h2><T.text text={{ key: "example.Select a language" }}/></h2>
        <ul>
          {buttons}
        </ul>
      </div>
    );
  }
}

export default Example4;
