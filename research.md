<h1>Selected Work in Progress</h1>
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
  <p><strong>Presentations (including scheduled):</strong> {{ paper.presentations | join: "; " }}
{% endfor %}

<h1>Other Work in Progress</h1>
{% for paper in site.data.workinprogress %}
  <h2>
    {% if paper.link %}
      <a href="{{ paper.link }}">{{ paper.title }}</a>
    {% else %}
      {{ paper.title }}
    {% endif %}
  </h2>
  <p> {{ paper.year }}</p>
  <p><strong>Author(s):</strong>  {{ paper.authors | join: ", " }}</p> 
{% endfor %}

<h1>Working Papers</h1>
{% for paper in site.data.workingpapers %}
  <h2>
    {% if paper.link %}
      <a href="{{ paper.link }}">{{ paper.title }}</a>
    {% else %}
      {{ paper.title }}
    {% endif %}
  </h2>
  <p> {{ paper.year }}</p>
  <p><strong>Author(s):</strong>  {{ paper.authors | join: ", " }}</p> 
{% endfor %}