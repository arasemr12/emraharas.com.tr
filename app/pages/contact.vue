<script setup>
import Swal from "sweetalert2";

const minSectionHeight = useState("minSectionHeight");

const widgetId = ref();
const token = ref();

let isDev = import.meta.dev;

const {public:{turnstileSiteKey}} = useRuntimeConfig();

onMounted(() => {
    widgetId.value = turnstile.render("#turnstile-container",{
        sitekey: isDev ? "1x00000000000000000000AA" : turnstileSiteKey,
        callback: (t) => {
            token.value = t;
        },
        "expired-callback": () => {
            token.value = null;
        },
    });
});

const email = ref();
const text = ref();
const loading = ref(false);

const submit = async() => {
    loading.value = true;

    try {
        const isExpired = turnstile.isExpired(widgetId.value);
        if(isExpired) return turnstile.reset(widgetId.value);

        let data = await $fetch('/api/contact',{
            method:"POST",
            body:{
                email:email.value,
                text:text.value,
                turnstile:token.value
            }
        });

        if(!data?.success) throw Error(data?.message || "Error!");
        loading.value = false;

        Swal.fire({
            title:"Contact form sent!",
            toast:true,
            position:"top-right",
            icon:"success",
            showConfirmButton:false,
            timer:3000,
            timerProgressBar:true,
        });
    } catch (error) {
        loading.value = false;

        Swal.fire({
            title:error?.message || "Error!",
            toast:true,
            position:"top-right",
            icon:"error",
            showConfirmButton:false,
            timer:3000,
            timerProgressBar:true,
        });

        turnstile.reset(widgetId.value);
    }
};

</script>

<template>
    <div class="h-full w-full flex flex-col items-center overflow-auto">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 blur-[30vh] z-10 opacity-50" style="background-image:linear-gradient(to right top,#4f46e5,#7c3aed,#9333ea,#c026d3,#db2777,#e11d48);"></div>
        <div class="lg:w-2/3 w-full h-auto flex flex-col z-20 pt-32 gap-3">
            <div class="w-full bg-gray-300/70 dark:bg-gray-800/70 border-2 py-2 px-4 border-gray-400/70 dark:border-gray-700/70 backdrop-blur-sm rounded flex flex-row items-center justify-between">
                <div class="flex flex-col items-start">
                    <span class="text-xl font-semibold mb-2">{{ $t("contact.contactme") }}</span>
                    <span>E-Mail: arasemr1234@protonmail.com</span>
                </div>
            </div>
            <div class="w-full bg-gray-300/70 dark:bg-gray-800/70 border-2 py-2 px-4 border-gray-400/70 dark:border-gray-700/70 backdrop-blur-sm rounded flex flex-row items-center justify-between">
                <form @submit.prevent="submit" class="flex flex-col items-start gap-3">
                    <span class="text-xl font-semibold">{{ $t("contact.contactform") }}</span>
                    <div class="flex flex-col items-start">
                        <label for="email">E-Mail</label>
                        <input v-model="email" type="email" placeholder="E-Mail" id="email">
                    </div>
                    <div class="flex flex-col items-start">
                        <label for="text">{{ $t("contact.text") }}</label>
                        <textarea class="resize transition-none" v-model="text" id="text" :placeholder="$t('contact.text')"></textarea>
                    </div>
                    <div>
                        <div id="turnstile-container"></div>
                    </div>
                    <button :class="`indigobtn ${loading ? 'loading' : ''}`" type="submit" :disabled="!email || !text || !token || loading">{{ $t("contact.submit") }}</button>
                </form>
            </div>
        </div>
    </div>
</template>