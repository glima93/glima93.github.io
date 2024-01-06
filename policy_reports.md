<h1>Policy Reports</h1>
{% for item in site.data.policy %}
  <h2>
    {% if item.link %}
      <a href="{{ item.link }}">{{ item.title }}</a>
    {% else %}
      {{ item.title }}
    {% endif %}
  </h2>
  <p> {{ item.year }}</p>
  <p><strong>Author(s):</strong>  {{ item.authors | join: ", " }}</p> 
  <p><strong>Abstract:</strong> {{ item.abstract }}</p>
{% endfor %}