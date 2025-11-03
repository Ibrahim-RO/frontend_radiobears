import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getNewsById } from "../api";

interface News {
    id: number;
    title: string;
    content: string;
    image?: string;
    createdAt: string;
}

export const NewsDetailView = () => {
    const { id } = useParams<{ id: string }>();
    const [news, setNews] = useState<News | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        getNewsById(Number(id))
            .then((data) => {
                setNews(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) return <p className="text-center py-20 text-gray-500">Cargando...</p>;
    if (!news) return <p className="text-center py-20 text-gray-500">Noticia no encontrada</p>;

    return (
        <motion.section
            className="bg-white/15 text-gray-900 min-h-screen max-w-7xl mt-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="mx-auto px-6 md:px-10 lg:px-20 py-10">
                {/* Botón volver */}
                <Link
                    to="/"
                    className="text-yellow-300 hover:text-yellow-400 font-medium text-sm mb-6 inline-block"
                >
                    ← Volver a las noticias
                </Link>

                {/* Título */}
                <h1 className="text-5xl font-extrabold leading-tight mb-4 tracking-tight text-yellow-500 text-center">
                    {news.title}
                </h1>

                {/* Imagen principal */}
                {news.image && (
                    <div className="mb-10">
                        <img
                            src={news.image}
                            alt={news.title}
                            className="w-full h-[480px] object-cover rounded-2xl shadow-sm"
                        />
                    </div>
                )}

                {/* Subtítulo / autor */}
                <div className="flex items-center gap-4 text-white mb-10">
                    <img
                        src="https://api.dicebear.com/8.x/thumbs/svg?seed=RadioBears"
                        alt="Autor"
                        className="w-10 h-10 rounded-full border border-gray-300"
                    />
                    <div>
                        <p className="font-medium text-yellow-300">Radio Bears</p>
                        <p className="text-sm">
                            {new Date(news.createdAt).toLocaleDateString("es-MX", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}{" "}
                            · Lectura de 3 min
                        </p>
                    </div>
                </div>

                {/* Contenido */}
                <article
                    className="prose prose-lg max-w-none text-white leading-relaxed prose-headings:text-gray-900 prose-a:text-emerald-700 hover:prose-a:text-emerald-900 prose-img:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: news.content }}
                />

                {/* Línea divisoria */}
                <hr className="my-16 border-gray-100" />

                {/* Footer tipo Medium */}
                <div className="flex items-center justify-between text-white text-sm">
                    <p>© {new Date().getFullYear()} Radio Bears</p>
                    <Link to="/" className="hover:text-emerald-700 transition-colors">
                        Más artículos →
                    </Link>
                </div>
            </div>
        </motion.section>
    );
};
