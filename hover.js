const navbar = document.getElementById("navbar");
const hoverLine = document.getElementById("hover-line");


navbar.querySelectorAll("a").forEach(link => {
  link.addEventListener("mouseenter", e => {
    const rect = e.target.getBoundingClientRect();
    const navRect = navbar.getBoundingClientRect();

    hoverLine.style.width = rect.width + "px";
    hoverLine.style.left = (rect.left - navRect.left) + "px";


    navbar.querySelectorAll("a").forEach(a => a.style.color = "white");
    e.target.style.color = "#E1306C";
  });
});


navbar.addEventListener("mouseleave", () => {
  hoverLine.style.width = 0;
  navbar.querySelectorAll("a").forEach(a => a.style.color = "white");
});
