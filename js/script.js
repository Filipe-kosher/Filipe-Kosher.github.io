    (function() {
      var canvas = document.getElementById('wavy-canvas');
      var ctx = canvas.getContext('2d');
      var w = window.innerWidth;
      var h = window.innerHeight;
      var nt = 0;
      var waveWidth = 20;
      var colors = ['#38bdf8', '#818cf8', '#c084fc', '#e879f9', '#22d3ee', '#FFD580', '#A2F2C9'];
      var animationId;

      function resizeCanvas() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        canvas.style.filter = 'blur(6px)';
      }

      function drawWave(n) {
        nt += 0.001;
        const wavePadding = 0.1;
        const startX = w * wavePadding;
        const endX = w * (1 - wavePadding);
    
        for (var i = 0; i < n; i++) {
          ctx.beginPath();
          ctx.lineWidth = waveWidth;
          ctx.strokeStyle = colors[i % colors.length];
      
          for (var x = startX; x < endX; x += 5) {
            var y = Math.sin(x * 0.01 + i * 0.5 + nt * 3) * 30 + 
                    Math.cos(x * 0.02 + i + nt * 2) * 20 + 
                    Math.sin(x * 0.005 + nt) * 50;
            ctx.lineTo(x, y + h * 0.5);
          }
      
          ctx.stroke();
          ctx.closePath();
        }
      }

      function render() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.globalAlpha = 0.5;
        ctx.fillRect(0, 0, w, h);
        drawWave(5);
        animationId = requestAnimationFrame(render);
      }

      window.addEventListener('resize', resizeCanvas);

      resizeCanvas();
      render();
    })();

    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      const canvas = document.getElementById('wavy-canvas');
      const scrollSection = document.querySelector('.scroll-section');
      const h2 = document.querySelector('.control-section h2');
      const earthTitle = document.querySelector('.earth-title');

      if (canvas) {
        const parallaxOffset = scrollPosition * 0.3;
        canvas.style.transform = `translateY(${parallaxOffset}px)`;
        
        const sectionHeight = scrollSection.offsetHeight;
        const opacity = 1 - Math.min(scrollPosition / (sectionHeight * 0.5), 0.8);
        canvas.style.opacity = opacity;
      }

      if (h2) {
        h2.style.transform = `translateY(${scrollPosition * 0.3}px)`;
      }

      if (earthTitle) {
        earthTitle.style.transform = `translateY(${scrollPosition * 0.3}px)`;
      }
    });

    function toggleMenu() {
      document.querySelector('nav').classList.toggle('active');
    }

    document.addEventListener('DOMContentLoaded', function() {
      const highlightWrapper = document.querySelector('.pointer-highlight-wrapper');
      if (!highlightWrapper) return;
      
      const highlightedText = highlightWrapper.querySelector('.highlighted-text');
      const highlightContainer = highlightWrapper.querySelector('.highlight-container');
      const rectangle = highlightWrapper.querySelector('.highlight-rectangle');
      const pointer = highlightWrapper.querySelector('.pointer-arrow');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startAnimation();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(highlightWrapper);
      
      function startAnimation() {
        const { width, height } = highlightedText.getBoundingClientRect();
        
        highlightContainer.classList.add('visible');
        
        rectangle.style.transition = 'width 1s ease-in-out, height 1s ease-in-out';
        rectangle.style.width = `${width}px`;
        rectangle.style.height = `${height}px`;
        
        setTimeout(() => {
          pointer.style.transition = 'opacity 0.5s ease-out, transform 1s ease-in-out';
          pointer.style.opacity = '1';
          pointer.style.left = `${width}px`;
          pointer.style.top = `${height}px`;
        }, 500);
        
        window.addEventListener('resize', function() {
          const { width: newWidth, height: newHeight } = highlightedText.getBoundingClientRect();
          rectangle.style.width = `${newWidth}px`;
          rectangle.style.height = `${newHeight}px`;
          pointer.style.left = `${newWidth}px`;
          pointer.style.top = `${newHeight}px`;
        });
      }
    });

    const img = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/06a094a4-7bd7-4bb9-b998-6c1e17f66c08/dbcju0k-b9b333e1-dd8d-4657-90db-7d3e7e179843.png';

    class App {
      constructor() {
        this.renderer = undefined;
        this.sphere = undefined;
        this.camera = undefined;
        this.scene = undefined;
        this.pointLight = undefined;
        this.container = document.getElementById("threejs-container");
        if (this.container) this.init();
      }

      init() {
        this.scene = new THREE.Scene();

        this.pointLight = new THREE.PointLight(0xffffff, 0);
        this.pointLight.position.set(-200, 50, 200);
        this.pointLight.castShadow = true;
        this.scene.add(this.pointLight);

        gsap.to(this.pointLight, { intensity: 1.2, delay: 1, duration: 1 });

        this.initCamera();
        this.initRenderer();
        this.createCanvas();
        this.render();
        this.initSphere();

        window.addEventListener("resize", () => this.onWindowResize(), false);
        this.cursorPosition();
      }

      cursorPosition() {
        window.addEventListener("mousemove", (event) => {
          let posX = event.clientX;
          this.pointLight.position.x = ((posX / window.innerWidth) * 2 - 1) * 200;
        });
      }

      createCanvas() {
        this.container.appendChild(this.renderer.domElement);
        this.renderer.domElement.style.pointerEvents = "none";
      }

      initRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
      }

      initCamera() {
        this.camera = new THREE.PerspectiveCamera(
          45,
          this.container.clientWidth / this.container.clientHeight,
          1,
          1000
        );
        this.camera.position.z = 50;
        this.camera.position.y = 0;
      }

      render() {
        this.renderer.render(this.scene, this.camera);

        if (this.sphere !== undefined) {
          this.sphere.rotation.y += 0.001;
        }

        requestAnimationFrame(() => this.render());
      }

      onWindowResize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
      }

      initSphere() {
        var texloader = new THREE.TextureLoader();
        texloader.load(img, (tex) => {
          let geometry = new THREE.SphereGeometry(10, 22, 22);
          let material = new THREE.MeshPhongMaterial({
            color: 0xB2B2B2,
            normalMap: tex,
            shininess: 0
          });
          this.sphere = new THREE.Mesh(geometry, material);
          this.sphere.rotation.z = 0.5;
          this.scene.add(this.sphere);
        });
      }
    }


    class EarthApp {
      constructor() {
        this.renderer = undefined;
        this.earth = undefined;
        this.camera = undefined;
        this.scene = undefined;
        this.pointLight = undefined;
        this.container = document.getElementById("earth-container");
        if (this.container) this.init();
      }

      init() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);


        const textureLoader = new THREE.TextureLoader();
        const earthMap = "https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg";
        
        const earthMaterial = new THREE.MeshStandardMaterial({
          map: textureLoader.load(earthMap),
          bumpMap: textureLoader.load(earthMap),
          bumpScale: 0.02,
          metalness: 0.3,
          roughness: 0.7,
          emissive: new THREE.Color(0x000022),
          emissiveIntensity: 0.1
        });

        this.earth = new THREE.Mesh(
          new THREE.SphereGeometry(1, 64, 64),
          earthMaterial
        );
        this.earth.position.set(0, 0, 0);
        this.scene.add(this.earth);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(ambientLight);

        this.pointLight = new THREE.PointLight(0xffffff, 1.2);
        this.pointLight.position.set(-5, 2, 0);
        this.scene.add(this.pointLight);

        this.initCamera();
        this.initRenderer();
        this.createCanvas();
        this.render();

        window.addEventListener("resize", () => this.onWindowResize(), false);
      }

      createCanvas() {
        this.container.appendChild(this.renderer.domElement);
        this.renderer.domElement.style.pointerEvents = "none";
      }

      initRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
      }

      initCamera() {
        this.camera = new THREE.PerspectiveCamera(
          45,
          this.container.clientWidth / this.container.clientHeight,
          0.1,
          1000
        );
        this.camera.position.z = 3;
      }

      render() {
        requestAnimationFrame(() => this.render());
        
        if (this.earth) {
          this.earth.rotation.y += 0.001;
        }
        
        this.renderer.render(this.scene, this.camera);
      }

      onWindowResize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
      }
    }

    window.addEventListener('load', () => {
      new App(); 
      new EarthApp(); 
    });

    document.querySelectorAll('.social-link').forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--mouse-x', `${x}px`);
        button.style.setProperty('--mouse-y', `${y}px`);
      });
    });
	
