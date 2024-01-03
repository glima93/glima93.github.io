<h1>Working Papers</h1>
{% for paper in site.data.papers %}
  <h2>
    {% if paper.link %}
      <a href="{{ paper.link }}">{{ paper.title }}</a>
    {% else %}
      {{ paper.title }}
    {% endif %}
  </h2>
  <p> {{ paper.year }}</p>
  <p><strong>Author(s):</strong>  {{ paper.authors | join: ", " }}</p> 
  <p><strong>Abstract:</strong> {{ paper.abstract }}</p>
  <p><strong>Presented at:</strong> {{ paper.presentations | join: "; " }}
{% endfor %}
