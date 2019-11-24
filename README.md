# Node-Monitor

这是一个服务于开发和线上环境的监控管理项目，通过抓取运行时的错误日志并上报至监控系统来记录错误信息。此项目主要的功能包括收集请求信息、分析请求质量、代码异常时源码定位等。项目主要采用的技术包括 `react`、`@reach/router` 、`@rematch/core`、`antd`、`mongo` 和 `docker` 。

## Preview

请求分析

- 列表页
![成功状态列表](http://assets.jweboy.com/monitor-interface-succeed.png)
![失败状态列表](http://assets.jweboy.com/monitor-interface-failed.png)
- 详情页
![请求详情](http://assets.jweboy.com/monitor-interface-detail.png)

代码报错定位

- 列表页
![请求列表](http://assets.jweboy.com/monitor-code-list.png)
- 详情页
![请求详情](http://assets.jweboy.com/monitor-code-detail.png)

## Future

- 通过 `source-map` 对目标项目的 `map` 文件进行查询，实现了源码定位的功能。
- 基于 `docker` 和 `ssh` 集成了一套项目的自动化部署方案。

## Reference

- [Nodejs Docker 镜像体积优化实践](https://juejin.im/post/5cada976f265da035e210bf8#heading-3)
- [一份为 Node.js 应用准备的 Dockerfile 指南](https://juejin.im/post/5a9626abf265da4e9d225f4f)
