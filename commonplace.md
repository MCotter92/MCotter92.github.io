---
layout: page
title: Commonplace Book
permalink: /commonplace/
nav_order: 2
---

Quotes I've come across and want to keep.

{% for quote in site.data.commonplace %}
<figure class="quote">
  <blockquote>{{ quote.text | markdownify }}</blockquote>
  <figcaption>
    {{ quote.author | escape }}
    {%- if quote.source -%}, <cite>{{ quote.source | escape }}</cite>{%- endif -%}
  </figcaption>
</figure>
{% endfor %}
