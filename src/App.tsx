import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SIMULATION_URL =
  "https://www.plataformahiperban.com.br/v/avancefinanceira?utm_source=ig&utm_medium=social&utm_content=link_in_bio";
const WHATSAPP_URL = "https://wa.me/5535991517249";
const INSTAGRAM_URL = "https://www.instagram.com/avancefinanceira7";

const images = {
  hero: "https://images.unsplash.com/photo-1574302637472-77aeb6de1711?auto=format&fit=crop&w=2200&q=88",
  building:
    "https://images.unsplash.com/photo-1569266926771-e324d6b737b0?auto=format&fit=crop&w=1500&q=86",
  interior:
    "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=1600&q=86",
  stairs:
    "https://images.unsplash.com/photo-1601993957728-1e56ab70c5a8?auto=format&fit=crop&w=1500&q=86",
  road: "https://images.unsplash.com/photo-1622826520492-f38649b60fdf?auto=format&fit=crop&w=2200&q=88",
};

const navItems = [
  ["Início", "#inicio"],
  ["Soluções", "#solucoes"],
  ["Imobiliário", "#imobiliario"],
  ["Veículos", "#veiculos"],
  ["Seguros", "#solucoes"],
  ["Sobre", "#sobre"],
  ["Contato", "#contato"],
];