function hexToNormalizedRGB(hex) {
    hex = hex.replace("#", "");
    return [
        parseInt(hex.slice(0, 2), 16) / 255,
        parseInt(hex.slice(2, 4), 16) / 255,
        parseInt(hex.slice(4, 6), 16) / 255,
    ];
}

const footerVertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
        vPosition = position;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const footerFragmentShader = `
    varying vec2 vUv;
    varying vec3 vPosition;

    uniform float uTime;
    uniform vec3  uColor;
    uniform float uSpeed;
    uniform float uScale;
    uniform float uRotation;
    uniform float uNoiseIntensity;

    const float e = 2.71828182845904523536;

    float noise(vec2 texCoord) {
        float G = e;
        vec2  r = (G * sin(G * texCoord));
        return fract(r.x * r.y * (1.0 + texCoord.x));
    }

    vec2 rotateUvs(vec2 uv, float angle) {
        float c = cos(angle);
        float s = sin(angle);
        mat2  rot = mat2(c, -s, s, c);
        return rot * uv;
    }

    void main() {
        float rnd        = noise(gl_FragCoord.xy);
        vec2  uv         = rotateUvs(vUv * uScale, uRotation);
        vec2  tex        = uv * uScale;
        float tOffset    = uSpeed * uTime;

        tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

        float pattern = 0.6 +
                    0.4 * sin(5.0 * (tex.x + tex.y +
                                 cos(3.0 * tex.x + 5.0 * tex.y) +
                                 0.02 * tOffset) +
                         sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

        vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
        col.a = 1.0;
        gl_FragColor = col;
    }
`;

