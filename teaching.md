<h1>Teaching Experience</h1>

{% for item in site.data.teaching_items %}
  <h3>{{ item.class }}</h3> 
  <p> - {{ item.institution }}, TA to Professor {{ item.professor }}, {{ item.term }}</p>
{% endfor %}