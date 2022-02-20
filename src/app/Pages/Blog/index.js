import React, { useEffect, useState } from "react";
import DrawerMenu from "../../components/DrawerMenu";
import Card from "../../components/Card";
import { serverURL } from "../../../config";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function BlogPage() {
  const params = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const getBlog = async () => {
    setLoading(true);
    try {
      let res = await axios.get(`${serverURL}/blogById/${params.id}`);
      console.log("res", res);
      setBlogs(res.data.blog);
    } catch (err) {
      console.log("Some error");
    } finally {
      setLoading(false);
    }
  };

  function createMarkup() {
    return { __html: blogs.description };
  }

  useEffect(() => {
    getBlog();
  }, []);

  console.log("params", params, blogs);
  if (loading)
    return (
      <DrawerMenu>
        <h2>Loading</h2>
      </DrawerMenu>
    );
  return (
    <DrawerMenu>
      <div>
        <img src={`${serverURL}/${blogs.picture}`} width={500} height={300} />
        <div
          className="blog-content"
          dangerouslySetInnerHTML={createMarkup()}
        />
      </div>
    </DrawerMenu>
  );
}
