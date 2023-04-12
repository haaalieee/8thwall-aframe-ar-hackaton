export const changeColorComponent = {
  init() {
    const container = document.getElementById("variants-container");
    // These hex colors are used by the UI buttons and car
    // default: purple, orange, green, blue, black
    const colorList = ["#ffffff", "#ff9500", "#66cc00", "#5ac8fa", "#000"];

    this.el.addEventListener("componentchanged", (e) => {
      if (e.detail.name === "visible") {
        // Named the specified mesh within the 3D model 'KeyBase' (The mesh for the base of the keyboard)
        const setColor = ({ newColor, button }) => {
          for (let i = 0; i < colorList.length; i++) {
            const btns = document.getElementsByTagName("button");
            btns[i].classList.remove("selected");
          }
          const modelMesh = this.el
            .getObject3D("mesh")
            .getObjectByName("KeyBase");
          modelMesh.traverse((node) => {
            node.material.color = new THREE.Color(newColor);
          });
          button.classList.add("selected");
        };
        // create a UI button for each color in the list that changes the car color
        for (let i = 0; i < colorList.length; i++) {
          const colorButton = document.createElement("button");
          colorButton.classList.add("carousel");
          colorButton.style.backgroundColor = colorList[i];
          container.appendChild(colorButton);
          colorButton.addEventListener("click", () =>
            setColor({
              newColor: colorList[i],
              button: colorButton,
            })
          );
        }
        // support horizontal scroll for more than 5 colors
        if (colorList.length > 5) {
          container.style.pointerEvents = "auto";
        }

        // Select first button in list
        const firstButton = container.getElementsByTagName("button")[0];
        // set car to first button's color
        setColor({ newColor: colorList[0], button: firstButton });
      }
    });
  },
};

