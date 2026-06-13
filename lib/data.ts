// Content store for Larissa Wand — tattoo artist (Galway, Ireland) & ocean photographer.
// Bilingual (PT default / EN). All user-facing copy is resolved per language
// through getContent(lang); structural data (images, tones, hrefs) is shared.
//
// Images live in /public/fotos and are referenced by absolute path. They are the
// artist's own photos: tattoos (tatuagens), portraits (pessoais) and travel /
// ocean photography (viagens).

export type Lang = "pt" | "en";

// Local image helper: F("tatuagens", "IMG_3797") -> "/fotos/tatuagens/IMG_3797.png"
const F = (cat: "tatuagens" | "pessoais" | "viagens", file: string) =>
  `/fotos/${cat}/${file}.png`;

// --- Tattoos (real work) -------------------------------------------------
const HORSE_A = F("tatuagens", "IMG_3797"); // horse on back, wider crop
const HORSE_B = F("tatuagens", "IMG_3798"); // horse on back, clean
const SUN_A = F("tatuagens", "IMG_3799"); // sun + face on forearm
const SUN_B = F("tatuagens", "IMG_3800"); // sun + face, macro
const FAIRY_A = F("tatuagens", "IMG_3801"); // fairy + flowers
const FAIRY_B = F("tatuagens", "IMG_3802"); // fairy, alt angle
const FAIRY_C = F("tatuagens", "IMG_3803"); // fairy, with florals
const DEATH_A = F("tatuagens", "IMG_3804"); // "THE DEATH" tarot card
const DEATH_B = F("tatuagens", "IMG_3805"); // death card, alt
const DEATH_C = F("tatuagens", "IMG_3806"); // death card, alt

// --- Portraits / studio (pessoais) --------------------------------------
const PORTRAIT = F("pessoais", "IMG_3795"); // Larissa portrait
const WORKING = F("pessoais", "IMG_3796"); // tattooing in progress
const SHOP = F("pessoais", "IMG_3807"); // at Victor Tattoo, Galway
const HANDS = F("pessoais", "IMG_3808"); // gloved hands / stencil

// --- Ocean & travel photography (viagens) -------------------------------
const DIVER_HALO = F("viagens", "IMG_3815"); // freediver, sun halo
const TURTLE = F("viagens", "IMG_3816"); // snorkeler + sea turtle
const DIVER_BURST = F("viagens", "IMG_3817"); // freediver, sunburst
const DOLPHINS = F("viagens", "IMG_3818"); // wild dolphins
const STINGRAY = F("viagens", "IMG_3819"); // freediver + stingray
const BEACH_WALK = F("viagens", "IMG_3820"); // Larissa on Hawaii beach
const CLIFF = F("viagens", "IMG_3822"); // sea cliff over the Pacific
const SUNSET = F("viagens", "IMG_3823"); // beach sunset, Oahu
const SHARK_DEEP = F("viagens", "IMG_3824"); // freediver + shark, deep blue
const FRANKFURT = F("viagens", "IMG_3811"); // Frankfurt old town
const GALWAY = F("viagens", "IMG_3813"); // Galway waterfront

// Language-independent brand facts.
export const brand = {
  name: "LARISSA WAND",
  instagram: "@larissawandtattoo",
  instagramUrl: "https://instagram.com/larissawandtattoo",
  // Booking is by Instagram DM; walk-ins at the Galway studio (Google Maps link).
  whatsapp: "Victor Tattoo · Galway",
  whatsappUrl:
    "https://www.google.com/maps/search/Victor+Tattoo+and+Body+Piercing+Galway",
  email: "larissawandtattoo@gmail.com",
} as const;

export type Work = {
  title: string;
  caption: string;
  tone: string;
  miniTone: string;
  img: string;
  miniImg: string;
};

export type Photo = {
  title: string;
  caption: string;
  category: string;
  tone: string;
  img: string;
};

// Decorative slider codenames (not translated).
const heroSlideMeta = [
  { name: "HORSE", tone: "#3a352f", img: HORSE_B },
  { name: "SUN", tone: "#7a6048", img: SUN_A },
  { name: "FAIRY", tone: "#8a7560", img: FAIRY_B },
  { name: "DEATH", tone: "#6a5a50", img: DEATH_A },
  { name: "DEEP", tone: "#1a3a6a", img: SHARK_DEEP },
  { name: "HALO", tone: "#3a6a82", img: DIVER_HALO },
];

