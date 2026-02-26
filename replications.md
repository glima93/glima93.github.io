---
layout: single
title: "Replications"
permalink: /replications/
---

<div class="research-hub">
  <section class="research-section">
    <h2 class="research-section__title">Replications</h2>
    <div class="research-cards">
      {% for item in site.data.replication_papers %}
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

        {% if item.publication %}
          <p class="research-card__meta">
            <span class="research-card__journal">{{ item.publication }}</span>
          </p>
        {% endif %}

        {% if item.abstract %}
          <details class="research-card__details">
            <summary>Abstract</summary>
            <div class="research-card__details-body">
              <p>{{ item.abstract }}</p>
            </div>
          </details>
        {% endif %}

        {% if item.link or item.link_package or item.link_original %}
          <p class="research-card__links">
            {% if item.link %}
              <a href="{{ item.link }}" target="_blank" rel="noopener noreferrer">Paper</a>
            {% endif %}
            {% if item.link_package %}
              {% if item.link %} | {% endif %}
              <a href="{{ item.link_package }}" target="_blank" rel="noopener noreferrer">Replication package</a>
            {% endif %}
            {% if item.link_original %}
              {% if item.link or item.link_package %} | {% endif %}
              <a href="{{ item.link_original }}" target="_blank" rel="noopener noreferrer">Original study package</a>
            {% endif %}
          </p>
        {% endif %}
      </article>
      {% endfor %}
    </div>
  </section>
</div>
