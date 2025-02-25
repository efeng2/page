# 如何使用 Github Pages 免费发布, 部署网站
2024-08-05

## 1. Github Pages
Github Pages 是一个静态站点托管服务，这个服务为个人、项目或组织提供了一个简单的方式来创建和部署网站

本教程专为初学者设计，如果您已经克隆了网站代码，并只需进行发布，请直接跳至**第四步 "发布"**。
## 2. 创建新的 Github Respository

进入 [github](https://github.com/)， 点击 "Sign in" 登录账号（如没有账号请先注册）

点击 "Create respository"/ "📕 New"

为您的 Respository 命名，例如 "page"

![Page](<../../images/blogs/如何使用_github_pages_免费发布,_部署网站.png>)

划到页面底部，再次点击 "Create respository" 完成创建

## 3. 克隆 Respository
本步骤将使用Git，如果您尚未安装Git，请前往[git官网](https://git-scm.com/download/win)下载并安装。安装过程中，使用默认设置即可

打开命令提示符（cmd），切换到您想要编辑网站文件的目录

```bash
cd <文件夹路径>
```

进入刚才创建的 Respository，复制仓库地址

![Page](<../../images/blogs/如何使用 Github Pages 免费发布, 部署网站2.png>)

在cmd中执行以下命令，将复制的地址粘贴在 `git clone` 后面
```bash
git clone http://github.com/username/page.git
```
![Page](<../../images/blogs/如何使用 Github Pages 免费发布, 部署网站3.png>)


在克隆下来的 p 文件夹中，新建一个名为 `index.html` 的文件

编辑文件 index.html，这是您网站的HTML文件，例如：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Page </title>
</head>
<body>
    <h1> 欢迎来到你的网站 </h1>
</body>
</html>
```

修改完保存，提交并推送更改到仓库

```bash
cd page
```

```bash
git add .
git commit -m "<备注的信息>"
git push
```

如果出现以下错误，说明您的电脑尚未配置 GitHub 账户信息，请按照提示进行设置

```bash
Author identity unknown
*** Please tell me who you are.
Run
git config--global user.email "you@example.com'git config--global user.name "Your Name"
to set your account's default identity.
0mit --global to set the identity only in this repository.
```

输入以下命令，将 `<邮箱>` 和 `<账户>` 替换为您的邮箱和账户名：

```bash
git config --global user.email "<邮箱>.com"
git config --global user.name "<账户>"
git commit -m "<备注信息>"
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/5f6e64824e55493f8cb0d762a7718a6b.png)


弹出窗口使用浏览器登录页面（Sign in with your browser）

<p align="center">
  <img width="300"  src="https://i-blog.csdnimg.cn/direct/6ed9850601a546c09ce2aa24663cf6b0.png">
</p>

## 4. 发布
回到刚才的 Respository，点击 "Settings"，在左边菜单 "Code and automation" 下找到 "Pages"
在 Branch 下选项中选择“main”，然后点击 “Save”

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/2926701f07944fed97575eb2c66d2bc5.png)

稍等片刻后刷新网站，页面的顶部将显示发布后的网站的地址，点击 Visit site 您就可以看到发布后的网站内容了

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/84dfd9d3bd73421b9eaace4a5571f37c.png)

## 5. 更新
以后在文件夹中完成文件修改后，若想要推送更改，请打开命令提示符（cmd）并执行以下命令就可以了

```bash
cd <文件夹路径>
git add .
git commit -m "<备注的信息>"
git push
```

这样就可以更新网站了。请注意，更新可能需要稍等片刻才能生效
