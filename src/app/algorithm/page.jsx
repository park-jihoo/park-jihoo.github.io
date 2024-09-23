import { Card } from "@/components/ui/card";
import MyTable from "@/components/MyTable";
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
      <Card className="w-full p-6 shadow-lg">
        <MyTable algorithmList={algorithmList} />
      </Card>
    </div>
  );
}
