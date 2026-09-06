import { HeartDoodle } from "@/components/BrandHearts";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import LeadershipGroupSection, { type LeadershipGroup } from "./LeadershipGroupSection";
import LeadershipFlowConnector from "./LeadershipFlowConnector";
import LeadershipHeroSection from "./LeadershipHeroSection";

type Leader = {
  name: string;
  role: string;
  bio?: string;
  group: LeadershipGroup;
  image: string;
  imageAlt?: string;
  imageClassName?: string;
  objectPosition?: string;
};

const leaders: Leader[] = [
  {
    name: "Butch Bustamante",
    role: "Founder & President",
    bio: "Supply Chain & Public Relations Consultant",
    group: "Board of Trustees",
    image: "/images/leadership/butch-bustamante.png",
    objectPosition: "center 100%",
  },
  {
    name: "Jay P. Supetran",
    role: "Chairman of the Board",
    bio: "Technical Consultant, People In Need (PIN)",
    group: "Board of Trustees",
    image: "/images/leadership/jay-p-supetran.png",
    objectPosition: "center 100%",
  },
  {
    name: "Rosemarie Dayupay, CPA",
    role: "Treasurer",
    bio: "CFO, Lamoiyan Corporation",
    group: "Board of Trustees",
    image: "/images/leadership/rosemarie-dayupay.png",
    objectPosition: "center 100%",
  },
  {
    name: "Ana Manama Delos Reyes-Santos",
    role: "Secretary, Philippines",
    bio: "Country Sales Manager, Alternatives Food Corporation",
    group: "Board of Trustees",
    image: "/images/leadership/ana-manama-delos-reyes-santos.png",
    objectPosition: "center 100%",
  },
  {
    name: "Marivic Fortes-Bartolome, CPA",
    role: "CFO, USA",
    bio: "Finance Program Manager, World Vision United States",
    group: "Board of Trustees",
    image: "/images/leadership/marivic-fortes-bartolome.png",
    objectPosition: "center 100%",
  },
  {
    name: "Leah Uy-Vitalicio, CPA",
    role: "Secretary, USA",
    bio: "Controller, WRA Environmental Consultants",
    group: "Board of Trustees",
    image: "/images/leadership/leah-uy-vitalicio.png",
    objectPosition: "center 100%",
  },
  {
    name: "Angel Javier Cruz",
    role: "Board Member",
    bio: "VP - Corporate Communications, GMA-7",
    group: "Board of Trustees",
    image: "/images/leadership/angel-javier-cruz.png",
    objectPosition: "center 100%",
  },
  {
    name: "Remy Serapion, RSW, MSW",
    role: "Board Member",
    bio: "FMR Chief, Medical Social Work Department, National Children's Hospital",
    group: "Board of Trustees",
    image: "/images/leadership/remy-serapion.png",
    objectPosition: "center 100%",
  },
  {
    name: "Ana Del Mundo",
    role: "Administrative and Finance Consultant",
    group: "Administration",
    image: "/images/leadership/ana-del-mundo.png",
    objectPosition: "center 0%",
  },
  {
    name: "Desiree Loquinario",
    role: "Administrative and Finance Specialist",
    group: "Administration",
    image: "/images/leadership/desiree-loquinario.png",
    objectPosition: "center 30%",
  },
  {
    name: "Queen Izell Spencer",
    role: "Resident Social Worker",
    group: "Resident Social Workers",
    image: "/images/leadership/queen-izell-spencer.png",
    objectPosition: "center 30%",
  },
  {
    name: "Cathlyn Pagliwan",
    role: "Resident Social Worker",
    group: "Resident Social Workers",
    image: "/images/leadership/cathlyn-pagliwan.png",
    objectPosition: "center 30%",
  },
  {
    name: "Margielyn Formento",
    role: "Household Support Staff",
    group: "Household Support",
    image: "/images/leadership/margielyn-formento.png",
    objectPosition: "center 32%",
  },
  {
    name: "Jonalie Mapesos",
    role: "Household Support Staff",
    group: "Household Support",
    image: "/images/leadership/jonalie-mapesos.png",
    objectPosition: "center 32%",
  },
  {
    name: "Christopher Fajardo",
    role: "Driver",
    group: "Household Support",
    image: "/images/leadership/christopher-fajardo.png",
    objectPosition: "center 34%",
  },
  {
    name: "Kristi F. Dideles, MD",
    role: "Family Support and Health Program",
    bio: "Pediatric Hematologist",
    group: "Managing Partners for Mission Advancement",
    image: "/images/leadership/kristi-f-dideles.png",
    objectPosition: "center 30%",
  },
  {
    name: "Charmagne Diaz",
    role: "Strategic Advocacy Partnerships",
    bio: "Founder and CEO - CK DIAZ Worldwide Enterprise",
    group: "Managing Partners for Mission Advancement",
    image: "/images/leadership/charmagne-diaz.png",
    imageClassName: "scale-[1.02]",
    objectPosition: "center 0%",
  },
  {
    name: "Choi Namyong",
    role: "International Relations and Creative Strategy",
    bio: "Commercial and Documentary Film Director & Photographer",
    group: "Managing Partners for Mission Advancement",
    image: "/images/leadership/choi-namyong.png",
    objectPosition: "center 30%",
  },
  {
    name: "Juanita Baisa",
    role: "Community Engagement and Partnerships",
    bio: "FM Radio DJ, Barangay LS 97.1",
    group: "Managing Partners for Mission Advancement",
    image: "/images/leadership/juanita-baisa.png",
    imageClassName: "scale-[1.02]",
    objectPosition: "center 30%",
  },
  {
    name: "Ronaldo Rocha",
    role: "Corporate and Organizational Partnerships",
    bio: "President & CEO, Printoflex Phil., Inc.",
    group: "Managing Partners for Mission Advancement",
    image: "/images/leadership/rolly-rocha-2026.png",
    objectPosition: "center 36%",
  },
  {
    name: "Kim Rivadeneira",
    role: "Grants and Resource Development",
    bio: "Co-Founder MadGorilla",
    group: "Managing Partners for Mission Advancement",
    image: "/images/leadership/kim-rivadeneira.png",
    imageAlt: "Kim Rivadeneira, Grants and Resource Development",
    objectPosition: "center 30%",
  },
  {
    name: "Jean Bustamante",
    role: "Technology, AI and Automation",
    group: "Managing Partners for Mission Advancement",
    image: "/images/leadership/jean-bustamante.png",
    imageAlt: "Jean Bustamante, Technology, AI and Automation",
    objectPosition: "center 34%",
  },
];

