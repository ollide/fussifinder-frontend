import React from 'react';

import './ZipForm.scss';

class ZipForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zip: '',
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
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="field has-addons">
                    <div className="control">
                        <input className="input"
                            type="number"
                            placeholder="Postleizahl"
                            value={this.state.zip}
                            onChange={this.handleZipChange}
                        />
                    </div>
                    <div className="control">
                        <button className="button zip-btn">OK</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default ZipForm;
