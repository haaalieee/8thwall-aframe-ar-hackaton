import ellipsisIcon from "../../assets/ellipsis-icon-svg.svg";

export const viewMoreBtn = {
  init() {
    const model = document.getElementById("model");
    const bottomList = document.getElementById("bottom-list");

    model.addEventListener("componentchanged", (e) => {
      if (e.detail.name === "visible") {
        const infoContainer = document.getElementById("info");
        const buyNowContainer = document.getElementById("buy-now");

        /** Create li item for the bottom list and attach button to view more information */
        const viewMoreItem = document.createElement("li");
        bottomList.prepend(viewMoreItem);
        viewMoreItem.innerHTML = `<div class="view-more-container"><button id="view-btn"><img src=${ellipsisIcon} /></button></div>`;

        const viewBtn = document.getElementById("view-btn");

        viewBtn.addEventListener("click", () => {
          infoContainer.style.opacity = 100;
          buyNowContainer.style.opacity = 100;
        });
      }
    });
  },
};
