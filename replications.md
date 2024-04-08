<h1>Replications</h1>
{% for item in site.data.replication_papers %}
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
  <p><strong>Replication Package:</strong> <a href="{{ item.link_package }}">{{ item.link_package }}</a></p>
  <p><strong>Original Study Replication Package:</strong> <a href="{{ item.link_original }}">{{ item.link_original }}</a></p>
{% endfor %}