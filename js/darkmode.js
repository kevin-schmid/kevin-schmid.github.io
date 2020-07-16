const s = v => v ? document.documentElement.classList.add("darkmode") : document.documentElement.classList.remove("darkmode");
s(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {s(e.matches)});