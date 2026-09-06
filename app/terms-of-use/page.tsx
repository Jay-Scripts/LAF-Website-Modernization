import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Little Ark Foundation Terms of Use, effective August 18, 2026.",
  alternates: { canonical: "/terms-of-use" },
};

const introduction = [
  'Welcome to the website of Little Ark Foundation ("Little Ark," "LAF," "we," "our," or "us").',
  'These Terms of Use govern your access to and use of www.littlearkfoundation.org, including its pages, forms, donation features, content, and related online services (collectively, the "Website").',
  "By accessing or using the Website, you agree to these Terms of Use. If you do not agree with these Terms, please do not use the Website.",
] as const;

const sections = [
  {
    title: "1. About Little Ark Foundation",
    blocks: [
      { type: "paragraph", text: "Little Ark Foundation is a nonprofit organization supporting children with cancer, thalassemia, and other critical illnesses, together with their families, through programs including housing, meals, transportation, activities, resources, family support, and other forms of compassionate care." },
      { type: "paragraph", text: "Information about Little Ark's registrations, programs, locations, and charitable activities is available on this Website." },
    ],
  },
  {
    title: "2. Purpose of This Website",
    blocks: [
      { type: "paragraph", text: "The Website is intended to:" },
      { type: "list", items: ["Provide information about Little Ark Foundation and its mission;", "Explain our programs and services;", "Share stories, updates, reports, and organizational impact;", "Provide ways to donate and support our work;", "Provide information for volunteers, interns, donors, partners, and other stakeholders;", "Allow individuals and organizations to contact or communicate with Little Ark; and", "Provide information regarding assistance and other Foundation activities."] },
      { type: "paragraph", text: "Use of this Website does not automatically create a donor, beneficiary, volunteer, partner, employment, agency, or other legal relationship with Little Ark." },
    ],
  },
  {
    title: "3. No Guarantee of Assistance or Eligibility",
    blocks: [
      { type: "paragraph", text: "Information on this Website about Little Ark programs does not guarantee admission, enrollment, financial assistance, accommodation, transportation, medical support, or any other service." },
      { type: "paragraph", text: "All requests for assistance are subject to applicable eligibility requirements, assessment, documentation, program guidelines, safeguarding considerations, available resources, capacity, and other requirements established by Little Ark or its program partners." },
      { type: "paragraph", text: "Submission of an inquiry, application, referral, or request through the Website does not constitute approval or acceptance into a Little Ark program." },
    ],
  },
  {
    title: "4. Medical Information Disclaimer",
    blocks: [
      { type: "paragraph", text: "Little Ark Foundation is not a substitute for a hospital, physician, emergency service, or licensed healthcare provider." },
      { type: "paragraph", text: "Information appearing on this Website relating to cancer, critical illnesses, treatment, healthcare, nutrition, patient support, or other medical topics is provided for general informational and charitable purposes only." },
      { type: "paragraph", text: "Nothing on the Website should be considered medical advice, diagnosis, treatment, or a recommendation to begin, change, delay, or discontinue medical care." },
      { type: "paragraph", text: "Patients and caregivers should consult qualified healthcare professionals regarding medical concerns and treatment decisions." },
      { type: "paragraph", text: "The Website should not be used to request emergency medical assistance." },
    ],
  },
  {
    title: "5. Donations",
    blocks: [
      { type: "paragraph", text: "Little Ark accepts charitable donations to support its mission and programs." },
      { type: "paragraph", text: "By making a donation through the Website, you confirm that:" },
      { type: "list", items: ["You are authorized to use the payment method provided;", "The information you provide is accurate to the best of your knowledge;", "Your donation is made voluntarily; and", "You authorize Little Ark and its authorized payment service providers to process the transaction."] },
      { type: "subheading", text: "One-Time Donations" },
      { type: "paragraph", text: "A one-time donation authorizes the processing of the amount selected or entered by the donor for that transaction." },
      { type: "subheading", text: "Recurring Donations" },
      { type: "paragraph", text: "If you select a recurring donation, you authorize Little Ark and its payment service provider to charge the selected payment method at the frequency and amount shown when you establish the recurring donation." },
      { type: "paragraph", text: "Recurring donations continue until canceled or otherwise terminated." },
      { type: "paragraph", text: "You may request cancellation of a recurring donation through the applicable payment platform or by contacting Little Ark at info@littlearkfoundation.org." },
      { type: "paragraph", text: "Cancellation applies to future scheduled donations and should be requested sufficiently before the next scheduled processing date to allow the request to be implemented." },
      { type: "paragraph", text: "Cancellation of recurring giving does not automatically result in a refund of donations already processed." },
      { type: "subheading", text: "Donation Refunds and Transaction Errors" },
      { type: "paragraph", text: "Charitable donations are generally final." },
      { type: "paragraph", text: "However, if you believe that a donation was made in error, duplicated, processed for an incorrect amount, or made without authorization, please contact Little Ark promptly at info@littlearkfoundation.org." },
      { type: "paragraph", text: "Little Ark will review the circumstances and may issue a refund or transaction correction when appropriate or required by applicable law." },
      { type: "paragraph", text: "Refunds, when approved, will ordinarily be returned using the original payment method when reasonably possible." },
      { type: "subheading", text: "Payment Processing" },
      { type: "paragraph", text: "Online donations may be processed by third-party payment gateways, banks, credit card networks, or other financial service providers." },
      { type: "paragraph", text: "Those providers may have their own terms, privacy policies, security procedures, processing times, fees, currency conversion practices, or other requirements." },
      { type: "paragraph", text: "Little Ark does not intentionally store complete credit or debit card details when those details are processed directly by an authorized payment provider." },
      { type: "subheading", text: "Currency and Processing" },
      { type: "paragraph", text: "Donations may be offered in Philippine pesos, U.S. dollars, or other currencies made available through the Website or payment provider." },
      { type: "paragraph", text: "Banks, card issuers, or payment providers may apply currency conversion rates, international transaction charges, or other fees outside Little Ark's control." },
      { type: "subheading", text: "Use of Donations" },
      { type: "paragraph", text: "Unless a donation opportunity or written acknowledgment expressly states that a contribution is restricted to a particular purpose, donations are considered unrestricted and may be used by Little Ark where they are most needed to advance its charitable mission and programs." },
      { type: "paragraph", text: "Where Little Ark expressly accepts a restricted donation, the donation will be administered in accordance with the applicable restriction and relevant law." },
      { type: "subheading", text: "Donation Receipts and Tax Matters" },
      { type: "paragraph", text: "Little Ark may issue donation acknowledgments, official receipts, or other documentation as applicable." },
      { type: "paragraph", text: "The tax treatment of a donation may depend on the donor's jurisdiction, individual circumstances, the receiving Little Ark entity, and applicable tax laws." },
      { type: "paragraph", text: "Nothing on this Website constitutes tax, accounting, or legal advice, and the issuance of a donation acknowledgment or receipt does not by itself guarantee tax deductibility in every jurisdiction." },
      { type: "paragraph", text: "Donors should consult their own professional advisers regarding the tax treatment of their contributions when necessary." },
    ],
  },
  {
    title: "6. Privacy and Personal Information",
    blocks: [
      { type: "paragraph", text: "Your use of the Website is also subject to Little Ark Foundation's Privacy Policy." },
      { type: "paragraph", text: "The Privacy Policy explains how Little Ark collects, uses, stores, shares, and protects personal information and how individuals may exercise their privacy rights." },
      { type: "paragraph", text: "By providing personal information through the Website, you acknowledge that such information will be processed in accordance with our Privacy Policy and applicable law." },
    ],
  },
  {
    title: "7. Children and Personal Information",
    blocks: [
      { type: "paragraph", text: "Little Ark works extensively with children and families facing serious illnesses. Protecting their privacy, dignity, and safety is a priority." },
      { type: "paragraph", text: "Children should not submit medical information, applications for assistance, contact information, or other sensitive personal information through the Website without the involvement or authorization of a parent, legal guardian, caregiver, or other authorized adult when required." },
      { type: "paragraph", text: "Little Ark may request additional verification, consent, or authorization before acting on information relating to a child." },
    ],
  },
  {
    title: "8. Beneficiary Photos, Videos, and Stories",
    blocks: [
      { type: "paragraph", text: "The Website may contain photographs, videos, stories, testimonials, interviews, or other materials involving children, caregivers, beneficiaries, volunteers, donors, and partners." },
      { type: "paragraph", text: "These materials are presented to communicate Little Ark's mission and impact and, where required, are used pursuant to appropriate consent, authorization, or another lawful basis." },
      { type: "paragraph", text: "The presence of a beneficiary's photograph, video, name, medical journey, testimonial, or story on the Website does not give Website visitors permission to independently use, reproduce, download, publish, modify, distribute, sell, exploit, or repurpose that material." },
      { type: "paragraph", text: "In particular, beneficiary content may not be used without authorization for:" },
      { type: "list", items: ["Advertising or commercial purposes;", "Independent fundraising campaigns;", "Misleading or unauthorized charitable appeals;", "Profiling or exploitation of children or families;", "Creating false or misleading content;", "Training or developing commercial artificial intelligence or machine-learning datasets; or", "Any activity that may compromise the privacy, dignity, safety, or welfare of a child or family."] },
      { type: "paragraph", text: "Any request to reproduce or use Little Ark beneficiary content should be submitted to info@littlearkfoundation.org." },
      { type: "paragraph", text: "Nothing in this section is intended to restrict uses expressly permitted by applicable law." },
    ],
  },
  {
    title: "9. Intellectual Property",
    blocks: [
      { type: "paragraph", text: "Unless otherwise indicated, the Website and its original content, including text, photographs, videos, graphics, logos, branding, program names, reports, designs, and other materials, are owned by or licensed to Little Ark Foundation and are protected by applicable intellectual property laws." },
      { type: "paragraph", text: "You may view and share links to publicly available Website pages for personal, educational, charitable, or informational purposes." },
      { type: "paragraph", text: "You may not reproduce, modify, sell, license, commercially exploit, republish, distribute, or create derivative works from Website content without prior authorization from Little Ark or the applicable rights holder, except as permitted by law." },
      { type: "paragraph", text: "The names, logos, and branding of third-party partners appearing on the Website remain the property of their respective owners." },
    ],
  },
  {
    title: "10. User Submissions and Communications",
    blocks: [
      { type: "paragraph", text: "When you send an inquiry, application, message, document, testimonial, photograph, or other material through the Website, you represent that you have the authority to provide that material and that doing so does not unlawfully violate another person's rights." },
      { type: "paragraph", text: "Submitting information to Little Ark does not automatically authorize Little Ark to publicly publish personal photographs, medical information, beneficiary stories, or other sensitive personal information." },
      { type: "paragraph", text: "Little Ark may seek separate consent or authorization where appropriate before publicly using such materials." },
      { type: "paragraph", text: "Please do not submit information that is unnecessary for the purpose of your inquiry or that you are not authorized to disclose." },
    ],
  },
  {
    title: "11. Acceptable Use",
    blocks: [
      { type: "paragraph", text: "You agree not to use the Website to:" },
      { type: "list", items: ["Violate applicable laws or regulations;", "Misrepresent your identity or affiliation;", "Commit fraud or submit fraudulent donation transactions;", "Attempt to gain unauthorized access to the Website, accounts, databases, systems, or networks;", "Introduce viruses, malware, malicious code, or other harmful technology;", "Interfere with the operation or security of the Website;", "Harvest personal information about beneficiaries, donors, staff, volunteers, or other users;", "Scrape, systematically extract, or commercially exploit Website content without authorization;", "Use beneficiary information or images for unauthorized fundraising or solicitation;", "Impersonate Little Ark Foundation or falsely imply an endorsement, partnership, or affiliation with Little Ark;", "Use Little Ark's name, logo, branding, or content to solicit funds without authorization; or", "Use the Website in a manner that could harm children, beneficiaries, caregivers, Little Ark, its partners, or other Website users."] },
      { type: "paragraph", text: "Little Ark may restrict or block access when reasonably necessary to protect the Website, the Foundation, its beneficiaries, or other users." },
    ],
  },
  {
    title: "12. Unauthorized Fundraising",
    blocks: [
      { type: "paragraph", text: "The presence of Little Ark's name, programs, photographs, videos, or beneficiary stories on this Website does not authorize any person or organization to conduct a fundraising campaign in Little Ark's name." },
      { type: "paragraph", text: "Anyone wishing to organize a fundraiser, donation drive, event, campaign, or solicitation representing or benefiting Little Ark should obtain appropriate authorization from the Foundation." },
      { type: "paragraph", text: "Little Ark is not responsible for unauthorized fundraising activities conducted by third parties claiming to support the Foundation." },
      { type: "paragraph", text: "If you are uncertain whether a fundraising campaign is officially associated with Little Ark, please contact us at info@littlearkfoundation.org." },
    ],
  },
  {
    title: "13. Third-Party Websites and Services",
    blocks: [
      { type: "paragraph", text: "The Website may contain links to or integrations with third-party websites, social media platforms, payment providers, partner organizations, hospitals, service providers, or other external services." },
      { type: "paragraph", text: "These links are provided for convenience or informational purposes." },
      { type: "paragraph", text: "Little Ark does not control all third-party websites or services and is not responsible for their content, availability, security practices, privacy practices, or terms." },
      { type: "paragraph", text: "The inclusion of an external link does not necessarily constitute an endorsement unless expressly stated." },
    ],
  },
  {
    title: "14. Information Accuracy",
    blocks: [
      { type: "paragraph", text: "Little Ark works to keep information on the Website accurate and current." },
      { type: "paragraph", text: "However, programs, schedules, statistics, eligibility requirements, personnel, partnerships, funding availability, regulatory information, services, and other circumstances may change." },
      { type: "paragraph", text: "Little Ark does not guarantee that every piece of Website information will always be complete, current, or free from error." },
      { type: "paragraph", text: "Where Website information conflicts with an official written policy, agreement, program guideline, regulatory requirement, or individualized communication issued by Little Ark, the applicable official document or communication may control." },
    ],
  },
  {
    title: "15. Website Availability and Security",
    blocks: [
      { type: "paragraph", text: "Little Ark may modify, suspend, restrict, or discontinue any part of the Website at any time when reasonably necessary." },
      { type: "paragraph", text: "We do not guarantee that the Website will always operate without interruption, delay, technical error, security incident, or loss of functionality." },
      { type: "paragraph", text: "Users are responsible for taking reasonable precautions when accessing websites and electronic communications." },
    ],
  },
  {
    title: "16. Disclaimer of Warranties",
    blocks: [
      { type: "paragraph", text: 'To the extent permitted by applicable law, the Website and its content are provided on an "as is" and "as available" basis.' },
      { type: "paragraph", text: "Little Ark makes no guarantee that use of the Website will produce a particular outcome, secure program assistance, result in a partnership, or meet every user's individual requirements." },
      { type: "paragraph", text: "Nothing in these Terms excludes any warranty, right, or obligation that cannot lawfully be excluded." },
    ],
  },
  {
    title: "17. Limitation of Liability",
    blocks: [
      { type: "paragraph", text: "To the fullest extent permitted by applicable law, Little Ark Foundation, its trustees, directors, officers, employees, volunteers, and authorized representatives will not be liable for indirect, incidental, special, consequential, or similar losses arising solely from the use of, inability to use, or reliance on the Website or third-party services linked from it." },
      { type: "paragraph", text: "Nothing in these Terms is intended to exclude or limit liability where such exclusion or limitation is prohibited by applicable law." },
    ],
  },
  {
    title: "18. Changes to These Terms",
    blocks: [
      { type: "paragraph", text: "Little Ark may update these Terms of Use from time to time to reflect changes in our Website, programs, donation systems, operations, legal requirements, or organizational practices." },
      { type: "paragraph", text: 'The updated Terms will be posted on this Website with a revised "Last Updated" date.' },
      { type: "paragraph", text: "Your continued use of the Website after updated Terms become effective constitutes acceptance of the revised Terms to the extent permitted by applicable law." },
      { type: "paragraph", text: "Material changes affecting recurring donations or other existing arrangements may be communicated separately when appropriate or required." },
    ],
  },
  {
    title: "19. Governing Law",
    blocks: [
      { type: "paragraph", text: "These Terms and the use of this Website are generally governed by the laws of the Republic of the Philippines, without regard to conflict-of-law principles." },
      { type: "paragraph", text: "Nothing in these Terms is intended to override mandatory rights or legal requirements that may apply to a donor, user, transaction, or Little Ark entity in another jurisdiction." },
    ],
  },
  {
    title: "20. Severability",
    blocks: [
      { type: "paragraph", text: "If any provision of these Terms is determined to be invalid, unlawful, or unenforceable, the remaining provisions will continue in effect to the fullest extent permitted by law." },
    ],
  },
  {
    title: "21. Contact Us",
    blocks: [
      { type: "paragraph", text: "Questions about these Terms of Use, donations, Website content, or authorization to use Little Ark materials may be directed to:" },
      { type: "address", lines: ["Little Ark Foundation", "Philippines", "35 Tulip Street, Brgy. Roxas", "Quezon City 1103, Philippines", "Telephone: +63 906 404 9569"] },
      { type: "address", lines: ["United States", "1600-B SW Dash Point Road", "#1129 Federal Way, WA 98023", "United States", "Telephone: +1 732 300 3902"] },
      { type: "address", lines: ["Email: info@littlearkfoundation.org", "Website: www.littlearkfoundation.org"] },
      { type: "paragraph", text: "For questions specifically concerning personal information or privacy rights, please refer to our Privacy Policy or contact Little Ark Foundation's Data Protection Officer through the privacy contact information provided there." },
    ],
  },
] as const satisfies readonly LegalSection[];

export default function TermsOfUsePage() {
  return <LegalPage title="Terms of Use" effectiveDate="August 18, 2026" lastUpdated="August 18, 2026" introduction={introduction} sections={sections} />;
}
