import {
  Card, Chip, Divider, Select, Typography,
} from '@mui/material';
import { getHighlighter } from 'shikiji';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { OpenInNew } from '@mui/icons-material';
import CodeBlock from '@/components/CodeBlock';
import { getAlgorithms } from '@/app/utils';

export async function generateStaticParams() {
  const algorithms = await getAlgorithms();
  const params = [];
  for (const algorithm of algorithms) {
    const path = algorithm.path
      .split('.')
      .slice(0, algorithm.path.split('.').length - 1)
      .join('.');
    const platform = path.split('/')[0];
    const difficulty = path.split('/')[1];
    const slug = path.split('/')[2];
    params.push({
      platform: encodeURIComponent(platform),
      difficulty: encodeURIComponent(difficulty),
      slug: encodeURIComponent(slug),
    });
    params.push({
      platform,
      difficulty,
      slug,
    });
  }

  return params;
}

export default async function Page({ params }) {
  const algorithms = await getAlgorithms();
  const platform = decodeURIComponent(params.platform);
  const difficulty = decodeURIComponent(params.difficulty);
  const slug = decodeURIComponent(params.slug);
  const language = algorithms
    .filter((algorithm) => {
      const path = algorithm.path
        .split('.')
        .slice(0, algorithm.path.split('.').length - 1)
        .join('.');
      if (slug.split('.')[1] === undefined) return path === `${platform}/${difficulty}/${slug}/${slug}`;
      return (
        path
          === `${platform}/${difficulty}/${slug}/${slug.split('.')[1].trim()}`
      );
    })
    .map((algorithm) => algorithm.path
      .split('.')
      [algorithm.path.split('.').length - 1].toLowerCase());

  const languageMap = {
    c: 'c',
    cpp: 'cpp',
    cc: 'cpp',
    py: 'python',
    js: 'javascript',
    java: 'java',
    sql: 'sql',
  };

  const paths = language.map((lang) => {
    if (slug.split('.')[1] === undefined) return `https://raw.githubusercontent.com/park-jihoo/Algorithm/main/${platform}/${difficulty}/${slug}/${slug}.${lang.toLowerCase()}`;
    return `https://raw.githubusercontent.com/park-jihoo/Algorithm/main/${platform}/${difficulty}/${slug}/${slug.split('.')[1].trim()}.${lang.toLowerCase()}`;
  });

  const highlighter = getHighlighter({
    langs: language.map((lang) => languageMap[lang]),
    themes: ['material-theme-lighter', 'material-theme-darker'],
  });

  const codes = await Promise.all(
    paths.map(async (path) => {
      const response = await fetch(path);
      const text = await response.text();
      const lang = path.split('.')[path.split('.').length - 1];
      const light_html = (await highlighter).codeToHtml(text, {
        lang: languageMap[lang],
        theme: 'material-theme-lighter',
      });
      const dark_html = (await highlighter).codeToHtml(text, {
        lang: languageMap[lang],
        theme: 'material-theme-darker',
      });
      return { light: light_html, dark: dark_html, code: text };
    }),
  );

  return (
    <Card sx={{ minHeight: '100vh', padding: 2 }}>
      <Chip
        label={platform}
        variant="outlined"
        color="primary"
        sx={{ marginBottom: 1, marginRight: 1 }}
      />
      <Chip
        label={difficulty}
        variant="outlined"
        color="secondary"
        sx={{ marginBottom: 1 }}
      />
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        {slug}
        <IconButton
          aria-label="link"
          href={
              platform === 'leetcode'
                ? `https://leetcode.com/problems/${slug.split('-').slice(1).join('-')}`
                : platform === '프로그래머스'
                  ? `https://programmers.co.kr/learn/courses/30/lessons/${slug.split('.')[0]}`
                  : `https://www.acmicpc.net/problem/${slug.split('.')[0]}`
            }
        >
          <OpenInNew />
        </IconButton>
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <CodeBlock language={language} codes={codes} />
    </Card>
  );
}
