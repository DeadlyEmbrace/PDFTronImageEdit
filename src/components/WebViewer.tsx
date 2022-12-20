import { createElement, useEffect, useRef, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
import "../ui/PDFTronImageEdit.css";

const PDFTronWebViewer = ({getInstance, uri} : any) : any => {
    const viewer = useRef<any>(null);
    const [instance, setInstance] = useState<any>();
    const fileUri = uri;

    useEffect(() => {
        WebViewer({
            path: '/webviewer', // point to where the files you copied are served from
            fullAPI: true,
          }, viewer.current).then((instance) => {
            // Call APIs here
            getInstance(instance);
            setInstance(instance);
          })
    }, []);

    useEffect(() => {
      if(instance) {
        instance.UI.loadDocument(fileUri);
      }
    }, [fileUri, instance])

    return (<div className='pdfDiv verticalEditor' id='pdftron-webviewer' ref={viewer}></div>);
};

export default PDFTronWebViewer;