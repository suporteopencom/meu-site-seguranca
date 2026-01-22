import React, { useState } from 'react';

// --- ESTILOS ---
const styles = {
  // Reset para garantir que o container ocupe tudo
  mainContainer: {
    margin: 0,
    padding: 0,
    width: '100vw', // 100% da largura da tela
    minHeight: '100vh', // 100% da altura da tela
    fontFamily: 'Segoe UI, Roboto, sans-serif',
    backgroundColor: '#f0f2f5',
    overflowX: 'hidden', // Evita barra de rolagem lateral
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 5%',
    backgroundColor: '#002147',
    color: 'white',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box', // Garante que o padding não "empurre" a largura
    position: 'sticky',
    top: 0,
    zIndex: 1000
  },
  hero: {
    width: '100%',
    height: '70vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    // Imagem de fundo cobrindo tudo
    background: 'linear-gradient(rgba(0,33,71,0.7), rgba(0,33,71,0.7)), url("https://images.unsplash.com/photo-1454165833767-027ffea9e7a7?auto=format&fit=crop&w=1350&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
  },
  section: {
    padding: '80px 10%',
    textAlign: 'center',
    width: '100%',
    boxSizing: 'border-box'
  }
};

function App() {
  const [mensagem, setMensagem] = useState("Sistemas de Segurança Inteligentes");

  return (
    <div style={styles.mainContainer}>
      {/* CSS RESET INJETADO (Isso remove as bordas brancas do navegador) */}
      <style>{`
        body { margin: 0; padding: 0; overflow-x: hidden; }
        * { box-sizing: border-box; }
      `}</style>
      
      {/* Menu Superior */}
      <nav style={styles.nav}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '1px' }}>
          OPEM TESTE
        </div>
        <div style={{ display: 'flex', gap: '30px' }}>
          <a href="#servicos" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Serviços</a>
          <a href="#contato" style={{ color: '#FBC02D', textDecoration: 'none', fontWeight: 'bold' }}>Fale Conosco</a>
        </div>
      </nav>

      {/* Banner de Tela Cheia */}
      <header style={styles.hero}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '10px' }}>OPEM TESTE</h1>
        <p style={{ fontSize: '1.4rem', maxWidth: '600px' }}>{mensagem}</p>
        <button 
          style={{
            backgroundColor: '#FBC02D',
            color: '#002147',
            padding: '15px 40px',
            border: 'none',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '30px',
            borderRadius: '50px',
            transition: '0.3s'
          }}
          onClick={() => alert("WhatsApp: (00) 00000-0000")}
        >
          SOLICITAR ORÇAMENTO AGORA
        </button>
      </header>

      {/* Seção de Serviços */}
      <section id="servicos" style={styles.section}>
        <h2 style={{ fontSize: '2.5rem', color: '#002147' }}>Nossas Soluções</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px', 
          marginTop: '40px' 
        }}>
          <ServiceCard title="Monitoramento" desc="Proteção 24 horas por dia com central técnica." />
          <ServiceCard title="CFTV Digital" desc="Câmeras de alta definição com IA." />
          <ServiceCard title="Controle de Acesso" desc="Biometria e reconhecimento facial." />
        </div>
      </section>

      <footer style={{ backgroundColor: '#001529', color: 'white', padding: '40px', textAlign: 'center' }}>
        <p>© 2026 OPENCOM TECNOLOGIA - Solução em acesso, ponto e Segurança</p>
      </footer>
    </div>
  );
}

// Componente auxiliar para os cards
function ServiceCard({ title, desc }) {
  return (
    <div style={{ 
      backgroundColor: 'white', 
      padding: '40px', 
      borderRadius: '15px', 
      boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
      textAlign: 'left',
      borderBottom: '5px solid #FBC02D'
    }}>
      <h3 style={{ color: '#002147', marginTop: 0 }}>{title}</h3>
      <p style={{ color: '#666', lineHeight: '1.6' }}>{desc}</p>
    </div>
  );
}

export default App;