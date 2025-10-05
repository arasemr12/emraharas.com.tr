<script setup>

import {marked} from "marked";

const minSectionHeight = useState("minSectionHeight");

let html = ref(marked.parse(`# Privacy Policy

**Effective Date:** October 4, 2025

This website respects your privacy.  
Website do **not** store, process, or share any personal data from visitors.

## 1. No Data Collection
Website do not collect any personal information such as names, email addresses, IP addresses, or cookies.  
Your visit is completely anonymous.

## 2. No Cookies
We do not use cookies or any similar technologies for tracking or personalization.

## 3. External Links
If this website contains links to external websites, please note that we are not responsible for the privacy practices or content of those sites.

## 4. Changes to This Policy
If this privacy policy changes in the future, updates will be posted on this page.
`));

</script>

<template>
    <div class="h-auto w-full flex items-center justify-center overflow-auto">
        <div :style="`min-height: ${minSectionHeight || 100}${minSectionHeight ? 'px' : 'vh'};`" class="lg:w-2/3 w-full h-auto flex flex-col items-start z-20 pt-32 gap-3">
            <article class="prose mb-32" v-html="html"></article>
        </div>
    </div>
</template>