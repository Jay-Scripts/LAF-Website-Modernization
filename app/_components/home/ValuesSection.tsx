const statements = [
  {
    title: "Vision",
    body: "A world where every pediatric patient with cancer, thalassemia, and other critical illnesses, along with their families, feels supported by love and faith.",
  },
  {
    title: "Mission",
    body: "To provide compassionate, holistic support to pediatric patients and their families through housing, meals, transportation, activities, resources, and faith-centered care.",
  },
];

export default function ValuesSection() {
  return (
    <section
      aria-labelledby="values-heading"
      className="border-y border-[#dceaf2] bg-white py-[clamp(68px,8vw,112px)] max-[760px]:py-14"
    >
      <div className="mx-auto grid w-[min(1180px,calc(100%_-_48px))] grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] items-center gap-[clamp(56px,8vw,132px)] max-[900px]:grid-cols-1 max-[900px]:gap-12 max-[760px]:w-[min(100%_-_32px,1180px)] max-[760px]:gap-9">
        <div>
          <h2 id="values-heading" className="m-0 text-[clamp(2.5rem,4.2vw,4.25rem)] font-black leading-[1.04] tracking-[-0.045em] text-[#082f59] max-[760px]:text-[clamp(2.2rem,9vw,3.4rem)]">
            <span className="block">Lead with <span className="text-[#0068c9]">Love.</span></span>
            <span className="mt-2 block">Respond with <span className="text-[#008fe4]">Action.</span></span>
            <span className="mt-2 block">Serve with <span className="text-[#bd8115]">Faith.</span></span>
          </h2>
        </div>

        <div className="border-l border-[#c7dce9] pl-[clamp(28px,4vw,56px)] max-[900px]:border-l-0 max-[900px]:pl-0">
          {statements.map(({ title, body }) => (
            <article key={title} className="border-t border-[#c7dce9] py-6 first:pt-5 last:border-b last:pb-5">
              <h3 className="m-0 text-xs font-black uppercase tracking-[0.18em] text-[#0068c9]">{title}</h3>
              <p className="mb-0 mt-3 max-w-[49ch] text-[clamp(1rem,1.25vw,1.125rem)] leading-[1.6] text-[#344c61]">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
