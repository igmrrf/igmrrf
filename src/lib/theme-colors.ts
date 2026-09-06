/**
 * The colour phones paint their own chrome with: the iOS status bar and Safari
 * toolbars, the Chrome address bar on Android, and the navigation bar of an
 * installed PWA all read `<meta name="theme-color">`.
 *
 * These mirror `--background` in globals.css and have to be duplicated as hex:
 * a meta tag cannot read a CSS custom property, and the value has to be in the
 * markup before the first paint — before any stylesheet or bundle has run — or
 * the bar shows one colour and then flips to another.
 */
export const THEME_COLORS = {
  light: "#ffffff",
  dark: "#000000",
} as const;

/** Where next-themes keeps the user's explicit choice. */
export const THEME_STORAGE_KEY = "theme";

/**
 * Runs in <head> before the first paint, so the bar is already right when the
 * page appears rather than correcting itself once React hydrates.
 *
 * It repeats what ThemeColorSync does later because it has to: hydration is
 * far too late for a chrome colour, and a saved choice that disagrees with the
 * OS preference is exactly the case the media-scoped tags get wrong.
 */
export const THEME_COLOR_INIT_SCRIPT = `(function(){try{
var stored=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
var dark=stored?stored==="dark":matchMedia("(prefers-color-scheme: dark)").matches;
if(stored==="system")dark=matchMedia("(prefers-color-scheme: dark)").matches;
var color=dark?${JSON.stringify(THEME_COLORS.dark)}:${JSON.stringify(THEME_COLORS.light)};
var tags=document.querySelectorAll('meta[name="theme-color"]');
for(var i=0;i<tags.length;i++)tags[i].setAttribute("content",color);
}catch(e){}})();`;
