module.exports = {
  "locales": ["en-US", "es"],
  "defaultLocale": "en-US",
  "pages": {
    "*": ["common"],
    "/":["home"],
    "/discover":["discover"],
    "/liked":["likedorbookmark"],
    "/bookmark":["likedorbookmark"],
    "/movie/[id]":["movieortv"],
    "/movie/not-found":["movieortv"],
    "/tv/[id]":["movieortv"],
    "/tv/not-found":["movieortv"],
  },
}