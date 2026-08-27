(function () {
  const PART_COLORS = [
    "#062010",
    "#0d3d1f",
    "#126b32",
    "#158a3e",
    "#18A54B",
    "#3aad5e",
    "#5cb87a",
    "#7ec894",
    "#a8d4b6",
    "#cfead8",
  ];
  let PART_ORDER = [];
  let PART_RANGES = {};
  let MAX_QUOTES = 1;
  let HIGHLIGHT_AT = 8;
  const ROOT_ID = "empowered-quotes-analysis";

  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function renderStats(summary, compareSummary) {
    const row = el("div", "iqa-stats");
    const items = [
      { label: "Total quotes", value: String(summary.totalQuotes), compare: compareSummary ? String(compareSummary.totalQuotes) : null, tone: "info" },
      { label: "Words highlighted", value: summary.totalWords.toLocaleString("en-US"), compare: compareSummary ? compareSummary.totalWords.toLocaleString("en-US") : null, tone: "success" },
      { label: "Avg words/quote", value: String(summary.avgWordsPerQuote), compare: compareSummary ? String(compareSummary.avgWordsPerQuote) : null },
      { label: "Share of book (est.)", value: summary.pctEstimated + "%", compare: compareSummary ? compareSummary.pctEstimated + "%" : null, tone: "warning" },
    ];
    items.forEach(function (item) {
      const card = el("div", "iqa-stat iqa-stat--" + (item.tone || "default"));
      const valueNode = el("div", "iqa-stat__value");
      if (item.compare && compareSummary) {
        valueNode.innerHTML =
          item.value + ' <span class="iqa-stat__compare">(' + item.compare + ")</span>";
        card.setAttribute(
          "aria-label",
          item.label + ": " + item.value + ", " + compareSummary.label + " " + item.compare
        );
      } else {
        valueNode.textContent = item.value;
      }
      card.appendChild(valueNode);
      card.appendChild(el("div", "iqa-stat__label", item.label));
      row.appendChild(card);
    });

    if (!compareSummary) return row;

    const wrap = el("div", "iqa-stats-wrap");
    wrap.appendChild(row);
    wrap.appendChild(
      el("p", "iqa-stats-note", "Numbers in parentheses are from " + compareSummary.label + ".")
    );
    return wrap;
  }

  function polarToCartesian(cx, cy, radius, angleDeg) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  }

  function donutSlicePath(cx, cy, outerRadius, innerRadius, startAngle, endAngle) {
    const startOuter = polarToCartesian(cx, cy, outerRadius, endAngle);
    const endOuter = polarToCartesian(cx, cy, outerRadius, startAngle);
    const startInner = polarToCartesian(cx, cy, innerRadius, endAngle);
    const endInner = polarToCartesian(cx, cy, innerRadius, startAngle);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return [
      "M",
      startOuter.x,
      startOuter.y,
      "A",
      outerRadius,
      outerRadius,
      0,
      largeArc,
      0,
      endOuter.x,
      endOuter.y,
      "L",
      endInner.x,
      endInner.y,
      "A",
      innerRadius,
      innerRadius,
      0,
      largeArc,
      1,
      startInner.x,
      startInner.y,
      "Z",
    ].join(" ");
  }

  function setDonutFocus(wrap, index) {
    wrap.querySelectorAll(".iqa-donut__slice").forEach(function (slice, sliceIndex) {
      var active = index !== null && sliceIndex === index;
      var dimmed = index !== null && sliceIndex !== index;
      slice.classList.toggle("is-active", active);
      slice.classList.toggle("is-dimmed", dimmed);
    });
    wrap.querySelectorAll(".iqa-legend__row").forEach(function (row, rowIndex) {
      var active = index !== null && rowIndex === index;
      var dimmed = index !== null && rowIndex !== index;
      row.classList.toggle("is-active", active);
      row.classList.toggle("is-dimmed", dimmed);
    });
    var centerValue = wrap.querySelector(".iqa-donut__center-value");
    var centerLabel = wrap.querySelector(".iqa-donut__center-label");
    if (!centerValue || !centerLabel) return;
    if (index === null) {
      centerValue.textContent = String(totalFromWrap(wrap));
      centerLabel.textContent = "quotes total";
      return;
    }
    var meta = wrap._partMeta[index];
    centerValue.textContent = String(meta.value);
    centerLabel.textContent = "Part " + meta.partId + " · " + Math.round((meta.value / meta.total) * 100) + "%";
  }

  function totalFromWrap(wrap) {
    return wrap._partMeta.reduce(function (sum, item) {
      return sum + item.value;
    }, 0);
  }

  function renderDonut(partCounts, partMeta, total) {
    const wrap = el("div", "iqa-donut-wrap");
    const size = 220;
    const cx = size / 2;
    const cy = size / 2;
    const outerRadius = 100;
    const innerRadius = 56;
    let cursor = 0;

    const chart = el("div", "iqa-donut-chart");
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 " + size + " " + size);
    svg.setAttribute("class", "iqa-donut__svg");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Quote distribution by book part");

    const partMetaList = [];

    PART_ORDER.forEach(function (part, index) {
      const value = partCounts[part] || 0;
      if (value <= 0) return;
      const sliceAngle = (value / total) * 360;
      const startAngle = cursor;
      const endAngle = cursor + sliceAngle;
      cursor += sliceAngle;

      const path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", donutSlicePath(cx, cy, outerRadius, innerRadius, startAngle, endAngle));
      path.setAttribute("fill", PART_COLORS[index]);
      path.setAttribute("class", "iqa-donut__slice");
      path.setAttribute("data-index", String(partMetaList.length));
      path.setAttribute("tabindex", "0");
      path.setAttribute("role", "button");
      path.setAttribute(
        "aria-label",
        "Part " + part.replace("Part ", "") + ": " + partMeta[part] + ", " + value + " quotes"
      );

      const sliceIndex = partMetaList.length;
      partMetaList.push({
        part: part,
        partId: part.replace("Part ", ""),
        title: partMeta[part],
        range: PART_RANGES[part],
        value: value,
        total: total,
        color: PART_COLORS[index],
      });

      path.addEventListener("mouseenter", function () {
        setDonutFocus(wrap, sliceIndex);
      });
      path.addEventListener("mouseleave", function () {
        setDonutFocus(wrap, null);
      });
      path.addEventListener("focus", function () {
        setDonutFocus(wrap, sliceIndex);
      });
      path.addEventListener("blur", function () {
        setDonutFocus(wrap, null);
      });

      svg.appendChild(path);
    });

    const centerValue = document.createElementNS(svgNS, "text");
    centerValue.setAttribute("x", String(cx));
    centerValue.setAttribute("y", String(cy - 2));
    centerValue.setAttribute("class", "iqa-donut__center-value");
    centerValue.setAttribute("text-anchor", "middle");
    centerValue.textContent = String(total);

    const centerLabel = document.createElementNS(svgNS, "text");
    centerLabel.setAttribute("x", String(cx));
    centerLabel.setAttribute("y", String(cy + 16));
    centerLabel.setAttribute("class", "iqa-donut__center-label");
    centerLabel.setAttribute("text-anchor", "middle");
    centerLabel.textContent = "quotes total";

    svg.appendChild(centerValue);
    svg.appendChild(centerLabel);
    chart.appendChild(svg);
    wrap.appendChild(chart);
    wrap._partMeta = partMetaList;

    const legend = el("div", "iqa-legend");
    partMetaList.forEach(function (meta, index) {
      const row = el("div", "iqa-legend__row");
      row.setAttribute("data-index", String(index));
      row.setAttribute("tabindex", "0");
      row.setAttribute("role", "button");
      row.innerHTML =
        '<span class="iqa-legend__label"><span class="iqa-legend__swatch" style="background:' +
        meta.color +
        '"></span>Part ' +
        meta.partId +
        ": " +
        meta.title +
        " · " +
        meta.range +
        '</span><span class="iqa-legend__value">' +
        meta.value +
        " (" +
        Math.round((meta.value / total) * 100) +
        "%)</span>";

      row.addEventListener("mouseenter", function () {
        setDonutFocus(wrap, index);
      });
      row.addEventListener("mouseleave", function () {
        setDonutFocus(wrap, null);
      });
      row.addEventListener("focus", function () {
        setDonutFocus(wrap, index);
      });
      row.addEventListener("blur", function () {
        setDonutFocus(wrap, null);
      });

      legend.appendChild(row);
    });
    wrap.appendChild(legend);
    return wrap;
  }

  function setBarFocus(wrap, index) {
    wrap.querySelectorAll(".iqa-bar-row").forEach(function (row, rowIndex) {
      var active = index !== null && rowIndex === index;
      var dimmed = index !== null && rowIndex !== index;
      row.classList.toggle("is-active", active);
      row.classList.toggle("is-dimmed", dimmed);
    });
    var focusValue = wrap.querySelector(".iqa-top-chapters__focus-value");
    var focusLabel = wrap.querySelector(".iqa-top-chapters__focus-label");
    if (!focusValue || !focusLabel) return;
    if (index === null) {
      focusValue.textContent = String(wrap._topSum);
      focusLabel.textContent = "quotes in top 10 chapters";
      return;
    }
    var chapter = wrap._chapters[index];
    var pct = Math.round((chapter.quotes / wrap._total) * 100);
    focusValue.textContent = String(chapter.quotes);
    focusLabel.textContent =
      "Ch. " +
      chapter.num +
      " · " +
      chapter.title +
      " · " +
      chapter.words +
      " words · " +
      pct +
      "% of total";
  }

  function bindBarRowEvents(wrap, row, index) {
    row.setAttribute("tabindex", "0");
    row.setAttribute("role", "button");
    row.addEventListener("mouseenter", function () {
      setBarFocus(wrap, index);
    });
    row.addEventListener("mouseleave", function () {
      setBarFocus(wrap, null);
    });
    row.addEventListener("focus", function () {
      setBarFocus(wrap, index);
    });
    row.addEventListener("blur", function () {
      setBarFocus(wrap, null);
    });
  }

  function renderTopChapters(topChapters, totalQuotes) {
    const list = topChapters.slice(0, 10);
    const max = list[0] ? list[0].quotes : 1;
    const wrap = el("div", "iqa-top-chapters");
    wrap._chapters = list;
    wrap._total = totalQuotes;
    wrap._topSum = list.reduce(function (sum, chapter) {
      return sum + chapter.quotes;
    }, 0);

    const focus = el("div", "iqa-top-chapters__focus");
    focus.appendChild(el("div", "iqa-top-chapters__focus-value", String(wrap._topSum)));
    focus.appendChild(el("div", "iqa-top-chapters__focus-label", "quotes in top 10 chapters"));
    wrap.appendChild(focus);

    list.forEach(function (chapter, index) {
      const row = el("div", "iqa-bar-row");
      row.setAttribute(
        "aria-label",
        "Chapter " + chapter.num + ": " + chapter.title + ", " + chapter.quotes + " quotes"
      );
      const meta = el("div", "iqa-bar-row__meta");
      meta.innerHTML =
        "<strong>Ch. " +
        chapter.num +
        " · " +
        chapter.title +
        "</strong><span>" +
        chapter.part +
        ": " +
        chapter.partTitle +
        "</span>";
      const track = el("div", "iqa-bar-row__track");
      const fill = el("div", "iqa-bar-row__fill");
      fill.style.width = (chapter.quotes / max) * 100 + "%";
      track.appendChild(fill);
      const count = el("div", "iqa-bar-row__count", String(chapter.quotes));
      row.appendChild(meta);
      row.appendChild(track);
      row.appendChild(count);
      bindBarRowEvents(wrap, row, index);
      wrap.appendChild(row);
    });
    return wrap;
  }

  function renderChapterTable(chapters) {
    const wrap = el("div", "iqa-table-wrap");
    const table = el("table", "iqa-table table-compact");
    table.innerHTML =
      "<thead><tr><th>Ch.</th><th>Title</th><th>Quotes</th><th>Words</th><th>Share</th></tr></thead>";
    const tbody = el("tbody");
    chapters.forEach(function (chapter) {
      const tr = el("tr");
      if (chapter.highlighted) tr.className = "iqa-table__highlight";
      if (chapter.quotes === 0) tr.className = "iqa-table__empty";
      const share = el("td");
      const bar = el("div", "iqa-mini-bar");
      const fill = el("div", "iqa-mini-bar__fill");
      fill.style.width = (chapter.quotes / MAX_QUOTES) * 100 + "%";
      bar.appendChild(fill);
      share.appendChild(bar);
      tr.innerHTML =
        "<td>" +
        chapter.num +
        "</td><td>" +
        chapter.title +
        "</td><td>" +
        chapter.quotes +
        "</td><td>" +
        (chapter.words > 0 ? chapter.words : "–") +
        "</td>";
      tr.appendChild(share);
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    wrap.appendChild(table);
    return wrap;
  }

  function renderFullOverview(chapters, partCounts, partMeta) {
    const wrap = el("div", "iqa-overview");
    PART_ORDER.forEach(function (part, index) {
      if (index > 0) wrap.appendChild(el("hr", "iqa-divider"));
      const header = el("div", "iqa-overview__header");
      header.innerHTML =
        "<h4>Part " +
        part.replace("Part ", "") +
        ": " +
        partMeta[part] +
        "</h4><span>" +
        PART_RANGES[part] +
        " · " +
        (partCounts[part] || 0) +
        " quotes</span>";
      wrap.appendChild(header);
      const partChapters = chapters.filter(function (c) {
        return c.part === part;
      });
      wrap.appendChild(renderChapterTable(partChapters));
    });
    wrap.appendChild(el("p", "iqa-caption", captionForMax(chapters)));
    return wrap;
  }

  function captionForMax(chapters) {
    const maxChapter = chapters.reduce(function (best, chapter) {
      return chapter.quotes > best.quotes ? chapter : best;
    }, chapters[0]);
    return "Bar scaled to maximum (Ch. " + maxChapter.num + " = " + maxChapter.quotes + " quotes)";
  }

  function renderCard(title, body) {
    const card = el("article", "iqa-card");
    card.appendChild(el("h4", "iqa-card__title", title));
    const content = el("div", "iqa-card__body");
    content.appendChild(body);
    card.appendChild(content);
    return card;
  }

  function render(data) {
    const root = document.getElementById(ROOT_ID);
    if (!root) return;

    PART_ORDER = data.partOrder || PART_ORDER;
    PART_RANGES = data.partRanges || PART_RANGES;
    HIGHLIGHT_AT = (data.ui && data.ui.highlightThreshold) || HIGHLIGHT_AT;
    MAX_QUOTES = data.chapters.reduce(function (max, chapter) {
      return Math.max(max, chapter.quotes);
    }, 1);

    const summary = data.summary;
    const heading = (data.ui && data.ui.heading) || "EMPOWERED quote analysis";
    const fragment = document.createDocumentFragment();
    fragment.appendChild(el("h3", "iqa-heading", heading));
    fragment.appendChild(renderStats(summary, data.compareSummary));
    const donut = renderDonut(data.partCounts, data.partMeta, summary.totalQuotes);
    if (PART_ORDER.length > 6) donut.classList.add("iqa-donut-wrap--stacked");
    fragment.appendChild(renderCard("Quotes by book part", donut));
    fragment.appendChild(
      renderCard("Top 10 chapters by quote count", renderTopChapters(data.topChapters, summary.totalQuotes))
    );
    fragment.appendChild(
      renderCard("Full chapter overview by part", renderFullOverview(data.chapters, data.partCounts, data.partMeta))
    );
    root.appendChild(fragment);
  }

  function init() {
    const root = document.getElementById(ROOT_ID);
    if (!root) return;
    const src = root.getAttribute("data-src");
    if (!src) return;

    fetch(src)
      .then(function (response) {
        if (!response.ok) throw new Error("Failed to load quote stats");
        return response.json();
      })
      .then(render)
      .catch(function () {
        root.innerHTML = "<p class=\"iqa-error\">Quote analysis could not be loaded.</p>";
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
