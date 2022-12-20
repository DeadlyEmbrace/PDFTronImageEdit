import { createElement } from "react";
import "../ui/PDFTronImageEdit.css";

const Header = ({ editImage, saveImage } : any) => {
  return (
    <div className="header flex-container-column">
      <button className="btn mx-button mx-name-actionButton1 btn-default" onClick={editImage}>Edit Page</button>
      <button className="btn mx-button mx-name-actionButton1 btn-default bottom-button" onClick={saveImage}>Save Page</button>
    </div>
  );
};

export default Header;