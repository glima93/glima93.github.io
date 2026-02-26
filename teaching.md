---
layout: single
title: "Teaching"
permalink: /teaching/
---

<div class="research-hub">
  <section class="research-section">
    <h2 class="research-section__title">Teaching</h2>
    <div class="research-cards">
      {% for item in site.data.teaching_items %}
      <article class="research-card">
        <div class="research-card__header">
          <h3 class="research-card__title">{{ item.class }}</h3>
          {% if item.term %}
            <p class="research-card__year">{{ item.term }}</p>
          {% endif %}
        </div>

        {% if item.institution %}
          <p class="research-card__meta">
            <span class="research-card__journal">{{ item.institution }}</span>
          </p>
        {% endif %}

        {% if item.professor %}
          <p class="research-card__authors">TA to Professor {{ item.professor }}</p>
        {% endif %}
      </article>
      {% endfor %}
    </div>
  </section>
</div>
