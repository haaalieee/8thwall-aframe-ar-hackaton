import camera from "../../assets/camera-icon-svg.svg";

export const customCaptureComponent = {
  init() {
    const model = document.getElementById("model");
    const bottomList = document.getElementById("bottom-list");
    const recorderContainer = document.getElementById("recorder");
    const captureBtn = document.getElementById("recorder-button");
    const textureSelectionContainer = document.getElementById("variants-container");
    const closePreviewBtn = document.getElementById("closePreviewButton");

    bottomList.style.display = "none";
    bottomList.parentElement.style.zIndex = 5;

    model.addEventListener("componentchanged", (e) => {
      const captureList = document.createElement("li");

      if (e.detail.name === "visible") {
        bottomList.append(captureList);
        captureList.append(recorderContainer);
        captureBtn.innerHTML = `<img id="icon" src=${camera}>`;

        bottomList.style.display = "grid";


        window.addEventListener("mediarecorder-photocomplete", () => {
          // Hide list when screen preview is active
          bottomList.style.display = "none";

          // Hide model variants selection container preview is active
          textureSelectionContainer.style.display = "none";
        });

        closePreviewBtn.addEventListener("click", () => {

          // Show model variants selection container preview is active
          textureSelectionContainer.style.display = "block";

          
          // Show list when screen preview is not active
          bottomList.style.display = "grid";

        });
      }
    });
  },
};
