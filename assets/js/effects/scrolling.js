document.querySelectorAll("a[href^='#']").forEach(anchor => {
  console.log("rolling again");
  anchor.addEventListener("click", () => {
    console.log("Clicked an Anchor");
  });
});
