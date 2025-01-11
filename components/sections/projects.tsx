"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Covid-19 Tracker",
    description: "A full-stack e-commerce solution with real-time inventory management.",
    image: "https://cdn.leonardo.ai/users/46b1b318-d8a6-4668-9037-68754ff6aa5f/generations/68bf48ce-c506-4604-98fc-408a76020c05/Leonardo_Phoenix_09_Create_a_vibrant_and_informative_thumbnail_3.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
    liveUrl: "https://tracker-6f237.web.app/",
    githubUrl: "https://github.com/Pawandeep16",
  },
  {
    title: "Advanced Analysis Tool",
    description: "A modern portfolio website with dark mode and animations.",
    image: "https://res.cloudinary.com/dpjsyk9yu/image/upload/v1736621325/advanced_analysis_tool_aciwiy.webp",
    tags: ["React", "Framer Motion", "Tailwind CSS"],
    liveUrl: "https://doc-analysis-tool.vercel.app/",
    githubUrl: "https://github.com/Docinsight-Devs/advanced_legal_doc_analysis_tool/tree/production",
  },
  {
    title: "Portfolio Website",
    description: "A modern portfolio website with dark mode and animations.",
    image: "https://static.vecteezy.com/system/resources/previews/011/537/749/non_2x/people-work-portfolio-concept-for-website-template-landing-homepage-with-modern-isometric-flat-free-vector.jpg",
    tags: ["React", "Framer Motion", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "https://github.com/Pawandeep16",
  },
  {
    title: "Amazon Clone",
    description: "A Full Stack Application which is the Replica of the Amazon.",
    image: "https://gradblog.schulich.yorku.ca/wp-content/uploads/2018/08/Amazon.png",
    tags: ["React", "Node.js", "Firebase", "Socket.io", "Ant Icons"],
    liveUrl: "https://amazoon-1325.web.app/",
    githubUrl: "https://github.com/Pawandeep16",
  },
  {
    title: "Erp Next - Educational Institute Appplciation",
    description: "A Full Stack Application which is the Replica of the Amazon.",
    image: "https://cdn.leonardo.ai/users/46b1b318-d8a6-4668-9037-68754ff6aa5f/generations/ea9070d1-fb7b-42e3-9211-e2f545f0c068/Leonardo_Phoenix_09_A_modern_and_sleek_realtime_chat_app_inter_2.jpg?w=512",
    tags: ["React", "Node.js", "Firebase", "Socket.io", "Ant Icons"],
    liveUrl: "https://chaterr.netlify.app/",
    githubUrl: "https://github.com/Pawandeep16",
  },
  {
    title: "Event Notifier - college Project",
    description: "A Full Stack Application which is the Replica of the Amazon.",
    image: "https://cdn.leonardo.ai/users/46b1b318-d8a6-4668-9037-68754ff6aa5f/generations/ea9070d1-fb7b-42e3-9211-e2f545f0c068/Leonardo_Phoenix_09_A_modern_and_sleek_realtime_chat_app_inter_2.jpg?w=512",
    tags: ["React", "Node.js", "Firebase", "Socket.io", "Ant Icons"],
    liveUrl: "https://chaterr.netlify.app/",
    githubUrl: "https://github.com/Pawandeep16/Major-Project-EventManager",
  },
  {
    title: "Real Time Chat App",
    description: "A Full Stack Application which is the Replica of the Amazon.",
    image: "https://cdn.leonardo.ai/users/46b1b318-d8a6-4668-9037-68754ff6aa5f/generations/ea9070d1-fb7b-42e3-9211-e2f545f0c068/Leonardo_Phoenix_09_A_modern_and_sleek_realtime_chat_app_inter_2.jpg?w=512",
    tags: ["React", "Node.js", "Firebase", "Socket.io", "Ant Icons"],
    liveUrl: "https://chaterr.netlify.app/",
    githubUrl: "https://github.com/Pawandeep16",
  },
  {
    title: "Notes App",
    description: "A collaborative task management application with real-time updates.",
    image: "https://i0.wp.com/highschool.latimes.com/wp-content/uploads/2019/01/45692459364_2d91368a04_z.jpg?fit=640%2C427&ssl=1",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    liveUrl: "https://gne-notes.web.app/",
    githubUrl: "https://github.com/Pawandeep16",
  },
  {
    title: "Disney Clone",
    description: "A collaborative task management application with real-time updates.",
    image: "https://i0.wp.com/highschool.latimes.com/wp-content/uploads/2019/01/45692459364_2d91368a04_z.jpg?fit=640%2C427&ssl=1",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    liveUrl: "https://gne-notes.web.app/",
    githubUrl: "https://github.com/Pawandeep16/disneyClone",
  },
  {
    title: "Linkedin Clone",
    description: "A collaborative task management application with real-time updates.",
    image: "https://media.licdn.com/dms/image/D5612AQH_wBNAqIO3Lw/article-cover_image-shrink_720_1280/0/1685507296579?e=2147483647&v=beta&t=DcNhosKbQ_jI50J-8BA8YLLWL6rfGfutaAQ3t6I9c2U",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    liveUrl: "https://gne-notes.web.app/",
    githubUrl: "https://github.com/Pawandeep16/LinkedIn-Clone",
  },
  {
    title: "Netflix Clone",
    description: "A collaborative task management application with real-time updates.",
    image: "https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    liveUrl: "https://netflix-34510.web.app/",
    githubUrl: "https://github.com/Pawandeep16/Netflix-Clone-with-React-incl.-Stripe",
  },
  
  
];

export function Projects() {
  return (
    <section id="projects" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work and personal projects.
          </p>
        </motion.div>

        <div className="overflow-x-auto">
          <motion.div
            className="flex gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            {projects.map((project) => (
              <motion.div
                key={project.title}
                className="bg-card rounded-lg overflow-hidden shadow-lg flex-shrink-0 w-80"
                variants={{
                  hidden: { opacity: 0, x: 100 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                }}
              >
                <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-primary/10 text-primary text-sm px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
