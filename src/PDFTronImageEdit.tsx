import { createElement, useState } from 'react';
import WebViewer from './components/WebViewer';
import ImageEditor from './components/ImageEditor';
import Header from './components/Header';
import "./ui/PDFTronImageEdit.css";
import { PDFTronImageEditContainerProps } from 'typings/PDFTronImageEditProps';
import { ValueStatus } from "mendix";

declare const mx: any;

const App = (props: PDFTronImageEditContainerProps) => {
  const [webviewerInstance, setWebViewerInstance] = useState<any>(null);
  const [imageEditorInstance, setImageEditorInstance] = useState<any>(null);
  const [pageEdit, setPageEdit] = useState(0);

  const fileUri = props.file.status == ValueStatus.Available ? props.file.value.uri : "";
  const fileName = props.file.status == ValueStatus.Available ? props.file.value.name : "";
  const fileGuid = props.guid.status == ValueStatus.Available ? props.guid.value : 0;

  console.info("File URI: " + fileUri);

  const getViewerInstance = (instance : any) => {
    setWebViewerInstance(instance);
  };

  const getImageEditorInstance = (instance : any) => {
    setImageEditorInstance(instance);
  };

  const editImage = async () => {
    const { docViewer, PDFNet } = webviewerInstance;
    await PDFNet.initialize();
    const doc = await docViewer.getDocument().getPDFDoc();
    doc.initSecurityHandler();
    doc.lock();
    const pdfdraw = await PDFNet.PDFDraw.create(92);
    setPageEdit(docViewer.getCurrentPage());
    const itr = await doc.getPageIterator(docViewer.getCurrentPage());
    const currPage = await itr.current();
    const pngBuffer = await pdfdraw.exportStream(currPage, 'PNG');
    let blob = new Blob([pngBuffer], {
      type: 'image/png',
    });
    imageEditorInstance.loadImageFromFile(blob, 'image.png');
  };

  const saveImage = async () => {
    console.trace("Saving page");
    const { docViewer, CoreControls } = webviewerInstance;

    let image = await imageEditorInstance.toDataURL();
    const base64Data = image.replace(/^data:image\/png;base64,/, '');
    const binary_string = window.atob(base64Data);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'image/png' });

    const doc = docViewer.getDocument();

    const secondDoc = await CoreControls.createDocument(blob, {
      loadAsPDF: true,
      extension: "png"
    });
    const pagesToInsert = [1];
    const pageIndexToInsert = pageEdit;

    await doc.insertPages(secondDoc, pagesToInsert, pageIndexToInsert).then(async () => {
      await doc.removePages([pageEdit+1]);
    });
    await saveDoc(doc);
  };

  const saveDoc = async(doc: any) => {
    console.trace("Saving document");
    const { annotManager, PDFNet } = webviewerInstance;
    
    let xfdfString = await annotManager.exportAnnotations();
    let data = await doc.getFileData({xfdfString});
    let pdfDoc = await PDFNet.PDFDoc.createFromBuffer(data);

    const buf = await pdfDoc.saveMemoryBuffer(PDFNet.SDFDoc.SaveOptions.e_linearized);
    const arr = new Uint8Array(buf);
    const blob = new Blob([arr], { type: "application/pdf" });

    mx.data.saveDocument(
      fileGuid,
      fileName,
      {},
      blob,
      () => {
        console.trace("Document saved");
      },
      (e: any) => {
          console.error(e);
      }
    );
  }

  return (
    <div>
      <div className="flex-container">
        <WebViewer getInstance={getViewerInstance} uri={fileUri} />
        <Header editImage={editImage} saveImage={saveImage} />
        <ImageEditor getInstance={getImageEditorInstance} />
      </div>
    </div>
  );
};

export default App;