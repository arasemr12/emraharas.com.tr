<script setup>

import { format } from "date-fns";

const {spotify,refreshSpotify} = defineProps(["spotify","refreshSpotify"]);

const currentTime = ref();
const progress = ref(0);

const setCurrentTime = () => {
    if(spotify.timestamps.end-Date.now() < 1){
        refreshSpotify();
    }else{
        currentTime.value = format(new Date(Date.now()-spotify.timestamps.start),"m:ss");
    };

    progress.value = (Date.now()-spotify.timestamps.start)/(spotify.timestamps.end-spotify.timestamps.start)*100;
};

if(spotify){
    setCurrentTime();
    setInterval(setCurrentTime, 1000);
};

</script>

<template>
    <div v-if="spotify" class="fixed bottom-4 right-4 py-4 px-6 bg-black/50 rounded-lg backdrop-blur-sm z-50 flex flex-row items-start gap-3 min-w-[300px]">
        <i class="fa-brands fa-spotify absolute top-2 left-2 text-green-600 opacity-30 hover:opacity-100 duration-300 fa-2x"></i>
        <img class="rounded" width="64" draggable="false" :src="spotify.album_art_url" alt="">
        <div class="flex flex-col items-start w-full">
            <span class="text-lg font-bold">{{ spotify.song }}</span>
            <span>{{ spotify.artist }}</span>
            <div class="flex flex-row items-center gap-2 w-full">
                <span class="text-xs font-semibold">{{ currentTime }}</span>
                <div class="w-full h-[2px] bg-white/40 rounded-full">
                    <div class="h-[2px] bg-white rounded-full duration-300 transition-all" :style="`width: ${progress}%;`"></div>
                </div>
                <span class="text-xs font-semibold">{{ format(new Date(spotify.timestamps.end-spotify.timestamps.start),"m:ss") }}</span>
            </div>
        </div>
    </div>
</template>