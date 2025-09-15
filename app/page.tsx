'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skills } from '@/components/sections/skills';
import Education from '@/components/sections/education';
import  Experience  from '@/components/sections/experience';
import { Certifications } from '@/components/sections/certificate';
import { Projects } from '@/components/sections/projects';
import { Gallery } from '@/components/sections/gallery';
import { Testimonials } from '@/components/sections/testimonials';
import { Contact } from '@/components/sections/contact';
import { client, HERO_QUERY, urlFor } from '@/lib/sanity';
import { Hero } from '@/lib/types';

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [heroData, setHeroData] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y1 = useTransform(smoothProgress, [0, 1], [0, -200]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, -400]);
  const y3 = useTransform(smoothProgress, [0, 1], [0, -600]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5], [1, 0.8]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await client.fetch(HERO_QUERY);
        setHeroData(data);
      } catch (error) {
        console.error('Error fetching hero data:', error);
        // Fallback data
        setHeroData({
          name: "Pawandeep Singh Thandi",
          title: "Creative Designer & Developer",
          roles: ["Graphics Designer", "Full Stack Developer", "UI/UX Designer"],
          description: "Transforming ideas into stunning digital experiences through innovative design and cutting-edge development.",
          location: "Toronto, ON",
          phone: "+1 (416) 884-0993",
          email: "thandipawandeep@gmail.com"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/90">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      <div ref={containerRef} className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: heroData?.backgroundImage
                ? `url('${urlFor(heroData.backgroundImage).url()}')`
                : `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        <motion.div className="absolute inset-0 opacity-30" style={{ y: y3 }}>
          <div className="absolute top-10 left-5 sm:left-10 w-40 sm:w-72 h-40 sm:h-72 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-5 sm:right-10 w-60 sm:w-96 h-60 sm:h-96 bg-gradient-to-r from-pink-400/20 to-orange-600/20 rounded-full blur-3xl" />
        </motion.div>

        <motion.div className="absolute inset-0 opacity-20" style={{ y: y2 }}>
          <div className="absolute top-1/3 right-1/4 w-40 sm:w-64 h-40 sm:h-64 bg-gradient-to-r from-green-400/30 to-blue-600/30 rounded-full blur-2xl" />
          <div className="absolute bottom-1/3 left-1/4 w-52 sm:w-80 h-52 sm:h-80 bg-gradient-to-r from-purple-400/30 to-pink-600/30 rounded-full blur-2xl" />
        </motion.div>

        <motion.div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-12" style={{ y: y1, opacity, scale }}>
          <div className="text-center max-w-6xl mx-auto py-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-white via-slate-200 to-white bg-clip-text text-transparent mb-4 leading-[1.3] sm:leading-[1.4] md:leading-[1.5] tracking-tight overflow-visible break-words">
                {heroData?.name}
              </h1>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {heroData?.roles.map((role, index) => (
                  <motion.div
                    key={role}
                    className="px-4 sm:px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs sm:text-sm font-medium"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {role}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.p
              className="text-base sm:text-lg md:text-xl xl:text-2xl text-slate-200 mb-8 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {heroData?.description}
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10 text-slate-300 text-xs sm:text-sm"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 sm:w-5 h-4 sm:h-5" />
                <span>{heroData?.location}</span>
              </div>
              {heroData?.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span>{heroData.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Mail className="w-4 sm:w-5 h-4 sm:h-5" />
                <span>{heroData?.email}</span>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button
                size="lg"
                className="text-xs sm:text-sm px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Mail className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                Get In Touch
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-xs sm:text-sm px-6 sm:px-8 py-2 sm:py-3 rounded-full border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Github className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                View Projects
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-xs sm:text-sm px-6 sm:px-8 py-2 sm:py-3 rounded-full border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
              >
                <Linkedin className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                LinkedIn
              </Button>
            </motion.div>

            <motion.div
              className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center text-white/70 cursor-pointer"
                onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="text-xs sm:text-sm mb-1">Scroll to explore</span>
                <ArrowDown className="w-4 sm:w-5 h-4 sm:h-5" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="relative">
        <section id="skills" className="relative">
          <Skills />
        </section>
        <section id="education" className="relative">
          <Education />
        </section>
        <section id="experience" className="relative">
          <Experience />
        </section>
        <section id="certifications" className="relative">
          <Certifications />
        </section>
        <section id="projects" className="relative">
          <Projects />
        </section>
        <section id="gallery" className="relative">
          <Gallery />
        </section>
        <section id="testimonials" className="relative">
          <Testimonials />
        </section>
        <section id="contact" className="relative">
          <Contact />
        </section>
      </div>
    </div>
  );
}