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
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: slide.fit || 'cover', color: 'white', backgroundImage: `url("${slide.img}")` }}>
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
  // Se o caminho for '/sobre', não renderiza nada
  if (location.pathname === '/sobre' || selectedProduct ) return null;


  return (
    <Link 
      to="/sobre" 
      style={{ 
        position: 'fixed', 
        bottom: '30px', 
        left: '30px', 
        zIndex: 9999, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textDecoration: 'none',
        cursor: 'pointer'
      }}
    >
      {/* BALÃO DE FALA */}
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
        Quer me conhecer?
        {/* TRIÂNGULO DO BALÃO */}
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

      {/* VÍDEO DO BONECO (Substituindo a Imagem) */}
      <video 
        src="/boneco.mp4" 
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
          backgroundColor: '#000' // Fundo preto para combinar com o boneco
          
        }} 
      />
    </Link>
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
              <div style={{ backgroundColor: '#002147', color: 'white', padding: '100px 5%', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: '900' }}>Nossa História</h1>
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
            minHeight: '165px', // Altura reduzida
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            position: 'relative',
            overflow: 'visible' 
          }}>
            
            {/* CONTAINER DO AVATAR (Posicionado absolutamente para não mover o texto) */}
            <div style={{
              position: 'absolute',
              left: isMobile ? '10px' : '20%', // Fica na esquerda
              bottom: '-10px', // Encosta na base
              width: isMobile ? '100px' : '180px',
              zIndex: 10
            }}>
              <video 
                src="/bonecorelogio4.mp4" 
                autoPlay loop muted playsInline 
                style={{
                  width: '100%',
                  display: 'block',
                  // O EFEITO 3D: Sobe para fora da borda superior
                  transform: isMobile ? 'translateX (0px)' : 'translateY(35Px) scale(0.7)', 
                  filter: 'drop-shadow(10px 10px 20px rgba(0,0,0,0.5))',
                  pointerEvents: 'none'
                }}
              />
            </div>

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
                RELÓGIOS DE <br/> PONTO
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
                detalhes: "Equipado com impressora térmica. Ideal para fluxos intensos.", 
                specs: ["Digital", "Impressora", "USB"] },
                { id: 'produto 2', 
                nome: "EVO 50 AFD", 
                img: "/relogioevo50.jpg", 
                desc: "Reconhecimento facial de alta precisão.", 
                detalhes: "Homologado pelo MTP. Reconhecimento rápido e seguro.", 
                specs: ["Facial", "Wi-Fi", "Portaria 671"] },
                { id: 'produto 3', 
                nome: "Relógio Prisma", 
                img: "/relogioprisma.jpg", 
                desc: "Reconhecimento facial de alta precisão.", 
                detalhes: "Homologado pelo MTP. Reconhecimento rápido e seguro.", 
                specs: ["Facial", "Wi-Fi", "Portaria 671"] },
                { id: 'produto 7', 
                nome: "EVO REP-C", 
                img: "/relogioevo.jpg", 
                desc: "Reconhecimento facial de alta precisão.", 
                detalhes: "Homologado pelo MTP. Reconhecimento rápido e seguro.", 
                specs: ["Facial", "Wi-Fi", "Portaria 671"] },
                { id: 'produto 6', 
                nome: "EVO 40 AFD", 
                img: "/evo40.png", 
                desc: "Reconhecimento facial de alta precisão.", 
                detalhes: "Homologado pelo MTP. Reconhecimento rápido e seguro.", 
                specs: ["Facial", "Wi-Fi", "Portaria 671"] },
              { id: 'produto 4', 
                nome: "IDClass 671", 
                img: "/relogioidclass.jpg", 
                desc: "Reconhecimento facial de alta precisão.", 
                detalhes: "Homologado pelo MTP. Reconhecimento rápido e seguro.", 
                specs: ["Facial", "Wi-Fi", "Portaria 671"] },
              
              { id: 'produto 5', 
                nome: "BLUE 671", 
                img: "/relogioblue.jpg", 
                desc: "Controle via Smartphone.", 
                detalhes: "Perfeito para funcionários externos com GPS e Selfie.", 
                specs: ["GPS", "Nuvem", "Facial"] },
                
                { id: 'produto 8', 
                nome: "Relogio Cartográfico", 
                img: "/relogiocartografico.jpg", 
                desc: "Reconhecimento facial de alta precisão.", 
                detalhes: "Homologado pelo MTP. Reconhecimento rápido e seguro.", 
                specs: ["Facial", "Wi-Fi", "Portaria 671"] },
                { id: 'produto 9', 
                nome: "Relógio Prisma Facial", 
                img: "/relogioprismafacial.jpg", 
                desc: "Reconhecimento facial de alta precisão.", 
                detalhes: "Homologado pelo MTP. Reconhecimento rápido e seguro.", 
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
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 5000, padding: '20px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '20px', maxWidth: '800px', width: '100%', display: 'flex', flexWrap: 'wrap', position: 'relative', overflow: 'hidden' }}>
              <button onClick={() => setSelectedProduct(null)} style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: '#eee', borderRadius: '50%', width: '35px', height: '35px', cursor: 'pointer', zIndex: 10 }}>X</button>
              
              {/* CONTAINER DA IMAGEM NO MODAL COM ZOOM INDEPENDENTE */}
              <div style={{ 
                flex: '1 1 350px', 
                minHeight: '350px', 
                overflow: 'hidden', // Garante que o zoom não saia do limite da metade do modal
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ 
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${selectedProduct.img})`, 
                  backgroundSize: 'contain', // No modal, o contain costuma ser melhor para ver o produto todo
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  // APLICA O ZOOM INDEPENDENTE AQUI TAMBÉM:
                  transform: `scale(${selectedProduct.zoom || 1.0})` 
                }} />
              </div>

              <div style={{ flex: '1 1 350px', padding: '40px' }}>
                <h2 style={{ color: '#002147' }}>{selectedProduct.nome}</h2>
                <p>{selectedProduct.detalhes}</p>
                <button style={{ ...styles.contactBtn, width: '100%', marginTop: '20px' }} onClick={() => window.open(`https://wa.me/5585991220790?text=Olá, Gostaria de adquerir o ${selectedProduct.nome}`)}>Orçamento WhatsApp</button>
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
          <div style={{ 
            backgroundColor: '#002147', 
            color: 'white', 
            padding: isMobile ? '40px 5%' : '0 5%', 
            minHeight: '200px', // Tamanho padrão do Blog
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            position: 'relative',
            overflow: 'visible' 
          }}>
            <div style={{ textAlign: 'center', zIndex: 5 }}>
            <h1 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: '900', margin: 0 }}>
              CONTROLE DE <br/> ACESSO
            </h1>
            <p style={{ opacity: 0.8, marginTop: '5px', fontSize: '1rem' }}>
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
                detalhes: "Leitor auxiliar resistente à água, perfeito para áreas externas ou internas de condomínios.", 
                specs: ["Frequência 125kHz/13.56MHz", "LED Indicador", "Vedação IP66", "Design Compacto"] 
              },
              { id: 'acesso 1', 
                nome: "Catraca Topdata Facial 4", 
                img: "/catracatopdatafacial.jpg", 
                desc: "Acesso rápido com 1 ou 2 faciais.", 
                detalhes: "Leitor auxiliar resistente à água, perfeito para áreas externas ou internas de condomínios.", 
                specs: ["Frequência 125kHz/13.56MHz", "LED Indicador", "Vedação IP66", "Design Compacto"] 
              },
              { id: 'acesso 6', 
                nome: "Catraca Control ID 1 ou 2 Faciais", 
                img: "/catracacontrolid2facial.jpg", 
                desc: "Acesso rápido via cartão ou chaveiro.", 
                detalhes: "Leitor auxiliar resistente à água, perfeito para áreas externas ou internas de condomínios.", 
                specs: ["Frequência 125kHz/13.56MHz", "LED Indicador", "Vedação IP66", "Design Compacto"] 
              },
              { id: 'acesso 7', 
                nome: "Facial ID Face", 
                img: "/idface.jpg", 
                desc: "Acesso rápido via cartão ou chaveiro.", 
                detalhes: "Leitor auxiliar resistente à água, perfeito para áreas externas ou internas de condomínios.", 
                specs: ["Frequência 125kHz/13.56MHz", "LED Indicador", "Vedação IP66", "Design Compacto"] 
              },
              { id: 'acesso 2', 
                nome: "Fechadura Eletroímã", 
                img: "/fechadura.jpg", 
                desc: "Força de tração de até 300kg.", 
                detalhes: "Ideal para portas de vidro, madeira ou metal. Alta durabilidade e baixo consumo de energia.", 
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
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 5000, padding: '20px' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '20px', maxWidth: '800px', width: '100%', display: 'flex', flexWrap: 'wrap', position: 'relative', overflow: 'hidden' }}>
                <button onClick={() => setSelectedProduct(null)} style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: '#eee', borderRadius: '50%', width: '35px', height: '35px', cursor: 'pointer' }}>X</button>
                <div style={{ flex: '1 1 350px', minHeight: '350px', backgroundImage: `url(${selectedProduct.img})`, backgroundSize: 'cover' }} />
                <div style={{ flex: '1 1 350px', padding: '40px' }}>
                  <h2 style={{ color: '#002147' }}>{selectedProduct.nome}</h2>
                  <p>{selectedProduct.detalhes}</p>
                  <button style={{ ...styles.contactBtn, width: '100%', marginTop: '20px' }} onClick={() => window.open(`https://wa.me/5585991220790?text=Olá, Gostaria de adquerir o ${selectedProduct.nome}`)}>Orçamento WhatsApp</button>
                </div>
              </div>
            </div>
          )}
        </div>
        } />

         <Route path="/sistema ponto" element={
        /* --- PÁGINA DE SOFTWARE DE PONTO --- */
        <div style={{ animation: 'fadeIn 0.6s ease-out', backgroundColor: '#f4f7f9', minHeight: '80vh', paddingBottom: '80px' }}>
          <div style={{ backgroundColor: '#002147', color: 'white', padding: '60px 5%', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', margin: 0 }}>Controle de Ponto</h1>
            <p style={{ opacity: 0.8, marginTop: '10px' }}>Otimize a gestão de ponto da sua empresa com a solução mais eficiente e prática do mercado. Controle simplificado, resultados garantidos.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', padding: '50px 7%', maxWidth: '1200px', margin: '0 auto' }}>
            {[
              { 
                id: 'sistema 1', 
                nome: "Secullum Ponto Web", 
                img: "/sistemasecullum.jpg", 
                desc: "Gestão completa de portas e usuários.", 
                detalhes: "Capacidade para controlar múltiplos leitores e fechaduras. Comunicação via rede e software de gestão integrado.", 
                specs: ["Display Touchscreen", "Biometria/Senha/Cartão", "Web Server", "Até 15.000 usuários"] 
              },
              { 
                id: 'sistema 2', 
                nome: "Evo Ponto Web", 
                img: "/evoponto.jpeg", 
                desc: "Força de tração de até 300kg.", 
                detalhes: "Ideal para portas de vidro, madeira ou metal. Alta durabilidade e baixo consumo de energia.", 
                specs: ["Silenciosa", "Acabamento em Alumínio", "Compatível com Botoeiras", "12V DC"] 
              },
              { 
                id: 'sistema 3', 
                nome: "Acuttis Web", 
                img: "/sistemaacuttis.jpg", 
                desc: "Acesso rápido via cartão ou chaveiro.", 
                detalhes: "Leitor auxiliar resistente à água, perfeito para áreas externas ou internas de condomínios.", 
                specs: ["Frequência 125kHz/13.56MHz", "LED Indicador", "Vedação IP66", "Design Compacto"] 
              },
              { 
                id: 'sistema 4', 
                nome: "EZ Point Web", 
                img: "/sistemaez.jpg", 
                desc: "Acesso rápido via cartão ou chaveiro.", 
                detalhes: "Leitor auxiliar resistente à água, perfeito para áreas externas ou internas de condomínios.", 
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
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 5000, padding: '20px' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '20px', maxWidth: '800px', width: '100%', display: 'flex', flexWrap: 'wrap', position: 'relative', overflow: 'hidden' }}>
                <button onClick={() => setSelectedProduct(null)} style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: '#eee', borderRadius: '50%', width: '35px', height: '35px', cursor: 'pointer' }}>X</button>
                <div style={{ flex: '1 1 350px', minHeight: '350px', backgroundImage: `url(${selectedProduct.img})`, backgroundSize: 'cover' }} />
                <div style={{ flex: '1 1 350px', padding: '40px' }}>
                  <h2 style={{ color: '#002147' }}>{selectedProduct.nome}</h2>
                  <p>{selectedProduct.detalhes}</p>
                  <button style={{ ...styles.contactBtn, width: '100%', marginTop: '20px' }} onClick={() => window.open(`https://wa.me/5585991220790?text=Olá, Gostaria de adquerir o ${selectedProduct.nome}`)}>Orçamento WhatsApp</button>
                </div>
              </div>
            </div>
          )}
        </div>
         } />

         <Route path="/sistema acesso" element={
        /* --- PÁGINA DE SOFTWARE DE PONTO --- */
        <div style={{ animation: 'fadeIn 0.6s ease-out', backgroundColor: '#f4f7f9', minHeight: '80vh', paddingBottom: '80px' }}>
          <div style={{ backgroundColor: '#002147', color: 'white', padding: '60px 5%', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', margin: 0 }}>Controle de Acesso</h1>
            <p style={{ opacity: 0.8, marginTop: '10px' }}>Otimize a gestão de acesso da sua empresa com a solução mais eficiente e prática do mercado. Controle simplificado, resultados garantidos.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', padding: '50px 7%', maxWidth: '1200px', margin: '0 auto' }}>
            {[
              { 
                id: 'Sacesso 1', 
                nome: "Sistema IDSecure", 
                img: "/idsecure.jfif", 
                zoom: "1.4",
                desc: "Gestão completa de portas e usuários.", 
                detalhes: "Capacidade para controlar múltiplos leitores e fechaduras. Comunicação via rede e software de gestão integrado.", 
                specs: ["Display Touchscreen", "Biometria/Senha/Cartão", "Web Server", "Até 15.000 usuários"] 
              },
              
              { 
                id: 'Sacesso 3', 
                nome: "Sistema SECULLUM ACESSO", 
                img: "/secullumacesso.jfif", 
                zoom: "1.2",
                desc: "Acesso rápido via cartão ou chaveiro.", 
                detalhes: "Leitor auxiliar resistente à água, perfeito para áreas externas ou internas de condomínios.", 
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
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 5000, padding: '20px' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '20px', maxWidth: '800px', width: '100%', display: 'flex', flexWrap: 'wrap', position: 'relative', overflow: 'hidden' }}>
                <button onClick={() => setSelectedProduct(null)} style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: '#eee', borderRadius: '50%', width: '35px', height: '35px', cursor: 'pointer' }}>X</button>
                <div style={{ flex: '1 1 350px', minHeight: '350px', backgroundImage: `url(${selectedProduct.img})`, backgroundSize: 'cover' }} />
                <div style={{ flex: '1 1 350px', padding: '40px' }}>
                  <h2 style={{ color: '#002147' }}>{selectedProduct.nome}</h2>
                  <p>{selectedProduct.detalhes}</p>
                  <button style={{ ...styles.contactBtn, width: '100%', marginTop: '20px' }} onClick={() => window.open(`https://wa.me/5585991220790?text=Olá, Gostaria de adquerir o ${selectedProduct.nome}`)}>Orçamento WhatsApp</button>
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
            minHeight: '200px', // Tamanho padrão do Blog
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            position: 'relative',
            overflow: 'visible' 
          }}>
            <div style={{ textAlign: 'center', zIndex: 5 }}>
            <h1 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: '900', margin: 0 }}>
              SUPRIMENTOS PARA PONTO <br/> ACESSO E SEGURANÇA.
            </h1>
            <p style={{ opacity: 0.8, marginTop: '5px', fontSize: '1.0rem' }}>
              Encontre os suprimentos que você precisa com qualidade e agilidade. Oferecemos uma ampla variedade de produtos para atender suas
              demandas, garantindo excelência e praticidade em cada compra.
            </p>
          </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', padding: '50px 7%', maxWidth: '1200px', margin: '0 auto' }}>
            {[
              { 
                id: 'suprimento 1', 
                nome: "Bobina térmica", 
                img: "/bobina.jpg", 
                desc: "Gestão completa de portas e usuários.", 
                detalhes: "Capacidade para controlar múltiplos leitores e fechaduras. Comunicação via rede e software de gestão integrado.", 
                specs: ["Display Touchscreen", "Biometria/Senha/Cartão", "Web Server", "Até 15.000 usuários"] 
              },
              { 
                id: 'suprimento 2', 
                nome: "Cartão Proximidade", 
                img: "/cartao.jpg", 
                desc: "Força de tração de até 300kg.", 
                detalhes: "Ideal para portas de vidro, madeira ou metal. Alta durabilidade e baixo consumo de energia.", 
                specs: ["Silenciosa", "Acabamento em Alumínio", "Compatível com Botoeiras", "12V DC"] 
              },
              { 
                id: 'suprimento 3', 
                nome: "Fonte Rep. HEXA/PRISMA", 
                img: "/fontehenry.jpg", 
                desc: "Acesso rápido via cartão ou chaveiro.", 
                detalhes: "Leitor auxiliar resistente à água, perfeito para áreas externas ou internas de condomínios.", 
                specs: ["Frequência 125kHz/13.56MHz", "LED Indicador", "Vedação IP66", "Design Compacto"] 
              },
              { 
                id: 'suprimento 4', 
                nome: "Cartão Cartografico", 
                img: "/cartografico.jpg", 
                desc: "Força de tração de até 300kg.", 
                detalhes: "Ideal para portas de vidro, madeira ou metal. Alta durabilidade e baixo consumo de energia.", 
                specs: ["Silenciosa", "Acabamento em Alumínio", "Compatível com Botoeiras", "12V DC"] 
              },
              { 
                id: 'suprimento 5', 
                nome: "Leitor Biométrico de Mesa Control ID", 
                img: "/leitorbiometricomesa.jpg", 
                desc: "Força de tração de até 300kg.", 
                detalhes: "Ideal para portas de vidro, madeira ou metal. Alta durabilidade e baixo consumo de energia.", 
                specs: ["Silenciosa", "Acabamento em Alumínio", "Compatível com Botoeiras", "12V DC"] 
              },
              { 
                id: 'suprimento 6', 
                nome: "Chapeira para Cartografico", 
                img: "/chapera.jpg", 
                desc: "Chapeira para 25/50/100 cartões.", 
                detalhes: "Ideal para portas de vidro, madeira ou metal. Alta durabilidade e baixo consumo de energia.", 
                specs: ["Silenciosa", "Acabamento em Alumínio", "Compatível com Botoeiras", "12V DC"] 
              },
              { 
                id: 'suprimento 7', 
                nome: "Chachás Personalizados", 
                img: "/cracha.jpg", 
                desc: "Quer chachá com a sua cara? Venha conferir.", 
                detalhes: "Ideal para portas de vidro, madeira ou metal. Alta durabilidade e baixo consumo de energia.", 
                specs: ["Silenciosa", "Acabamento em Alumínio", "Compatível com Botoeiras", "12V DC"] 
              },
              { 
                id: 'suprimento 8', 
                nome: "Cartucho de Impressão para Cartográfico", 
                img: "/cartografico1.jpg", 
                desc: "Quer o melhor pro seu cartográfico? Venha conferir.", 
                detalhes: "Ideal para portas de vidro, madeira ou metal. Alta durabilidade e baixo consumo de energia.", 
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
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 5000, padding: '20px' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '20px', maxWidth: '800px', width: '100%', display: 'flex', flexWrap: 'wrap', position: 'relative', overflow: 'hidden' }}>
                <button onClick={() => setSelectedProduct(null)} style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: '#eee', borderRadius: '50%', width: '35px', height: '35px', cursor: 'pointer' }}>X</button>
                <div style={{ flex: '1 1 350px', minHeight: '350px', backgroundImage: `url(${selectedProduct.img})`, backgroundSize: 'cover' }} />
                <div style={{ flex: '1 1 350px', padding: '40px' }}>
                  <h2 style={{ color: '#002147' }}>{selectedProduct.nome}</h2>
                  <p>{selectedProduct.detalhes}</p>
                  <button style={{ ...styles.contactBtn, width: '100%', marginTop: '20px' }} onClick={() => window.open(`https://wa.me/5585991220790?text=Olá, Gostaria de adquerir o ${selectedProduct.nome}`)}>Orçamento WhatsApp</button>
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
            minHeight: isMobile ? '120px' : '200px', // Reduzido de 220px para 150px
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            position: 'relative',
            marginTop: '0px', // Aumentado um pouco para não cortar a cabeça do avatar que sobe
            overflow: 'visible' 
          }}>
          <div style={{ textAlign: isMobile ? 'center' : 'center', flex: 1 }}>
            <h1 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: '900', margin: 0, lineHeight: '1' }}>
              NOSSOS <br /> SERVIÇOS
            </h1>
            <p style={{ opacity: 0.8, marginTop: '5px', fontSize: '1rem' }}>Na Opencom Tecnologia, estamos prontos para simplificar processos e garantir resultados.</p>
          </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', padding: '50px 7%', maxWidth: '1200px', margin: '0 auto' }}>
            {[
              { id: 'serviço 1', 
                nome: "Atualização Catraca para Facial", 
                img: "projetofacial.jpg", 
                desc: "Projeto para Academias,escolas e muito mais.", 
                detalhes: "Perfeito para funcionários externos com GPS e Selfie.", 
                specs: ["GPS", "Nuvem", "Facial"] }, 
              { id: 'serviço 2', 
                nome: "Manutenção e Instalação de Relógio de Ponto", 
                img: "/banner5.png", 
                desc: "Quer um serviço de qualidade? Venha conferir.", 
                detalhes: "Homologado pelo MTP. Reconhecimento rápido e seguro.", 
                specs: ["Facial", "Wi-Fi", "Portaria 671"] },
              { id: 'serviço 3', 
                nome: "Manutenção e Instalação de Catracas de Acesso", 
                img: "/servico5.jpg", 
                desc: "Quer mais segurança para sua empresa? Venha conferir..", 
                detalhes: "Instalamos sua catraca e damos manutenção pra sua maior segurança.", 
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
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 5000, padding: '20px' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '20px', maxWidth: '800px', width: '100%', display: 'flex', flexWrap: 'wrap', position: 'relative', overflow: 'hidden' }}>
                <button onClick={() => setSelectedProduct(null)} style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: '#eee', borderRadius: '50%', width: '35px', height: '35px', cursor: 'pointer' }}>X</button>
                <div style={{ flex: '1 1 350px', minHeight: '350px', backgroundImage: `url(${selectedProduct.img})`, backgroundSize: 'cover' }} />
                <div style={{ flex: '1 1 350px', padding: '40px' }}>
                  <h2 style={{ color: '#002147' }}>{selectedProduct.nome}</h2>
                  <p>{selectedProduct.detalhes}</p>
                  <button style={{ ...styles.contactBtn, width: '100%', marginTop: '20px' }} onClick={() => window.open(`https://wa.me/5585991220790?text=Olá, Gostaria de adquerir o ${selectedProduct.nome}`)}>Orçamento WhatsApp</button>
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