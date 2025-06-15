// Page Loading Animation
document.addEventListener('DOMContentLoaded', function() {
    const pageLoader = document.getElementById('page-loader');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Hide loader after completion
            setTimeout(() => {
                pageLoader.classList.add('hidden');
                setTimeout(() => {
                    pageLoader.style.display = 'none';
                }, 500);
            }, 800);
        }
        loadingProgress.style.width = progress + '%';
    }, 150);
});

// Page Navigation System
class PageManager {
    constructor() {
        this.currentPage = 'home';
        this.pages = document.querySelectorAll('.page');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.pageTransition = document.getElementById('page-transition');
        
        this.initNavigation();
    }
    
    initNavigation() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.getAttribute('data-page');
                if (targetPage !== this.currentPage) {
                    this.changePage(targetPage);
                }
            });
        });
    }
    
    changePage(targetPage) {
        // Show transition
        this.pageTransition.classList.add('active');
        
        setTimeout(() => {
            // Hide current page
            this.pages.forEach(page => page.classList.remove('active'));
            
            // Show target page
            const targetPageElement = document.getElementById(`${targetPage}-page`);
            if (targetPageElement) {
                targetPageElement.classList.add('active');
            }
            
            // Update navigation
            this.updateNavigation(targetPage);
            this.currentPage = targetPage;
            
            // Hide transition
            setTimeout(() => {
                this.pageTransition.classList.remove('active');
            }, 300);
        }, 300);
    }
    
    updateNavigation(activePage) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === activePage) {
                link.classList.add('active');
            }
        });
    }
}

// Snake Game Implementation
class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('snake-game');
        this.ctx = this.canvas.getContext('2d');
        this.startButton = document.getElementById('start-game');
        this.resetButton = document.getElementById('reset-game');
        this.scoreElement = document.getElementById('score');
        
        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;
        
        this.snake = [
            {x: 10, y: 10}
        ];
        this.food = {};
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.gameRunning = false;
        
        this.initGame();
        this.setupControls();
    }
    
    initGame() {
        this.generateFood();
        this.draw();
        
        this.startButton.addEventListener('click', () => {
            if (!this.gameRunning) {
                this.startGame();
            }
        });
        
        this.resetButton.addEventListener('click', () => {
            this.resetGame();
        });
    }
    
    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (!this.gameRunning) return;
            
            const key = e.key.toLowerCase();
            
            // Prevent reverse direction
            if ((key === 'arrowleft' || key === 'a') && this.dx === 0) {
                this.dx = -1;
                this.dy = 0;
            } else if ((key === 'arrowup' || key === 'w') && this.dy === 0) {
                this.dx = 0;
                this.dy = -1;
            } else if ((key === 'arrowright' || key === 'd') && this.dx === 0) {
                this.dx = 1;
                this.dy = 0;
            } else if ((key === 'arrowdown' || key === 's') && this.dy === 0) {
                this.dx = 0;
                this.dy = 1;
            }
        });
    }
    
    startGame() {
        this.gameRunning = true;
        this.startButton.textContent = 'Playing...';
        this.startButton.disabled = true;
        this.gameLoop();
    }
    
    gameLoop() {
        if (!this.gameRunning) return;
        
        setTimeout(() => {
            this.clearCanvas();
            this.moveSnake();
            this.drawFood();
            this.drawSnake();
            
            if (this.checkGameOver()) {
                this.endGame();
                return;
            }
            
            this.gameLoop();
        }, 150);
    }
    
    clearCanvas() {
        this.ctx.fillStyle = '#050505';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid
        this.ctx.strokeStyle = 'rgba(0, 245, 255, 0.1)';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i <= this.tileCount; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.gridSize, 0);
            this.ctx.lineTo(i * this.gridSize, this.canvas.height);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.gridSize);
            this.ctx.lineTo(this.canvas.width, i * this.gridSize);
            this.ctx.stroke();
        }
    }
    
    moveSnake() {
        const head = {x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy};
        this.snake.unshift(head);
        
        // Check if food is eaten
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.scoreElement.textContent = this.score;
            this.generateFood();
        } else {
            this.snake.pop();
        }
    }
    
    drawSnake() {
        this.snake.forEach((segment, index) => {
            if (index === 0) {
                // Head
                this.ctx.fillStyle = '#00f5ff';
                this.ctx.shadowColor = '#00f5ff';
                this.ctx.shadowBlur = 10;
            } else {
                // Body
                this.ctx.fillStyle = '#ff0080';
                this.ctx.shadowColor = '#ff0080';
                this.ctx.shadowBlur = 5;
            }
            
            this.ctx.fillRect(
                segment.x * this.gridSize + 2,
                segment.y * this.gridSize + 2,
                this.gridSize - 4,
                this.gridSize - 4
            );
        });
        
        this.ctx.shadowBlur = 0;
    }
    
    generateFood() {
        this.food = {
            x: Math.floor(Math.random() * this.tileCount),
            y: Math.floor(Math.random() * this.tileCount)
        };
        
        // Make sure food doesn't spawn on snake
        for (let segment of this.snake) {
            if (segment.x === this.food.x && segment.y === this.food.y) {
                this.generateFood();
                return;
            }
        }
    }
    
    drawFood() {
        this.ctx.fillStyle = '#ffff00';
        this.ctx.shadowColor = '#ffff00';
        this.ctx.shadowBlur = 15;
        
        this.ctx.fillRect(
            this.food.x * this.gridSize + 4,
            this.food.y * this.gridSize + 4,
            this.gridSize - 8,
            this.gridSize - 8
        );
        
        this.ctx.shadowBlur = 0;
    }
    
    checkGameOver() {
        const head = this.snake[0];
        
        // Wall collision
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            return true;
        }
        
        // Self collision
        for (let i = 1; i < this.snake.length; i++) {
            if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                return true;
            }
        }
        
        return false;
    }
    
    endGame() {
        this.gameRunning = false;
        this.startButton.textContent = 'Game Over - Restart';
        this.startButton.disabled = false;
        
        // Game over effect
        this.ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '24px Orbitron';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 30);
    }
    
    resetGame() {
        this.snake = [{x: 10, y: 10}];
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.gameRunning = false;
        this.scoreElement.textContent = this.score;
        this.startButton.textContent = 'Start Game';
        this.startButton.disabled = false;
        
        this.generateFood();
        this.draw();
    }
    
    draw() {
        this.clearCanvas();
        this.drawFood();
        this.drawSnake();
    }
}