class FooterSilkEffect {
    constructor() {
        this.options = {
            speed: 4.5,
            scale: 1,
            color: "#2a2a29",
            noiseIntensity: 2.5,
            rotation: Math.PI / 4
        };

        this.init();
    }

    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: document.getElementById('footerSilkCanvas'),
            antialias: true,
            alpha: true
        });

        this.camera.position.z = 1;

        this.geometry = new THREE.PlaneGeometry(2, 2);
        this.uniforms = {
            uTime: { value: 0 },
            uSpeed: { value: this.options.speed },
            uScale: { value: this.options.scale },
            uNoiseIntensity: { value: this.options.noiseIntensity },
            uColor: { value: new THREE.Color(...hexToNormalizedRGB(this.options.color)) },
            uRotation: { value: this.options.rotation }
        };

        this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: footerVertexShader,
            fragmentShader: footerFragmentShader,
            transparent: true
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);

        window.addEventListener('resize', this.onResize.bind(this));
        this.onResize();

        this.animate();
    }

    onResize() {
        const footerElement = document.querySelector('.footer');
        const { width, height } = footerElement.getBoundingClientRect();
        this.renderer.setSize(width, height);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.uniforms.uTime.value += 0.01;
        this.renderer.render(this.scene, this.camera);
    }
}

window.addEventListener('load', () => {
    new FooterSilkEffect();
});

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId) || document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        document.querySelector('nav').classList.remove('active');
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section, .scroll-section:not(.herozada)');

  sections.forEach(section => {
    section.classList.add('scroll-reveal-pre');
  });

  const style = document.createElement('style');
  style.innerHTML = `
    .scroll-reveal-pre {
      opacity: 0;
      transform: translateY(60px);
      transition: opacity 0.8s cubic-bezier(.35,.97,.45,1), transform 0.8s cubic-bezier(.35,.97,.45,1);
      will-change: opacity, transform;
    }
    .scroll-reveal {
      opacity: 1 !important;
      transform: translateY(0) !important;
      pointer-events: auto;
    }
  `;
  document.head.appendChild(style);

  if ('IntersectionObserver' in window) {
    let observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-reveal');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    sections.forEach(section => observer.observe(section));
  } else {
 
    function revealSectionsOnScroll() {
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          section.classList.add('scroll-reveal');
        }
      });
    }
    window.addEventListener('scroll', revealSectionsOnScroll);
    revealSectionsOnScroll();
  }
});