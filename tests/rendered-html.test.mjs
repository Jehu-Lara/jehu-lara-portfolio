import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function createWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

async function render(pathname) {
  const worker = await createWorker();
  const response = await worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
      IMAGES: {},
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
  return { response, html: await response.text() };
}

function countMatches(value, pattern) {
  return [...value.matchAll(pattern)].length;
}

function contrastRatio(foreground, background) {
  const luminance = (hex) => {
    const channels = hex.match(/[a-f\d]{2}/gi).map((value) => parseInt(value, 16) / 255);
    const linear = channels.map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    );
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  };
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

const routes = [
  ["/", "en", "I turn operational data into auditable decisions.", "/es"],
  ["/work", "en", "Work", "/es/work"],
  ["/work/qualityops", "en", "QualityOps", "/es/work/qualityops"],
  ["/work/paro-live-oee-platform", "en", "PARO Live OEE", "/es/work/paro-live-oee-platform"],
  ["/es", "es-MX", "Convierto datos operativos en decisiones auditables.", "/"],
  ["/es/work", "es-MX", "Proyectos", "/work"],
  ["/es/work/qualityops", "es-MX", "QualityOps", "/work/qualityops"],
  ["/es/work/paro-live-oee-platform", "es-MX", "PARO OEE en vivo", "/work/paro-live-oee-platform"],
];

const linkedInUrl = "https://www.linkedin.com/in/jehu-lara-corona-601956332/";
const email = "Jehulara422@gmail.com";
const gmailComposeUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=Jehulara422%40gmail.com";
const renderedGmailComposeUrl = gmailComposeUrl.replaceAll("&", "&amp;");
const deckFiles = [
  "01-overview.png",
  "02-architecture.png",
  "03-evidence.png",
  "04-validation.png",
  "05-roadmap.png",
];
const deckHashes = {
  "en/01-overview.png": "E207C8164EF077B419C3224BA6082ECD3019441AC2A452FDA86E62C42B0A1385",
  "en/02-architecture.png": "5426CA6C3933C36C4B5C5E068393E08B03ACA343A99A9272A0AC5D195EC008E1",
  "en/03-evidence.png": "C93901823672CB0D793D25905AC874CC7F4EBE4264635DA79781C4AC020F2787",
  "en/04-validation.png": "82BC9E76B5481B61003F0EC4E5089B571600AB49AA1E4D5A8DD82521D5B36935",
  "en/05-roadmap.png": "9460251061FA94C5DC9616284E0B5ACBBE33B2977F35CABF2357FCB02E8CAD41",
  "es/01-overview.png": "297594ACDE27D717D0CF0956B797BBB98B80A3C1B988EB00FEA4D54C8EC07DBF",
  "es/02-architecture.png": "EDB806A263529C2EE1C2872D2CDA6ADD0251A1ADC3C2E1E46578255E6CEC945E",
  "es/03-evidence.png": "F3F9F22AB3F9FAE250CE8E3844F79EAB8E701A9EAAFA79E02FE54F959529EFF6",
  "es/04-validation.png": "FB66212A2D363A01F84D83CAC062E54486C257A32D621FE04318C7C05DBBB3AA",
  "es/05-roadmap.png": "AC3DB643A767D71AA9275369ACA91447CA2AC5A8DFD0D3E3B2ECA82803771C5C",
};

