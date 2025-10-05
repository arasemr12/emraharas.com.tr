<script setup>

const minSectionHeight = useState("minSectionHeight");

const al = () => {
    alert("form not active right now. send an email");
};

</script>

<template>
    <div class="h-full w-full flex flex-col items-center overflow-auto">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 blur-[30vh] z-10 opacity-50" style="background-image:linear-gradient(to right top,#4f46e5,#7c3aed,#9333ea,#c026d3,#db2777,#e11d48);"></div>
        <div class="lg:w-2/3 w-full h-auto flex flex-col z-20 pt-32 gap-3">
            <div class="w-full bg-gray-300/70 border-2 py-2 px-4 border-gray-400/70 backdrop-blur-sm rounded flex flex-row items-center justify-between">
                <div class="flex flex-col items-start">
                    <span class="text-xl font-semibold mb-2">Contact Me</span>
                    <span>Email: arasemr1234@protonmail.com</span>
                </div>
            </div>
            <div class="w-full bg-gray-300/70 border-2 py-2 px-4 border-gray-400/70 backdrop-blur-sm rounded flex flex-row items-center justify-between">
                <div class="flex flex-col items-start gap-3">
                    <span class="text-xl font-semibold">Contact Form</span>
                    <div class="flex flex-col items-start">
                        <label for="email">E-Mail</label>
                        <input type="email" placeholder="E-Mail" id="email">
                    </div>
                    <div class="flex flex-col items-start">
                        <label for="text">Text</label>
                        <textarea id="text" placeholder="Text"></textarea>
                    </div>
                    <button class="indigobtn disabled" @click="al">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>