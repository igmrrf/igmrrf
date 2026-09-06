/** Mirrors `--background` in globals.css; a meta tag cannot read a CSS variable. */
export const THEME_COLORS = {
  light: "#ffffff",
  dark: "#000000",
} as const;

/** Where next-themes keeps the user's explicit choice. */
export const THEME_STORAGE_KEY = "theme";

/** Runs in <head> before the first paint, so the bar never starts on the wrong colour. */
export const THEME_COLOR_INIT_SCRIPT = `(function(){try{
var stored=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
var dark=stored&&stored!=="system"?stored==="dark":matchMedia("(prefers-color-scheme: dark)").matches;
var color=dark?${JSON.stringify(THEME_COLORS.dark)}:${JSON.stringify(THEME_COLORS.light)};
var tags=document.querySelectorAll('meta[name="theme-color"]');
for(var i=0;i<tags.length;i++)tags[i].setAttribute("content",color);
}catch(e){}})();`;
