// Narrows Rouge's syntax highlighting to a few things: function and class
// definitions, control flow, and strings (strings are handled in CSS alone).
//
// Rouge gives `if`, `def`, `class` and `end` the same token class, so CSS
// can't tell control flow from other keywords. This script tags tokens by
// their text instead:
//   .flow  control-flow keywords (FLOW below)
//   .sig   definition keywords (DEF and CLASS below), the name they define,
//          and Rouge function-name tokens that aren't method calls (C's `main`).
(function () {
  var FLOW = new Set([
    // branching
    "if", "else", "elif", "elsif", "unless", "then",
    "switch", "case", "when", "match", "default", "select",
    // loops
    "for", "foreach", "while", "until", "loop",
    // jumps
    "return", "break", "continue", "goto", "fallthrough", "next", "redo",
    // exceptions
    "try", "catch", "except", "finally", "raise", "throw", "rescue", "ensure"
  ]);
  var DEF = new Set(["def", "func", "function", "fn", "fun", "sub", "proc"]);
  var CLASS = new Set(["class", "struct", "interface", "enum", "trait"]);

  function isKeyword(el) { return /^k[a-z]?$/.test(el.className) || el.className === "nl"; }
  function isName(el) { return /^n[a-z]?$/.test(el.className); }

  document.querySelectorAll(".highlight code").forEach(function (code) {
    // Rouge emits a flat list of spans; skip whitespace-only text between them.
    var toks = Array.prototype.filter.call(code.childNodes, function (n) {
      return n.textContent.trim() !== "";
    });

    toks.forEach(function (el, i) {
      if (el.nodeType !== 1) return;
      var word = el.textContent.trim();

      if (isKeyword(el) && FLOW.has(word)) {
        el.classList.add("flow");
      } else if (isKeyword(el) && DEF.has(word)) {
        el.classList.add("sig");
        // Mark the defined name, skipping a Go-style receiver: func (r T) Name()
        for (var j = i + 1, depth = 0; j < toks.length; j++) {
          var t = toks[j], text = t.textContent.trim();
          if (text === "(" && j === i + 1) { depth++; continue; }
          if (depth) { if (text.indexOf(")") !== -1) depth--; continue; }
          if (t.nodeType === 1 && isName(t)) t.classList.add("sig");
          break;
        }
      } else if (isKeyword(el) && CLASS.has(word)) {
        // `class Color`: mark the keyword and the name right after it.
        el.classList.add("sig");
        var next = toks[i + 1];
        if (next && next.nodeType === 1 && isName(next)) next.classList.add("sig");
        // Go puts the name first: `type Rect struct`
        var prev = toks[i - 1], prev2 = toks[i - 2];
        if (prev && prev2 && prev2.textContent.trim() === "type" && prev.nodeType === 1 && isName(prev)) {
          prev2.classList.add("sig");
          prev.classList.add("sig");
        }
      } else if (el.className === "nf") {
        // Definitions like C's `int main(void)`; not calls such as `foo.map`.
        var prev = i > 0 ? toks[i - 1].textContent.trim() : "";
        if (!/(\.|::|->)$/.test(prev)) el.classList.add("sig");
      }
    });
  });
})();
