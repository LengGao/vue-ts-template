## 简介

工作中时常需要自行搭建工程。而我认为市面上流行的模板或脚手架。考虑的不全面或功能单一，所以自己动手搭建通用工程模板，同时检验自己对前端主流技术的掌握程度。

## 目标

适用于不同平台，可使用不同构建工具，快速搭建电脑与手机端 web 应用，满足站点、后台管理、手机站点的开发需求。

## 架构设计

布局：
路由：
网络通信：
权限控制：
数据持久化：
静态资源处理：
缓存策略：
性能优化：
数据收集：
异常处理：
依赖管理：
环境切换：
编码约束：
扩展：
......

## 目录

├─assembly                    用于处理WebAssembly相关内容
├─build                       构建工具
│ ├─vite                      配置vite
│ └─webpack                   配置webpack
├─cache                       构建缓存
│ └─deps
├─config                      编码约束配置
├─design                      组件库
│ ├─ant-design-vue
│ └─vuetify
├─dist                        生产代码
├─env                         环境配置
├─external                    外部扩展模块
│ └─AI
├─node                        工程化代码
│ ├─loaders                   加载器
│ ├─plugins                   工程插件
│ └─utils                     
├─node_modules                工程依赖
├─public                      公共资源
│ └─static                    静态资源
│ ├─css                       样式资源
│ ├─fonts                     字体资源
│ ├─images                    图片资源
│ └─js                        脚本资源
└─src                         源码
├─assets                      打包资源
│ ├─backgrounds               背景图
│ ├─icons                     图标
│ └─images                    小图片
├─components                  全局通用组件
├─directives                  Vue指令
│ └─modules
├─enums                       全局通用枚举字段
│ └─modules
├─hooks                       复用型业务逻辑代码
│ └─modules
├─languages                   国际化
├─layouts                     布局框架
├─mocks                       模拟请求
├─plugins                     功能插件
├─requests                    网络请求
├─routers                     页面路由
│ └─modules
├─sockets                     webSocket通信
├─stores                      数据状态仓库
│ └─modules
├─styles                      复用样式
├─types                       全局类型描述
│ └─modules
├─utils                       与业务无关的工具库
├─views                       业务页面
│ ├─Demo                      示例与测试性代码
│ ├─Home                      首页-模块
│ │ └─components              模块页面组件
│ └─Login                     登录-模块
│ └─components                模块页面组件
└─workers                     Worker线程

---

markdown doc @see:<em>https://www.markdown.xyz/</em>
