想象一下，你有一把神奇的钥匙，既能开家里的门，又能开车库的门，还能开办公室的门——这就是 .NET 8 + Avalonia 11 带给我们的开发体验。我最近用这个组合完成了一个注册码验证应用 RegistrationEasy，同一套代码同时在 Windows、macOS、Linux 桌面和 Android 手机上完美运行，简直像变魔术一样！

RegistrationEasy 是一个软件授权和注册验证系统，为付费软件提供机器绑定授权机制，防止软件被非法复制和分发，实现按设备授权的模式，无需集成支付工具，无需搭建服务器，即可将 RegistrationEasy 的服务端逻辑与 UI 作为模板快速复用。

## 0.项目架构：像搭积木一样简单

这个项目的结构特别清晰，就像一个精心设计的旅行套装：

- **共享核心包 ( RegistrationEasy.Common )** - 这是我们的"万能工具箱"，里面装着所有业务逻辑、界面设计和数据处理
- **桌面启动壳 ( RegistrationEasy.Desktop )** - 给 Windows/macOS/Linux 准备的"桌面启动器"
- **Android 启动壳 ( RegistrationEasy.Android )** - 专门为手机定制的"移动端入口"
  最妙的是，90% 的代码都在共享包里，平台特定的部分只是个薄薄的"外壳"。这种设计让我想起了乐高积木——核心模块通用，只需要换不同的底座就能适应不同场景。

## 1.核心功能：机器码与注册码的"数字锁配钥匙"

这个应用的核心功能特别实用：每台设备生成唯一的机器码，用户输入注册码后验证是否匹配。这就像：

**（1）机器码 是门的"锁芯编号"** - 通过 MachineIdProvider.cs 的 GetLocalMachineId() 方法生成

using var sha256 = SHA256.Create();

var hash = sha256.ComputeHash(Encoding.UTF8.GetBytes(rawId));

var hex = BitConverter.ToString(hash, 0, 8).Replace("-", "");

return FormatMachineId(hex);

**（2）注册码 是配套的"钥匙"** - 使用 AES 加密技术保护，在 EncryptService.cs 解密

public static string DecryptText(string cipherText, string? password = null)

{

var encryptionPassword = password ?? ConfigProvider.Get().Password;

return DecryptAES(cipherText, encryptionPassword);

}

验证过程 像"试钥匙开锁" - 在 RegistrationService.cs 的 TryDecodeRegistrationCode 中完成校验
我特别喜欢这个设计的灵活性，它同时支持 JSON 格式和传统的管道分隔格式，就像一把钥匙能开新旧两种锁芯。

## 2.开发体验：从桌面到手机的"无缝切换"

在实际开发中，我先在桌面上把界面和逻辑都调试完美，然后几乎不用修改就直接打包成 Android APK。这种体验就像：

- 在 Program.cs 配置桌面启动
- 在 MainActivity.cs 设置 Android 入口
- 共享的 App.axaml.cs 自动适应不同平台的生命周期
  最让我惊喜的是，MVVM 模式在这里发挥得淋漓尽致。ViewModel 里的命令绑定和属性通知在桌面和手机上表现完全一致，真正的"写一次，到处运行"。

## 3.RegistrationEasy App 使用示例

开源代码：https://github.com/Sophia268/RegistrationEasy

（1）可在软件中内置 RegistrationEasy 程序代码，无需集成支付工具，无需搭建服务器，就可以实现用户方便快捷购买注册码；

在示例程序中 Config.json 文件以明文方式填写了商品加密密钥(Password)和商品购买链接(URI),这仅为示例。出于安全考虑，建议将这两项敏感信息改为在编译时通过 DL（或预编译指令）等方式嵌入，避免在配置文件中明文存储。

![](assets\20251219_165055_sc-15.png)

（2）这个加密秘钥 Password 和商品链接 URI 是需要登录注册www.80fafa.com，在创建商品页面填写商品信息，秘文类型选择软件注册码，加密秘钥是由你自主定义的，在此网站创建商品以生成商品链接。

![](assets\20251219_165115_sc-16.png)

![](assets\20251219_165152_sc-17.png)

（3）在 RegistrationEasy 程序上复制 Machine Code，点击"Purchase Code"按钮跳转到购买页面，用户选择购买时长并将复制的 Machine Code 粘贴到机器码，然后进行付款以获得秘文，此秘文即为注册码。

![](assets\20251219_165207_sc-18.png)

（4）在支付结果上复制注册码（秘文），粘贴在 RegistrationEasy 程序的 Registration Code 的输入框中，点击“Verify Code”进行注册码验证，验证成功会显示商品信息，包括机器码、创建时间、有效时长、过期时间和额度。

![](assets\20251219_165221_sc-19.png)

## 4.Android 适配：避开那些"小坑洼"

当然，跨平台开发总会遇到一些平台特有的问题，这里分享几个实战经验：

--主题配置是关键 - Android 需要特定的 AppCompat 主题，在 styles.xml:5 中配置为无标题栏全屏模式

--权限要简单明了 - AndroidManifest.xml 只申请最基本的权限，保持应用轻量

--模拟器加速很重要 - 开启 Hyper-V/WSL2 加速后，Android 模拟器启动速度提升明显

## 5.个人经验分享：为什么选择这个技术栈

作为一个长期使用 .NET 的开发者，我选择这个方案有几个重要理由：

--学习成本低 - 如果你熟悉 WPF/WinForms，迁移到 Avalonia 就像从手动挡换到自动挡

--性能表现优秀 - .NET 8 的 AOT 编译让应用启动飞快，内存占用也很友好

--生态成熟 - NuGet 上有海量的库可用，不用担心"造轮子"

--调试方便 - 在桌面上调试完，Android 上基本不用再调试，省时省力

## 6.跨平台开发也可以很"接地气"

这个项目证明了一点：跨平台开发不一定要用复杂的技术栈，也不一定要牺牲开发体验。.NET 8 + Avalonia 11 的组合就像一套"多功能瑞士军刀"，简单实用又功能强大。

如果你正在寻找一个既能快速开发又能覆盖多平台的解决方案，我强烈推荐试试这个技术栈。它可能会成为你的"开发利器"，让你在桌面和移动端都能游刃有余。
