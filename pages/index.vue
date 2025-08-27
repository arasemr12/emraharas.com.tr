<script setup>

import { annotate } from 'rough-notation';
import {gsap} from "gsap";
import axios from 'axios';

const text = ref(null);
const main = ref(null);
const rotate = ref(0);
const date = ref(Date.now());
const timer = ref(null);

const spotify = ref();

const scaleable = () => {
    let scalable = document.querySelectorAll('.scale--js');
    let margin = 50;

    for (var i = 0; i < scalable.length; i++) {
        let scalableContainer = scalable[i].parentNode;

        let scalableContainerWidth = scalableContainer.offsetWidth - margin;
        let scalableWidth = scalable[i].offsetWidth;

        //scalable[i].style.transform = 'scale(' + scalableContainerWidth / scalableWidth + ')';
        let currentFontSize = parseFloat(window.getComputedStyle(scalable[i]).fontSize);

        scalable[i].style["font-size"] = `${currentFontSize*(scalableContainerWidth / scalableWidth)}px`;
        //scalable[i].style["line-height"] = `${currentFontSize*(scalableContainerWidth / scalableWidth)-window.innerHeight/20}px`;
        //scalableContainer.style.height = scalable[i].getBoundingClientRect().height + 'px';

    };

    requestAnimationFrame(scaleable);
};

const scroll = () => {
    rotate.value = main.value.scrollTop;
};

onMounted(() => {
    scaleable();

    //window.addEventListener("resize",scaleable);

    const annotation = annotate(text.value, { type: 'highlight' });
    annotation.color = "blue";
    //annotation.show();

    date.value = Date.now();

    timer.value = setInterval(() => {
        date.value = Date.now();
    }, 100);

    refreshSpotify();

    //annotation.show();
});

const refreshSpotify = async() => {
    try {
        let {data} = await axios.get("https://api.lanyard.rest/v1/users/441221465019514881");
        data = data.data;
        console.log(data);
        spotify.value = data?.spotify;
    } catch (error) {
        
    }
};

onUnmounted(() => {
    clearInterval(timer.value);
});

const maxMove = 20;

const moveX = ref(0);
const moveY = ref(0);

const move = (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const offsetX = (e.clientX - centerX) / centerX;
    const offsetY = (e.clientY - centerY) / centerY;
    
    const mx = offsetX * maxMove;
    const my = offsetY * maxMove;

    moveX.value = mx;
    moveY.value = my;
};

</script>

<template>
    <div @contextmenu.prevent @mousemove="move" @scroll="scroll" class="w-full h-screen overflow-auto select-none" ref="main">
        <div class="w-full h-screen flex flex-col items-center pt-48 relative">
            <Glow/>
            <div class="z-10 absolute top-44 flex flex-col items-center w-full">
                <span class="scale--js bebas-neue font-bold whitespace-nowrap leading-12 lg:leading-20 xl:leading-26">Emrah "arasemr1234" Aras</span>
                <div class="flex items-end justify-end w-full pr-[30px]">
                    <span ref="text">Self taught web & desktop developer</span>
                </div>
            </div>
            <img draggable="false" id="rock" src="/rock.svg" class="absolute z-20 left-0 top-28" :style="`top: ${112}px;`" width="64" alt="">
            <img draggable="false" src="/worm.webp" class="absolute z-0" :style="`right: ${384-moveX}px; top: ${192+moveY}px`" width="64" alt="">
            <div class="z-20" :style="`rotate: ${rotate*0.8}deg;`">
                <BigProfile/>
            </div>
            <div class="w-full flex flex-col items-end mt-4">
                <div class="flex flex-col items-end lg:pr-4 z-10 w-full lg:w-1/3">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt nobis nesciunt recusandae maxime commodi eius, nam ipsa fuga porro, quos reprehenderit voluptatum ut molestias ex praesentium similique facere ducimus nostrum!
                </div>
            </div>
        </div>
        <div class="w-full h-screen flex flex-col items-center pt-32">
            <span>hi</span>
            <div v-if="false" class="flex flex-row items-center gap-3 text-3xl font-thin">
                <span>I'am</span>
                <div class="relative h-[36px] w-[36px] overflow-hidden">
                    <span class="absolute -top-2">17</span>
                    <span class="absolute -bottom-5">16</span>
                </div>
                <span>years old. My birth date is: 07.01.2009</span>
            </div>
        </div>
        <div class="w-full fixed bottom-2 left-2 flex flex-row items-center">
            <span class="opacity-50">{{ new Date(date).toLocaleDateString("tr",{hour:"numeric",minute:"numeric",second:"numeric"}) }}</span>
        </div>
        <SpotifyBox v-if="spotify" :spotify="spotify" :refreshSpotify="refreshSpotify"/>
    </div>
</template>
