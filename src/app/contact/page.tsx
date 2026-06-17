import { Metadata } from "next";
import ContactInner from "./inner";

export const metadata: Metadata = {
  alternates:{
    canonical:"/contact"
  }
};

export default async function Contact() {
    return(
        <ContactInner/>
    )
}
