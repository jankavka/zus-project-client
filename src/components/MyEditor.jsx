import { Editor } from "@tinymce/tinymce-react";
;

const MyEditor = ({ subject, onChange, editorRef }) => {
  return (
    <div>
      <Editor
        apiKey="no-api-key"
        licenseKey="gpl"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        value={subject?.content ? subject?.content : ""}
        init={{
          height: 400,
          menubar: true,
          language: "cs",
          language_url: "/tinymce/langs/cs.js",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help | image table",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }" +
            " table { border-collapse:collapse }" +
            " table th, table td { border:1px solid #324B73; padding:0.4rem 0.6rem }",
        }}
        onEditorChange={onChange}
      ></Editor>
    </div>
  );
};

export default MyEditor;
