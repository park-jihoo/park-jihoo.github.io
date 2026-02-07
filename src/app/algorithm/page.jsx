import { Code2 } from "lucide-react";

import { getAlgorithms } from "@/app/utils";
import MyTable from "@/components/MyTable";
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="border-b border-border/80 pb-6 text-center sm:text-left">
        <h1 className="text-4xl font-semibold tracking-tight text-[var(--section-title)] lg:text-5xl">
          <span className="text-primary">
            <Code2 className="size-10" />
          </span>
          Algorithm Solutions
        </h1>
      </header>

      <section>
        <Card className="border-border/70 overflow-hidden">
          <CardContent className="p-4 sm:p-6">
            <MyTable algorithmList={algorithmList} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
