# GamFive - Premium Gaming Gear Official Website

一个为游戏外设品牌GamFive打造的高端、极客风格官方网站。

## 🎮 网站特色

### 🌟 高端设计
- **赛博朋克风格**：采用青色和洋红色的霓虹色彩搭配
- **极客美学**：科技感十足的UI设计和动画效果
- **响应式设计**：完美适配各种设备屏幕

### ⚡ 炫酷动画
- **页面加载动画**：带有GamFive Logo的加载界面
- **页面切换效果**：流畅的页面转场动画
- **粒子系统**：动态粒子背景效果
- **故障艺术效果**：赛博朋克风格的文字故障动画

### 🎯 交互功能
- **单页应用**：无刷新页面切换
- **贪吃蛇游戏**：在About页面内置的经典小游戏
- **动态特效**：按钮悬停、卡片交互等丰富效果

## 📁 文件结构

```
gamfive.github.io-main/
├── index.html          # 主HTML文件
├── styles.css          # 样式文件
├── script.js           # JavaScript功能
└── README.md           # 说明文档
```

## 🚀 快速开始

### 本地预览
```bash
# 进入项目目录
cd gamfive.github.io-main

# 启动本地服务器
python3 -m http.server 8000

# 或使用Node.js
npx http-server

# 在浏览器访问
# http://localhost:8000
```

### 部署到GitHub Pages
1. 将代码推送到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择主分支作为源
4. 网站将自动部署

## 🎨 定制说明

### Logo替换
网站中的GamFive Logo使用SVG格式，可以轻松替换：

1. **页面加载Logo**：在`index.html`中找到`#gamfive-logo`
2. **导航栏Logo**：在`index.html`中找到`.nav-logo-svg`
3. 替换SVG内容或修改文本

### 颜色主题
在`styles.css`的`:root`选择器中定义了所有主题色：
```css
:root {
    --primary-cyan: #00f5ff;      /* 主青色 */
    --primary-magenta: #ff0080;   /* 主洋红色 */
    --dark-bg: #0a0a0a;          /* 深色背景 */
    --text-primary: #ffffff;      /* 主文字色 */
    /* ... 更多颜色变量 */
}
```

### Indiegogo链接
在`script.js`的`initOrderButton`方法中修改跳转链接：
```javascript
// 替换alert为实际链接
window.open('https://your-indiegogo-campaign-link', '_blank');
```

## 🎮 游戏控制

### 贪吃蛇游戏
- **WASD键** 或 **方向键** 控制蛇的移动
- **开始游戏** 按钮启动游戏
- **重置** 按钮重新开始
- 吃到食物得分+10

## 📱 响应式断点

- **桌面端**：> 1200px
- **平板端**：768px - 1200px  
- **手机端**：< 768px
- **小屏手机**：< 480px

## 🛠 技术栈

- **HTML5**：语义化标签和Canvas游戏
- **CSS3**：Flexbox/Grid布局、动画和响应式设计
- **JavaScript (ES6+)**：模块化类和现代特性
- **Google Fonts**：Orbitron和Rajdhani字体
- **Unsplash**：高质量图片资源

## 🌈 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📄 许可证

本项目为GamFive品牌定制开发，所有权归AIMORELOGY LIMITED所有。

## 📞 联系方式

如有任何问题或需要技术支持，请联系：
- 邮箱：info@gamfive.com
- 官网：[即将上线]

---

**GamFive** - 让游戏装备成为你灵魂的延伸 🎮✨ 