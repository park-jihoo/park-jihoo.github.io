<script setup>
defineOgImage({
  component: "template",
  props: {
    title: "Park Jihoo"
  },
})

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
  </Head>
  <OgImage />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
