import React, { useState, useEffect, memo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// --- UTILITÁRIO PARA VOLTAR AO TOPO AO MUDAR DE ROTA ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- COMPONENTE DE CONTAGEM REGRESSIVA (Original) ---
const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;
      if (distance < 0) clearInterval(timer);
      else setTimeLeft({
        h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  return <div style={{ color: '#d32f2f', fontWeight: 'bold', fontSize: '14px', marginTop: '10px' }}>⏱ Expira em: {timeLeft.h}h {timeLeft.m}m {timeLeft.s}s</div>;
};

// --- COMPONENTE DO SLIDER PRINCIPAL (Original) ---
const MainSlider = memo(() => {
  const slides = [
    { img: "/banner0.jpg", title: "PROJETOS PERSONALIZADOS", sub: "Segurança Inteligente" ,backgroundSize: '150%',backgroundPosition: 'center',backgroundRepeat: 'no-repeat'},
    { img: "/bannermanutencao.jpg", title: "MANUTENÇÃO", sub: "Assistência autorizada do seu relógio",backgroundSize: '180%',backgroundPosition: 'center',backgroundRepeat: 'no-repeat'},
    { img: "/bannersistema.jpg", title: "SISTEMA DE PONTO WEB", sub: "Gestão na Nuvem",backgroundSize: '150%',backgroundPosition: 'center',backgroundRepeat: 'no-repeat' },
    { img: "/bannerreconhecimento.jpg", title: "RECONHECIMENTO FACIAL", sub: "Mais Praticidade", fit: "cover" },
  ];

  return (
    <div style={{ width: '100%', height: '70vh', backgroundColor: '#000', overflow: 'hidden' }}>
      <Swiper modules={[Autoplay, Pagination, Navigation]} speed={1500} autoplay={{ delay: 5000, disableOnInteraction: false }} pagination={{ clickable: true }} navigation loop style={{ height: '100%' }}>
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: slide.fit || 'cover', color: 'white', backgroundImage: `url("${slide.img}")`,position: 'relative',boxSizing: 'border-box', borderBottom: '4px solid #12bdd5',}}>
              <div style={{ backgroundColor: 'rgba(0, 33, 71, 0.5)', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 10%' }}>
                <h2 className="anim-titulo" style={{ fontSize: '3.5rem', textAlign: 'center', margin: 0, fontWeight: '800', textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>{slide.title}</h2>
                <p className="anim-subtitulo" style={{ fontSize: '1.5rem', marginTop: '15px', fontWeight: '400' }}>{slide.sub}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

// --- ESTILOS (Originais) ---
const styles = {
  mainContainer: { margin: 0, padding: 0, fontFamily: 'Segoe UI, Roboto, sans-serif', minHeight: '100vh', width: '100vw', backgroundColor: '#fff', overflowX: 'hidden' },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 3%', height: '80px', backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)', borderBottom: '2px solid #12bdd5', position: 'sticky', top: 0, zIndex: 2000, width: '100%', boxSizing: 'border-box', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' },
  navBtn: { backgroundColor: 'transparent', border: 'none', color: '#ffffff', fontWeight: '600', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', textTransform: 'uppercase', transition: '0.3s', textDecoration: 'none' },
  contactBtn: { color: '#fff', backgroundColor: '#12bdd5', padding: '10px 18px', borderRadius: '5px', fontWeight: '700', border: 'none', cursor: 'pointer', fontSize: '14px', transition: '0.3s' },
  logoImg: { height: '46px', cursor: 'pointer', transition: '0.5s', display: 'block' },
  sectionDark: { display: 'flex', flexWrap: 'wrap', backgroundColor: '#001a38', color: 'white', minHeight: '500px', overflow: 'hidden' },
  sectionLight: { display: 'flex', flexWrap: 'wrap', backgroundColor: '#ffffff', color: '#002147', minHeight: '500px', overflow: 'hidden' },
  textSide: { flex: '1 1 500px', padding: '80px 7%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left' },
  imgSide: { flex: '1 1 500px', backgroundSize: 'contain',backgroundRepeat: 'no-repeat', backgroundPosition: 'center', minHeight: '400px', transition: 'transform 0.5s ease' },
  iconBox: { backgroundColor: '#12bdd5', width: '55px', height: '45px', borderRadius: '8px', marginBottom: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  footerTop: { backgroundColor: '#002147', color: 'white', padding: '40px 7%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', borderBottom: '1px solid rgba(255,255,255,0.1)', gap: '20px' },
  footerMain: { backgroundColor: '#001a38', color: 'white', padding: '60px 7%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', textAlign: 'left' },
  footerColumn: { display: 'flex', flexDirection: 'column', gap: '15px' },
  footerLink: { color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', transition: '0.3s', cursor: 'pointer' },
  footerTitle: { fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: '#fff' }
  
};
const dropdownItemStyle = {
  color: '#002147',
  padding: '12px 20px',
  textDecoration: 'none',
  display: 'block',
  fontSize: '14px',
  fontWeight: '600',
  transition: '0.3s',
  borderBottom: '1px solid #f0f0f0'
};
// --- NOVO COMPONENTE PARA A FIGURINHA ---

const BotaoFlutuante = ({ selectedProduct }) => { 
  const location = useLocation();

  // Não renderiza o boneco se estiver na página "Sobre" ou se um produto estiver aberto no modal
  if (location.pathname === '/sobre' || selectedProduct) return null;

  // MAPEAMENTO: Define o texto e o vídeo para cada página
  const conteudoPorPagina = {
    '/': { 
      texto: 'Quer me conhecer?', 
      video: '/boneco.mp4' 
    },
    '/relogios': { 
      texto: 'Precisa de um Relógio?', 
      video: '/bonecorelogio.mp4' // Usando o vídeo que você já tem para esta seção
    },
    '/suprimentos': { 
      texto: 'Procurando Bobinas?', 
      video: '/bonecosuprimento.mp4' // Substitua pelo nome do seu arquivo real
    },
    '/acesso': { 
      texto: 'Segurança para sua Empresa?', 
      video: '/bonecocatraca.mp4' // Substitua pelo nome do seu arquivo real
    },
    '/servicos': { 
      texto: 'Precisa de manutenção?', 
      video: '/bonecoconcerta.mp4' 
    }
  };

  // Busca o conteúdo da página atual ou define um padrão (fallback)
  const configAtual = conteudoPorPagina[location.pathname] || { 
    texto: 'Posso te ajudar?', 
    video: '/boneco.mp4' 
  };
// Verifica se o balão atual é o "Quer me conhecer?"
  const ePaginaInicial = configAtual.texto === 'Quer me conhecer?';

  // Define o componente que envolverá o conteúdo (Link ou div)
  const Container = ePaginaInicial ? 'a' : 'div';
  const propsContainer = ePaginaInicial ? { 
  // O link precisa de %20 no lugar dos espaços para não quebrar em alguns navegadores
  href: "https://wa.me/5585991220790?text=Olá!%20Gostaria%20de%20conhecer%20melhor%20a%20Opencom", 
  target: "_blank", 
  rel: "noopener noreferrer" 
} : {};
  return (
    <Container 
      {...propsContainer}
      style={{ 
        position: 'fixed', 
        bottom: '30px', 
        left: '30px', 
        zIndex: 9999, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textDecoration: 'none',
        // O cursor só vira "pointer" se for um link clicável
        cursor: ePaginaInicial ? 'pointer' : 'default'
      }}
    >
      {/* BALÃO DE FALA DINÂMICO */}
      <div style={{
        backgroundColor: '#12bdd5',
        color: '#001a38',
        padding: '8px 15px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: 'bold',
        marginBottom: '10px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        position: 'relative',
        whiteSpace: 'nowrap'
      }}>
        {configAtual.texto}
        <div style={{
          position: 'absolute',
          bottom: '-6px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: '6px solid #12bdd5'
        }}></div>
      </div>

      {/* VÍDEO DO BONECO DINÂMICO */}
      <video 
        key={configAtual.video}
        src={configAtual.video} 
        autoPlay 
        loop 
        muted 
        playsInline
        className="img-zoom"
        style={{ 
          width: '80px', 
          height: '80px', 
          objectFit: 'cover',
          transform: 'scale(1.2)',
          borderRadius: '50%', 
          border: '3px solid #12bdd5',
          backgroundColor: '#000'
        }} 
      />
    </Container>
  );
};

export default function App() {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Lógica de Títulos Dinâmicos baseada na Rota
  const PageTitleUpdater = () => {
    const location = useLocation();
    useEffect(() => {
      const titulos = {
        '/': "Opencom Tecnologia | Segurança e Ponto Eletrônico",
        '/relogios': "Relógios de Ponto Homologados - Opencom",
        '/acesso': "Controle de Acesso e softwares de controle - Opencom",
        '/softwares': "Softwares de Gestão de Ponto - Opencom",
        '/suprimentos': "Suprimentos e Acessórios - Opencom",
        '/servicos': "Serviços personalizados - opencom",
        '/blog': "Central informativa - opencom"
      };
      document.title = titulos[location.pathname] || "Opencom Tecnologia";
      // 2. Atualiza o Logo na Aba (Favicon)
    const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.href = '/avatar.jpg'; // Certifique-se de que o seu logo tem este nome na pasta public
    document.getElementsByTagName('head')[0].appendChild(link);
    
    }, [location]);
    return null;
  };

  return (
    <Router>
      <ScrollToTop />
      <PageTitleUpdater />
      <BotaoFlutuante selectedProduct={selectedProduct} />
      <div style={styles.mainContainer}>
        <style>{`
           @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
           .swiper-slide-active .anim-titulo { animation: fadeInUp 2.3s ease forwards; }
           .swiper-slide-active .anim-subtitulo { animation: fadeInUp 2.3s ease forwards; animation-delay: 0.3s; opacity: 0; }
           .btn-hover:hover { background-color: #12bdd5 !important; color: #002147 !important; transform: scale(1.05); }
           .img-zoom:hover { transform: scale(1.05); }
           .footer-link:hover { color: #12bdd5 !important; padding-left: 5px; }
           .product-card:hover { transform: translateY(-10px); box-shadow: 0 15px 30px rgba(0,0,0,0.15) !important; }

        `}</style>
        <style>{`
  .dropdown:hover .dropdown-content {
    display: block !important;
    animation: fadeInDropdown 0.3s ease;
  }
  @keyframes fadeInDropdown {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .dropdown-link:hover {
    background-color: #f4f7f9 !important;
    color: #12bdd5 !important;
  }
`}</style>

        {/* NAVIGATION (Modificado apenas para Link) */}
        <nav style={styles.nav}>
          <Link to="/" style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="/logo1.png" alt="Opencom Tecnologia" style={styles.logoImg} className="img-zoom" />
          </Link>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <Link style={styles.navBtn} to="/">Início</Link>
          <Link style={styles.navBtn} to="/sobre">Sobre Nós</Link>
          <Link style={styles.navBtn} to="/relogios">Relógios</Link>
          <Link style={styles.navBtn} to="/acesso">Acesso</Link>

          {/* MENU DROPDOWN PARA SOFTWARES */}
          <div className="dropdown" style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ ...styles.navBtn, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              Softwares <span style={{ fontSize: '0.8rem', marginLeft: '5px' }}>▼</span>
            </span>
            
            <div className="dropdown-content" style={{
              display: 'none',
              position: 'absolute',
              backgroundColor: '#ffffff',
              minWidth: '200px',
              boxShadow: '0px 8px 16px #12bdd5',
              borderRadius: '8px',
              zIndex: 1000,
              top: '100%',
              left: '0',
              padding: '10px 0'
            }}>
              <Link style={dropdownItemStyle} to="/sistema acesso">Software de Acesso</Link>
              <Link style={dropdownItemStyle} to="/sistema ponto">Software de Ponto</Link>
            </div>
          </div>

          <Link style={styles.navBtn} to="/suprimentos">Suprimentos</Link>
          <Link style={styles.navBtn} to="/servicos">Serviços</Link>
          <Link style={styles.navBtn} to="/blog">Blog</Link>
          
          <button style={styles.contactBtn} className="btn-hover" onClick={() => window.open('https://wa.me/5585991220790')}>
            Contato 📱
          </button>
        </div>
        </nav>

        <Routes>
          {/* ROTA: HOME */}
          <Route path="/" element={
            <div style={{ animation: 'fadeIn 0.8s ease-out' }}>
              <MainSlider />
              {/* Conteúdo exato da Seção Suporte */}
              <section style={styles.sectionLight}>
                <div style={{ ...styles.imgSide, position: 'relative', overflow: 'hidden' }}>
                  <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 3000 }} loop style={{ height: '100%' }}>
                    <SwiperSlide><div className="img-zoom" style={{ height: '100%', backgroundImage: 'url("/suporte.jpg")', backgroundSize: '147%',backgroundPosition: 'center',backgroundRepeat: 'no-repeat' }}></div></SwiperSlide>
            
                  </Swiper>
                </div>
                <div style={styles.textSide}>
    
    <h2 style={{ fontSize: '2.8rem', fontWeight: '800', marginBottom: '20px', lineHeight: '1.1' }}>
      Suporte Técnico Especializado
    </h2>
    <p style={{ fontSize: '1.2rem', color: '#444', marginBottom: '25px', lineHeight: '1.6' }}>
      Na Opencom Tecnologia, simplificamos processos para garantir resultados. Nossa equipe está pronta para oferecer:
    </p>
    <ul style={{ 
  listStyle: 'disc', // Define o ponto como marcador
  paddingLeft: '20px', // Espaço para o ponto não ficar fora da tela
  fontSize: '1.1rem', 
  color: '#002147', 
  fontWeight: '600' 
}}>
  <li style={{ marginBottom: '10px' }}>Manutenção Preventiva & Corretiva</li>
  <li style={{ marginBottom: '10px' }}>Treinamento Operacional Completo</li>
  <li style={{ marginBottom: '10px' }}>Atendimento Rápido e Eficiente</li>
</ul>
    <button 
      onClick={() => window.open('https://wa.me/5585982307968?text=Olá, Preciso de ajuda técnica rápida e eficiente.')}
      style={{ width: 'fit-content', padding: '15px 40px', borderRadius: '50px', border: '2px solid #001a38', backgroundColor: '#001a38', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }} 
      className="btn-hover"
    >
      Agendar Agora
    </button>
  </div>
</section>

              {/* Conteúdo exato da Seção Suprimentos */}
              <section style={styles.sectionDark}>
            <div style={styles.textSide}>
              
              <h2 style={{ fontSize: '2.8rem', fontWeight: '800' }}>Suprimentos</h2>
              <p>Suprimentos e acessórios essenciais para garantir o funcionamento contínuo e eficiente dos seus equipamentos,
                com qualidade, praticidade e suporte especializado.</p>
               <Link to="/suprimentos" style={{ width: 'fit-content', padding: '15px 35px', borderRadius: '50px', backgroundColor: '#12bdd5', border: 'none', fontWeight: 'bold', cursor: 'pointer',color: '#000000', textDecoration:'none', display: 'inLine-blok' }} className="btn-hover">Ver Suprimentos</Link>
            </div>
            <div className="img-zoom" style={{ ...styles.imgSide, backgroundImage: 'url("/suprimentos1.jpg")',backgroundSize: '170%',backgroundPosition: 'center',backgroundRepeat: 'no-repeat' }}></div>
          </section>

          {/* SEÇÃO PROJETOS ACADEMIA */}
          <section style={styles.sectionLight}>
            <div className="img-zoom" style={{ ...styles.imgSide, backgroundImage: 'url("/acessofacial.jpg")',backgroundSize: '160%',backgroundPosition: 'center',backgroundRepeat: 'no-repeat' }}></div>
            <div style={styles.textSide}>
              
              <h2 style={{ fontSize: '2.8rem', fontWeight: '800' }}>Acesso Facial</h2>
              <p>Solução moderna e segura para academias, prédios comerciais e empresas. 
                O acesso por reconhecimento facial elimina filas, aumenta a segurança e permite o controle eficiente da entrada e saída de pessoas, 
                com integração a sistemas de gestão e relatórios em tempo real.</p>
              <button onClick={() => window.open('https://wa.me/5585991220790?text=Olá, gostaria de saber mais sobre o projeto academia da Open.')} style={{ width: 'fit-content', padding: '15px 40px', borderRadius: '50px', backgroundColor: '#001a38', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }} className="btn-hover">Peça o seu agora</button>
            </div>
          </section>

          {/* SEÇÃO CANCELAS */}
          <section style={styles.sectionDark}>
            <div style={styles.textSide}>
              <h2 style={{ fontSize: '2.8rem', fontWeight: '800' }}>Cancelas e Torniquetes</h2>
              <p>Controle de acesso com cancelas e torniquetes que oferecem segurança, 
                organização e automação no fluxo de pessoas e veículos, com integração a sistemas e suporte especializado.</p>
              <button onClick={() => window.open('https://wa.me/5585991220790?text=Olá, gostaria de saber mais sobre projetos de cancelas e totens da Open.')} style={{ width: 'fit-content', padding: '15px 35px', borderRadius: '50px', backgroundColor: '#12bdd5', border: 'none', fontWeight: 'bold', cursor: 'pointer' }} className="btn-hover">Orçamento Personalizado</button>
            </div>
            <div className="img-zoom" style={{ ...styles.imgSide, backgroundImage: 'url("/cancela.jpg")',backgroundSize: '174%',backgroundPosition: 'center',backgroundRepeat: 'no-repeat' }}></div>
          </section>

          {/* SEÇÃO CERTIFICADO DIGITAL */}
          <section style={styles.sectionLight}>
            <div className="img-zoom" style={{ ...styles.imgSide, backgroundImage: 'url("/certificado.jpg")' }}></div>
            <div style={styles.textSide}>
              
              <h2 style={{ fontSize: '2.8rem', fontWeight: '800' }}>Certificado Digital</h2>
              <p>O certificado digital é sua identidade eletrônica, usada para assinar documentos, acessar sistemas do governo, emitir notas fiscais e garantir a
                  segurança das suas transações online.</p>
              <p>   Com a Open, você faz tudo de forma rápida, segura e com suporte especializado.
                  Agende agora e facilite sua rotina com praticidade e confiança!</p>
              <button onClick={() => window.open('https://wa.me/5585991220790?text=Olá, gostaria de adquerir um certificado digital da Open.')} style={{ width: 'fit-content', padding: '15px 40px', borderRadius: '50px', backgroundColor: '#001a38', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }} className="btn-hover">Peça o seu agora</button>
            </div>
          </section>
        </div>
          } />

          {/* ROTA: SOBRE NÓS (Mantendo sua estrutura) */}
          <Route path="/sobre" element={
            <div style={{ animation: 'fadeIn 0.6s ease-out' }}>
              <div style={{ 
            backgroundColor: '#002147', 
            color: 'white', 
            padding: '20px 5%', 
            minHeight: '115px', // Altura reduzida
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            position: 'relative',
            overflow: 'visible' 
          }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '900' }}>Nossa História</h1>
              </div>
              {/* Conteúdo começo */}
              <section style={styles.sectionLight}>
            <div className="img-zoom" style={{ ...styles.imgSide, backgroundImage: 'url("/nos.png")',backgroundSize: 'contain',backgroundPosition: 'center',backgroundRepeat: 'no-repeat' }}></div>
            <div style={styles.textSide}>
    
    <h2 style={{ fontSize: '2.8rem', fontWeight: '800', marginBottom: '20px', lineHeight: '1.1' }}>
      Quando Surgimos
    </h2>
    <p style={{ fontSize: '1.2rem', color: '#444', marginBottom: '25px', lineHeight: '1.6' }}>
      Nossa história começou a ......
    </p>
    <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.1rem', color: '#002147', fontWeight: '600' }}>
      <li style={{ marginBottom: '10px' }}>✔️ Melhor Atendimento</li>
      <li style={{ marginBottom: '10px' }}>✔️ Diferenciado</li>
      <li style={{ marginBottom: '10px' }}>✔️ Honestidade</li>
    </ul>
  </div>
</section>

              {/* Conteúdo Meio */}
              <section style={styles.sectionDark}>
            <div style={styles.textSide}>
              
              <h2 style={{ fontSize: '2.8rem', fontWeight: '800' }}>Por que estamos aqui</h2>
              <p>Estamos pois .........</p>
            </div>
            <div className="img-zoom" style={{ ...styles.imgSide, backgroundImage: 'url("/nos.png")' }}></div>
          </section>

          {/* SEÇÃO Meio 2 */}
          <section style={styles.sectionLight}>
            <div className="img-zoom" style={{ ...styles.imgSide, backgroundImage: 'url("/nos.png")',backgroundSize: 'contain',backgroundPosition: 'center',backgroundRepeat: 'no-repeat' }}></div>
            <div style={styles.textSide}>
              
              <h2 style={{ fontSize: '2.8rem', fontWeight: '800' }}>O Que Fazemos</h2>
              <p>Valorizamos .....</p>
            </div>
          </section>

          {/* SEÇÃO Meio 3 */}
          <section style={styles.sectionDark}>
            <div style={styles.textSide}>
              <h2 style={{ fontSize: '2.8rem', fontWeight: '800' }}>Nossa Missão</h2>
              <p>Contribuir para que empresas possam melhorar seu desempenho através de soluções em tecnologia.</p>
            </div>
            <div className="img-zoom" style={{ ...styles.imgSide, backgroundImage: 'url("/nos.png")' }}></div>
          </section>

          {/* SEÇÃO VISÃO */}
          <section style={styles.sectionLight}>
            <div className="img-zoom" style={{ ...styles.imgSide, backgroundImage: 'url("/nos.png")' }}></div>
            <div style={styles.textSide}>
              
              <h2 style={{ fontSize: '2.8rem', fontWeight: '800' }}>Nossa Visão</h2>
              <p>Ser reconhecida como empresa referência em soluções tecnológicas para empresas de todos os portes.</p>
            </div>
          </section>

          {/* SEÇÃO valores */}
          <section style={styles.sectionDark}>
            <div style={styles.textSide}>
              <h2 style={{ fontSize: '2.8rem', fontWeight: '800' }}>Nossos Valores</h2>
              <p>Respeito - Humildade - Empatia - Educação - Ética - Parceria - Sustentabilidade.</p>
            </div>
            <div className="img-zoom" style={{ ...styles.imgSide, backgroundImage: 'url("/nos.png")' }}></div>
          </section>
        </div>
          } />

          {/* ROTA: RELÓGIOS (Mantendo sua estrutura de produtos) */}
         <Route path="/relogios" element={
        <div style={{ animation: 'fadeIn 0.6s ease-out', backgroundColor: '#f4f7f9', minHeight: '80vh', paddingBottom: '80px' }}>
          
          {/* CABEÇALHO COMPACTO E CENTRALIZADO */}
          <div style={{ 
            backgroundColor: '#002147', 
            color: 'white', 
            padding: '20px 5%', 
            minHeight: '115px', // Altura reduzida
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            position: 'relative',
            overflow: 'visible' 
          }}>

            {/* BLOCO DE TEXTO (CENTRALIZADO NO MEIO DA PÁGINA) */}
            <div style={{ 
              textAlign: 'center', 
              maxWidth: '800px', 
              zIndex: 5 
            }}>
              <h1 style={{ 
                fontSize: isMobile ? '1.8rem' : '2.5rem', 
                fontWeight: '900', 
                margin: 0,
                lineHeight: '1.1' 
              }}>
                RELÓGIOS DE PONTO
              </h1>
              <p style={{ 
                opacity: 0.8, 
                marginTop: '5px', 
                fontSize: isMobile ? '0.85rem' : '1rem',
                marginRight: 'auto',
                marginLeft: 'auto'
              }}>
                Qualidade e garantia para o sucesso do seu negócio.
              </p>
            </div>

          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', padding: '50px 7%', maxWidth: '1200px', margin: '0 auto' }}>
                 {[
              { id: 'produto 1', 
                nome: "HEXA 671", 
                img: "/relogiohexa.jpg", 
                desc: "Segurança e rapidez na digital.", 
                detalhes: ` O Hexa 671 é a solução ideal para empresas que buscam eficiência, segurança e conformidade legal no controle de jornada. Desenvolvido pela Henry, este equipamento combina tecnologia de ponta com um design robusto, sendo especialmente projetado para atender fluxos intensos de marcação de ponto.

                              Principais Diferenciais:
                              • Alta Performance: Equipado com processador de alto desempenho, garantindo rapidez na leitura e no registro, evitando filas nos horários de pico.

                              • Impressora Térmica Integrada: Possui impressora de alta velocidade para a emissão de comprovantes de registro (tickets), garantindo a transparência entre empresa e colaborador.

                              • Múltiplas Formas de Identificação: Oferece versatilidade no acesso através de:

                                  • Biometria (impressão digital).

                                  • Cartão de proximidade (RFID).

                                  • Senha via teclado.

                              • Grande Capacidade de Armazenamento: Memória robusta capaz de gerenciar milhares de funcionários e registros de eventos de forma offline.

                              • Conectividade: Integração simplificada com softwares de gestão via TCP/IP (rede), USB ou Wi-Fi (opcional).

                              Especificações Técnicas:
                              • Modelo: Hexa 671 (Linha Advanced).

                              • Display: Tela colorida de alta resolução para facilitar a visualização e interação do usuário.

                              • Segurança: Sensores anti-fraude e gabinete reforçado com trava de segurança.

                              • Conformidade: Totalmente adequado às exigências das portarias do Ministério do Trabalho e Emprego (MTE).

                              Indicação de Uso:
                              Indicado para indústrias, comércios de grande porte e empresas com alta rotatividade ou grande quadro de funcionários que necessitam de um equipamento resistente e de baixa manutenção.

                                  Dica: Este equipamento é reconhecido por sua durabilidade no mercado brasileiro, sendo uma das escolhas preferidas para ambientes que exigem um hardware que suporte o uso constante sem perda de precisão.` ,
                specs: ["Digital", "Impressora", "USB"] },
                { id: 'produto 2', 
                nome: "EVO 50 AFD", 
                img: "/relogioevo50.jpg", 
                desc: "Reconhecimento facial de alta precisão.", 
                detalhes: ` EVO 50 AFD: Tecnologia e Conformidade.

                              O EVO 50 AFD é um terminal de reconhecimento facial de última geração, desenvolvido pela EVO, focado em aliar segurança biométrica avançada com as exigências legais do Ministério do Trabalho.

                            • Tecnologia de Reconhecimento: Utiliza biometria facial de alta velocidade, permitindo a identificação do colaborador sem contato físico, o que aumenta a higiene e a durabilidade do hardware.

                            • Segurança (Anti-Fake): Equipado com sensores que distinguem rostos reais de fotos ou vídeos, impedindo tentativas de fraude no registro.

                            • Conformidade Legal: É um modelo homologado pelo MTP (Ministério do Trabalho e Previdência), atendendo aos requisitos técnicos para o registro eletrônico de ponto.

                            • Interface e Design: Possui tela colorida de alta resolução que guia o usuário durante o processo de marcação, com um design vertical compacto e moderno que se adapta a qualquer recepção ou parede.

                            • Conectividade: Projetado para integração nativa com softwares de gestão de RH, facilitando a coleta de dados e o fechamento da folha de pagamento.

                            Destaque Principal: Enquanto o Hexa foca na versatilidade de identificação (digital, cartão, senha), o EVO 50 AFD foca na experiência "touchless" (sem toque) e na rapidez extrema do reconhecimento facial.`, 
                specs: ["Facial", "Wi-Fi", "Portaria 671"] },
                { id: 'produto 3', 
                nome: "Relógio Prisma", 
                img: "/relogioprisma.jpg", 
                desc: "Segurança e rapidez na digital.", 
                detalhes: `Relógio Prisma: Versatilidade e Robustez.

                        O Prisma é um dos Registradores Eletrônicos de Ponto (REP) mais tradicionais e confiáveis do mercado, projetado para empresas que precisam de um equipamento robusto e com múltiplas formas de identificação.

                      •  Multi-Identificação: Oferece grande flexibilidade, permitindo o registro de ponto via biometria (digital), cartão de proximidade (RFID), código de barras ou senha numérica.

                      •  Impressão de Comprovante: Diferente do modelo facial EVO, o Prisma possui uma impressora térmica integrada de alta velocidade para a emissão do comprovante de registro do trabalhador (ticket).

                      •  Conformidade Legal: Totalmente homologado pelo MTP e em conformidade com as normas da Portaria 671, garantindo segurança jurídica para a empresa.

                      •  Capacidade de Armazenamento: Possui uma memória interna de alta capacidade (MRP) para armazenar registros de ponto por longos períodos, além de suporte para bobinas de papel de grande metragem.

                      •  Durabilidade: Construído com materiais resistentes, é ideal para ambientes com grande fluxo de pessoas, como indústrias, comércios e canteiros de obras.

                        Destaque Principal: Enquanto o EVO 50 foca na tecnologia facial sem contato, o Prisma se destaca pela versatilidade física, sendo a escolha ideal se a sua operação exige a entrega do comprovante em papel e aceita diferentes formas de identificação no mesmo aparelho.`, 
                specs: ["Facial", "Wi-Fi", "Portaria 671"] },
                { id: 'produto 7', 
                nome: "EVO REP-C", 
                img: "/relogioevo.jpg", 
                desc: "Segurança e rapidez na digital.", 
                detalhes: `EVO REP-C: Equilíbrio e Modernidade.

                      O EVO REP-C é um Registrador Eletrônico de Ponto que combina o design moderno da linha EVO com as funcionalidades clássicas de um terminal de alta performance, focado em biometria digital e impressão de tickets.

                    •  Identificação Híbrida: Oferece múltiplas formas de registro, incluindo biometria (digital) de alta precisão, cartão de proximidade (RFID) e teclado para senha.

                    •  Impressora Integrada: Possui compartimento para bobina de papel, realizando a impressão instantânea do comprovante de registro, atendendo às necessidades de fiscalização imediata.

                    •  Conformidade Legal: Equipamento homologado pelo MTP, garantindo total segurança jurídica e técnica conforme as normas vigentes (Portaria 671).

                    •  Interface Amigável: Conta com uma tela colorida e teclado físico intuitivo, facilitando a interação do colaborador mesmo em ambientes de uso intenso.

                    •  Conectividade e Gestão: Permite a exportação de dados via rede (TCP/IP) ou USB, integrando-se facilmente a softwares de tratamento de ponto para uma gestão automatizada.

                      Destaque Principal: O EVO REP-C é o "meio-termo" perfeito: ele traz a estética moderna e o hardware atualizado da linha EVO (como o 50 AFD), mas mantém a impressão de comprovante e a biometria digital, sendo o sucessor ideal para quem gosta da robustez do Prisma mas quer um design mais atual.`, 
                specs: ["Facial", "Wi-Fi", "Portaria 671"] },
                { id: 'produto 6', 
                nome: "EVO 40 AFD", 
                img: "/evo40.png", 
                desc: "Reconhecimento facial de alta precisão.", 
                detalhes: `EVO 40 AFD: Agilidade e Design Minimalista.

                          O EVO 40 AFD é a versão compacta e elegante dos terminais de reconhecimento facial da EVO, projetado para oferecer o máximo de tecnologia ocupando o mínimo de espaço.

                        •  Reconhecimento Facial de Alta Performance: Equipado com tecnologia de ponta para identificação instantânea, mesmo em diferentes condições de iluminação, sem necessidade de contato físico.

                        •  Design Ultra-Compacto: Possui um formato mais vertical e minimalista com acabamento refinado, sendo a escolha ideal para escritórios e recepções que prezam pela estética.

                        •  Conformidade Legal: Equipamento homologado pelo MTP, atendendo integralmente às normas brasileiras para o registro de ponto eletrônico (Portaria 671).

                        •  Segurança Inteligente: Conta com detecção de vivacidade (anti-fake), garantindo que apenas rostos reais (e não fotos) consigam realizar a marcação do ponto.

                        •  Foco em Eficiência: Ideal para empresas que buscam um processo de entrada e saída extremamente rápido, eliminando filas e otimizando o fluxo de colaboradores.

                          Destaque Principal: O EVO 40 AFD diferencia-se do EVO 50 pelo seu tamanho ainda mais reduzido e visual discreto. É a solução perfeita para quem quer a tecnologia facial de elite em um hardware que se integra de forma quase invisível à decoração do ambiente.`, 
                specs: ["Facial", "Wi-Fi", "Portaria 671"] },
              { id: 'produto 4', 
                nome: "IDClass 671", 
                img: "/relogioidclass.jpg", 
                desc: "Segurança e rapidez na digital.", 
                detalhes: `IDClass 671: Performance e Alta Tecnologia.

                            O IDClass 671 (da Control iD) é um dos registradores de ponto mais modernos e vendidos do Brasil, conhecido por seu processamento extremamente rápido e interface amigável.

                          •  Identificação Multibiométrica: Permite o registro via biometria digital (com um sensor de alta precisão), cartões de proximidade (RFID/Smart Card) e senha pelo teclado touch.

                          •  Impressora de Alta Velocidade: Possui uma guilhotina integrada e um sistema de impressão térmica ultra-rápido, otimizando o tempo de saída do comprovante e evitando filas.

                          •  Conformidade Total: É um equipamento homologado pelo MTP e atende rigorosamente a todos os requisitos da Portaria 671, garantindo validade jurídica absoluta.

                          •  Display Touchscreen: Diferencia-se por sua tela colorida sensível ao toque de 2.4", que torna a interação muito mais intuitiva e fácil tanto para o funcionário quanto para o administrador.

                          •  Grande Capacidade: Gerencia milhares de usuários e armazena milhões de registros em sua memória interna, sendo ideal para empresas de qualquer porte.

                            Destaque Principal: O IDClass 671 é o "campeão de performance". Se você busca um equipamento com tela touch, design arrojado e a impressão de ticket mais rápida da categoria, este é o modelo ideal para operações que não podem perder um segundo sequer.`, 
                specs: ["Facial", "Wi-Fi", "Portaria 671"] },
              
              { id: 'produto 5', 
                nome: "BLUE 671", 
                img: "/relogioblue.jpg", 
                desc: "Segurança e rapidez na digital.", 
                detalhes: `BLUE 671: Compacto e Conectado.

                            O BLUE 671 é um registrador de ponto eletrônico (REP) que se destaca pela simplicidade de operação e excelente custo-benefício, focado em pequenas e médias empresas que buscam eficiência em um design horizontal.

                          •  Identificação Ágil: Permite o registro de ponto através de biometria (digital) de alta resolução e cartão de proximidade (RFID), oferecendo opções práticas para o colaborador.

                          •  Gestão de Comprovante: Possui impressora integrada de fácil reposição, emitindo o ticket de confirmação para o funcionário de acordo com as normas vigentes.

                          •  Conformidade Legal: Equipamento totalmente homologado pelo MTP e adequado à Portaria 671, garantindo que sua empresa esteja em dia com a legislação trabalhista.

                          •  Interface Prática: Conta com um display LCD colorido e indicadores luminosos (LEDs) que facilitam a visualização do status da operação, mesmo em ambientes com pouca luz.

                          •  Conectividade: Oferece comunicação via rede (TCP/IP) e porta USB para extração de dados, simplificando a transferência das informações para o software de RH.

                            Destaque Principal: O BLUE 671 é a escolha ideal para quem busca um equipamento de entrada robusto. Ele entrega a segurança da biometria digital e a obrigatoriedade do ticket impresso em um formato horizontal clássico, sendo conhecido por sua durabilidade e facilidade de manutenção.`, 
                specs: ["GPS", "Nuvem", "Facial"] },
                
                { id: 'produto 8', 
                nome: "Relogio Cartográfico", 
                img: "/relogiocartografico.jpg", 
                desc: "Segurança e rapidez na marcação.", 
                detalhes: `Relógio Cartográfico Vega: Simplicidade e Autonomia.

                          O Vega é a solução ideal para empresas que buscam um controle de ponto tradicional, prático e que dispense o uso de computadores ou infraestrutura de rede complexa.

                        •  Registro por Cartão: A marcação é feita de forma mecânica através de cartões de cartolina (cartão de ponto), onde o relógio imprime o horário exato em colunas específicas.

                        •  Independência de Software: Diferente dos modelos digitais, o Vega funciona de forma autônoma. Não requer instalação de softwares, cabos de rede ou conexão com a internet para operar.

                        •  Recursos Inteligentes: Possui puxador automático do cartão, identificação do lado correto da impressão e sinalizador sonoro (sirene interna) para indicar horários de entrada e saída.

                        •  Bateria Interna: Equipado com bateria de backup que mantém o funcionamento e a configuração do horário mesmo em caso de queda de energia.

                        •  Versatilidade: Ideal para pequenas empresas, canteiros de obras, oficinas ou locais onde o registro manual ainda é a forma mais eficiente de gestão.

                          Destaque Principal: O Relógio Vega é o "clássico moderno". Ele elimina qualquer complicação tecnológica: basta ligar na tomada e começar a usar. É a escolha perfeita para quem quer zero custo de manutenção de software e total facilidade na operação.`, 
                specs: ["Facial", "Wi-Fi", "Portaria 671"] },
                
            ].map((prod) => (
                  <div key={prod.id} className="product-card" onClick={() => setSelectedProduct(prod)} style={{ backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', cursor: 'pointer', transition: '0.3s' }}>
                <div style={{ height: '220px', backgroundImage: `url(${prod.img})`, backgroundSize: 'contain',backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
                <div style={{ padding: '25px' }}>
                  <h3>{prod.nome}</h3>
                  <p style={{ fontSize: '14px', color: '#666' }}>{prod.desc}</p>
                  <span style={{ color: '#12bdd5', fontWeight: 'bold' }}>Ver Detalhes +</span>
                </div>
              </div>
            ))}
          </div>
              {selectedProduct && (
                <div style={{ 
                  position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
                  backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', 
                  alignItems: 'center', zIndex: 5000, padding: isMobile ? '10px' : '20px' 
                }}>
                  
                  <div style={{ 
                    backgroundColor: 'white', 
                    borderRadius: '20px', 
                    maxWidth: '900px', 
                    width: '100%', 
                    height: isMobile ? '90vh' : '80vh', // Altura otimizada para mobile
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row', 
                    position: 'relative', 
                    overflow: 'hidden' 
                  }}>
                    
                    {/* Botão Fechar */}
                    <button 
                      onClick={() => setSelectedProduct(null)} 
                      style={{ 
                        position: 'absolute', top: '15px', right: '15px', border: 'none', 
                        background: 'rgba(0,0,0,0.1)', borderRadius: '50%', width: '35px', 
                        height: '35px', cursor: 'pointer', zIndex: 100 
                      }}
                    >
                      X
                    </button>
                    
                    {/* LADO ESQUERDO: IMAGEM FIXA */}
                    <div style={{ 
                      flex: isMobile ? 'none' : '1.2', 
                      backgroundColor: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRight: isMobile ? 'none' : '1px solid #eee',
                      borderBottom: isMobile ? '1px solid #eee' : 'none',
                      height: isMobile ? '250px' : '100%',
                      padding: '20px'
                    }}>
                      <div style={{ 
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${selectedProduct.img})`, 
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        transform: `scale(${selectedProduct.zoom || 1.0})` 
                      }} />
                    </div>

                    {/* LADO DIREITO: CONTEÚDO COM SCROLL E RODAPÉ FIXO */}
                    <div style={{ 
                      flex: '1', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      height: isMobile ? 'calc(100% - 250px)' : '100%', 
                      position: 'relative',
                      backgroundColor: 'white'
                    }}>
                      
                      {/* ÁREA DE TEXTO COM SCROLL */}
                      <div style={{ 
                        flex: 1, 
                        padding: isMobile ? '20px' : '40px', 
                        overflowY: 'auto', 
                        paddingBottom: '100px' // Mantém o texto visível acima do botão
                      }}>
                        <h2 style={{ color: '#002147', marginBottom: '20px', fontSize: isMobile ? '1.5rem' : '1.8rem' }}>
                          {selectedProduct.nome}
                        </h2>
                        <div style={{ 
                          whiteSpace: 'pre-line', 
                          fontSize: '15px', 
                          lineHeight: '1.7', 
                          color: '#444', 
                          textAlign: 'left'
                        }}>
                          {selectedProduct.detalhes}
                        </div>
                      </div>

                      {/* RODAPÉ FIXO COM BOTÃO (Não sobe com o scroll) */}
                      <div style={{ 
                        position: 'absolute', bottom: 0, left: 0, width: '100%', 
                        padding: '20px 30px', backgroundColor: 'white', 
                        borderTop: '1px solid #eee', boxShadow: '0 -5px 15px rgba(0,0,0,0.05)' 
                      }}>
                        <button 
                          style={{ ...styles.contactBtn, width: '100%', margin: 0 }} 
                          onClick={() => window.open(`https://wa.me/5585991220790?text=Olá, Gostaria de adquirir o ${selectedProduct.nome}`)}
                        >
                          Orçamento WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
        </div>
        } />

          {/* Adicione as demais rotas seguindo o mesmo padrão de copiar o seu conteúdo original */}
          <Route path="/acesso" element={
        /* --- PÁGINA DE CONTROLE DE ACESSO --- */
          <div style={{ animation: 'fadeIn 0.6s ease-out', backgroundColor: '#f4f7f9', minHeight: '80vh', paddingBottom: '80px' }}>
          
          {/* CABEÇALHO COMPACTO E CENTRALIZADO */}
          <div style={{ 
            backgroundColor: '#002147', 
            color: 'white', 
            padding: '20px 5%', 
            minHeight: '115px', // Altura reduzida
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            position: 'relative',
            overflow: 'visible' 
          }}>
            
            {/* BLOCO DE TEXTO (CENTRALIZADO NO MEIO DA PÁGINA) */}
            <div style={{ 
              textAlign: 'center', 
              maxWidth: '800px', 
              zIndex: 5 
            }}>
              <h1 style={{ 
                fontSize: isMobile ? '1.8rem' : '2.5rem', 
                fontWeight: '900', 
                margin: 0,
                lineHeight: '1.1' 
              }}>
                CONTROLE DE ACESSO
              </h1>
              <p style={{ 
                opacity: 0.8, 
                marginTop: '5px', 
                fontSize: isMobile ? '0.85rem' : '1rem',
                marginRight: 'auto',
                marginLeft: 'auto'
              }}>
                Soluções inteligentes para garantir a proteção e tranquilidade que seu empreendimento merece.
              </p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', padding: '50px 7%', maxWidth: '1200px', margin: '0 auto' }}>
            {[
              { id: 'acesso 3', 
                nome: "Catraca Henry Lumen facial", 
                img: "/catracahenry.png", 
                desc: "Acesso rápido com 1 ou 2 faciais.", 
                detalhes: `Catraca Henry Lumen Facial: Segurança e Controle de Fluxo.

                            A Lumen Facial é uma solução completa para controle de acesso físico, que une a robustez das catracas Henry com a modernidade do reconhecimento facial para gerenciar a entrada e saída de pessoas.

                          •  Identificação Sem Contato: Equipada com um leitor facial de alta tecnologia, permite o acesso liberado apenas com o rosto, garantindo higiene e rapidez na passagem.

                          •  Resistência e Versatilidade: Projetada com materiais resistentes à água e intempéries, é perfeita tanto para áreas internas quanto externas de condomínios, academias e empresas.

                          •  Segurança Reforçada: O sistema de reconhecimento facial impede o uso de fotos ou vídeos para burlar o acesso, oferecendo um nível de segurança muito superior às chaves ou cartões físicos.

                          •  Mecanismo Suave: Possui um sistema de giro silencioso e confortável, projetado para suportar alto fluxo de pessoas diariamente sem travamentos.

                          •  Design Moderno: Sua coluna em inox e detalhes em cinza conferem um visual profissional que se integra facilmente à estética de recepções e portarias modernas.

                            Destaque Principal: A Catraca Lumen Facial é a escolha definitiva para quem precisa de segurança máxima no controle de fluxo. Ela elimina a necessidade de portaria física para liberação de acesso, automatizando todo o processo com a precisão do reconhecimento facial "touchless".`, 
                specs: ["Frequência 125kHz/13.56MHz", "LED Indicador", "Vedação IP66", "Design Compacto"] 
              },
              { id: 'acesso 1', 
                nome: "Catraca Topdata Facial 4", 
                img: "/catracatopdatafacial.jpg", 
                desc: "Acesso rápido com 1 ou 2 faciais.", 
                detalhes: `Catraca Topdata Facial 4: Tecnologia e Versatilidade.

                            A Topdata Facial 4 é uma solução de controle de acesso robusta, que integra um dos hardwares mais confiáveis do mercado com a praticidade do reconhecimento facial de última geração.

                          •  Reconhecimento Facial Integrado: Permite a liberação de acesso de forma rápida e sem contato, utilizando tecnologia que identifica o usuário mesmo em ambientes com variações de luz.

                          •  Resistência às Intempéries: Equipada com leitor auxiliar resistente à água, é a escolha ideal para áreas externas de condomínios, clubes ou empresas que sofrem exposição ao tempo.

                          •  Múltiplas Formas de Acesso: Além do reconhecimento facial, o equipamento conta com teclado para senhas e leitor para cartões de proximidade, oferecendo redundância e segurança.

                          •  Alta Durabilidade: Fabricada com materiais de alta resistência, foi projetada para suportar um fluxo intenso de passagens diárias com baixo índice de manutenção.

                          •  Instalação Flexível: Pode ser configurada para controlar tanto a entrada quanto a saída, integrando-se facilmente a diversos sistemas de gestão de acesso e portaria.

                            Destaque Principal: A Topdata Facial 4 se diferencia pela sua grande adaptabilidade a ambientes externos. Se o seu projeto precisa de uma catraca que suporte chuva e sol sem perder a precisão do reconhecimento facial, este é o modelo mais indicado.`, 
                specs: ["Frequência 125kHz/13.56MHz", "LED Indicador", "Vedação IP66", "Design Compacto"] 
              },
              { id: 'acesso 6', 
                nome: "Catraca Control Facial Next", 
                img: "/catracacontrolid2facial.jpg", 
                desc: "Acesso rápido com 1 ou 2 faciais.", 
                detalhes: `Catraca Control Facial Next: Inteligência e Design Superior.

                            A Control Facial Next (da Control iD) representa o que há de mais moderno em controle de acesso, combinando um design premiado com o processamento ultra-rápido característico da marca.

                          •  Reconhecimento Facial de Elite: Utiliza algoritmos de última geração que identificam o usuário em menos de 0,5 segundo, mesmo com o uso de máscaras ou acessórios, garantindo fluxo contínuo sem paradas.

                          •  Resistência Total: O leitor facial é resistente à água e poeira, tornando o equipamento ideal para portarias externas, clubes e áreas de lazer expostas ao clima.

                          •  Interface Touchscreen: A catraca possui um display colorido sensível ao toque no topo, que facilita a configuração e oferece uma interação amigável para o usuário final.

                          •  Mecanismo Silencioso: Conta com um sistema de giro motorizado ou por solenoides de alta durabilidade, projetado para operar de forma suave e silenciosa em ambientes de alto tráfego.

                          •  Estética Inovadora: Seu gabinete em aço carbono com pintura epóxi e design vertical moderno valoriza o ambiente, sendo muito utilizada em prédios comerciais de alto padrão e academias.

                            Destaque Principal: A Catraca Control Facial Next é a "topo de linha" em termos de experiência do usuário. Se você busca o equilíbrio perfeito entre uma estética futurista, uma tela touch intuitiva e a velocidade de reconhecimento mais rápida do mercado, este é o modelo ideal.`, 
                specs: ["Frequência 125kHz/13.56MHz", "LED Indicador", "Vedação IP66", "Design Compacto"] 
              },
              { id: 'acesso 7', 
                nome: "Facial ID Face", 
                img: "/idface.jpg", 
                desc: "Acesso rápido e eficiente com precisão.", 
                detalhes: `Facial ID Face: Inteligência e Controle na Palma da Mão.
                
                          O Facial ID Face (da Control iD) é um controlador de acesso autônomo que redefine a segurança através do reconhecimento facial, oferecendo um hardware extremamente potente em um formato compacto.

                          •  Reconhecimento Facial Ultrarrápido: Equipado com algoritmos de deep learning, identifica usuários em frações de segundo, mesmo com acessórios, garantindo uma entrada fluida.

                          •  Segurança Anti-Fraude: Possui tecnologia de detecção de rosto vivo (liveness detection), que impede o acesso através de fotos ou vídeos, garantindo que apenas pessoas reais sejam validadas.

                          •  Interface Touchscreen Intuitiva: Conta com uma tela colorida sensível ao toque de alta resolução, facilitando a interação e permitindo o registro de senhas diretamente no visor.

                          •  Gestão de Grande Escala: Capacidade para gerenciar milhares de faces e armazenar um vasto histórico de logs, ideal para empresas, condomínios e áreas de alta segurança.

                          •  Conectividade Total: Integração nativa via rede (TCP/IP), Wi-Fi (opcional) e suporte para acionamento de fechaduras eletromecânicas ou eletroímãs.

                            Destaque Principal: O Facial ID Face é a escolha ideal se você busca o máximo de tecnologia de reconhecimento facial da Control iD sem a necessidade de uma catraca física. É perfeito para ser fixado em paredes ou portas de vidro, unindo um design futurista com a maior velocidade de processamento da categoria.`, 
                specs: ["Frequência 125kHz/13.56MHz", "LED Indicador", "Vedação IP66", "Design Compacto"] 
              },
              { id: 'acesso 8', 
                nome: "Linha Facial EVO", 
                img: "/banner4.jpg", 
                desc: "Toda a linha 40,50,60,70,80,90 e 100, para maior precição e segurança.", 
                detalhes: `Linha Facial EVO: Excelência em Controle de Acesso.

                            A linha EVO é a solução definitiva para a gestão de acesso inteligente. Utiliza algoritmos de inteligência artificial para garantir que apenas pessoas autorizadas circulem pelos ambientes, oferecendo segurança máxima com tecnologia sem contato.

                          •  Gestão de Fluxo em Tempo Real: Projetada para liberar entradas e saídas de forma instantânea, eliminando gargalos em recepções, portarias de condomínios e áreas restritas.

                          •  Segurança "Touchless" de Alta Precisão: O reconhecimento facial permite o acesso de mãos livres, o que garante maior higiene e uma experiência de usuário moderna e fluida.

                          •  Tecnologia Anti-Fraude (Liveness Detection): Equipados com sensores que identificam profundidade e calor, os terminais impedem o acesso por meio de fotos ou vídeos, garantindo a identidade real do usuário.

                          • Versatilidade de Instalação: Com modelos que variam do ultra-compacto ao robusto, a linha se adapta a qualquer cenário, desde portas de vidro em escritórios até integração com catracas e cancelas.

                          •  Integração Completa: Comunicação nativa com softwares de monitoramento, permitindo o gerenciamento de níveis de acesso por horários, grupos e visitantes, com relatórios detalhados de movimentação.

                            Destaque Principal: A Linha Facial EVO de Acesso foca na experiência do usuário e na proteção patrimonial. É o equipamento ideal para quem busca substituir chaves, crachás e senhas por uma biometria facial rápida, segura e esteticamente impecável.`, 
                specs: ["Frequência 125kHz/13.56MHz", "LED Indicador", "Vedação IP66", "Design Compacto"] 
              },
              { id: 'acesso 9', 
                nome: "Facial TOP DATA", 
                img: "/facialtopdata.png", 
                desc: "Acesso rápido e eficiente com precisão.", 
                detalhes: `Facial TOPDATA: Tecnologia Robusta e Inteligente.

                            O Facial TOPDATA é um terminal de alta performance desenvolvido para quem busca um controle de acesso rigoroso, combinando hardware de alta durabilidade com o que há de mais moderno em biometria facial.

                          •  Identificação "Sem Toque" Instantânea: Realiza a leitura do rosto em menos de 1 segundo, garantindo agilidade no acesso e eliminando a necessidade de crachás ou contato físico, o que aumenta a higiene do local.

                          •  Segurança Avançada (Liveness Detection): Utiliza tecnologia para detectar se o rosto é de uma pessoa viva, impedindo tentativas de acesso fraudulento com fotos, vídeos ou máscaras.

                          •  Gestão de Ambientes Diversos: Excelente para controlar a entrada em escritórios, indústrias, áreas restritas e condomínios, registrando com precisão quem acessou cada local.

                          •  Integração Facilitada: Funciona de forma nativa com softwares de gestão, permitindo a criação de regras de acesso personalizadas por horários, departamentos ou níveis de permissão.

                          •  Visual Moderno e Funcional: Possui uma interface colorida e amigável que facilita a interação do usuário, além de um design elegante que se adapta a recepções e áreas comuns.

                            Destaque Principal: O Facial TOPDATA é reconhecido por sua robustez técnica. É o equipamento ideal para empresas que precisam de um sistema de acesso que não falha e que suporte um fluxo intenso de identificações diárias com extrema confiabilidade.`, 
                specs: ["Silenciosa", "Acabamento em Alumínio", "Compatível com Botoeiras", "12V DC"] 
              },
               { id: 'acesso 10', 
                nome: "Facial HENRY", 
                img: "/facialhenry.png", 
                desc: "Acesso rápido e eficiente com precisão.", 
                detalhes: `Facial HENRY: Tecnologia de Ponta para Controle de Acesso.

                            O terminal Facial HENRY é uma solução robusta e inteligente desenvolvida para garantir que a circulação em ambientes restritos seja feita com total segurança e praticidade, sem a necessidade de chaves ou crachás físicos.

                          •  Reconhecimento Facial Ultrarrápido: Equipado com inteligência artificial para identificar usuários em tempo real, garantindo uma entrada fluida mesmo em locais com grande circulação de pessoas.

                          •  Segurança "Touchless" (Sem Contato): Proporciona uma experiência de acesso higiênica e moderna, permitindo a liberação de portas e bloqueios apenas com a aproximação do rosto.

                          •  Sistema Anti-Fraude Avançado: Possui tecnologia de detecção de vivacidade, que distingue rostos reais de fotos ou vídeos, impedindo tentativas de invasão ou acesso não autorizado.

                          •  Design Moderno e Funcional: Com uma interface visual intuitiva e iluminada, orienta o usuário durante o acesso e se integra esteticamente a recepções, condomínios e áreas corporativas.

                          •  Gestão Estratégica: Permite a integração total com sistemas de monitoramento, facilitando o gerenciamento de permissões de acesso por horários e grupos específicos.

                            Destaque Principal: O Facial HENRY é a escolha ideal para quem busca confiabilidade e rapidez. É o equipamento perfeito para substituir métodos antigos de abertura de portas por uma biometria facial de elite, elevando o nível de segurança patrimonial da empresa ou condomínio.`,
                specs: ["Silenciosa", "Acabamento em Alumínio", "Compatível com Botoeiras", "12V DC"] 
              },
              { id: 'acesso 2', 
                nome: "Toda Linha Intelbras", 
                img: "/intelbras.png", 
                desc: "Todos os produtos para acesso da intelbras, só aqui!", 
                detalhes: `Linha Intelbras: Solução Completa para Segurança de Acesso.

                            Diferente dos terminais faciais, este conjunto representa o "ecossistema" de hardware necessário para garantir a segurança física de portas e portões, combinando praticidade e alta resistência.

                          •  Sistemas de Identificação: Inclui teclados numéricos para senhas e leitores de tags de proximidade (RFID), permitindo que moradores ou funcionários entrem sem o uso de chaves físicas.

                          •  Travamento Magnético: Composto por fechaduras eletroímãs de alta força de tração, garantindo que a porta permaneça bloqueada com total segurança e seja liberada apenas via sistema.

                          •  Componentes de Saída: Acompanha botoeiras de inox para liberação interna rápida, essenciais para uma saída prática e segura de ambientes monitorados.

                          •  Energia e Backup: O kit conta com fonte de alimentação e baterias dedicadas, assegurando que o controle de acesso continue operando normalmente mesmo em situações de queda de energia.

                          •  Alta Durabilidade: Equipamentos projetados pela Intelbras para suportar uso contínuo, com acabamento que evita oxidação e falhas mecânicas.

                            Destaque Principal: A Linha Intelbras é a base para quem deseja automatizar a segurança de portas. É a escolha mais confiável para condomínios e empresas que precisam de um sistema completo, desde o leitor na parede até o travamento magnético da porta, com a garantia de uma das maiores marcas do Brasil.`, 
                specs: ["Silenciosa", "Acabamento em Alumínio", "Compatível com Botoeiras", "12V DC"] 
              },

            ].map((prod) => (
              <div key={prod.id} className="product-card" onClick={() => setSelectedProduct(prod)} style={{ backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', cursor: 'pointer', transition: '0.3s' }}>
                <div style={{ height: '220px', overflow: 'hidden', backgroundColor: '#fff' }}>
      
      {/* DIV DA IMAGEM COM ZOOM INDEPENDENTE */}
      <div style={{ 
        height: '100%', 
        width: '100%',
        backgroundImage: `url(${prod.img})`, 
        backgroundSize: 'contain', 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'center',
        // Aqui o zoom individual: usa o do objeto ou 1.0 como padrão
        transform: `scale(${prod.zoom || 1.0})`, 
        transition: 'transform 0.3s ease' 
      }} />
      
    </div>
                <div style={{ padding: '25px' }}>
                  <h3 style={{ color: '#002147', marginBottom: '10px' }}>{prod.nome}</h3>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>{prod.desc}</p>
                  <span style={{ color: '#12bdd5', fontWeight: 'bold' }}>Ver Detalhes +</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button style={styles.contactBtn} onClick={() => navigateTo('inicio')}>Voltar ao Início</button>
          </div>

          {selectedProduct && (
          <div style={{ 
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
            backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', 
            alignItems: 'center', zIndex: 5000, padding: isMobile ? '10px' : '20px' 
          }}>
            <div style={{ 
              backgroundColor: 'white', borderRadius: '20px', maxWidth: '900px', width: '100%', 
              display: 'flex', flexDirection: isMobile ? 'column' : 'row', 
              position: 'relative', overflow: 'hidden', maxHeight: '90vh' 
            }}>
              
              {/* BOTÃO FECHAR */}
              <button 
                onClick={() => setSelectedProduct(null)} 
                style={{ 
                  position: 'absolute', top: '15px', right: '15px', border: 'none', 
                  background: 'rgba(0,0,0,0.1)', borderRadius: '50%', width: '35px', 
                  height: '35px', cursor: 'pointer', zIndex: 10 
                }}
              >
                X
              </button>

              {/* COLUNA DA ESQUERDA: IMAGEM */}
              <div style={{ 
                flex: isMobile ? '0 0 250px' : '1 1 45%', 
                backgroundColor: '#fff',
                backgroundImage: `url(${selectedProduct.img})`, 
                backgroundSize: 'contain', 
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                borderRight: isMobile ? 'none' : '1px solid #eee'
              }} />

              {/* COLUNA DA DIREITA: CONTEÚDO COM SCROLL */}
              <div style={{ 
                flex: '1 1 55%', 
                display: 'flex', 
                flexDirection: 'column', 
                maxHeight: isMobile ? '400px' : '600px', // Altura máxima para ativar o scroll
                position: 'relative'
              }}>
                
                {/* ÁREA DE TEXTO COM SCROLL */}
                <div style={{ 
                  padding: '30px 30px 100px 30px', // Padding inferior maior para não cobrir o texto com o botão
                  overflowY: 'auto', 
                  flex: 1 
                }}>
                  <h2 style={{ color: '#002147', marginTop: 0, fontSize: '1.8rem' }}>{selectedProduct.nome}</h2>
                  <div style={{ 
                    whiteSpace: 'pre-line', // Mantém as quebras de linha dos seus detalhes
                    color: '#444', 
                    lineHeight: '1.6',
                    fontSize: '0.95rem'
                  }}>
                    {selectedProduct.detalhes}
                  </div>
                </div>

                {/* RODAPÉ FIXO COM BOTÃO */}
                <div style={{ 
                  position: 'absolute', bottom: 0, left: 0, width: '100%', 
                  padding: '20px 30px', backgroundColor: 'white', 
                  borderTop: '1px solid #eee', boxShadow: '0 -5px 15px rgba(0,0,0,0.05)' 
                }}>
                  <button 
                    style={{ ...styles.contactBtn, width: '100%', margin: 0 }} 
                    onClick={() => window.open(`https://wa.me/5585991220790?text=Olá, Gostaria de adquirir o ${selectedProduct.nome}`)}
                  >
                    Orçamento WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
        } />

         <Route path="/sistema ponto" element={
        /* --- PÁGINA DE SOFTWARE DE PONTO --- */
        <div style={{ animation: 'fadeIn 0.6s ease-out', backgroundColor: '#f4f7f9', minHeight: '80vh', paddingBottom: '80px' }}>
          <div style={{ 
            backgroundColor: '#002147', 
            color: 'white', 
            padding: isMobile ? '40px 5%' : '0 5%', 
            minHeight: '150px', // Tamanho padrão do Blog
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            position: 'relative',
            overflow: 'visible' 
          }}>
            <div style={{ textAlign: 'center', zIndex: 5 }}>
            <h1 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: '900', margin: 0 }}>
              CONTROLE DE <br/> PONTO
            </h1>
            <p style={{ opacity: 0.8, marginTop: '5px', fontSize: '1.0rem' }}>
              Otimize a gestão de ponto da sua empresa com a solução mais eficiente e prática do mercado. Controle simplificado, resultados garantidos.
            </p>
          </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', padding: '50px 7%', maxWidth: '1200px', margin: '0 auto' }}>
            {[
              { 
                id: 'sistema 1', 
                nome: "Secullum Ponto Web", 
                img: "/sistemasecullum.jpg", 
                desc: "Gestão completa para seus colaboradores.", 
                detalhes: `Secullum Ponto Web: Gestão de Jornada na Nuvem.

                            O Secullum Ponto Web é uma solução completa e moderna para o tratamento de pontos, permitindo que gestores e profissionais de RH controlem a jornada de trabalho de qualquer lugar, com total segurança jurídica.

                          •  Acesso em Qualquer Lugar (Cloud): Por ser um sistema 100% na nuvem, você acessa as informações via navegador ou aplicativo, sem necessidade de instalações complexas em servidores locais.

                          •  Aplicativo para o Colaborador: Permite o registro de ponto pelo celular para funcionários externos ou em home office, incluindo geolocalização (GPS) e reconhecimento facial (selfie) para validar a marcação.

                          •  Tratamento de Ponto Automatizado: Facilita o fechamento do mês com cálculos automáticos de horas extras, banco de horas, adicional noturno e faltas, reduzindo drasticamente erros manuais.

                          •  Fluxo de Aprovações: O colaborador pode solicitar ajustes, incluir atestados e justificar esquecimentos diretamente pelo app, e o gestor aprova ou nega em poucos cliques.

                          •  Conformidade Legal (Portaria 671): Sistema totalmente adequado às normas do Ministério do Trabalho e Emprego, gerando arquivos fiscais e relatórios auditáveis com rapidez.

                            Destaque Principal: O Secullum Ponto Web é a ferramenta ideal para a descentralização do RH. Ele empodera o gestor e o colaborador, transformando o fechamento do ponto — que antes levava dias — em um processo ágil, transparente e seguro.`, 
                specs: ["Display Touchscreen", "Biometria/Senha/Cartão", "Web Server", "Até 15.000 usuários"] 
              },
              { 
                id: 'sistema 2', 
                nome: "Evo Ponto Web", 
                img: "/evoponto.jpeg", 
                desc: "Gestão completa para seus colaboradores.", 
                detalhes: `Evo Ponto Web: Gestão Inteligente e Mobile.

                            O Evo Ponto Web é uma plataforma moderna voltada para empresas que precisam de mobilidade e dados em tempo real. É o complemento ideal para os terminais da linha Evo, focando na agilidade do RH.

                          •  Aplicativo com Reconhecimento Facial: Permite que o colaborador registre o ponto pelo celular com validação facial e cerca geográfica (GPS), ideal para equipes externas.

                          •  Painel do Gestor: Gráficos intuitivos que mostram atrasos, faltas e horas extras em tempo real, facilitando a tomada de decisão.

                          •  Descentralização: O próprio funcionário pode anexar atestados e solicitar ajustes de ponto pelo app, que chegam para aprovação imediata do supervisor.

                          •  Nuvem Segura: Sem necessidade de servidores internos; os dados ficam protegidos e acessíveis de qualquer navegador 24h por dia.

                          Destaque Principal: O Evo Ponto Web é a solução definitiva para a mobilidade do RH. Ele se destaca pela interface ultra-moderna e pelo aplicativo que utiliza a mesma tecnologia de reconhecimento facial dos relógios físicos, criando um ecossistema único, seguro e extremamente fácil de usar tanto para quem está no escritório quanto para quem trabalha na rua.`, 
                specs: ["Silenciosa", "Acabamento em Alumínio", "Compatível com Botoeiras", "12V DC"] 
              },
              { 
                id: 'sistema 3', 
                nome: "Acuttis Web", 
                img: "/sistemaacuttis.jpg", 
                desc: "Gestão completa para seus colaboradores.", 
                detalhes: `Acuttis Web: Alta Performance em Nuvem.

                            O Acuttis é um software de tratamento de ponto em nuvem reconhecido pela sua interface limpa e rapidez no processamento de grandes volumes de dados, atendendo desde pequenos negócios até grandes corporações.

                          •  Automação de Cálculos: Configuração simplificada de escalas complexas, banco de horas e turnos de revezamento.

                          •  Integração Total: Comunica-se perfeitamente com os principais relógios de ponto do mercado, coletando as marcações de forma automática e transparente.

                          •  Segurança Jurídica: Totalmente adequado às Portarias do MTP, garantindo que o fechamento da folha esteja sempre dentro da lei.

                          •  Portal do Colaborador: Melhora a comunicação interna ao permitir que o funcionário visualize seu espelho de ponto e saldo de horas a qualquer momento.

                            Destaque Principal: Enquanto o Evo Ponto Web se destaca pela excelente experiência mobile e tecnologia facial no app, o Acuttis Web é amplamente elogiado pela sua robustez técnica e facilidade em gerenciar regras de cálculo complexas de RH.`, 
                specs: ["Frequência 125kHz/13.56MHz", "LED Indicador", "Vedação IP66", "Design Compacto"] 
              },
              { 
                id: 'sistema 4', 
                nome: "EZ Point Web", 
                img: "/sistemaez.jpg", 
                desc: "Gestão completa para seus colaboradores.", 
                detalhes: `EzPoint Web: Simplicidade e Eficiência.

                            O EzPoint Web é uma solução de gerenciamento de ponto via internet que foca na objetividade. É ideal para empresas que buscam um sistema prático, rápido de configurar e muito fácil de operar.

                          •  Interface Amigável: Menus diretos que facilitam o aprendizado da equipe de RH, reduzindo o tempo gasto com o fechamento do ponto.

                          •  Monitoramento Remoto: Acompanhe quem está presente na empresa ou quem registrou ponto em home office através de um dashboard centralizado.

                          •  Relatórios Ágeis: Emita espelhos de ponto, relatórios de absenteísmo e exportação para folha de pagamento em poucos segundos.

                          •  Baixo Custo de Manutenção: Por ser 100% web, dispensa atualizações manuais e suporte técnico presencial constante.

                            Destaque Principal: O EzPoint Web é o "custo-benefício" da categoria. Ele entrega todas as obrigatoriedades legais e as ferramentas essenciais de gestão com uma das interfaces mais leves e simples do mercado.`, 
                specs: ["Frequência 125kHz/13.56MHz", "LED Indicador", "Vedação IP66", "Design Compacto"] 
              },
            ].map((prod) => (
              <div key={prod.id} className="product-card" onClick={() => setSelectedProduct(prod)} style={{ backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', cursor: 'pointer', transition: '0.3s' }}>
                <div style={{ height: '220px', backgroundImage: `url(${prod.img})`, backgroundSize: 'contain',backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
                <div style={{ padding: '25px' }}>
                  <h3 style={{ color: '#002147', marginBottom: '10px' }}>{prod.nome}</h3>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>{prod.desc}</p>
                  <span style={{ color: '#12bdd5', fontWeight: 'bold' }}>Ver Detalhes +</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button style={styles.contactBtn} onClick={() => navigateTo('inicio')}>Voltar ao Início</button>
          </div>
            {selectedProduct && (
              <div style={{ 
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
                backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', 
                alignItems: 'center', zIndex: 5000, padding: isMobile ? '10px' : '20px' 
              }}>
                <div style={{ 
                  backgroundColor: 'white', borderRadius: '20px', maxWidth: '900px', width: '100%', 
                  display: 'flex', flexDirection: isMobile ? 'column' : 'row', 
                  position: 'relative', overflow: 'hidden', maxHeight: '90vh' 
                }}>
                  
                  {/* BOTÃO FECHAR (X) */}
                  <button 
                    onClick={() => setSelectedProduct(null)} 
                    style={{ 
                      position: 'absolute', top: '15px', right: '15px', border: 'none', 
                      background: 'rgba(0,0,0,0.1)', borderRadius: '50%', width: '35px', 
                      height: '35px', cursor: 'pointer', zIndex: 10 
                    }}
                  >
                    X
                  </button>

                  {/* LADO ESQUERDO: IMAGEM */}
                  <div style={{ 
                    flex: isMobile ? '0 0 250px' : '1 1 45%', 
                    backgroundColor: '#fff',
                    backgroundImage: `url(${selectedProduct.img})`, 
                    backgroundSize: 'contain', 
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    padding: '20px',
                    borderRight: isMobile ? 'none' : '1px solid #eee'
                  }} />

                  {/* LADO DIREITO: CONTEÚDO */}
                  <div style={{ 
                    flex: '1 1 55%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    position: 'relative',
                    backgroundColor: 'white'
                  }}>
                    
                    {/* CORPO DO TEXTO COM SCROLL */}
                    <div style={{ 
                      padding: '30px 30px 100px 30px', // Espaço extra no fim para o botão não cobrir o texto
                      overflowY: 'auto', 
                      flex: 1 
                    }}>
                      <h2 style={{ color: '#002147', marginTop: 0, fontSize: '1.8rem' }}>{selectedProduct.nome}</h2>
                      <div style={{ 
                        whiteSpace: 'pre-line', // Mantém as quebras de linha e parágrafos
                        color: '#444', 
                        lineHeight: '1.6',
                        fontSize: '0.95rem'
                      }}>
                        {selectedProduct.detalhes}
                      </div>
                    </div>

                    {/* RODAPÉ FIXO COM O BOTÃO */}
                    <div style={{ 
                      position: 'absolute', bottom: 0, left: 0, width: '100%', 
                      padding: '20px 30px', backgroundColor: 'white', 
                      borderTop: '1px solid #eee', boxShadow: '0 -5px 15px rgba(0,0,0,0.05)' 
                    }}>
                      <button 
                        style={{ ...styles.contactBtn, width: '100%', margin: 0 }} 
                        onClick={() => window.open(`https://wa.me/5585991220790?text=Olá, Gostaria de adquirir o ${selectedProduct.nome}`)}
                      >
                        Orçamento WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
         } />

         <Route path="/sistema acesso" element={
        /* --- PÁGINA DE SOFTWARE DE PONTO --- */
        <div style={{ animation: 'fadeIn 0.6s ease-out', backgroundColor: '#f4f7f9', minHeight: '80vh', paddingBottom: '80px' }}>
          <div style={{ 
            backgroundColor: '#002147', 
            color: 'white', 
            padding: isMobile ? '40px 5%' : '0 5%', 
            minHeight: '150px', // Tamanho padrão do Blog
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            position: 'relative',
            overflow: 'visible' 
          }}>
            <div style={{ textAlign: 'center', zIndex: 5 }}>
            <h1 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: '900', margin: 0 }}>
              CONTROLE DE<br/> ACESSO
            </h1>
            <p style={{ opacity: 0.8, marginTop: '5px', fontSize: '1.0rem' }}>
              Otimize a gestão de acesso da sua empresa com a solução mais eficiente e prática do mercado. Controle simplificado, resultados garantidos.
            </p>
          </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', padding: '50px 7%', maxWidth: '1200px', margin: '0 auto' }}>
            {[
              { 
                id: 'Sacesso 1', 
                nome: "Sistema IDSecure", 
                img: "/idsecure.jfif", 
                zoom: "1.4",
                desc: "Gestão completa de portas e usuários.", 
                detalhes: `Sistema iDSecure: Gestão Unificada de Acesso.

                            O iDSecure não é um hardware, mas sim o "cérebro" por trás dos equipamentos. É um software de gestão de acesso baseado em nuvem ou servidor local, projetado para centralizar o controle de todas as suas portas, catracas e usuários em uma única interface.

                          •  Controle Total de Usuários: Permite cadastrar, editar ou bloquear pessoas em massa, definindo exatamente quem pode entrar em qual local e em quais horários.

                          •  Monitoramento em Tempo Real: Visualize instantaneamente cada tentativa de acesso, recebendo alertas de portas abertas, acessos negados ou invasões diretamente no seu computador ou dispositivo móvel.

                          •  Gestão de Visitantes e Terceiros: Facilita o controle de pessoas temporárias, permitindo criar permissões com data e hora de expiração automática.

                          •  Relatórios Inteligentes: Gere logs detalhados de movimentação para auditoria, segurança e otimização do fluxo de pessoas dentro da empresa ou condomínio.

                          •  Integração Nativa: Totalmente compatível com a linha de dispositivos faciais e biométricos (como o iDFace e catracas Control iD), garantindo que a comunicação entre o software e as portas seja rápida e segura.

                            Destaque Principal: O iDSecure é o que transforma o seu hardware em uma solução de segurança estratégica. Se você tem mais de uma porta ou muitos usuários, este sistema é indispensável para organizar a gestão sem precisar configurar cada aparelho manualmente, economizando tempo e aumentando o controle operacional.`,  
                specs: ["Display Touchscreen", "Biometria/Senha/Cartão", "Web Server", "Até 15.000 usuários"] 
              },
              
              { 
                id: 'Sacesso 3', 
                nome: "Sistema SECULLUM ACESSO", 
                img: "/secullumacesso.jfif", 
                zoom: "1.2",
                desc: "Gestão completa de portas e usuários, via web ou app.", 
                detalhes: `Sistema Secullum Acesso: Flexibilidade e Gestão em Tempo Real.

                            O Secullum Acesso é um software de gerenciamento de alta performance, projetado para controlar o fluxo de pessoas e veículos de forma centralizada e intuitiva. Ele serve como a interface de comando para portarias, academias e empresas.

                          •  Multiplataforma e Acessível: Permite o controle total via desktop ou dispositivo móvel (smartphone), possibilitando que gestores monitorem acessos de qualquer lugar.

                          •  Gestão de Visitantes e Provisórios: Facilita o cadastro rápido de prestadores de serviço e visitantes, permitindo a criação de convites com QR Code ou senhas temporárias que expiram automaticamente.

                          •  Integração com Diversas Tecnologias: O sistema é compatível com uma vasta gama de hardwares (catracas, cancelas e portas), aceitando identificação via cartão, chaveiro (tag), biometria digital e facial.

                          •  Módulos de Segurança e Alertas: Emite avisos instantâneos para situações críticas, como tentativas de acesso não autorizadas, portas esquecidas abertas ou lotação máxima de ambientes.

                          •  Relatórios Customizáveis: Oferece logs completos de entradas e saídas para auditorias internas, permitindo filtrar dados por data, horário, setor ou tipo de usuário.

                            Destaque Principal: O diferencial do Secullum Acesso é a sua facilidade de uso aliada à robustez. É o software ideal para quem precisa de uma interface clara e organizada para lidar com um grande volume de usuários sem abrir mão da agilidade operacional no dia a dia.`, 
                specs: ["Frequência 125kHz/13.56MHz", "LED Indicador", "Vedação IP66", "Design Compacto"] 
              },
            ].map((prod) => (
              <div key={prod.id} className="product-card" onClick={() => setSelectedProduct(prod)} style={{ backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', cursor: 'pointer', transition: '0.3s' }}>
                <div style={{ height: '220px', backgroundImage: `url(${prod.img})`, backgroundSize: 'contain',backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
                <div style={{ padding: '25px' }}>
                  <h3 style={{ color: '#002147', marginBottom: '10px' }}>{prod.nome}</h3>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>{prod.desc}</p>
                  <span style={{ color: '#12bdd5', fontWeight: 'bold' }}>Ver Detalhes +</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
          </div>

          {selectedProduct && (
              <div style={{ 
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
                backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', 
                alignItems: 'center', zIndex: 5000, padding: isMobile ? '10px' : '20px' 
              }}>
                <div style={{ 
                  backgroundColor: 'white', borderRadius: '20px', maxWidth: '900px', width: '100%', 
                  display: 'flex', flexDirection: isMobile ? 'column' : 'row', 
                  position: 'relative', overflow: 'hidden', maxHeight: '90vh' 
                }}>
                  
                  {/* BOTÃO FECHAR */}
                  <button 
                    onClick={() => setSelectedProduct(null)} 
                    style={{ 
                      position: 'absolute', top: '15px', right: '15px', border: 'none', 
                      background: 'rgba(0,0,0,0.1)', borderRadius: '50%', width: '35px', 
                      height: '35px', cursor: 'pointer', zIndex: 10 
                    }}
                  >
                    X
                  </button>

                  {/* COLUNA DA ESQUERDA: IMAGEM FIXA */}
                  <div style={{ 
                    flex: isMobile ? '0 0 250px' : '1 1 45%', 
                    backgroundColor: '#fff',
                    backgroundImage: `url(${selectedProduct.img})`, 
                    backgroundSize: 'contain', 
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    padding: '20px',
                    borderRight: isMobile ? 'none' : '1px solid #eee'
                  }} />

                  {/* COLUNA DA DIREITA: CONTEÚDO E RODAPÉ */}
                  <div style={{ 
                    flex: '1 1 55%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    position: 'relative',
                    backgroundColor: 'white',
                    overflow: 'hidden' // Garante que nada saia do limite da coluna
                  }}>
                    
                    {/* ÁREA DE TEXTO COM SCROLL (Igual aos Relógios) */}
                    <div style={{ 
                      padding: '30px 30px 100px 30px', 
                      overflowY: 'auto', 
                      flex: 1 
                    }}>
                      <h2 style={{ color: '#002147', marginTop: 0, fontSize: '1.8rem' }}>{selectedProduct.nome}</h2>
                      <div style={{ 
                        whiteSpace: 'pre-line', 
                        color: '#444', 
                        lineHeight: '1.6',
                        fontSize: '0.95rem'
                      }}>
                        {selectedProduct.detalhes}
                      </div>
                    </div>

                    {/* RODAPÉ FIXO COM BOTÃO (Não sobe com o scroll) */}
                    <div style={{ 
                      position: 'absolute', bottom: 0, left: 0, width: '100%', 
                      padding: '20px 30px', backgroundColor: 'white', 
                      borderTop: '1px solid #eee', boxShadow: '0 -5px 15px rgba(0,0,0,0.05)' 
                    }}>
                      <button 
                        style={{ ...styles.contactBtn, width: '100%', margin: 0 }} 
                        onClick={() => window.open(`https://wa.me/5585991220790?text=Olá, Gostaria de adquirir o ${selectedProduct.nome}`)}
                      >
                        Orçamento WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
         } />

         <Route path="/suprimentos" element={
        /* --- PÁGINA DE SUPRIMENTOS --- */
        <div style={{ animation: 'fadeIn 0.6s ease-out', backgroundColor: '#f4f7f9', minHeight: '80vh', paddingBottom: '80px' }}>
          
          <div style={{ 
            backgroundColor: '#002147', 
            color: 'white', 
            padding: isMobile ? '40px 5%' : '0 5%', 
            minHeight: '150px', // Tamanho padrão do Blog
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            position: 'relative',
            overflow: 'visible' 
          }}>
            <div style={{ textAlign: 'center', zIndex: 5 }}>
            <h1 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: '900', margin: 0 }}>
              SUPRIMENTOS
            </h1>
            <p style={{ opacity: 0.8, marginTop: '5px', fontSize: '1.0rem' }}>
              Tudo que você precisa para sua empresa esta aqui.
            </p>
          </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', padding: '50px 7%', maxWidth: '1200px', margin: '0 auto' }}>
            {[
              { 
                id: 'suprimento 1', 
                nome: "Bobina térmica", 
                img: "/bobina.jpg", 
                desc: "As melhores bobinas para seu relógio de ponto.", 
                detalhes: `Bobina Térmica.

                          •  Item indispensável para relógios de ponto que emitem comprovantes fiscais. Garante a durabilidade da impressão e o perfeito funcionamento do mecanismo impressor do equipamento.

                          •  Alta Qualidade: Papel de excelente procedência que evita o desgaste prematuro da cabeça térmica do relógio.

                          •  Conformidade: Produzida nos padrões exigidos pela legislação vigente para garantir a legibilidade dos dados por anos.`, 
                specs: ["Display Touchscreen", "Biometria/Senha/Cartão", "Web Server", "Até 15.000 usuários"] 
              },
              { 
                id: 'suprimento 2', 
                nome: "Cartão Proximidade", 
                img: "/cartao.jpg", 
                desc: "Mais particidade e alta resistência.", 
                detalhes: `Cartão de Proximidade (RFID).

                          •  A solução prática e durável para identificação em sistemas de acesso e ponto. Ideal para locais onde a biometria não é a primeira opção.

                          •  Alta Resistência: Material robusto projetado para o uso diário intenso sem perder a eficácia de leitura.

                          •  Compatibilidade: Funciona perfeitamente com leitores de 125kHz ou Mifare, dependendo da configuração do seu sistema.`, 
                specs: ["Silenciosa", "Acabamento em Alumínio", "Compatível com Botoeiras", "12V DC"] 
              },
              { 
                id: 'suprimento 3', 
                nome: "Fonte Para Relógio de Ponto( Todas as Marcas Aqui!).", 
                img: "/fontehenry.jpg", 
                desc: "A força que o seu relógio precisa.", 
                detalhes: `Fonte de Alimentação Rep: HENRY-HEXA/PRISMA;TOPDATA;CONTROL ID;PROVEU;RW TECH;EVO.

                          •  A peça chave para a estabilidade elétrica dos seus equipamentos Henry. Uma fonte confiável evita quebras e travamentos no sistema.

                          •  Energia Estável: Desenvolvida especificamente para suportar a demanda energética dos modelos Hexa e Prisma.

                          •  Segurança: Protege o hardware interno contra oscilações simples da rede elétrica.`, 
                specs: ["Frequência 125kHz/13.56MHz", "LED Indicador", "Vedação IP66", "Design Compacto"] 
              },
              { 
                id: 'suprimento 4', 
                nome: "Cartão Cartografico", 
                img: "/cartografico.jpg", 
                desc: "Praticidade e simplicidade no dia a dia.", 
                detalhes: `Cartão Cartográfico.

                          •  O suprimento clássico para empresas que utilizam o tradicional sistema de marcação mecânica.

                          •  Padrão Universal: Compatível com os principais relógios cartográficos do mercado, como o Henry Vega.

                          •  Organização: Layout claro para registro de entradas, saídas e conferência visual rápida da jornada.`, 
                specs: ["Silenciosa", "Acabamento em Alumínio", "Compatível com Botoeiras", "12V DC"] 
              },
              { 
                id: 'suprimento 5', 
                nome: "Leitor Biométrico de Mesa Control ID", 
                img: "/leitorbiometricomesa.jpg", 
                desc: "Rapidez e eficiência para seu RH.", 
                detalhes: `Leitor Biométrico de Mesa Control iD.

                          •  A ferramenta perfeita para agilizar o cadastro de digitais diretamente no computador, sem precisar deslocar o colaborador até o relógio de ponto ou catraca.

                          •  Precisão Control iD: Sensor de alta resolução que captura as digitais com nitidez superior.

                          •  Conexão USB: Plug-and-play, facilitando o uso imediato em recepções ou salas de RH.`, 
                specs: ["Silenciosa", "Acabamento em Alumínio", "Compatível com Botoeiras", "12V DC"] 
              },
              { 
                id: 'suprimento 6', 
                nome: "Chapeira para Cartografico", 
                img: "/chapera.jpg", 
                desc: "Chapeira para 25/50/100 cartões.", 
                detalhes: `Chapeira para Cartográfico.

                          •  O acessório de organização essencial para manter os cartões de ponto protegidos e em ordem numérica ou alfabética.

                          •  Durabilidade: Construída em material resistente, disponível em diversas capacidades (25, 50 ou 100 lugares).

                          •  Gestão Visual: Facilita para o funcionário encontrar seu cartão e para o gestor identificar ausências rapidamente.`, 
                specs: ["Silenciosa", "Acabamento em Alumínio", "Compatível com Botoeiras", "12V DC"] 
              },
              { 
                id: 'suprimento 7', 
                nome: "Chachás Personalizados", 
                img: "/cracha.jpg", 
                desc: "Quer chachá com a sua cara? Venha conferir.", 
                detalhes: `Crachás Personalizados.

                          •  Eleve o nível de profissionalismo da sua empresa com identificação visual customizada.

                          •  Identidade Visual: Impressão de alta qualidade com logomarca, foto e dados do colaborador.

                          •  Versatilidade: Pode ser utilizado apenas como identificação visual ou integrado com tecnologia de proximidade.`, 
                specs: ["Silenciosa", "Acabamento em Alumínio", "Compatível com Botoeiras", "12V DC"] 
              },
              { 
                id: 'suprimento 8', 
                nome: "Cartucho de Impressão para Cartográfico", 
                img: "/cartografico1.jpg", 
                desc: "Quer o melhor pro seu cartográfico? Venha conferir.", 
                detalhes: `Cartucho de Impressão para Cartográfico.

                          •  A fita de impressão necessária para manter os registros do seu relógio Henry Vega sempre nítidos e legíveis.

                          •  Longa Duração: Fita de nylon de alta resistência que garante milhares de impressões antes da troca.

                          •  Fácil Substituição: Sistema de encaixe simples para que o próprio usuário possa realizar a manutenção.`, 
                specs: ["Silenciosa", "Acabamento em Alumínio", "Compatível com Botoeiras", "12V DC"] 
              },

            ].map((prod) => (
              <div key={prod.id} className="product-card" onClick={() => setSelectedProduct(prod)} style={{ backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', cursor: 'pointer', transition: '0.3s' }}>
                <div style={{ height: '220px', backgroundImage: `url(${prod.img})`, backgroundSize: 'contain',backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
                <div style={{ padding: '25px' }}>
                  <h3 style={{ color: '#002147', marginBottom: '10px' }}>{prod.nome}</h3>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>{prod.desc}</p>
                  <span style={{ color: '#12bdd5', fontWeight: 'bold' }}>Ver Detalhes +</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button style={styles.contactBtn} onClick={() => navigateTo('inicio')}>Voltar ao Início</button>
          </div>
              {selectedProduct && (
                <div style={{ 
                  position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
                  backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', 
                  alignItems: 'center', zIndex: 5000, padding: isMobile ? '10px' : '20px' 
                }}>
                  
                  <div style={{ 
                    backgroundColor: 'white', 
                    borderRadius: '20px', 
                    maxWidth: '900px', 
                    width: '100%', 
                    height: isMobile ? '90vh' : '80vh', 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row', 
                    position: 'relative', 
                    overflow: 'hidden' 
                  }}>
                    
                    {/* Botão Fechar */}
                    <button 
                      onClick={() => setSelectedProduct(null)} 
                      style={{ 
                        position: 'absolute', top: '15px', right: '15px', border: 'none', 
                        background: 'rgba(0,0,0,0.1)', borderRadius: '50%', width: '35px', 
                        height: '35px', cursor: 'pointer', zIndex: 100 
                      }}
                    >
                      X
                    </button>
                    
                    {/* LADO ESQUERDO: IMAGEM FIXA */}
                    <div style={{ 
                      flex: isMobile ? 'none' : '1.2', 
                      backgroundColor: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRight: isMobile ? 'none' : '1px solid #eee',
                      borderBottom: isMobile ? '1px solid #eee' : 'none',
                      height: isMobile ? '250px' : '100%',
                      padding: '20px'
                    }}>
                      <div style={{ 
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${selectedProduct.img})`, 
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        transform: `scale(${selectedProduct.zoom || 1.0})` 
                      }} />
                    </div>

                    {/* LADO DIREITO: TEXTO COM SCROLL E BOTÃO FIXO */}
                    <div style={{ 
                      flex: '1', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      height: isMobile ? 'calc(100% - 250px)' : '100%', 
                      position: 'relative',
                      backgroundColor: 'white'
                    }}>
                      
                      {/* ÁREA DE TEXTO (SCROLL) */}
                      <div style={{ 
                        flex: 1, 
                        padding: isMobile ? '25px' : '40px', 
                        overflowY: 'auto', 
                        paddingBottom: '100px' // Espaço para o texto não sumir atrás do botão
                      }}>
                        <h2 style={{ color: '#002147', marginBottom: '20px', fontSize: isMobile ? '1.5rem' : '1.8rem' }}>
                          {selectedProduct.nome}
                        </h2>
                        <div style={{ 
                          whiteSpace: 'pre-line', 
                          fontSize: '15px', 
                          lineHeight: '1.7', 
                          color: '#444', 
                          textAlign: 'left'
                        }}>
                          {selectedProduct.detalhes}
                        </div>
                      </div>

                      {/* RODAPÉ FIXO COM BOTÃO (Não sobe com o scroll) */}
                      <div style={{ 
                        position: 'absolute', bottom: 0, left: 0, width: '100%', 
                        padding: '20px 30px', backgroundColor: 'white', 
                        borderTop: '1px solid #eee', boxShadow: '0 -5px 15px rgba(0,0,0,0.05)' 
                      }}>
                        <button 
                          style={{ ...styles.contactBtn, width: '100%', margin: 0 }} 
                          onClick={() => window.open(`https://wa.me/5585991220790?text=Olá, Gostaria de adquirir o ${selectedProduct.nome}`)}
                        >
                          Orçamento WhatsApp
                        </button>
                      </div>

                    </div>

                  </div>
                </div>
              )}
        </div>
         } />
         <Route path="/servicos" element={
        <div style={{ animation: 'fadeIn 0.6s ease-out', backgroundColor: '#f4f7f9', minHeight: '80vh', paddingBottom: '80px' }}>
          <div style={{ 
            backgroundColor: '#002147', 
            color: 'white', 
            padding: isMobile ? '20px 5%' : '0 5%', 
            minHeight: isMobile ? '120px' : '150px', // Reduzido de 220px para 150px
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            position: 'relative',
            marginTop: '0px', // Aumentado um pouco para não cortar a cabeça do avatar que sobe
            overflow: 'visible' 
          }}>
          <div style={{ textAlign: isMobile ? 'center' : 'center', flex: 1 }}>
            <h1 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: '900', margin: 0, lineHeight: '1' }}>
              SERVIÇOS
            </h1>
            <p style={{ opacity: 0.8, marginTop: '5px', fontSize: '1rem' }}>Estamos prontos para atender a sua demanda, conte com a gente.</p>
          </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', padding: '50px 7%', maxWidth: '1200px', margin: '0 auto' }}>
            {[
              { id: 'serviço 1', 
                nome: "Atualização Catraca para Facial", 
                img: "projetofacial.jpg", 
                desc: "Projeto para Academias,escolas e muito mais.", 
                detalhes: `Atualização de Catraca para Facial.

                          •  Transforme seu sistema antigo em uma solução de última geração sem precisar trocar todo o seu hardware.

                          •  Modernização Inteligente: Adaptamos leitores faciais de alta precisão em catracas já existentes, garantindo mais agilidade e higiene no acesso.

                          •  Foco em Resultados: Ideal para academias e escolas que precisam eliminar o uso de cartões e biometria digital, reduzindo filas e custos de manutenção.

                          •  Upgrade Tecnológico: Sua recepção ganha um aspecto futurista e muito mais segurança contra fraudes.

                            Destaque: A solução perfeita para quem quer modernidade com economia, aproveitando a estrutura que já possui para dar um salto em tecnologia facial.`, 
                specs: ["GPS", "Nuvem", "Facial"] }, 
              { id: 'serviço 2', 
                nome: "Manutenção e Instalação de Relógio de Ponto", 
                img: "/banner5.png", 
                desc: "Quer um serviço de qualidade? Venha conferir.", 
                detalhes: `Manutenção e Instalação de Relógio de Ponto.

                          •  Suporte técnico especializado para garantir que a gestão da jornada da sua empresa nunca pare.

                          •  Instalação Técnica: Configuramos seu equipamento seguindo rigorosamente as normas da Portaria 671, garantindo a validade jurídica dos registros.

                          •  Manutenção Corretiva e Preventiva: Equipe treinada para resolver falhas de comunicação, problemas de impressão e ajustes de sensores de forma rápida.

                          •  Treinamento Completo: Além de instalar, capacitamos sua equipe para operar o equipamento e o software de gestão com total autonomia.

                            Destaque: Garantimos que sua empresa esteja 100% dentro da lei, eliminando riscos jurídicos e paradas operacionais no controle de ponto.`, 
                specs: ["Facial", "Wi-Fi", "Portaria 671"] },
              { id: 'serviço 3', 
                nome: "Manutenção e Instalação de Catracas de Acesso", 
                img: "/servico5.jpg", 
                desc: "Quer mais segurança para sua empresa? Venha conferir..", 
                detalhes: `Manutenção e Instalação de Catracas de Acesso.

                          •  Garanta a segurança patrimonial com bloqueios físicos sempre em perfeito estado de funcionamento.

                          •  Projetos Sob Medida: Analisamos o fluxo do seu ambiente para instalar a catraca no local estratégico, garantindo organização e segurança.

                          •  Revisão Mecânica e Eletrônica: Realizamos o ajuste de giros, lubrificação de solenoides e calibração de sensores para evitar travamentos indesejados.

                          •  Suporte Especializado: Seja para condomínios, empresas ou áreas industriais, entregamos um serviço limpo, rápido e com garantia de funcionamento.

                            Destaque: Focamos na continuidade do seu fluxo, assegurando que suas catracas operem de forma suave, silenciosa e sem interrupções no acesso.`, 
                specs: ["Digital", "Impressora", "USB"] },
                   
              
            ].map((prod) => (
              <div key={prod.id} className="product-card" onClick={() => setSelectedProduct(prod)} style={{ backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', cursor: 'pointer', transition: '0.3s' }}>
                <div style={{ height: '220px', backgroundImage: `url(${prod.img})`, backgroundSize: 'contain',backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
                <div style={{ padding: '25px' }}>
                  <h3>{prod.nome}</h3>
                  <p style={{ fontSize: '14px', color: '#666' }}>{prod.desc}</p>
                  <span style={{ color: '#12bdd5', fontWeight: 'bold' }}>Ver Detalhes +</span>
                </div>
              </div>
            ))}
          </div>
            {selectedProduct && (
              <div style={{ 
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
                backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', 
                alignItems: 'center', zIndex: 5000, padding: isMobile ? '10px' : '20px' 
              }}>
                
                <div style={{ 
                  backgroundColor: 'white', 
                  borderRadius: '20px', 
                  maxWidth: '900px', 
                  width: '100%', 
                  height: isMobile ? '90vh' : '80vh', 
                  display: 'flex', 
                  flexDirection: isMobile ? 'column' : 'row', 
                  position: 'relative', 
                  overflow: 'hidden' 
                }}>
                  
                  {/* Botão Fechar */}
                  <button 
                    onClick={() => setSelectedProduct(null)} 
                    style={{ 
                      position: 'absolute', top: '15px', right: '15px', border: 'none', 
                      background: 'rgba(0,0,0,0.1)', borderRadius: '50%', width: '35px', 
                      height: '35px', cursor: 'pointer', zIndex: 100 
                    }}
                  >
                    X
                  </button>
                  
                  {/* LADO ESQUERDO: IMAGEM FIXA (Não rola) */}
                  <div style={{ 
                    flex: isMobile ? 'none' : '1.2', 
                    backgroundColor: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRight: isMobile ? 'none' : '1px solid #eee',
                    borderBottom: isMobile ? '1px solid #eee' : 'none',
                    height: isMobile ? '250px' : '100%',
                    padding: '20px'
                  }}>
                    <div style={{ 
                      width: '100%',
                      height: '100%',
                      backgroundImage: `url(${selectedProduct.img})`, 
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      transform: `scale(${selectedProduct.zoom || 1.0})` 
                    }} />
                  </div>

                  {/* LADO DIREITO: CONTEÚDO COM SCROLL E BOTÃO FIXO */}
                  <div style={{ 
                    flex: '1', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: isMobile ? 'calc(100% - 250px)' : '100%', 
                    position: 'relative',
                    backgroundColor: 'white'
                  }}>
                    
                    {/* ÁREA DE TEXTO (Com barra de rolagem) */}
                    <div style={{ 
                      flex: 1, 
                      padding: isMobile ? '25px' : '40px', 
                      overflowY: 'auto', 
                      paddingBottom: '100px' // Espaço para o botão não sobrepor o final do texto
                    }}>
                      <h2 style={{ color: '#002147', marginBottom: '20px', fontSize: isMobile ? '1.5rem' : '1.8rem' }}>
                        {selectedProduct.nome}
                      </h2>
                      <div style={{ 
                        whiteSpace: 'pre-line', 
                        fontSize: '15px', 
                        lineHeight: '1.7', 
                        color: '#444', 
                        textAlign: 'left'
                      }}>
                        {selectedProduct.detalhes}
                      </div>
                    </div>

                    {/* RODAPÉ FIXO COM BOTÃO (Não sobe com o scroll) */}
                      <div style={{ 
                        position: 'absolute', bottom: 0, left: 0, width: '100%', 
                        padding: '20px 30px', backgroundColor: 'white', 
                        borderTop: '1px solid #eee', boxShadow: '0 -5px 15px rgba(0,0,0,0.05)' 
                      }}>
                        <button 
                          style={{ ...styles.contactBtn, width: '100%', margin: 0 }} 
                          onClick={() => window.open(`https://wa.me/5585991220790?text=Olá, Gostaria de adquirir o ${selectedProduct.nome}`)}
                        >
                          Orçamento WhatsApp
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            )}
        </div>
         } />

         <Route path="/blog" element={
  <div style={{ animation: 'fadeIn 0.6s ease-out', backgroundColor: '#f4f7f9', minHeight: '80vh', paddingBottom: '80px' }}>
    
    {/* CABEÇALHO COM VÍDEO AVATAR 3D À ESQUERDA */}
    <div style={{ 
      backgroundColor: '#002147', 
      color: 'white', 
      padding: isMobile ? '20px 5%' : '0 5%', 
      minHeight: isMobile ? '120px' : '200px', // Reduzido de 220px para 150px
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      position: 'relative',
      overflow: 'visible' 
    }}>
      
      {/* CONTAINER FLEX */}
        <div style={{ 
          width: '100%',
          maxWidth: '1200px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          flexDirection: isMobile ? 'column' : 'row', // No mobile, o texto fica em cima
          zIndex: 10
        }}>

          {/* 1. TEXTO À ESQUERDA (VEM PRIMEIRO NO CÓDIGO) */}
          <div style={{ textAlign: isMobile ? 'center' : 'center', flex: 1 }}>
            <h1 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: '900', margin: 0, lineHeight: '1' }}>
              OPEN <br /> RESPONDE
            </h1>
            <p style={{ opacity: 0.8, marginTop: '5px', fontSize: '1rem' }}>Suas dúvidas acabam aqui!</p>
          </div>

          {/* 2. AVATAR MP4 À DIREITA */}
          <div style={{
            width: isMobile ? '160px' : '180px',
            position: 'absolute',
            right: isMobile ? '10px' : ' 5%', // Fica na esquerda
            display: 'flex',
            justifyContent: 'flex-end', // Alinha no final (direta)
            marginRight: isMobile ? '0' : '200px' // Faz ele "vazar" para a direita
          }}>
            <video 
              src="/duvida1.webm" 
              autoPlay loop muted playsInline 
              style={{
                width: '100%',
                display: 'block',
                transform: isMobile ? 'translateY(10px)' : 'translateY(-10px) scale(2.2)', 
                filter: 'drop-shadow(-15px 15px 25px rgba(0,0,0,0.5))', // Sombra invertida para a esquerda
                pointerEvents: 'none'
              }}
            />
          </div>

        </div>
      </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', padding: '50px 7%', maxWidth: '1200px', margin: '0 auto' }}>
            {[
              { id: 'blog 1', 
                nome: "Por que preciso ter um sistema de ponto?", 
                img: "/blog1.jpeg",
                zoom: "1.1",
                fit: "contain",
                videoUrl: "/blog1.mp4",
                desc: "Vamos conferir?.", 
                detalhes: `Ter um sistema de ponto homologado não é apenas cumprir uma norma é proteger sua empresa e garantir os direitos de quem trabalha com você.

                          Com ele, a jornada é registrada de forma segura, transparente e dentro das regras da Portaria 671.

                          Isso evita erros, reduz conflitos trabalhistas, fortalece a confiança interna e assegura que horas extras, banco de horas e faltas sejam calculadas corretamente.

                          Quando a empresa escolhe o caminho certo, todos ganham:
                          • Mais organização
                          • Mais segurança jurídica
                          • Mais transparência
                          • Menos riscos de questionamentos

                          Quer orientação para escolher o melhor sistema para sua estrutura? Fale com a gente e teste sem compromisso.`,
                specs: ["Facial", "Wi-Fi", "Portaria 671"] },
              { id: 'blog 2', 
                nome: "Módulo facial é um tablet?", 
                img: "/blog2.jpeg",
                zoom: "1.1", 
                fit: "contain",
                desc: "Quer saber a diferença de um módulo homologado para um simples tablet?", 
                detalhes: `Nem todo equipamento garante a segurança e a validade das marcações.

                            A diferença está na homologação e na tecnologia usada.

                            O módulo facial homologado foi desenvolvido especialmente para o controle de ponto ele oferece precisão, confiabilidade e total conformidade com a Portaria 671.
                            Com ele, você tem:
                            ✅ Reconhecimento facial rápido e seguro;
                            ✅ Armazenamento dos dados de forma protegida;
                            ✅ Redução de fraudes e erros;
                            ✅ Conexão direta com o sistema de gestão de ponto.

                            Já tablets e celulares podem ser utilizados, mas apenas se o sistema for homologado. Fora disso, há risco de invalidação das marcações e problemas trabalhistas.

                            Invista em um módulo facial homologado e garanta mais segurança, agilidade e tranquilidade para sua empresa.`, 
                specs: ["Digital", "Impressora", "USB"] },
              { id: 'blog 3', 
                nome: "Informação 3", 
                img: "/blog.png", 
                desc: "Controle via Smartphone.", 
                detalhes: "Perfeito para funcionários externos com GPS e Selfie.", 
                specs: ["GPS", "Nuvem", "Facial"] },   
              
            ].map((prod) => (
  <div key={prod.id} className="product-card" onClick={() => setSelectedProduct(prod)} style={{ backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', cursor: 'pointer', transition: '0.3s' }}>
    
    {/* ÁREA DE MÍDIA UNIFICADA PARA TODOS OS CARDS */}
    <div style={{ 
      height: '220px', 
      position: 'relative', 
      overflow: 'hidden', 
      backgroundColor: '#fff', // Fundo sempre branco
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Verifica se a string existe e termina com mp4 */}
      {prod.img && prod.img.toLowerCase().endsWith('.mp4') ? (
        <video 
          src={prod.img} 
          autoPlay 
          loop 
          muted 
          playsInline 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'contain', // Mantém a proporção sem distorcer
            objectPosition: 'center',
            transform: `scale(${prod.zoom || 1.1})`, // Aplica o zoom em todos os vídeos
            display: 'block'
          }} 
        />
      ) : (
        <div style={{ 
          height: '100%', 
          width: '100%',
          backgroundImage: `url(${prod.img})`, 
          backgroundSize: prod.fit || 'cover', // Imagens estáticas preenchem tudo
          backgroundRepeat: 'no-repeat', 
          backgroundPosition: 'center',
          transform: `scale(${prod.zoom || 1})`, 
          transition: 'transform 0.3s ease' // Suaviza se você quiser adicionar hover depois
        }} />
      )}
    </div>

    <div style={{ padding: '25px' }}>
      <h3>{prod.nome}</h3>
      <p style={{ fontSize: '14px', color: '#666' }}>{prod.desc}</p>
      <span style={{ color: '#12bdd5', fontWeight: 'bold' }}>Vamos Conferir +</span>
    </div>
  </div>
))}
          </div>

          {selectedProduct && (
  <div style={{ 
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
    backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', justifyContent: 'center', 
    alignItems: 'center', zIndex: 6000, padding: isMobile ? '10px' : '20px' 
  }}>
    
    <div style={{ 
      backgroundColor: 'white', 
      borderRadius: '20px', 
      maxWidth: '1100px', 
      width: '100%', 
      display: 'flex', 
      flexDirection: isMobile ? 'column' : 'row', // Empilha no celular
      position: 'relative', 
      maxHeight: '90vh', // Limita a altura do modal a 90% da tela
      overflow: 'hidden', // Esconde o que vazar do container principal
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)' 
    }}>
      
      {/* BOTÃO FECHAR FIXO NO TOPO */}
      <button 
        onClick={() => setSelectedProduct(null)} 
        style={{ 
          position: 'absolute', top: '15px', right: '15px', border: 'none', 
          background: '#eee', borderRadius: '50%', width: '40px', height: '40px', 
          cursor: 'pointer', zIndex: 100 
        }}
      >X</button>
      
      {/* LADO DA MÍDIA (VÍDEO OU IMAGEM) */}
      <div style={{ 
        flex: isMobile ? '0 0 250px' : '1 1 600px', 
        backgroundColor: '#000', 
        display: 'flex', 
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        {selectedProduct.videoUrl ? (
          <iframe
            width="100%"
            height="100%"
            src={`${selectedProduct.videoUrl}?autoplay=1`}
            title="Mídia"
            frameBorder="0"
            allow="autoplay"
            style={{ 
              minHeight: isMobile ? '250px' : '500px',
              transform: `scale(${selectedProduct.zoom || 1})` 
            }}
          ></iframe>
        ) : (
          <div style={{ 
            width: '100%', 
            height: '100%', 
            minHeight: isMobile ? '250px' : '500px',
            backgroundImage: `url(${selectedProduct.img})`, 
            backgroundSize: selectedProduct.fit || 'cover', 
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transform: `scale(${selectedProduct.zoom || 1})`
          }} />
        )}
      </div>

      {/* LADO DO TEXTO COM SCROLL (ROLAGEM) */}
      <div style={{ 
        flex: '1 1 400px', 
        padding: isMobile ? '25px' : '45px', 
        display: 'flex', 
        flexDirection: 'column', 
        backgroundColor: '#fff',
        overflowY: 'auto', // ATIVA A ROLAGEM AQUI
        maxHeight: isMobile ? '400px' : 'none' // No mobile, limita a área de texto para não sumir
      }}>
        <h2 style={{ color: '#002147', fontSize: '2rem', marginBottom: '20px' }}>{selectedProduct.nome}</h2>
        
        <p style={{ 
          fontSize: '1.1rem', 
          lineHeight: '1.7', 
          color: '#444', 
          whiteSpace: 'pre-line', // Respeita as estrofes
          marginBottom: '30px'
        }}>
          {selectedProduct.detalhes}
        </p>
        
        <button 
          style={{ 
            ...styles.contactBtn, 
            width: '100%', 
            padding: '18px', 
            fontSize: '16px',
            marginTop: 'auto' // Empurra o botão para o final do conteúdo
          }} 
          onClick={() => window.open(`https://wa.me/5585991220790?text=Olá, vi o conteúdo sobre ${selectedProduct.nome}`)}
        >
          Solicitar Consultoria no WhatsApp
        </button>
      </div>

    </div>
  </div>
)}
        </div>
        } />

        </Routes>

        {/* FOOTER (Original Corrigido) */}
<footer style={{ marginTop: 'auto' }}>
  <div style={styles.footerTop}>
    
    {/* Bloco da Esquerda: Chamada */}
    <div style={{ textAlign: 'left' }}>
      <p style={{ opacity: 0.8, fontSize: '14px' }}>Vamos trabalhar juntos?</p>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Fale com a OPEN !</h2>
    </div>

    {/* Bloco da Direita: Container Flex para as Colunas */}
    <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', textAlign: 'left' }}>
      
      {/* Coluna Atendimento */}
      <div>
        <strong>Atendimento</strong><br/>
        <span style={{ fontSize: '14px', opacity: 0.7 }}>Segunda - Sexta: 08h às 17h</span>
      </div>

      {/* Coluna Contatos */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <strong>Contatos</strong>
        <span style={{ fontSize: '14px', opacity: 0.7 }}>(85) 99122-0790</span>
        <span style={{ fontSize: '14px', opacity: 0.7 }}>(85) 99655-1724</span>
        <span style={{ fontSize: '14px', opacity: 0.7 }}>comercial@opencomtecnologia.com.br</span>
      </div>

    </div> {/* Fecha o container Flex da direita */}
  </div> {/* Fecha o footerTop */}
        
        <div style={styles.footerMain}>
          <div style={styles.footerColumn}>
            <h3 style={styles.footerTitle}>Opencom Soluções</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'rgba(255,255,255,0.7)' }}>
              Especialistas em segurança eletrônica e ponto eletrônico.
            </p>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'rgba(255,255,255,0.7)' }}>
              Na Opencom Tecnologia estamos comprometidos em oferecer soluções inovadoras e de qualidade.
              Com uma equipe dedicada, proporcionamos excelência em Relógios de Ponto, Controle de Acesso, Suporte Técnico e Suprimentos,
              assegurando que nossos clientes tenham a base tecnológica essencial para alcançar seus objetivos com eficiência e segurança.
            </p>
          </div>
          <div style={styles.footerColumn}>
            <h3 style={styles.footerTitle}>Menu Rápido</h3>
           <Link to="/" style={styles.footerLink}>Home</Link>
            <Link to="/sobre" style={styles.footerLink}>Sobre Nós</Link>
            <Link to="/relogios" style={styles.footerLink}>Relógios</Link>
            <Link to="/acesso" style={styles.footerLink}>Acesso</Link>
            <Link to="/softwares" style={styles.footerLink}>Software de ponto</Link>
            <Link to="/suprimentos" style={styles.footerLink}>Suprimentos</Link>
            <Link to="/servicos" style={styles.footerLink}>Serviços</Link>
            <Link to="/blog" style={styles.footerLink}>Blog</Link>
          </div>
          <div style={styles.footerColumn}>
            <h3 style={styles.footerTitle}>Serviços</h3>
            <Link to="/acesso" style={styles.footerLink}>Controle de Acesso</Link>
            <Link to="/relogios" style={styles.footerLink}>Controle de Ponto</Link>
            <Link to="/acesso" style={styles.footerLink}>Catracas e Torniquetes</Link>
          </div>
        </div>
        
        <div style={{ backgroundColor: '#000', padding: '20px', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
          OPENCOM TECNOLOGIA © 2026 - Todos os direitos reservados. Created by Opencom Tecnologia.
        </div>
      </footer>
       
      </div>
    </Router>
  );
}