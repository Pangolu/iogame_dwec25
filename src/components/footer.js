export { renderFooter };

function renderFooter() {
  const text = `<footer class="bg-dark text-white text-center text-lg-start">
  <!-- Copyright -->
  <div class="text-center p-3">
    © 2025 Copyright:
    <a class="text-blue" href="">Pangolu</a>
  </div>
  <!-- Copyright -->
</footer>`;
const div = document.createElement("div");
div.innerHTML = text;
  
  return div;
}
