import React, { useState } from 'react';
import "./styles.css";
import CKEditor from 'ckeditor4-react';
import DrawerMenu from "../../components/DrawerMenu";

function Post(props) {
    const [data, setData] = useState("");
    const [value, setValue] = useState("")
    const handleChange = (e) => {
        setData(e.editor.getData())
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