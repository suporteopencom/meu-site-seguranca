import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const styles = {
  mainContainer: {
    margin: 0,
    padding: 0,
    fontFamily: 'Segoe UI, Roboto, sans-serif',
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#fff',
    backgroundImage: 'url("/logo-opencom.png")', 
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '25%',
    overflowX: 'hidden',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 5%',
    height: '90px',
    backgroundColor: '#ffffff',
    borderBottom: '4px solid #FBC02D',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 2000,
    width: '100%',
    boxSizing: 'border-box'
  },
  dropdownWrapper: {
    position: 'relative',
    display: 'inline-block',
  },
  contactBtn: {
    textDecoration: 'none',
    color: '#FBC02D',
    backgroundColor: '#002147',
    padding: '10px 20px',
    borderRadius: '5px',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  dropdownMenu: {
    position: 'absolute',
    top: '110%',
    right: 0,
    backgroundColor: '#002147',
    minWidth: '200px',
    borderRadius: '8px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    overflow: 'hidden',
    zIndex: 3000,
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
    gap: '8px'
  },
  dropdownItem: {
    padding: '12px 15px',
    color: 'white',
    textDecoration: 'none',
    display: 'block',
    fontWeight: '600',
    fontSize: '14px',
    transition: '0.3s',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'left',
    border: 'none',
    backgroundColor: 'rgba(255,255,255,0.05)'
  },
  sliderWrapper: {
    width: '100%',
    height: 'calc(80vh - 90px)', 
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000' // Fundo preto para preencher sobras do 'contain'
  },
  slideContent: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain', // GARANTE QUE A IMAGEM NÃO CORTE
    color: 'white'
  },
  overlay: {
    backgroundColor: 'rgba(0, 33, 71, 0.4)', 
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 10%'
  }
};

function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div style={styles.mainContainer}>
      <style>{`
        body, html { margin: 0; padding: 0; width: 100%; overflow-x: hidden; }
        * { box-sizing: border-box; }
        .nav-link:hover { color: #FBC02D !important; }
        .dropdown-item:hover { 
          background-color: #FBC02D !important; 
          color: #002147 !important; 
          transform: translateX(5px);
        }
        .swiper-button-next, .swiper-button-prev { color: #FBC02D !important; transform: scale(0.6); }
        .swiper-pagination-bullet-active { background: #FBC02D !important; }
      `}</style>

      {/* CABEÇALHO */}
      <nav style={styles.nav}>
        <div style={{ fontSize: '24px', fontWeight: '900', color: '#002147' }}>
          <span style={{color: '#FBC02D'}}>OPENCOM</span> TECNOLOGIA
        </div>
        
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <a href="#" style={{ textDecoration: 'none', color: '#002147', fontWeight: '700' }} className="nav-link">Início</a>
          <a href="#" style={{ textDecoration: 'none', color: '#002147', fontWeight: '700' }} className="nav-link">Produtos</a>
          
          <div style={styles.dropdownWrapper}>
            <button 
              style={styles.contactBtn} 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
            >
              Contato {isDropdownOpen ? '▴' : '▾'}
            </button>

            {isDropdownOpen && (
              <div style={styles.dropdownMenu}>
                <a href="https://wa.me/5585991220790" target="_blank" rel="noreferrer" className="dropdown-item" style={styles.dropdownItem}>
                  💼 Comercial
                </a>
                <a href="https://wa.me/5585991220790" target="_blank" rel="noreferrer" className="dropdown-item" style={styles.dropdownItem}>
                  🛠️ Suporte Técnico
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* SLIDER COM TEXTOS E IMAGENS INTEIRAS */}
      <div style={styles.sliderWrapper}>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          navigation
          loop={true}
          style={{ height: '100%' }}
        >
          {/* Slide 0 */}
          <SwiperSlide>
            <div style={{ ...styles.slideContent, backgroundImage: 'url("/banner0.jpg")' }}>
              <div style={styles.overlay}>
                <h2 style={{ fontSize: '3rem', margin: 0, textAlign: 'center' }}>PROJETOS PERSONALIZADOS</h2>
                <p style={{ fontSize: '1.2rem' }}>Segurança Inteligente para sua Empresa</p>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 1 */}
          <SwiperSlide>
            <div style={{ ...styles.slideContent, backgroundImage: 'url("/banner1.jpg")' }}>
              <div style={styles.overlay}>
                <h2 style={{ fontSize: '3rem', margin: 0, textAlign: 'center' }}>SISTEMA DE PONTO WEB</h2>
                <p style={{ fontSize: '1.2rem' }}>Sistema Acuttis ponto</p>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div style={{ ...styles.slideContent, backgroundImage: 'url("/banner2.jpg")' }}>
              <div style={styles.overlay}>
                <h2 style={{ fontSize: '3rem', margin: 0, textAlign: 'center' }}>SISTEMA DE PONTO WEB</h2>
                <p style={{ fontSize: '1.2rem' }}>Sistema Secullum Ponto web</p>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div style={{ ...styles.slideContent, backgroundImage: 'url("/banner3.jpg")' }}>
              <div style={styles.overlay}>
                <h2 style={{ fontSize: '3rem', margin: 0, textAlign: 'center' }}>RECONHECIMENTO FACIAL</h2>
                <p style={{ fontSize: '1.2rem' }}>Mais segurança para sua empresa</p>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 4 */}
          <SwiperSlide>
            <div style={{ ...styles.slideContent, backgroundImage: 'url("/banner4.jpg")' }}>
              <div style={styles.overlay}>
                <h2 style={{ fontSize: '3rem', margin: 0, textAlign: 'center' }}>LEITORES FACIAIS</h2>
                <p style={{ fontSize: '1.2rem' }}>Mais praticidade e segurança</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* CATEGORIAS */}
      <div style={{ padding: '60px 5%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {['Relógio de Ponto', 'Controle de Acesso', 'Catracas', 'Softwares'].map((item) => (
          <div key={item} style={{ 
            backgroundColor: '#ffffff', 
            padding: '40px 20px', 
            borderRadius: '8px', 
            textAlign: 'center', 
            boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
            borderTop: '5px solid #002147',
            cursor: 'pointer'
          }}>
            <h3 style={{ color: '#002147', margin: 0 }}>{item}</h3>
          </div>
        ))}
      </div>

      <footer style={{ backgroundColor: '#002147', color: 'white', padding: '50px 5%', textAlign: 'center' }}>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>OPENCOM TECNOLOGIA</p>
        <p style={{ opacity: 0.7 }}>Revenda e Assistência Técnica Autorizada</p>
      </footer>
    </div>
  );
}

export default App;