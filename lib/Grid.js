'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Grid = function (_Component) {
  _inherits(Grid, _Component);

  function Grid(props) {
    _classCallCheck(this, Grid);

    var _this = _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this, props));

    _this.state = {
      offset: 0
    };
    _this.shouldCall = true;

    _this.loadMore = _this.loadMore.bind(_this);
    _this.renderGrid = _this.renderGrid.bind(_this);
    _this.handleScroll = _this.handleScroll.bind(_this);
    return _this;
  }

  _createClass(Grid, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadMore();
      window.addEventListener("resize", this.renderGrid);
      window.addEventListener("scroll", this.handleScroll);
    }
  }, {
    key: 'renderGrid',
    value: function renderGrid() {
      var _props = this.props,
          _props$gutter = _props.gutter,
          gutter = _props$gutter === undefined ? 0 : _props$gutter,
          _props$fitWidth = _props.fitWidth,
          fitWidth = _props$fitWidth === undefined ? false : _props$fitWidth,
          _props$columnWidth = _props.columnWidth,
          columnWidth = _props$columnWidth === undefined ? 100 : _props$columnWidth;

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

      var gridItems = document.getElementsByClassName('grid-item');
      var rowLen = Math.floor(window.innerWidth / columnWidth);

      var gridOffsetLeft = 0;
      if (fitWidth) {
        gridOffsetLeft = (window.innerWidth - rowLen * columnWidth) / 2;
      }

      for (var i = 0, col = 0; i < gridItems.length; i++, col++) {
        var topIndex = i - rowLen;
        var topOffset = 0;
        if (topIndex >= 0) {
          var topRect = gridItems[topIndex].getBoundingClientRect();
          topOffset = +gridItems[topIndex].style.top.slice(0, -2) + topRect.height + gutter;
        }

        if ((col + 1) * columnWidth > window.innerWidth) {
          col = 0;
        }

        var leftOffset = col * columnWidth + gridOffsetLeft;
        gridItems[i].style.width = columnWidth + 'px';
        gridItems[i].style.left = leftOffset + 'px';
        gridItems[i].style.top = topOffset + 'px';
      }
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll(e) {
      var windowHeight = window.innerHeight;

      var scrollTop = document.documentElement.scrollTop;

      var scrolled = scrollTop % windowHeight + document.documentElement.scrollHeight;
      if (scrolled > windowHeight - this.props.scrollThreshold && this.shouldCall && this.props.itemsLeft) {
        this.loadMore();
      } else {
        this.shouldCall = true;
      }
    }
  }, {
    key: 'loadMore',
    value: function loadMore() {
      this.props.loadMore(this.state.offset, this.props.limit);
      this.setState({
        offset: this.state.offset + this.props.limit
      });
      setTimeout(this.renderGrid, 100);
      this.shouldCall = false;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: { position: 'relative' } },
        this.props.children
      );
    }
  }]);

  return Grid;
}(_react.Component);

Grid.propTypes = {
  columnWidth: _propTypes2.default.number,
  fitWidth: _propTypes2.default.bool,
  gutter: _propTypes2.default.number,
  itemsLeft: _propTypes2.default.number,
  limit: _propTypes2.default.number,
  scrollThreshold: _propTypes2.default.number,

  loadMore: _propTypes2.default.func.isRequired
};

Grid.defaultProps = {
  columnWidth: 100,
  gutter: 5,
  fitWidth: false,
  itemsLeft: 0,
  limit: 1,
  scrollThreshold: 300
};

exports.default = Grid;