import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FaEnvelope, FaGithub, FaLinkedin, FaMedium, FaMediumM } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export const metadata: Metadata = {
  alternates:{
    canonical:"/"
  }
};

export default function HomePage() {
  const t = useTranslations('*');

  return (
    <>
      <div className="w-full h-full gap-12 flex flex-col justify-between not-dark:bg-gradient-to-tr from-purple-200/50 to-blue-200/50 dark:bg-gray-900">
        <div className="w-full pt-32 flex items-center justify-center">
          <div className="lg:w-2/3 w-full h-full flex flex-col items-start p-4">
            <h1 className="lg:text-6xl text-5xl font-bold mb-4">Emrah Aras (arasemr1234)</h1>
            <span className="mb-8">Self taught web & desktop developer</span>
            <div className="flex flex-row items-center gap-10 mb-8">
              <div className="flex flex-col items-start">
                <span className="text-2xl font-semibold">{ t("index.rightnow") }</span>
                <span>Freelance</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-2xl font-semibold">{ t("index.location.title") }</span>
                <span>{ t("index.location.value") }</span>
              </div>
            </div>
            <div className="mb-8 flex flex-row items-center gap-5 socials">
              <a href="https://github.com/arasemr12" target="_blank" className="opacity-70 hover:opacity-100 hover:-translate-y-1 duration-300">
                <FaGithub size={32}/>
              </a>
              <a href="https://www.linkedin.com/in/emrah-aras" target="_blank" className="opacity-70 hover:opacity-100 hover:-translate-y-1 duration-300">
                <FaLinkedin size={32}/>
              </a>
              <a href="https://medium.com/@arasemr1234" target="_blank" className="opacity-70 hover:opacity-100 hover:-translate-y-1 duration-300">
                <FaMedium size={32}/>
              </a>
              <a href="mailto:arasemr1234@protonmail.com" className="opacity-70 hover:opacity-100 hover:-translate-y-1 duration-300">
                <FaEnvelope size={32}/>
              </a>
              <a href="https://x.com/arasemr1234" target="_blank" className="opacity-70 hover:opacity-100 hover:-translate-y-1 duration-300">
                <FaXTwitter size={32}/>
              </a>
            </div>
            <Link className="inlinebtn" href="/contact">{ t("contactme") }</Link>
          </div>
        </div>
        <div className="w-full bg-green-200/70 dark:bg-teal-800/70 flex items-center justify-center py-12">
          <div className="lg:w-2/3 w-full h-full flex lg:flex-row flex-col items-center justify-between gap-5 lg:gap-0 p-4">
            <span className="text-7xl font-bold lg:w-1/2">{ t("swallwe.title") }</span>
            <div className="flex flex-col items-start gap-5">
              <span>{ t("swallwe.text") }</span>
              <Link href="/contact" className="group inlinebtn flex flex-row items-center gap-3">
                <FaEnvelope/>
                <span>{ t("emailme") }</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
