import { useEffect } from "react";

const registeredComponents = new Set();
const registerComponents = (components) =>
  components.forEach(({ name, val }) => {
    if (registeredComponents.has(name)) {
      return;
    }
    registeredComponents.add(name);
    AFRAME.registerComponent(name, val);
  });
// Helper function to make sure that aframe primitives are only registered once, since they can't
// be cleanly unregistered.
const registeredPrimitives = new Set();
const registerPrimitives = (primitives) =>
  primitives.forEach(({ name, val }) => {
    if (registeredPrimitives.has(name)) {
      return;
    }
    registeredPrimitives.add(name);
    AFRAME.registerPrimitive(name, val);
  });
// A react component for loading and unloading an aframe scene. The initial scene contents should
// be specified as an html string in sceneHtml. All props must be specified when the component
// mounts. Updates to props will be ignored.
//
// Optionally, aframe coponents to register for this scene can be passed as [{name, val}] arrays.
// Care is needed here to not define the same component different across scenes, since aframe
// components can't be unloaded.
//
// Optionally imageTargets can be specified to override the set loaded by default.
export function AFrameScene({
  sceneHtml,
  imageTargets,
  components,
  primitives,
}) {
  useEffect(() => {
    if (imageTargets) {
      const configureImageTargets = () => {
        XR8.XrController.configure({ imageTargets });
      };
      window.XR8
        ? configureImageTargets()
        : window.addEventListener("xrloaded", configureImageTargets);
    }
    if (components) {
      registerComponents(components);
    }
    if (primitives) {
      registerPrimitives(primitives);
    }
    const html = document.getElementsByTagName("html")[0];
    const origHtmlClass = html.className;
    document.body.insertAdjacentHTML("beforeend", sceneHtml);
    // Cleanup
    return () => {
      const ascene = document.getElementsByTagName("a-scene")[0];
      ascene.parentNode.removeChild(ascene);
      html.className = origHtmlClass;
    };
  }, []);
  return <></>;
}
export const DISABLE_IMAGE_TARGETS = [];
