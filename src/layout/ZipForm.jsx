import React from 'react';

import './ZipForm.css';

class ZipForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zip: props.zip || '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleZipChange = this.handleZipChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const { zip } = this.state;
        if (zip && zip.length >= 3 && zip.length <= 5) {
            this.props.onZipSubmit(zip);
        }
    }

    handleZipChange(event) {
        this.setState({ zip: event.target.value });
    }

    render() {
        const { id, label, placeholder = 'Postleitzahl' } = this.props;
        return (
            <form className="zip-form" onSubmit={this.handleSubmit}>
                {label && <label className="section-label" htmlFor={id}>{label}</label>}
                <div className="zip-field">
                    <input className="zip-input"
                        id={id}
                        type="number"
                        inputMode="numeric"
                        placeholder={placeholder}
                        aria-label={label ? undefined : 'Postleitzahl'}
                        value={this.state.zip}
                        onChange={this.handleZipChange}
                    />
                    <button className="zip-btn">Suchen</button>
                </div>
            </form>
        );
    }
}

export default ZipForm;
