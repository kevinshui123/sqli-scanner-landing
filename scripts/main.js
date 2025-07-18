// 主要JavaScript功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initScrollEffects();
    initAnimations();
    initCounters();
    initParticles();
    initTypingEffect();
    initMagneticEffect();
    initThemeDetection();
    initLanguage();
    
    // 初始化AOS动画库
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            delay: 100
        });
    }
});

// 导航功能
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 滚动时导航栏样式变化
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 添加滚动样式
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // 隐藏/显示导航栏
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });
    
    // 移动端菜单切换
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // 平滑滚动到锚点
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // 关闭移动端菜单
                    if (navMenu.classList.contains('active')) {
                        navToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    
                    // 更新激活状态
                    updateActiveNavLink(href);
                }
            }
        });
    });
    
    // 滚动时更新导航激活状态
    window.addEventListener('scroll', updateNavOnScroll, { passive: true });
}

// 更新激活的导航链接
function updateActiveNavLink(activeHref) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === activeHref) {
            link.classList.add('active');
        }
    });
}

// 滚动时更新导航状态
function updateNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos < bottom) {
            updateActiveNavLink(`#${id}`);
        }
    });
}

// 滚动效果
function initScrollEffects() {
    // 视差滚动效果
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    }, { passive: true });
    
    // 滚动进度指示器
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }, { passive: true });
}

// 初始化动画
function initAnimations() {
    // 观察器选项
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // 创建观察器
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // 为统计数字添加计数动画
                if (entry.target.classList.contains('stat-number')) {
                    animateNumber(entry.target);
                }
                
                // 为进度条添加动画
                if (entry.target.classList.contains('progress-bar')) {
                    animateProgressBar(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    document.querySelectorAll('.feature-card, .stat-number, .screenshot-item, .progress-bar').forEach(el => {
        observer.observe(el);
    });
    
    // 浮动动画
    const floatingElements = document.querySelectorAll('.floating-icon');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
        element.classList.add('float-animation');
    });
    
    // 添加悬停效果
    addHoverEffects();
}

// 数字计数动画
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// 数字动画函数
function animateNumber(element) {
    const target = parseInt(element.getAttribute('data-count')) || parseInt(element.textContent);
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用缓动函数
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOutCubic);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// 进度条动画
function animateProgressBar(element) {
    const fill = element.querySelector('.progress-fill');
    if (fill) {
        const targetWidth = fill.getAttribute('data-width') || '92%';
        setTimeout(() => {
            fill.style.width = targetWidth;
        }, 500);
    }
}

// 粒子系统初始化
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#6366f1'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.1,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#6366f1',
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 0.5,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// 打字效果
function initTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-text');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid #6366f1';
        
        let i = 0;
        const typeWriter = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
                // 保持光标闪烁一段时间后移除
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 2000);
            }
        }, 50);
    });
}

// 磁吸效果
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.magnetic-effect');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            this.style.setProperty('--x', `${moveX}px`);
            this.style.setProperty('--y', `${moveY}px`);
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.setProperty('--x', '0px');
            this.style.setProperty('--y', '0px');
        });
    });
}

