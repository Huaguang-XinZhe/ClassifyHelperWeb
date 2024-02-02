<script setup lang="ts">
// 一段 Markdown 文本（原生字符串）
const markdown = `
设置 SSH 密钥登录；

深入了解 X11 转发：https://blog.csdn.net/qq_40750972/article/details/123963536

--

> -bash: /root/.bashrc: line 88: syntax error: unexpected end of file

处理 \`~/.bashrc\` 文件的异常；

--

有没有插件能把 IDEA 的文档描述中文化？

![](https://image-bed-1315938829.cos.ap-nanjing.myqcloud.com/image-20240108134746328.png)

--

(***values: object**, sep: str | None = " ", end: str | None = "\\n", file: SupportsWrite[str] | None = None, flush: Literal[False] = False) -> None

这是 python 的 print 方法，后面的两个类型是什么意思？\`*values\` 又是什么意思？

(**__iterable: Iterable[LiteralString]**, /) -> LiteralString

这是 join 方法的签名，这又是什么意思？

--

Docker Desktop 如何汉化？

镜像分析出漏洞是怎么回事？

![image-20240108223716098](https://image-bed-1315938829.cos.ap-nanjing.myqcloud.com/image-20240108223716098.png)

怎么我的镜像推不到 Docker Hub？

> denied: requested access to the resource is denied

--

在 Linux 服务器上如何卸载应用呢？
`;
</script>

<template>
  <VueShowdown :markdown="markdown" />
</template>

<style scoped></style>
