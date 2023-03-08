const annotationComponent = {
  schema: {
    text: { default: "text here" }, // text label displays
    labeldistance: { default: 1 }, // distance to element before label appears
    hsdistance: { default: 2.85 }, // distance to element before hotspot appears
    offsetY: { default: 0.1 }, // y offset of label
  },
  init() {
    this.camera = this.el.sceneEl.camera;
    this.scene = new THREE.Scene();
    let toggleLabel = false;
    let labelActivated;
    let hsActivated;
    // hotspot inner customization
    this.el.setAttribute("radius", 0.03);
    this.el.setAttribute("material", {
      shader: "flat",
      color: "#FF4713",
      alphaTest: 0.5,
      transparent: true,
    });
    this.el.setAttribute("segments-height", 12);
    this.el.setAttribute("segments-width", 12);
    // hotspot torus customization
    this.torus = document.createElement("a-torus");
    this.torus.setAttribute("material", {
      shader: "flat",
      color: "#FF4713",
      alphaTest: 0.5,
      transparent: true,
    });
    this.torus.setAttribute("radius", 0.05);
    this.torus.setAttribute("segments-radial", 12);
    this.torus.setAttribute("segments-tubular", 24);
    this.torus.setAttribute("radius-tubular", 0.005);
    this.torus.setAttribute("xrextras-spin", "");
    this.el.appendChild(this.torus);
    this.activateLabel = () => {
      if (labelActivated) {
        return;
      }
      // hide hotspot torus
      this.torus.setAttribute("animation__scale", {
        property: "scale",
        from: "1 1 1",
        to: "0.001 0.001 0.001",
        easing: "easeInOutQuad",
        dur: 250,
      });
      // change sphere color and size
      this.el.setAttribute("radius", 0.01);
      // brighten hotspot inner
      this.el.setAttribute("color", "#FD835E");
      // show text label
      this.label.style.opacity = 0;
      this.label.style.display = "block";
      this.label.classList.add("fade-in");
      setTimeout(() => {
        this.label.style.opacity = 1;
        this.label.classList.remove("fade-in");
      }, 500);
      labelActivated = true;
      toggleLabel = true;
    };
    this.deactivateLabel = () => {
      if (!labelActivated) {
        return;
      }
      // show hotspot torus
      this.torus.setAttribute("animation__scale", {
        property: "scale",
        from: "0.001 0.001 0.001",
        to: "1 1 1",
        easing: "easeOutElastic",
        dur: 500,
      });
      // revert sphere color and size
      this.el.setAttribute("radius", 0.03);
      // revert to original hotspot inner color
      this.el.setAttribute("color", "#FF4713");
      // hide text label
      this.label.style.opacity = 1;
      this.label.classList.add("fade-out");
      setTimeout(() => {
        this.label.style.opacity = 0;
        this.label.classList.remove("fade-out");
        this.label.style.display = "none";
      }, 400);
      labelActivated = false;
      toggleLabel = false;
    };
    // show hotspot
    this.activateHs = () => {
      if (hsActivated) {
        return;
      }
      this.el.setAttribute("animation__fading", {
        property: "opacity",
        from: 0,
        to: 1,
        easing: "easeInOutQuad",
        dur: 1000,
      });
      this.torus.setAttribute("animation__fade", {
        property: "opacity",
        from: 0,
        to: 1,
        easing: "easeInOutQuad",
        dur: 1000,
      });
      hsActivated = true;
    };
    // hide hotspot
    this.deactivateHs = () => {
      if (!hsActivated) {
        return;
      }
      this.el.setAttribute("animation__fading", {
        property: "opacity",
        from: 1,
        to: 0,
        easing: "easeInOutQuad",
        dur: 1000,
      });
      this.torus.setAttribute("animation__fade", {
        property: "opacity",
        from: 1,
        to: 0,
        easing: "easeInOutQuad",
        dur: 1000,
      });
      hsActivated = false;
    };
    // create label renderer for text
    this.labelRenderer = new THREE.CSS2DRenderer();
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.domElement.style.position = "absolute";
    this.labelRenderer.domElement.style.top = "0px";
    this.labelRenderer.domElement.style.pointerEvents = "none";
    document.body.appendChild(this.labelRenderer.domElement);
    // create label
    this.label = document.createElement("h1");
    this.label.style.color = "white";
    this.label.style.opacity = 0;
    this.label.style.fontFamily = "'Nunito', sans-serif";
    this.label.style.fontWeight = "bold";
    this.label.style.fontSize = "1.3em";
    this.label.style.textShadow = "rgb(0 0 0 / 50%) 0px 0px 6px";
    this.label.innerText = this.data.text;
    document.body.appendChild(this.label);
    // set label position to hotspot
    this.labelObj = new THREE.CSS2DObject(this.label);
    this.worldVec = new THREE.Vector3();
    this.worldPos = this.el.object3D.getWorldPosition(this.worldVec);
    this.labelObj.position.copy(
      new THREE.Vector3(
        this.worldPos.x,
        this.worldPos.y + this.data.offsetY,
        this.worldPos.z
      )
    );
    this.scene.add(this.labelObj);

    // Toggle label when user clicks
    // this.el.addEventListener("click", () => {
    //   if (!toggleLabel) {
    //     this.activateLabel();
    //     console.log("active " + this.label.style.display);
    //   } else {
    //     this.deactivateLabel();
    //     console.log("not active " + this.label.style.display);
    //   }
    // });
  },
  tick() {
    // track label position to hotspot
    this.worldPos = this.el.object3D.getWorldPosition(this.worldVec);
    this.labelObj.position.copy(
      new THREE.Vector3(
        this.worldPos.x,
        this.worldPos.y + this.data.offsetY,
        this.worldPos.z 
      )
    );
    this.labelRenderer.render(this.scene, this.camera);
    // proximity monitoring
    const distance = this.worldPos.distanceTo(this.camera.el.object3D.position);
    if (distance < this.data.labeldistance) {
      this.activateLabel();
    } else {
      this.deactivateLabel();
    }
    // if (distance < this.data.hsdistance) {
    //   this.activateHs();
    // } else {
    //   this.deactivateHs();
    // }
  },
};

export { annotationComponent };

