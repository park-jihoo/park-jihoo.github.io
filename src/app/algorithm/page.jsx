import { getAlgorithms } from "@/app/utils";
import MyTable from "@/components/MyTable";
import { Card } from "@/components/ui/card";

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
    <div className="p-6 min-h-screen flex justify-center items-baseline">
      <MyTable algorithmList={algorithmList} className="m-4" />
    </div>
  );
}
