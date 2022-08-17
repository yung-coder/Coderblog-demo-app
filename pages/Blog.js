import React, { useEffect, useState } from "react";
import styles from "../styles/Blog.module.css";
import Link from "next/link";
import * as fs from "fs";
import InfiniteScroll from "react-infinite-scroll-component";
const Blog = (props) => {
  const [blogs, setblogs] = useState(props.allBlogs);
  const [count, setcount] = useState(1);
  const fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    let d = await fetch(`http://localhost:3000/api/blog/?count=${count + 2}`);
    setcount(count + 2);
    let data = await d.json();
    setblogs(data);
  };
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <InfiniteScroll
          dataLength={blogs.length} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={props.allcount !== blogs.length}
          loader={<h4>Loading...</h4>}
          endMessage={<p style={{ textAlign: "center" }}></p>}
        >
          {blogs.map((blogitem) => {
            return (
              <div className={styles.blogitem} key={blogitem.slug}>
                <Link href={`/blogpost/${blogitem.slug}`}>
                  <h2 className={styles.blogitemh3}>{blogitem.title}</h2>
                </Link>
                <p className={styles.blogitemp}>
                  {blogitem.metadesc.substr(0, 140)}...
                </p>
              </div>
            );
          })}
        </InfiniteScroll>
      </main>
    </div>
  );
};

// server side rendering for ranking
export async function getStaticProps(context) {
  let data = await fs.promises.readdir("blogdata");
  let allcount = data.length;
  let myfile;
  let allBlogs = [];
  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    myfile = await fs.promises.readFile("blogdata/" + item, "utf-8");
    allBlogs.push(JSON.parse(myfile));
  }
  return {
    props: { allBlogs, allcount },
  };
}

export default Blog;