const worlds = [
  {
    number: "01",
    eyebrow: "PATRIMÔNIO",
    title: "FINANCIAMENTO\nIMOBILIÁRIO",
    copy: "Estratégia para transformar o imóvel ideal em uma decisão financeiramente consciente.",
    image: images.building,
    href: "#imobiliario",
  },
  {
    number: "02",
    eyebrow: "MOVIMENTO",
    title: "FINANCIAMENTO\nDE VEÍCULOS",
    copy: "Condições adequadas ao seu momento para colocar o próximo caminho em movimento.",
    image: images.road,
    href: "#veiculos",
  },
  {
    number: "03",
    eyebrow: "POSSIBILIDADE",
    title: "CRÉDITO\nSOB MEDIDA",
    copy: "Modalidades que acompanham objetivos diferentes, sem perder de vista o seu planejamento.",
    image: images.interior,
    href: "#credito",
  },
  {
    number: "04",
    eyebrow: "PROTEÇÃO",
    title: "SEGUROS",
    copy: "Proteção para os bens e conquistas que fazem parte da sua trajetória.",
    image: images.stairs,
    href: "#contato",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function TextLink({
  href,
  children,
  className = "",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      className={`text-link interactive ${className}`}
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span>{children}</span>
    </a>
  );
}

function MagneticLink({
  href,
  children,
  className = "",
  cursorLabel = "ABRIR →",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  cursorLabel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const move = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    gsap.to(ref.current, {
      x: (event.clientX - bounds.left - bounds.width / 2) * 0.18,
      y: (event.clientY - bounds.top - bounds.height / 2) * 0.18,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const leave = () => {
    if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "power3.out" });
  };

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`magnetic interactive ${className}`}
      data-cursor={cursorLabel}
      onMouseMove={move}
      onMouseLeave={leave}
    >
      {children}
    </a>
  );
}

function App() {
  const root = useRef<HTMLDivElement>(null);
  const [financePercent, setFinancePercent] = useState(80);
  const [propertyValue, setPropertyValue] = useState(300000);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !root.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-line > span", {
        yPercent: 120,
        duration: 1.2,
        stagger: 0.12,
        ease: "power4.out",
        delay: 0.2,
      });
      gsap.from(".hero-intro", { opacity: 0, y: 24, duration: 1, delay: 0.8 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
        .to(".hero-media", { scale: 1.14, filter: "brightness(.28)" }, 0)
        .to(".hero-content", { yPercent: -20, opacity: 0.08 }, 0)
        .to(".scroll-cue", { opacity: 0 }, 0);

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.from(element, {
          y: 72,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".image-reveal").forEach((element) => {
        gsap.from(element, {
          clipPath: "inset(0 100% 0 0)",
          duration: 1.45,
          ease: "power4.inOut",
          scrollTrigger: { trigger: element, start: "top 82%", once: true },
        });
      });

      const manifestoWords = gsap.utils.toArray<HTMLElement>(".manifesto-word");
      manifestoWords.forEach((word, index) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".manifesto",
              start: `${index * 18}% center`,
              end: `${index * 18 + 22}% center`,
              scrub: true,
            },
          })
          .fromTo(word, { opacity: 0.08, y: 35 }, { opacity: 1, y: 0 })
          .to(word, { opacity: index === manifestoWords.length - 1 ? 1 : 0.08, y: -25 });
      });

      gsap.matchMedia().add("(min-width: 901px)", () => {
        const track = document.querySelector<HTMLElement>(".worlds-track");
        if (!track) return;
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: ".worlds",
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      gsap.to(".property-bank", {
        width: "72%",
        scrollTrigger: {
          trigger: ".entry-story",
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });

      gsap.fromTo(
        ".road-media",
        { scale: 1.02, xPercent: -3 },
        {
          scale: 1.15,
          xPercent: 3,
          scrollTrigger: { trigger: ".vehicles", start: "top bottom", end: "bottom top", scrub: 1 },
        },
      );

      const costWords = gsap.utils.toArray<HTMLElement>(".cost-word");
      costWords.forEach((word, i) => {
        gsap.fromTo(
          word,
          { clipPath: "inset(100% 0 0 0)", yPercent: 30 },
          {
            clipPath: "inset(0% 0 0 0)",
            yPercent: 0,
            scrollTrigger: {
              trigger: word,
              start: `top ${82 - i * 7}%`,
              end: `top ${55 - i * 7}%`,
              scrub: 0.6,
            },
          },
        );
      });

      gsap.fromTo(
        ".process-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: ".process", start: "top 70%", end: "bottom 65%", scrub: 1 },
        },
      );

      gsap.from(".footer-letter", {
        yPercent: 100,
        opacity: 0,
        stagger: 0.08,
        scrollTrigger: { trigger: ".footer-word", start: "top 90%", end: "bottom bottom", scrub: 1 },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const cursor = document.querySelector<HTMLElement>(".custom-cursor");
    if (!cursor || window.matchMedia("(pointer: coarse)").matches) return;

    const move = (event: MouseEvent) => {
      gsap.to(cursor, { x: event.clientX, y: event.clientY, duration: 0.18, ease: "power2.out" });
    };
    const enter = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      cursor.dataset.label = target.dataset.cursor || "ABRIR →";
      cursor.classList.add("is-active");
    };
    const leave = () => cursor.classList.remove("is-active");
    const elements = document.querySelectorAll(".interactive");
    window.addEventListener("mousemove", move);
    elements.forEach((element) => {
      element.addEventListener("mouseenter", enter);
      element.addEventListener("mouseleave", leave);
    });
    return () => {
      window.removeEventListener("mousemove", move);
      elements.forEach((element) => {
        element.removeEventListener("mouseenter", enter);
        element.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  const financed = propertyValue * (financePercent / 100);
  const downPayment = propertyValue - financed;
  const money = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value);
  const formattedPropertyValue = propertyValue
    ? new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(propertyValue)
    : "";
  const propertyValueWidth = `${Math.max(formattedPropertyValue.length, 1) + 0.35}ch`;

  const handlePropertyValueChange = (value: string) => {
    const digits = value.replace(/\D/g, "").replace(/^0+/, "");
    setPropertyValue(digits ? Number(digits) : 0);
  };

  return (
    <div ref={root}>
      <div className="custom-cursor" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <header className={`site-header ${headerScrolled ? "is-scrolled" : ""}`}>
        <a className="brand interactive" href="#inicio" data-cursor="INÍCIO">
          <img src="/logo-avance-financeira.png" alt="Avance Financeira" />
        </a>
        <a className="header-cta interactive" href={SIMULATION_URL} target="_blank" rel="noreferrer">
          SIMULAR AGORA <Arrow />
        </a>
      </header>

      <main>
        <section className="hero" id="inicio">
          <img className="hero-media" src={images.hero} alt="Arquitetura contemporânea entre árvores" />
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="kicker">AVANCE FINANCEIRA · SEUS PLANOS EM MOVIMENTO</p>
            <h1>
              <span className="hero-line"><span>NÃO FINANCIAMOS</span></span>
              <span className="hero-line"><span>APENAS BENS.</span></span>
              <span className="hero-line secondary"><span>FINANCIAMOS <em>PLANOS.</em></span></span>
            </h1>
            <div className="hero-intro">
              <p>
                Financiamento imobiliário com segurança e estratégia. Crédito, veículos e seguros para transformar
                planos em possibilidades reais.
              </p>
              <div className="hero-actions">
                <MagneticLink href={SIMULATION_URL} className="button button-gold">
                  COMEÇAR UMA SIMULAÇÃO <Arrow />
                </MagneticLink>
                <TextLink href="#sobre">CONHEÇA A AVANCE</TextLink>
              </div>
            </div>
          </div>
          <div className="scroll-cue"><span>SCROLL TO ADVANCE</span><i /></div>
        </section>

        <section className="manifesto" id="sobre">
          <div className="manifesto-sticky">
            <p className="section-index">01 / MOVIMENTO</p>
            <div className="manifesto-heading">
              <span>O plano muda.</span>
              <strong>A estratégia também.</strong>
            </div>
            <div className="manifesto-words" aria-label="O plano, a entrada, o prazo, a parcela, a estratégia">
              {["O PLANO", "A ENTRADA", "O PRAZO", "A PARCELA", "A ESTRATÉGIA"].map((word) => (
                <span className="manifesto-word" key={word}>{word}</span>
              ))}
            </div>
            <p className="manifesto-end">
              A ESCOLHA CERTA COMEÇA ENTENDENDO AS <em>POSSIBILIDADES.</em>
            </p>
          </div>
        </section>

        <section className="worlds" id="solucoes">
          <div className="worlds-track">
            <div className="world-intro">
              <p className="section-index light">02 / UNIVERSO AVANCE</p>
              <h2>UMA AVANCE.<br /><em>DIFERENTES</em><br />CAMINHOS.</h2>
              <p>Continue avançando</p>
              <span className="long-arrow">→</span>
            </div>
            {worlds.map((world) => (
              <article className="world-panel" key={world.number}>
                <div className="world-number">{world.number}</div>
                <div className="world-image image-reveal interactive" data-cursor="EXPLORAR">
                  <img src={world.image} alt="" />
                </div>
                <div className="world-copy">
                  <p>{world.eyebrow}</p>
                  <h3>{world.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h3>
                  <div>
                    <p>{world.copy}</p>
                    <TextLink href={world.href}>SAIBA MAIS <Arrow /></TextLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="calculator" id="imobiliario">
          <div className="calculator-title reveal">
            <p className="section-index light">03 / IMOBILIÁRIO</p>
            <h2>QUANTO PRECISA<br />DAR DE <em>ENTRADA?</em></h2>
            <p>Nem sempre são 20%.</p>
          </div>
          <div className="simulation reveal">
            <div className="property-value">
              <label htmlFor="property-value">VALOR DO IMÓVEL</label>
              <div className="property-input">
                <span>R$</span>
                <input
                  id="property-value"
                  type="text"
                  inputMode="numeric"
                  value={formattedPropertyValue}
                  onChange={(event) => handlePropertyValueChange(event.target.value)}
                  aria-label="Valor do imóvel em reais"
                  style={{ width: propertyValueWidth }}
                />
              </div>
            </div>
            <div className="percent-control" role="group" aria-label="Percentual financiado">
              {[70, 80, 90].map((percent) => (
                <button
                  key={percent}
                  type="button"
                  className={financePercent === percent ? "active" : ""}
                  onClick={() => setFinancePercent(percent)}
                >
                  {percent}%
                </button>
              ))}
            </div>
            <div className="simulation-results">
              <div><span>FINANCIAMENTO</span><strong key={`f-${propertyValue}-${financePercent}`}>{money(financed)}</strong></div>
              <div><span>ENTRADA</span><strong key={`e-${propertyValue}-${financePercent}`}>{money(downPayment)}</strong></div>
            </div>
            <div className="finance-bar">
              <div className="bar-labels"><span>FINANCIADO · {financePercent}%</span><span>ENTRADA · {100 - financePercent}%</span></div>
              <div className="bar-track">
                <span className="bar-financed" style={{ width: `${financePercent}%` }} />
              </div>
            </div>
            <p className="simulation-note">
              O percentual financiado pode variar conforme banco, linha de crédito, renda e avaliação do imóvel.
            </p>
          </div>
        </section>

        <section className="entry-story">
          <div className="entry-copy reveal">
            <p>Muita gente acredita que todo financiamento imobiliário exige 20% de entrada.</p>
            <h2>MAS NÃO FUNCIONA ASSIM<br /><em>EM TODOS OS CASOS.</em></h2>
          </div>
          <div className="property-split reveal">
            <div className="split-explanation">
              <span>ENTENDA A LÓGICA</span>
              <h3>A entrada é a parte do imóvel que o banco não vai financiar.</h3>
            </div>
            <div className="split-visual">
              <div className="property-bank"><span>BANCO</span><strong>FINANCIADO</strong></div>
              <div className="property-you"><span>VOCÊ</span><strong>ENTRADA</strong></div>
            </div>
          </div>
        </section>

        <section className="fgts">
          <div className="fgts-image image-reveal interactive" data-cursor="EXPLORAR">
            <img src={images.stairs} alt="Escadaria de uma residência contemporânea" />
            <span className="image-caption">ARQUITETURA / POSSIBILIDADE</span>
          </div>
          <div className="fgts-copy reveal">
            <p className="section-index">04 / FGTS</p>
            <h2>SEU FGTS<br />TAMBÉM PODE<br />FAZER PARTE<br /><em>DO PLANO.</em></h2>
            <p>
              Em determinados casos, o FGTS pode ser utilizado para completar ou reduzir a entrada, desde que o
              comprador e o imóvel atendam às regras aplicáveis.
            </p>
            <TextLink href="#contato">ENTENDER MINHAS POSSIBILIDADES →</TextLink>
          </div>
        </section>

        <section className="costs">
          <p className="section-index light">05 / PLANEJAMENTO</p>
          <div className="costs-heading reveal">
            <span>NÃO É SÓ</span>
            <strong>A ENTRADA.</strong>
          </div>
          <div className="cost-words">
            <div className="cost-word"><span>01</span>ITBI</div>
            <div className="cost-word"><span>02</span>REGISTRO</div>
            <div className="cost-word multi"><span>03</span>CUSTOS DO<br />FINANCIAMENTO</div>
          </div>
          <p className="costs-end reveal">Planejar corretamente evita surpresas durante a compra.</p>
        </section>

        <section className="vehicles" id="veiculos">
          <img className="road-media" src={images.road} alt="Automóvel em uma estrada cercada por árvores" />
          <div className="road-overlay" />
          <div className="perspective-lines" aria-hidden="true"><i /><i /></div>
          <div className="vehicles-content reveal">
            <p className="section-index light">06 / VEÍCULOS</p>
            <h2>O PRÓXIMO<br />CAMINHO<br /><em>PODE SER SEU.</em></h2>
            <div className="vehicles-detail">
              <span>FINANCIAMENTO DE VEÍCULOS</span>
              <p>Encontre possibilidades para financiar seu próximo veículo com condições adequadas ao seu planejamento.</p>
              <MagneticLink href={SIMULATION_URL} className="button button-outline">
                SIMULAR FINANCIAMENTO <Arrow />
              </MagneticLink>
            </div>
          </div>
        </section>

        <section className="credit" id="credito">
          <p className="section-index light">07 / CRÉDITO</p>
          <div className="credit-grid">
            <div className="credit-heading reveal">
              <h2>PLANOS<br /><em>DIFERENTES.</em><br /><br />CRÉDITOS<br /><em>DIFERENTES.</em></h2>
              <p>Seja para comprar seu imóvel, trocar de veículo, organizar as contas ou planejar aquela viagem, existem modalidades para cada objetivo.</p>
            </div>
            <div className="credit-list">
              {["IMÓVEL", "VEÍCULO", "ORGANIZAÇÃO", "VIAGEM", "PROJETOS"].map((item, i) => (
                <div className="reveal" key={item}><span>0{i + 1}</span><strong>{item}</strong><i>↓</i></div>
              ))}
            </div>
          </div>
          <div className="credit-conclusion reveal">
            <p>O prazo muda. A modalidade muda.<br />A ideia continua a mesma:</p>
            <h3>UMA PARCELA QUE FAÇA<br /><em>SENTIDO PARA VOCÊ.</em></h3>
          </div>
        </section>

        <section className="philosophy">
          <p className="section-index">08 / NOSSA FILOSOFIA</p>
          <h2 className="reveal">NÃO COMEÇAMOS<br />PELA PARCELA.<br /><br />COMEÇAMOS<br /><em>PELO SEU PLANO.</em></h2>
          <div className="philosophy-bottom reveal">
            <span />
            <p>Cada cenário financeiro é diferente. Por isso, entender renda, objetivo, prazo e possibilidades é parte essencial de uma decisão consciente.</p>
          </div>
        </section>

        <section className="process">
          <div className="process-top">
            <p className="section-index">09 / PROCESSO</p>
            <h2 className="reveal">DO PLANO<br /><em>À CONQUISTA.</em></h2>
          </div>
          <div className="process-timeline">
            <div className="process-line"><span className="process-progress" /></div>
            {[
              ["01", "CONTE SEU PLANO"],
              ["02", "ANALISAMOS AS POSSIBILIDADES"],
              ["03", "SIMULAMOS OS CENÁRIOS"],
              ["04", "VOCÊ ESCOLHE O CAMINHO"],
              ["05", "AVANCE."],
            ].map(([number, label]) => (
              <div className="process-step" key={number}><span>{number}</span><strong>{label}</strong></div>
            ))}
          </div>
        </section>

        <section className="final-cta">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <p className="reveal">TALVEZ SEU PLANO ESTEJA MAIS PERTO DO QUE PARECE.</p>
          <h2 className="reveal">DESCUBRA<br />SUAS<br /><em>POSSIBILIDADES.</em></h2>
          <MagneticLink href={SIMULATION_URL} className="circle-cta">
            <span>SIMULAR</span><strong>AGORA</strong><Arrow />
          </MagneticLink>
        </section>

        <section className="contact" id="contato">
          <p className="section-index">10 / CONTATO</p>
          <h2 className="reveal">VAMOS FALAR<br />SOBRE SEU<br /><em>PRÓXIMO PLANO?</em></h2>
          <div className="contact-links">
            <div>
              <span>CONVERSA DIRETA</span>
              <strong>WHATSAPP</strong>
              <TextLink href={WHATSAPP_URL} external>CONVERSAR NO WHATSAPP <Arrow /></TextLink>
            </div>
            <div>
              <span>ACOMPANHE</span>
              <strong>@AVANCEFINANCEIRA7</strong>
              <TextLink href={INSTAGRAM_URL} external>ACOMPANHAR NO INSTAGRAM <Arrow /></TextLink>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/logo-avance-financeira.png" alt="Avance Financeira" />
          </div>
          <p>Financiamento imobiliário.<br />Veículos. Crédito. Seguros.</p>
          <div className="footer-nav">
            {navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp</a>
            <a href={SIMULATION_URL} target="_blank" rel="noreferrer">Simulação</a>
          </div>
        </div>
        <div className="footer-legal">
          <span>© {new Date().getFullYear()} AVANCE FINANCEIRA</span>
          <span>CRÉDITO CONSCIENTE. DECISÕES SEGURAS.</span>
        </div>
        <div className="footer-word" aria-label="Avance">
          {"AVANCE".split("").map((letter, i) => <span className="footer-letter" key={i}>{letter}</span>)}
        </div>
      </footer>
    </div>
  );
}

export default App;
