# color-figlet
创建彩虹字符

## Installation
npm install color-figlet
or
npm install -g color-figet (有bin命令,推荐此安装方式)

## Usage
`$ color-figlet somestring filename`
输出字符到 指定文件中

*注意*
当输出到一个新文件中时,存储的是有颜色的字符
当追加到一个已存在的文件中时,仅存储了figlet后的字符(因为带有ascii颜色的字符 是很丑的,你也不会愿意看的)

当不带有第二个文件参数时,会将其输出到终端

## 方法介绍
### figlet的方法

1. getFontNames()	获取所有可用的字体
2. generateAll(data[,callback])	生成所有的组合
3. genereateSomeFontAllHorizontal(data,font[,callback])	生成一个字体的所有水平组合
4. genereateSomeFontAllVertical(data,font[,callback])	生成一个字体的所有垂直组合
5. genereateAllFontsDeault(data[,callback])	生成所有的组合,排列方式使用双default
6. genereateOne(data,{font,horizontalLayout,verticalLayout}=defaultOption[,callback])	获取一个
