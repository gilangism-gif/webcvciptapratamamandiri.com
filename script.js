// ============================================
//  CiptaPratamaMandiri - JavaScript Interaktif
// ============================================

(function() {
  'use strict';

  // ===== 1. SMOOTH SCROLLING =====
  // Untuk semua link internal dengan href="#"
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Abaikan jika href hanya "#"
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Hitung posisi scroll dengan memperhatikan tinggi header
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== 2. ANIMASI PROJECT CARD (hover effect) =====
  const cards = document.querySelectorAll('.project-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // Efek tambahan: bisa ditambahkan class atau style dinamis
      this.style.transition = 'transform 0.25s ease, box-shadow 0.3s ease';
    });
    
    // Opsional: efek click untuk feedback
    card.addEventListener('click', function() {
      // Contoh interaksi: alert sederhana (bisa diubah sesuai kebutuhan)
      // console.log('Kamu mengklik proyek: ' + this.querySelector('h3').textContent);
    });
  });

  // ===== 3. UPDATE TAHUN DINAMIS DI FOOTER =====
  const footerCopy = document.querySelector('.footer-copy');
  if (footerCopy) {
    const currentYear = new Date().getFullYear();
    // Mempertahankan ikon hati
    footerCopy.innerHTML = `&copy; ${currentYear} CiptaPratamaMandiri. Dibangun dengan <i class="fas fa-heart" style="color: #ff7b7b;"></i>`;
  }

  // ===== 4. CONSOLE GREETING (untuk kesan profesional) =====
  console.log('%c CiptaPratamaMandiri %c Portofolio Web Developer ',
    'background: #0b1a2a; color: white; font-size: 16px; padding: 6px 10px; border-radius: 6px 0 0 6px; font-weight: bold;',
    'background: #1a5b8c; color: white; font-size: 16px; padding: 6px 10px; border-radius: 0 6px 6px 0;'
  );
  console.log('👋 Terima kasih telah mengunjungi portofolio CiptaPratamaMandiri.');
  console.log('💼 Dibangun dengan HTML, CSS, dan JavaScript murni.');

  // ===== 5. EFEK SCROLL REVEAL (opsional) =====
  // Memberikan efek fade-in saat elemen masuk viewport
  const revealElements = document.querySelectorAll('.project-card, .skill-item, .about-wrap');
  
  // Gunakan Intersection Observer jika browser mendukung
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
      // Set initial state
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  } else {
    // Fallback: tampilkan semua elemen jika IntersectionObserver tidak didukung
    revealElements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }

  // ===== 6. INTERAKSI TOMBOL (feedback tambahan) =====
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Jika tombol bukan link internal, beri efek ripple sederhana
      if (!this.getAttribute('href') || this.getAttribute('href') === '#') {
        e.preventDefault();
        // Efek visual: ubah background sebentar
        const originalBg = this.style.backgroundColor;
        this.style.backgroundColor = '#2a6b9e';
        setTimeout(() => {
          this.style.backgroundColor = originalBg || '';
        }, 200);
      }
    });
  });

  // ===== 7. NAVIGASI AKTIF (highlight section saat di-scroll) =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');

  window.addEventListener('scroll', function() {
    let current = '';
    const scrollPosition = window.pageYOffset + 120; // offset untuk header

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.borderBottomColor = 'transparent';
      link.style.color = '#f0f7ff';
      
      if (link.getAttribute('href') === '#' + current) {
        link.style.borderBottomColor = '#7fc8ff';
        link.style.color = '#ffffff';
      }
    });
  });

})(); // End IIFE