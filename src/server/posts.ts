import path from 'path'
import fs from 'fs'
import highlightjs from 'highlight.js'
import { marked } from 'marked'
import { Post, today, thisWeek, thisMonth } from '../data/posts'

export async function readPosts() {
  const load = (filename: string) =>
    fs.readFileSync(path.join(__dirname, "content", filename), "utf-8");

  const toHtml = (markdown: string) =>
    new Promise<string>((resolve) => {
      marked.parse(
        markdown,
        {
          gfm: true,
          breaks: true,
          highlight: (code) => {
            return highlightjs.highlightAuto(code).value;
          },
        },
        (err, parseResult) => {
          resolve(parseResult);
        }
      );
    });

  const pipelineMd = load("pipeline.md");

  const pipeline: Post = {
    ...today,
    id: "10",
    title: "A Futuristic Functional Language for Web Dev - ESNext Pipelines",
    markdown: pipelineMd,
    html: await toHtml(pipelineMd),
    img: 'https://www.bram.us/wordpress/wp-content/uploads/2019/10/esnext-proposals-to-look-forward-to-fseu19-poster.png'
  };

  const sourceMapsMd = load("source-maps.md");

  const sourceMaps: Post = {
    ...today,
    id: "11",
    title: "Decoding Variable Length Quantity for Source Maps",
    markdown: sourceMapsMd,
    html: await toHtml(sourceMapsMd),
    img: 'https://web-dev.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/luYuSy7CYuB3ZdcCgM6A.png?auto=format&w=1600'
  };

  const reactivityMd = load("reactivity.md");

  const reactivity: Post = {
    ...thisWeek,
    id: "12",
    title: "Building Vue 3 Reactivity from Scratch",
    markdown: reactivityMd,
    html: await toHtml(reactivityMd),
    img: 'https://tallpad.com/storage/QGa4RQifDVwyOmlWzmfOoHVuALIJlSUH4r8SrDQV.jpg'
  };

  const typesafeMd = load("typesafe.md");

  const typesafe: Post = {
    ...thisWeek,
    id: "13",
    title: "Writing A Type Safe Store",
    markdown: typesafeMd,
    html: await toHtml(typesafeMd),
    img: 'https://madewithnetworkfra.fra1.digitaloceanspaces.com/spatie-space-production/27735/pinia-2.jpg'
  };

  const introMd = load("intro.md");

  const intro: Post = {
    ...today,
    id: "14",
    title: "Blog Introduction 🎉",
    markdown: introMd,
    html: await toHtml(introMd),
    img: 'https://crisp.chat/static/blog/content/images/size/w2000/2022/05/How-to-Migrate-a-large-project-from-Vue-2-to-Vue-3.jpg'
  };

  return [intro, typesafe, reactivity, sourceMaps, pipeline]
}
