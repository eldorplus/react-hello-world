import React from 'react';
import T from 'i18n-react';
import t from 'tcomb-form';
import ResponsiveEmbed from 'react-responsive-embed';

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

class Example6 extends React.Component {
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

      this.setState({url: data.url.replace('/watch/?v=', '/embed/').replace('http://', 'https://'), error: null});
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
        <h2><T.text text={{ key: "example.Example {number}", number: 6 }}/> - <small><T.text text={{ key: "example.YouTube Embed" }}/></small></h2>
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
              <button type="submit" className="btn btn-primary">{T.translate('auth.Embed Video')}</button>
            </div>
          </form>
          {this.state.url ? <ResponsiveEmbed src={this.state.url} allowfullscreen /> : null}
        </div>
      </div>
    );
  }
}

export default Example6;
