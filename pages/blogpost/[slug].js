import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Blogpost.module.css";
import * as fs from 'fs';
const Slug = (props) => {
  function createMarkup(c) {
    return { __html: c };
}
  const [blog, setblog] = useState(props.myBlog);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>{blog && blog.title}</h1>
        <hr />
        {blog && <div dangerouslySetInnerHTML={createMarkup(blog.content)}></div>}
      </main>
    </div>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      {params:{slug: 'howtolearnjavascript'}},
      {params:{slug: 'howtolearnnextjs'}},
      {params:{slug: 'howtolearnreact'}},
    ],
    fallback: true, 
  }
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  let myBlog= await fs.promises.readFile(`blogdata/${slug}.json`,'utf-8');
  return {
    props: { myBlog: JSON.parse(myBlog) },
  };
}
export default Slug;
