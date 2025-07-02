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

const colors = [
    "#be00ff",
    "#00feff",
    "#ff8300",
    "#0026ff",
    "#fffa01",
    "#ff2600",
    "#ff008b",
    "#25ff01",
];

const i = ref(0);

const animate = () => {
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;

    canvas.value.style.width = "100%";
    canvas.value.style.height = "100%";

    if(x.value+dvdWidth > window.innerWidth){
        xDirection.value = true;
        i.value++;
    };

    if(x.value-1 < 0){
        xDirection.value = false;
        i.value++;
    };

    if(y.value-1 < 0){
        yDirection.value = false;
        i.value++;
    };

    if(y.value+dvdHeight > window.innerHeight){
        yDirection.value = true;
        i.value++;
    };

    if(i.value > 7) i.value = 0;

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

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.fillStyle = colors[i.value];
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.globalCompositeOperation = "destination-in";
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

    document.addEventListener("keydown",(e) => {
        if(e.code != "ArrowRight") return;
        
        i.value++;
        if(i.value > 7) i.value = 0;
    });
});

</script>

<template>
    <div @contextmenu.prevent ref="main" class="w-full h-full bg-black overflow-hidden select-none"></div>
</template>
