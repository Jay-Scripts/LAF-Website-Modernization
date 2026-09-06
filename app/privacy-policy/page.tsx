import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Little Ark Foundation Privacy Policy, effective August 18, 2026.",
  alternates: { canonical: "/privacy-policy" },
};

const introduction = [
  'Little Ark Foundation, Inc. ("Little Ark," "LAF," "we," "our," or "us") respects your privacy and is committed to protecting the personal information entrusted to us.',
  "This Privacy Policy serves as our public Privacy Notice and explains how we collect, use, store, disclose, and protect personal data when you visit our website, communicate with us, donate, volunteer, partner with us, apply for assistance, participate in our programs, or otherwise interact with Little Ark Foundation.",
  "We process personal data in accordance with Republic Act No. 10173, or the Data Privacy Act of 2012, its Implementing Rules and Regulations, applicable issuances of the National Privacy Commission, and other applicable laws.",
] as const;

const sections = [
  {
    title: "1. Information We May Collect",
    blocks: [
      { type: "paragraph", text: "Depending on your relationship with Little Ark, we may collect the following information:" },
      { type: "subheading", text: "Website Visitors and Inquiries" },
      { type: "list", items: ["Name", "Email address", "Telephone number", "Organization or affiliation", "Messages, inquiries, and other information you voluntarily provide", "Basic technical information relating to your use of our website"] },
      { type: "subheading", text: "Donors and Supporters" },
      { type: "list", items: ["Name and contact information", "Donation details and transaction records", "Organization or company affiliation, when applicable", "Information required for receipts, acknowledgments, accounting, and regulatory reporting"] },
      { type: "paragraph", text: "Payment information may be processed directly by banks, payment gateways, or other authorized payment service providers. Little Ark does not intentionally store complete credit or debit card information unless specifically necessary and permitted by law." },
      { type: "subheading", text: "Volunteers, Applicants, Interns, and Partners" },
      { type: "paragraph", text: "We may collect information such as:" },
      { type: "list", items: ["Name and contact information", "School, organization, or employer", "Educational and professional background", "Skills, interests, and availability", "Application documents and identification information when necessary", "Emergency contact information", "Records relating to participation in Little Ark activities"] },
      { type: "subheading", text: "Children, Patients, Caregivers, and Families" },
      { type: "paragraph", text: "Because Little Ark supports children with cancer and other critical illnesses, we may process personal information and sensitive personal information necessary to provide our programs and services." },
      { type: "paragraph", text: "This may include:" },
      { type: "list", items: ["Name, age, date of birth, and contact information", "Parent, guardian, and caregiver information", "Relevant health or medical information", "Hospital or treatment information", "Social and family circumstances relevant to assistance", "Program participation and services received", "Transportation, accommodation, meal, and assistance records", "Photographs, videos, testimonials, or stories when appropriate consent has been obtained"] },
      { type: "paragraph", text: "We seek to collect only information reasonably necessary to determine eligibility, coordinate assistance, provide services, maintain appropriate records, protect the welfare of the child and family, and comply with applicable requirements." },
    ],
  },
  {
    title: "2. Children's Privacy",
    blocks: [
      { type: "paragraph", text: "Protecting children is especially important to Little Ark." },
      { type: "paragraph", text: "Personal information relating to minors is handled with additional care and confidentiality. Where consent is required, Little Ark obtains appropriate consent from a parent, legal guardian, or other person authorized by law." },
      { type: "paragraph", text: "A child's medical condition, personal circumstances, photographs, videos, name, story, or other identifying information will not be intentionally published for fundraising, communications, advocacy, or promotional purposes without appropriate authorization or another lawful basis." },
      { type: "paragraph", text: "Whenever practicable, we limit the personal information disclosed publicly and consider the dignity, safety, and best interests of the child." },
    ],
  },
  {
    title: "3. How We Use Personal Information",
    blocks: [
      { type: "paragraph", text: "We may process personal information for purposes including:" },
      { type: "list", items: ["Responding to inquiries and requests", "Providing housing, meals, transportation, activities, family support, and other Little Ark programs", "Assessing requests for assistance", "Coordinating services with caregivers, hospitals, social workers, and authorized partners", "Managing volunteers, interns, employees, contractors, and partner organizations", "Receiving and documenting donations", "Issuing acknowledgments and official receipts", "Maintaining financial, accounting, program, and regulatory records", "Communicating with donors, supporters, volunteers, and partners", "Reporting program impact and organizational activities", "Improving our programs, website, systems, and services", "Maintaining the safety and security of our facilities, beneficiaries, personnel, systems, and records", "Complying with legal, regulatory, audit, accreditation, and reporting requirements", "Establishing, exercising, or defending legal claims", "Protecting the life, health, safety, or vital interests of an individual when necessary"] },
      { type: "paragraph", text: "Where required by law, we obtain consent before processing personal or sensitive personal information." },
    ],
  },
  {
    title: "4. Photos, Videos, Stories, and Communications",
    blocks: [
      { type: "paragraph", text: "Little Ark regularly communicates about its mission and impact through its website, social media, reports, presentations, fundraising materials, partner communications, and media activities." },
      { type: "paragraph", text: "For beneficiaries, especially children, Little Ark follows appropriate consent and safeguarding procedures before intentionally publishing identifiable photographs, videos, testimonials, medical information, or personal stories." },
      { type: "paragraph", text: "Consent for communications or storytelling may be withdrawn, subject to applicable law and reasonable limitations regarding materials that have already been lawfully published or distributed." },
    ],
  },
  {
    title: "5. When We May Share Information",
    blocks: [
      { type: "paragraph", text: "Little Ark does not sell personal information." },
      { type: "paragraph", text: "We may disclose or share personal information only when reasonably necessary and permitted by law, including with:" },
      { type: "list", items: ["Authorized Little Ark employees, officers, volunteers, and representatives", "Hospitals, healthcare institutions, social workers, and program partners involved in providing or coordinating assistance", "Banks, payment gateways, accounting providers, auditors, and financial service providers", "Technology, website, email, cloud storage, communications, and other service providers acting on our behalf", "Government agencies and regulatory authorities when required by law", "Professional advisers such as lawyers, accountants, or auditors", "Funding or institutional partners where reporting is required and appropriate safeguards are in place"] },
      { type: "paragraph", text: "Whenever possible, reports provided to donors, partners, or the public use aggregated, statistical, anonymized, or de-identified information rather than personally identifiable beneficiary information." },
      { type: "paragraph", text: "We require persons and organizations processing personal information on our behalf to observe appropriate confidentiality, security, and data protection requirements." },
    ],
  },
  {
    title: "6. International and Third-Party Services",
    blocks: [
      { type: "paragraph", text: "Little Ark operates and maintains relationships in both the Philippines and the United States and may use technology or service providers whose systems or servers are located outside the Philippines." },
      { type: "paragraph", text: "When personal data is processed or transferred through third-party service providers, Little Ark takes reasonable steps to ensure that appropriate safeguards and data protection requirements are maintained." },
      { type: "paragraph", text: "Our website may also contain links or embedded content from third-party websites and platforms. Their privacy practices are governed by their own policies, and we encourage users to review those policies when accessing external services." },
    ],
  },
  {
    title: "7. Website Technology and Cookies",
    blocks: [
      { type: "paragraph", text: "Our website may use cookies and similar technologies necessary for website functionality, security, performance, analytics, or embedded third-party services." },
      { type: "paragraph", text: "These technologies may collect information such as browser type, device information, pages visited, general location information, and interaction with the website." },
      { type: "paragraph", text: "Where consent is legally required for particular cookies or tracking technologies, we will provide appropriate choices to website visitors." },
    ],
  },
  {
    title: "8. How We Protect Personal Information",
    blocks: [
      { type: "paragraph", text: "Little Ark implements reasonable organizational, physical, and technical safeguards designed to protect personal data from unauthorized access, disclosure, alteration, misuse, loss, or destruction." },
      { type: "paragraph", text: "These measures may include:" },
      { type: "list", items: ["Access restrictions based on responsibilities", "Password and account security controls", "Confidentiality requirements", "Staff privacy and data protection training", "Secure record storage", "Appropriate safeguards for electronic systems and cloud services", "Procedures for managing security incidents and personal data breaches"] },
      { type: "paragraph", text: "Access to sensitive information relating to children, patients, families, employees, and donors is limited to individuals who reasonably require the information to perform authorized responsibilities." },
      { type: "paragraph", text: "No method of electronic storage or transmission is completely secure, but Little Ark continuously works to maintain safeguards appropriate to the nature and sensitivity of the information under its control." },
    ],
  },
  {
    title: "9. How Long We Keep Information",
    blocks: [
      { type: "paragraph", text: "Little Ark retains personal information only for as long as reasonably necessary for the purpose for which it was collected, to meet legal, regulatory, accounting, audit, program, safeguarding, or contractual requirements, or to establish, exercise, or defend legal claims." },
      { type: "paragraph", text: "When information is no longer required, it will be securely deleted, destroyed, anonymized, or otherwise disposed of in accordance with applicable policies and laws." },
      { type: "paragraph", text: "Different categories of records may have different retention periods." },
    ],
  },
  {
    title: "10. Your Privacy Rights",
    blocks: [
      { type: "paragraph", text: "Subject to applicable law, you may have the right to:" },
      { type: "list", items: ["Be informed about the processing of your personal data", "Access personal information Little Ark holds about you", "Request correction of inaccurate or incomplete information", "Object to certain processing of your information", "Withdraw consent where processing is based on consent", "Request blocking, deletion, or erasure of information when permitted by law", "Request data portability when applicable", "Raise concerns or complaints regarding the handling of your personal information", "Seek appropriate remedies where your privacy rights have been violated"] },
      { type: "paragraph", text: "Certain requests may be limited when Little Ark is required to retain or process information because of law, regulatory obligations, safeguarding requirements, legitimate purposes, or the establishment, exercise, or defense of legal claims." },
    ],
  },
  {
    title: "11. Data Protection Officer",
    blocks: [
      { type: "paragraph", text: "Little Ark Foundation has designated a Data Protection Officer responsible for overseeing the Foundation's privacy and data protection compliance." },
      { type: "address", lines: ["Data Protection Officer", "Desiree C. Loquinario", "Little Ark Foundation, Inc.", "35 Tulip Street, Brgy. Roxas", "Quezon City 1103, Philippines"] },
      { type: "address", lines: ["Email: info@littlearkfoundation.org", "Telephone: +63 906 404 9569"] },
      { type: "paragraph", text: "For privacy inquiries, requests to exercise your rights, concerns regarding your personal information, or reports of suspected privacy incidents, please contact our Data Protection Officer." },
      { type: "paragraph", text: "You may also lodge a complaint with the National Privacy Commission in accordance with applicable law." },
    ],
  },
  {
    title: "12. Changes to This Privacy Policy",
    blocks: [
      { type: "paragraph", text: "Little Ark may update this Privacy Policy from time to time to reflect changes in our programs, systems, technology, legal requirements, or data processing practices." },
      { type: "paragraph", text: "The current version will be posted on this website together with the date it was last updated." },
    ],
  },
  {
    title: "13. About Little Ark Foundation",
    blocks: [
      { type: "address", lines: ["Little Ark Foundation, Inc.", "35 Tulip Street, Brgy. Roxas", "Quezon City 1103, Philippines"] },
      { type: "address", lines: ["Email: info@littlearkfoundation.org", "Telephone: +63 906 404 9569", "Website: www.littlearkfoundation.org"] },
      { type: "paragraph", text: "Little Ark Foundation is committed to protecting the dignity, privacy, and trust of every child, family, donor, volunteer, employee, partner, and supporter who becomes part of our mission." },
    ],
  },
] as const satisfies readonly LegalSection[];

export default function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" effectiveDate="August 18, 2026" lastUpdated="August 18, 2026" introduction={introduction} sections={sections} />;
}
