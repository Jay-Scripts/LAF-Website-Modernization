import { siteContent } from "@/data/siteContent";

const linkClass = "inline-block max-w-full break-words py-2 text-lg font-semibold text-[#082f59] underline decoration-[#cbdfe9] underline-offset-4 transition-colors hover:text-[#0068c9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0068c9]";

export default function ContactVisitSection() {
  return (
    <aside aria-labelledby="contact-details-heading" className="min-w-0">
      <h2 id="contact-details-heading" className="m-0 text-2xl font-black tracking-tight text-[#082f59]">Reach us directly</h2>
      <dl className="mt-6 space-y-6">
        <div>
          <dt className="text-sm text-[#557086]">Email</dt>
          <dd className="m-0"><a href={`mailto:${siteContent.contact.email}`} className={linkClass}>{siteContent.contact.email}</a></dd>
        </div>
        <div>
          <dt className="text-sm text-[#557086]">Philippines</dt>
          <dd className="m-0"><a href={`tel:${siteContent.contact.phPhone}`} className={linkClass}>+63 906 404 9569</a></dd>
        </div>
        <div>
          <dt className="text-sm text-[#557086]">United States</dt>
          <dd className="m-0"><a href={`tel:${siteContent.contact.usPhone}`} className={linkClass}>+1 (732) 300-3902</a></dd>
        </div>
        <div className="border-t border-[#cbdfe9] pt-6">
          <dt className="text-sm text-[#557086]">Our address</dt>
          <dd className="m-0 mt-3 text-lg leading-relaxed text-[#082f59]">
            <address className="not-italic">35 Tulip Street<br />Brgy. Roxas<br />Quezon City</address>
          </dd>
        </div>
      </dl>
    </aside>
  );
}