const bookingSlideMeta = [
  { name: "SOL", tone: "#7a6048", img: SUN_B },
  { name: "FADA", tone: "#8a7560", img: FAIRY_C },
  { name: "GALOPE", tone: "#3a352f", img: HORSE_A },
  { name: "TARTARUGA", tone: "#2a4a52", img: TURTLE },
  { name: "ARRAIA", tone: "#4a8a9a", img: STINGRAY },
  { name: "GOLFINHO", tone: "#3a5a62", img: DOLPHINS },
];

const studioImages = {
  portrait: PORTRAIT,
  portraitTone: "#b89a7a",
  altPortraits: [
    { tone: "#2a2622", img: WORKING },
    { tone: "#1f1f1f", img: SHOP },
    { tone: "#15140f", img: HANDS },
  ],
};

// pick: small helper to choose a string by language.
const p = (lang: Lang, pt: string, en: string) => (lang === "pt" ? pt : en);

export function getContent(lang: Lang) {
  return {
    lang,
    langToggleLabel: lang === "pt" ? "EN" : "PT",

    brand: {
      ...brand,
      role: p(lang, "Tatuadora & Fotógrafa", "Tattoo Artist & Photographer"),
      location: p(lang, "Galway, Irlanda", "Galway, Ireland"),
    },

    // Navbar / footer share this set (logo links home separately).
    nav: [
      { label: p(lang, "Início", "Home"), href: "/" },
      { label: p(lang, "Sobre", "About"), href: "/sobre" },
      { label: p(lang, "Trabalhos", "Work"), href: "/trabalhos" },
      { label: p(lang, "Contato", "Contact"), href: "#booking" },
    ],

    hero: {
      intro: p(
        lang,
        "Tatuadora brasileira há mais de 6 anos, hoje vivendo em Galway, na Irlanda. Trabalhos ilustrativos de alto contraste — e fotografia do oceano e do mergulho livre.",
        "Brazilian tattoo artist for 6+ years, now living in Galway, Ireland. High-contrast illustrative work — and ocean & freediving photography.",
      ),
      top: lang === "pt" ? ["Onde", "a Tinta"] : ["Where", "Ink"],
      bottom: lang === "pt" ? ["Encontra", "a Água"] : ["Meets", "Water"],
      scroll: p(lang, "Rolar", "Scroll"),
    },

    slideView: p(lang, "Ver", "View"),
    heroSlides: heroSlideMeta,
    bookingSlides: bookingSlideMeta,

    styles: {
      // Big centred heading for the section.
      eyebrow: p(lang, "O que você encontra aqui", "What you'll find here"),
      // A mix of the tattoo work and the ocean / travel side — each row has its
      // own right-hand tag and links to the matching part of the site.
      items: [
        { no: "/01", title: "Blackwork", tag: p(lang, "Tatuagem", "Tattoo"), href: "#work", tone: "#3a352f", img: HORSE_B },
        { no: "/02", title: p(lang, "Traço Fino", "Fine Line"), tag: p(lang, "Tatuagem", "Tattoo"), href: "#work", tone: "#8a7560", img: FAIRY_B },
        { no: "/03", title: p(lang, "Pontilhismo", "Dotwork"), tag: p(lang, "Tatuagem", "Tattoo"), href: "#work", tone: "#7a6048", img: SUN_A },
        { no: "/04", title: p(lang, "Ilustrativo", "Illustrative"), tag: p(lang, "Tatuagem", "Tattoo"), href: "#work", tone: "#6a5a50", img: DEATH_A },
        { no: "/05", title: p(lang, "Criaturas Míticas", "Mythical Creatures"), tag: p(lang, "Folclore", "Folklore"), href: "#work", tone: "#8a7560", img: FAIRY_A },
        { no: "/06", title: p(lang, "Mergulho Livre", "Freediving"), tag: p(lang, "Oceano", "Ocean"), href: "#lens", tone: "#3a6a82", img: DIVER_HALO },
        { no: "/07", title: p(lang, "Vida Marinha", "Marine Life"), tag: p(lang, "Oceano", "Ocean"), href: "#lens", tone: "#2a4a52", img: TURTLE },
        { no: "/08", title: p(lang, "Fotografia", "Photography"), tag: p(lang, "Viagem", "Travel"), href: "#lens", tone: "#8a6a6a", img: SUNSET },
      ],
    },

    work: {
      pageTitle: p(lang, "Trabalhos", "Work"),
      title: p(lang, "Trabalhos Selecionados", "Selected Work"),
      desc: p(
        lang,
        "Algumas peças que amei fazer — cavalos, sóis, fadas e cartas de tarô em alto contraste. Toque em qualquer uma para ver em tamanho real.",
        "A few pieces I loved making — horses, suns, fairies and tarot cards in high contrast. Tap any to see it full size.",
      ),
      seeAll: p(lang, "Ver todos os trabalhos", "See all work"),
      // Homepage grid (null = empty cell; last null = "see all" card).
      selected: [
        null,
        work(lang, "Cavalo Selvagem", "Wild Horse", "Blackwork · costas", "Blackwork · back", "#3a352f", "#1a1814", HORSE_B, HORSE_A),
        work(lang, "Sol Nascente", "Rising Sun", "Pontilhismo · antebraço", "Dotwork · forearm", "#7a6048", "#3a2c1e", SUN_A, SUN_B),
        work(lang, "Fada", "Fairy", "Traço fino · coxa", "Fine line · thigh", "#8a7560", "#3a2e22", FAIRY_B, FAIRY_C),
        work(lang, "A Morte", "The Death", "Preto & cinza · antebraço", "Black & grey · forearm", "#6a5a50", "#2a2018", DEATH_A, DEATH_B),
        null,
        work(lang, "Galope", "Gallop", "Blackwork · costas", "Blackwork · back", "#3a352f", "#1a1814", HORSE_A, HORSE_B),
        work(lang, "Sol & Lua", "Sun & Moon", "Pontilhismo · braço", "Dotwork · arm", "#7a6048", "#3a2c1e", SUN_B, SUN_A),
        work(lang, "Criatura Mítica", "Mythical Creature", "Botânico · coxa", "Botanical · thigh", "#8a7560", "#3a2e22", FAIRY_C, FAIRY_A),
        work(lang, "Carta de Tarô", "Tarot Card", "Ilustrativo · antebraço", "Illustrative · forearm", "#6a5a50", "#2a2018", DEATH_C, DEATH_A),
        null,
        null,
      ] as (Work | null)[],
      // Full /work gallery — every distinct piece.
      all: [
        work(lang, "Cavalo Selvagem", "Wild Horse", "Blackwork · costas", "Blackwork · back", "#3a352f", "#1a1814", HORSE_B, HORSE_A),
        work(lang, "Galope", "Gallop", "Blackwork · costas", "Blackwork · back", "#3a352f", "#1a1814", HORSE_A, HORSE_B),
        work(lang, "Sol Nascente", "Rising Sun", "Pontilhismo · antebraço", "Dotwork · forearm", "#7a6048", "#3a2c1e", SUN_A, SUN_B),
        work(lang, "Sol & Lua", "Sun & Moon", "Pontilhismo · braço", "Dotwork · arm", "#7a6048", "#3a2c1e", SUN_B, SUN_A),
        work(lang, "Fada", "Fairy", "Traço fino · coxa", "Fine line · thigh", "#8a7560", "#3a2e22", FAIRY_B, FAIRY_C),
        work(lang, "Fada Adormecida", "Sleeping Fairy", "Traço fino · coxa", "Fine line · thigh", "#8a7560", "#3a2e22", FAIRY_A, FAIRY_C),
        work(lang, "Criatura Mítica", "Mythical Creature", "Botânico · coxa", "Botanical · thigh", "#8a7560", "#3a2e22", FAIRY_C, FAIRY_A),
        work(lang, "A Morte", "The Death", "Preto & cinza · antebraço", "Black & grey · forearm", "#6a5a50", "#2a2018", DEATH_A, DEATH_B),
        work(lang, "Carta de Tarô", "Tarot Card", "Ilustrativo · antebraço", "Illustrative · forearm", "#6a5a50", "#2a2018", DEATH_C, DEATH_A),
        work(lang, "Transformação", "Rebirth", "Preto & cinza · antebraço", "Black & grey · forearm", "#6a5a50", "#2a2018", DEATH_B, DEATH_C),
      ] as Work[],
    },

    lens: {
      eyebrow: p(lang, "Pela Minha Lente", "Through My Lens"),
      title: lang === "pt" ? ["Abaixo da", "Superfície"] : ["Below the", "Surface"],
      marquee: p(lang, "OCEANO — VIDA MARINHA — VIAGEM", "OCEAN — MARINE LIFE — TRAVEL"),
      categories: [
        p(lang, "Oceano", "Ocean"),
        p(lang, "Vida Marinha", "Marine Life"),
        p(lang, "Viagem", "Travel"),
      ],
      photos: [
        photo(lang, "Halo", "Halo", "Havaí", "Hawaii", p(lang, "Oceano", "Ocean"), "#3a6a82", DIVER_HALO),
        photo(lang, "Águas Profundas", "Deep Water", "Havaí", "Hawaii", p(lang, "Vida Marinha", "Marine Life"), "#1a3a6a", SHARK_DEEP),
        photo(lang, "Golfinhos", "Dolphins", "Havaí", "Hawaii", p(lang, "Vida Marinha", "Marine Life"), "#3a5a62", DOLPHINS),
        photo(lang, "Arraia", "Stingray", "Mo'orea", "Mo'orea", p(lang, "Vida Marinha", "Marine Life"), "#4a8a9a", STINGRAY),
        photo(lang, "Raios de Sol", "Sunbeams", "Havaí", "Hawaii", p(lang, "Oceano", "Ocean"), "#2f6a7a", DIVER_BURST),
        photo(lang, "Tartaruga", "Sea Turtle", "Havaí", "Hawaii", p(lang, "Vida Marinha", "Marine Life"), "#2a4a52", TURTLE),
        photo(lang, "Fim de Tarde", "Golden Hour", "Oahu", "Oahu", p(lang, "Viagem", "Travel"), "#8a6a6a", SUNSET),
        photo(lang, "Falésia", "Sea Cliff", "Havaí", "Hawaii", p(lang, "Oceano", "Ocean"), "#5a6a72", CLIFF),
      ],
    },

    studio: {
      pageTitle: p(lang, "Sobre", "About"),
      title: p(lang, "Sobre a Artista", "About the Artist"),
      cta: p(lang, "Saber mais sobre a profissional", "More about the artist"),
      images: studioImages,
      // Short version for the homepage teaser.
      summary:
        lang === "pt"
          ? [
              "SOU A LARISSA — BRASILEIRA, TATUADORA HÁ MAIS DE 6 ANOS E HOJE VIVENDO EM GALWAY, NA IRLANDA. FAÇO TATUAGENS ILUSTRATIVAS DE ALTO CONTRASTE E AMO DAR PELE A CRIATURAS MÍTICAS. ENTRE UMA SESSÃO E OUTRA, ESTOU NO OCEANO COM A CÂMERA — MERGULHO LIVRE, VIDA MARINHA E LUZ.",
            ]
          : [
              "I'M LARISSA — A BRAZILIAN TATTOO ARTIST FOR OVER 6 YEARS, NOW LIVING IN GALWAY, IRELAND. I MAKE HIGH-CONTRAST ILLUSTRATIVE TATTOOS AND LOVE BRINGING MYTHICAL CREATURES TO LIFE. BETWEEN SESSIONS, I'M IN THE OCEAN WITH MY CAMERA — FREEDIVING, MARINE LIFE AND LIGHT.",
            ],
      // Full version for the /sobre page.
      paragraphs:
        lang === "pt"
          ? [
              "SOU A LARISSA — BRASILEIRA, TATUO HÁ MAIS DE SEIS ANOS E HOJE MORO NA IRLANDA, ONDE TRABALHO NA VICTOR TATTOO AND BODY PIERCING, EM GALWAY. MINHA MARCA É O ALTO CONTRASTE: TRAÇOS ILUSTRATIVOS, PRETO PROFUNDO E PEÇAS FEITAS PARA DURAR.",
              "AMO TATUAR CRIATURAS MÍTICAS. SEGUNDO O FOLCLORE IRLANDÊS, AS FADAS SÃO SERES ANTIGOS E SOBRENATURAIS — E EU NÃO ME CANSO DE DESENHÁ-LAS, ASSIM COMO CAVALOS, SÓIS E CARTAS DE TARÔ CHEIAS DE SIMBOLISMO.",
              "QUANDO NÃO ESTOU NA MÁQUINA, ESTOU NA ÁGUA. O OCEANO, A VIDA MARINHA E O MERGULHO LIVRE SÃO A MINHA OUTRA PAIXÃO — E A CÂMERA VEM JUNTO. JÁ NADEI AO LADO DE GOLFINHOS SELVAGENS, ARRAIAS E TUBARÕES.",
              "GALWAY É O COMEÇO DE UM NOVO CAPÍTULO. VOCÊ PODE AGENDAR UMA SESSÃO COMIGO POR DM OU SIMPLESMENTE APARECER NO ESTÚDIO — ATENDO WALK-INS TAMBÉM. PRIMEIRO A CHEGAR, PRIMEIRO A SER ATENDIDO.",
            ]
          : [
              "I'M LARISSA — A BRAZILIAN ARTIST, TATTOOING FOR OVER SIX YEARS AND NOW LIVING IN IRELAND, WHERE I WORK AT VICTOR TATTOO AND BODY PIERCING IN GALWAY. MY SIGNATURE IS HIGH CONTRAST: ILLUSTRATIVE LINEWORK, DEEP BLACK AND PIECES MADE TO LAST.",
              "I LOVE TATTOOING MYTHICAL CREATURES. ACCORDING TO IRISH FOLKLORE, FAIRIES ARE ANCIENT, SUPERNATURAL BEINGS — AND I NEVER TIRE OF DRAWING THEM, ALONG WITH HORSES, SUNS AND TAROT CARDS FULL OF SYMBOLISM.",
              "WHEN I'M NOT AT THE MACHINE, I'M IN THE WATER. THE OCEAN, MARINE LIFE AND FREEDIVING ARE MY OTHER LOVE — AND THE CAMERA COMES WITH ME. I'VE SWUM ALONGSIDE WILD DOLPHINS, STINGRAYS AND SHARKS.",
              "GALWAY IS THE START OF A NEW CHAPTER. YOU CAN BOOK A SESSION WITH ME BY DM OR JUST POP INTO THE SHOP — I TAKE WALK-INS TOO. FIRST COME, FIRST SERVED.",
            ],
    },

    travels: {
      eyebrow: p(lang, "Pelo Mundo", "Around the World"),
      title: lang === "pt" ? ["Onde já estive", "e o que vem a seguir"] : ["Where I've been", "and what comes next"],
      intro: p(
        lang,
        "Um mapa do que moldou meu olhar — do estúdio em Galway aos mergulhos no Pacífico — e dos próximos sonhos de água azul.",
        "A map of what shaped my eye — from the studio in Galway to dives in the Pacific — and the next blue-water dreams.",
      ),
      filters: {
        all: p(lang, "Tudo", "All"),
        past: p(lang, "Já visitei", "Visited"),
        future: p(lang, "Planejado", "Planned"),
      },
      pastTag: p(lang, "Visitei", "Visited"),
      futureTag: p(lang, "Em breve", "Upcoming"),
      cities: [
        city(lang, "past", "Galway", "Galway", "Irlanda", "Ireland", "2024", GALWAY, "#5a6a72",
          "ONDE VIVO E TATUO HOJE, NA VICTOR TATTOO AND BODY PIERCING. O COMEÇO DE UM NOVO CAPÍTULO.",
          "WHERE I LIVE AND TATTOO NOW, AT VICTOR TATTOO AND BODY PIERCING. THE START OF A NEW CHAPTER."),
        city(lang, "past", "Frankfurt", "Frankfurt", "Alemanha", "Germany", "2024", FRANKFURT, "#6a5a4a",
          "RUAS ANTIGAS, LUZ CINZENTA E O CHEIRO DE UMA EUROPA QUE AINDA ERA NOVA PARA MIM.",
          "OLD STREETS, GREY LIGHT AND THE SMELL OF A EUROPE THAT WAS STILL NEW TO ME."),
        city(lang, "past", "Oahu", "Oahu", "Havaí", "Hawaii", "2025", BEACH_WALK, "#a89a7a",
          "LITERALMENTE VIVENDO O SONHO — DIAS DE MERGULHO, NADADEIRAS NA AREIA E O PACÍFICO INTEIRO PRA MIM.",
          "LITERALLY LIVING THE DREAM — DAYS OF FREEDIVING, FINS IN THE SAND AND THE WHOLE PACIFIC TO MYSELF."),
        city(lang, "past", "Mo'orea", "Mo'orea", "Polinésia Francesa", "French Polynesia", "2025", STINGRAY, "#4a8a9a",
          "UMA ILHA DO PACÍFICO SUL. NADEI AO LADO DE ARRAIAS E ENTENDI O QUE É ÁGUA TRANSPARENTE.",
          "A SOUTH PACIFIC ISLAND. I SWAM BESIDE STINGRAYS AND FINALLY UNDERSTOOD WHAT CLEAR WATER MEANS."),
        city(lang, "future", "Açores", "Azores", "Portugal", "Portugal", "2026", DIVER_BURST, "#2f6a7a",
          "PLANEJADO — ÁGUA AZUL, BALEIAS E MERGULHO LIVRE NO MEIO DO ATLÂNTICO.",
          "PLANNED — BLUE WATER, WHALES AND FREEDIVING IN THE MIDDLE OF THE ATLANTIC."),
        city(lang, "future", "Dahab", "Dahab", "Egito", "Egypt", "2026", SHARK_DEEP, "#1a3a6a",
          "O BLUE HOLE É UM SONHO ANTIGO DE MERGULHO QUE QUERO REALIZAR EM BREVE.",
          "THE BLUE HOLE IS AN OLD FREEDIVING DREAM I WANT TO MAKE REAL SOON."),
      ],
    },

    process: {
      title: p(lang, "Como Funciona", "How It Works"),
      desc: p(
        lang,
        "Agende pela DM ou apareça para um walk-in — do primeiro contato à peça cicatrizada, sempre calmo e claro.",
        "Book by DM or drop in for a walk-in — from first contact to a healed piece, always calm and clear.",
      ),
      steps:
        lang === "pt"
          ? [
              { no: "01", title: "Ideia & Referência", desc: "Me manda uma DM com a ideia ou referência, o tamanho (cm ou polegadas) e onde no corpo. Se for escrita, manda a fonte também." },
              { no: "02", title: "Orçamento & Data", desc: "Respondo com um orçamento e fechamos a data. Um pequeno sinal garante o seu horário." },
              { no: "03", title: "A Sessão", desc: "Na Victor Tattoo and Body Piercing, em Galway. Ambiente limpo, alto contraste e o tempo que a peça merece." },
              { no: "04", title: "Walk-in & Cuidados", desc: "De passagem por Galway? Pode só aparecer — atendo walk-ins. Você sai com a peça protegida e um guia de cuidados." },
            ]
          : [
              { no: "01", title: "Idea & Reference", desc: "DM me your idea or reference, the size (cm or inches) and the placement. If it's script, send a font reference too." },
              { no: "02", title: "Quote & Date", desc: "I reply with a quote and we lock a date. A small deposit secures your slot." },
              { no: "03", title: "The Session", desc: "At Victor Tattoo and Body Piercing in Galway. Clean setup, high contrast and the time the piece deserves." },
              { no: "04", title: "Walk-ins & Aftercare", desc: "Passing through Galway? Just pop in — I take walk-ins. You leave with a wrapped piece and a clear aftercare guide." },
            ],
    },

    booking: {
      eyebrow: p(lang, "Agenda aberta — Galway, Irlanda", "Bookings open — Galway, Ireland"),
      title: lang === "pt" ? ["Vamos fazer", "algo permanente"] : ["Let's make", "something permanent"],
      cta: p(lang, "Agendar por DM", "Book via DM"),
      marquee: p(lang, "ONDE A TINTA ENCONTRA A ÁGUA", "WHERE INK MEETS WATER"),
    },

    footer: {
      policies: [
        p(lang, "Cuidados", "Aftercare"),
        p(lang, "Política do Estúdio", "Studio Policy"),
      ],
      rights: p(lang, "Todos os direitos reservados", "All rights reserved"),
      credit: p(lang, "Criado por", "Created by"),
    },
  };
}

