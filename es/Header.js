import React from "react";

import { ZoomInIcon, ZoomOutIcon, DownloadIcon, CloseIcon, RotateIcon } from "./icons";

var Header = function Header(_ref) {
  var image = _ref.image,
      alt = _ref.alt,
      zoomed = _ref.zoomed,
      toggleZoom = _ref.toggleZoom,
      toggleRotate = _ref.toggleRotate,
      onClose = _ref.onClose,
      enableDownload = _ref.enableDownload,
      enableZoom = _ref.enableZoom,
      enableRotate = _ref.enableRotate;
  return React.createElement(
    "div",
    { className: "__react_modal_image__header" },
    React.createElement(
      "span",
      { className: "__react_modal_image__icon_menu" },
      enableDownload && React.createElement(
        "a",
        { href: image, download: true },
        React.createElement(DownloadIcon, null)
      ),
      enableZoom && React.createElement(
        "a",
        { onClick: toggleZoom },
        zoomed ? React.createElement(ZoomOutIcon, null) : React.createElement(ZoomInIcon, null)
      ),
      enableRotate && React.createElement(
        "a",
        { onClick: toggleRotate },
        React.createElement(RotateIcon, null)
      ),
      React.createElement(
        "a",
        { onClick: onClose },
        React.createElement(CloseIcon, null)
      )
    ),
    alt && React.createElement(
      "span",
      { className: "__react_modal_image__caption" },
      alt
    )
  );
};

export default Header;