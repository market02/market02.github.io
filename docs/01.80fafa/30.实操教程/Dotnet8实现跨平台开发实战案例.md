## 0.项目概述

RegistrationEasy 是一个完整的软件授权与注册验证示例项目，展示了如何使用 .NET 8 和 Avalonia UI 11 构建跨平台（Windows、macOS、Linux、Android）桌面应用。该项目提供了从机器码生成到注册码验证的完整解决方案，是学习 .NET 跨平台开发的绝佳实战案例。

## 1.技术架构

(1)核心技术栈

- .NET 8 : 最新的 .NET 运行时，提供卓越的性能和跨平台支持
- Avalonia UI 11 : 跨平台 UI 框架，支持桌面和移动端
- AES 加密 : 用于注册码的安全加密和解密
- 硬件信息采集 : 跨平台的机器码生成机制

(2)项目结构

RegistrationEasy/
├── RegistrationEasy.Common/ # 共享业务逻辑 + 视图 + ViewModel
├── RegistrationEasy/ # 桌面端启动项目
├── RegistrationEasy.Android/ # Android 启动项目
└── build.sh # 本地构建脚本

## 2.核心功能实现

(1). 跨平台机器码生成

在 RegistrationEasy.Common/Services/MachineIdProvider.cs 中实现了跨平台的机器码生成逻辑：

![](assets\20251219_160754_sc-1.png)

(2). 注册码验证系统

在 RegistrationEasy.Common/Services/RegistrationService.cs 中实现了完整的注册码验证流程：

![](assets\20251219_160804_sc-2.png)

(3). 跨平台 UI 实现

项目使用 Avalonia UI 实现了统一的用户界面，桌面端和 Android 端共享相同的 View 和 ViewModel：

![](assets\20251219_160816_sc-3.png)

## 3.跨平台适配策略

(1)平台特定实现

项目通过条件编译和运行时检测来处理平台差异：

![](assets\20251219_160827_sc-4.png)

(2)依赖注入配置

项目使用依赖注入来管理平台特定的服务：

![](assets\20251219_160840_sc-5.png)

## 4.安全考虑

(1)加密安全

- 使用 AES 加密算法保护注册码
- 避免在客户端存储敏感信息
- 使用哈希算法确保机器码的稳定性

(2)防篡改机制

- 注册码包含机器码校验
- 有效期验证防止过期使用
- JSON 数据签名验证完整性
