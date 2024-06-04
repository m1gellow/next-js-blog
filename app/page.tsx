import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export const revalidate = 30;

async function getData() {
  const query = `
  *[_type == 'blog'] |  order(_createdAt desc){
    title,
        smallDesctiption,
      "currentSlug": slug.current,
      titleImage
    
    }
  `;

  try {
    const data = await client.fetch(query);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  return (
    <div className="grid grid-cols-1  md:grid-cols-2 mt-5 gap-5">
      {data.map((post, idx) => (
        <Card key={idx}>
          <Image
            src={urlFor(post.titleImage).url()}
            alt="image"
            width={500}
            height={500}
            className="rounded-t-lg h-[250px] object-cover"
          />
          <CardContent className="mt-5">
              <h3 className="text-xl line-clamp-2 font-bold ">{post.title}</h3>
              <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">{post.smallDesctiption}</p>
              <Button asChild className="w-full mt-5">
                <Link href={`/blog/${post.currentSlug}`}>Read more</Link>
              </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
