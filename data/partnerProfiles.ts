export type PartnerProfile = {
  id: string;
  name: string;
  summary: string | null;
  source: { label: string; url: string } | null;
};

// Researched September 28, 2026. Keep summaries paraphrased and source-backed.
// Null summaries need partner confirmation; do not infer a history from a name.
export const partnerProfiles: PartnerProfile[] = [
  {
    id: "national-childrens-hospital", name: "National Children's Hospital",
    summary: "National Children's Hospital began in 1945 as the Indigent Children's Clinic, caring for sick and undernourished children affected by the war. It later became a hospital and developed into a public institution dedicated to children's healthcare in Quezon City.",
    source: { label: "National Children's Hospital quality manual", url: "https://nch.doh.gov.ph/images/ISO/Quality_Manual_-2022.pdf" },
  },
  {
    id: "blood-and-cancer-care-center", name: "Blood and Cancer Care Center",
    summary: "Part of National Children's Hospital, the Blood and Cancer Care Center developed from its Hematology Center. It provides integrated care for children with cancer and blood disorders, including consultations, chemotherapy and transfusions, alongside specialist training in pediatric hematology and oncology.",
    source: { label: "National Children's Hospital quality manual", url: "https://nch.doh.gov.ph/images/ISO/Quality_Manual_2025.pdf" },
  },
  {
    id: "gma", name: "GMA Network",
    summary: "GMA Network is a Philippine media broadcasting company whose work spans entertainment, news and information. Its corporate purpose is to enrich the lives of Filipinos through entertainment and the responsible delivery of accurate news.",
    source: { label: "GMA Network corporate profile", url: "https://www.gmanetwork.com/corporate/about/" },
  },
  { id: "breadcom-quezon-city", name: "Breadcom Quezon City", summary: null, source: null },
  {
    id: "union-church-of-manila", name: "Union Church of Manila",
    summary: "Founded in 1914, Union Church of Manila grew as a place of worship for English-speaking Christians during Manila's expanding American presence. It continues as an interdenominational Christian community in Makati.",
    source: { label: "Union Church of Manila", url: "https://unionchurch.ph/about" },
  },
  {
    id: "pfizer", name: "Pfizer",
    summary: "Cousins Charles Pfizer and Charles Erhart founded Charles Pfizer & Company in Brooklyn, New York, in 1849. From its early chemical-manufacturing business, Pfizer grew into a pharmaceutical company focused on medicines, vaccines and scientific research.",
    source: { label: "Pfizer company history", url: "https://www.pfizer.com/about/history" },
  },
  {
    id: "roche", name: "Roche",
    summary: "Fritz Hoffmann founded Roche in Basel, Switzerland, in 1896 to manufacture scientifically researched medicines at scale. The company expanded internationally and developed its work in pharmaceuticals and diagnostics.",
    source: { label: "Roche company history", url: "https://www.roche.com/about/history" },
  },
  {
    id: "art-for-love", name: "Art for Love",
    summary: "Art for Love has supported children at National Children's Hospital through creative and educational resources. Its collaboration with Fundacion Sansó included a donation drive for books, toys, art materials and school supplies for a library in the hospital's cancer ward.",
    source: { label: "Fundacion Sansó community development program", url: "https://fundacionsanso.ph/program-grant" },
  },
  {
    id: "alternatives-food-corp", name: "Alternatives Food Corporation",
    summary: "Alternatives Food Corporation began in 1998 as a private enterprise supplying ingredients to the Philippine food industry. From its early snack-food ingredients, it expanded into meats, seafood, starches and spices for food-service and manufacturing customers.",
    source: { label: "Alternatives Food Corporation", url: "https://alternatives.ph/about" },
  },
  {
    id: "gerrys-grill", name: "Gerry's Grill",
    summary: "Gerry's first opened on Tomas Morato in Quezon City on February 14, 1997. The restaurant and bar became known for Filipino food and grew from its original location into a restaurant chain.",
    source: { label: "Gerry's anniversary profile — When In Manila", url: "https://www.wheninmanila.com/gerrys-grill-turns-23-the-secret-to-this-restaurant-and-bar-pioneers-longevity/" },
  },
  {
    id: "celebrate-every-breath", name: "Celebrate Every Breath",
    summary: "Celebrate Every Breath began during its founder's cancer treatment as a merchandise brand with a purpose: giving back. Its first outreach at National Children's Hospital led to a connection with Little Ark Foundation and support for a month's shelter for eight families.",
    source: { label: "Celebrate Every Breath — founder's story", url: "https://celebrateeverybreath.com/blogs/news/how-celebrate-every-breath-came-to-life" },
  },
  {
    id: "ilustrador-ng-kabataan-ink", name: "Ang Ilustrador ng Kabataan (Ang INK)",
    summary: "Ang INK formed in 1991 following children's-book illustration workshops involving the Goethe-Institut and the Philippine Board on Books for Young People. The group brings together illustrators who help develop and promote Philippine children's literature.",
    source: { label: "National Commission for Culture and the Arts", url: "https://ncca.gov.ph/about-culture-and-arts/in-focus/nurturing-childrens-literature-in-the-philippines/" },
  },
  {
    id: "chummy-chum-charity-of-love", name: "Chummy Chum Foundation",
    summary: "The Genomal family established Chummy Chum Foundation Philippines in 2007 to support underprivileged children. Its work includes hospital and children's-center visits, medical assistance, and an infant incubator and ventilator loan program.",
    source: { label: "Chummy Chum Foundation history", url: "https://www.chummychum.org/about1-c1x1t" },
  },
  {
    id: "abenson", name: "Abenson",
    summary: "Established in 1970, Abenson is a Philippine retailer of appliances, gadgets and furniture. Its retail business has expanded to physical stores and online shopping, with home delivery and store-pickup options.",
    source: { label: "Abenson company profile", url: "https://www.linkedin.com/company/abenson/" },
  },
  { id: "revelation-community-church", name: "Revelation Community Church", summary: null, source: null },
  {
    id: "mundo-design-build", name: "Mundo Design + Build",
    summary: "Mundo's origins date to 2009, when a small team set out to combine design and construction services in one firm. It took its current design-and-build form in 2014 and expanded into structural, fit-out, hospitality and corporate projects.",
    source: { label: "Mundo Design + Build history", url: "https://www.mundobuilders.co/about-us" },
  },
  {
    id: "prolife-uk", name: "Pru Life UK",
    summary: "Established in the Philippines in 1996, Pru Life UK is a life insurance company and a subsidiary of Prudential plc. It developed its Philippine business through a network of branches and agency offices.",
    source: { label: "Pru Life UK company profile", url: "https://www.prulifeuk.com.ph/en/about-us/know-more-about-pru/our-company/" },
  },
  {
    id: "f1-hotel-manila", name: "F1 Hotel Manila",
    summary: "F1 Hotel Manila was the first hotel to open in Bonifacio Global City, Taguig. It serves leisure and business travelers with guest rooms, dining, events spaces and hospitality services in the district.",
    source: { label: "F1 Hotel Manila", url: "https://f1hotelmanila.com.ph/about-us/" },
  },
  {
    id: "lamoyan-corporation", name: "Lamoiyan Corporation",
    summary: "Cecilio Pedro founded Lamoiyan Corporation in 1988. Its Hapee toothpaste brand competed with multinational manufacturers by offering a more affordable locally made alternative, and the business grew from a small Philippine team.",
    source: { label: "Founder interview — The Business Manual", url: "https://thebusinessmanual.ph/the-c-suite/cover/cecilio-pedro-lamoiyan-corporation/" },
  },
  {
    id: "speed", name: "Society of Philippine Entertainment Editors (SPEEd)",
    summary: "SPEEd began as a social group of Philippine entertainment editors before developing projects to support the local entertainment industry. In 2017, it launched The Eddys, an awards program recognizing work in Philippine cinema.",
    source: { label: "SPEEd members' account — Balita", url: "https://balita.mb.com.ph/2017/06/12/eddys-awards-ambag-ng-entertainment-editors-sa-local-movie-industry/" },
  },
  {
    id: "city-of-mandaluyong", name: "City of Mandaluyong",
    summary: "Formerly known as San Felipe Neri, Mandaluyong separated from Santa Ana in 1841. It became an independent municipality in 1907 and was converted into a highly urbanized city under Republic Act 7675 in 1994.",
    source: { label: "City of Mandaluyong political history", url: "https://mandaluyong.gov.ph/profile/political-history-2/" },
  },
  {
    id: "thalassemia-kids-club", name: "Thalassemia Kids Club",
    summary: "The NCH Thalassemia Kids Club is a patient community associated with National Children's Hospital. It supports family-centered initiatives for children with thalassemia, alongside advocacy and clinical teams working to improve access to care.",
    source: { label: "Philippine Pediatric Society convention program", url: "https://convention2026.pps.org.ph/wp-content/uploads/2026/04/63rd-PPS-Souvenir-Program-2026.pdf" },
  },
  {
    id: "the-pickle-yard", name: "The Pickle Yard PH",
    summary: "The Pickle Yard is a pickleball club in Parañaque, Metro Manila. It appears in the Philippine Pickleball Federation's club directory, connecting local players with a place to take part in the sport.",
    source: { label: "Philippine Pickleball Federation club directory", url: "https://www.pickleball.ph/pickleball-clubs.html" },
  },
  {
    id: "mamou-human-resources", name: "Mamou Human Resources Department",
    summary: "Mamou grew from restaurateur Malou Forés' home cooking and the encouragement of friends to open a restaurant. The family-run restaurant business developed around its home-kitchen menu and hospitality. This partner listing recognizes its Human Resources Department.",
    source: { label: "Founders' interview — The Philippine Star", url: "https://www.philstar.com/lifestyle/sunday-life/2021/05/16/2098462/malou-and-raul-fores-mother-son-bonding-becomes-warmer-kitchen" },
  },
];
