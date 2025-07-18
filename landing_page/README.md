# SQLi Scanner 落地页

一个现代化的Web3风格落地页，专为SQL注入扫描器工具设计。

## 🌟 特性

### 🎨 视觉设计
- **Web3风格设计**: 采用现代化的赛博朋克风格
- **高级动画效果**: 粒子系统、悬停动画、过渡效果
- **响应式设计**: 完美适配各种设备屏幕
- **玻璃形态设计**: 毛玻璃效果和半透明元素
- **渐变色彩**: 动态渐变背景和文字效果

### ⚡ 交互体验
- **粒子系统**: 动态背景粒子效果
- **平滑滚动**: 锚点导航和滚动动画
- **悬停效果**: 3D倾斜、磁吸、发光效果
- **打字动画**: 代码终端打字效果
- **数字计数**: 统计数据动画展示

### 🛠 技术栈
- **HTML5**: 语义化标签结构
- **CSS3**: 现代CSS特性和动画
- **JavaScript**: 原生JS交互逻辑
- **Particles.js**: 粒子系统库
- **AOS**: 滚动动画库
- **GSAP**: 高性能动画库

## 📁 文件结构

```
landing_page/
├── index.html              # 主页面
├── styles/
│   ├── main.css            # 主要样式
│   ├── animations.css      # 动画效果
│   └── components.css      # 组件样式
├── scripts/
│   ├── main.js            # 主要JavaScript
│   └── particles-config.js # 粒子配置
└── README.md              # 说明文档
```

## 🚀 使用说明

### 1. 直接打开
```bash
# 直接用浏览器打开
open index.html
```

### 2. 本地服务器
```bash
# 使用Python启动简单服务器
python -m http.server 8080

# 或使用Node.js
npx serve .

# 然后访问 http://localhost:8080
```

### 3. 集成到项目
将整个 `landing_page` 文件夹复制到您的Web服务器根目录。

## 🎯 主要区域

### 导航栏
- 固定顶部导航
- 滚动时样式变化
- 平滑锚点跳转
- 移动端响应式菜单

### 英雄区域
- 主标题和描述
- 统计数据动画
- 终端代码演示
- 浮动图标效果

### 功能展示
- 6个核心功能介绍
- 卡片悬停动画
- 技术标签展示
- AOS滚动动画

### 界面截图
- 工具界面模拟
- 窗口样式设计
- 数据表格展示
- 交互式演示

### 下载区域
- 下载按钮
- 版本信息
- 兼容性说明
- 特性列表

## 🎨 定制说明

### 颜色主题
在 `styles/main.css` 中修改CSS变量：

```css
:root {
    --primary-color: #6366f1;    /* 主色调 */
    --secondary-color: #8b5cf6;  /* 辅助色 */
    --accent-color: #06b6d4;     /* 强调色 */
    /* ... 更多颜色变量 */
}
```

### 粒子效果
在 `scripts/particles-config.js` 中调整配置：

```javascript
// 切换不同粒子主题
ParticleSystem.switch('network');  // 网络风格
ParticleSystem.switch('matrix');   // 矩阵风格
ParticleSystem.switch('minimal');  // 简约风格
```

### 动画效果
在 `styles/animations.css` 中自定义动画：

```css
/* 添加自定义动画 */
@keyframes customAnimation {
    /* 动画关键帧 */
}
```

## 📱 响应式支持

- **桌面端**: 1200px+ 完整体验
- **平板端**: 768px-1199px 适配布局
- **移动端**: <768px 移动优化

## 🔧 浏览器兼容性

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## ⚡ 性能优化

### 1. 图片优化
- 使用WebP格式
- 启用懒加载
- 压缩图片文件

### 2. 动画优化
- GPU硬件加速
- 减少重排重绘
- 节流滚动事件

### 3. 加载优化
- 关键CSS内联
- 非关键资源异步加载
- 字体预加载

## 🛠 开发指南

### 添加新功能卡片
1. 在HTML中添加卡片结构
2. 使用 `data-aos` 属性添加动画
3. 在CSS中定义样式
4. 在JS中添加交互逻辑

### 修改截图展示
1. 更新HTML中的模拟内容
2. 调整CSS样式匹配真实界面
3. 添加悬停和点击交互

### 集成真实数据
1. 修改统计数字为真实数据
2. 连接后端API获取动态数据
3. 实现实时更新功能

## 📝 注意事项

1. **性能考虑**: 在低端设备上会自动降低粒子效果
2. **网络优化**: 建议启用CDN加速
3. **SEO优化**: 已包含基本的meta标签
4. **安全性**: 所有外部链接使用安全协议

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 创建Pull Request

## 📄 许可证

MIT License - 详见项目根目录LICENSE文件

## 🔗 相关链接

- [SQL注入扫描器主项目](../README.md)
- [Web前端应用](../web_sqli_scanner/README.md)
- [技术文档](../docs/README.md)

---

**注意**: 此落地页与主工具完全独立，可以单独部署使用。 