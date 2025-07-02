<script setup>

const route = useRoute();

</script>

<template>
    <div class="layout dark">
        <Navbar v-if="!route.fullPath.includes('signal')"/>
        <slot/>
    </div>
</template>