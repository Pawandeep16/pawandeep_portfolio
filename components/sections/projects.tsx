"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { client, PROJECTS_QUERY, urlFor } from '@/lib/sanity';
import { Project } from '@/lib/types';

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const minSwipeDistance = 50;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await client.fetch(PROJECTS_QUERY);
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([{
          _id: '1',
          title: "Fallback Project",
          description: "Sample fallback project.",
          image: null,
          tags: ["React"],
          liveUrl: "#",
          githubUrl: "#",
          gradient: "from-blue-500 to-purple-600",
          featured: true,
          order: 1
        }]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handlePrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  }, [projects.length]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  }, [projects.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrevious]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) handleNext();
    if (distance < -minSwipeDistance) handlePrevious();
  };

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -400, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 400, behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden ">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-orange-50/30 dark:from-purple-950/50 dark:via-slate-900 dark:to-orange-950/30" />
      <motion.div className="absolute inset-0 opacity-20" style={{ y }}>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/30 to-pink-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10 overflow-y-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            A selection of my recent work and personal projects that showcase my skills and creativity.
          </p>
        </motion.div>

        {/* Desktop */}
        <div className="hidden lg:block relative overflow-y-hidden">
          <button onClick={scrollLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full glass hover:scale-110 shadow-lg">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={scrollRight} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full glass hover:scale-110 shadow-lg">
            <ChevronRight className="w-6 h-6" />
          </button>

          <div ref={scrollContainerRef} className="flex gap-8 overflow-x-auto scrollbar-hide pb-4 px-12 overflow-y-hidden">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="apple-card flex-shrink-0 w-96"
              >
                <div className="relative h-48 overflow-hidden rounded-t-3xl">
                  {project.image ? (
                    <Image
                      src={urlFor(project.image).url()}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-800" />
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-20`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{project.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-xs rounded-full">{tag}</span>
                    ))}
                    {project.tags.length > 3 && <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-xs rounded-full">+{project.tags.length - 3}</span>}
                  </div>
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <Button
                        asChild
                        size="sm"
                        className={`bg-gradient-to-r ${project.gradient} text-white flex-1`}
                      >
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1">
                          <Github className="w-3 h-3" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden relative max-w-full mx-auto px-4">
          <div className="absolute inset-y-0 left-2 flex items-center z-10">
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full glass" onClick={handlePrevious}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>
          <div className="absolute inset-y-0 right-2 flex items-center z-10">
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full glass" onClick={handleNext}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          <div
            className="relative h-[600px] overflow-hidden rounded-3xl touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <motion.div
              key={currentIndex}
              initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <div className="apple-card h-full">
                <div className="relative h-56 overflow-hidden rounded-t-3xl">
                  {projects[currentIndex]?.image ? (
                    <Image
                      src={urlFor(projects[currentIndex].image).url()}
                      alt={projects[currentIndex].title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-800" />
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-t ${projects[currentIndex]?.gradient} opacity-20`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{projects[currentIndex]?.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">{projects[currentIndex]?.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {projects[currentIndex]?.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-sm rounded-full">{tag}</span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {projects[currentIndex]?.liveUrl && (
                      <Button
                        asChild
                        className={`bg-gradient-to-r ${projects[currentIndex]?.gradient} text-white flex-1`}
                      >
                        <a href={projects[currentIndex]?.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {projects[currentIndex]?.githubUrl && (
                      <Button
                        asChild
                        variant="outline"
                        className="flex-1"
                      >
                        <a href={projects[currentIndex]?.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                          <Github className="w-4 h-4" />
                          View Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-purple-500 w-8' : 'bg-gray-300 dark:bg-gray-600'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
