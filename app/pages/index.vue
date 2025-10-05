<script setup>

</script>

<template>
    <div class="w-full h-full flex flex-col justify-between bg-gradient-to-tr from-purple-200/50 to-blue-200/50">
        <div class="w-full pt-32 flex items-center justify-center">
            <div class="lg:w-2/3 w-full h-full flex flex-col items-start p-4">
                <h1 class="lg:text-6xl text-5xl font-bold mb-4">Emrah Aras (arasemr1234)</h1>
                <span class="mb-8">Self taught web & desktop developer</span>
                <div class="flex flex-row items-center gap-10 mb-8">
                    <div class="flex flex-col items-start">
                        <span class="text-2xl font-semibold">Right Now</span>
                        <span>Freelance</span>
                    </div>
                    <div class="flex flex-col items-start">
                        <span class="text-2xl font-semibold">Location</span>
                        <span>Turkiye and Remote</span>
                    </div>
                </div>
                <div class="mb-8 flex flex-row items-center gap-5">
                    <a href="https://github.com/arasemr12" target="_blank" class="opacity-70 hover:opacity-100 hover:-translate-y-1 duration-300">
                        <i class="fa-brands fa-github fa-2x"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/emrah-aras" target="_blank" class="opacity-70 hover:opacity-100 hover:-translate-y-1 duration-300">
                        <i class="fa-brands fa-linkedin fa-2x"></i>
                    </a>
                    <a href="https://medium.com/@arasemr1234" target="_blank" class="opacity-70 hover:opacity-100 hover:-translate-y-1 duration-300">
                        <i class="fa-brands fa-medium fa-2x"></i>
                    </a>
                    <a href="mailto:arasemr1234@protonmail.com" class="opacity-70 hover:opacity-100 hover:-translate-y-1 duration-300">
                        <i class="fa-solid fa-envelope fa-2x"></i>
                    </a>
                    <a href="https://x.com/arasemr1234" target="_blank" class="opacity-70 hover:opacity-100 hover:-translate-y-1 duration-300">
                        <i class="fa-brands fa-x-twitter fa-2x"></i>
                    </a>
                </div>
                <nuxt-link class="py-2 px-4 border-2 border-gray-900 hover:bg-gray-900 hover:text-white duration-300 rounded" to="/contact">Contact Me</nuxt-link>
            </div>
        </div>
        <div class="w-full bg-green-200/70 flex items-center justify-center py-12">
            <div class="lg:w-2/3 w-full h-full flex lg:flex-row flex-col items-center justify-between gap-5 lg:gap-0 p-4">
                <span class="text-8xl font-bold w-1/2">Shall We?</span>
                <div class="flex flex-col items-start gap-5">
                    <span>Passionate about building fast, accessible, and modern apps - from web to desktop. Want to create something great together?</span>
                    <nuxt-link to="/contact" class="py-2 px-4 border-2 border-gray-900 hover:bg-gray-900 hover:text-white duration-300 rounded flex flex-row items-center gap-3">
                        <i class="fa-solid fa-envelope"></i>
                        <span>Email Me</span>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>