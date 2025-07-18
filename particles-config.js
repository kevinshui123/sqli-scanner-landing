// 粒子系统配置
const particleConfigs = {
    // 主要粒子配置 - Web3风格
    main: {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981']
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.15,
                random: true,
                anim: {
                    enable: true,
                    speed: 0.5,
                    opacity_min: 0.05,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.5,
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
                speed: 1,
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
                        opacity: 0.3
                    }
                },
                bubble: {
                    distance: 200,
                    size: 8,
                    duration: 2,
                    opacity: 0.8,
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
    },

    // 网络风格配置
    network: {
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    value_area: 1000
                }
            },
            color: {
                value: '#6366f1'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.2,
                random: false
            },
            size: {
                value: 2,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 200,
                color: '#6366f1',
                opacity: 0.15,
                width: 1.5
            },
            move: {
                enable: true,
                speed: 0.8,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'bounce',
                bounce: true
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 200,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 3
                }
            }
        },
        retina_detect: true
    },

    // 矩阵风格配置
    matrix: {
        particles: {
            number: {
                value: 100,
                density: {
                    enable: false
                }
            },
            color: {
                value: '#00ff00'
            },
            shape: {
                type: 'char',
                character: {
                    value: ['0', '1', 'A', 'B', 'C', 'D', 'E', 'F'],
                    font: 'Courier New',
                    style: '',
                    weight: '',
                    fill: true
                }
            },
            opacity: {
                value: 0.8,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0,
                    sync: false
                }
            },
            size: {
                value: 16,
                random: false
            },
            line_linked: {
                enable: false
            },
            move: {
                enable: true,
                speed: 3,
                direction: 'bottom',
                random: false,
                straight: true,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: false
                },
                onclick: {
                    enable: false
                },
                resize: true
            }
        },
        retina_detect: true
    },

    // 最小化配置（移动端）
    minimal: {
        particles: {
            number: {
                value: 30,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#6366f1'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.1,
                random: false
            },
            size: {
                value: 2,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 120,
                color: '#6366f1',
                opacity: 0.08,
                width: 1
            },
            move: {
                enable: true,
                speed: 0.5,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: false
                },
                onclick: {
                    enable: false
                },
                resize: true
            }
        },
        retina_detect: true
    }
};

// 初始化粒子系统
function initParticleSystem() {
    const particleContainer = document.getElementById('particles-js');
    if (!particleContainer || typeof particlesJS === 'undefined') {
        console.warn('Particles.js not found or container missing');
        return;
    }

    // 检测设备性能和屏幕大小
    const isMobile = window.innerWidth <= 768;
    const isLowPerformance = navigator.hardwareConcurrency <= 2 || 
                            /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // 选择合适的配置
    let config;
    if (isMobile || isLowPerformance) {
        config = particleConfigs.minimal;
    } else {
        config = particleConfigs.main;
    }

    // 应用配置
    particlesJS('particles-js', config);

    // 添加性能监控
    monitorParticlePerformance();
}

// 性能监控
function monitorParticlePerformance() {
    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 60;

    function checkPerformance() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
            fps = frameCount;
            frameCount = 0;
            lastTime = currentTime;

            // 如果FPS过低，降低粒子质量
            if (fps < 30) {
                optimizeParticles();
            }
        }

        requestAnimationFrame(checkPerformance);
    }

    requestAnimationFrame(checkPerformance);
}

// 优化粒子效果
function optimizeParticles() {
    const canvas = document.querySelector('#particles-js canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            // 降低渲染质量
            ctx.imageSmoothingEnabled = false;
        }
    }

    // 重新初始化为最小配置
    particlesJS('particles-js', particleConfigs.minimal);
}

// 动态切换粒子主题
function switchParticleTheme(theme) {
    const config = particleConfigs[theme] || particleConfigs.main;
    particlesJS('particles-js', config);
}

// 创建自定义粒子效果
function createCustomParticles(containerId, options = {}) {
    const defaultOptions = {
        count: 50,
        color: '#6366f1',
        size: 3,
        speed: 1,
        opacity: 0.1
    };

    const finalOptions = { ...defaultOptions, ...options };
    
    const customConfig = {
        particles: {
            number: {
                value: finalOptions.count,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: finalOptions.color
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: finalOptions.opacity,
                random: true
            },
            size: {
                value: finalOptions.size,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: finalOptions.color,
                opacity: finalOptions.opacity,
                width: 1
            },
            move: {
                enable: true,
                speed: finalOptions.speed,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
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
                repulse: {
                    distance: 100,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    };

    if (typeof particlesJS !== 'undefined') {
        particlesJS(containerId, customConfig);
    }
}

// 响应式处理
function handleResize() {
    const canvas = document.querySelector('#particles-js canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

// 事件监听
window.addEventListener('resize', handleResize);

// 页面可见性API - 暂停/恢复粒子动画以节省性能
document.addEventListener('visibilitychange', function() {
    const canvas = document.querySelector('#particles-js canvas');
    if (canvas) {
        if (document.hidden) {
            // 页面隐藏时暂停动画
            canvas.style.animationPlayState = 'paused';
        } else {
            // 页面显示时恢复动画
            canvas.style.animationPlayState = 'running';
        }
    }
});

// 添加粒子交互效果
function addParticleInteractions() {
    const canvas = document.querySelector('#particles-js canvas');
    if (!canvas) return;

    // 鼠标跟随效果
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // 键盘交互
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space') {
            // 空格键触发爆炸效果
            triggerParticleExplosion(mouseX, mouseY);
        }
    });
}

// 粒子爆炸效果
function triggerParticleExplosion(x, y) {
    // 创建临时粒子爆炸效果
    const explosion = document.createElement('div');
    explosion.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: #6366f1;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
    `;
    
    document.body.appendChild(explosion);
    
    // 创建多个粒子
    for (let i = 0; i < 20; i++) {
        const particle = explosion.cloneNode(true);
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 5 + Math.random() * 3;
        
        let currentX = x;
        let currentY = y;
        let vx = Math.cos(angle) * velocity;
        let vy = Math.sin(angle) * velocity;
        
        document.body.appendChild(particle);
        
        function animateParticle() {
            currentX += vx;
            currentY += vy;
            vy += 0.2; // 重力
            vx *= 0.98; // 阻力
            
            particle.style.left = currentX + 'px';
            particle.style.top = currentY + 'px';
            particle.style.opacity = parseFloat(particle.style.opacity || 1) - 0.02;
            
            if (parseFloat(particle.style.opacity) > 0 && currentY < window.innerHeight) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        }
        
        requestAnimationFrame(animateParticle);
    }
    
    explosion.remove();
}

// 导出配置和函数
window.ParticleSystem = {
    configs: particleConfigs,
    init: initParticleSystem,
    switch: switchParticleTheme,
    createCustom: createCustomParticles,
    triggerExplosion: triggerParticleExplosion
};

// 自动初始化
document.addEventListener('DOMContentLoaded', function() {
    // 延迟初始化以确保页面完全加载
    setTimeout(initParticleSystem, 500);
    setTimeout(addParticleInteractions, 1000);
}); 