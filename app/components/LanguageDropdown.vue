<script setup>

const dropdownId = ref();

const active = ref(false);

defineExpose({active});

const { locales, setLocale, locale } = useI18n();

onMounted(() => {
    dropdownId.value = Math.floor(Math.random()*Date.now());

    document.addEventListener("click",(e) => {
        if(!e.target || e.target.closest(`.d-${dropdownId.value}`)) return;

        active.value = false;
    });
});

</script>

<template>
    <div :class="`relative flex flex-col items-center gap-0 ml-4 d-${dropdownId} langd`">
        <div @click="active = !active" class="flex flex-row items-center gap-2 cursor-pointer">
            <img draggable="false" :src="`https://flagsapi.com/${getFlagCode(locale)}/flat/32.png`" alt="">
            <i class="fa-solid fa-caret-down"></i>
        </div>
        <div :class="`w-[150px] h-[200px] bg-gray-300/70 dark:bg-gray-800/70 border-2 border-gray-400/70 dark:border-gray-700/70 rounded backdrop-blur-sm absolute left-0 flex flex-col overflow-auto items-start duration-300 langdslot ${active ? 'opacity-100 visible top-[140%]' : 'opacity-0 invisible top-[100%]'}`">
            <!--left-1/2 -translate-x-1/2-->
            <slot/>
        </div>
    </div>
</template>
