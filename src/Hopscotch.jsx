import { Component } from 'react';
import T from 'prop-types';

import isEqual from 'lodash.isequal';

import Step from './Step';

import hopscotch from 'hopscotch';
import 'hopscotch/dist/css/hopscotch.css';

import { withoutRequired } from './helper';

const stepsPropsWithoutRequired = withoutRequired(Step.propTypes, [
    'index',
    'placement',
    'children',
]);

class Hopscotch extends Component {
    static propTypes = {
        id: T.string.isRequired,

        bubbleWidth: T.number,
        bubblePadding: T.number,

        smoothScroll: T.bool,
        scrollDuration: T.number,
        scrollTopMargin: T.number,

        showCloseButton: T.bool,
        showPrevButton: T.bool,
        showNextButton: T.bool,

        arrowWidth: T.number,

        skipIfNoElement: T.bool,
        nextOnTargetClick: T.bool,

        onNext: T.func,
        onPrev: T.func,
        onStart: T.func,
        onEnd: T.func,
        onClose: T.func,
        onError: T.func,

        i18n: T.shape({
            nextBtn: T.string,
            prevBtn: T.string,
            doneBtn: T.string,
            skipBtn: T.string,
            closeTooltip: T.string,
            stepNums: T.array,
        }),

        generalStepConfig: T.shape(stepsPropsWithoutRequired),

        active: T.bool,

        children: T.node.isRequired,
    }

    static defaultProps = {
        bubbleWidth: 280,
        bubblePadding: 15,

        smoothScroll: true,
        scrollDuration: 1000,
        scrollTopMargin: 200,

        showCloseButton: true,
        showPrevButton: false,
        showNextButton: true,

        arrowWidth: 20,

        skipIfNoElement: true,
        nextOnTargetClick: false,

        onNext: () => {},
        onPrev: () => {},
        onStart: () => {},
        onEnd: () => {},
        onClose: () => {},
        onError: () => {},

        i18n: {
            nextBtn: '',
            prevBtn: '',
            doneBtn: '',
            skipBtn: '',
            closeTooltip: '',
            stepNums: [],
        },

        generalStepConfig: Step.defaultProps,

        active: T.bool,
    }

    static childContextTypes = {
        hopscotch: T.object,
        updateTour: T.func,
    }

    constructor(props) {
        super(props);

        this.hopscotch = hopscotch;
    }

    state = {
        tour: [],
    }

    getChildContext() {
        return { hopscotch: this.hopscotch, updateTour: this.updateTour };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.active) this.startTour();
    }

    setupTour = () => {
        // const {} = this.props.config;
    }

    startTour = () => {
        this.hopscotch.startTour(this.buildTour());
    }

    buildTour = () => {
        const { tour } = this.state;
        const {
            id,
            generalStepConfig,
            bubbleWidth,
            bubblePadding,

            smoothScroll,
            scrollDuration,
            scrollTopMargin,

            showCloseButton,
            showPrevButton,
            showNextButton,

            arrowWidth,

            skipIfNoElement,
            nextOnTargetClick,

            onNext,
            onPrev,
            onStart,
            onEnd,
            onClose,
            onError,

            i18n
        } = this.props;

        let steps = [];

        if (!isEqual(generalStepConfig, Step.defaultProps)) {
            steps = tour.map(t => ({ ...generalStepConfig, ...t }));
        } else {
            steps = tour;
        }

        steps = steps.filter(s => s);

        return {
            id,

            bubbleWidth,
            bubblePadding,

            smoothScroll,
            scrollDuration,
            scrollTopMargin,

            showCloseButton,
            showPrevButton,
            showNextButton,

            arrowWidth,

            skipIfNoElement,
            nextOnTargetClick,

            onNext,
            onPrev,
            onStart,
            onEnd,
            onClose,
            onError,

            i18n,

            steps
        };
    }

    updateTour = (index, newTour = {}) => {
        this.setState((prevState) => {
            const { tour } = prevState;

            tour[index] = newTour;

            return { tour };
        });
    }

    clearhole = () => {
        document.querySelector('.hole').classList.remove('hole');
    }

    render() {
        return this.props.children;
    }
}

export default Hopscotch;
