import React from "react";

import {
  AFrameScene,
  DISABLE_IMAGE_TARGETS,
  absPinchScaleComponent,
  annotationComponent,
  changeColorComponent,
  changeTextureComponent, customCaptureComponent,
  ignoreRaycast,
  responsiveImmersiveComponent,
  tapPlaceCursorComponent,
  viewInfo
} from "../lib/components";
import html from "./keyboard.html";

const Scene = () => (
  <AFrameScene
    sceneHtml={html}
    components={[
      { name: "tap-place-cursor", val: tapPlaceCursorComponent },
      { name: "change-color", val: changeColorComponent },
      { name: "change-texture", val: changeTextureComponent },
      { name: "annotation", val: annotationComponent },
      { name: "absolute-pinch-scale", val: absPinchScaleComponent },
      { name: "ignore-raycast", val: ignoreRaycast },
      { name: "responsive-immersive", val: responsiveImmersiveComponent },
      { name: "custom-capture-btn", val: customCaptureComponent },
      { name: "view-info", val: viewInfo },
    ]}
    imageTargets={DISABLE_IMAGE_TARGETS}
  />
);

export { Scene };
