import Card from "@mui/material/Card";
import Table from "@/components/Table";
import { getAlgorithms } from "@/app/utils";

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
      <Card sx={{ minHeight: "100vh", padding: 4 }}>
        <Table algorithmList={algorithmList} />
      </Card>
    </div>
  );
}
