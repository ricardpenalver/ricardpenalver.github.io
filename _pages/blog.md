---
layout: page
title: "Blog"
permalink: /blog/
---

# Blog

Aquí encontrarás mis últimas publicaciones sobre tecnología, desarrollo y experiencias profesionales.

{% for post in site.posts %}
  <article>
    <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
    <p class="post-meta">{{ post.date | date: "%B %d, %Y" }}</p>
    <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
    <a href="{{ post.url }}">Leer más...</a>
  </article>
  <hr>
{% endfor %}
