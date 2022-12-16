import { createElement } from "react";

const Header = ({ editImage, saveImage } : any) => {
  return (
    <div className="header">
      <button onClick={editImage}>Edit Image</button>
      <button onClick={saveImage}>Save Image</button>
    </div>
  );
};

export default Header;