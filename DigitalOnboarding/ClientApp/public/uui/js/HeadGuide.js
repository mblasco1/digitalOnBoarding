class HeadGuide {
    constructor(containerId, parentId, canvasId) {
        this.containerId = '#' + containerId;
        this.parentId = '#' + parentId;
        this.canvasId = '#' + canvasId;

        this.startTime = undefined;
        this.resetHead = false;
        this.maxVertical = 0.25;
        this.maxHorizontal = 0.25;
        this.currentTag = '';
        this.parentTag = '';

        //renderer
        this.renderer = new THREE.WebGLRenderer({ alpha: true });

        let container = document.getElementById(this.containerId.substring(1));
        document.body.appendChild(container);

        let width = $(this.containerId).width();
        let height = $(this.containerId).height();
        let uuihead = $(this.containerId);
        $(this.parentId).append(uuihead);

        // camera
        this.camera = new THREE.PerspectiveCamera(20, width / height, 1, 1000);
        this.camera.position.set(0, 0, 5);

        // scene
        this.scene = new THREE.Scene();
        let ambientLight = new THREE.AmbientLight(0x4953FF, 0.4);
        this.scene.add(ambientLight);
        let pointLight = new THREE.PointLight(0x3067FF, 0.8);
        this.camera.add(pointLight);
        this.scene.add(this.camera);

        // texture
        let manager = new THREE.LoadingManager();
        manager.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
        };

        // model
        let onProgress = function (xhr) {
            if (xhr.lengthComputable) {
                let percentComplete = xhr.loaded / xhr.total * 100;
                console.log(Math.round(percentComplete, 2) + '% downloaded');
            }
        };
        let onError = function (xhr) { };
        let loader = new THREE.OBJLoader(manager);
        let material = new THREE.MeshLambertMaterial({ transparent: false, opacity: 0.6 });

        let thisScene = this.scene;
        loader.load('/uui/model/head.obj', function (head) {
            head.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    //   child.material = material;
                }
            });
            head.name = 'BioIDHead';
            head.position.y = 0;
            thisScene.add(head);
        }, onProgress, onError);

        this.renderer.setClearColor(0x000000, 0); // the default
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(width, height);

        container.appendChild(this.renderer.domElement);
        window.addEventListener('resize', this.onHeadResize, false);

    }

    onHeadResize() {
        let width = 0;
        let height = 0;

        let canvasWidth = $(this.canvasId).width();
        let canvasHeight = $(this.canvasId).height();

        if (canvasWidth > canvasHeight) {
            height = canvasHeight - canvasHeight / 3;
            width = height * 3 / 4;
        }
        else {
            width = canvasWidth - canvasWidth / 3;
            height = width * 4 / 3;
        }

        // Avoid floating for canvas size (performance issue)
        width = Math.floor(width);
        height = Math.floor(height);

        $(this.containerId).css({ 'margin-top': Math.floor(-height / 2), 'margin-left': Math.floor(-width / 2) });
        $(this.containerId).attr('width', width);
        $(this.containerId).attr('height', height);

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        this.renderer.render(this.scene, this.camera);
    }

    resetHeadDisplay() {
        this.currentTag = '';
        this.parentTag = '';
        this.resetHead = true;
    }

    setCurrentTag(tag) {
        if (this.currentTag !== '') {
            this.parentTag = this.currentTag;
        }

        this.currentTag = tag;
        this.startTime = new Date().getTime();

        this.animateHead();
        console.log('DisplayTag: ' + tag);
    }

    animateHead() {
        // animation time
        let speed = 0.000005;
        let endTime = new Date().getTime();
        let deltaTime = endTime - this.startTime;
        let delta = deltaTime * speed;

        let head = this.scene.getObjectByName('BioIDHead');
        let doAnimation = false;

        if (head) {
            if (this.resetHead) {
                // reset head rotation to center
                head.rotation.x = 0;
                head.rotation.y = 0;
                this.resetHead = false;
                doAnimation = true;
                this.showHead();
            }
            else {
                if (this.currentTag === 'any') {
                    if (task === 'enrollment') {
                        // get predefined direction for better enrollment
                        let recording = bwsCapture.getUploaded() + bwsCapture.getUploading() - 1;
                        this.currentTag = enrollmentTags[recording];
                    }
                    else {
                        this.currentTag = predefinedTags[Math.floor(Math.random() * Math.floor(4))];
                    }
                }

                if (this.currentTag === 'down') {
                    head.rotation.y = 0;
                    if (this.parentTag === 'up') {
                        if (head.rotation.x <= 0) {
                            head.rotation.x += delta;
                            doAnimation = true;
                        }
                    }
                    else {
                        if (head.rotation.x >= 0 && head.rotation.x < this.maxVertical) {
                            head.rotation.x += delta;
                            doAnimation = true;
                        }
                    }
                }
                else if (this.currentTag === 'up') {
                    head.rotation.y = 0;
                    if (this.parentTag === 'down') {
                        if (head.rotation.x >= 0) {
                            head.rotation.x -= delta;
                            doAnimation = true;
                        }
                    }
                    else {
                        if (head.rotation.x >= -this.maxVertical && head.rotation.x <= 0) {
                            head.rotation.x -= delta;
                            doAnimation = true;
                        }
                    }
                }
                else if (this.currentTag === 'left') {
                    head.rotation.x = 0;
                    if (this.parentTag === 'right') {
                        if (head.rotation.y >= 0) {
                            head.rotation.y -= delta;
                            doAnimation = true;
                        }
                    }
                    else {
                        if (head.rotation.y >= -this.maxHorizontal && head.rotation.y <= 0) {
                            head.rotation.y -= delta;
                            doAnimation = true;
                        }
                    }
                }
                else if (this.currentTag === 'right') {
                    head.rotation.x = 0;
                    if (this.parentTag === 'left') {
                        if (head.rotation.y <= 0) {
                            head.rotation.y += delta;
                            doAnimation = true;
                        }
                    }
                    else {
                        if (head.rotation.y >= 0 && head.rotation.y <= this.maxHorizontal) {
                            head.rotation.y += delta;
                            doAnimation = true;
                        }
                    }
                }
            }

            if (doAnimation) {
                requestAnimationFrame(() => { this.animateHead() });
            }
            this.renderer.render(this.scene, this.camera);
        }
    }

    showHead() {
        this.onHeadResize();
        $(this.containerId).show();
    }

    hideHead() {
        $(this.containerId).hide();
    }
}

window.HeadGuide = HeadGuide;