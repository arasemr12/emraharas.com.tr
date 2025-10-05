<script setup>

const route = useRoute();

const footer = ref();

const minSectionHeight = useState("minSectionHeight");

const calcMinSectionHeight = () => {
    minSectionHeight.value = window.innerHeight-footer.value.clientHeight;
    requestAnimationFrame(calcMinSectionHeight);
};

onMounted(() => {
    calcMinSectionHeight();
});

</script>

<template>
    <div class="layout dark">
        <Navbar v-if="!route.fullPath.includes('signal')"/>
        <div class="w-full grid" :style="`min-height: ${minSectionHeight || 100}${minSectionHeight ? 'px' : 'vh'};`">
            <slot/>
        </div>
        <div ref="footer" class="w-full py-4 px-4 bg-gray-900 text-white flex flex-col items-center gap-5">
            <div class="lg:w-2/3 w-full flex flex-row items-center gap-5 text-xl">
                <nuxt-link to="/blog">Blog</nuxt-link>
                <nuxt-link to="/contact">Contact</nuxt-link>
                <nuxt-link to="/privacy-policy">Privacy Policy</nuxt-link>
            </div>
        </div>
    </div>
</template>