var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-lifestyle.js
  function parse(element, { document }) {
    const images = element.querySelectorAll(".grid-layout.grid-gap-xs img.cover-image");
    const imageContainer = document.createElement("div");
    images.forEach((img) => {
      const pic = img.closest("picture") || img;
      imageContainer.append(pic.cloneNode(true));
    });
    const heading = element.querySelector("h1");
    const subheading = element.querySelector("p.subheading");
    const ctaLinks = element.querySelectorAll(".button-group a");
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (subheading) contentCell.push(subheading);
    ctaLinks.forEach((link) => contentCell.push(link));
    const cells = [];
    if (images.length > 0) cells.push([imageContainer]);
    cells.push(contentCell);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-lifestyle", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-article.js
  function parse2(element, { document }) {
    const img = element.querySelector("img.cover-image");
    const contentDiv = document.createElement("div");
    const breadcrumbLinks = element.querySelectorAll(".breadcrumbs a.text-link");
    if (breadcrumbLinks.length > 0) {
      const breadcrumbP = document.createElement("p");
      breadcrumbLinks.forEach((link, i) => {
        if (i > 0) breadcrumbP.append(" > ");
        breadcrumbP.append(link.cloneNode(true));
      });
      contentDiv.append(breadcrumbP);
    }
    const heading = element.querySelector("h2");
    if (heading) contentDiv.append(heading);
    const authorName = element.querySelector(".utility-text-black");
    const date = element.querySelector(".utility-margin-top-0-5rem .utility-text-secondary");
    if (authorName || date) {
      const infoP = document.createElement("p");
      if (authorName) infoP.append("By " + authorName.textContent);
      if (date) {
        const dateSpan = document.createElement("span");
        dateSpan.textContent = " \xB7 " + date.textContent;
        infoP.append(dateSpan);
      }
      contentDiv.append(infoP);
    }
    const cells = [[img || "", contentDiv]];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-gallery.js
  function parse3(element, { document }) {
    const imageItems = element.querySelectorAll(".utility-aspect-1x1");
    const cells = [];
    imageItems.forEach((item) => {
      const img = item.querySelector("img.cover-image");
      if (img) {
        cells.push([img, ""]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-gallery", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-testimonial.js
  function parse4(element, { document }) {
    const tabPanes = element.querySelectorAll(".tab-pane");
    const tabButtons = element.querySelectorAll(".tab-menu-link");
    const cells = [];
    tabPanes.forEach((pane, i) => {
      const button = tabButtons[i];
      let label = "";
      if (button) {
        const nameEl = button.querySelector("strong");
        label = nameEl ? nameEl.textContent.trim() : `Tab ${i + 1}`;
      }
      const contentDiv = document.createElement("div");
      const img = pane.querySelector("img.cover-image");
      if (img) contentDiv.append(img);
      const name = pane.querySelector(".paragraph-xl.utility-margin-bottom-0 strong");
      if (name) {
        const nameP = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = name.textContent;
        nameP.append(strong);
        contentDiv.append(nameP);
      }
      const role = pane.querySelector(".paragraph-xl.utility-margin-bottom-0 + div");
      if (role) {
        const roleP = document.createElement("p");
        roleP.textContent = role.textContent;
        contentDiv.append(roleP);
      }
      const quote = pane.querySelector("p.paragraph-xl");
      if (quote) contentDiv.append(quote);
      cells.push([label, contentDiv]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse5(element, { document }) {
    const articleCards = element.querySelectorAll("a.article-card");
    const cells = [];
    articleCards.forEach((card) => {
      const img = card.querySelector("img.cover-image");
      const contentDiv = document.createElement("div");
      const tag = card.querySelector(".tag");
      const date = card.querySelector(".paragraph-sm.utility-text-secondary");
      const title = card.querySelector("h3");
      if (tag) {
        const tagP = document.createElement("p");
        tagP.textContent = tag.textContent;
        contentDiv.append(tagP);
      }
      if (date) {
        const dateP = document.createElement("p");
        dateP.textContent = date.textContent;
        contentDiv.append(dateP);
      }
      if (title) {
        const link = document.createElement("a");
        link.href = card.href;
        link.textContent = title.textContent;
        const h3 = document.createElement("h3");
        h3.append(link);
        contentDiv.append(h3);
      }
      cells.push([img || "", contentDiv]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-faq.js
  function parse6(element, { document }) {
    const col1 = document.createElement("div");
    const heading = element.querySelector("h2");
    const subheading = element.querySelector("p.subheading");
    if (heading) col1.append(heading);
    if (subheading) col1.append(subheading);
    const col2 = document.createElement("div");
    const faqItems = element.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question span");
      const answer = item.querySelector(".faq-answer p");
      if (question) {
        const qP = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = question.textContent;
        qP.append(strong);
        col2.append(qP);
      }
      if (answer) {
        const aP = document.createElement("p");
        aP.textContent = answer.textContent;
        col2.append(aP);
      }
    });
    const cells = [[col1, col2]];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-banner.js
  function parse7(element, { document }) {
    const bgImage = element.querySelector("img.cover-image");
    const heading = element.querySelector("h2, h1");
    const subheading = element.querySelector("p.subheading");
    const ctaLink = element.querySelector(".button-group a");
    const cells = [];
    if (bgImage) cells.push([bgImage]);
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (subheading) contentCell.push(subheading);
    if (ctaLink) contentCell.push(ctaLink);
    cells.push(contentCell);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/trendsetters-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, ["a.skip-link"]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [".navbar", "footer.footer", "iframe", "link", "noscript"]);
    }
  }

  // tools/importer/transformers/trendsetters-sections.js
  function transform2(hookName, element, payload) {
    if (hookName === "afterTransform") {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const document = element.ownerDocument;
      const sections = template.sections;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const selector = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selector) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) continue;
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.append(metaBlock);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.parentElement.insertBefore(hr, sectionEl);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-lifestyle": parse,
    "columns-article": parse2,
    "cards-gallery": parse3,
    "tabs-testimonial": parse4,
    "cards-article": parse5,
    "columns-faq": parse6,
    "hero-banner": parse7
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Homepage template for WKND Trendsetters site",
    urls: [
      "https://wknd-trendsetters.site/"
    ],
    blocks: [
      {
        name: "hero-lifestyle",
        instances: ["header.section.secondary-section"]
      },
      {
        name: "columns-article",
        instances: ["section:nth-of-type(1) .grid-layout.grid-gap-lg"]
      },
      {
        name: "cards-gallery",
        instances: ["section:nth-of-type(2) .grid-layout.desktop-4-column.grid-gap-sm"]
      },
      {
        name: "tabs-testimonial",
        instances: ["section:nth-of-type(3) .tabs-wrapper"]
      },
      {
        name: "cards-article",
        instances: ["section:nth-of-type(4) .grid-layout.desktop-4-column.grid-gap-md"]
      },
      {
        name: "columns-faq",
        instances: ["section:nth-of-type(5) .grid-layout.grid-gap-xxl"]
      },
      {
        name: "hero-banner",
        instances: ["section.inverse-section .grid-layout.desktop-1-column"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: "header.section.secondary-section",
        style: "secondary",
        blocks: ["hero-lifestyle"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Feature Article",
        selector: "section:nth-of-type(1)",
        style: null,
        blocks: ["columns-article"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Image Gallery",
        selector: "section:nth-of-type(2)",
        style: "secondary",
        blocks: ["cards-gallery"],
        defaultContent: ["section:nth-of-type(2) .utility-text-align-center"]
      },
      {
        id: "section-4",
        name: "Testimonials",
        selector: "section:nth-of-type(3)",
        style: null,
        blocks: ["tabs-testimonial"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Latest Articles",
        selector: "section:nth-of-type(4)",
        style: "secondary",
        blocks: ["cards-article"],
        defaultContent: ["section:nth-of-type(4) .utility-text-align-center"]
      },
      {
        id: "section-6",
        name: "FAQ",
        selector: "section:nth-of-type(5)",
        style: null,
        blocks: ["columns-faq"],
        defaultContent: []
      },
      {
        id: "section-7",
        name: "CTA Banner",
        selector: "section:nth-of-type(6)",
        style: "inverse",
        blocks: ["hero-banner"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
