/**
 * This file was generated from PDFTronImageEdit.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { DynamicValue, FileValue } from "mendix";
import { Big } from "big.js";

export interface PDFTronImageEditContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    file: DynamicValue<FileValue>;
    guid: DynamicValue<Big>;
}

export interface PDFTronImageEditPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    file: string;
    guid: string;
}
