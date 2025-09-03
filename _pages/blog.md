---
layout: page
title: "Blog"
permalink: /blog/
---

{% include base_path %}

{% for post in site.posts %}
  {% include archive-single.html %}
{% endfor %}

{% include paginator.html %}
