'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GridItem = function GridItem(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    'div',
    { className: 'grid-item', style: { position: 'absolute' } },
    children
  );
};

exports.default = GridItem;