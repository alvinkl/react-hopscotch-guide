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
        totalSteps: T.number.isRequired,

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

        active: T.bool,
    }

    static childContextTypes = {
        hopscotch: T.object,
        updateTour: T.func,
        updateTaken: T.func,
    }

    constructor(props) {
        super(props);

        this.hopscotch = hopscotch;
    }

    state = {
        tour: [],
        taken: [],
    }

    getChildContext() {
        return {
            hopscotch: this.hopscotch,
            updateTour: this.updateTour,
            updateTaken: this.updateTakenGuide
        };
    }

    componentDidMount() {
        const { totalSteps } = this.props;

        const taken = Array(...{ length: totalSteps }).map(() => false);
        this.setState({ taken });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.active) this.startTour();
    }

    setupTour = () => {
        // const {} = this.props.config;
    }

    /* Hopscotch Functions */
    onNext = () => {
        this.props.onNext();
    }

    onPrev = () => {
        this.props.onPrev();
    }

    onStart = () => {
        this.props.onStart(this.hopscotch);
    }

    onEnd = () => {
        const taken = this.state.taken.map(t => !!t);

        this.props.onEnd(this.hopscotch, taken);
    }

    onClose = () => {
        const taken = this.state.taken.map(t => !!t);

        this.props.onClose(this.hopscotch, taken);
    }

    onError = () => {
        this.props.onError(this.hopscotch);
    }
    /* End of Hopscotch Functions */


    startTour = () => {
        console.log('startTour', this.buildTour());
        window.hopscotch = this.hopscotch;
        window.tour = this.buildTour();
        this.hopscotch.startTour(this.buildTour());
    }

    buildTour = () => {
        const { tour } = this.state;
        const {
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


            i18n
        } = this.props;

        let steps = tour;

        steps = this.filterTour(steps);

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

            onNext: this.onNext,
            onPrev: this.onPrev,
            onStart: this.onStart,
            onEnd: this.onEnd,
            onClose: this.onClose,
            onError: this.onError,

            i18n,

            steps
        };
    }

    filterTour = (tour = []) => {
        const { taken } = this.state;

        return taken.reduce((p, c, i) => (!c ? [...p, tour[i]] : p), []);
    }

    updateTour = (index, newTour = {}) => {
        this.setState((prevState) => {
            const { tour } = prevState;

            tour[index] = newTour;

            return { tour };
        });
    }

    updateTakenGuide = (index) => {
        this.setState((prevState) => {
            const { taken } = prevState;
            taken[index] = true;

            this.setState({ taken });
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