// 添加悬停效果
function addHoverEffects() {
    // 为卡片添加3D倾斜效果
    const tiltElements = document.querySelectorAll('.feature-card, .screenshot-item');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale(1.02)
            `;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
    
    // 为按钮添加波纹效果
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: 20px;
                height: 20px;
                margin-left: -10px;
                margin-top: -10px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// 主题检测
function initThemeDetection() {
    // 检测用户的主题偏好
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    function handleThemeChange(e) {
        if (e.matches) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }
    
    // 初始设置
    handleThemeChange(prefersDark);
    
    // 监听变化
    prefersDark.addEventListener('change', handleThemeChange);
}

// 工具函数
const utils = {
    // 防抖函数
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // 节流函数
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // 检测元素是否在视窗中
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // 获取随机数
    random: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    // 线性插值
    lerp: function(start, end, factor) {
        return start + (end - start) * factor;
    }
};

// 性能优化
const performance = {
    // 预加载图片
    preloadImages: function(images) {
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    },
    
    // 懒加载
    lazyLoad: function() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    },
    
    // 优化滚动性能
    optimizeScroll: function() {
        let ticking = false;
        
        function updateScroll() {
            // 滚动相关的计算
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        }, { passive: true });
    }
};

// 错误处理
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// 语言切换功能
let currentLang = 'zh';
const translations = {
    zh: {
        // 导航
        home: '首页',
        features: '功能',
        screenshots: '界面',
        pricing: '购买',
        contact: '联系',
        
        // 英雄区域
        title: '松子壳安全工具',
        subtitle: '专业SQL注入检测平台',
        description: '采用先进算法的专业SQL注入漏洞检测工具，提供实时扫描、智能分析和数据提取功能。为网络安全专业人员打造的下一代安全测试平台。',
        
        // 统计数据
        scanRecords: '扫描记录',
        vulnDiscovered: '漏洞发现',
        secureSites: '安全站点',
        
        // 英雄区域按钮
        buyNowHero: '立即购买',
        viewDemo: '查看演示',
        
        // 功能区域
        featuresTitle: '强大功能特性',
        featuresDesc: '全面的SQL注入检测与数据提取解决方案',
        
        // 定价
        pricingTitle: '选择您的方案',
        pricingDesc: '专业的安全测试工具，为您的业务保驾护航',
        professional: '专业版',
        enterprise: '企业版',
        proDesc: '适合专业安全测试人员和企业用户',
        entDesc: '适合大型企业和安全团队',
        buyNow: '立即购买',
        contactSales: '联系销售',
        freeTrial: '7天免费试用',
        customPlan: '定制化方案',
        
        // 核心功能
        coreFeaturesTitle: '核心功能',
        coreFeaturesDesc: '集成多种先进技术，提供全面的SQL注入检测解决方案',
        
        // 功能卡片
        smartScan: '智能扫描',
        smartScanDesc: '采用机器学习算法，智能识别SQL注入漏洞，减少误报率',
        aiAlgorithm: 'AI算法',
        patternRecognition: '模式识别',
        
        realTimeMonitor: '实时监控',
        realTimeMonitorDesc: '实时监控扫描进度，提供详细的状态信息和性能指标',
        realTimeData: '实时数据',
        performanceMonitor: '性能监控',
        
        dataExtraction: '数据提取',
        dataExtractionDesc: '自动提取数据库结构和敏感信息，支持多种数据库类型',
        automation: '自动化',
        multiDatabase: '多数据库',
        
        visualReport: '可视化报告',
        visualReportDesc: '生成详细的可视化安全报告，支持多种导出格式',
        dataVisualization: '数据可视化',
        reportExport: '报告导出',
        
        batchProcessing: '批量处理',
        batchProcessingDesc: '支持批量URL扫描和任务管理，提高安全测试效率',
        batchScan: '批量扫描',
        taskQueue: '任务队列',
        
        wafBypass: 'WAF绕过',
        wafBypassDesc: '集成多种WAF绕过技术，提高检测成功率和准确性',
        bypassTech: '绕过技术',
        highSuccess: '高成功率',
        
        // 工具界面
        toolInterfaceTitle: '工具界面',
        toolInterfaceDesc: '直观的用户界面，专业的功能布局',
        
        // 敏感信息检测
        sensitiveDataTitle: '检测到敏感信息',
        foundSensitiveData: '发现 2,847 条敏感数据',
        bankCard: '银行卡号',
        emailAddress: '邮箱地址',
        phoneNumber: '电话号码',
        records: '条记录',
        detailsInfo: '详细信息',
        exportReport: '导出报告',
        
        // 功能列表翻译
        unlimitedUrlScan: '无限制URL扫描',
        advancedSqlDetection: '高级SQL注入检测',
        autoSensitiveDetection: '敏感信息自动检测',
        batchScanTasks: '批量扫描任务',
        wafBypassTechnology: 'WAF绕过技术',
        detailedReports: '详细扫描报告',
        dataExportFeature: '数据导出功能',
        support247: '24/7技术支持',
        
        allProFeatures: '专业版所有功能',
        multiUserCollaboration: '多用户协作管理',
        apiSupport: 'API接口支持',
        customScanRules: '自定义扫描规则',
        advancedReportCustom: '高级报告定制',
        whitelabelService: '白标定制服务',
        prioritySupport: '优先技术支持',
        dedicatedManager: '专属客户经理',
        
        // 购买保障
        securityGuarantee: '安全保障',
        securityGuaranteeDesc: '使用行业标准加密，保护您的数据安全',
        regularUpdates: '定期更新',
        regularUpdatesDesc: '持续更新扫描引擎和漏洞库',
        professionalSupport: '专业支持',
        professionalSupportDesc: '专业技术团队提供全天候支持',
        moneyBackGuarantee: '退款保证',
        moneyBackGuaranteeDesc: '30天内不满意可申请全额退款',
        
        // 界面按钮和标签
        newScan: '新建扫描',
        scanHistory: '扫描历史', 
        settings: '设置',
        inProgress: '进行中',
        
        // 窗口标题
        mainDashboard: '主仪表板',
        dataExtractWindow: '数据提取',
        
        // 搜索和筛选
        searchPlaceholder: '搜索扫描记录...',
        allFilter: '全部',
        vulnerableFilter: '漏洞',
        secureFilter: '安全',
        inProgressFilter: '进行中',
        
        // 表格相关
        type: '类型',
        location: '发现位置',
        riskLevel: '风险等级',
        status: '状态',
        highRisk: '高风险',
        mediumRisk: '中风险',
        lowRisk: '低风险',
        detected: '已检测',
        completed: '已完成',
        
        // 终端相关
        terminalTitle: '松子壳安全工具 v2.0',
        startingScanEngine: '[+] 启动松子壳安全扫描引擎...',
        detectedInjectionPoint: '[*] 检测到潜在注入点: id参数',
        foundSqlInjection: '[!] 发现SQL注入漏洞',
        scanComplete: '[+] 扫描完成，生成报告',
        
        // 工具界面窗口标题
        toolMainDashboard: '松子壳安全工具 - 主仪表板',
        
        // 价格单位
        monthPeriod: '/月',
        
        // 技术标签
        aiAlgorithmTag: 'AI算法',
        patternRecognitionTag: '模式识别',
        realTimeDataTag: '实时数据',
        performanceMonitorTag: '性能监控',
        automationTag: '自动化',
        multiDatabaseTag: '多数据库',
        dataVisualizationTag: '数据可视化',
        reportExportTag: '报告导出',
        batchScanTag: '批量扫描',
        taskQueueTag: '任务队列',
        bypassTechTag: '绕过技术',
        highSuccessTag: '高成功率'
    },
    en: {
        // 导航
        home: 'Home',
        features: 'Features',
        screenshots: 'Screenshots',
        pricing: 'Pricing',
        contact: 'Contact',
        
        // 英雄区域
        title: 'PineKernel Security Tool',
        subtitle: 'Professional SQL Injection Detection Platform',
        description: 'Advanced algorithm-based professional SQL injection vulnerability detection tool, providing real-time scanning, intelligent analysis and data extraction functions. Next-generation security testing platform designed for cybersecurity professionals.',
        
        // 统计数据
        scanRecords: 'Scan Records',
        vulnDiscovered: 'Vulnerabilities Found',
        secureSites: 'Secure Sites',
        
        // 英雄区域按钮
        buyNowHero: 'Buy Now',
        viewDemo: 'View Demo',
        
        // 功能区域
        featuresTitle: 'Powerful Features',
        featuresDesc: 'Comprehensive SQL injection detection and data extraction solution',
        
        // 定价
        pricingTitle: 'Choose Your Plan',
        pricingDesc: 'Professional security testing tools to protect your business',
        professional: 'Professional',
        enterprise: 'Enterprise',
        proDesc: 'Perfect for security professionals and enterprise users',
        entDesc: 'Suitable for large enterprises and security teams',
        buyNow: 'Buy Now',
        contactSales: 'Contact Sales',
        freeTrial: '7-day free trial',
        customPlan: 'Custom Solution',
        
        // 核心功能
        coreFeaturesTitle: 'Core Features',
        coreFeaturesDesc: 'Integrated advanced technologies providing comprehensive SQL injection detection solutions',
        
        // 功能卡片
        smartScan: 'Smart Scanning',
        smartScanDesc: 'Uses machine learning algorithms to intelligently identify SQL injection vulnerabilities, reducing false positives',
        aiAlgorithm: 'AI Algorithm',
        patternRecognition: 'Pattern Recognition',
        
        realTimeMonitor: 'Real-time Monitoring',
        realTimeMonitorDesc: 'Real-time monitoring of scan progress, providing detailed status information and performance metrics',
        realTimeData: 'Real-time Data',
        performanceMonitor: 'Performance Monitoring',
        
        dataExtraction: 'Data Extraction',
        dataExtractionDesc: 'Automatically extract database structures and sensitive information, supporting multiple database types',
        automation: 'Automation',
        multiDatabase: 'Multi-Database',
        
        visualReport: 'Visual Reports',
        visualReportDesc: 'Generate detailed visual security reports, supporting multiple export formats',
        dataVisualization: 'Data Visualization',
        reportExport: 'Report Export',
        
        batchProcessing: 'Batch Processing',
        batchProcessingDesc: 'Support batch URL scanning and task management, improving security testing efficiency',
        batchScan: 'Batch Scanning',
        taskQueue: 'Task Queue',
        
        wafBypass: 'WAF Bypass',
        wafBypassDesc: 'Integrated multiple WAF bypass techniques, improving detection success rate and accuracy',
        bypassTech: 'Bypass Technology',
        highSuccess: 'High Success Rate',
        
        // 工具界面
        toolInterfaceTitle: 'Tool Interface',
        toolInterfaceDesc: 'Intuitive user interface with professional layout',
        
        // 敏感信息检测
        sensitiveDataTitle: 'Detected Sensitive Information',
        foundSensitiveData: 'Found 2,847 sensitive data records',
        bankCard: 'Bank Card Numbers',
        emailAddress: 'Email Addresses',
        phoneNumber: 'Phone Numbers',
        records: ' records',
        detailsInfo: 'Details',
        exportReport: 'Export Report',
        
        // 功能列表翻译
        unlimitedUrlScan: 'Unlimited URL Scanning',
        advancedSqlDetection: 'Advanced SQL Injection Detection',
        autoSensitiveDetection: 'Automatic Sensitive Information Detection',
        batchScanTasks: 'Batch Scanning Tasks',
        wafBypassTechnology: 'WAF Bypass Technology',
        detailedReports: 'Detailed Scan Reports',
        dataExportFeature: 'Data Export Feature',
        support247: '24/7 Technical Support',
        
        allProFeatures: 'All Professional Features',
        multiUserCollaboration: 'Multi-user Collaboration',
        apiSupport: 'API Support',
        customScanRules: 'Custom Scan Rules',
        advancedReportCustom: 'Advanced Report Customization',
        whitelabelService: 'White-label Service',
        prioritySupport: 'Priority Technical Support',
        dedicatedManager: 'Dedicated Account Manager',
        
        // 购买保障
        securityGuarantee: 'Security Guarantee',
        securityGuaranteeDesc: 'Using industry-standard encryption to protect your data security',
        regularUpdates: 'Regular Updates',
        regularUpdatesDesc: 'Continuous updates to scan engines and vulnerability databases',
        professionalSupport: 'Professional Support',
        professionalSupportDesc: 'Professional technical team providing 24/7 support',
        moneyBackGuarantee: 'Money-back Guarantee',
        moneyBackGuaranteeDesc: '30-day money-back guarantee if not satisfied',
        
        // 界面按钮和标签
        newScan: 'New Scan',
        scanHistory: 'Scan History',
        settings: 'Settings', 
        inProgress: 'In Progress',
        
        // 窗口标题
        mainDashboard: 'Main Dashboard',
        dataExtractWindow: 'Data Extraction',
        
        // 搜索和筛选
        searchPlaceholder: 'Search scan records...',
        allFilter: 'All',
        vulnerableFilter: 'Vulnerable',
        secureFilter: 'Secure',
        inProgressFilter: 'In Progress',
        
        // 表格相关
        type: 'Type',
        location: 'Location',
        riskLevel: 'Risk Level',
        status: 'Status',
        highRisk: 'High Risk',
        mediumRisk: 'Medium Risk',
        lowRisk: 'Low Risk',
        detected: 'Detected',
        completed: 'Completed',
        
        // 终端相关
        terminalTitle: 'PineKernel Security Tool v2.0',
        startingScanEngine: '[+] Starting PineKernel security scan engine...',
        detectedInjectionPoint: '[*] Potential injection point detected: id parameter',
        foundSqlInjection: '[!] SQL injection vulnerability found',
        scanComplete: '[+] Scan completed, generating report',
        
        // 工具界面窗口标题
        toolMainDashboard: 'PineKernel Security Tool - Main Dashboard',
        
        // 价格单位
        monthPeriod: '/month',
        
        // 技术标签
        aiAlgorithmTag: 'AI Algorithm',
        patternRecognitionTag: 'Pattern Recognition',
        realTimeDataTag: 'Real-time Data',
        performanceMonitorTag: 'Performance Monitor',
        automationTag: 'Automation',
        multiDatabaseTag: 'Multi-Database',
        dataVisualizationTag: 'Data Visualization',
        reportExportTag: 'Report Export',
        batchScanTag: 'Batch Scanning',
        taskQueueTag: 'Task Queue',
        bypassTechTag: 'Bypass Technology',
        highSuccessTag: 'High Success Rate'
    }
};

function toggleLanguage() {
    const toggle = document.getElementById('language-toggle');
    toggle.classList.toggle('active');
}

function switchLanguage(lang) {
    if (lang === currentLang) return;
    
    currentLang = lang;
    
    // 更新语言按钮显示
    const langBtn = document.querySelector('.lang-btn');
    const flagIcon = langBtn.querySelector('.flag-icon');
    const langText = langBtn.querySelector('.lang-text');
    
    if (lang === 'zh') {
        flagIcon.textContent = '🇨🇳';
        langText.textContent = '中文';
    } else {
        flagIcon.textContent = '🇺🇸';
        langText.textContent = 'English';
    }
    
    // 更新选项状态
    document.querySelectorAll('.lang-option').forEach(option => {
        option.classList.toggle('active', option.dataset.lang === lang);
    });
    
    // 翻译页面内容
    translatePage(lang);
    
    // 延迟执行以确保DOM更新完成
    setTimeout(() => {
        translatePage(lang);
    }, 100);
    
    // 关闭下拉菜单
    document.getElementById('language-toggle').classList.remove('active');
    
    // 保存语言偏好
    localStorage.setItem('preferred-language', lang);
}

function translatePage(lang) {
    const trans = translations[lang];
    
    // 更新导航链接
    document.querySelector('[data-section="home"]').textContent = trans.home;
    document.querySelector('[data-section="features"]').textContent = trans.features;
    document.querySelector('[data-section="screenshots"]').textContent = trans.screenshots;
    document.querySelector('[data-section="pricing"]').textContent = trans.pricing;
    document.querySelector('[data-section="contact"]').textContent = trans.contact;
    
    // 更新英雄区域
    document.querySelector('.title-gradient').textContent = trans.title;
    document.querySelector('.title-secondary').textContent = trans.subtitle;
    document.querySelector('.hero-description').textContent = trans.description;
    
    // 更新统计数据标签
    const statLabels = document.querySelectorAll('.stat-label');
    if (statLabels[0]) statLabels[0].textContent = trans.scanRecords;
    if (statLabels[1]) statLabels[1].textContent = trans.vulnDiscovered;
    if (statLabels[2]) statLabels[2].textContent = trans.secureSites;
    
    // 更新英雄区域按钮
    const heroBtns = document.querySelectorAll('.hero-actions .btn');
    if (heroBtns[0]) heroBtns[0].innerHTML = `<i class="fas fa-shopping-cart"></i>${trans.buyNowHero}`;
    if (heroBtns[1]) heroBtns[1].innerHTML = `<i class="fas fa-play"></i>${trans.viewDemo}`;
    
    // 更新定价区域
    const pricingTitle = document.querySelector('#pricing .section-title .title-gradient');
    if (pricingTitle) pricingTitle.textContent = trans.pricingTitle;
    
    const pricingDesc = document.querySelector('#pricing .section-description');
    if (pricingDesc) pricingDesc.textContent = trans.pricingDesc;
    
    // 更新定价卡片
    const planTitles = document.querySelectorAll('.plan-title');
    if (planTitles[0]) planTitles[0].textContent = trans.professional;
    if (planTitles[1]) planTitles[1].textContent = trans.enterprise;
    
    const planDescs = document.querySelectorAll('.plan-desc');
    if (planDescs[0]) planDescs[0].textContent = trans.proDesc;
    if (planDescs[1]) planDescs[1].textContent = trans.entDesc;
    
    const buyBtns = document.querySelectorAll('.purchase-btn');
    if (buyBtns[0]) buyBtns[0].innerHTML = `<i class="fas fa-shopping-cart"></i>${trans.buyNow}`;
    if (buyBtns[1]) buyBtns[1].innerHTML = `<i class="fas fa-envelope"></i>${trans.contactSales}`;
    
    const extraInfos = document.querySelectorAll('.extra-info');
    if (extraInfos[0]) extraInfos[0].textContent = trans.freeTrial;
    if (extraInfos[1]) extraInfos[1].textContent = trans.customPlan;
    
    // 更新价格单位
    const pricePeriods = document.querySelectorAll('.price-period');
    pricePeriods.forEach(period => {
        period.textContent = trans.monthPeriod;
    });
    
    // 更新功能区域标题
    const featuresTitle = document.querySelector('#features .section-title .title-gradient');
    if (featuresTitle) featuresTitle.textContent = trans.coreFeaturesTitle;
    
    const featuresDesc = document.querySelector('#features .section-description');
    if (featuresDesc) featuresDesc.textContent = trans.coreFeaturesDesc;
    
    // 更新功能卡片标题和描述
    updateFeatureCards(trans);
    
    // 更新界面展示区域
    const interfaceTitle = document.querySelector('#screenshots .section-title .title-gradient');
    if (interfaceTitle) interfaceTitle.textContent = trans.toolInterfaceTitle;
    
    const interfaceDesc = document.querySelector('#screenshots .section-description');
    if (interfaceDesc) interfaceDesc.textContent = trans.toolInterfaceDesc;
    
    // 更新敏感信息检测区域
    updateSensitiveDataSection(trans);
    
    // 更新功能列表
    updateFeatureLists(trans);
    
    // 更新技术标签
    updateTechTags(trans);
    
    // 更新购买保障信息
    updatePurchaseInfo(trans);
    
    // 全面的文本替换
    updateAllTextContent(trans);
}

function updateAllTextContent(trans) {
    // 创建完整的文本映射表
    const completeTextMappings = {
        // 界面元素
        '松子壳安全工具': trans.title,
        '数据信息检测': trans.sensitiveDataTitle,
        '敏感信息检测': trans.sensitiveDataTitle,
        '检测到敏感信息': trans.sensitiveDataTitle,
        
        // 窗口标题
        '主仪表板': trans.mainDashboard,
        '数据提取': trans.dataExtractWindow,
        '松子壳安全工具 v2.0': trans.terminalTitle,
        '松子壳安全工具 - 主仪表板': trans.toolMainDashboard,
        
        // 搜索和筛选
        '搜索扫描记录...': trans.searchPlaceholder,
        '全部': trans.allFilter,
        '漏洞': trans.vulnerableFilter,
        '安全': trans.secureFilter,
        
        // 统计相关
        '总扫描数': trans.scanRecords,
        '扫描记录': trans.scanRecords,
        '漏洞发现': trans.vulnDiscovered,
        '安全站点': trans.secureSites,
        '进行中': trans.inProgress,
        
        // 按钮和操作
        '新建扫描': trans.newScan,
        '扫描历史': trans.scanHistory,
        '设置': trans.settings,
        '详细信息': trans.detailsInfo,
        '导出报告': trans.exportReport,
        
        // 表格标题
        '类型': trans.type,
        '发现位置': trans.location,
        '风险等级': trans.riskLevel,
        '状态': trans.status,
        
        // 风险等级
        '高风险': trans.highRisk,
        '中风险': trans.mediumRisk,
        '低风险': trans.lowRisk,
        
        // 状态
        '已检测': trans.detected,
        '已完成': trans.completed,
        
        // 数据类型标签
        '银行卡号': trans.bankCard,
        '邮箱地址': trans.emailAddress,
        '电话号码': trans.phoneNumber,
        
        // 敏感信息相关
        '发现 2,847 条敏感数据': trans.foundSensitiveData,
        
        // 价格单位
        '/月': trans.monthPeriod,
        '/month': trans.monthPeriod,
        
        // 技术标签
        'AI算法': trans.aiAlgorithmTag,
        '模式识别': trans.patternRecognitionTag,
        '实时数据': trans.realTimeDataTag,
        '性能监控': trans.performanceMonitorTag,
        '自动化': trans.automationTag,
        '多数据库': trans.multiDatabaseTag,
        '数据可视化': trans.dataVisualizationTag,
        '报告导出': trans.reportExportTag,
        '批量扫描': trans.batchScanTag,
        '任务队列': trans.taskQueueTag,
        '绕过技术': trans.bypassTechTag,
        '高成功率': trans.highSuccessTag,
        
        // 功能列表
        '无限制URL扫描': trans.unlimitedUrlScan,
        '高级SQL注入检测': trans.advancedSqlDetection,
        '敏感信息自动检测': trans.autoSensitiveDetection,
        '批量扫描任务': trans.batchScanTasks,
        'WAF绕过技术': trans.wafBypassTechnology,
        '详细扫描报告': trans.detailedReports,
        '数据导出功能': trans.dataExportFeature,
        '24/7技术支持': trans.support247,
        '专业版所有功能': trans.allProFeatures,
        '多用户协作管理': trans.multiUserCollaboration,
        'API接口支持': trans.apiSupport,
        '自定义扫描规则': trans.customScanRules,
        '高级报告定制': trans.advancedReportCustom,
        '白标定制服务': trans.whitelabelService,
        '优先技术支持': trans.prioritySupport,
        '专属客户经理': trans.dedicatedManager,
        
        // 终端输出
        '[+] 启动松子壳安全扫描引擎...': trans.startingScanEngine,
        '[*] 检测到潜在注入点: id参数': trans.detectedInjectionPoint,
        '[!] 发现SQL注入漏洞': trans.foundSqlInjection,
        '[+] 扫描完成，生成报告': trans.scanComplete,
        
        // 其他可能的变体
        'Scan History': trans.scanHistory, // 防止重复翻译
        'Data Extraction': trans.dataExtractWindow,
        'Main Dashboard': trans.mainDashboard,
        'In Progress': trans.inProgress,
        'All': trans.allFilter,
        'Vulnerable': trans.vulnerableFilter,
        'Secure': trans.secureFilter,
        
        // 英文版的终端和界面标题
        'PineKernel Security Tool v2.0': trans.terminalTitle,
        'PineKernel Security Tool - Main Dashboard': trans.toolMainDashboard,
        '[+] Starting PineKernel security scan engine...': trans.startingScanEngine,
        '[*] Potential injection point detected: id parameter': trans.detectedInjectionPoint,
        '[!] SQL injection vulnerability found': trans.foundSqlInjection,
        '[+] Scan completed, generating report': trans.scanComplete,
        
        // 英文功能列表
        'Unlimited URL Scanning': trans.unlimitedUrlScan,
        'Advanced SQL Injection Detection': trans.advancedSqlDetection,
        'Automatic Sensitive Information Detection': trans.autoSensitiveDetection,
        'Batch Scanning Tasks': trans.batchScanTasks,
        'WAF Bypass Technology': trans.wafBypassTechnology,
        'Detailed Scan Reports': trans.detailedReports,
        'Data Export Feature': trans.dataExportFeature,
        '24/7 Technical Support': trans.support247,
        'All Professional Features': trans.allProFeatures,
        'Multi-user Collaboration': trans.multiUserCollaboration,
        'API Support': trans.apiSupport,
        'Custom Scan Rules': trans.customScanRules,
        'Advanced Report Customization': trans.advancedReportCustom,
        'White-label Service': trans.whitelabelService,
        'Priority Technical Support': trans.prioritySupport,
        'Dedicated Account Manager': trans.dedicatedManager,
        
        // 英文技术标签
        'AI Algorithm': trans.aiAlgorithmTag,
        'Pattern Recognition': trans.patternRecognitionTag,
        'Real-time Data': trans.realTimeDataTag,
        'Performance Monitor': trans.performanceMonitorTag,
        'Automation': trans.automationTag,
        'Multi-Database': trans.multiDatabaseTag,
        'Data Visualization': trans.dataVisualizationTag,
        'Report Export': trans.reportExportTag,
        'Batch Scanning': trans.batchScanTag,
        'Task Queue': trans.taskQueueTag,
        'Bypass Technology': trans.bypassTechTag,
        'High Success Rate': trans.highSuccessTag
    };
    
    // 遍历所有文本节点进行替换
    function replaceTextInNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent.trim();
            if (completeTextMappings[text]) {
                node.textContent = completeTextMappings[text];
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // 对于叶子节点（没有子元素的元素），直接替换文本
            if (node.children.length === 0) {
                const text = node.textContent.trim();
                if (completeTextMappings[text]) {
                    node.textContent = completeTextMappings[text];
                }
            } else {
                // 递归处理子节点
                for (let child of node.childNodes) {
                    replaceTextInNode(child);
                }
            }
        }
    }
    
    // 从body开始替换所有文本
    replaceTextInNode(document.body);
    
    // 特殊处理placeholder属性
    const searchInputs = document.querySelectorAll('input[placeholder*="搜索"], input[placeholder*="search"]');
    searchInputs.forEach(input => {
        if (input.placeholder.includes('搜索扫描记录') || input.placeholder.includes('search')) {
            input.placeholder = trans.searchPlaceholder;
        }
    });
    
    // 处理窗口标题（可能在title标签中）
    const windowTitles = document.querySelectorAll('title, .window-title, .terminal-title');
    windowTitles.forEach(title => {
        const text = title.textContent.trim();
        if (completeTextMappings[text]) {
            title.textContent = completeTextMappings[text];
        }
    });
}

function updateFeatureCards(trans) {
    // 功能卡片对应的选择器和翻译键
    const featureCards = [
        { selector: '.feature-card:nth-child(1)', title: 'smartScan', desc: 'smartScanDesc', tags: ['aiAlgorithm', 'patternRecognition'] },
        { selector: '.feature-card:nth-child(2)', title: 'realTimeMonitor', desc: 'realTimeMonitorDesc', tags: ['realTimeData', 'performanceMonitor'] },
        { selector: '.feature-card:nth-child(3)', title: 'dataExtraction', desc: 'dataExtractionDesc', tags: ['automation', 'multiDatabase'] },
        { selector: '.feature-card:nth-child(4)', title: 'visualReport', desc: 'visualReportDesc', tags: ['dataVisualization', 'reportExport'] },
        { selector: '.feature-card:nth-child(5)', title: 'batchProcessing', desc: 'batchProcessingDesc', tags: ['batchScan', 'taskQueue'] },
        { selector: '.feature-card:nth-child(6)', title: 'wafBypass', desc: 'wafBypassDesc', tags: ['bypassTech', 'highSuccess'] }
    ];
    
    featureCards.forEach(card => {
        const cardElement = document.querySelector(card.selector);
        if (cardElement) {
            const title = cardElement.querySelector('.feature-title, h3');
            const desc = cardElement.querySelector('.feature-description, p');
            const badges = cardElement.querySelectorAll('.feature-badge, .tag');
            
            if (title) title.textContent = trans[card.title];
            if (desc) desc.textContent = trans[card.desc];
            
            card.tags.forEach((tag, index) => {
                if (badges[index]) badges[index].textContent = trans[tag];
            });
        }
    });
}

function updateSensitiveDataSection(trans) {
    // 创建敏感信息相关的文本映射
    const sensitiveTextMappings = {
        '检测到敏感信息': trans.sensitiveDataTitle,
        '发现 2,847 条敏感数据': trans.foundSensitiveData,
        '银行卡号': trans.bankCard,
        '邮箱地址': trans.emailAddress,
        '电话号码': trans.phoneNumber,
        '条记录': trans.records,
        '详细信息': trans.detailsInfo,
        '导出报告': trans.exportReport,
        'Export Report': trans.exportReport, // 处理已经是英文的情况
        
        // 添加其他可能的变体
        '敏感信息检测': trans.sensitiveDataTitle,
        '数据信息检测': trans.sensitiveDataTitle
    };
    
    // 使用通用的文本替换方法
    Object.keys(sensitiveTextMappings).forEach(chineseText => {
        const elements = document.querySelectorAll('*');
        elements.forEach(element => {
            if (element.children.length === 0 && element.textContent.trim() === chineseText) {
                element.textContent = sensitiveTextMappings[chineseText];
            }
        });
    });
    
    // 特殊处理导出按钮（可能包含图标）
    const exportBtns = document.querySelectorAll('button, .btn');
    exportBtns.forEach(btn => {
        if (btn.textContent.includes('导出报告') || btn.textContent.includes('Export Report')) {
            btn.innerHTML = `<i class="fas fa-download"></i> ${trans.exportReport}`;
        }
    });
}

function updateFeatureLists(trans) {
    // 创建文本匹配映射
    const textMappings = {
        '无限制URL扫描': trans.unlimitedUrlScan,
        '高级SQL注入检测': trans.advancedSqlDetection,
        '敏感信息自动检测': trans.autoSensitiveDetection,
        '批量扫描任务': trans.batchScanTasks,
        'WAF绕过技术': trans.wafBypassTechnology,
        '详细扫描报告': trans.detailedReports,
        '数据导出功能': trans.dataExportFeature,
        '24/7技术支持': trans.support247,
        
        '专业版所有功能': trans.allProFeatures,
        '多用户协作管理': trans.multiUserCollaboration,
        'API接口支持': trans.apiSupport,
        '自定义扫描规则': trans.customScanRules,
        '高级报告定制': trans.advancedReportCustom,
        '白标定制服务': trans.whitelabelService,
        '优先技术支持': trans.prioritySupport,
        '专属客户经理': trans.dedicatedManager,
        
        // 添加英文到中文的映射
        'Unlimited URL Scanning': trans.unlimitedUrlScan,
        'Advanced SQL Injection Detection': trans.advancedSqlDetection,
        'Automatic Sensitive Information Detection': trans.autoSensitiveDetection,
        'Batch Scanning Tasks': trans.batchScanTasks,
        'WAF Bypass Technology': trans.wafBypassTechnology,
        'Detailed Scan Reports': trans.detailedReports,
        'Data Export Feature': trans.dataExportFeature,
        '24/7 Technical Support': trans.support247,
        
        'All Professional Features': trans.allProFeatures,
        'Multi-user Collaboration': trans.multiUserCollaboration,
        'API Support': trans.apiSupport,
        'Custom Scan Rules': trans.customScanRules,
        'Advanced Report Customization': trans.advancedReportCustom,
        'White-label Service': trans.whitelabelService,
        'Priority Technical Support': trans.prioritySupport,
        'Dedicated Account Manager': trans.dedicatedManager
    };
    
    // 特别处理定价卡片中的功能列表
    const featureLists = document.querySelectorAll('.feature-list');
    featureLists.forEach(list => {
        const listItems = list.querySelectorAll('li');
        listItems.forEach(item => {
            // 获取li元素的文本内容，但排除图标
            let textContent = '';
            const textNodes = [];
            
            // 遍历所有子节点，收集文本节点
            for (let node of item.childNodes) {
                if (node.nodeType === Node.TEXT_NODE) {
                    textNodes.push(node);
                    textContent += node.textContent;
                }
            }
            
            const trimmedText = textContent.trim();
            
            // 如果找到匹配的文本，更新所有文本节点
            if (textMappings[trimmedText]) {
                // 清除现有的文本节点
                textNodes.forEach(node => {
                    node.textContent = '';
                });
                
                // 在第一个文本节点中设置新的文本
                if (textNodes.length > 0) {
                    textNodes[0].textContent = textMappings[trimmedText];
                } else {
                    // 如果没有文本节点，添加一个
                    item.appendChild(document.createTextNode(textMappings[trimmedText]));
                }
            }
        });
    });
}

function updateTechTags(trans) {
    // 创建技术标签映射
    const techTagMappings = {
        'AI算法': trans.aiAlgorithmTag,
        '模式识别': trans.patternRecognitionTag,
        '实时数据': trans.realTimeDataTag,
        '性能监控': trans.performanceMonitorTag,
        '自动化': trans.automationTag,
        '多数据库': trans.multiDatabaseTag,
        '数据可视化': trans.dataVisualizationTag,
        '报告导出': trans.reportExportTag,
        '批量扫描': trans.batchScanTag,
        '任务队列': trans.taskQueueTag,
        '绕过技术': trans.bypassTechTag,
        '高成功率': trans.highSuccessTag,
        
        // 英文到翻译的映射
        'AI Algorithm': trans.aiAlgorithmTag,
        'Pattern Recognition': trans.patternRecognitionTag,
        'Real-time Data': trans.realTimeDataTag,
        'Performance Monitor': trans.performanceMonitorTag,
        'Automation': trans.automationTag,
        'Multi-Database': trans.multiDatabaseTag,
        'Data Visualization': trans.dataVisualizationTag,
        'Report Export': trans.reportExportTag,
        'Batch Scanning': trans.batchScanTag,
        'Task Queue': trans.taskQueueTag,
        'Bypass Technology': trans.bypassTechTag,
        'High Success Rate': trans.highSuccessTag
    };
    
    // 更新所有技术标签
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        const text = tag.textContent.trim();
        if (techTagMappings[text]) {
            tag.textContent = techTagMappings[text];
        }
    });
}

function updatePurchaseInfo(trans) {
    // 更新购买保障信息
    const infoItems = document.querySelectorAll('.info-item');
    const guaranteeTranslations = [
        { title: trans.securityGuarantee, desc: trans.securityGuaranteeDesc },
        { title: trans.regularUpdates, desc: trans.regularUpdatesDesc },
        { title: trans.professionalSupport, desc: trans.professionalSupportDesc },
        { title: trans.moneyBackGuarantee, desc: trans.moneyBackGuaranteeDesc }
    ];
    
    infoItems.forEach((item, index) => {
        if (guaranteeTranslations[index]) {
            const title = item.querySelector('h4');
            const desc = item.querySelector('p');
            
            if (title) title.textContent = guaranteeTranslations[index].title;
            if (desc) desc.textContent = guaranteeTranslations[index].desc;
        }
    });
}

// 初始化语言设置
function initLanguage() {
    const savedLang = localStorage.getItem('preferred-language') || 'zh';
    currentLang = savedLang;
    
    // 设置初始语言按钮状态
    switchLanguage(savedLang);
    
    // 添加事件监听器
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', () => {
            switchLanguage(option.dataset.lang);
        });
    });
    
    // 点击外部关闭下拉菜单
    document.addEventListener('click', (e) => {
        const toggle = document.getElementById('language-toggle');
        if (!toggle.contains(e.target)) {
            toggle.classList.remove('active');
        }
    });
    
    // 设置DOM变化观察器，自动翻译新添加的内容
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // 有新节点添加，检查是否需要翻译
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE && currentLang === 'en') {
                            // 如果当前是英文模式，翻译新添加的节点
                            setTimeout(() => {
                                updateAllTextContent(translations.en);
                            }, 50);
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}

// 导出到全局作用域（用于调试）
window.SQLiScannerLanding = {
    utils,
    performance,
    initNavigation,
    initScrollEffects,
    initAnimations,
    initCounters,
    toggleLanguage,
    switchLanguage,
    initLanguage,
    updateFeatureCards,
    updateSensitiveDataSection,
    updateFeatureLists,
    updatePurchaseInfo,
    updateAllTextContent
}; 