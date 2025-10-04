import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

import Skillset from "@/components/Skillset";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function MyResume() {
  const name = "Jihoo Park";
  const title = "Data Scientist";
  const email = "wlgn8648@gmail.com";

  const educationList = [
    {
      degree: "Bachelor's in Mathematics",
      university: "POSTECH",
      start: "2016",
      end: "2020",
    },
    {
      degree: "Master's in Data Science",
      university: "Seoul National University",
      start: "2022",
      end: "2024",
    },
  ];

  const jobList = [
    {
      position: "Web Developer",
      company: "LG CNS",
      start: "2020",
      end: "2022",
    },
  ];

  const skills = {
    ML: ["tensorflow", "pytorch"],
    DB: ["mysql", "postgres", "sqlite", "kafka", "mongodb"],
    BE: ["spring", "django", "fastapi", "flask"],
    FE: ["vue", "react", "html", "css", "md", "vite"],
    cloud: ["gcp", "aws"],
    devops: ["jenkins", "docker", "githubactions", "git"],
    languages: ["py", "cpp", "c", "java", "r", "js", "matlab", "latex"],
    ides: ["vscode", "idea", "eclipse"],
  };

  return (
    <div>
        <CardHeader className="from-blue-500 p-6 rounded-t-lg">
          <CardTitle className="text-4xl font-bold">{name}</CardTitle>
          <p className="text-xl font-light">{title}</p>
          <div className="flex gap-4 mt-4">
            <Button
              variant="text"
              size="icon"
              asChild
              className="hover:bg-white hover:text-black"
            >
              <Link href="https://github.com/park-jihoo">
                <GitHubLogoIcon />
              </Link>
            </Button>
            <Button
              variant="text"
              size="icon"
              asChild
              className="hover:bg-white hover:text-black"
            >
              <Link href="https://www.linkedin.com/in/parkjihoo/">
                <LinkedInLogoIcon />
              </Link>
            </Button>
            <Button
              variant="text"
              size="icon"
              asChild
              className="hover:bg-white hover:text-black"
            >
              <Link href={`mailto:${email}`}>
                <EnvelopeClosedIcon />
              </Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="space-y-8">
            {/* Skills Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Skills
              </h2>
              <Skillset skills={skills} />
            </div>
            <Separator />

            {/* Education Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Education
              </h2>
              {educationList.map((education, index) => (
                <div key={index} className="mb-4">
                  <p className="text-lg font-medium text-gray-800">
                    {education.degree}
                  </p>
                  <p className="text-gray-600">{education.university}</p>
                  <p className="text-gray-500">
                    {education.start} - {education.end}
                  </p>
                </div>
              ))}
            </div>
            <Separator />

            {/* Work Experience Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Work Experience
              </h2>
              {jobList.map((job, index) => (
                <div key={index} className="mb-4">
                  <p className="text-lg font-medium text-gray-800">
                    {job.position}
                  </p>
                  <p className="text-gray-600">{job.company}</p>
                  <p className="text-gray-500">
                    {job.start} - {job.end}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6">
          <p className="text-sm text-gray-500">
            © 2024 Jihoo Park. All rights reserved.
          </p>
        </CardFooter>
    </div>
  );
}

export default MyResume;
