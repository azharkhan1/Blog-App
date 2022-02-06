import React, { useState } from 'react';
import "./styles.css";
import CKEditor from 'ckeditor4-react';
import DrawerMenu from "../../components/DrawerMenu";

function Post(props) {
    const [data, setData] = useState("");
    const [value, setValue] = useState("")
    const [file, setFile] = useState([])
    const [src, setSrc] = useState("");
    const handleChange = (e) => {
        setData(e.editor.getData())
    }
    const handleFile = (e) => {
        setFile(e);
        let imageSrc = URL.createObjectURL(e.target.files[0]);
        setSrc(imageSrc)
    }

    function createMarkup() {
        return { __html: value };
    }
    const submit = () => {
        setValue(data);
    }

    return (
        <DrawerMenu>
            <div className="main">
                <h2>Post</h2>
                {src && <img src={src} width={200} height={200} />}
                <input type="file" name="file" onChange={e => handleFile(e)} />
                <CKEditor
                    data={data}
                    onChange={e => handleChange(e)}
                />

                <button onClick={submit}>Submit</button>
                <div className="blog-content" dangerouslySetInnerHTML={createMarkup()} />
            </div>
        </DrawerMenu>
    );
}

export default Post;