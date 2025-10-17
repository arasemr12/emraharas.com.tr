<script setup>

const nav = ref(false);

const route = useRoute();

watch(
  () => route.path,
  () => {
    nav.value = false;
  },
);

const { locales, setLocale, locale } = useI18n();

const languageDropdown = ref();
const mobileLanguageDropdown = ref();

const changeLang = (lang) => {
    setLocale(lang);
    languageDropdown.value.active = false;
    mobileLanguageDropdown.value.active = false;
};

onMounted(() => {    
    document.addEventListener("click",(e) => {
        if(!e.target || e.target.closest(`.mobilenav`) || e.target.classList.contains("mobilebtn")) return;

        nav.value = false;
    });
});

</script>

<template>
    <div class="fixed top-4 left-0 w-full hidden lg:flex items-center justify-center z-40">
        <div class="w-3/4 py-2 px-4 bg-gray-300/70 rounded-full border-2 border-gray-400/70 backdrop-blur-sm flex flex-row items-center justify-between">
            <nuxt-link class="font-semibold" to="/">Emrah Aras</nuxt-link>
            <div class="flex flex-row items-center gap-3">
                <nuxt-link to="/" class="navbtn">{{ $t("navbar.home") }}</nuxt-link>
                <nuxt-link to="/contact">{{ $t("navbar.contactme") }}</nuxt-link>
                <!--<nuxt-link to="/certificates">Certificates</nuxt-link>-->
                <nuxt-link to="/projects">{{ $t("navbar.projects") }}</nuxt-link>
                <nuxt-link to="/blog">{{ $t("navbar.blog") }}</nuxt-link>
                <LanguageDropdown ref="languageDropdown">
                    <button v-for="locale in locales" @click="changeLang(locale.code)" class="hover:bg-gray-400 duration-300 py-2 px-4 rounded w-full flex flex-row items-center gap-3 cursor-pointer">
                        <img draggable="false" :src="`https://flagsapi.com/${getFlagCode(locale.code)}/flat/32.png`" alt="">
                        <span class="font-semibold">{{locale.name}}</span>
                    </button>
                </LanguageDropdown>
            </div>
        </div>
    </div>
    <i class="fa-solid fa-bars fixed top-2 left-2 fa-2x block lg:opacity-0 lg:invisible lg:hidden z-50 mobilebtn" :style="`${nav ? 'color: #fff;' : ''}`" @click="nav = !nav"></i>
    <div :class="`fixed top-0 w-1/2 h-full duration-300 ${nav ? 'left-0' : '-left-full'} bg-gray-900/80 backdrop-blur-sm text-white z-40 flex flex-col items-start pt-20 overflow-auto mobilenav`">
        <span class="text-xl font-semibold mb-4 w-full text-center">Emrah Aras</span>
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/contact">Contact Me</nuxt-link>
        <!--<nuxt-link to="/certificates">Certificates</nuxt-link>-->
        <nuxt-link to="/projects">Projects</nuxt-link>
        <nuxt-link to="/blog">Blog</nuxt-link>
        <LanguageDropdown ref="mobileLanguageDropdown" class="mt-4">
            <button v-for="locale in locales" @click="changeLang(locale.code)" class="hover:bg-gray-400 duration-300 py-2 px-4 rounded w-full flex flex-row items-center gap-3 cursor-pointer">
                <img draggable="false" :src="`https://flagsapi.com/${getFlagCode(locale.code)}/flat/32.png`" alt="">
                <span class="font-semibold">{{locale.name}}</span>
            </button>
        </LanguageDropdown>
    </div>
</template>