function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";

import StyleInjector, { lightboxStyles } from "./styles";

import Header from "./Header";
import Image from "./Image";

var Lightbox = function (_Component) {
  _inherits(Lightbox, _Component);

  function Lightbox() {
    var _temp, _this, _ret;

    _classCallCheck(this, Lightbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      move: { x: 0, y: 0 },
      moveStart: undefined,
      zoomed: false,
      rotationDeg: 0
    }, _this.handleKeyDown = function (event) {
      // ESC or ENTER closes the modal
      if (event.keyCode === 27 || event.keyCode === 13) {
        _this.props.onClose();
      }
    }, _this.getCoordinatesIfOverImg = function (event) {
      var point = event.changedTouches ? event.changedTouches[0] : event;

      if (point.target.id !== "react-modal-image-img") {
        // the img was not a target of the coordinates
        return;
      }

      var dim = _this.contentEl.getBoundingClientRect();
      var x = point.clientX - dim.left;
      var y = point.clientY - dim.top;

      return { x: x, y: y };
    }, _this.handleMouseDownOrTouchStart = function (event) {
      event.preventDefault();

      if (event.touches && event.touches.length > 1) {
        // more than one finger, ignored
        return;
      }

      var coords = _this.getCoordinatesIfOverImg(event);

      if (!coords) {
        // click outside the img => close modal
        _this.props.onClose();
      }

      if (!_this.state.zoomed) {
        // do not allow drag'n'drop if zoom has not been applied
        return;
      }

      _this.setState(function (prev) {
        return {
          moveStart: {
            x: coords.x - prev.move.x,
            y: coords.y - prev.move.y
          }
        };
      });
    }, _this.handleMouseMoveOrTouchMove = function (event) {
      event.preventDefault();

      if (!_this.state.zoomed || !_this.state.moveStart) {
        // do not allow drag'n'drop if zoom has not been applied
        // or if there has not been a click
        return;
      }

      if (event.touches && event.touches.length > 1) {
        // more than one finger, ignored
        return;
      }

      var coords = _this.getCoordinatesIfOverImg(event);

      if (!coords) {
        return;
      }

      _this.setState(function (prev) {
        return {
          move: {
            x: coords.x - prev.moveStart.x,
            y: coords.y - prev.moveStart.y
          }
        };
      });
    }, _this.handleMouseUpOrTouchEnd = function (event) {
      _this.setState({
        moveStart: undefined
      });
    }, _this.toggleZoom = function (event) {
      event.preventDefault();
      _this.setState(function (prev) {
        return {
          zoomed: !prev.zoomed,
          // reset position if zoomed out
          move: prev.zoomed ? { x: 0, y: 0 } : prev.move
        };
      });
    }, _this.toggleRotate = function (event) {
      event.preventDefault();

      var rotationDeg = _this.state.rotationDeg;


      if (rotationDeg === 360) {
        _this.setState({ rotationDeg: 90 });
        return;
      }

      _this.setState(function (prevState) {
        return {
          rotationDeg: prevState.rotationDeg += 90
        };
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Lightbox.prototype.componentDidMount = function componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
  };

  Lightbox.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  };

  Lightbox.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        medium = _props.medium,
        large = _props.large,
        alt = _props.alt,
        onClose = _props.onClose,
        hideDownload = _props.hideDownload,
        hideZoom = _props.hideZoom,
        hideRotate = _props.hideRotate;
    var _state = this.state,
        move = _state.move,
        zoomed = _state.zoomed,
        rotationDeg = _state.rotationDeg;


    return React.createElement(
      "div",
      null,
      React.createElement(StyleInjector, {
        name: "__react_modal_image__lightbox",
        css: lightboxStyles
      }),
      React.createElement(
        "div",
        { className: "__react_modal_image__modal_container" },
        React.createElement(
          "div",
          {
            className: "__react_modal_image__modal_content",
            onMouseDown: this.handleMouseDownOrTouchStart,
            onMouseUp: this.handleMouseUpOrTouchEnd,
            onMouseMove: this.handleMouseMoveOrTouchMove,
            onTouchStart: this.handleMouseDownOrTouchStart,
            onTouchEnd: this.handleMouseUpOrTouchEnd,
            onTouchMove: this.handleMouseMoveOrTouchMove,
            ref: function ref(el) {
              _this2.contentEl = el;
            }
          },
          zoomed && React.createElement(Image, {
            id: "react-modal-image-img",
            className: "__react_modal_image__large_img",
            src: large || medium,
            style: {
              transform: "translate3d(-50%, -50%, 0) rotate(" + (rotationDeg + "deg") + ") translate3d(" + move.x + "px, " + move.y + "px, 0)",
              WebkitTransform: "translate3d(-50%, -50%, 0) rotate(" + (rotationDeg + "deg") + ") translate3d(" + move.x + "px, " + move.y + "px, 0)",
              MsTransform: "translate3d(-50%, -50%, 0) rotate(" + (rotationDeg + "deg") + ") translate3d(" + move.x + "px, " + move.y + "px, 0)"
            },
            handleDoubleClick: this.toggleZoom
          }),
          !zoomed && React.createElement(Image, {
            id: "react-modal-image-img",
            className: "__react_modal_image__medium_img",
            src: medium || large,
            handleDoubleClick: this.toggleZoom,
            contextMenu: !medium,
            style: { transform: "translate3d(-50%, -50%, 0) rotate(" + (rotationDeg + "deg") + ")",
              WebkitTransform: "translate3d(-50%, -50%, 0) rotate(" + (rotationDeg + "deg") + ")",
              MsTransform: "translate3d(-50%, -50%, 0) rotate(" + (rotationDeg + "deg") + ")" }
          })
        ),
        React.createElement(Header, {
          image: large || medium,
          alt: alt,
          zoomed: zoomed,
          toggleZoom: this.toggleZoom,
          toggleRotate: this.toggleRotate,
          onClose: onClose,
          enableDownload: !hideDownload,
          enableZoom: !hideZoom,
          enableRotate: !hideRotate
        })
      )
    );
  };

  return Lightbox;
}(Component);

export { Lightbox as default };