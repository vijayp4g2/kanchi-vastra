import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import Section from '../common/Section';

const instagramPosts = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
        likes: '2.4k'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800&auto=format&fit=crop',
        likes: '3.1k'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1621644827827-04dc309121a9?q=80&w=800&auto=format&fit=crop',
        likes: '1.8k'
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop',
        likes: '2.9k'
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
        likes: '2.2k'
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop',
        likes: '3.5k'
    }
];

const InstagramFeed = () => {
    return (
        <Section className="bg-white">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-3 text-gold-600 uppercase tracking-[0.3em] text-sm font-medium mb-4"
                >
                    <Instagram className="w-5 h-5" />
                    <span>Follow Us</span>
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-serif text-gray-900 mb-6"
                >
                    @kanchivastra
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600 text-lg"
                >
                    Join our community and get inspired by real customers
                </motion.p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {instagramPosts.map((post, index) => (
                    <motion.a
                        key={post.id}
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
                    >
                        <img
                            src={post.image}
                            alt={`Instagram post ${post.id}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Instagram className="w-5 h-5" />
                                    <span className="text-sm font-medium">{post.likes}</span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Instagram className="w-12 h-12 text-white" />
                        </div>
                    </motion.a>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mt-12"
            >
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                    <Instagram className="w-5 h-5" />
                    Follow on Instagram
                </a>
            </motion.div>
        </Section>
    );
};

export default InstagramFeed;
