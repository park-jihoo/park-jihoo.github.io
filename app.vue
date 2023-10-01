<script setup>
defineOgImage({
  component: "template",
  title: "Park Jihoo"
});

useSeoMeta({
  title: "Park Jihoo",
  description: "Park Jihoo's blog",
  keywords: "Park Jihoo, blog, algorithm, notes",
  og: {
    type: "website",
    url: "https://park-jihoo.github.io",
    site_name: "Park Jihoo",
    title: "Park Jihoo",
    description: "Park Jihoo's blog",
  }
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
