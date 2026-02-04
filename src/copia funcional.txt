import React, { useState, useEffect, memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// --- COMPONENTE DE CONTAGEM REGRESSIVA ---
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

// --- COMPONENTE DO SLIDER (MEMOIZADO) ---
const MainSlider = memo(() => {
  const slides = [
    { img: "/banner0.jpg", title: "PROJETOS PERSONALIZADOS", sub: "Segurança Inteligente" },
    { img: "/banner5.jpeg", title: "MANUTENÇÃO", sub: "Assistência autorizada do seu relógio" },
    { img: "/banner2.jpg", title: "SISTEMA DE PONTO WEB", sub: "Gestão na Nuvem" },
    { img: "/banner3.jpg", title: "RECONHECIMENTO FACIAL", sub: "Mais Praticidade" },
    { img: "/banner4.jpg", title: "LEITORES MODERNOS", sub: "Alta Performance" }
  ];

  return (
    <div style={{ width: '100%', height: '75vh', backgroundColor: '#000', overflow: 'hidden' }}>
      <Swiper 
        modules={[Autoplay, Pagination, Navigation]} 
        autoplay={{ delay: 5000, disableOnInteraction: false }} 
        pagination={{ clickable: true }} 
        navigation 
        loop 
        style={{ height: '100%' }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div style={{ 
              height: '100%', width: '100%', display: 'flex', flexDirection: 'column', 
              justifyContent: 'center', alignItems: 'center', backgroundPosition: 'center', 
              backgroundRepeat: 'no-repeat', backgroundSize: 'contain', color: 'white',
              backgroundImage: `url("${slide.img}")` 
            }}>
              <div style={{ backgroundColor: 'rgba(0, 33, 71, 0.4)', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 10%' }}>
                <h2 style={{ fontSize: '3rem', textAlign: 'center', margin: 0, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>{slide.title}</h2>
                <p style={{ fontSize: '1.5rem', marginTop: '10px' }}>{slide.sub}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

const styles = {
  mainContainer: { margin: 0, padding: 0, fontFamily: 'Segoe UI, sans-serif', minHeight: '100vh', width: '100vw', backgroundColor: '#fff', overflowX: 'hidden' },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 5%', height: '90px', backgroundColor: '#ffffff', borderBottom: '4px solid #2cc4db', position: 'sticky', top: 0, zIndex: 2000, width: '100%', boxSizing: 'border-box' },
  navBtn: { backgroundColor: 'transparent', border: 'none', color: '#002147', fontWeight: '700', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', padding: '15px 0' },
  contactBtn: { color: '#fff', backgroundColor: '#002147', padding: '10px 25px', borderRadius: '5px', fontWeight: '700', border: 'none', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' },
  dropdownWrapper: { position: 'relative', display: 'inline-block' },
  dropdownMenu: { position: 'absolute', top: '100%', right: 0, backgroundColor: '#002147', minWidth: '240px', borderRadius: '8px', padding: '10px', zIndex: 3000, display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' },
  dropdownItem: { padding: '12px 15px', color: 'white', textDecoration: 'none', cursor: 'pointer', borderRadius: '5px', fontSize: '14px', transition: '0.3s', backgroundColor: 'rgba(255,255,255,0.05)', border: 'none', textAlign: 'left' },
  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', padding: '40px 5% 60px' },
  productCard: { border: '1px solid #eee', borderRadius: '15px', padding: '20px', textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', backgroundColor: '#fff', cursor: 'pointer' },
  pageTitle: { textAlign: 'center', color: '#002147', fontSize: '2.5rem', margin: '50px 0' }
};

function App() {
  const [currentPage, setCurrentPage] = useState('inicio'); 
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedPromo, setSelectedPromo] = useState(null);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setActiveDropdown(null);
    window.scrollTo(0, 0);
  };

  // LISTA DE PROMOÇÕES COM FOTOS E DESCRIÇÕES
  const listaPromocoes = [
    {
      nome: "Módulo Facial EVO 50",
      preco: "R$ 1.500,00",
      tag: "DESTAQUE",
      foto: "/banner0.jpg",
      descricao: "Reconhecimento facial de alta tecnologia com detecção de vivacidade. Ideal para empresas que buscam segurança e rapidez no registro de ponto sem contato físico.",
      dataLimite: "2026-03-01T23:59:59"
    },
    {
      nome: "Henry HEXA ADV B",
      preco: "R$ 1.980,00",
      tag: "OFERTA",
      foto: "/banner4.jpg",
      descricao: "Relógio de ponto eletrônico biométrico homologado pelo MTE. Possui alta capacidade de armazenamento e impressão térmica rápida de comprovantes.",
      dataLimite: "2026-02-15T23:59:59"
    },
    {
      nome: "Software Ponto Web Secullum",
      preco: "R$ 450,00",
      tag: "OFERTA",
      foto: "/banner2.jpg",
      descricao: "Sistema completo para gestão de ponto na nuvem. Inclui aplicativo para funcionários, cálculo de horas automático e suporte para até 15 pessoas no plano anual.",
      dataLimite: "2026-04-10T23:59:59"
    }
  ];

  return (
    <div style={styles.mainContainer}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .dropdown-item:hover { background-color: #2cc4db !important; color: #002147 !important; padding-left: 20px !important; }
        .nav-link:hover { color: #2cc4db !important; }
        .swiper-button-next, .swiper-button-prev { color: #2cc4db !important; }
        .swiper-pagination-bullet-active { background: #2cc4db !important; }
      `}</style>

      {/* HEADER / NAVIGATION */}
      <nav style={styles.nav}>
        <div style={{ fontSize: '24px', fontWeight: '900', color: '#002147', cursor: 'pointer' }} onClick={() => navigateTo('inicio')}>
          <span style={{color: '#2cc4db'}}>OPENCOM</span> TECNOLOGIA
        </div>
        
        <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <button style={styles.navBtn} onClick={() => navigateTo('inicio')} className="nav-link">Início</button>
          
          <div style={styles.dropdownWrapper} onMouseEnter={() => setActiveDropdown('prod')} onMouseLeave={() => setActiveDropdown(null)}>
            <button style={styles.navBtn} className="nav-link">Produtos {activeDropdown === 'prod' ? '▴' : '▾'}</button>
            {activeDropdown === 'prod' && (
              <div style={styles.dropdownMenu}>
                <button className="dropdown-item" style={styles.dropdownItem} onClick={() => navigateTo('relogios')}>⏱ Relógio de Ponto</button>
                <button className="dropdown-item" style={styles.dropdownItem} onClick={() => navigateTo('acesso')}>🔑 Controle de Acesso</button>
                <button className="dropdown-item" style={styles.dropdownItem} onClick={() => navigateTo('catracas')}>🚧 Catracas</button>
                <button className="dropdown-item" style={styles.dropdownItem} onClick={() => navigateTo('softwares')}>💻 Softwares e Aplicativos</button>
              </div>
            )}
          </div>

          <div style={styles.dropdownWrapper} onMouseEnter={() => setActiveDropdown('cont')} onMouseLeave={() => setActiveDropdown(null)}>
            <button style={styles.contactBtn}>Contato {activeDropdown === 'cont' ? '▴' : '▾'}</button>
            {activeDropdown === 'cont' && (
              <div style={styles.dropdownMenu}>
                <a href="https://wa.me/5585991220790?text=Olá! Gostaria de um orçamento comercial." target="_blank" rel="noreferrer" className="dropdown-item" style={styles.dropdownItem}>💼 Departamento Comercial</a>
                <a href="https://wa.me/5585991220790?text=Olá! Preciso de Suporte Técnico." target="_blank" rel="noreferrer" className="dropdown-item" style={styles.dropdownItem}>🛠️ Suporte Técnico</a>
                <a href="mailto:contato@opencom.com.br" className="dropdown-item" style={styles.dropdownItem}>📧 Enviar E-mail</a>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* CONTEÚDO DINÂMICO */}
      {currentPage === 'inicio' ? (
        <div style={{ animation: 'fadeIn 0.6s' }}>
          <MainSlider />
          
          <section style={{ padding: '80px 5%', backgroundColor: '#f4f4f4' }}>
            <h2 style={{ textAlign: 'center', color: '#002147', fontSize: '2.5rem', marginBottom: '40px' }}>🔥 Ofertas Ativas</h2>
            <div style={styles.productGrid}>
              {listaPromocoes.map((item, index) => (
                <div key={index} style={styles.productCard} onClick={() => setSelectedPromo(item)}>
                  <div style={{ color: '#2cc4db', fontWeight: 'bold', marginBottom: '10px' }}>{item.tag}</div>
                  <img src={item.foto} alt={item.nome} style={{ width: '100%', height: '150px', objectFit: 'contain', marginBottom: '15px' }} />
                  <h3>{item.nome}</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#002147' }}>{item.preco}</p>
                  <CountdownTimer targetDate={item.dataLimite} />
                  <p style={{ color: '#2cc4db', fontSize: '12px', marginTop: '10px' }}>Clique para detalhes</p>
                </div>
              ))}
            </div>
          </section>

          <div style={{ padding: '60px 5%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {['Relógio de Ponto', 'Controle de Acesso', 'Catracas', 'Softwares'].map((cat) => (
              <div key={cat} onClick={() => navigateTo('relogios')} style={{ padding: '40px', textAlign: 'center', borderTop: '5px solid #002147', boxShadow: '0 8px 20px rgba(0,0,0,0.08)', cursor: 'pointer', backgroundColor: '#fff', transition: '0.3s' }}>
                <h3 style={{ color: '#002147', margin: 0 }}>{cat}</h3>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ animation: 'fadeIn 0.5s', minHeight: '60vh' }}>
          <h1 style={styles.pageTitle}>{currentPage === 'relogios' ? 'Relógios de Ponto' : 'Produtos Opencom'}</h1>
          <div style={styles.productGrid}>
             <div style={styles.productCard}>
                <img src="/banner0.jpg" alt="Produto" style={{ width: '100%', borderRadius: '10px', marginBottom: '20px' }} />
                <h3>Equipamento Homologado</h3>
                <p>Tecnologia de ponta para sua empresa.</p>
                <button style={styles.contactBtn} onClick={() => window.open('https://wa.me/5585991220790')}>Solicitar Orçamento</button>
             </div>
          </div>
        </div>
      )}

      {/* MODAL DE PROMOÇÃO DETALHADO */}
      {selectedPromo && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 5000, padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '15px', maxWidth: '850px', width: '100%', maxHeight: '90vh', overflowY: 'auto', animation: 'fadeIn 0.3s', position: 'relative' }}>
            
            <button onClick={() => setSelectedPromo(null)} style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: '#f0f0f0', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontWeight: 'bold', fontSize: '18px', zIndex: 10 }}>×</button>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {/* LADO DA IMAGEM */}
              <div style={{ flex: '1 1 350px', backgroundColor: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
                <img src={selectedPromo.foto} alt={selectedPromo.nome} style={{ width: '100%', maxHeight: '350px', objectFit: 'contain' }} />
              </div>

              {/* LADO DO TEXTO */}
              <div style={{ flex: '1 1 350px', padding: '40px' }}>
                <span style={{ color: '#2cc4db', fontWeight: 'bold' }}>{selectedPromo.tag}</span>
                <h2 style={{ color: '#002147', fontSize: '2rem', margin: '10px 0' }}>{selectedPromo.nome}</h2>
                <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '30px' }}>{selectedPromo.descricao}</p>
                
                <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
                  <div style={{ fontSize: '14px', color: '#888' }}>Preço Promocional:</div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#002147' }}>{selectedPromo.preco}</div>
                  <CountdownTimer targetDate={selectedPromo.dataLimite} />
                </div>

                <a 
                  href={`https://wa.me/5585991220790?text=Olá! Tenho interesse no ${selectedPromo.nome} que vi em oferta.`} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ display: 'block', marginTop: '30px', padding: '15px', backgroundColor: '#25D366', color: '#fff', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', textAlign: 'center' }}
                >
                  🛒 Garantir Oferta via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer style={{ backgroundColor: '#002147', color: 'white', padding: '60px 5%', textAlign: 'center', marginTop: 'auto' }}>
        <p>OPENCOM TECNOLOGIA © 2026</p>
      </footer>
    </div>
  );
}

export default App;