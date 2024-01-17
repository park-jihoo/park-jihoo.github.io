import { getAlgorithms } from "@/app/utils";
import Table from "@/components/Table";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";

export default async function Page() {
  const algorithm = await getAlgorithms();
  const algorithmList = algorithm.reduce((acc, cur) => {
    const language = cur.path.split(".")[cur.path.split(".").length - 1];
    const path = cur.path
      .split(".")
      .slice(0, cur.path.split(".").length - 1)
      .join(".");
    if (acc[path]) {
      acc[path].push(language);
    } else {
      acc[path] = [language];
    }
    return acc;
  }, {});

  return (
    <div>
      <Card sx={{ minHeight: "100vh" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper sx={{ width: "100%", p: 2, marginTop: 2 }} elevation={0}>
            <Table algorithmList={algorithmList} />
          </Paper>
        </Box>
      </Card>
    </div>
  );
}
