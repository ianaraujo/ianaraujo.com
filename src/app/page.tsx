import fs from "fs";
import path from "path";
import matter from "gray-matter";

import Link from "next/link";

import { Header } from "@/components/Header";
import { PostMeta } from "@/types";


const parseDateString = (dateString: string): Date => {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
};

const getPosts = async (): Promise<PostMeta[]> => {
  const postsDirectory = path.join(process.cwd(), "src", "posts");
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");

    const { data } = matter(fileContents);
    const slug = filename.replace(".md", "");

    return { ...data, slug } as PostMeta;
  });

  posts.sort((a, b) => {
    const dateA = parseDateString(a.date).getTime();
    const dateB = parseDateString(b.date).getTime();
    return dateB - dateA; 
  });

  return posts;
};

const Home = async () => {
  const posts = await getPosts();

  return (
    <div className="flex justify-center w-full min-h-screen">
      <div className="mt-10 w-full max-w-screen-md">
        <Header />
        <div className="space-y-12">
          {/* Introducing myself */}
          <div className="">
            <p className="text-xl text-justify leading-relaxed">
              {`👋 Olá! Meu nome é Ian, sou Cientista de Dados e Desenvolvedor, e
              gosto de trabalhar em projetos interessantes e desafiadores envolvendo dados e tecnologia, 
              além de compartilhar ideias sobre alguns dos meus interesses: finanças, investimentos e empreendedorismo!`}
            </p>
          </div>
          {/* Experience */}
          <section className="">
            <h2 className="text-xl font-semibold mb-8">Experiência</h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-zinc-200"></div>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-8 h-8">
                    <div className="w-2 h-2 rounded-full bg-zinc-600 z-10"></div>
                  </div>
                  <div className="ml-2 space-y-1">
                    <h3 className="text-base font-semibold">
                      Analista de Dados
                    </h3>
                    <p className="text-sm text-zinc-600">Ágora Advocacy</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-8 h-8">
                    <div className="w-2 h-2 rounded-full bg-zinc-200 z-10"></div>
                  </div>
                  <div className="ml-2 space-y-1">
                    <h3 className="text-base font-semibold">Pesquisador</h3>
                    <p className="text-sm text-zinc-600">FGV EBAPE</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-8 h-8">
                    <div className="w-2 h-2 rounded-full bg-zinc-200 z-10"></div>
                  </div>
                  <div className="ml-2 space-y-1">
                    <h3 className="text-base font-semibold">Consultor</h3>
                    <p className="text-sm text-zinc-600">
                      Instituo Lima Barreto, Ministéria da Edução, TRE-BA
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Latest Posts */}
          <section>
            <h2 className="text-xl font-semibold mb-8">Últimas publicações</h2>
            <ul className="space-y-5">
              {posts.slice(0, 3).map((post) => (
                <li
                  key={post.slug}
                  className="w-full bg-zinc-50 border rounded px-5 py-3 space-y-1"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="hover:underline text-lg">{post.title}</h3>
                  </Link>
                  <p className="text-zinc-600 text-sm">{post.description}</p>
                </li>
              ))}
            </ul>
            {posts.length > 3 && (
              <div className="mt-6">
                <Link href="/blog">
                  <span className="text-zinc-600 hover:underline">
                    View all posts
                  </span>
                </Link>
              </div>
            )}
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-8">Contact</h2>
            <p className="text-lg text-justify">
              {`Let's work on something together! You can send me an email or drop
              a DM on any social media.`}
            </p>
            <div className="flex items-center mt-6 gap-2">
              <span className="text-lg">🛩️</span>
              <p>ianaraujo15@gmail.com</p>
            </div>
          </section>
        </div>
        <div className="mt-24 mb-12 flex justify-center">
          <span className="">&copy; 2024 Ian Araujo</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
