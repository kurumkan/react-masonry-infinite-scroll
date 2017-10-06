import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Grid.css';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0
    };
    this.shouldCall = true;

    this.loadMore = this.loadMore.bind(this);
    this.renderGrid = this.renderGrid.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.loadMore();
    window.addEventListener("resize", this.renderGrid);
    window.addEventListener("scroll", this.handleScroll);
  }

  renderGrid() {
    const { gutter = 0, fitWidth = false, columnWidth = 100 } = this.props;

    // checking the props:
    if (Number(parseFloat(gutter)) !== gutter) {
      throw 'Error: gutter should be a number';
    }
    if (typeof fitWidth !== 'boolean') {
      console.warn('Warning: fitWidth should be a boolean value');
    }
    if (Number(parseFloat(columnWidth)) !== columnWidth) {
      throw 'Error: columnWidth should be a number';
    }

    const gridItems = document.getElementsByClassName('grid-item');
    const rowLen = Math.floor(window.innerWidth / columnWidth);

    let gridOffsetLeft = 0;
    if (fitWidth) {
      gridOffsetLeft = (window.innerWidth - rowLen * columnWidth) / 2;
    }

    for(let i = 0, col = 0; i < gridItems.length; i++, col++) {
      const topIndex = i - rowLen;
      let topOffset = 0;
      if (topIndex >= 0) {
        const topRect = gridItems[topIndex].getBoundingClientRect();
        topOffset = +gridItems[topIndex].style.top.slice(0, -2) + topRect.height + gutter;
      }

      if ((col + 1) * columnWidth  > window.innerWidth) {
        col = 0;
      }

      const leftOffset = col * columnWidth + gridOffsetLeft;
      gridItems[i].style.width = `${columnWidth}px`;
      gridItems[i].style.left = `${leftOffset}px`;
      gridItems[i].style.top = `${topOffset}px`;
    }
  }

  handleScroll(e) {
    const windowHeight = window.innerHeight;

    const scrollTop = document.documentElement.scrollTop;

    const scrolled = scrollTop % windowHeight + document.documentElement.scrollHeight;
    if(scrolled > windowHeight - this.props.scrollThreshold &&
       this.shouldCall &&
       this.props.itemsLeft
    ) {
      this.loadMore();
    } else {
      this.shouldCall = true;
    }
  }

  loadMore() {
    this.props.loadMore(this.state.offset, this.props.limit);
    this.setState({
      offset: this.state.offset + this.props.limit
    });
    setTimeout(this.renderGrid, 100);
    this.shouldCall = false;
  }

  render() {
    return (
      <div className="grid">
        {this.props.children}
      </div>
    );
  }
}

Grid.propTypes = {
  columnWidth: PropTypes.number,
  fitWidth: PropTypes.bool,
  gutter: PropTypes.number,
  itemsLeft: PropTypes.number,
  limit: PropTypes.number,
  scrollThreshold: PropTypes.number,

  loadMore: PropTypes.func.isRequired
};

Grid.defaultProps = {
  columnWidth: 100,
  gutter: 5,
  fitWidth: false,
  itemsLeft: 0,
  limit: 1,
  scrollThreshold: 300
};

export default Grid;
