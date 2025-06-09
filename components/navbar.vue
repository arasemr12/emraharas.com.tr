<script setup>

const nav = ref(false);

</script>

<template>
    <div class="fixed top-4 left-0 w-full hidden lg:flex items-center justify-center z-40">
        <div class="w-3/4 py-2 px-4 bg-gray-800/70 rounded-full border-2 border-gray-700/70 backdrop-blur-sm flex flex-row items-center justify-between">
            <nuxt-link class="font-semibold" to="/">arasemr1234</nuxt-link>
            <div class="flex flex-row items-center gap-3">
                <nuxt-link to="/" class="navbtn">Home</nuxt-link>
                <nuxt-link to="/contact-me">Contact Me</nuxt-link>
                <!--<nuxt-link to="/certificates">Certificates</nuxt-link>-->
                <nuxt-link to="/projects">Projects</nuxt-link>
                <nuxt-link to="/blog">Blog</nuxt-link>
            </div>
        </div>
    </div>
    <i class="fa-solid fa-bars fixed top-2 left-2 fa-2x block lg:opacity-0 lg:invisible lg:hidden z-50" @click="nav = !nav"></i>
    <div class="fixed top-0 left-0 w-full h-full bg-black z-40 flex flex-col items-center pt-24 overflow-auto" v-if="nav">
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/contact-me">Contact Me</nuxt-link>
        <!--<nuxt-link to="/certificates">Certificates</nuxt-link>-->
        <nuxt-link to="/projects">Projects</nuxt-link>
        <nuxt-link to="/blog">Blog</nuxt-link>
    </div>
</template>