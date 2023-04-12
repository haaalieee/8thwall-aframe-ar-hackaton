import variantsIcon from "../../assets/variants-icon.png";
import variantsCloseIcon from "../../assets/variantsclose-icon.png";

const remapMaterialUVs = (
  material,
  remapUVs,
  // eslint-disable-next-line no-unused-vars
  { uvAttributePrefix, uvAttributeOffset } = {}
) => {
  const _uvAttributePrefix = uvAttributePrefix || "texcoord_";
  const _uvAttributeOffset = 2;

  material.customProgramCacheKey = () => Math.random();
  // eslint-disable-next-line no-unused-vars
  material.onBeforeCompile = (shader, context) => {
    const resolveIncludes = (shader) => {
      // NOTE Straight from three/WebGLProgram.js
      const includePattern = /^[ \t]*#include +<([\w\d./]+)>/gm;

      return shader.replace(includePattern, (match, include) => {
        const string = THREE.ShaderChunk[include];

        if (!string) {
          return;
        }

        return resolveIncludes(string);
      });
    };

    let maxTexCoordIndex = 0;
    const texCoordSwaps = [];

    Object.entries(remapUVs).forEach(([textureType, uvMap]) => {
      if (!uvMap.startsWith(_uvAttributePrefix)) {
        console.warn("Invalid UVMap name", uvMap);

        return;
      }

      const texCoordIndex = parseFloat(
        uvMap.split(new RegExp(`${_uvAttributePrefix}\\D*`, "gi")).join("")
      );

      maxTexCoordIndex = Math.max(texCoordIndex, maxTexCoordIndex);
      texCoordSwaps[textureType] = texCoordIndex;
    });

    if (maxTexCoordIndex - 1 <= 0) {
      return;
    }

    shader.vertexShader = shader.vertexShader
      .replace(
        `#include <uv2_pars_vertex>`,
        `
        ${Array(maxTexCoordIndex - 1)
          .fill(0)
          .map(
            (_, index) => `
          attribute vec2 ${_uvAttributePrefix}${index + _uvAttributeOffset};
          varying vec2 vTexCoord${index + _uvAttributeOffset};
        `
          )
          .join("\n")}
  
        #include <uv2_pars_vertex>
      `
      )
      .replace(
        `#include <uv2_vertex>`,
        `
        ${Array(maxTexCoordIndex - 1)
          .fill(0)
          .map(
            (_, index) => `
          vTexCoord${
            index + _uvAttributeOffset
          } = ( vec3( ${_uvAttributePrefix}${
              index + _uvAttributeOffset
            }, 1 ) ).xy;
        `
          )
          .join("\n")}
  
        #include <uv2_vertex>
      `
      );

    shader.fragmentShader = shader.fragmentShader.replace(
      `#include <uv2_pars_fragment>`,
      `
        ${Array(maxTexCoordIndex - 1)
          .fill(0)
          .map(
            (_, index) => `
          varying vec2 vTexCoord${index + _uvAttributeOffset};
        `
          )
          .join("\n")}
  
        #include <uv2_pars_fragment>
      `
    );

    shader.vertexShader = resolveIncludes(shader.vertexShader);
    shader.fragmentShader = resolveIncludes(shader.fragmentShader);

    Object.entries(texCoordSwaps).forEach(([textureType, texCoordIndex]) => {
      shader.fragmentShader = shader.fragmentShader
        .replaceAll(
          `texture2D( ${textureType}, vUv )`,
          `texture2D( ${textureType}, vTexCoord${texCoordIndex} )`
        )
        .replaceAll(
          `texture2D( ${textureType}, vUv2 )`,
          `texture2D( ${textureType}, vTexCoord${texCoordIndex} )`
        );
    });
  };
};

export const changeTextureComponent = {
  init() {
    const container = document.getElementById("variants-container");

    /** Create variants icon button and append to bottom list  */
    const bottomList = document.getElementById("bottom-list");
    const variantsItem = document.createElement("li");

    // Create variants close button
    const closeButton = `<button id="variants-close-btn"><img id="variants-close-img" src=${variantsCloseIcon} /></button>`;
    container.insertAdjacentHTML('beforeend', closeButton);

    bottomList.prepend(variantsItem);

    variantsItem.innerHTML = `<div class="variants-container"><button id="variants-btn"><img id="variants-img" src=${variantsIcon} /></button></div>`;

    // These hex colors are used by the UI buttons and car
    // default: purple, orange, green, blue, black
    const colorList = ["#6a7a87", "#36adc4", "#c7a6bd", "#91ac9a", "#c09cb4"];

    // Show colorlist when variants button is clicked
    const variantsBtn = document.getElementById("variants-btn");

    variantsBtn.addEventListener("click", () =>{
      container.style.bottom = "0px";
      bottomList.style.pointerEvents = "none";
    })

    // Hide colorlist when variants button is clicked
    const variantsCloseBtn = document.getElementById("variants-close-btn");
    
    variantsCloseBtn.addEventListener("click", () =>{
      container.style.bottom = "-200px";
      bottomList.style.pointerEvents = "auto";
    })

    this.el.addEventListener("componentchanged", (e) => {
      if (e.detail.name === "visible") {
        // Named the specified mesh within the 3D model 'KeyBase' (The mesh for the base of the keyboard)
        const setColor = ({ newColor, button }) => {
          for (let i = 0; i < colorList.length; i++) {
            const btns = document.getElementsByClassName("carousel");
            btns[i].classList.remove("selected");
          }
          // const modelMesh = this.el
          //   .getObject3D("mesh")
          //   .getObjectByName("KeyBase");
          // modelMesh.traverse((node) => {
          //   node.material.color = new THREE.Color(newColor);
          // });
          // console.log(this.el.getObject3D('mesh').getObjectByName("sm_keyboard"))
          const modelMesh = this.el
            .getObject3D("mesh")
            .getObjectByName("sm_keyboard");
          if (newColor === colorList[0]) {
            remapMaterialUVs(modelMesh.material, {
              map: "texcoord_4", // gray
            });
            modelMesh.material.needsUpdate = true;
            console.log("first");
          } else if (newColor === colorList[1]) {
            remapMaterialUVs(modelMesh.material, {
              map: "texcoord_5", // gray blue
            });
            modelMesh.material.needsUpdate = true;
            console.log("second");
          } else if (newColor === colorList[2]) {
            remapMaterialUVs(modelMesh.material, {
              map: "texcoord_3", // pink light pink
            });
            modelMesh.material.needsUpdate = true;
            console.log("third");
          } else if (newColor === colorList[3]) {
            remapMaterialUVs(modelMesh.material, {
              map: "texcoord_1", // green white
            });
            modelMesh.material.needsUpdate = true;
            console.log("fourth");
          } else if (newColor === colorList[4]) {
            remapMaterialUVs(modelMesh.material, {
              map: "texcoord_2", // pink white
            });
            modelMesh.material.needsUpdate = true;
            console.log("fifth");
          }

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
        const firstButton = container.getElementsByClassName("carousel")[0];
        // set car to first button's color
        setColor({ newColor: colorList[0], button: firstButton });
      }
    });
  },
};
