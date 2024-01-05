import { createElement, useEffect, useRef, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
import "../ui/PDFTronImageEdit.css";

const PDFTronWebViewer = ({getInstance, uri} : any) : any => {
    const viewer = useRef<any>(null);
    const [instance, setInstance] = useState<any>();
    const fileUri = uri;

    const loadWebViewer = async() => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      WebViewer({
        path: '../resources/webviewer/10.6.0/', // point to where the files you copied are served from
        fullAPI: true,
      }, viewer.current).then((instance) => {
        // Call APIs here
        getInstance(instance);
        setInstance(instance);
      })
    };

    useEffect(() => {
      loadWebViewer();
    }, []);

    useEffect(() => {
      if(instance && fileUri !== "") {
        console.trace("Loading document " + fileUri);
        instance.UI.loadDocument(fileUri);
      }
    }, [fileUri, instance])

    return (<div className='pdfEditDiv verticalEditor' id='pdftron-webviewer' ref={viewer}></div>);
};

export default PDFTronWebViewer;