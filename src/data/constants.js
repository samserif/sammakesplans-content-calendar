// ── Brand tokens ──────────────────────────────────────────────
export const C = {
  purple:    "#6B4CA0",
  purpleLt:  "#EDE8F5",
  purpleMid: "#9B7CC8",
  lavender:  "#C4ADFF",
  stone:     "#8C7B6B",
  stoneLt:   "#B5A48A",
  white:     "#F7F4F0",
  linen:     "#EDE8E0",
  ink:       "#1A1020",
  mid:       "#7A6A5A",
  ig:        "#E1306C",
  li:        "#0A66C2",
  ss:        "#FF6719",
  ssNote:    "#C44E0A",
  green:     "#2D7A4F",
  teal:      "#0E7490",
};

// ── Platforms ─────────────────────────────────────────────────
export const PLATFORMS = [
  { key:"ig-reel",      label:"IG Reel",         color:"#E1306C", short:"Reel"       },
  { key:"ig-carousel",  label:"IG Carousel",      color:"#C01A55", short:"Carousel"   },
  { key:"ig-static",    label:"IG Static",        color:"#F06292", short:"Static"     },
  { key:"ig-quote",     label:"IG Pull Quote",    color:"#AD1457", short:"Quote"      },
  { key:"linkedin",     label:"LinkedIn",         color:"#0A66C2", short:"LinkedIn"   },
  { key:"substack",     label:"Substack",         color:"#FF6719", short:"Substack"   },
  { key:"ss-note",      label:"Substack Note",    color:"#C44E0A", short:"SS Note"    },
];

export const platByKey = k => PLATFORMS.find(p => p.key === k) || PLATFORMS[0];

// ── Themes (content pillars) ──────────────────────────────────
export const THEMES = [
  { key:"advising",  label:"Travel Advising",    color:"#6B4CA0", icon:"🧭", desc:"The business, AI, modern advisor POV, how it works" },
  { key:"stories",   label:"Travel Stories",      color:"#2D7A4F", icon:"✈️", desc:"Personal trips, firsthand experiences, destination takes" },
  { key:"pov",       label:"Travel POV",          color:"#0E7490", icon:"💬", desc:"Opinions, overtourism, accessibility, industry takes" },
  { key:"intel",     label:"Group Travel Intel",  color:"#B45309", icon:"📋", desc:"Actionable guides, itineraries, trip types, booking windows" },
  { key:"filler",    label:"Filler",              color:"#6B7280", icon:"🎲", desc:"Low-lift content: photo slideshows, polls, BTS, short notes" },
];

export const themeByKey = k => THEMES.find(t => t.key === k) || THEMES[0];

// ── Status ────────────────────────────────────────────────────
export const STATUS = [
  { key:"idea",   label:"💡 Idea",    bg:"#FFF8E7", border:"#F0C040", text:"#7A5C00" },
  { key:"draft",  label:"✍️ Draft",   bg:"#EDE8F5", border:"#6B4CA0", text:"#6B4CA0" },
  { key:"ready",  label:"✅ Ready",   bg:"#E8F5EE", border:"#2D7A4F", text:"#2D7A4F" },
  { key:"posted", label:"🚀 Posted",  bg:"#F0F0F0", border:"#999",    text:"#555"    },
];

export const statusByKey = k => STATUS.find(s => s.key === k) || STATUS[0];

// ── Calendar config ───────────────────────────────────────────
export const DOW = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export const MONTH_CFG = [
  { name:"June",   start:0, days:30 },
  { name:"July",   start:2, days:31 },
  { name:"August", start:5, days:31 },
];
