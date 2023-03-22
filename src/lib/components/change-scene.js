export const changeSceneComponent = {
  init() {
    const scene = this.el.sceneEl;
    const changeSceneButton = document.getElementById("changeView");
    const flipBg = document.getElementById("blackFade");
    const model = document.getElementById("model");
    const camera = document.getElementById("camera");
    const sky = document.getElementById("sky");
    const toggle = document.getElementById("toggle");
    const bottomList = document.getElementById("bottom-list");

    console.log("AR/3D not activated");

    model.addEventListener("componentchanged", (e) => {
      console.log("AR/3D activated");
      // If model is active
      toggle.setAttribute("style", "display: block; z-index: 10;");

      if (e.detail.name === "visible") {
        // Fade In & Out Scenes
        scene.addEventListener("realityready", () => {
          // fade from black
          flipBg.classList.add("fade-out");
          setTimeout(() => {
            flipBg.classList.remove("fade-out");
            flipBg.style.opacity = 0;
          }, 500);
        });
        // Toggle AR/3D Views Logic
        changeSceneButton.addEventListener("click", () => {
          if (changeSceneButton.checked) {
            // Disable button as scene loads
            toggle.classList.add("disable-button");
            
            // Change to 3D View
            scene.removeAttribute("xrweb");
            model.removeAttribute("xrextras-hold-drag");
            model.setAttribute("scale", { x: 5, y: 5, z: 5 });
            model.setAttribute("position", { x: 0, y: 0, z: 0 });
            camera.setAttribute("position", { x: 0, y: 1, z: 2 });
           
            // Set Attributes For Orbit Scene
            camera.setAttribute("orbit-controls", {
              enabled: true,
              autoRotate: true,
              autoRotateSpeed: 1,
              minDistance: -5,
              maxDistance: 8,
              zoomSpeed: 0.5,
            });
            sky.setAttribute("visible", true);
            
            // Re-enable button after scene loaded
            setTimeout(() => {
              toggle.classList.remove("disable-button");
            }, 1500);

            //Remove capture button
            bottomList.style.display = "none";
          
          } else {
            // Disable button as scene loads
            toggle.classList.add("disable-button");

            // Change To AR View
            flipBg.style.opacity = 1;
            scene.setAttribute("xrweb", "");
            model.setAttribute("reflections", "type: realtime");
            model.setAttribute("absolute-pinch-scale", "");
            model.setAttribute("change-texture", "");
            model.setAttribute("xrextras-hold-drag", "");
            model.setAttribute("scale", { x: 5, y: 5, z: 5 });
            model.setAttribute("position", { x: 0, y: 0, z: 0 });
            model.setAttribute("rotation", { x: 0, y: 0, z: 0 });
            camera.setAttribute("position", { x: 0, y: 1, z: 2 });
            camera.setAttribute("orbit-controls", { enabled: false });

            // Re-set Model To Center
            scene.emit("recenter");
            const reset = () => {
              scene.emit("recenter", {
                origin: { x: 0, y: 0, z: 0 },
                facing: { w: 1, x: 0, y: 0, z: 0 },
              });
              toggle.classList.remove("disable-button");
            };
            scene.addEventListener("realityready", reset);
            sky.setAttribute("visible", false);

            //Add capture button
            bottomList.style.display = "flex";
          }
        });
      }
    });
  },
};
