import arrowIcon from "../../assets/arrow-right-icon.png";
import closeIcon from "../../assets/close-button-icon.svg";
import previewItemIcon from "../../assets/keyboard-preview-item.png";
import mapIcon from "../../assets/map-icon.png";

export const infoComponent = {
  schema: {
    offsetY: { default: 0.5 }, // y offset of label
  },
  init() {
    this.scene = new THREE.Scene();
    this.camera = this.el.sceneEl.camera;
    this.labelRenderer = new THREE.CSS2DRenderer();
    this.lengthMeshBounds = new THREE.Vector3();

    // Holds the content to be inserted in the container
    const infoHtml = `<img src=${previewItemIcon} class="info-item-image"/>
                        <div class="info-content">
                            <button class="info-close-btn" id="info-close">
                                <p>
                                    <span>
                                        <img src=${closeIcon}/>
                                    </span>Close Details
                                </p>
                            </button>
                            <h2 class="info-item-title">Corsair K70 RGB TKL</h2>
                            <div class="info-reviews">
                                <ul>
                                    <li class="filled">
                                        <svg width="10" height="9" viewBox="0 0 10 9" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.8885 3.37287C9.83963 3.22825 9.70968 3.12286 9.55326 3.10103L6.90047 2.73031L5.71407 0.418007C5.64411 0.281671 5.49973 0.195343 5.34168 0.195343C5.1836 0.195343 5.03923 0.281671 4.9693 0.418007L3.78298 2.73028L1.1301 3.101C0.973684 3.12286 0.843704 3.22825 0.794869 3.37284C0.746033 3.51746 0.786757 3.67619 0.89996 3.7823L2.81958 5.58188L2.36625 8.12343C2.33953 8.27329 2.40357 8.42472 2.53144 8.51409C2.60378 8.56465 2.68947 8.59038 2.77557 8.59038C2.84165 8.59038 2.90801 8.57522 2.96878 8.5445L5.34165 7.34466L7.71451 8.5445C7.77563 8.57541 7.84258 8.59014 7.90888 8.59038C8.13797 8.59006 8.32357 8.41136 8.32357 8.19095C8.32357 8.16028 8.31997 8.13038 8.31316 8.1017L7.86375 5.58191L9.78338 3.7823C9.89661 3.67619 9.93733 3.51746 9.8885 3.37287Z"
                                                fill="#FAD246" />
                                        </svg></li>
                                    <li class="filled">
                                        <svg width="10" height="9" viewBox="0 0 10 9" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.8885 3.37287C9.83963 3.22825 9.70968 3.12286 9.55326 3.10103L6.90047 2.73031L5.71407 0.418007C5.64411 0.281671 5.49973 0.195343 5.34168 0.195343C5.1836 0.195343 5.03923 0.281671 4.9693 0.418007L3.78298 2.73028L1.1301 3.101C0.973684 3.12286 0.843704 3.22825 0.794869 3.37284C0.746033 3.51746 0.786757 3.67619 0.89996 3.7823L2.81958 5.58188L2.36625 8.12343C2.33953 8.27329 2.40357 8.42472 2.53144 8.51409C2.60378 8.56465 2.68947 8.59038 2.77557 8.59038C2.84165 8.59038 2.90801 8.57522 2.96878 8.5445L5.34165 7.34466L7.71451 8.5445C7.77563 8.57541 7.84258 8.59014 7.90888 8.59038C8.13797 8.59006 8.32357 8.41136 8.32357 8.19095C8.32357 8.16028 8.31997 8.13038 8.31316 8.1017L7.86375 5.58191L9.78338 3.7823C9.89661 3.67619 9.93733 3.51746 9.8885 3.37287Z"
                                                fill="#FAD246" />
                                        </svg></li>
                                    <li class="filled">
                                        <svg width="10" height="9" viewBox="0 0 10 9" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.8885 3.37287C9.83963 3.22825 9.70968 3.12286 9.55326 3.10103L6.90047 2.73031L5.71407 0.418007C5.64411 0.281671 5.49973 0.195343 5.34168 0.195343C5.1836 0.195343 5.03923 0.281671 4.9693 0.418007L3.78298 2.73028L1.1301 3.101C0.973684 3.12286 0.843704 3.22825 0.794869 3.37284C0.746033 3.51746 0.786757 3.67619 0.89996 3.7823L2.81958 5.58188L2.36625 8.12343C2.33953 8.27329 2.40357 8.42472 2.53144 8.51409C2.60378 8.56465 2.68947 8.59038 2.77557 8.59038C2.84165 8.59038 2.90801 8.57522 2.96878 8.5445L5.34165 7.34466L7.71451 8.5445C7.77563 8.57541 7.84258 8.59014 7.90888 8.59038C8.13797 8.59006 8.32357 8.41136 8.32357 8.19095C8.32357 8.16028 8.31997 8.13038 8.31316 8.1017L7.86375 5.58191L9.78338 3.7823C9.89661 3.67619 9.93733 3.51746 9.8885 3.37287Z"
                                                fill="#FAD246" />
                                        </svg></li>
                                    <li>
                                        <svg width="10" height="9" viewBox="0 0 10 9" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.8885 3.37287C9.83963 3.22825 9.70968 3.12286 9.55326 3.10103L6.90047 2.73031L5.71407 0.418007C5.64411 0.281671 5.49973 0.195343 5.34168 0.195343C5.1836 0.195343 5.03923 0.281671 4.9693 0.418007L3.78298 2.73028L1.1301 3.101C0.973684 3.12286 0.843704 3.22825 0.794869 3.37284C0.746033 3.51746 0.786757 3.67619 0.89996 3.7823L2.81958 5.58188L2.36625 8.12343C2.33953 8.27329 2.40357 8.42472 2.53144 8.51409C2.60378 8.56465 2.68947 8.59038 2.77557 8.59038C2.84165 8.59038 2.90801 8.57522 2.96878 8.5445L5.34165 7.34466L7.71451 8.5445C7.77563 8.57541 7.84258 8.59014 7.90888 8.59038C8.13797 8.59006 8.32357 8.41136 8.32357 8.19095C8.32357 8.16028 8.31997 8.13038 8.31316 8.1017L7.86375 5.58191L9.78338 3.7823C9.89661 3.67619 9.93733 3.51746 9.8885 3.37287Z"
                                                fill="#B5B5B5" />
                                        </svg></li>
                                    <li>
                                        <svg width="10" height="9" viewBox="0 0 10 9" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.8885 3.37287C9.83963 3.22825 9.70968 3.12286 9.55326 3.10103L6.90047 2.73031L5.71407 0.418007C5.64411 0.281671 5.49973 0.195343 5.34168 0.195343C5.1836 0.195343 5.03923 0.281671 4.9693 0.418007L3.78298 2.73028L1.1301 3.101C0.973684 3.12286 0.843704 3.22825 0.794869 3.37284C0.746033 3.51746 0.786757 3.67619 0.89996 3.7823L2.81958 5.58188L2.36625 8.12343C2.33953 8.27329 2.40357 8.42472 2.53144 8.51409C2.60378 8.56465 2.68947 8.59038 2.77557 8.59038C2.84165 8.59038 2.90801 8.57522 2.96878 8.5445L5.34165 7.34466L7.71451 8.5445C7.77563 8.57541 7.84258 8.59014 7.90888 8.59038C8.13797 8.59006 8.32357 8.41136 8.32357 8.19095C8.32357 8.16028 8.31997 8.13038 8.31316 8.1017L7.86375 5.58191L9.78338 3.7823C9.89661 3.67619 9.93733 3.51746 9.8885 3.37287Z"
                                                fill="#B5B5B5" />
                                        </svg>
                                    </li>
                                </ul>
                            </div>
                            <p class="info-item-desc">In addition to its outstanding gaming performance, the K70 RGB TKL features excellent build quality with a
                                hard plastic chassis, durable PBT keycaps, and ergonomic.
                            </p>
                            <div class="info-item-loc">
                                <p><span><img src=${mapIcon} /></span>Sentosa, Singapore</p>
                            </div>
                            <div class="info-item-footer">
                                <div class="info-item-price">
                                    <p>$100</p>
                                </div>
                                <div class="info-item-link">
                                    <a href="">
                                        <p>Go to website
                                            <span><img src=${arrowIcon} /></span>
                                        </p>
                                    </a>
                                </div>
                            </div>
                        </div>
                  `;

    // Calculate glb-model bounding box
    this.el.addEventListener("model-loaded", () => {
      this.meshBounds = new THREE.Box3().setFromObject(this.el.object3D);
      this.lengthMeshBounds = {
        x: Math.abs(this.meshBounds.max.x - this.meshBounds.min.x),
        y: Math.abs(this.meshBounds.max.y - this.meshBounds.min.y),
        z: Math.abs(this.meshBounds.max.z - this.meshBounds.min.z),
      };
    });

    this.el.addEventListener("componentchanged", (e) => {
      if (e.detail.name === "visible") {
        this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
        this.labelRenderer.domElement.style.position = "absolute";
        this.labelRenderer.domElement.style.top = "0px";
        this.labelRenderer.domElement.style.pointerEvents = "none";
        document.body.appendChild(this.labelRenderer.domElement);
        this.label = document.createElement("div");
        this.label.className = "info-container";
        this.label.id = "info";
        this.label.style.opacity = 0;
        
        // Add content html
        this.label.insertAdjacentHTML("beforeend", infoHtml);

        document.body.appendChild(this.label);
        
        this.labelObj = new THREE.CSS2DObject(this.label);

        // Move container based on model position and bounding box
        this.worldVec = new THREE.Vector3();
        this.worldPos = this.el.object3D.getWorldPosition(this.worldVec);
        this.labelObj.position.copy(
            new THREE.Vector3(
                this.worldPos.x,
                this.worldPos.y + this.lengthMeshBounds.y + this.data.offsetY,
                this.worldPos.z
            )
        );

        // Add to scene
        this.scene.add(this.labelObj);

        // Change opacity when close button is clicked
        const closeBtn = document.getElementById('info-close');
        closeBtn.addEventListener("click", ()=> {
            console.log("close button clicked")
            this.label.style.opacity = 0;
        })
      }
    });
  },
  tick() {
    if (this.label) {
      this.worldPos = this.el.object3D.getWorldPosition(this.worldVec);
      this.labelObj.position.copy(
        new THREE.Vector3(
            this.worldPos.x,
            this.worldPos.y + this.lengthMeshBounds.y + this.data.offsetY,
            this.worldPos.z 
          )
      );

      this.labelRenderer.render(this.scene, this.camera);
    }
  },
};
