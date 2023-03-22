import React from "react";

import {
  absPinchScaleComponent,
  AFrameScene,
  annotationComponent,
  changeColorComponent,
  changeSceneComponent,
  changeTextureComponent,
  customCaptureComponent,
  DISABLE_IMAGE_TARGETS,
  ignoreRaycast, infoComponent, lockScene, responsiveImmersiveComponent,
  tapPlaceCursorComponent,
  viewMoreComponent
} from "../lib/components";
import html from "./keyboard.html";

const Scene = () => (
  <AFrameScene
    sceneHtml={html}
    components={[
      { name: "tap-place-cursor", val: tapPlaceCursorComponent },
      { name: "change-color", val: changeColorComponent },
      { name: "change-texture", val: changeTextureComponent },
      { name: "change-scene", val: changeSceneComponent },
      { name: "annotation", val: annotationComponent },
      { name: "absolute-pinch-scale", val: absPinchScaleComponent },
      { name: "ignore-raycast", val: ignoreRaycast },
      { name: "responsive-immersive", val: responsiveImmersiveComponent },
      { name: "custom-capture-btn", val: customCaptureComponent },
      { name: "view-more", val: viewMoreComponent },
      { name: "info-component", val: infoComponent },
      { name: "lock-scene", val: lockScene },
    ]}
    imageTargets={DISABLE_IMAGE_TARGETS}
  />
);

export { Scene };
