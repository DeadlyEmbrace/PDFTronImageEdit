import { createElement, useEffect, useRef } from "react";
import TUIImageEditor from "tui-image-editor";
import "../ui/PDFTronImageEdit.css";

const ImageEditor = ({getInstance} : any) : any => {
  const imageEditor = useRef<any>(null);

  // default keys and styles
  const customTheme = {
    "common.bi.image":
      "https://www.pdftron.com/brand-assets/pdftron-logo-blue.png",
    "common.bisize.width": "251px",
    "common.bisize.height": "50px",
    "common.backgroundImage": "none",
    "common.backgroundColor": "#fff",
    "common.border": "0px",

    // header
    "header.backgroundImage": "none",
    "header.backgroundColor": "transparent",
    "header.border": "0px",

    // load button
    "loadButton.backgroundColor": "#fff",
    "loadButton.border": "1px solid #ddd",
    "loadButton.color": "#222",
    "loadButton.fontFamily": "NotoSans, sans-serif",
    "loadButton.fontSize": "12px",

    // download button
    "downloadButton.backgroundColor": "#fff",
    "downloadButton.border": "1px solid #fdba3b",
    "downloadButton.color": "black",
    "downloadButton.fontFamily": "NotoSans, sans-serif",
    "downloadButton.fontSize": "12px",

    // main icons
    "menu.normalIcon.path": "./dist/svg/icon-d.svg",
    "menu.normalIcon.name": "icon-d",
    "menu.activeIcon.path": "./dist/svg/icon-b.svg",
    "menu.activeIcon.name": "icon-b",
    "menu.disabledIcon.path": "./dist/svg/icon-a.svg",
    "menu.disabledIcon.name": "icon-a",
    "menu.hoverIcon.path": "./dist/svg/icon-c.svg",
    "menu.hoverIcon.name": "icon-c",
    "menu.iconSize.width": "24px",
    "menu.iconSize.height": "24px",

    // submenu primary color
    "submenu.backgroundColor": "#e9e9e9",
    "submenu.partition.color": "black",

    // submenu icons
    "submenu.normalIcon.path": "./dist/svg/icon-a.svg",
    "submenu.normalIcon.name": "icon-a",
    "submenu.activeIcon.path": "./dist/svg/icon-c.svg",
    "submenu.activeIcon.name": "icon-c",
    "submenu.iconSize.width": "32px",
    "submenu.iconSize.height": "32px",

    // submenu labels
    "submenu.normalLabel.color": "#858585",
    "submenu.normalLabel.fontWeight": "lighter",
    "submenu.activeLabel.color": "black",
    "submenu.activeLabel.fontWeight": "lighter",

    // checkbox style
    "checkbox.border": "1px solid #ccc",
    "checkbox.backgroundColor": "#fff",

    // rango style
    "range.pointer.color": "black",
    "range.bar.color": "#666",
    "range.subbar.color": "#d1d1d1",

    "range.disabledPointer.color": "#414141",
    "range.disabledBar.color": "#282828",
    "range.disabledSubbar.color": "#414141",

    "range.value.color": "black",
    "range.value.fontWeight": "lighter",
    "range.value.fontSize": "11px",
    "range.value.border": "1px solid #353535",
    "range.value.backgroundColor": "#fff",
    "range.title.color": "black",
    "range.title.fontWeight": "lighter",

    // colorpicker style
    "colorpicker.button.border": "1px solid #1e1e1e",
    "colorpicker.title.color": "black"
  };

  useEffect(() => {
    var instance = new TUIImageEditor(imageEditor.current, {
      includeUI: {
        loadImage: {
          path: "blank.png",
          name: "SampleImage"
        },
        menu: ['crop', 'flip', 'rotate', 'filter'],
        theme: customTheme,
        initMenu: "filter",
        menuBarPosition: "right"
      },
      cssMaxWidth: 700,
      cssMaxHeight: 1200,
      selectionStyle: {
        cornerSize: 20,
        rotatingPointOffset: 70
      },
      usageStatistics: false,
    });

    getInstance(instance);
  }, []);

  return <div className="imageEditor verticalEditor" id="tui-image-editor" ref={imageEditor}></div>;
};

export default ImageEditor;