"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Calendar, MapPin, Award } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { client, EXPERIENCE_QUERY } from "@/lib/sanity";
import { Experience as ExperienceType } from "@/lib/types";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [experience, setExperience] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const data = await client.fetch(EXPERIENCE_QUERY);
        setExperience(data);
      } catch (error) {
        console.error("Error fetching experience:", error);
        // Fallback data
        setExperience([
          {
            _id: "1",
            title: "Full Stack Developer",
            company: "GoBolt Logistics",
            location: "Markham, Ontario",
            startDate: "2025-01-01",
            current: true,
            description:
              "Developing and maintaining full-stack applications for logistics and supply chain management. Working with modern technologies to optimize delivery operations and enhance user experience.",
            achievements: [
              "Led development of real-time tracking system",
              "Improved application performance by 40%",
              "Implemented automated testing pipeline",
            ],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  if (loading) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-purple-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-purple-950/30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-6 max-w-md mx-auto" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse max-w-2xl mx-auto" />
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-200 dark:bg-gray-700 rounded-3xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-purple-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-purple-950/30" />

      {/* Floating Elements */}
      <motion.div className="absolute inset-0 opacity-20" style={{ y }}>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/30 to-blue-600/30 rounded-xl blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-xl blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent mb-6">
            Work Experience
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            My professional journey in technology and software development
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experience.map((exp, index) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative mb-16 last:mb-0"
            >
              {/* Removed timeline line and dot */}

              <div>
                <motion.div
                  className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-white/20 dark:border-slate-700/20 transition-all duration-500"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex flex-col gap-6 mb-6">
                    <div className="flex items-center gap-3 text-purple-600 dark:text-purple-400">
                      <Briefcase className="w-6 h-6" />
                      <h3 className="font-bold text-xl text-slate-900 dark:text-white">
                        {exp.title}
                      </h3>
                    </div>
                    <p className="text-2xl font-semibold text-slate-900 dark:text-white">
                      {exp.company}
                    </p>
                    <div className="flex flex-wrap gap-6 text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {formatDate(exp.startDate)} -{" "}
                          {exp.current
                            ? "Present"
                            : exp.endDate
                            ? formatDate(exp.endDate)
                            : "Present"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 text-justify">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <>
                      <div className="flex items-center gap-2 mb-4">
                        <Award className="w-5 h-5 text-yellow-500" />
                        <span className="font-semibold text-slate-900 dark:text-white">
                          Key Achievements:
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <motion.span
                            key={achievement}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: achIndex * 0.1 }}
                            className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm rounded-lg border border-purple-200 dark:border-purple-700"
                          >
                            {achievement}
                          </motion.span>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Technologies */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: techIndex * 0.05 }}
                            className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-full"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}

                  {exp.current && (
                    <motion.span
                      className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm px-4 py-2 rounded-full shadow-lg inline-block mt-6"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Current
                    </motion.span>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
