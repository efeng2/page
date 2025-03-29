# AJAX 请求（异步数据获取）
**2025-02-20**  

AJAX（Asynchronous JavaScript and XML）允许 Web 应用异步发送和获取数据，而不会阻塞其他代码执行。  

## HTML 表单示例  
基础表单（通过 AJAX 提交数据）：  
```html
<form role="form" method="GET" action="/signup">
  <label for="unameBox">用户名：</label>
  <input type="text" name="username" id="unameBox">
  <button type="submit">注册！</button>
</form>
```

动态请求示例（如调用 GitHub API）：  
```html
<form method="GET" action="https://api.github.com/search/repositories" onSubmit={handleSubmit}>
  <!-- 表单输入框 -->
</form>
```

## JavaScript Fetch API 示例  
使用 `fetch` 实现异步请求：  
```javascript
import "whatwg-fetch";

const handleSubmit = async (event) => {
  event.preventDefault();
  
  // 获取输入值
  const queryInput = document.getElementById("searchInput").value;
  const url = `https://api.github.com/search/repositories?q=${queryInput}`;
  
  console.log("正在请求：", url);

  // 方案1：Promise 链式调用 (.then)
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    });

  // 方案2：async/await（推荐写法）
  try {
    const response = await fetch(url);
    const dataObj = await response.json();
    console.log(dataObj);
    // 更新状态（如 React 场景）
    setStateData(dataObj.items);
  } catch (error) {
    console.error("请求失败：", error);
  }
};
```

### 核心要点  
1. **异步处理** – AJAX 实现非阻塞请求。  
2. **Fetch API** – 替代传统 `XMLHttpRequest` 的现代方案。  
3. **错误处理** – 使用 `try/catch` 捕获 `async/await` 异常。  
4. **状态管理** – 用返回数据动态更新 UI。  