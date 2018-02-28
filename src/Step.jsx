import React, { Component } from 'react';

import T from 'prop-types';

class Step extends Component {
    static contextTypes = {
        hopscotch: T.object,
        updateTour: T.func,
        updateTaken: T.func,
    };

    static propTypes = {
        index: T.number.isRequired,
        placement: T.oneOf(['top', 'bottom', 'right', 'left']),

        title: T.string,
        content: T.string,
        ctaLabel: T.string,

        width: T.number,
        padding: T.number,
        xOffset: T.number,
        yOffset: T.number,
        arrowOffset: T.number,
        delay: T.number,
        zindex: T.number,

        showNextButton: T.bool,
        showPrevButton: T.bool,
        showCTAButton: T.bool,
        multipage: T.bool,
        showSkip: T.bool,
        fixedElement: T.bool,
        nextOnTargetClick: T.bool,

        onPrev: T.func,
        onNext: T.func,
        onShow: T.func,
        onCTA: T.func,

        children: T.node.isRequired,
    };

    static defaultProps = {
        placement: 'right',

        title: '',
        content: '',
        ctaLabel: '',

        width: 0,
        padding: 10,
        xOffset: 0,
        yOffset: 0,
        arrowOffset: 0,
        delay: 0,
        zindex: 0,

        showNextButton: true,
        showPrevButton: true,
        showCTAButton: false,
        multipage: false,
        showSkip: false,
        fixedElement: false,
        nextOnTargetClick: false,

        onPrev: () => {},
        onNext: () => {},
        onShow: () => {},
        onCTA: () => {},
    };

    constructor(props, context) {
        super(props, context);

        this.node = undefined;
    }

    componentDidMount() {
        const {
            index,
            placement,
            title,
            content,
            ctaLabel,
            width,
            padding,
            xOffset,
            yOffset,
            arrowOffset,
            delay,
            zindex,
            showNextButton,
            showPrevButton,
            showCTAButton,
            multipage,
            showSkip,
            fixedElement,
            nextOnTargetClick,
        } = this.props;

        const target = this.node;

        const tour = {
            index,

            placement,
            target,
            title,
            content,
            ctaLabel,

            width,
            padding,
            xOffset,
            yOffset,
            arrowOffset,
            delay,
            zindex,

            showNextButton,
            showPrevButton,
            showCTAButton,
            multipage,
            showSkip,
            fixedElement,
            nextOnTargetClick,

            onPrev: this.onPrev,
            onNext: this.onNext,
            onShow: this.onShow,
            onCTA: this.onCTA,
        };

        this.context.updateTour(index, tour);
    }

    /* Step functions */
    onPrev = () => {
        this.props.onPrev();
    }

    onNext = () => {
        this.props.onNext();
    }

    onShow = () => {
        this.context.updateTaken(this.props.index);

        this.props.onShow();
    }

    onCTA = () => {
        this.props.onCTA();
    }

    /* End of Step functions */

    render() {
        const childrenWithProps = React.cloneElement(this.props.children, {
            ref: (node) => {
                this.node = node;
            },
        });

        return childrenWithProps;
    }
}

export default Step;
