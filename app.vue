<script setup>
defineOgImageScreenshot(
)

useSeoMeta({
  title: "Park Jihoo",
  description: "Park Jihoo's blog",
  keywords: "Park Jihoo, blog, algorithm, notes",
  ogType: "website",
  ogTitle: "Park Jihoo",
  ogDescription: "Park Jihoo's blog",
  ogUrl: "https://park-jihoo.github.io",
});
</script>
<template>
  <Head>
    <Meta
      name="google-site-verification"
      content="kQoktB1lk0tqFRLs4-vqhVfEVWlRMX8VRQtLC_L09uw"
    />
    <Meta
      name="naver-site-verification"
      content="0581245626108d8ea24cc4d24a30ee84c0394ce6"
    />
  </Head>
  <OgImage />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
