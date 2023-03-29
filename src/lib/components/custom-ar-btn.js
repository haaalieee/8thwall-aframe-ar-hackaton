export const customARComponent = {
  init() {
    const model = document.getElementById("model");
    const bottomList = document.getElementById("bottom-list");
    const toggleContainer = document.getElementById("toggle");

    model.addEventListener("componentchanged", (e) => {
      const toggleList = document.createElement("li");

      if (e.detail.name === "visible") {
        bottomList.prepend(toggleList);
        toggleList.append(toggleContainer);
      }
    });
  },
};
