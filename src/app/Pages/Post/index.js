import React, { useState } from "react";
import "./styles.css";
import CKEditor from "ckeditor4-react";
import DrawerMenu from "../../components/DrawerMenu";
import axios from "axios";
import { serverURL } from "../../../config/index";
import { Input } from "@material-ui/core";
function Post(props) {
  const [data, setData] = useState("");
  const [value, setValue] = useState("");
  const [file, setFile] = useState([]);
  const [title, setTitle] = useState("");
  const [src, setSrc] = useState("");
  const handleChange = (e) => {
    setData(e.editor.getData());
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
    let imageSrc = URL.createObjectURL(e.target.files[0]);
    setSrc(imageSrc);
  };

  function createMarkup() {
    return { __html: value };
  }
  const submit = async () => {
    console.log("file", file);
    const formData = new FormData();
    formData.append("description", data);
    formData.append("picture", file);
    formData.append("title", title);
    await axios({
      method: "post",
      url: `${serverURL}/post-blog`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setValue(data);
  };

  return (
    <DrawerMenu>
      <div className="main">
        <h2>Post</h2>
        {src && <img src={src} width={200} height={200} />}
        <input type="file" name="file" onChange={(e) => handleFile(e)} />
        <h4>Enter blog title</h4>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog title"
        />
        <CKEditor data={data} onChange={(e) => handleChange(e)} />

        <button onClick={submit}>Submit</button>
        <div
          className="blog-content"
          dangerouslySetInnerHTML={createMarkup()}
        />
      </div>
    </DrawerMenu>
  );
}

export default Post;
