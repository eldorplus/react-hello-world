import React from 'react';
import T from 'i18n-react';
import t from 'tcomb-form';
import axios from 'axios';
import cookie from 'react-cookie';
import Button from './components/Button';

const URLFormSchema = t.struct({
  url: t.String,
});

const urlFormOpts = {
  fields: {
    url: {
      label: T.translate('url'),
    },
  }
};

class Example5 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: null,
      error: null,
    };
    this.onURLSubmit = this.onURLSubmit.bind(this);
    this.onURLFormChange = this.onURLFormChange.bind(this);
  }

  onURLSubmit(evt) {
    evt.preventDefault();
    urlFormOpts.hasError = false;
    urlFormOpts.error = null;
    this.setState({error: null});
    const data = this.urlForm.getValue();
    const valid = this.urlForm.validate().isValid();
    if (data && valid) {
      axios.post('/1.1/urls', data)
        .then((res) => {
          if (res.status === 200 && res.data.success) {
            this.setState({url: res.data.url, error: null});
          } else {
            this.setState({url: null, error: res.data.message});
            urlFormOpts.hasError = true;
            urlFormOpts.error = res.data.message;
          }
        })
        .catch((err) => {
          this.setState({url: null, error: err.message});
          urlFormOpts.hasError = true;
          urlFormOpts.error = err.message;
        });
    } else {
      urlFormOpts.hasError = true;
      urlFormOpts.error = this.urlForm.validate().firstError().message;
      this.setState({url: null, error: this.urlForm.validate().firstError().message})
    }
  }

  onURLFormChange(value) {
    this.setState({ urlForm: value });
  }

  render() {
    return (
      <div>
        <h2><T.text text={{ key: "example.Example {number}", number: 5 }}/> - <small><T.text text={{ key: "example.Shorten a URL" }}/></small></h2>
        <div>
          <form onSubmit={this.onURLSubmit}>
            <t.form.Form
              ref={(c) => { this.urlForm = c; }}
              type={URLFormSchema}
              options={urlFormOpts}
              value={this.state.urlForm}
              onChange={this.onURLFormChange}
            />
            <div className="form-group">
              <button type="submit" className="btn btn-primary">{T.translate('auth.Shorten URL')}</button>
            </div>
          </form>
          {this.state.url ? <a href={this.state.url}>{this.state.url}</a> : null}
        </div>
      </div>
    );
  }
}

export default Example5;
