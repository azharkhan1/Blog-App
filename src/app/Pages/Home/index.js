import React, { useEffect, useState } from "react";
import DrawerMenu from "../../components/DrawerMenu";
import Card from "../../components/Card";
import { serverURL } from "../../../config";
import axios from "axios";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState();
  const getPosts = async () => {
    setLoading(true);
    try {
      let res = await axios.get(`${serverURL}/blogs/0`);
      console.log("res", res);
      setBlogs(res.data.blogs);
    } catch (err) {
      console.log("Some error");
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    console.log("id", id);
    try {
      let res = await axios.delete(`${serverURL}/blog`, {
        data: {
          id,
        },
      });
      console.log("res", res);
      setChange((prev) => !prev);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    getPosts();
  }, [change]);

  if (loading)
    return (
      <DrawerMenu>
        <h2>Loading</h2>
      </DrawerMenu>
    );

  return (
    <DrawerMenu>
      {blogs.map((value) => {
        return (
          <Card
            key={value._id}
            image={`${serverURL}/${value.picture}`}
            title={value.title}
            id={value._id}
            deleteBlog={(id) => deleteBlog(id)}
          />
        );
      })}
    </DrawerMenu>
  );
}