test("server-renders all eight localized routes with semantic essentials", async () => {
  const titles = new Set();
  const descriptions = new Set();

  for (const [pathname, lang, h1, alternate] of routes) {
    const { response, html } = await render(pathname);
    const visibleHtml = html.replace(/<script[\s\S]*?<\/script>/gi, "");
    assert.equal(response.status, 200, pathname);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, pathname);
    assert.match(html, new RegExp(`<html[^>]+lang="${lang}"`, "i"), pathname);
    assert.equal(countMatches(html, /<h1\b/gi), 1, `${pathname} has one h1`);
    assert.match(html, new RegExp(`<h1[^>]*>${h1.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</h1>`), pathname);
    assert.match(html, /href="#main-content"/, `${pathname} has a skip link`);
    assert.match(html, /<main[^>]+id="main-content"/, `${pathname} has main landmark`);
    assert.match(html, /aria-label="Primary navigation"|aria-label="Navegación principal"/, pathname);
    assert.doesNotMatch(html, /Your site is taking shape|Lorem ipsum|email coming soon|codex-preview|PEGA_AQUÍ/i);
    assert.doesNotMatch(html, /mailto:/i, `${pathname} has no mail-client dependency`);
    if (pathname === "/" || pathname === "/es") {
      assert.match(html, new RegExp(`href="${renderedGmailComposeUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`), `${pathname} has the exact Gmail compose URL`);
      assert.equal(countMatches(visibleHtml, /href="https:\/\/mail\.google\.com\/mail\//gi), 1, `${pathname} has exactly one Gmail compose link`);
      assert.match(visibleHtml, new RegExp(`${email}[\\s\\S]*?<span class="sr-only">`), `${pathname} shows the exact email`);
      assert.match(visibleHtml, new RegExp(`href="${renderedGmailComposeUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]+target="_blank"[^>]+rel="noreferrer"`), `${pathname} opens Gmail safely in a new tab`);
    } else {
      assert.doesNotMatch(html, /mail\.google\.com\/mail/i, `${pathname} has no unrequested Gmail link`);
      assert.doesNotMatch(html, new RegExp(email, "i"), `${pathname} does not expose the email`);
    }
    assert.match(html, new RegExp(`href="${linkedInUrl}"`), `${pathname} has the official LinkedIn URL`);
    assert.match(html, new RegExp(`href="${alternate}"[^>]+hrefLang="${lang === "en" ? "es" : "en"}"`, "i"), `${pathname} links to its equivalent locale`);
    if (lang === "en") {
      assert.doesNotMatch(visibleHtml, /Convierto datos operativos|Ver trabajo seleccionado|Navegación principal|Evidencia de QualityOps en cinco vistas/);
    } else {
      assert.doesNotMatch(visibleHtml, /I turn operational data|View selected work|Primary navigation|QualityOps evidence in five views/);
    }
    assert.doesNotMatch(html, /rel="canonical"/i, `${pathname} has no invented canonical`);

    const title = html.match(/<title>(.*?)<\/title>/i)?.[1];
    const description = html.match(/<meta[^>]+name="description"[^>]+content="([^"]+)"/i)?.[1];
    assert.ok(title, `${pathname} has title`);
    assert.ok(description, `${pathname} has description`);
    assert.ok(!titles.has(title), `${pathname} title is unique`);
    assert.ok(!descriptions.has(description), `${pathname} description is unique`);
    titles.add(title);
    descriptions.add(description);
    assert.match(html, /jehu-lara-social-card\.png/i, `${pathname} has the validated social card`);
  }
});

