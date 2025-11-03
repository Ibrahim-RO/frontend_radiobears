import { useEffect, useState } from "react";
import { VideoCarousel } from "../components/CarruselVideos";
import { Chat } from "../components/Chat";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAllNews } from "../api";

interface News {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
}

export const IndexView = () => {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    getAllNews()
      .then(setNews)
      .catch((err) => console.error("Error al cargar noticias", err));
  }, []);

  return (
    <>
      {/* 🟦 Hero Section */}
      <section className="hero-image relative min-h-screen">
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        <div className="relative z-10 w-7xl mx-auto mt-15 px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="overflow-hidden">
            <Chat />
          </div>

          <div>
            <VideoCarousel />
          </div>
        </div>
      </section>

      <section className=" py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Últimas Noticias
          </h2>

          {news.length === 0 ? (
            <p className="text-center text-white">No hay noticias disponibles.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-56 object-cover"
                    />
                  )}
                  <div className="p-6 flex flex-col flex-grow text-white">
                    <h3 className="text-xl font-semibold mb-2">
                      {item.title}
                    </h3>
                    <div
                      className="text-sm line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                    <p className="mt-4 text-xs ">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                    <Link
                      to={`/news/${item.id}`}
                      className="mt-4 text-yellow-300 font-medium hover:text-yellow-400 transition self-start"
                    >
                      Ver más →
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
