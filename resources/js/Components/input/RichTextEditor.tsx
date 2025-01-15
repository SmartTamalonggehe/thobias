/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */
/* eslint-disable @typescript-eslint/no-unused-expressions */

/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */
import { FC, useEffect, useRef, useState } from "react";
import {
  ClassicEditor,
  Autoformat,
  Bold,
  Italic,
  Underline,
  BlockQuote,
  Base64UploadAdapter,
  CKFinder,
  CKFinderUploadAdapter,
  CloudServices,
  Essentials,
  Heading,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  PictureEditing,
  Indent,
  IndentBlock,
  Link,
  MediaEmbed,
  Mention,
  Paragraph,
  PasteFromOffice,
  Table,
  TableColumnResize,
  TableToolbar,
  TextTransformation,
  List,
  ListUI,
} from "ckeditor5";
import { Controller } from "react-hook-form";

import "ckeditor5/ckeditor5.css";

type Props = {
  control: any;
  required?: boolean;
  name: string;
  setValue: any;
  errors?: any;
  addClass?: any;
  label: string;
  initialValue?: string;
  disabled?: boolean;
  labelCss?: string;
};

const RichTextEditor: FC<Props> = ({
  control,
  required,
  name,
  errors,
  addClass,
  label,
  initialValue,
  setValue,
  labelCss = "text-gray-700",
}) => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const editorRef = useRef<any>();
  const { CKEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
    };
    setEditorLoaded(true);
  }, []);
  useEffect(() => {
    // Set initial value on first render
    setValue(name, initialValue);
  }, [name, initialValue, setValue]);

  const config = {
    plugins: [
      Autoformat,
      BlockQuote,
      Bold,
      CKFinder,
      CKFinderUploadAdapter,
      CloudServices,
      Essentials,
      Heading,
      Image,
      ImageCaption,
      ImageResize,
      ImageStyle,
      ImageToolbar,
      ImageUpload,
      Base64UploadAdapter,
      Indent,
      IndentBlock,
      Italic,
      Link,
      List,
      ListUI,
      MediaEmbed,
      Mention,
      Paragraph,
      PasteFromOffice,
      PictureEditing,
      Table,
      TableColumnResize,
      TableToolbar,
      TextTransformation,
      Underline,
    ],
    toolbar: [
      "undo",
      "redo",
      "|",
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "|",
      "link",
      "uploadImage",
      "insertTable",
      "blockQuote",
      "mediaEmbed",
      "|",
      "bulletedList",
      "numberedList",
      "|",
      "outdent",
      "indent",
    ],
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
      ],
    },
    image: {
      resizeOptions: [
        {
          name: "resizeImage:original",
          label: "Default image width",
          value: null,
        },
        {
          name: "resizeImage:50",
          label: "50% page width",
          value: "50",
        },
        {
          name: "resizeImage:75",
          label: "75% page width",
          value: "75",
        },
      ],
      toolbar: [
        "imageTextAlternative",
        "toggleImageCaption",
        "|",
        "imageStyle:inline",
        "imageStyle:wrapText",
        "imageStyle:breakText",
        "|",
        "resizeImage",
      ],
    },
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
  };
  return (
    <div className={`flex flex-col ${addClass}`}>
      <label className={`text-sm font-medium tracking-wide ${labelCss}`}>
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </label>
      {editorLoaded ? (
        <Controller
          name={name}
          control={control}
          rules={{ required }}
          render={({ field }) => (
            <CKEditor
              editor={ClassicEditor}
              config={config}
              data={initialValue}
              onChange={(event: any, editor: { getData: () => any }) => {
                const data = editor.getData();
                field.onChange(data);
              }}
            />
          )}
        />
      ) : (
        <p>Loading</p>
      )}
      {errors?.type === "required" && (
        <p className="text-red-500 font-inter italic text-sm">
          {label} tidak boleh kosong
        </p>
      )}
    </div>
  );
};

export default RichTextEditor;