// Interactive Elements
class InteractiveElements {
    constructor() {
        this.initOrderButton();
        this.initScrollEffects();
        this.initParticleEffects();
    }
    
    initOrderButton() {
        const orderButton = document.getElementById('order-button');
        if (orderButton) {
            orderButton.addEventListener('click', () => {
                // Create ripple effect
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    width: 0;
                    height: 0;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                orderButton.style.position = 'relative';
                orderButton.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // Simulate redirect (replace with actual Indiegogo link)
                setTimeout(() => {
                    alert('Redirecting to Indiegogo campaign...\n(Replace this with actual campaign link)');
                }, 300);
            });
        }
    }
    
    initScrollEffects() {
        // Add smooth scrolling and parallax effects
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const particles = document.querySelectorAll('.particle');
            
            particles.forEach((particle, index) => {
                const speed = 0.5 + (index * 0.1);
                particle.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
    
    initParticleEffects() {
        // Add CSS animation keyframes dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                0% {
                    width: 0;
                    height: 0;
                    opacity: 1;
                }
                100% {
                    width: 300px;
                    height: 300px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Navbar scroll effect
class NavbarController {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.lastScrollTop = 0;
        this.initScrollEffect();
    }
    
    initScrollEffect() {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                this.navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                this.navbar.style.backdropFilter = 'blur(15px)';
            } else {
                this.navbar.style.background = 'rgba(10, 10, 10, 0.9)';
                this.navbar.style.backdropFilter = 'blur(10px)';
            }
            
            this.lastScrollTop = scrollTop;
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize page manager
    const pageManager = new PageManager();
    
    // Initialize snake game
    const snakeGame = new SnakeGame();
    
    // Initialize interactive elements
    const interactiveElements = new InteractiveElements();
    
    // Initialize navbar controller
    const navbarController = new NavbarController();
    
    // Add some extra visual effects
    const addVisualEffects = () => {
        // Glitch effect for titles
        const glitchTitles = document.querySelectorAll('.glitch-title');
        glitchTitles.forEach(title => {
            title.addEventListener('mouseenter', () => {
                title.style.animation = 'glitch 0.3s ease-in-out';
            });
            
            title.addEventListener('animationend', () => {
                title.style.animation = '';
            });
        });
        
        // Card hover effects
        const cards = document.querySelectorAll('.info-card, .contact-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const randomColor = Math.random() > 0.5 ? 'var(--primary-cyan)' : 'var(--primary-magenta)';
                card.style.borderColor = randomColor;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.borderColor = 'rgba(0, 245, 255, 0.2)';
            });
        });
    };
    
    // Add effects after a short delay to ensure all elements are loaded
    setTimeout(addVisualEffects, 500);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Adjust canvas size if needed
    const canvas = document.getElementById('snake-game');
    if (canvas && window.innerWidth < 480) {
        canvas.width = 250;
        canvas.height = 250;
    } else if (canvas && window.innerWidth < 768) {
        canvas.width = 300;
        canvas.height = 300;
    }
});

// Performance optimization
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Debounced scroll handler for better performance
const debouncedScrollHandler = debounce(() => {
    // Additional scroll-based animations can be added here
}, 16);

window.addEventListener('scroll', debouncedScrollHandler); 