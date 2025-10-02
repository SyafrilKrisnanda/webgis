import React, { useState, useEffect } from 'react';
import axios from 'axios';

// === Komponen Navigasi ===
function Navbar({ navigateTo, isLoggedIn, username, onLogout }) {
  const handleScroll = (id) => {
    navigateTo('home');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800 cursor-pointer" onClick={() => navigateTo('home')}>
          <span className="text-blue-500">Web</span>GIS
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-semibold">
          <button onClick={() => navigateTo('marketplace')} className="text-gray-600 hover:text-blue-500 transition-colors">Marketplace</button>
          {/* PERUBAHAN: Tombol Workspace sekarang selalu ada, tapi fungsinya beda */}
          <button onClick={() => navigateTo('workspace')} className="text-gray-600 hover:text-blue-500 transition-colors">Workspace</button>
          <button onClick={() => navigateTo('article')} className="text-gray-600 hover:text-blue-500 transition-colors">Artikel</button>
          <button onClick={() => handleScroll('how-to-use')} className="text-gray-600 hover:text-blue-500 transition-colors">Cara Penggunaan</button>
          <button onClick={() => handleScroll('about-us')} className="text-gray-600 hover:text-blue-500 transition-colors">Tentang Kami</button>
        </div>
        <div className="hidden md:flex items-center space-x-4">
           {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-blue-500 text-xl">🛒</button>
              <img 
                src={`https://placehold.co/40x40/E2E8F0/4A5568?text=${username.charAt(0).toUpperCase()}`} 
                alt="Avatar Pengguna" 
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-transparent hover:border-blue-500"
                onClick={() => navigateTo('profile')}
              />
               <button onClick={onLogout} className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-2 px-4 rounded-lg transition duration-300 text-sm">
                Logout
              </button>
            </div>
          ) : (
            <>
              <button onClick={() => navigateTo('login')} className="text-gray-600 hover:text-blue-500 font-bold transition-colors text-sm">Sign In</button>
              <button onClick={() => navigateTo('register')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 text-sm">
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

// === Komponen Halaman (Pages) ===

function HomePage({ navigateTo }) {
  const articles = [ { id: 1, title: "Memulai dengan WebGIS", excerpt: "Pelajari dasar-dasar platform kami...", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" }, { id: 2, title: "Tips & Trik Kolaborasi", excerpt: "Optimalkan kerja tim Anda dengan fitur...", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" }, { id: 3, title: "Menjelajahi Marketplace", excerpt: "Temukan peta-peta terbaik dari para...", image: "https://images.unsplash.com/photo-1526778548025-13a63383412e?q=80&w=2070&auto=format&fit=crop" }, ];
  return (
    <div className="bg-slate-50">
      <header className="relative bg-gray-900 text-white text-center py-48 px-6">
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579689282335-91636d3767c9?q=80&w=2070&auto=format&fit=crop')", opacity: 0.3 }}></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Platform GIS Kolaboratif Anda</h1>
          <p className="text-xl max-w-3xl mx-auto drop-shadow-md mb-8">Temukan, buat, dan bagikan data geospasial dengan mudah.</p>
        </div>
      </header>
      <section id="marketplace-teaser" className="container mx-auto px-6 py-20 text-center scroll-mt-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Jelajahi Marketplace Peta</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Temukan ribuan peta siap pakai dari para ahli kartografi di seluruh dunia.</p>
        <button onClick={() => navigateTo('marketplace')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300">
          Masuk ke Marketplace
        </button>
      </section>
      <section id="article-carousel" className="bg-white py-20 scroll-mt-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Artikel & Berita Terbaru</h2>
          <div className="flex overflow-x-auto space-x-8 pb-4">
            {articles.map(article => (
              <div key={article.id} className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer" onClick={() => navigateTo(`article/${article.id}`)}>
                <img className="w-full h-40 object-cover" src={article.image} alt={article.title} />
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm">{article.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="how-to-use" className="container mx-auto px-6 py-20 scroll-mt-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Cara Penggunaan</h2>
        <p className="text-center text-gray-600">... Konten tentang cara penggunaan akan ditambahkan di sini ...</p>
      </section>
      <section id="about-us" className="bg-white py-20 scroll-mt-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Tentang Kami</h2>
          <p className="text-center text-gray-600">... Konten tentang kami akan ditambahkan di sini ...</p>
        </div>
      </section>
    </div>
  );
}

function MarketplacePage() {
    return (
    <div className="flex bg-slate-50" style={{ height: 'calc(100vh - 122px)' }}>
      <aside className="w-96 bg-white shadow-lg p-6 flex flex-col z-10 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Cari Peta</h2>
        <input type="text" placeholder="Masukkan nama peta..." className="w-full p-3 mb-6 border border-gray-300 rounded-lg"/>
        <h3 className="font-semibold text-gray-700 mb-3">Filter</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => ( <div key={i} className="p-4 border rounded-lg hover:bg-gray-100 cursor-pointer"> <h4 className="font-bold">Peta Jalur Pendakian #{i}</h4> <p className="text-sm text-gray-500">Oleh Publisher A</p> </div> ))}
        </div>
      </aside>
      <main className="flex-1 relative bg-gray-200">
        <div className="w-full h-full flex items-center justify-center text-gray-500">Peta Interaktif Akan Tampil di Sini</div>
      </main>
    </div>
  );
}

function LoginPage({ onLoginSuccess, navigateTo }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', { username, password });
      if (response.data.key) {
        onLoginSuccess(response.data.key, username);
      } else {
        throw new Error('Respons tidak mengandung token.');
      }
    } catch (err) {
      console.error("Login gagal:", err);
      setError('Username atau password salah.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full disabled:bg-blue-300" type="submit" disabled={loading}>
              {loading ? 'Memproses...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// PERUBAHAN: Halaman Workspace sekarang mengambil data proyek
function WorkspacePage({ token, navigateTo }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Jika tidak ada token (pengguna belum login), jangan lakukan apa-apa
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/projects/', {
          headers: {
            // Sertakan token di header Authorization
            'Authorization': `Token ${token}`
          }
        });
        setProjects(response.data);
      } catch (err) {
        console.error("Gagal mengambil data proyek:", err);
        setError('Gagal memuat proyek. Sesi Anda mungkin telah berakhir.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [token]); // Efek ini akan berjalan lagi jika token berubah

  if (loading) {
    return <div className="text-center py-20">Memuat proyek...</div>;
  }

  // Jika pengguna belum login dan mencoba akses
  if (!token) {
    return (
      <div className="text-center py-20 container mx-auto">
        <h2 className="text-2xl font-bold">Akses Ditolak</h2>
        <p className="text-gray-600 my-4">Anda harus login terlebih dahulu untuk mengakses workspace.</p>
        <button onClick={() => navigateTo('login')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Pergi ke Halaman Login
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Workspace Saya</h1>
      {error && <p className="text-red-500">{error}</p>}
      
      {projects.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="text-gray-500 text-sm">Pemilik: {project.owner}</p>
              <p className="text-gray-700 mt-2">{project.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Anda belum memiliki proyek.</p>
      )}
    </div>
  );
}

function PlaceholderPage({ title }) {
  return ( <div className="container mx-auto px-6 py-20 text-center min-h-[50vh]"> <h1 className="text-4xl font-bold">{title}</h1> <p className="text-lg text-gray-600 mt-4">Halaman ini sedang dalam pengembangan.</p> </div> );
}

function Footer() {
    return ( <footer id="contact" className="bg-gray-800 text-white scroll-mt-20"> <div className="container mx-auto px-6 py-8 text-center text-gray-400"> <h3 className="text-2xl font-bold mb-4">Kontak</h3> <p>Email: info@webgis.com</p> <p className="mt-4">&copy; {new Date().getFullYear()} WebGIS Platform. All rights reserved.</p> </div> </footer> );
}

// === Komponen Utama Aplikasi ===
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [username, setUsername] = useState(localStorage.getItem('username'));

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const handleLoginSuccess = (newToken, loggedInUsername) => {
      setToken(newToken);
      setUsername(loggedInUsername);
      localStorage.setItem('authToken', newToken);
      localStorage.setItem('username', loggedInUsername);
      navigateTo('workspace'); // Langsung ke workspace setelah login
  }
  
  const handleLogout = async () => {
      try {
        // Panggil API logout di backend
        await axios.post('http://127.0.0.1:8000/api/auth/logout/', {}, {
          headers: { 'Authorization': `Token ${token}` }
        });
      } catch (error) {
        console.error("Logout gagal di backend, tapi tetap logout di frontend:", error);
      } finally {
        // Hapus data dari state dan localStorage apapun hasilnya
        setToken(null);
        setUsername(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        navigateTo('home');
      }
  }

  let content;
  switch (true) {
    case currentPage.startsWith('article/'):
        const articleId = currentPage.split('/')[1];
        content = <PlaceholderPage title={`Artikel #${articleId}`} />;
        break;
    case currentPage === 'marketplace':
        content = <MarketplacePage />;
        break;
    case currentPage === 'login':
        content = <LoginPage onLoginSuccess={handleLoginSuccess} />;
        break;
    case currentPage === 'workspace':
        content = <WorkspacePage token={token} navigateTo={navigateTo} />;
        break;
    case currentPage === 'register':
        content = <PlaceholderPage title="Halaman Pendaftaran" />;
        break;
    case currentPage === 'profile':
        content = <PlaceholderPage title="Profil Pengguna" />;
        break;
    case currentPage === 'article':
        content = <PlaceholderPage title="Semua Artikel" />;
        break;
    case currentPage === 'home':
    default:
      content = <HomePage navigateTo={navigateTo} />;
      break;
  }

  return (
    <div className="antialiased bg-slate-50 text-gray-800">
      <Navbar 
        navigateTo={navigateTo} 
        isLoggedIn={!!token}
        username={username}
        onLogout={handleLogout}
      />
      <main>
        {content}
      </main>
      <Footer />
    </div>
  );
}

export default App;

