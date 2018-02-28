import React from 'react';
import { render } from 'react-dom'; // eslint-disable-line import/no-extraneous-dependencies

import { Hopscotch, Step } from '../';

class App extends React.Component {
    state = {
        activeGuide: false,
    };

    handleActiveGuide = (e) => {
        this.setState({ activeGuide: true });
    };

    render() {
        const { activeGuide } = this.state;

        return (
            <Hopscotch
                id="hello-hopscotch"
                totalSteps={5}
                active={activeGuide}
                i18n={{
                    nextBtn: 'Lanjut',
                    prevBtn: 'Kembali',
                    doneBtn: 'Saya Mengerti',
                    closeTooltip: 'Tutup'
                }}
                showPrevButton
                showClosebutton
                scrollTopMargin={100}
                onEnd={console.log}
                generalStepConfig={{
                    placement: 'top'
                }}
            >
                <div>
                    <Step
                        index={0}
                        title="My Header"
                        content="This is the header of my page."
                    >
                        <h1 id="header">My First </h1>
                    </Step>
                    <Step
                        index={1}
                        title="My content"
                        content="Here is where I put my content."
                    >
                        <div id="content">
                            <p>Content goes here...</p>
                        </div>
                    </Step>
                    <Step
                        index={4}
                        title="My content 4"
                        content="Here is where I put my content."
                        placement="bottom"
                    >
                        <div id="content">
                            <p>Content goes here...</p>
                        </div>
                    </Step>
                    <Step
                        index={3}
                        title="My content 3"
                        content="Here is where I put my content."
                        placement="bottom"
                    >
                        <div id="content">
                            <p>Content goes here...</p>
                        </div>
                    </Step>

                    <button type="button" onClick={this.handleActiveGuide}>
                        Start tour
                    </button>
                </div>
            </Hopscotch>
        );
    }
}

render(<App />, document.getElementById('root'));
