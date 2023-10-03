<script setup>
defineOgImage({
  component: "template",
  title: "Park Jihoo"
});

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
  <OgImage/>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
