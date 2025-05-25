<script setup>

const pdf = ref(false);

</script>

<template>
    <div class="layout flex items-center justify-center select-none overflow-auto">
        <div v-if="pdf" class="fixed top-0 left-0 w-screen h-screen bg-black/30 flex items-center justify-center z-40">
            <div class="lg:w-2/3 lg:h-2/3 w-full h-full bg-gray-900 border-2 border-gray-800 rounded-lg flex flex-col items-start">
                <div class="w-full py-2 px-4 flex flex-row items-center justify-between">
                    <span class="text-xl font-semibold">Certificate</span>
                    <button @click="pdf = false" class="bg-red-600 hover:bg-red-800 duration-300 cursor-pointer py-2 px-4 rounded">X</button>
                </div>
                <iframe class="w-full h-full" src="/web/viewer.html?file=/Node.js_ile_Web_Programlama_Sertifika.pdf" frameborder="0"></iframe>
            </div>
        </div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 blur-[12vh] z-10 opacity-50" style="background-image:linear-gradient(to right top,#4f46e5,#7c3aed,#9333ea,#c026d3,#db2777,#e11d48);"></div>
        <div class="lg:w-2/3 w-full h-auto min-h-full flex flex-col z-20 pt-32 gap-3">
            <div @click="pdf = true" class="w-full bg-gray-800/70 hover:bg-gray-700/70 duration-300 border-2 py-2 px-4 border-gray-600/70 cursor-pointer backdrop-blur-sm rounded flex flex-col items-start gap-3">
                <span class="text-xl font-semibold">NodeJS ile web programlama - 03.08.2023</span>
                <button>Inspect</button>
            </div>
        </div>
    </div>
</template>