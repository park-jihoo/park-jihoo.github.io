import {getAlgorithms} from "@/app/utils";
import CodeBlock from "@/components/CodeBlock";
import {Card, Chip, Divider, Typography} from "@mui/material";

export async function generateStaticParams() {
    const algorithms = await getAlgorithms();
    let params = [];
    for (const algorithm of algorithms) {
        const path = algorithm.path
            .split(".")
            .slice(0, algorithm.path.split(".").length - 1)
            .join(".");
        const platform = path.split("/")[0];
        const difficulty = path.split("/")[1];
        const slug = path.split("/")[2];
        params.push({
            platform: platform,
            difficulty: difficulty,
            slug: slug,
        });
    }
    return params;
}

export default async function Page({params}) {
    const algorithms = await getAlgorithms();
    const language = algorithms
        .filter((algorithm) => {
            const path = algorithm.path
                .split(".")
                .slice(0, algorithm.path.split(".").length - 1)
                .join(".");
            return (
                path ===
                `${params.platform}/${params.difficulty}/${params.slug}/${params.slug}`
            );
        })
        .map((algorithm) => {
            return algorithm.path
                .split(".")
                [algorithm.path.split(".").length - 1].toLowerCase();
        });

    const paths = language.map((lang) => {
        return `https://raw.githubusercontent.com/park-jihoo/Algorithm/main/${params.platform}/${params.difficulty}/${params.slug}/${params.slug}.${lang.toLowerCase()}`;
    });
    const codes = await Promise.all(
        paths.map(async (path) => {
            const response = await fetch(path);
            return await response.text();
        }),
    );

    return (
        <>
            <Card sx={{ minHeight: '100vh', padding: 2 }}>
                <Chip label={params.platform} variant="outlined" color="primary" sx={{ marginBottom: 1 }} />
                <Chip label={params.difficulty} variant="outlined" color="secondary" sx={{ marginBottom: 1 }} />
                <Typography variant="h4" sx={{ marginBottom: 2 }}>
                    {params.slug}
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <CodeBlock language={language} codes={codes} />
            </Card>
        </>
    );
}
