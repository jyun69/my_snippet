// Brittany Chiang 스타일 포트폴리오 JavaScript

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 네비게이션 기능
    initNavigation();
    
    // 스크롤 애니메이션
    initScrollAnimations();
    
    // 탭 기능
    initTabs();
    initResearchTabs();
    
    // 타이핑 효과
    initTypingEffect();
    
    // 스크롤 진행률
    initScrollProgress();
    
    // 부드러운 스크롤
    initSmoothScroll();
    
    // 폼 처리
    initContactForm();
});

// 네비게이션 기능 초기화
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // 햄버거 메뉴 토글
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
    }

    // 네비게이션 링크 클릭 시 메뉴 닫기
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    });

    // 스크롤 시 네비게이션 스타일 변경
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(10, 25, 47, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(10, 25, 47, 0.85)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        // 스크롤 방향에 따른 네비게이션 숨김/표시
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // 현재 섹션에 따른 네비게이션 활성화
    window.addEventListener('scroll', updateActiveNavLink);
}

// 현재 섹션에 따른 네비게이션 링크 활성화
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// 스크롤 애니메이션 초기화
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // 숫자 카운팅 애니메이션
                if (entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // 애니메이션을 적용할 요소들 선택
    const animatedElements = document.querySelectorAll('.section, .collaboration-item, .lecture-item, .course-category, .contact-text, .contact-form');
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// 경험 탭 기능 초기화
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // 모든 탭 버튼과 콘텐츠 비활성화
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // 선택된 탭 활성화
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// 연구 탭 기능 초기화
function initResearchTabs() {
    const researchTabBtns = document.querySelectorAll('.research-tab-btn');
    const researchTabContents = document.querySelectorAll('.research-tab-content');

    researchTabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // 모든 탭 버튼과 콘텐츠 비활성화
            researchTabBtns.forEach(b => b.classList.remove('active'));
            researchTabContents.forEach(c => c.classList.remove('active'));
            
            // 선택된 탭 활성화
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// 타이핑 효과 초기화
function initTypingEffect() {
    const heroName = document.querySelector('.hero-name');
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroName) {
        typeWriter(heroName, heroName.textContent, 100);
    }
    
    if (heroTitle) {
        setTimeout(() => {
            typeWriter(heroTitle, heroTitle.textContent, 80);
        }, 1000);
    }
}

// 타이핑 애니메이션 함수
function typeWriter(element, text, speed) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 스크롤 진행률 초기화
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// 부드러운 스크롤 초기화
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 섹션으로 스크롤하는 함수
function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        const offsetTop = target.offsetTop - 100;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// 숫자 카운팅 애니메이션
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// 연락처 폼 처리
function initContactForm() {
    const form = document.querySelector('.contact-form form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 폼 데이터 수집
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // 간단한 유효성 검사
        if (!data.name || !data.email || !data.subject || !data.message) {
            showNotification('모든 필드를 입력해주세요.', 'error');
            return;
        }
        
        // 이메일 형식 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('올바른 이메일 주소를 입력해주세요.', 'error');
            return;
        }
        
        // 성공 메시지 (실제로는 서버로 전송)
        showNotification('메시지가 성공적으로 전송되었습니다!', 'success');
        form.reset();
    });
}

// 알림 표시 함수
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#64ffda' : type === 'error' ? '#ff6b6b' : '#57cbff'};
        color: #0a192f;
        border-radius: 4px;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // 애니메이션
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 자동 제거
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 카드 호버 효과
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.collaboration-item, .course-category, .lecture-content');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});

// 리사이즈 이벤트 처리
window.addEventListener('resize', function() {
    // 모바일에서 햄버거 메뉴가 열려있으면 닫기
    if (window.innerWidth > 768) {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    }
});

// 키보드 접근성
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    }
});

// 로딩 완료 후 추가 효과
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// 전역 함수로 스크롤 함수 노출
window.scrollToSection = scrollToSection;

// 스크롤 시 요소 애니메이션
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// 페이지 로드 시 초기 애니메이션 실행
animateOnScroll();

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    .nav-open {
        overflow: hidden;
    }
    
    .notification {
        font-family: var(--font-sans);
    }
    
    .collaboration-item:hover,
    .course-category:hover,
    .lecture-content:hover {
        transform: translateY(-5px);
        transition: all 0.3s ease;
    }
    
    .social-link:hover {
        transform: translateY(-3px);
    }
    
    .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(100, 255, 218, 0.2);
    }
    
    .tab-btn:hover,
    .research-tab-btn:hover {
        background-color: var(--light-navy);
        color: var(--green);
    }
    
    .lecture-item {
        transition: all 0.3s ease;
    }
    
    .lecture-item:hover {
        transform: translateX(10px);
    }
`;
document.head.appendChild(style);
