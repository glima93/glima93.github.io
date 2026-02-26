---
layout: single
title: "Research"
permalink: /research/
---

<div class="research-hub" id="research-hub">
  <div class="research-hub__filters" role="tablist" aria-label="Research sections">
    <button type="button" class="research-filter is-active" data-filter="all" aria-pressed="true">All</button>
    <button type="button" class="research-filter" data-filter="selected-wip" aria-pressed="false">Work in Progress</button>
    <button type="button" class="research-filter" data-filter="publications" aria-pressed="false">Publications</button>
  </div>

  <section class="research-section" data-category="selected-wip">
    <h2 class="research-section__title">Work in Progress</h2>
    <div class="research-cards">
      {% for paper in site.data.papers %}
      <article class="research-card">
        <div class="research-card__header">
          <h3 class="research-card__title">
            {% if paper.link %}
              <a href="{{ paper.link }}">{{ paper.title }}</a>
            {% else %}
              {{ paper.title }}
            {% endif %}
            {% if paper.status %}
              <span class="research-card__status">[{{ paper.status }}]</span>
            {% endif %}
          </h3>
        </div>

        {% if paper.authors %}
          <p class="research-card__authors">{{ paper.authors | join: ", " }}</p>
        {% endif %}

        {% if paper.abstract %}
          <details class="research-card__details">
            <summary>Abstract</summary>
            <div class="research-card__details-body">
              <p>{{ paper.abstract }}</p>
            </div>
          </details>
        {% endif %}

        {% if paper.presentations %}
          <p class="research-card__meta">
            <span class="research-card__label">Presented at (including scheduled):</span>
            {{ paper.presentations | join: "; " }}
          </p>
        {% endif %}

        {% if paper.draft %}
          <p class="research-card__meta">
            {% if paper.draft_link %}
              <a href="{{ paper.draft_link }}" target="_blank" rel="noopener noreferrer">{{ paper.draft }}</a>
            {% else %}
              {{ paper.draft }}
            {% endif %}
          </p>
        {% endif %}

        {% if paper.link %}
          <p class="research-card__links">
            <a href="{{ paper.link }}" target="_blank" rel="noopener noreferrer">Draft</a>
          </p>
        {% endif %}
      </article>
      {% endfor %}
    </div>
  </section>

  <section class="research-section" data-category="publications">
    <h2 class="research-section__title">Publications</h2>
    <div class="research-cards">
      {% for paper in site.data.publications %}
      <article class="research-card">
        <div class="research-card__header">
          <h3 class="research-card__title">
            {% if paper.link %}
              <a href="{{ paper.link }}">{{ paper.title }}</a>
            {% else %}
              {{ paper.title }}
            {% endif %}
          </h3>
        </div>

        {% if paper.authors %}
          <p class="research-card__authors">with {{ paper.authors | join: ", " }}</p>
        {% endif %}

        <p class="research-card__meta">
          {% if paper.journal %}<span class="research-card__journal">{{ paper.journal }}</span>{% endif %}
          {% if paper.volume %}<span>{% if paper.journal %}, {% endif %}{{ paper.volume }}</span>{% endif %}
          {% if paper.issue %}<span>({{ paper.issue }})</span>{% endif %}
          {% if paper.year %}<span>{% if paper.journal or paper.volume or paper.issue %}, {% endif %}{{ paper.year }}</span>{% endif %}
        </p>

        {% if paper.abstract %}
          <details class="research-card__details">
            <summary>Abstract</summary>
            <div class="research-card__details-body">
              <p>{{ paper.abstract }}</p>
            </div>
          </details>
        {% endif %}

        {% if paper.link %}
          <p class="research-card__links">
            <a href="{{ paper.link }}" target="_blank" rel="noopener noreferrer">Link</a>
          </p>
        {% endif %}
      </article>
      {% endfor %}
    </div>
  </section>
</div>

<script>
  (function () {
    var hub = document.getElementById("research-hub");
    if (!hub) return;

    var buttons = hub.querySelectorAll(".research-filter");
    var sections = hub.querySelectorAll(".research-section");

    function setFilter(filter) {
      for (var i = 0; i < buttons.length; i++) {
        var isActive = buttons[i].getAttribute("data-filter") === filter;
        buttons[i].classList.toggle("is-active", isActive);
        buttons[i].setAttribute("aria-pressed", isActive ? "true" : "false");
      }

      for (var j = 0; j < sections.length; j++) {
        var category = sections[j].getAttribute("data-category");
        var show = filter === "all" || category === filter;
        sections[j].hidden = !show;
      }
    }

    for (var k = 0; k < buttons.length; k++) {
      buttons[k].addEventListener("click", function () {
        setFilter(this.getAttribute("data-filter"));
      });
    }

    setFilter("all");
  })();
</script>
