# nextop

> We build dreams for future forever

# pack.js 说明：
此脚本目前仅有登录功能，因考虑到密码需要保密，所以密码需要手动输入，邮箱获取git的全局user.email。此脚本windows和macOS通用
<br>
node命令运行,在控制台输入
```nodejs
node pack.js
```

# 此项目发版流程：
1、执行 lerna updated 确定哪些包需要被发布
lerna success found 1 package ready to publish. 1 代表一个包需要被发布

2、对所有需要 update 的 package 进行版本的更新，并写入 package.json

3、对有需要 update 的 package 进行依赖声明 specified with a caret (^)

4、创建一个 git commit 和 tag

5、把包发布至 npm

lerna publish --npm-tag=beta 为 bate 版本