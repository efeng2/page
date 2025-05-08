# 如何构建React应用  
2025-02-09  

## 启动应用  
进入项目目录执行以下命令：  

```bash
cd path/to/react

# 初始化React项目  
npm create vite@latest . -- --template react 

# 安装依赖  
npm install

# 启动开发服务器  
npm run dev
```

## 基础React配置  
在main.jsx文件中导入必要的React库并创建根渲染节点：  

```jsx
// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

// 引入CSS文件  
import './css/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <App />
);
```

## 组件 - 创建自定义标签  
React组件定义了自定义HTML标签，每个组件名称应采用大驼峰命名法(PascalCase)。  

组件使用JSX语法编写  

## JSX - XML语法扩展  
JSX是类似HTML的JavaScript语法扩展，实际会被Babel和Webpack转译为JavaScript代码。  

```jsx
// src/components/HeaderComponent.jsx

// 定义组件函数，props是传入的参数  
function HeaderComponent(props) {
    return (
        <div>
            <header>
                <h1>React演示页头</h1>
            </header>
        </div>
    );
}
```

```jsx
// src/components/App.jsx

import React from 'react';
import { HeaderComponent } from './HeaderComponent.jsx';

function App() {
    return (
        <>
            <HeaderComponent />
        </>
    );
}
export default App;
```