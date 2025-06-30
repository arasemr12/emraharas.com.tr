<script setup>

const route = useRoute();

useSeoMeta({
  title:"arasemr1234",
  ogTitle:"arasemr1234",
  description:"Emrah Aras arasemr1234 kişisel web site. Yazılım, teknoloji ve profesyonel çalışmalara dair güncel içerikler.",
  ogDescription:"Emrah Aras arasemr1234 kişisel web site. Yazılım, teknoloji ve profesyonel çalışmalara dair güncel içerikler.",
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
  <div class="layout" translate="no">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
