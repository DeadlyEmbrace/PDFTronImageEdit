import { createElement } from "react";
import "../ui/PDFTronImageEdit.css";

const Header = ({ editImage, saveImage } : any) => {
  return (
    <div className="header flex-container-column">
      <button onClick={editImage}>Edit Page</button>
      <button className="bottom-button" onClick={saveImage}>Save Page</button>
    </div>
  );
};

export default Header;