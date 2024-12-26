import { motion } from "framer-motion";
import { Code, Brush, Database, CreativeCommons } from "lucide-react";

const skills = [
  {
    icon: <Code className="w-12 h-12 text-blue-600" />,
    title: "Full-Stack Development",
    items: ["React", "Next.js", "Node.js", "TypeScript", "Python", "MongoDB"],
    image: "/assets/skills/fullstack.svg", // Replace with actual image path
  },
  {
    icon: <Brush className="w-12 h-12 text-pink-500" />,
    title: "Graphics & UI/UX Design",
    items: ["Figma", "Adobe XD", "Illustrator", "Photoshop", "UI/UX Design"],
    image: "/assets/skills/design.svg", // Replace with actual image path
  },
  {
    icon: <Database className="w-12 h-12 text-green-500" />,
    title: "Database Engineering",
    items: ["SQL", "MongoDB", "PostgreSQL", "ETL Processes", "Database Optimization"],
    image: "/assets/skills/database.svg", // Replace with actual image path
  },
  {
    icon: <CreativeCommons className="w-12 h-12 text-yellow-500" />,
    title: "Creative Commons",
    items: ["Licensing", "Open Source", "Creative Works", "Attribution", "ShareAlike"],
    image: "/assets/skills/creative.svg", // Replace with actual image path
  },
];

export function Skills() {
  return (
    <section className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-6">Skills & Expertise</h2>
        <p className="max-w-2xl mx-auto">
          Dive into my technical expertise in development, design, and database engineering, all reflected through dynamic cards.
        </p>
      </motion.div>

      <div className="flex overflow-x-auto space-x-8 pb-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="min-w-[300px] relative shadow-lg rounded-xl p-6 overflow-hidden transform transition-transform duration-300 hover:scale-105 card"
          >
            {/* Reflective Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent blur-xl opacity-20 -z-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 pointer-events-none rounded-xl" />

            {/* Card Content */}
            <div className="flex flex-col items-center text-center">
              <div className="relative z-10 mb-4">
                {skill.icon}
                
              </div>
              <h3 className="text-xl font-semibold mb-4">{skill.title}</h3>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                {skill.items.map((item) => (
                  <li key={item} className=" text-left p-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}