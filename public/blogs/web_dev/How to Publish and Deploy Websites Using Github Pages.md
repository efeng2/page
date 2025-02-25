# How to Publish and Deploy Websites Using Github Pages
2024-08-05

## 1. Github Pages
Github Pages is a static site hosting service that provides a simple way for individuals, projects, or organizations to create and deploy websites.
This tutorial is designed for beginners. If you have already cloned the website code and just need to publish it, please jump directly to **Step 4 "Publishing"**.
## 2. Create a New Github Repository
Go to [github](https://github.com/), click "Sign in" to log in to your account (register if you don't have one).
Click "Create repository" / "📕 New".
Name your Repository, for example "page".
![Page](<../../images/blogs/how_to_publish_and_deploy_websites_using_github_pages.png>)
Scroll to the bottom of the page and click "Create repository" again to complete the creation.
## 3. Clone the Repository
This step will use Git. If you haven't installed Git yet, please go to [git's official website](https://git-scm.com/download/win) to download and install it. Use the default settings during the installation process.
Open the Command Prompt (cmd) and switch to the directory where you want to edit the website files.
```bash
cd <folder path>
```
Go to the Repository you just created, copy the repository address.
![Page](<../../images/blogs/How to Publish and Deploy Websites Using Github Pages2.png>)
In cmd, execute the following command, and paste the copied address after `git clone`
```bash
git clone http://github.com/username/page.git
```
![Page](<../../images/blogs/How to Publish and Deploy Websites Using Github Pages3.png>)
In the cloned "p" folder, create a new file named `index.html`.
Edit the file index.html; this is your website's HTML file, for example:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Page </title>
</head>
<body>
    <h1> Welcome to your website </h1>
</body>
</html>
```
After making changes, save the file, commit, and push the changes to the repository.
```bash
cd page
```
```bash
git add .
git commit -m "<note information>"
git push
```
If you encounter the following error, it means your computer has not configured GitHub account information. Please set it up as prompted.
```bash
Author identity unknown
*** Please tell me who you are.
Run
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
to set your account's default identity.
Omit --global to set the identity only in this repository.
```
Enter the following commands, replacing `<email>` and `<account>` with your email and account name:
```bash
git config --global user.email "<email>.com"
git config --global user.name "<account>"
git commit -m "<note information>"
```
![Insert image description here](https://i-blog.csdnimg.cn/direct/5f6e64824e55493f8cb0d762a7718a6b.png)
Use the browser to sign in to the page in the pop-up window (Sign in with your browser)

## 4. Publishing
Go back to the Repository, click "Settings", and find "Pages" under the "Code and automation" menu on the left. Select "main" under the Branch option and then click "Save".
![Insert image description here](https://i-blog.csdnimg.cn/direct/2926701f07944fed97575eb2c66d2bc5.png)
After a moment, refresh the site, and the address of the published website will be displayed at the top of the page. Click "Visit site" and you will see the content of the published website.
![Insert image description here](https://i-blog.csdnimg.cn/direct/84dfd9d3bd73421b9eaace4a5571f37c.png)
## 5. Updating
In the future, after making modifications to the files in the folder, if you want to push the changes, please open the Command Prompt (cmd) and execute the following commands:
```bash
cd <folder path>
git add .
git commit -m "<note information>"
git push
```
This will update the website. Please note that updates may take a moment to take effect.
