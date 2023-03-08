import React from "react";

import { absPinchScaleComponent } from "../lib/absolute-pinch-scale";
import { AFrameScene, DISABLE_IMAGE_TARGETS } from "../lib/aframe-components";
import { annotationComponent } from "../lib/annotation-component";
import { changeColorComponent } from "../lib/color-change";
import { tapPlaceCursorComponent } from "../lib/tap-place-cursor";
import html from "./keyboard.html";

const Scene = () => (
  <AFrameScene
    sceneHtml={html}
    components={[
      { name: "tap-place-cursor", val: tapPlaceCursorComponent },
      { name: "change-color", val: changeColorComponent },
      { name: "annotation", val: annotationComponent },
      { name: "absolute-pinch-scale", val: absPinchScaleComponent },
    ]}
    imageTargets={DISABLE_IMAGE_TARGETS}
  />
);

export { Scene };
