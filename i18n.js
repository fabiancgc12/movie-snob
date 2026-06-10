module.exports = {
  "locales": ["en-US", "es"],
  "defaultLocale": "en-US",
  "loadLocaleFrom": (lang, ns) =>
    import(`./locales/${lang}/${ns}.ts`).then((m) => m.default),
  "pages": {
    "*": ["common"],
    "/[lang]":["home"],
    "/[lang]/discover":["discover"],
    "/[lang]/liked":["likedorbookmark"],
    "/[lang]/bookmark":["likedorbookmark"],
    "/[lang]/movie/[id]":["movieortv"],
    "/[lang]/movie/not-found":["movieortv"],
    "/[lang]/tv/[id]":["movieortv"],
    "/[lang]/tv/not-found":["movieortv"],
  },
}
