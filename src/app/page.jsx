"use client";

import { motion } from "framer-motion";
import { LinkIcon } from "lucide-react";
import Link from "next/link";

import Skillset from "@/components/Skillset";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RESUME_DATA } from "@/constants/resume";

export default function MyResume() {
  return (
    <div className="space-y-12 py-8 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="space-y-4 flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground"
          >
            {RESUME_DATA.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-lg mx-auto md:mx-0"
          >
            {RESUME_DATA.summary}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-4 justify-center md:justify-start pt-2"
          >
            {RESUME_DATA.contact.social.map((social) => (
              <Button
                key={social.name}
                variant="outline"
                size="icon"
                asChild
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-muted-foreground/20 hover:border-primary hover:bg-primary/10 transition-all duration-300"
              >
                <Link href={social.url} target="_blank" rel="noopener noreferrer">
                  <social.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </Link>
              </Button>
            ))}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="rounded-full p-2 border-2 border-dashed border-primary/30">
            <Avatar className="h-40 w-40 sm:h-48 sm:w-48 border-4 border-background shadow-xl">
              <AvatarImage
                src={RESUME_DATA.avatarUrl}
                alt={RESUME_DATA.name}
                className="object-cover"
              />
              <AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
            </Avatar>
          </div>
        </motion.div>
      </section>

      <Separator />

      {/* Skills Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold tracking-tight">Skills</h2>
        <Skillset skills={RESUME_DATA.skills} />
      </motion.section>

      <Separator />

      {/* Projects Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESUME_DATA.projects.map((project, index) => (
            <Card
              key={index}
              className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="p-5 pb-2">
                <CardTitle className="text-lg font-semibold flex items-center justify-between">
                  <span className="truncate" title={project.title}>
                    {project.title}
                  </span>
                  {project.link?.href && (
                    <Link
                      href={project.link.href}
                      target="_blank"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <LinkIcon className="h-4 w-4" />
                    </Link>
                  )}
                </CardTitle>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-[10px] px-2 py-0.5 h-auto font-normal"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="p-5 pt-2 flex-grow">
                <CardDescription className="text-sm leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      <Separator />

      {/* Work Experience Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold tracking-tight">Work Experience</h2>
        <div className="space-y-4">
          {RESUME_DATA.work.map((work, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{work.company}</h3>
                    <p className="text-sm font-medium text-muted-foreground">
                      {work.title}
                    </p>
                  </div>
                  <Badge variant="outline" className="shrink-0">
                    {work.start} - {work.end}
                  </Badge>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {work.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <Separator />

      {/* Education Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold tracking-tight">Education</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {RESUME_DATA.education.map((edu, index) => (
            <Card key={index} className="shadow-sm hover:shadow-md transition-all">
              <CardHeader className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold">{edu.school}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {edu.start} - {edu.end}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{edu.degree}</p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="pt-8 pb-4 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {RESUME_DATA.name}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
