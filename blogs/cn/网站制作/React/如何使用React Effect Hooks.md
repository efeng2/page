# 如何使用React Effect Hooks  
2025-02-20  

## 什么是effect hooks  
Effect hooks仅在页面加载时运行一次。  

它们特别适用于异步流程，可防止无限执行循环。  

## 基础useEffect语法  

```jsx  
import React, { useState, useEffect } from 'react';  

function ExampleComponent() {  
  const [data, setData] = useState(null);  
  const [queryInput, setQueryInput] = useState('react');  

  useEffect(() => {  
    console.log("Effect hook触发");  
    
    const url = `https://api.github.com/search/repositories?q=${queryInput}`;  
    console.log("发送请求至", url);  

    fetch(url)  
      .then(response => response.json())  
      .then(dataObj => {  
        console.log(dataObj);  
        setData(dataObj.items);  
      });  
  }, [queryInput]); // 依赖数组 - 当queryInput变化时effect会重新运行  

  return (  
    <div>  
      {/* 在此渲染数据 */}  
    </div>  
  );  
}  
```  

## 仅运行一次（空依赖数组）  

```jsx  
useEffect(() => {  
  // 这段代码仅在组件挂载时运行一次  
  console.log("组件已挂载");  
    
  // 获取初始数据  
  fetchInitialData();  
    
}, []); // 空数组表示仅运行一次  
```  

## 清理函数  
清理函数用于处理资源清理、防止内存泄漏和管理状态（清除事件监听器、定时器、中止请求）  

```jsx  
import React, { useState, useEffect } from "react";  

function MyComponent(props) {  
  useEffect(() => {  
    console.log("设置订阅或事件监听器");  
    
    // 清理函数  
    return function() {  
      console.log("组件卸载中 - 正在清理");  
      // 移除订阅、事件监听器等  
    };  
  }, []);  

  return <div>我的组件内容</div>;  
}  
```  

## 关键要点：  
1. **依赖数组**控制effect的运行时机：  
   - `[]` - 仅在挂载时运行  
   - `[var1, var2]` - 当这些变量变化时运行  
   - 无数组 - 每次渲染后都运行  

2. **清理函数**对于以下操作至关重要：  
   - 移除事件监听器  
   - 取消API请求  
   - 清除定时器/间隔  
   - 其他资源清理  

3. **异步模式**：  
   - 在useEffect内部使用`.then()`链  
   - 或在effect内部声明async函数并调用它