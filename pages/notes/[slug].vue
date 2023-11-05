<script setup>
import { NotionRenderer } from "#components";
import "prismjs";
import "prismjs/components/prism-python";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import { VSkeletonLoader } from "vuetify/lib/labs/components";
import { getPageBlocks } from "~/lib/api";

const route = useRoute();

const { data, pending } = await useLazyAsyncData("notion", () =>
  getPageBlocks(route.params.slug),
);
</script>
<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col align-self="start">
          <v-skeleton-loader v-if="pending" type="card, paragraph, actions" />
          <v-card class="elevation-3 pa-4" v-else>
            <NotionRenderer
              v-if="data"
              :blockMap="data"
              prismjs
              katex
              :class="
                $vuetify.theme.global.current.dark ? 'dark-mode pa-2' : 'pa-2'
              "
            />
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary">
                <NuxtLink
                  to="/notes"
                  style="color: inherit; text-decoration: none"
                >
                  Back to List
                </NuxtLink>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <Giscus
          repo="park-jihoo/park-jihoo.github.io"
          repoId="R_kgDOJAfUTw"
          category="General"
          categoryId="DIC_kwDOJAfUT84Cas-2"
          mapping="url"
          strict="1"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          theme="preferred_color_scheme"
          lang="ko"
        />
      </v-row>
    </v-container>
  </div>
</template>
<style>
@import "public/style.css";
</style>
