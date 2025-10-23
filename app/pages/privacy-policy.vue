<script setup>

import {marked} from "marked";

const { locales, setLocale, locale } = useI18n();

const minSectionHeight = useState("minSectionHeight");

let langs = {
    tr:`# Gizlilik Politikası

**Yürürlülük Tarihi:** 14 Ekim 2025

Bu web sitesi gizliliğinize saygı duyar.  
Web sitesi, ziyaretçilerden herhangi bir kişisel veri **toplamaz**, **işlemez** veya **paylaşmaz**.

## 1. Veri Toplanmaz
Web sitesi; ad, e-posta adresi, IP adresi veya çerez gibi hiçbir kişisel bilgiyi toplamaz.  
Ziyaretiniz tamamen anonimdir.

## 2. Çerez Kullanımı
Bu web sitesi yalnızca **çoklu dil desteği** sağlamak amacıyla çerez kullanır.  
Bu çerezler, seçtiğiniz dili hatırlamak için kullanılır ve **izleme, analiz veya reklam amacıyla** kullanılmaz.

## 3. Harici Bağlantılar
Bu web sitesinde harici web sitelerine bağlantılar bulunabilir.  
Bu sitelerin gizlilik uygulamalarından veya içeriklerinden sorumlu değiliz.

## 4. Bu Politikadaki Değişiklikler
Gelecekte bu gizlilik politikasında değişiklik yapılırsa, güncellemeler bu sayfada yayımlanacaktır.
`,
    en:`# Privacy Policy

**Effective Date:** October 14, 2025

This website respects your privacy.  
Website do **not** store, process, or share any personal data from visitors.

## 1. No Data Collection
Website do not collect any personal information such as names, email addresses, IP addresses, or cookies.  
Your visit is completely anonymous.

## 2. Cookies
This website uses cookies **only to support multi-language functionality**.  
These cookies are used to remember your language preference and are **not used for tracking, analytics, or advertising**.

## 3. External Links
If this website contains links to external websites, please note that we are not responsible for the privacy practices or content of those sites.

## 4. Changes to This Policy
If this privacy policy changes in the future, updates will be posted on this page.
`
};

let pc = ref(langs[locale.value]);

let html = ref(marked.parse(pc.value));

watch(locale,(val) => {
    pc.value = langs[val];
    html.value = marked.parse(pc.value);
});

</script>

<template>
    <div class="h-auto w-full flex items-center justify-center overflow-auto">
        <div :style="`min-height: ${minSectionHeight || 100}${minSectionHeight ? 'px' : 'vh'};`" class="lg:w-2/3 w-full h-auto flex flex-col items-start z-20 pt-32 gap-3">
            <article class="prose dark:prose-invert mb-32" v-html="html"></article>
        </div>
    </div>
</template>