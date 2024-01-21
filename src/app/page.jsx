import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material-next/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material-next/IconButton";
import Typography from "@mui/material/Typography";
import { Email, LinkedIn, GitHub } from "@mui/icons-material";
import Skillset from "@/components/Skillset";

function MyResume() {
  const name = "Jihoo Park";
  const title = "Data Scientist";
  const email = "wlgn8648@gmail.com";

  const educationList = [
    {
      degree: "B.S. in Mathematics",
      university: "POSTECH",
      start: "2016",
      end: "2020",
    },
    {
      degree: "M.S. in Data Science",
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
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {name}
              </Typography>
              <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                {title}
              </Typography>
              <IconButton
                aria-label="github"
                href="https://github.com/park-jihoo"
              >
                <GitHub />
              </IconButton>
              <IconButton
                aria-label="linkedin"
                href="https://www.linkedin.com/in/parkjihoo/"
              >
                <LinkedIn />
              </IconButton>
              <IconButton aria-label="email" href={`mailto:${email}`}>
                <Email />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Skills
              </Typography>
              <Skillset skills={skills} />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Education
              </Typography>
              {educationList.map((education, index) => (
                <div key={index}>
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{ flexGrow: 1 }}
                  >
                    {education.degree}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ flexGrow: 1 }}
                  >
                    {education.university}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ flexGrow: 1 }}
                  >
                    {education.start} -{education.end}
                  </Typography>
                </div>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Work Experience
              </Typography>
              {jobList.map((job, index) => (
                <div key={index}>
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{ flexGrow: 1 }}
                  >
                    {job.position}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ flexGrow: 1 }}
                  >
                    {job.company}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ flexGrow: 1 }}
                  >
                    {job.start} -{job.end}
                  </Typography>
                </div>
              ))}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default MyResume;
