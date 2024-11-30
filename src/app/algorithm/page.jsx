import { Card } from "@/components/ui/card";
import MyTable from "@/components/MyTable";
import { getAlgorithms } from "@/app/utils";

export default async function Page() {
  const algorithm = await getAlgorithms();
  const algorithmList = algorithm.reduce((acc, cur) => {
    const language = cur.languages;
    const path = cur.slug;
    if (acc[path]) {
      acc[path].push(language);
    } else {
      acc[path] = [language];
    }
    return acc;
  }, {});

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center items-baseline">
      <Card className="w-full max-w-4xl shadow-xl rounded-xl">
        <MyTable algorithmList={algorithmList} className="m-4" />
      </Card>
    </div>
  );
}
