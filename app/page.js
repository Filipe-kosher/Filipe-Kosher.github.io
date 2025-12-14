'use client'
import Script from 'next/script'
import { useState } from 'react'
import Project from '../components/gallery/Project'
import Modal from '../components/gallery/Modal'
import TextParallax from '../components/text-parallax/TextParallax'

export default function Page() {
  const projectsData = [
    { 
      id: 1,
      src: 'https://raw.githubusercontent.com/Filipe-kosher/site-de-bio/main/screenshot.png',
      title: 'Site Bio',
      color: '#0a0a12'
    },
    {
      id: 3,
      src: 'https://raw.githubusercontent.com/Filipe-kosher/vicente-portfolio/main/screenshot.png',
      title: 'Portfólio Kawe Vincente',
      color: '#0a0a12'
    },
    {
      id: 5,
      src: 'https://raw.githubusercontent.com/Filipe-kosher/Hybrix-Site/main/screenshot.png',
      title: 'Hybrix Website',
      color: '#0a0a12'
    },
    {
      id: 7,
      src: 'https://raw.githubusercontent.com/Filipe-kosher/zsamsite/main/screenshot.png',
      title: 'Samzinho',
      color: '#0a0a12',
      url: 'https://samzinho.fun'
    },
    {
      id: 8,
      src: 'https://raw.githubusercontent.com/Filipe-kosher/yatzar-agency/main/image.png',
      title: 'Yatzar Agency',
      color: '#0a0a12',
      url: 'https://github.com/Filipe-kosher/yatzar-agency/tree/main'
    },
    {
      id: 9,
      src: 'https://raw.githubusercontent.com/Filipe-kosher/nova/main/screenshot.png',
      title: 'Nova e-commerce',
      color: '#0a0a12',
      url: 'https://novaeco.netlify.app'
    }
  ]
  const [modal, setModal] = useState({ active: false, index: 0 })
  return (
    <>
      <div className="menu-btn-container">
        <button type="button" className="menu-btn" aria-label="Abrir menu" aria-controls="primary-navigation" aria-expanded="false">
          <div className="hamburger-icon">
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </div>
        </button>
      </div>

      <nav className="nav hidden" id="primary-navigation" role="navigation" aria-hidden="true">
        <canvas></canvas>
        <ol className="nav-items">
          <li className="nav-item"><a href="#home" data-i18n="nav.home">Home</a></li>
          <li className="nav-item"><a href="#work" data-i18n="nav.work">Meu trabalho</a></li>
          <li className="nav-item"><a href="#timeline" data-i18n="nav.timeline">Timeline</a></li>
          <li className="nav-item"><a href="#skills" data-i18n="nav.skills">Skills</a></li>
          <li className="nav-item"><a href="#contact" data-focused="last-focused" data-i18n="nav.contact">Contato</a></li>
        </ol>
      </nav>

      <div className="language-selector" aria-label="Language selector">
        <button type="button" id="btn-lang-pt" aria-pressed="true" className="lang-btn" title="Português">
          <span className="flag-icon">🇧🇷</span>
        </button>
        <button type="button" id="btn-lang-en" aria-pressed="false" className="lang-btn" title="English">
          <span className="flag-icon">🇺🇸</span>
        </button>
      </div>

      <div className="hero" id="home">
        <h1 className="hero-title">Filipe.</h1>
        <canvas id="silkCanvas"></canvas>
        <div className="gradient-separator"></div>
      </div>

      <section className="second-section" id="work">
        <div className="content">
          <h2><span data-i18n="work.title_prefix">Criando projetos</span> <span className="pointer-highlight-container">
            <span className="highlight-text" data-i18n="work.highlight">envolventes</span>
            <span className="highlight-overlay">
              <span className="highlight-rectangle"></span>
              <svg className="pointer-arrow" viewBox="0 0 16 16">
                <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
              </svg>
            </span>
          </span><span>.</span></h2>
          <div className="projects-wrapper">
            <Modal modal={modal} projects={projectsData} />
            <div className="card">
              {projectsData.map((p, i) => (
                <Project key={p.id} index={i} title={p.title} setModal={setModal} url={p.url} src={p.src} />
              ))}
            </div>
          </div>
          <div className="more-projects-btn-container">
            <button className="more-projects-btn" onClick={() => window.open('https://github.com/Filipe-Kosher', '_blank')}>
              <i className="fas fa-code"></i>
              <span data-i18n="buttons.more_projects">Ver mais projetos</span>
              <i className="fas fa-external-link-alt"></i>
            </button>
          </div>
          <TextParallax images={["/images/1.jpg", "/images/2.jpg"]} text="Desenvolvedor Frontend" />
        </div>
      </section>

      

      <section className="timeline-section" id="timeline">
        <div className="timeline-container">
          <h2 className="timeline-title" data-i18n="timeline.title">Minha Jornada</h2>
          <div className="timeline">
            <div className="timeline-item" data-year="2022">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date" data-i18n="timeline.nov_2022">Novembro 2022</div>
                <h3 data-i18n="timeline.self_study">Estudos Autodidatas</h3>
                <p data-i18n="timeline.self_study_desc">Início da jornada na programação</p>
              </div>
            </div>
            <div className="timeline-item" data-year="2023-2025">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">2023 - 2025</div>
                <h3>aMathyzin Group</h3>
                <p data-i18n="timeline.amathyzin_desc">Dev Backend e Gestor de projetos</p>
              </div>
            </div>
            <div className="timeline-item" data-year="2023-2024">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">2023 - 2024</div>
                <h3>Lion fé</h3>
                <p data-i18n="timeline.backend">Dev Backend</p>
              </div>
            </div>
            <div className="timeline-item" data-year="2024">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">2024</div>
                <h3>Equipe iGust</h3>
                <p data-i18n="timeline.fullstack_manager">Dev Frontend, Gestor</p>
              </div>
            </div>
            <div className="timeline-item" data-year="2024">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">2024</div>
                <h3>Max Odontologia</h3>
                <p data-i18n="timeline.fullstack">Dev Frontend</p>
              </div>
            </div>
            <div className="timeline-item" data-year="2025">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">2025</div>
                <h3>Yatzar Studio</h3>
                <p data-i18n="timeline.fullstack_manager">Dev Frontend, Gestor</p>
              </div>
            </div>
            <div className="timeline-item" data-year="2025-atual">
              <div className="timeline-marker current"></div>
              <div className="timeline-content">
                <div className="timeline-date" data-i18n="timeline.2025_current">2025 - Atual</div>
                <h3>Calisto Networking</h3>
                <p data-i18n="timeline.fullstack">Dev Frontend</p>
              </div>
            </div>
            <div className="timeline-item" data-year="2025-atual">
              <div className="timeline-marker current"></div>
              <div className="timeline-content">
                <div className="timeline-date" data-i18n="timeline.2025_current">2025 - Atual</div>
                <h3>Mundo do Samzinho</h3>
                <p data-i18n="timeline.fullstack">Dev Frontend</p>
              </div>
            </div>
            <div className="timeline-item" data-year="2025">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">2025</div>
                <h3>Arcade Lunar</h3>
                <p data-i18n="timeline.backend">Dev Backend</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="companies-section">
        <div className="companies-logos">
          <img src="/icon/1.png" alt="Empresa 1" className="company-logo"/>
          <img src="/icon/2.png" alt="Empresa 3" className="company-logo"/>
          <img src="/icon/3.png" alt="Empresa 3" className="company-logo"/>
          <img src="/icon/4.png" alt="Empresa 4" className="company-logo"/>
          <img src="/icon/6.png" alt="Empresa 6" className="company-logo"/>
        </div>
      </section>

      <section className="skills-section" id="skills">
        <div className="content">
          <h2 className="skills-title" data-i18n="skills.title">Stacks</h2>
          <div className="scroll" style={{ '--t': '35s' }}>
            <div>
              <span>HTML</span>
              <span>CSS</span>
              <span>Javascript</span>
              <span>Vite JS</span>
              <span>Node JS</span>
              <span>Tauri JS</span>
              <span>Neu JS</span>
              <span>SQL</span>
              <span>MongoDB</span>
              <span>Batch</span>
              <span>Python 3</span>
              <span>Pyside6</span>
              <span>Jquery</span>
              <span>Discord.js</span>
              <span>Discord.py</span>
              <span>Threejs</span>
              <span>GSAP</span>
              <span>Ogl</span>
              <span>VBScript</span>
            </div>
            <div>
              <span>HTML</span>
              <span>CSS</span>
              <span>Javascript</span>
              <span>Vite JS</span>
              <span>Node JS</span>
              <span>Tauri JS</span>
              <span>Neu JS</span>
              <span>SQL</span>
              <span>MongoDB</span>
              <span>Batch</span>
              <span>Python 3</span>
              <span>Pyside6</span>
              <span>Jquery</span>
              <span>Discord.js</span>
              <span>Discord.py</span>
              <span>Threejs</span>
              <span>GSAP</span>
              <span>Ogl</span>
              <span>VBScript</span>
            </div>
          </div>
          <div className="scroll" style={{ '--t': '18s' }}>
            <div>
              <span>UI/UX</span>
              <span>UI Expert</span>
              <span>Bootstrap</span>
              <span>Material UI</span>
              <span>Tailwind</span>
              <span>SCSS</span>
              <span>NPM</span>
              <span>Rest API</span>
              <span>SEO</span>
            </div>
            <div>
              <span>UI/UX</span>
              <span>UI Expert</span>
              <span>Bootstrap</span>
              <span>Material UI</span>
              <span>Tailwind</span>
              <span>SCSS</span>
              <span>NPM</span>
              <span>Rest API</span>
              <span>SEO</span>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div id="contact" className="contact-card">
          <h2 data-i18n="contact.title">Fale Comigo</h2>
          <p data-i18n="contact.subtitle">Quer conversar sobre projetos, ideias ou colaborações? Estou à disposição!</p>
          <a href="mailto:filipe@filipedev.pro">
            <button className="cta-button" type="button">
              <i className="fas fa-envelope"></i>
              <span data-i18n="buttons.contact">Entrar em Contato</span>
            </button>
          </a>
          <div className="social-links">
            <a href="https://discord.com/users/1193428032250191912" className="social-btn discord" target="_blank" rel="noopener">
              <i className="fab fa-discord"></i>
            </a>
            <a href="https://api.whatsapp.com/send?phone=5562985070491&text=Ol%C3%A1%20Filipe!%20estou%20interessado%20em%20fazer%20um%20projeto%20com%20voc%C3%AA." className="social-btn whatsapp" target="_blank" rel="noopener">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="https://github.com/Filipe-Kosher" className="social-btn github" target="_blank" rel="noopener">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h3>Filipe.</h3>
            <p data-i18n="footer.role">Desenvolvedor Frontend & UI/UX Designer</p>
          </div>
          <div className="footer-nav">
            <a href="#home" data-i18n="nav.home">Home</a>
            <a href="#work" data-i18n="footer.projects">Projetos</a>
            <a href="#timeline" data-i18n="nav.timeline">Timeline</a>
            <a href="#skills" data-i18n="nav.skills">Skills</a>
            <a href="#contact" data-i18n="nav.contact">Contato</a>
          </div>
          <div className="footer-social">
            <a href="https://github.com/Filipe-Kosher" target="_blank" rel="noopener">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://discord.com/users/1193428032250191912" target="_blank" rel="noopener">
              <i className="fab fa-discord"></i>
            </a>
            <a href="https://api.whatsapp.com/send?phone=5562985070491" target="_blank" rel="noopener">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Filipe. <span data-i18n="footer.made_with">Feito com</span> <i className="fas fa-heart"></i> <span data-i18n="footer.in_brazil">no Brasil</span></p>
          </div>
        </div>
      </footer>

      <Script src="https://unpkg.com/lenis@1.0.31/bundled/lenis.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="afterInteractive" />
      <Script src="https://code.jquery.com/jquery-3.6.0.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" strategy="afterInteractive" />
      <Script id="portfolio-init" strategy="afterInteractive">
        {`
        const nav = document.querySelector('.nav');
        const navMenu = document.querySelector('.nav-items');
        const btnToggleNav = document.querySelector('.menu-btn');
        let navTl;
        const i18n = {
          pt: {
            'meta.title': 'Portfólio Filipe - Desenvolvedor Frontend & UI/UX Designer',
            'meta.description': 'Portfólio de Filipe: desenvolvedor web, UI/UX, especialista em projetos envolventes, entregas rápidas, segurança e suporte. Veja meus projetos e habilidades!',
            'meta.og_title': 'Portfólio Filipe',
            'meta.og_description': 'Portfólio de Filipe: desenvolvedor web, UI/UX, especialista em projetos envolventes, entregas rápidas, segurança e suporte.',
            'nav.home': 'Home',
            'nav.work': 'Meu trabalho',
            'nav.timeline': 'Timeline',
            'nav.skills': 'Skills',
            'nav.contact': 'Contato',
            'work.title_prefix': 'Criando projetos',
            'work.highlight': 'envolventes',
            'buttons.more_projects': 'Ver mais projetos',
            'timeline.title': 'Minha Jornada',
            'timeline.nov_2022': 'Novembro 2022',
            'timeline.self_study': 'Estudos Autodidatas',
            'timeline.self_study_desc': 'Início da jornada na programação',
            'timeline.amathyzin_desc': 'Dev Backend e Gestor de projetos',
            'timeline.backend': 'Dev Backend',
            'timeline.fullstack_manager': 'Dev Frontend, Gestor',
            'timeline.fullstack': 'Dev Frontend',
            'timeline.2025_current': '2025 - Atual',
            'skills.title': 'Stacks',
            'contact.title': 'Fale Comigo',
            'contact.subtitle': 'Quer conversar sobre projetos, ideias ou colaborações? Estou à disposição!',
            'buttons.contact': 'Entrar em Contato',
            'footer.role': 'Desenvolvedor Frontend & UI/UX Designer',
            'footer.projects': 'Projetos',
            'footer.made_with': 'Feito com',
            'footer.in_brazil': 'no Brasil'
          },
          en: {
            'meta.title': "Filipe's Portfolio - Frontend Developer & UI/UX Designer",
            'meta.description': "Filipe's portfolio: web developer, UI/UX, specialist in engaging projects, fast delivery, security and support. Check my projects and skills!",
            'meta.og_title': "Filipe's Portfolio",
            'meta.og_description': "Filipe's portfolio: web developer, UI/UX, specialist in engaging projects, fast delivery, security and support.",
            'nav.home': 'Home',
            'nav.work': 'My Work',
            'nav.timeline': 'Timeline',
            'nav.skills': 'Skills',
            'nav.contact': 'Contact',
            'work.title_prefix': 'Crafting',
            'work.highlight': 'engaging projects',
            'buttons.more_projects': 'See more projects',
            'timeline.title': 'My Journey',
            'timeline.nov_2022': 'November 2022',
            'timeline.self_study': 'Self-taught Studies',
            'timeline.self_study_desc': 'Beginning of the programming journey',
            'timeline.amathyzin_desc': 'Backend Dev and Project Manager',
            'timeline.backend': 'Backend Dev',
            'timeline.fullstack_manager': 'Frontend Dev, Manager',
            'timeline.fullstack': 'Frontend Dev',
            'timeline.2025_current': '2025 - Present',
            'skills.title': 'Stacks',
            'contact.title': 'Contact Me',
            'contact.subtitle': "Want to talk about projects, ideas or collaborations? I'm available!",
            'buttons.contact': 'Get in touch',
            'footer.role': 'Frontend Developer & UI/UX Designer',
            'footer.projects': 'Projects',
            'footer.made_with': 'Made with',
            'footer.in_brazil': 'in Brazil'
          }
        };
        function applyTranslations(lang) {
          const dict = i18n[lang] || i18n.pt;
          document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) el.textContent = dict[key];
          });
          document.querySelectorAll('[data-i18n-meta]').forEach(el => {
            const key = el.getAttribute('data-i18n-meta');
            if (dict[key]) el.setAttribute('content', dict[key]);
          });
          document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
          const btnPT = document.getElementById('btn-lang-pt');
          const btnEN = document.getElementById('btn-lang-en');
          if (btnPT && btnEN) {
            const isEN = lang === 'en';
            btnPT.setAttribute('aria-pressed', String(!isEN));
            btnEN.setAttribute('aria-pressed', String(isEN));
          }
          const titleKey = 'meta.title';
          if (dict[titleKey]) document.title = dict[titleKey];
        }
        function setLanguage(lang) {
          const target = (lang === 'en') ? 'en' : 'pt';
          localStorage.setItem('siteLang', target);
          applyTranslations(target);
        }
        const btnLangPT = document.getElementById('btn-lang-pt');
        const btnLangEN = document.getElementById('btn-lang-en');
        if (btnLangPT) btnLangPT.addEventListener('click', () => setLanguage('pt'));
        if (btnLangEN) btnLangEN.addEventListener('click', () => setLanguage('en'));
        const savedLang = localStorage.getItem('siteLang');
        const browserLang = (navigator.language || navigator.userLanguage || 'pt').toLowerCase().startsWith('en') ? 'en' : 'pt';
        applyTranslations(savedLang || browserLang);
        const toggleNav = () => {
          nav.classList.toggle('hidden');
          const expanded = btnToggleNav.classList.toggle('active');
          document.body.classList.toggle('lock-screen');
          btnToggleNav.setAttribute('aria-expanded', String(expanded));
          nav.setAttribute('aria-hidden', String(!expanded));
          const langSelector = document.querySelector('.language-selector');
          const langButtons = document.querySelectorAll('.lang-btn');
          if (langSelector) {
            if (expanded) {
              langSelector.classList.add('visible');
              setTimeout(() => {
                langButtons.forEach(btn => {
                  btn.style.opacity = '1';
                  btn.style.visibility = 'visible';
                });
              }, 600);
            } else {
              langSelector.classList.remove('visible');
            }
          }
          if (window.gsap && navTl) {
            if (expanded) {
              navTl.restart();
            } else {
              navTl.timeScale(1.4).reverse();
            }
          }
        };
        btnToggleNav.addEventListener('click', toggleNav);
        navMenu.addEventListener('click', (e) => {
          if (e.target.localName === 'a') toggleNav();
        });
        document.body.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && !nav.classList.contains('hidden')) toggleNav();
        });
        const lastFocusedEl = document.querySelector('a[data-focused="last-focused"]');
        document.body.addEventListener('keydown', (e) => {
          if (e.key === 'Tab' && document.activeElement === lastFocusedEl) {
            e.preventDefault();
            btnToggleNav.focus();
          }
        });
        const canvas = nav.querySelector('canvas');
        if (canvas) {
          const ctx = canvas.getContext('2d');
          let animId;
          function resizeCanvas() {
            canvas.width = nav.clientWidth;
            canvas.height = nav.clientHeight;
          }
          resizeCanvas();
          window.addEventListener('resize', resizeCanvas);
          function generateNoise() {
            const imageData = ctx.createImageData(canvas.width, canvas.height);
            const buffer = new Uint32Array(imageData.data.buffer);
            const len = buffer.length;
            for (let i = 0; i < len; i++) {
              const shade = Math.random() * 255 | 0;
              buffer[i] = (255 << 24) | (shade << 16) | (shade << 8) | shade;
            }
            ctx.putImageData(imageData, 0, 0);
          }
          function animateNoise() {
            if (!nav.classList.contains('hidden')) {
              generateNoise();
            }
            animId = requestAnimationFrame(animateNoise);
          }
          animateNoise();
          const obs = new MutationObserver(() => {
            if (!nav.classList.contains('hidden')) {
              generateNoise();
            }
          });
          obs.observe(nav, { attributes: true, attributeFilter: ['class'] });
        }
        function hexToNormalizedRGB(hex) {
          hex = hex.replace('#', '');
          return [
            parseInt(hex.slice(0, 2), 16) / 255,
            parseInt(hex.slice(2, 4), 16) / 255,
            parseInt(hex.slice(4, 6), 16) / 255,
          ];
        }
        const vertexShader = \`varying vec2 vUv; varying vec3 vPosition; void main(){ vPosition=position; vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }\`;
        const fragmentShader = \`varying vec2 vUv; varying vec3 vPosition; uniform float uTime; uniform vec3 uColor; uniform float uSpeed; uniform float uScale; uniform float uRotation; uniform float uNoiseIntensity; const float e=2.71828182845904523536; float noise(vec2 texCoord){ float G=e; vec2 r=(G*sin(G*texCoord)); return fract(r.x*r.y*(1.0+texCoord.x)); } vec2 rotateUvs(vec2 uv,float angle){ float c=cos(angle); float s=sin(angle); mat2 rot=mat2(c,-s,s,c); return rot*uv; } void main(){ float rnd=noise(gl_FragCoord.xy); vec2 uv=rotateUvs(vUv*uScale,uRotation); vec2 tex=uv*uScale; float tOffset=uSpeed*uTime; tex.y+=0.03*sin(8.0*tex.x - tOffset); float pattern=0.6 + 0.4*sin(5.0*(tex.x+tex.y+cos(3.0*tex.x+5.0*tex.y)+0.02*tOffset) + sin(20.0*(tex.x+tex.y - 0.1*tOffset))); vec4 col=vec4(uColor,1.0)*vec4(pattern) - rnd/15.0*uNoiseIntensity; col.a=1.0; gl_FragColor=col; }\`;
        class SilkEffect {
          constructor(options={}) {
            this.options = { speed: options.speed || 2, scale: options.scale || 1, color: options.color || '#261bf5', noiseIntensity: options.noiseIntensity || 0.5, rotation: options.rotation || 0 };
            this.init();
          }
          init(){
            this.scene = new THREE.Scene();
            this.camera = new THREE.OrthographicCamera(-1,1,1,-1,0.1,10);
            this.renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('silkCanvas'), antialias:true });
            this.camera.position.z = 1;
            this.geometry = new THREE.PlaneGeometry(2,2);
            this.uniforms = { uTime:{value:0}, uSpeed:{value:this.options.speed}, uScale:{value:this.options.scale}, uNoiseIntensity:{value:this.options.noiseIntensity}, uColor:{value:new THREE.Color(...hexToNormalizedRGB(this.options.color))}, uRotation:{value:this.options.rotation} };
            this.material = new THREE.ShaderMaterial({ uniforms:this.uniforms, vertexShader:vertexShader, fragmentShader:fragmentShader });
            this.mesh = new THREE.Mesh(this.geometry, this.material);
            this.scene.add(this.mesh);
            window.addEventListener('resize', ()=>this.onResize());
            this.onResize();
            this.animate();
          }
          onResize(){ this.renderer.setSize(window.innerWidth, window.innerHeight); }
          animate(){ requestAnimationFrame(()=>this.animate()); this.uniforms.uTime.value += 0.01; this.renderer.render(this.scene, this.camera); }
        }
        function initSilk(){ new SilkEffect({ speed:1, scale:1, color:'#095B8B', noiseIntensity:1.5, rotation:5 }); }
        function ensureThree(){
          if (window.THREE) { initSilk(); return; }
          const scriptEl = document.querySelector('script[src*="three.min.js"]');
          if (scriptEl) { scriptEl.addEventListener('load', initSilk); return; }
          const check = setInterval(() => { if (window.THREE) { clearInterval(check); initSilk(); } }, 100);
        }
        document.addEventListener('DOMContentLoaded', function(){
          const ctaButton = document.querySelector('.cta-button');
          if (ctaButton) {
            ctaButton.addEventListener('click', () => {
              const lang = (localStorage.getItem('siteLang')||'pt');
              const loading = (lang==='en') ? 'Opening email...' : 'Abrindo contato...';
              const ready = (lang==='en') ? 'Done!' : 'Pronto!';
              ctaButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + loading;
              setTimeout(() => {
                setTimeout(() => { ctaButton.innerHTML = '<i class="fas fa-check"></i> ' + ready; }, 2000);
                ctaButton.style.background = 'linear-gradient(135deg, #4CAF50, #2E7D32)';
                window.location.href = 'mailto:filipe@filipedev.pro';
              }, 1500);
            });
          }
        });
        window.addEventListener('load', initMainAnimations);
        function initMainAnimations(){
          if (window.gsap) {
            gsap.registerPlugin(ScrollTrigger);
            gsap.defaults({ ease: 'power3.out' });
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle && heroTitle.textContent) {
              const raw = heroTitle.textContent;
              heroTitle.textContent = '';
              const frag = document.createDocumentFragment();
              [...raw].forEach((ch) => { const span = document.createElement('span'); span.className = 'char'; span.innerHTML = ch === ' ' ? '&nbsp;' : ch; frag.appendChild(span); });
              heroTitle.appendChild(frag);
              const chars = heroTitle.querySelectorAll('.char');
              gsap.set(heroTitle, { perspective: 600 });
              gsap.from(chars, { y: 42, opacity: 0, rotateX: 40, rotateZ: 0.0001, filter: 'blur(8px)', duration: 1.25, ease: 'expo.out', stagger: { each: 0.06, from: 'center' } });
            }
            gsap.from('.menu-btn', { y: -16, autoAlpha: 0, duration: 1.0, ease: 'power3.out', delay: 0.15 });
            navTl = gsap.timeline({ paused: true });
            navTl.from('.nav-items .nav-item', { x: -28, autoAlpha: 0, stagger: 0.06, duration: 0.6, ease: 'power4.out' }, 0);
            navTl.from('.language-selector .lang-btn', { y: 20, autoAlpha: 0, stagger: 0.1, duration: 0.5, ease: 'power3.out' }, 0.3);
            gsap.from('.second-section .content', { scrollTrigger: { trigger: '.second-section', start: 'top 70%' }, y: 36, autoAlpha: 0, duration: 1.1, ease: 'power4.out' });
            gsap.from('.skills-section .content', { scrollTrigger: { trigger: '.skills-section', start: 'top 75%' }, y: 36, autoAlpha: 0, duration: 1.1, ease: 'power4.out' });
            gsap.from('.companies-section .company-logo', { scrollTrigger: { trigger: '.companies-section', start: 'top 80%' }, autoAlpha: 0, y: 20, stagger: 0.06, duration: 0.7, ease: 'power3.out' });

            const moreBtn = document.querySelector('.more-projects-btn');
            if (moreBtn) {
              const getBounds = () => moreBtn.getBoundingClientRect();
              const onMove = (e) => {
                const b = getBounds();
                const x = e.clientX - (b.left + b.width / 2);
                const y = e.clientY - (b.top + b.height / 2);
                gsap.to(moreBtn, { x: x * 0.2, y: y * 0.2, scale: 1.03, duration: 0.3, ease: 'power3.out', overwrite: 'auto' });
              };
              const onLeave = () => {
                gsap.to(moreBtn, { x: 0, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' });
              };
              moreBtn.addEventListener('mousemove', onMove);
              moreBtn.addEventListener('mouseleave', onLeave);
            }
          }
          ensureThree();
          const container = document.querySelector('.pointer-highlight-container');
          if (!container) return;
          const text = container.querySelector('.highlight-text');
          const rectangle = container.querySelector('.highlight-rectangle');
          const pointer = container.querySelector('.pointer-arrow');
          function updateDimensions(){ const { width, height } = text.getBoundingClientRect(); rectangle.style.width = width + 'px'; rectangle.style.height = height + 'px'; pointer.style.left = width + 4 + 'px'; pointer.style.top = height + 4 + 'px'; }
          rectangle.style.width = '0'; rectangle.style.height = '0'; pointer.style.opacity = 0;
          function activateHighlight(){ updateDimensions(); pointer.style.opacity = 1; }
          function onScroll(){ const section = document.querySelector('.second-section'); const rect = section.getBoundingClientRect(); if (rect.top < window.innerHeight * 0.7 && rect.bottom > 0) { activateHighlight(); window.removeEventListener('scroll', onScroll); } }
          window.addEventListener('scroll', onScroll);
          window.addEventListener('resize', updateDimensions);
          onScroll();
          const projects = [
            { id:1, src:'https://raw.githubusercontent.com/Filipe-kosher/site-de-bio/main/screenshot.png', title:'Site Bio', description:'Site one-page para bio de redes sociais', tags:['HTML','CSS','JS'], github:'https://github.com/Filipe-kosher/site-de-bio' },
            { id:3, src:'https://raw.githubusercontent.com/Filipe-kosher/vicente-portfolio/main/screenshot.png', title:'Portfólio Kawe Vincente', description:'Um portfólio visualmente impressionante, aplicando boas práticas e visando o desempenho.', tags:['HTML','CSS','JS'], github:'https://github.com/Filipe-kosher/vicente-portfolio' },
            { id:5, src:'https://raw.githubusercontent.com/Filipe-kosher/Hybrix-Site/main/screenshot.png', title:'Hybrix Website', description:'Um website fictício da minha inteligência artificial, Hybrix.', tags:['HTML','CSS','JS','ThreeJS','Font Awesome'], github:'https://github.com/Filipe-kosher/Hybrix-Site' }
          ];
        
          if (window.gsap) {
            const timeline = document.querySelector('.timeline');
            if (timeline && !document.querySelector('.timeline-line-animated')) {
              const animatedLine = document.createElement('div');
              animatedLine.className = 'timeline-line-animated';
              animatedLine.style.cssText = 'position:absolute;left:50%;top:0;width:2px;background:linear-gradient(to bottom,#261bf5,#e0e0ff);transform:translateX(-50%);z-index:1;height:0;opacity:0;';
              timeline.appendChild(animatedLine);
              const timelineItems = document.querySelectorAll('.timeline-item');
              const lastItem = timelineItems[timelineItems.length - 1];
              if (lastItem) {
                gsap.to(animatedLine, { scrollTrigger: { trigger: '.timeline-section', start: 'top 70%', end: () => '+=' + timeline.offsetHeight, scrub: 1, markers: false }, height: '100%', opacity: 1, ease: 'none' });
              } else {
                gsap.to(animatedLine, { scrollTrigger: { trigger: '.timeline-section', start: 'top 70%', toggleActions: 'play none none none' }, height: '100%', opacity: 1, duration: 2, ease: 'power2.out' });
              }
            }
            const timelineSection = document.querySelector('.timeline-section');
            if (timelineSection) {
              const timelineItems = document.querySelectorAll('.timeline-item');
              if (timelineItems.length > 0) {
                timelineItems.forEach(item => { gsap.set(item, { autoAlpha: 0, scale: 0.8, y: 30 }); });
                gsap.to(timelineItems, { scrollTrigger: { trigger: '.timeline-section', start: 'top 75%', toggleActions: 'play none none reverse', markers: false }, autoAlpha: 1, scale: 1, y: 0, stagger: { amount: 0.6, from: 'start' }, duration: 0.7, ease: 'power3.out' });
                ScrollTrigger.refresh();
              }
            }
            gsap.from('.timeline-marker', { scrollTrigger: { trigger: '.timeline-section', start: 'top 60%', toggleActions: 'play none none reverse' }, scale: 0, autoAlpha: 0, stagger: { amount: 1, from: 'start' }, duration: 0.6, ease: 'back.out(2)' });
            document.querySelectorAll('.timeline-item').forEach((item, index) => {
              const marker = item.querySelector('.timeline-marker');
              const content = item.querySelector('.timeline-content');
              const isOdd = index % 2 === 0;
              item.addEventListener('mouseenter', () => {
                if (marker) { gsap.to(marker, { scale: 1.5, boxShadow: '0 0 20px rgba(38, 27, 245, 0.8)', backgroundColor: '#261bf5', duration: 0.3, ease: 'power2.out' }); }
                if (content) { gsap.to(content, { borderColor: '#261bf5', x: isOdd ? -10 : 10, backgroundColor: 'rgba(38, 27, 245, 0.05)', duration: 0.3, ease: 'power2.out' }); }
              });
              item.addEventListener('mouseleave', () => {
                if (marker) { const isCurrent = marker.classList.contains('current'); gsap.to(marker, { scale: 1, boxShadow: isCurrent ? '0 0 0 4px rgba(255, 255, 255, 0.1)' : 'none', backgroundColor: isCurrent ? '#fff' : '#666', duration: 0.3, ease: 'power2.out' }); }
                if (content) { gsap.to(content, { borderColor: '#222', x: 0, backgroundColor: 'transparent', duration: 0.3, ease: 'power2.out' }); }
              });
            });
          }
          if (!window.gsap) {
            const timelineObserver = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)'; } }); }, { threshold: 0.3 });
            document.querySelectorAll('.timeline-item').forEach(item => { timelineObserver.observe(item); });
          }
          function textReveal(selector){ const elements = document.querySelectorAll(selector); elements.forEach(el => { const originalText = el.textContent.trim(); if (!originalText) return; el.textContent = ''; const words = originalText.split(' '); words.forEach((word, i) => { const span = document.createElement('span'); span.textContent = word; span.style.display = 'inline-block'; span.style.opacity = '0'; span.style.transform = 'translateY(20px)'; el.appendChild(span); if (i < words.length - 1) { const space = document.createTextNode(' '); el.appendChild(space); } gsap.to(span, { scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' }, opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out' }); }); }); }
          if (window.gsap) { textReveal('.skills-title'); textReveal('.timeline-title'); }
          if (window.gsap) { gsap.from('.footer-container > *', { scrollTrigger: { trigger: '.footer', start: 'top 85%', toggleActions: 'play none none none' }, y: 40, autoAlpha: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out' }); }
        }
        if (document.readyState === 'complete') { initMainAnimations(); }
        `}
      </Script>
    </>
  )
}
