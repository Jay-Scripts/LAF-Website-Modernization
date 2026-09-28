export default function ContactHeroSection() {
  return (
    <header className="grid items-end gap-6 lg:grid-cols-2 lg:gap-20">
      <div>
        <p className="mb-4 text-sm font-semibold text-[#557086]">Contact us</p>
        <h1 className="m-0 text-[clamp(48px,6vw,76px)] font-black leading-[1.05] tracking-[-0.035em] text-[#082f59]">
          Let&apos;s talk<span className="text-[#1fa8f4]">.</span>
        </h1>
      </div>
      <p className="m-0 max-w-[490px] text-lg leading-relaxed text-[#557086]">
        Questions about family support, volunteering, partnerships, or donations? Get in touch with the Little Ark team.
      </p>
    </header>
  );
}
