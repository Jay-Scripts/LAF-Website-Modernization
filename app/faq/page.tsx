import type { Metadata } from "next";
import { HeartDoodle } from "@/components/BrandHearts";
import FAQAccordion, { type FAQGroup } from "@/components/FAQAccordion";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers about Little Ark Foundation programs, donations, volunteering, and support services.",
  alternates: { canonical: "/faq" },
};

const faqGroups = [
  {
    category: "About Little Ark",
    items: [
      {
        question: "Who does Little Ark Foundation support?",
        answer:
          "Little Ark Foundation supports pediatric patients with cancer, thalassemia, and other critical illnesses, along with their families and caregivers.",
      },
      {
        question: "What services does Little Ark Foundation provide?",
        answer:
          "Little Ark provides temporary housing, everyday meals, activities, transportation, resources and responsibility support, and spiritual care.",
      },
    ],
  },
  {
    category: "Programs and Family Support",
    items: [
      {
        question: "Who can stay at the Little Ark home?",
        answer:
          "Eligibility is coordinated with Little Ark Foundation staff and partner hospitals. Families should contact the foundation directly to learn about current requirements and availability.",
      },
      {
        question: "Is housing free for families?",
        answer:
          "Little Ark Foundation provides temporary housing support to eligible pediatric patients and their caregivers. Contact the foundation for current eligibility and accommodation details.",
      },
      {
        question: "Does Little Ark provide transportation?",
        answer:
          "Yes. Little Ark provides free transportation support for eligible families traveling to and from treatment and related appointments.",
      },
    ],
  },
  {
    category: "Donations",
    items: [
      {
        question: "How can I donate?",
        answer:
          "Visitors can donate through the official donation page linked throughout the website. Donations support Little Ark’s programs and services for children and families.",
      },
      {
        question: "Can I choose which program my donation supports?",
        answer:
          "Donors may contact Little Ark Foundation to ask about supporting a specific program. Allocation may depend on current needs and program priorities.",
      },
      {
        question: "How are donations used?",
        answer:
          "Little Ark aims to manage every peso with transparency and responsibility while keeping programs focused on the needs of children and families.",
      },
    ],
  },
  {
    category: "Volunteering and Partnerships",
    items: [
      {
        question: "Can I volunteer?",
        answer:
          "Yes. Volunteer opportunities may include activities, events, donation drives, program support, and other foundation initiatives. Visitors should use the volunteer or contact form to express interest.",
      },
      {
        question: "Can organizations partner with Little Ark?",
        answer:
          "Yes. Little Ark welcomes partnerships with companies, schools, churches, hospitals, civic groups, and community organizations.",
      },
    ],
  },
  {
    category: "Contact and Referrals",
    items: [
      {
        question: "How can I refer a patient or family?",
        answer:
          "Patient referrals should be coordinated directly with Little Ark Foundation staff and partner healthcare institutions. Do not collect or submit sensitive medical information through the public website unless an approved secure process exists.",
      },
      {
        question: "How can I contact Little Ark Foundation?",
        answer: "Visitors can use the Contact Us form or email:",
        email: "info@littlearkfoundation.org",
      },
    ],
  },
] as const satisfies readonly FAQGroup[];

export default function FAQPage() {
  return (
    <div className="bg-white text-[#08233d]">
      <Navbar variant="solid" />

      <main>
        <section className="relative overflow-hidden bg-[#f7fcff] pb-[clamp(64px,8vw,112px)] pt-[clamp(108px,13vw,160px)]">
          <HeartDoodle className="absolute -right-20 top-24 z-0 max-[760px]:hidden" size={300} rotate={15} opacity={0.12} variant={1} />

          <div className="relative z-[1] mx-auto w-[min(1120px,calc(100%_-_32px))] sm:w-[min(1120px,calc(100%_-_48px))]">
            <Reveal className="mx-auto max-w-[850px] text-center">
              <p className="m-0 text-[11px] font-black uppercase tracking-[0.18em] text-[#1fa8f4]">Little Ark Foundation</p>
              <h1 className="mt-3 max-w-[800px] text-[clamp(38px,6.5vw,76px)] font-black leading-[0.96] tracking-[-0.045em] text-[#005ba8] sm:mt-4">
                Frequently Asked Questions
              </h1>
              <p className="mx-auto mt-5 max-w-[690px] text-[15px] font-semibold leading-[1.6] text-[#557086] sm:mt-6 sm:text-[17px] lg:text-[19px]">
                Find answers about Little Ark Foundation’s programs, donations, volunteering, and support services.
              </p>
            </Reveal>

            <Reveal className="mt-12 max-w-[900px] sm:mt-16">
              <FAQAccordion groups={faqGroups} />
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
