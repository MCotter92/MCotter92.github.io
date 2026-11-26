---
layout: page
title: Tags
permalink: /tags/
nav_exclude: true # linked from the footer instead of the header
---

{%- comment -%} site.tags is a hash, so collect the names to sort them case-insensitively. {%- endcomment -%}
{%- assign tag_names = "" | split: "" -%}
{%- for tag in site.tags -%}
  {%- assign tag_names = tag_names | push: tag[0] -%}
{%- endfor -%}
{%- assign tag_names = tag_names | sort_natural -%}

{%- if tag_names.size == 0 -%}
<p>No tags yet.</p>
{%- else -%}
<p class="tag-index">
  {%- for name in tag_names -%}
    <a class="tag" href="#{{ name | slugify }}">{{ name | escape }} <span class="tag-count">{{ site.tags[name].size }}</span></a>
  {%- endfor -%}
</p>

{%- for name in tag_names %}
<section class="tag-section">
  <h2 id="{{ name | slugify }}">{{ name | escape }}</h2>
  <ul class="post-list">
    {%- for post in site.tags[name] -%}
      {% include post-item.html post=post %}
    {%- endfor -%}
  </ul>
</section>
{%- endfor -%}
{%- endif -%}
