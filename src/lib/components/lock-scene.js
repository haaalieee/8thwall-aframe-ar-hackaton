import lockIcon from "../../assets/lock-icon.png";

export const lockScene = {
    init() {
        const model = document.getElementById("model");
        const bottomList = document.getElementById("bottom-list");

        model.addEventListener("componentchanged", (e) => {
            if (e.detail.name === "visible") {
              /** Create li item for the bottom list and attach button to lock screen */
              const lockBtn = document.createElement("li");
              bottomList.append(lockBtn);
              lockBtn.innerHTML = `<div class="lock-container"><button id="lock-btn"><img src=${lockIcon} /></button></div>`;
            }
          });
    }
}