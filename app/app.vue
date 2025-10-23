<script setup>

const { locales, setLocale, localeProperties } = useI18n();

const i18nHead = useLocaleHead();

const route = useRoute();

useSeoMeta({
  title:"Emrah Aras - arasemr1234",
  ogTitle:"Emrah Aras - arasemr1234",
  description:"Emrah Aras arasemr1234 kişisel web site. Yazılım, teknoloji ve profesyonel çalışmalara dair güncel içerikler.",
  ogDescription:"Emrah Aras arasemr1234 kişisel web site. Yazılım, teknoloji ve profesyonel çalışmalara dair güncel içerikler.",
  ogType:"website",
  ogUrl:`https://emraharas.com.tr${route.fullPath}`,
  author:"arasemr1234",
});

useHead(() => ({
  htmlAttrs:{
    lang:i18nHead.value.htmlAttrs.lang
  },
  meta: [...(i18nHead.value.meta || [])],
  link: [...(i18nHead.value.link) || []]
}));

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
