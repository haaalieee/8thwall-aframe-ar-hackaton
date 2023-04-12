// This component is an example of how to separate behavior by device category
// using 8th Wall Engine sessionAttributes
export const responsiveImmersiveComponent = {
  init() {
    const onAttach = ({ sessionAttributes }) => {
      const model = document.getElementById("model");
      const modelCursor = document.getElementById("cursor");
      const container = document.getElementById("variants-container");
      const s = sessionAttributes;
      if (
        !s.cameraLinkedToViewer &&
        !s.controlsCamera &&
        !s.fillsCameraTexture &&
        !s.supportsHtmlEmbedded &&
        s.supportsHtmlOverlay &&
        !s.usesMediaDevices &&
        !s.usesWebXr
      ) {
        // Desktop-specific behavior goes here
        const addComponents = () => {
          model.setAttribute("reflections", "type: static");
        };
        model.getObject3D("mesh")
          ? addComponents()
          : model.addEventListener("model-loaded", addComponents);
        console.log("desktop");
      } else if (
        s.cameraLinkedToViewer &&
        s.controlsCamera &&
        !s.fillsCameraTexture &&
        s.supportsHtmlEmbedded &&
        !s.supportsHtmlOverlay &&
        !s.usesMediaDevices &&
        s.usesWebXr
      ) {
        // HMD-specific behavior goes here
        if (this.el.sceneEl.xrSession.environmentBlendMode === "opaque") {
          // VR HMD (i.e. Oculus Quest) behavior goes here
          model.setAttribute("ignore-raycast", "");
          const addComponents = () => {
            model.setAttribute("reflections", "type: static");
          };
          model.getObject3D("mesh")
            ? addComponents()
            : model.addEventListener("model-loaded", addComponents);
        } else if (
          this.el.sceneEl.xrSession.environmentBlendMode === "additive" ||
          "alpha-blend"
        ) {
          // AR HMD (i.e. Hololens) behavior goes here
          model.setAttribute("ignore-raycast", "");
          const addComponents = () => {
            model.setAttribute("reflections", "type: static");
          };
          model.getObject3D("mesh")
            ? addComponents()
            : model.addEventListener("model-loaded", addComponents);
        }
      } else if (
        !s.cameraLinkedToViewer &&
        !s.controlsCamera &&
        s.fillsCameraTexture &&
        !s.supportsHtmlEmbedded &&
        s.supportsHtmlOverlay &&
        s.usesMediaDevices &&
        !s.usesWebXr
      ) {
        // Mobile-specific behavior goes here
        this.el.addEventListener("coaching-overlay.show", (e) => {
          modelCursor.object3D.scale.set(0.001, 0.001, 0.001);
          model.object3D.scale.set(0.001, 0.001, 0.001);
          container.style.display = "none";
        });
        this.el.addEventListener("coaching-overlay.hide", (e) => {
          container.style.display = "block";
          model.object3D.scale.set(1, 1, 1);
          modelCursor.object3D.scale.set(1, 1, 1);
        });
        const addComponents = () => {
          model.setAttribute("reflections", "type: realtime");
        };
        model.getObject3D("mesh")
          ? addComponents()
          : model.addEventListener("model-loaded", addComponents);
      }
    };
    const onxrloaded = () => {
      XR8.addCameraPipelineModules([{ name: "responsiveImmersive", onAttach }]);
    };
    window.XR8 ? onxrloaded() : window.addEventListener("xrloaded", onxrloaded);
  },
};
