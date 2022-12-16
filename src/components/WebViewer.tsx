import { createElement, useEffect, useRef } from 'react';
import WebViewer from '@pdftron/webviewer';
import "../ui/PDFTronImageEdit.css";

const PDFTronWebViewer = ({getInstance} : any) : any => {
    const viewer = useRef<any>(null);

    useEffect(() => {
        WebViewer({
            path: '/webviewer', // point to where the files you copied are served from
            initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/PDFTRON_about.pdf', // path to your document
            fullAPI: true,
          }, viewer.current).then((instance) => {
            // Call APIs here
            getInstance(instance);
          })
    }, []);

    return (<div className='pdfDiv' id='pdftron-webviewer' ref={viewer}></div>);
};

export default PDFTronWebViewer;