test("home leads with personal identity and keeps the project subordinate", async () => {
  for (const pathname of ["/", "/es"]) {
    const { html } = await render(pathname);
    const visibleHtml = html.replace(/<script[\s\S]*?<\/script>/gi, "");
    assert.match(html, /Jehu Lara/);
    assert.match(html, /Quality &amp; Analytics Engineer|Quality & Analytics Engineer/);
    assert.match(html, /View selected work|Ver trabajo seleccionado/);
    assert.match(html, /Visit Jehu Lara on GitHub|Visitar a Jehu Lara en GitHub/);
    assert.match(html, /Connect with Jehu Lara on LinkedIn|Conectar con Jehu Lara en LinkedIn/);
    for (const location of ["navigation", "hero", "contact", "footer"]) {
      assert.match(html, new RegExp(`data-linkedin-location="${location}"`), `${pathname} has LinkedIn in ${location}`);
    }
    assert.ok(html.indexOf("QualityOps") > html.indexOf("<h1"), pathname);
    assert.match(html, /"@type":"ProfilePage"/);
    assert.match(html, /"sameAs":\["https:\/\/github\.com\/Jehu-Lara","https:\/\/www\.linkedin\.com\/in\/jehu-lara-corona-601956332\/"\]/);
    assert.doesNotMatch(html, /"jobTitle"|"email"|"address"|"worksFor"/);
    assert.match(html, /Email is available for direct contact|El correo está disponible para contacto directo/);
    assert.match(html, /GitHub/);
    assert.match(html, /LinkedIn/);
    assert.match(visibleHtml, /class="selected-work-reel"/);
    assert.match(visibleHtml, /aria-roledescription="carousel"/);
    assert.match(visibleHtml, /aria-live="polite"/);
    assert.equal(countMatches(visibleHtml, /data-work-preview-id=/g), 2, `${pathname} has two reel indicators`);
    assert.match(visibleHtml, /data-work-preview-id="qualityops"/);
    assert.match(visibleHtml, /data-work-preview-id="paro-live-oee-platform"/);
    assert.match(visibleHtml, /Previous project|Proyecto anterior/);
    assert.match(visibleHtml, /Next project|Proyecto siguiente/);
    assert.match(visibleHtml, pathname === "/" ? /href="\/work\/qualityops"/ : /href="\/es\/work\/qualityops"/);
    assert.match(visibleHtml, /two versioned open-source cases|dos casos de código abierto versionados/);
    assert.equal(countMatches(visibleHtml, /<article class="project-card project-card--preview/g), 1, `${pathname} renders only the active slide`);
  }
});

test("project archive and cases come from the reusable project contract", async () => {
  for (const pathname of ["/work", "/es/work"]) {
    const { html } = await render(pathname);
    const visibleHtml = html.replace(/<script[\s\S]*?<\/script>/gi, "");
    assert.match(html, /Independent open-source technical project|Proyecto técnico independiente y de código abierto/);
    assert.match(html, /2026/);
    assert.match(html, /Manufacturing analytics|Análisis de manufactura/);
    assert.equal(countMatches(html, /<article class="project-card/g), 2);
    assert.match(visibleHtml, /PARO Live OEE|PARO OEE en vivo/);
  }

  for (const pathname of ["/work/qualityops", "/es/work/qualityops"]) {
    const { html } = await render(pathname);
    const visibleHtml = html.replace(/<script[\s\S]*?<\/script>/gi, "");
    const locale = pathname.startsWith("/es") ? "es" : "en";
    const oppositeLocale = locale === "en" ? "es" : "en";
    assert.match(html, /2004621/);
    assert.match(html, /20046215bfdfbc56b4615f48b314bdd827d086e7/);
    assert.match(html, /<details class="provenance-disclosure">/);
    assert.match(html, /View full provenance|Ver procedencia completa/);
    assert.match(html, /1,567/);
    assert.match(html, /1,463 \/ 104/);
    assert.match(html, /924,530/);
    assert.match(html, /41,951/);
    assert.match(html, /audited SQL queries|consultas SQL auditadas/);
    assert.equal(countMatches(html, /class="architecture-flow__number"/g), 6);
    assert.match(html, /Excel \/ public SECOM|Excel \/ SECOM público/);
    assert.match(html, /CI evidence|Evidencia de CI/);
    assert.match(html, /class="evidence-gallery"/);
    assert.match(html, /Previous|Anterior/);
    assert.match(html, /Next|Siguiente/);
    assert.match(html, /aria-live="polite"/);
    assert.match(html, /<dialog[^>]+class="evidence-lightbox"/);
    assert.equal(countMatches(html, /class="evidence-thumbnail"/g), 5);
    const localizedAssetPattern = new RegExp(`/presentations/qualityops/${locale}/(?:${deckFiles.join("|").replaceAll(".", "\\.")})`, "g");
    const referencedAssets = new Set(html.match(localizedAssetPattern) ?? []);
    assert.equal(referencedAssets.size, 5, `${pathname} references exactly five localized deck assets`);
    assert.doesNotMatch(html, new RegExp(`/presentations/qualityops/${oppositeLocale}/`));
    assert.match(html, /Auditable decisions from manufacturing data|Decisiones auditables a partir de datos de manufactura/);
    assert.match(html, /From source to auditable evidence|De la fuente a la evidencia auditable/);
    assert.match(html, /What the dataset says—|Lo que el dataset muestra—/);
    assert.match(html, /Validated across Minitab, Python, SQL, and DAX|Validado con Minitab, Python, SQL y DAX/);
    assert.match(html, /Delivered evidence, next steps, explicit limits|Evidencia entregada, próximos pasos y límites explícitos/);
    if (locale === "en") {
      assert.match(visibleHtml, /Slide 1 of 5/);
      assert.match(visibleHtml, /Open full-resolution slide/);
      assert.match(visibleHtml, /QualityOps title slide presenting auditable decisions/);
      assert.doesNotMatch(visibleHtml, /Diapositiva 1 de 5|Abrir diapositiva en resolución completa|Anterior|Siguiente|Ampliar diapositiva/);
      assert.match(html, /href="\/es\/work\/qualityops"[^>]+hrefLang="es"/i);
    } else {
      assert.match(visibleHtml, /Diapositiva 1 de 5/);
      assert.match(visibleHtml, /Abrir diapositiva en resolución completa/);
      assert.match(visibleHtml, /Diapositiva de apertura de QualityOps/);
      assert.doesNotMatch(visibleHtml, /Slide 1 of 5|Open full-resolution slide|Previous|Next|Expand slide/);
      assert.match(html, /href="\/work\/qualityops"[^>]+hrefLang="en"/i);
    }
    assert.match(html, /"@type":"SoftwareSourceCode"/);
    assert.doesNotMatch(html, /loaded_at|QUALITYOPS_DATABASE_URL|qualityops_powerbi_reader/i);
  }

  for (const pathname of ["/work/paro-live-oee-platform", "/es/work/paro-live-oee-platform"]) {
    const { html } = await render(pathname);
    const visibleHtml = html.replace(/<script[\s\S]*?<\/script>/gi, "");
    const locale = pathname.startsWith("/es") ? "es" : "en";
    const oppositeLocale = locale === "en" ? "es" : "en";
    assert.match(html, /396bd2b25bbbd70c849cacebc8b33a45a917628a/);
    assert.match(html, /206/);
    assert.match(html, /15 min/);
    assert.match(html, /48 h/);
    assert.match(html, /22\.1%/);
    assert.match(html, /synthetic|sintético/i);
    assert.match(html, /Power BI Desktop refresh and the final Desktop capture remain explicitly pending|refresh en Power BI Desktop y la captura final de Desktop permanecen explícitamente pendientes/);
    assert.match(html, /Render authentication, cron secrets, and production verification remain operator-gated|autenticación en Render, los secretos del cron y la verificación productiva permanecen bajo gate del operador/);
    assert.equal(countMatches(html, /class="architecture-flow__number"/g), 4);
    assert.equal(countMatches(html, /class="evidence-thumbnail"/g), 3);
    assert.match(html, new RegExp(`/presentations/paro/${locale}/01-case-study\\.png`));
    assert.doesNotMatch(html, new RegExp(`/presentations/paro/${oppositeLocale}/`));
    assert.match(html, /View code|Ver código/);
    assert.match(html, /Review deployment gate|Revisar gate de despliegue/);
    assert.doesNotMatch(visibleHtml, /Live demo|Demo en vivo/i, `${pathname} does not claim an undeployed demo link`);
    assert.doesNotMatch(html, /mailto:|Jehulara422@gmail\.com/i);
    assert.match(html, /"@type":"SoftwareSourceCode"/);
    if (locale === "en") {
      assert.match(html, /PARO Live OEE evidence presentation/);
      assert.match(visibleHtml, /·\s*(?:<!-- -->\s*)?source/);
    } else {
      assert.match(html, /Presentación de evidencia de PARO OEE en vivo/);
      assert.match(visibleHtml, /·\s*(?:<!-- -->\s*)?fuente/);
      assert.doesNotMatch(visibleHtml, /·\s*(?:<!-- -->\s*)?source/);
    }
  }
});

test("assets, reel, visual tokens, gallery behavior, and dependency boundary match the contract", async () => {
  const deckEntries = Object.entries(deckHashes);
  const [powerBi, social, css, gallery, reel, workPreviews, packageJson, hosting, ...deckAssets] = await Promise.all([
    readFile(new URL("../public/qualityops-powerbi-process-health.png", import.meta.url)),
    readFile(new URL("../public/jehu-lara-social-card.png", import.meta.url)),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../components/EvidenceGallery.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/SelectedWorkReel.tsx", import.meta.url), "utf8"),
    readFile(new URL("../content/work-previews.ts", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../.openai/hosting.json", import.meta.url), "utf8"),
    ...deckEntries.map(([path]) => readFile(new URL(`../public/presentations/qualityops/${path}`, import.meta.url))),
  ]);

  const gitBlob = createHash("sha1")
    .update(Buffer.from(`blob ${powerBi.length}\0`))
    .update(powerBi)
    .digest("hex");
  assert.equal(gitBlob, "155783347fd6a680417754d4a6e40ee49bb6d3df");
  assert.deepEqual([powerBi.readUInt32BE(16), powerBi.readUInt32BE(20)], [2368, 1332]);
  assert.deepEqual([social.readUInt32BE(16), social.readUInt32BE(20)], [1733, 907]);
  const observedDeckHashes = new Set();
  deckAssets.forEach((asset, index) => {
    const [path, expectedHash] = deckEntries[index];
    assert.deepEqual([asset.readUInt32BE(16), asset.readUInt32BE(20)], [1920, 1080], path);
    const hash = createHash("sha256").update(asset).digest("hex").toUpperCase();
    assert.equal(hash, expectedHash, `${path} remains byte-for-byte unchanged`);
    observedDeckHashes.add(hash);
  });
  assert.equal(observedDeckHashes.size, 10, "all ten deck exports are unique");

  const paroThumb = await readFile(new URL("../public/paro-live-oee-thumbnail.png", import.meta.url));
  const paroSlides = await Promise.all(
    ["en", "es"].flatMap((locale) =>
      ["01-case-study.png", "02-case-study.png", "03-case-study.png"].map((name) =>
        readFile(new URL(`../public/presentations/paro/${locale}/${name}`, import.meta.url)),
      ),
    ),
  );
  assert.deepEqual([paroThumb.readUInt32BE(16), paroThumb.readUInt32BE(20)], [1000, 750]);
  paroSlides.forEach((asset) => {
    assert.deepEqual([asset.readUInt32BE(16), asset.readUInt32BE(20)], [1920, 1080]);
  });
  for (let index = 0; index < 3; index += 1) {
    assert.equal(
      createHash("sha256").update(paroSlides[index]).digest("hex"),
      createHash("sha256").update(paroSlides[index + 3]).digest("hex"),
      `PARO slide ${index + 1} is intentionally identical across locale folders`,
    );
  }

  assert.ok(contrastRatio("10233f", "f4efe4") >= 4.5, "navy text on ivory");
  assert.ok(contrastRatio("006b62", "f4efe4") >= 4.5, "teal text on ivory");
  assert.ok(contrastRatio("10233f", "f3d59a") >= 4.5, "navy text on amber");
  assert.ok(contrastRatio("10233f", "fffdf8") >= 4.5, "contact GitHub navy text on paper");
  assert.ok(contrastRatio("10233f", "d8ece7") >= 4.5, "contact GitHub hover text on teal soft");
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /min-height:\s*44px/);
  assert.match(css, /\.case-hero__actions a\s*\{[^}]*min-height:\s*48px/s);
  const projectMediaRule = css.match(/\.project-card__media\s*\{([^}]*)\}/s)?.[1] ?? "";
  assert.match(projectMediaRule, /width:\s*100%/);
  assert.match(projectMediaRule, /min-width:\s*0/);
  assert.match(projectMediaRule, /overflow:\s*hidden/);
  assert.doesNotMatch(projectMediaRule, /aspect-ratio:\s*16\s*\/\s*9|height:\s*100%|align-self:\s*stretch/, "desktop media avoids the regressing sizing combination");
  assert.match(css, /@media \(max-width:\s*900px\)[\s\S]*?\.project-card__media\s*\{[^}]*aspect-ratio:\s*16\s*\/\s*9/s);
  assert.match(css, /\.project-card__media img\s*\{[^}]*object-fit:\s*contain/s);
  assert.match(css, /\.project-card:hover,\s*\.project-card:focus-within\s*\{[^}]*border-color:\s*var\(--teal\)[^}]*transform:\s*scale\(1\.004\)/s);
  assert.match(css, /\.project-card\s*\{[^}]*transition:[^}]*transform/s);
  assert.match(css, /\.linkedin-icon \+ span\s*\{[^}]*margin-inline-start:\s*0\.5rem/s);
  assert.match(css, /\.contact a\.button--light[\s\S]*?color:\s*var\(--navy\)/s);
  assert.match(css, /\.contact a\.button--light:hover\s*\{[^}]*background:\s*var\(--teal-soft\)/s);
  assert.match(css, /\.contact a:focus-visible\s*\{[^}]*outline-color:\s*var\(--paper\)/s);
  const reducedMotionRule = css.match(/@media \(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
  assert.match(reducedMotionRule, /\.project-card:hover,\s*\.project-card:focus-within\s*\{[^}]*transform:\s*none/s);
  assert.match(css, /\.evidence-slide__image\s*\{[^}]*object-fit:\s*contain/s);
  assert.match(css, /\.evidence-slide__image\s*\{[^}]*max-width:\s*100%/s);
  const deckRule = css.match(/\.evidence-slide--deck\s*\{([^}]*)\}/s)?.[1] ?? "";
  assert.match(deckRule, /margin:\s*0/);
  assert.match(deckRule, /padding:\s*0/);
  assert.match(deckRule, /width:\s*100%/);
  assert.match(deckRule, /height:\s*100%/);
  assert.match(css, /\.evidence-gallery__viewport\s*\{[^}]*aspect-ratio:\s*16\s*\/\s*9[^}]*min-height:\s*0/s);
  assert.match(css, /\.evidence-lightbox__slide\s*\{[^}]*min-height:\s*0[^}]*aspect-ratio:\s*16\s*\/\s*9/s);
  assert.match(css, /scroll-snap-type:\s*inline mandatory/);
  assert.match(css, /overflow-x:\s*auto/);
  assert.match(css, /\.evidence-gallery__body\s*\{[^}]*grid-template-columns:\s*repeat\(auto-fit,\s*minmax\(min\(100%,\s*18rem\),\s*1fr\)\)/s);
  assert.match(css, /\.evidence-gallery__body p\s*\{[^}]*border-left:\s*2px solid var\(--teal\)/s);
  const zoomLayoutRule = css.match(/@media \(max-width:\s*1200px\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
  assert.match(zoomLayoutRule, /\.case-section\s*\{[^}]*grid-template-columns:\s*1fr/s);
  assert.match(zoomLayoutRule, /\.evidence-gallery__caption\s*\{[^}]*grid-template-columns:\s*1fr/s);
  assert.doesNotMatch(css, /min-height:\s*clamp\(28rem|min-height:\s*32rem|min-height:\s*min\(72vh|min-height:\s*calc\(100vh - 12rem\)/);
  assert.doesNotMatch(css, /\.evidence-gallery__expand\s*\{[^}]*position:\s*absolute/s);
  assert.match(css, /@media \(max-width:\s*580px\)/);
  assert.match(gallery, /<figure/);
  assert.match(gallery, /width=\{item\.image\.width\}/);
  assert.match(gallery, /height=\{item\.image\.height\}/);
  assert.match(gallery, /loading="lazy"/);
  assert.match(gallery, /decoding="async"/);
  assert.match(gallery, /Open full-resolution slide/);
  assert.match(gallery, /Abrir diapositiva en resolución completa/);
  assert.match(gallery, /project\.slug === "paro-live-oee-platform" \? "paro" : project\.slug/);
  assert.match(gallery, /ArrowLeft/);
  assert.match(gallery, /ArrowRight/);
  assert.match(gallery, /event\.key === "Escape" && dialogRef\.current\?\.open/);
  assert.match(gallery, /dialogRef\.current\?\.close\(\)/);
  assert.match(gallery, /showModal\(\)/);
  assert.match(gallery, /closeButtonRef\.current\?\.focus\(\)/);
  assert.match(gallery, /openButtonRef\.current\?\.focus\(\)/);
  assert.match(gallery, /<form method="dialog">/);
  assert.match(gallery, /onPointerDown/);
  assert.match(gallery, /onPointerUp/);
  assert.doesNotMatch(gallery, /setInterval|autoPlay|autoplay/);
  assert.match(reel, /aria-roledescription="carousel"/);
  assert.match(reel, /aria-live="polite"/);
  assert.match(reel, /ArrowLeft/);
  assert.match(reel, /ArrowRight/);
  assert.match(reel, /onPointerDown/);
  assert.match(reel, /onPointerUp/);
  assert.match(reel, /const currentItem = items\[currentIndex\]/);
  assert.doesNotMatch(reel, /setInterval|autoPlay|autoplay/);
  assert.equal(countMatches(workPreviews, /\nid: |\n {4}id:/g), 2, "the reel data has two previews");
  assert.match(workPreviews, /getProject\("paro-live-oee-platform"\)/);
  assert.match(workPreviews, /status: "published"/);
  assert.match(workPreviews, /caseSlug: paro\.slug/);
  assert.match(workPreviews, /src: paro\.images\[0\]\.src/);
  assert.match(css, /\.selected-work-reel__viewport\s*\{[^}]*overflow:\s*hidden[^}]*touch-action:\s*pan-y/s);
  assert.match(css, /\.selected-work-reel__indicators\s*\{[^}]*overflow-x:\s*auto[^}]*scroll-snap-type:\s*inline mandatory/s);
  assert.doesNotMatch(packageJson, /react-loading-skeleton|drizzle|animation|analytics/i);
  assert.deepEqual(JSON.parse(hosting), { d1: null, r2: null });
});

test("robots stays domain-neutral and unknown project routes are rejected", async () => {
  const robots = await render("/robots.txt");
  assert.equal(robots.response.status, 200);
  assert.match(robots.html, /User-Agent: \*/i);
  assert.doesNotMatch(robots.html, /Sitemap:|https?:\/\//i);

  const unknown = await render("/work/not-a-project");
  assert.equal(unknown.response.status, 404);

  const paroEn = await render("/work/paro");
  const paroEs = await render("/es/work/paro");
  assert.equal(paroEn.response.status, 404);
  assert.equal(paroEs.response.status, 404);
});
