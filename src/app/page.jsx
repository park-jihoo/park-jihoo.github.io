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

const stagger = { staggerChildren: 0.08, delayChildren: 0.05 };
const itemUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

function SectionTitle({ children }) {
  return (
    <h2 className="text-2xl font-semibold tracking-tight text-[var(--section-title)]">
      {children}
    </h2>
  );
}

export default function MyResume() {
  return (
    <div className="mx-auto max-w-4xl space-y-14 py-8">
      {/* Hero */}
      <motion.section
        className="flex flex-col-reverse items-center justify-between gap-10 text-center md:flex-row md:text-left"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        <div className="flex-1 space-y-5">
          <motion.h1
            variants={itemUp}
            className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
          >
            {RESUME_DATA.name}
          </motion.h1>
          <motion.p
            variants={itemUp}
            className="mx-auto max-w-lg text-lg leading-relaxed text-muted-foreground md:mx-0"
          >
            {RESUME_DATA.summary}
          </motion.p>
          <motion.div
            variants={itemUp}
            className="flex justify-center gap-3 pt-1 md:justify-start"
          >
            {RESUME_DATA.contact.social.map((social) => (
              <Button
                key={social.name}
                variant="outline"
                size="icon"
                asChild
                className="size-11 rounded-full border-border/80 transition-colors hover:border-primary hover:bg-primary/10 sm:size-12"
              >
                <Link
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="size-5 sm:size-6" />
                </Link>
              </Button>
            ))}
          </motion.div>
        </div>
        <motion.div variants={itemUp} className="relative">
          <div className="rounded-full p-2 ring-2 ring-primary/20 ring-offset-4 ring-offset-card">
            <Avatar className="size-40 border-4 border-card sm:size-48">
              <AvatarImage
                src={RESUME_DATA.avatarUrl}
                alt={RESUME_DATA.name}
                className="object-cover"
              />
              <AvatarFallback className="text-2xl">
                {RESUME_DATA.initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </motion.div>
      </motion.section>

      <Separator className="bg-border/80" />

      {/* Skills */}
      <motion.section
        className="space-y-6"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-40px" }}
        variants={stagger}
      >
        <SectionTitle>Skills</SectionTitle>
        <Skillset skills={RESUME_DATA.skills} />
      </motion.section>

      <Separator className="bg-border/80" />

      {/* Projects */}
      <motion.section
        className="space-y-6"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-40px" }}
        variants={stagger}
      >
        <SectionTitle>Projects</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RESUME_DATA.projects.map((project, index) => (
            <Card
              key={index}
              className="flex h-full flex-col border-border/70 transition-all duration-200 hover:-translate-y-0.5"
            >
              <CardHeader className="p-5 pb-2">
                <CardTitle className="flex items-center justify-between gap-2 text-lg font-semibold">
                  <span className="truncate" title={project.title}>
                    {project.title}
                  </span>
                  {project.link?.href && (
                    <Link
                      href={project.link.href}
                      target="_blank"
                      className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
                    >
                      <LinkIcon className="size-4" />
                    </Link>
                  )}
                </CardTitle>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="h-auto px-2 py-0.5 text-[10px] font-normal"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-5 pt-2">
                <CardDescription className="text-sm leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      <Separator className="bg-border/80" />

      {/* Work */}
      <motion.section
        className="space-y-6"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-40px" }}
        variants={stagger}
      >
        <SectionTitle>Work Experience</SectionTitle>
        <div className="space-y-4">
          {RESUME_DATA.work.map((work, index) => (
            <Card
              key={index}
              className="border-border/70 transition-all duration-200"
            >
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {work.company}
                      </h3>
                      <p className="text-sm font-medium text-muted-foreground">
                        {work.title}
                      </p>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      {work.start} – {work.end}
                    </Badge>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/85">
                    {work.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      <Separator className="bg-border/80" />

      {/* Education */}
      <motion.section
        className="space-y-6"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-40px" }}
        variants={stagger}
      >
        <SectionTitle>Education</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          {RESUME_DATA.education.map((edu, index) => (
            <Card
              key={index}
              className="border-border/70 transition-all duration-200"
            >
              <CardHeader className="p-4">
                <div className="mb-1 flex items-start justify-between gap-2">
                  <h3 className="font-semibold">{edu.school}</h3>
                  <Badge variant="secondary" className="shrink-0 text-xs">
                    {edu.start} – {edu.end}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{edu.degree}</p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </motion.section>

      <Separator className="bg-border/80" />
      <footer className="py-6 text-center">
        <p className="text-sm text-muted-foreground/90">
          © {new Date().getFullYear()} {RESUME_DATA.name}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
