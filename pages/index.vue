<script setup>
import axios from 'axios';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInSeconds, format } from 'date-fns';

const birthDate = new Date(2009,0,7,0,0,0,0);

const getHowOldIAm = () => {
    let now = new Date();

    let age = now.getFullYear()-birthDate.getFullYear();

    let m = now.getMonth()-birthDate.getMonth();

    if(m < 0 || (m == 0 && now.getDate() < birthDate.getDate())) age--;

    return age;
};

let myAge = ref(getHowOldIAm());

const birthday = new Date(new Date().getFullYear(), 0, 7, 0, 0, 0); // 07.01. Saat 20:09
const now = Date.now();

if(Date.now() > birthday){
    birthday.setFullYear(new Date().getFullYear()+1);
};

/*const months = ref(differenceInMonths(birthday, now));
const days = ref(differenceInDays(birthday, now) % 30);
const hours = ref(differenceInHours(birthday, now) % 24);
const minutes = ref(differenceInMinutes(birthday, now) % 60);
const seconds = ref(differenceInSeconds(birthday, now) % 60);*/

const months = ref();
const days = ref();
const hours = ref();
const minutes = ref();
const seconds = ref();

const updateTimeInterval = ref(null);

const mounted = ref();
const ip = ref();
const spotify = ref();

const updateTime = () => {
    const now = Date.now();
    months.value = differenceInMonths(birthday, now);
    days.value = differenceInDays(birthday, now) % 30;
    hours.value = differenceInHours(birthday, now) % 24;
    minutes.value = differenceInMinutes(birthday, now) % 60;
    seconds.value = differenceInSeconds(birthday, now) % 60;
};

const audioPlaying = ref(false);
const audio = ref(null);

onMounted(() => {
    /*audio.value = new Audio("/riversolo.mp3");
    audio.value.addEventListener("canplay",() => {
        audioIsPlayable.value = true;
    });*/

    mounted.value = true;

    updateTime();
    updateTimeInterval.value = setInterval(updateTime, 1000);

    (async() => {
        let {data} = await axios.get("/api/ip");
        ip.value = data.ip;
    })();

    (async() => {
        try {
            let {data} = await axios.get("https://api.lanyard.rest/v1/users/441221465019514881");
            data = data.data;
            console.log(data);
            spotify.value = data?.spotify;
        } catch (error) {
            
        }
    })();
});

onUnmounted(() => {
    clearInterval(updateTimeInterval.value);
});

const play = () => {
    audioPlaying.value = true;
    audio.value.play();
};

const pause = () => {
    audioPlaying.value = false;
    audio.value.pause();
};

const secret = () => {
    window.location.href = '/signal';
};

</script>

<template>
    <div class="layout flex items-center justify-center select-none overflow-auto">
        <audio src="/fastlife.mp3" ref="audio" controls="false" class="opacity-0 invisible hidden" loop></audio>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 blur-[12vh] z-10 opacity-50" style="background-image:linear-gradient(to right top,#4f46e5,#7c3aed,#9333ea,#c026d3,#db2777,#e11d48);"></div>
        <div class="lg:w-2/3 w-full h-auto min-h-full flex flex-col z-20 pt-32 gap-3">
            <div class="w-full bg-gray-800/70 border-2 py-2 px-4 border-gray-700/70 backdrop-blur-sm rounded flex flex-row items-center justify-between">
                <div class="flex flex-col items-start">
                    <span class="text-xl font-semibold">Emrah Aras</span>
                    <span class="text-gray-400">Self taught web & desktop developer</span>
                    <div class="flex flex-row items-center gap-1 text-yellow-600 text-xs">
                        <i class="fa-solid fa-moon translate-y-[1px]"></i>
                        <span>Idle</span>
                    </div>
                    <div class="flex flex-row items-center gap-3 mt-2">
                        <i v-if="!audioPlaying" class="fa-solid fa-play cursor-pointer" @click="play"></i>
                        <i v-else class="fa-solid fa-pause cursor-pointer" @click="pause"></i>
                        <span>{{ format(new Date((audio?.currentTime || 0) * 1000),"mm:ss") }}/{{ format(new Date((audio?.duration || 0) * 1000),"mm:ss") }}</span>
                    </div>
                </div>
                <img src="/1111.png" width="64" class="rounded-full hover:scale-110 duration-300" draggable="false" alt="">
            </div>
            <div class="w-full bg-gray-800/70 border-2 py-2 px-4 border-gray-700/70 backdrop-blur-sm rounded flex flex-col">
                <span class="font-semibold">My Birth Date 🎉</span>
                <span>{{ birthDate.toLocaleDateString("tr") }}</span>
                <span>Remaining Time: {{ months }} months {{ days }} days {{ hours }} hours {{ minutes }} minutes and {{ seconds }} seconds</span>
                <!--<span class="text-xs">{{myAge}} years old</span>-->
            </div>
            <a :href="`${spotify ? `https://open.spotify.com/track/${spotify.track_id}` : ''}`" target="_blank" class="w-full bg-gray-800/70 hover:bg-gray-700/70 duration-300 cursor-pointer border-2 py-2 px-4 border-gray-700/70 backdrop-blur-sm rounded flex flex-col">
                <div class="w-full flex flex-row items-center justify-between">
                    <div class="flex flex-row items-center gap-1">
                        <i class="fa-brands fa-spotify"></i>
                        <span class="font-semibold">Active Spotify Activity</span>
                    </div>
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </div>
                <span v-if="spotify">Listening {{ spotify.song }} from {{ spotify.artist }}</span>
                <span v-else>No Activity</span>
            </a>
            <div class="w-full bg-gray-800/70 border-2 py-2 px-4 border-gray-700/70 backdrop-blur-sm rounded flex flex-col">
                <div class="w-full flex flex-row items-center justify-between">
                    <div class="flex flex-row items-center gap-1">
                        <i class="fa-solid fa-address-book"></i>
                        <span class="font-semibold">Contact Me</span>
                    </div>
                    <div class="flex flex-row items-center gap-3">
                        <a class="socialmediaicon" href="https://www.instagram.com/arasemr1234" target="_blank">
                            <i class="fa-brands fa-instagram"></i>
                        </a>
                        <a class="socialmediaicon" href="https://x.com/arasemr1234" target="_blank">
                            <i class="fa-brands fa-x-twitter"></i>
                        </a>
                        <a class="socialmediaicon" href="http://github.com/arasemr12/" target="_blank">
                            <i class="fa-brands fa-github"></i>
                        </a>
                    </div>
                </div>
                <span>arasemr1234@protonmail.com</span>
            </div>
            <div class="w-full flex flex-row items-center justify-between text-gray-400">
                <span v-if="mounted">{{ new Date().toLocaleDateString("tr",{
                    hour:"numeric",
                    minute:"numeric",
                    second:"numeric",
                }) }}</span>
                <span v-if="ip">{{ ip }}</span>
            </div>
            <!--<span @click="secret" class="z-50 fixed bottom-2 left-1/2 -translate-x-1/2 opacity-30 cursor-pointer">esnek gacı sandım onu balerin ah</span>-->
        </div>
    </div>
</template>