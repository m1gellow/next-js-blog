import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React from "react";


export const revalidate = 30;

async function getData(slug: string) {
  const query = `
    *[_type == "blog" &&  slug.current == '${slug}']{
        "currentSlug": slug.current,
            title,
            content,
          titleImage,
      }[0]
    `;
  try {
    const data = await client.fetch(query);
    return data;
  } catch (err) {
    console.log(err);
  }
}

const BlogArticles = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const data: fullBlog = await getData(slug);
  console.log(data)
  return (
    <div className="mt-8">
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          M1Gellow - Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>

      <Image
        src={urlFor(data.titleImage).url()}
        alt="image"
        width={800}
        height={800}
        priority
        className="rounded-lg mt-8 border"
      />

      <div className="mt-16 prose prose-blue  prose-lg dark:prose-invert prose-li:marker:text-primary prose-headings:underline prose-a:text-primary">
            <PortableText value={data.content}/>
      </div>
    </div>
  );
};

export default BlogArticles;
