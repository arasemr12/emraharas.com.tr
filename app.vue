<script setup>

const route = useRoute();

useSeoMeta({
  title:"arasemr1234",
  ogTitle:"arasemr1234",
  description:"arasemr1234 (Emrah Aras) personal website",
  ogDescription:"arasemr1234 (Emrah Aras) personal website",
  ogType:"website",
  ogUrl:`https://emraharas.com.tr${route.fullPath}`,
  ogLocale:"en_US",
  ogLocaleAlternate:["en_GB","tr_TR"],
  author:"arasemr1234",
});

watch(route,() => {
  useSeoMeta({
    ogUrl:`https://emraharas.com.tr${route.fullPath}`
  });
});

</script>

<template>
  <div class="layout">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
