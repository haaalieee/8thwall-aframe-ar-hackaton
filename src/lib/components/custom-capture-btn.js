export const customCaptureComponent = {
  init() {
    const model = document.getElementById("model");
    const btn = document.getElementById("recorder-button");
    
    btn.style.display = "none";

    model.addEventListener("componentchanged", (e) => {
      if (e.detail.name === "visible") {
        btn.style.display = "block";
        btn.innerHTML = `<img id="icon" src=${
          require("../../assets/camera.svg").default
        }> Capture`;
      }
    });
  },
};
