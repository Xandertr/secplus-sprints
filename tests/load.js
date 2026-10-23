// Loads the browser content files into a Node context.
const path = require("path");
module.exports = function load() {
  global.window = {};
  for (const f of ["map.js", "notes.js", "glossary.js", "domain1.js", "domain2.js"]) {
    const p = path.join(__dirname, "..", "content", f);
    delete require.cache[require.resolve(p)];
    require(p);
  }
  const S = global.window.SECPLUS;
  const E = require("../js/engine.js");
  return { S, E, idx: E.indexContent(S) };
};
