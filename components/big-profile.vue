<script setup>

const down = ref(false);
const img = ref();

const animating = ref(false);
const isdown = ref(false);

import { gsap } from "gsap";

watch(down,() => {
    if(down.value){
        animating.value = true;
        gsap.to(img.value,{ scale: 0.8, duration: 0.3, onComplete(){animating.value = false;} });
    }else if(!animating.value){
        gsap.to(img.value,{ scale: 1, duration: 0.3 });
    }
});

watch(animating,() => {
    if(!animating.value && !down.value){
        gsap.to(img.value,{ scale: 1, duration: 0.3 });
    }
});

</script>

<template>
    <span class="scale-80 hidden"></span>
    <img ref="img" draggable="false" src="https://cdn.discordapp.com/avatars/441221465019514881/095475859f839898d73dbbaf4ccae4f8.webp?size=256" width="256" :class="`rounded-full opacity-80 hover:opacity-100 cursor-pointer hover:scale-110 active:scale-90 shadow-2xl`" style="transition: 300ms all;" alt=""></img>
</template>