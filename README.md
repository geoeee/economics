# Economics · Interdisciplinary Learning Project

An AI-assisted learning project exploring **economics** through six lenses:

**History** · **Politics** · **Finance** · **Mathematics** · **Psychology**

## Structure

```
├── index.html                  Home page with timeline overview
├── _template.html              Template for creating new pages
├── assets/
│   ├── css/style.css           Global stylesheet
│   ├── js/nav.js               Sidebar nav + search + theme toggle
│   └── img/                    Images & diagrams
├── timeline/                   Core content, organized chronologically
│   ├── 01-ancient.html         Ancient (3500 BC – 500 AD)
│   ├── 02-classical.html       Classical (500 BC – 500 AD)
│   ├── 03-medieval.html        Medieval (500 – 1500)
│   ├── 04-mercantilism.html    Mercantilism (1500 – 1760)
│   ├── 05-industrial.html      Industrial Revolution (1760 – 1870)
│   ├── 06-golden-age.html      Golden Age (1870 – 1914)
│   ├── 07-world-wars.html      World Wars & Depression (1914 – 1945)
│   ├── 08-bretton-woods.html   Bretton Woods (1945 – 1971)
│   ├── 09-neoliberal.html      Neoliberal Era (1971 – 2008)
│   └── 10-contemporary.html    Contemporary (2008 – Present)
├── concepts/                   Reference pages on core economic concepts
├── cross/                      Interdisciplinary deep dives
└── data/
    └── search-index.js         Search index for all pages
```

## Design

- **Pure HTML** — zero dependencies, open directly in any browser
- **Sidebar navigation** — collapsible categories with search
- **Dark/light mode** — toggle persists across sessions
- **Responsive** — mobile sidebar with hamburger menu
- **6-discipline format** — each page covers Econ, Politics, History, Finance, Math, Psychology
- **Bilingual** — English content with Chinese annotations

## How to Use

1. Open `index.html` in a browser to start
2. Browse chronologically via **Timeline** or explore **Concepts**
3. Use the sidebar **search** to find specific topics
4. Copy `_template.html` to create new pages

## GitHub Pages

To deploy, push to `main` and enable GitHub Pages in repo settings
(select the root directory as the source).

## License

MIT
