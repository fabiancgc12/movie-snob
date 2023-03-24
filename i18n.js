module.exports = {
  "locales": ["en-US", "es"],
  "defaultLocale": "en-US",
  localeDetection: false,
  "pages": {
    "*": ["common"],
    "/":["home"],
    "/discover":["discover"],
    "/liked":["likedorbookmark"],
    "/bookmark":["likedorbookmark"],
    "/movie/[id]":["movieortv"],
    "/tv/[id]":["movieortv"]
  },
}