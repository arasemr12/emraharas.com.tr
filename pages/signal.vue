<script setup>

const main = ref(null);
const canvas = ref(null);

const x = ref(0);
const y = ref(0);

const xDirection = ref(false);
const yDirection = ref(false);

const dvd = ref(false);
const dvdWidth = 256;
const dvdHeight = 119.5;

const speed = 2;

const animate = () => {
    if(x.value+dvdWidth > window.innerWidth){
        xDirection.value = true;
    };

    if(x.value-1 < 0){
        xDirection.value = false;
    };

    if(y.value-1 < 0){
        yDirection.value = false;
    };

    if(y.value+dvdHeight > window.innerHeight){
        yDirection.value = true;
    }

    if(xDirection.value){
        x.value-=speed;
    }else{
        x.value+=speed;
    }

    if(yDirection.value){
        y.value-=speed;
    }else{
        y.value+=speed;
    }

    const ctx = canvas.value.getContext("2d");

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    /*ctx.beginPath();
    ctx.rect(x.value, y.value, 150, 100);
    ctx.fillStyle = "#fff";
    ctx.fill();*/

    ctx.drawImage(dvd.value,x.value,y.value,dvdWidth,dvdHeight);

    requestAnimationFrame(animate);
};

const initialize = () => {
    let c = document.createElement("canvas");
    c.width = window.innerWidth;
    c.height = window.innerHeight;

    c.style.width = "100%";
    c.style.height = "100%";

    main.value.appendChild(c);

    canvas.value = c;

    animate();
};

onMounted(() => {
    const image = new Image(256, 119.5);

    image.src = "/dvd.png";

    dvd.value = image;

    image.onload = initialize;
});

</script>

<template>
    <div @contextmenu.prevent ref="main" class="w-full h-full bg-black overflow-hidden select-none"></div>
</template>
