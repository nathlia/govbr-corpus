document.addEventListener("DOMContentLoaded", function () {
  var button = document.querySelector(".copy-protocol");
  var protocol = document.querySelector(".protocol");
  if (!button || !protocol) return;
  button.addEventListener("click", function () {
    navigator.clipboard.writeText(protocol.textContent.trim());
    button.textContent = "Protocolo copiado";
  });
});