export type Content = ReturnType<typeof getContent>;

function work(
  lang: Lang,
  ptTitle: string,
  enTitle: string,
  ptCaption: string,
  enCaption: string,
  tone: string,
  miniTone: string,
  img: string,
  miniImg: string,
): Work {
  return {
    title: lang === "pt" ? ptTitle : enTitle,
    caption: lang === "pt" ? ptCaption : enCaption,
    tone,
    miniTone,
    img,
    miniImg,
  };
}

function photo(
  lang: Lang,
  ptTitle: string,
  enTitle: string,
  ptCaption: string,
  enCaption: string,
  category: string,
  tone: string,
  img: string,
): Photo {
  return {
    title: lang === "pt" ? ptTitle : enTitle,
    caption: lang === "pt" ? ptCaption : enCaption,
    category,
    tone,
    img,
  };
}

export type City = {
  type: "past" | "future";
  city: string;
  country: string;
  year: string;
  img: string;
  tone: string;
  note: string;
};

function city(
  lang: Lang,
  type: "past" | "future",
  ptCity: string,
  enCity: string,
  ptCountry: string,
  enCountry: string,
  year: string,
  img: string,
  tone: string,
  ptNote: string,
  enNote: string,
): City {
  return {
    type,
    city: lang === "pt" ? ptCity : enCity,
    country: lang === "pt" ? ptCountry : enCountry,
    year,
    img,
    tone,
    note: lang === "pt" ? ptNote : enNote,
  };
}