function StaffRow() {
  return (
    <section className="relative">
      <div className="mx-auto grid max-w-[980px] grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] gap-x-8 max-[820px]:grid-cols-1 max-[820px]:gap-y-8">
        <div>
          <LeadershipGroupSection group="Administration" compact leaders={leaders.filter((leader) => leader.group === "Administration")} />
        </div>
        <div className="bg-[#1fa8f4]/45 max-[820px]:hidden" aria-hidden="true" />
        <div className="hidden h-px bg-[#1fa8f4]/45 max-[820px]:block" aria-hidden="true" />
        <div>
          <LeadershipGroupSection group="Resident Social Workers" compact leaders={leaders.filter((leader) => leader.group === "Resident Social Workers")} />
        </div>
      </div>
    </section>
  );
}

export default function LeadershipPageContent() {
  return (
    <div className="bg-white text-[#08233d]">
      <Navbar variant="solid" />

      <main>
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_12%_14%,rgba(31,168,244,0.14),transparent_24rem),radial-gradient(circle_at_88%_12%,rgba(255,200,61,0.16),transparent_22rem),linear-gradient(180deg,#effaff,#fff_52%,#edf8ff)] pb-[clamp(66px,8vw,108px)] pt-[clamp(140px,14vw,178px)]">
          <HeartDoodle className="absolute -left-24 top-28 z-0 max-[760px]:hidden" size={330} rotate={-17} opacity={0.22} variant={2} />
          <HeartDoodle className="absolute -right-20 bottom-16 z-0 max-[900px]:hidden" size={260} rotate={15} opacity={0.2} variant={1} />

          <div className="relative z-[1] mx-auto w-[min(1220px,calc(100%_-_40px))] max-[620px]:w-[min(100%_-_28px,1220px)]">
            <LeadershipHeroSection />

            <div className="mt-[clamp(46px,6vw,74px)]">
              <LeadershipGroupSection group="Board of Trustees" leaders={leaders.filter((leader) => leader.group === "Board of Trustees")} />
              <LeadershipFlowConnector />
              <LeadershipGroupSection group="Managing Partners for Mission Advancement" leaders={leaders.filter((leader) => leader.group === "Managing Partners for Mission Advancement")} />
              <LeadershipFlowConnector />
              <StaffRow />
              <LeadershipFlowConnector />
              <LeadershipGroupSection group="Household Support" leaders={leaders.filter((leader) => leader.group === "Household Support")} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
