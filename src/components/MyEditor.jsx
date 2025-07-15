import { Editor } from "@tinymce/tinymce-react";

const MyEditor = ({ subject, onChange, editorRef }) => {


  return (
    <div>
      <Editor
        //apiKey="rcmrt6sw2f0nceh681w44zyk5imlqqsnmi54yv1tmb4kx2yw"
        apiKey="no-api-key"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        //initialValue={subject.content ? subject.content : ""}
        value={subject.content ? subject.content : ""}
        init={{
          height: 400,
          menubar: true,
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
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onEditorChange={onChange}
      ></Editor>
    </div>
  );
};

export default MyEditor;
