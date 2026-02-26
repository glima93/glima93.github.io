---
layout: single
title: "Policy Reports"
permalink: /policy_reports/
---

<div class="research-hub">
  <section class="research-section">
    <h2 class="research-section__title">Policy Reports</h2>
    <div class="research-cards">
      {% for item in site.data.policy %}
      <article class="research-card">
        <div class="research-card__header">
          <h3 class="research-card__title">
            {% if item.link %}
              <a href="{{ item.link }}">{{ item.title }}</a>
            {% else %}
              {{ item.title }}
            {% endif %}
          </h3>
          {% if item.year %}
            <p class="research-card__year">{{ item.year }}</p>
          {% endif %}
        </div>

        {% if item.authors %}
          <p class="research-card__authors">with {{ item.authors | join: ", " }}</p>
        {% endif %}

        {% if item.abstract %}
          <details class="research-card__details">
            <summary>Abstract</summary>
            <div class="research-card__details-body">
              <p>{{ item.abstract }}</p>
            </div>
          </details>
        {% endif %}

        {% if item.link %}
          <p class="research-card__links">
            <a href="{{ item.link }}" target="_blank" rel="noopener noreferrer">Open report</a>
          </p>
        {% endif %}
      </article>
      {% endfor %}
    </div>
  </section>
</div>
