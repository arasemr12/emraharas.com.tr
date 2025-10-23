import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules:["@nuxtjs/i18n", "@nuxtjs/sitemap"],
  vite:{
    plugins:[
      tailwindcss(),
    ]
  },
  app:{
    head:{
      link:[
        {
          rel:"stylesheet",
          href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css",
          integrity:"sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==",
          crossorigin:"anonymous",
          referrerpolicy:"no-referrer"
        },
      ],
      script:[
        {
          src:"https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",
          defer:true,
        }
      ]
    }
  },
  i18n:{
    baseUrl:"https://emraharas.com.tr",
    strategy:"no_prefix",
    defaultLocale:"en",
    locales:[
      {
        code:"en",
        name:"English",
        file:"en.json",
        language:"en_GB"
      },
      {
        code:"tr",
        name:"Türkçe",
        file:"tr.json",
        language:"tr_TR"
      },
    ],
    bundle:{
      optimizeTranslationDirective:false,
    }
  },
  sitemap:{
    enabled:true,
    defaults:{
      lastmod: new Date().toISOString().split("T")[0],
      priority: 0.5,
      changefreq: 'daily'
    },
  },
  site:{
    enabled:true,
    url:"https://emraharas.com.tr",
    name:"Emrah Aras - arasemr1234",
  },
  runtimeConfig:{
    public:{
      turnstileSiteKey:"0x4AAAAAAB48WLX3o4eScfEc"
    }
  }
})