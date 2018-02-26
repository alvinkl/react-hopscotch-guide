import React, { Component } from 'react';

import T from 'prop-types';

class Step extends Component {
    static contextTypes = {
        hopscotch: T.object,
        updateTour: T.func,
    };

    static propTypes = {
        index: T.number.isRequired,
        placement: T.oneOf(['top', 'bottom', 'right', 'left']).isRequired,

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
            onPrev,
            onNext,
            onShow,
            onCTA,
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

            onPrev,
            onNext,
            onShow,
            onCTA,
        };

        this.context.updateTour(tour);
    }

    render() {
        console.log(this.context);
        console.log('node', this.node);

        const childrenWithProps = React.cloneElement(this.props.children, {
            ref: (node) => {
                this.node = node;
            },
        });

        return childrenWithProps;
    }
}

export default Step;
