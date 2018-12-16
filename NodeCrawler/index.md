# 总结     SUMMARY    


###### 2018.12.16  晴天☀️

---

> 订单项目全网各端问题数量汇总



C端：

* 小程序：45个；

* android : 51个；

* ios：51个；

* 前端H5：67个；



B端：

* android：70个;

* ios：81个;



---



订单项目C端H5 - Bug  汇总



总共bug数：67个

    目前禅道问题尽数解决，解决方式主要有两种：

    1、确认属于前端问题并已解决；

    2、确认属于其他责任人问题（ux、ui、产品、后端、测试）并指向相关责任人；



    确认属于前端问题（已解决）：9+13+16+3 = 41； 61%

    后端问题：2+4+2+4 = 12； 17.9%

    交互问题：1+1+0+0 = 2；2.9%

    ios问题: 0+1+0+0 = 1；1.4%

    其他：11（指向未变，原因为‘设计如此’、‘外部问题’、‘无法重现’）；16.4%



---        



订单项目C端小程序 - Bug  汇总



总共bug数：45个

    目前禅道问题尽数解决，解决方式主要有两种：

    1、确认属于前端问题并已解决；

    2、确认属于其他责任人问题（ux、ui、产品、后端、测试）并指向相关责任人；



    确认属于前端问题（已解决）：10+15+4 = 29； 64.4%

    后端问题：2+0+1 = 3；6.6%

    交互问题：1+0+0 = 1；2.2%

    android：1+0+0 = 1；2.2%

    其他：6+5+0 = 11（指向未变，原因为‘设计如此’、‘不予解决’、‘外部问题’、‘无法重现’）；24.4%



---

由以上细则可以看出，项目开发过程中真正前端问题占提出问题数量，基本上在63%左右；

我简单看了一下禅道上关于前端的问题，其实很大一部分问题是可以避免，包括我自己负责的模块产生的问题，后续我也在自我审查，后续再细心一些，应该会项目会更精细，当然对于所有同事来讲，这个规则都适用。



##### 人力投入：



    ios：3人两端；

    android：2人两端；

    前端：4人两端；



相比较而言，前端人数是占优势的，按照之前订单项目启动时和汉森统计的数据（工作量+人数），基本``` 前端是客户端1.5倍 ```，那么成果如果要等比例的话，其实也应该是```1.5倍```才对，所以，但是目前看到的禅道数据其实并不那么好看，我感觉也就是和客户端勉强持平而已，但是目前ios和android都在大肆“招兵买马”，其实后续全力跑起来，结果是什么样真不好说。



---

C端：

* 小程序：45个；

* android : 51个；

* ios：51个；

* 前端H5：67个；

看禅道数据，除去前端，跟客户端对比，按照bug最少的端来计数：

    android、ios：51个（基础值）

    H5、小程序：34个（相对值）



也就是说，截止到12.16日晚11点，前端bug在34左右是属于合理范围内数量。

目前

```

小程序：45个；

android : 51个；

```

##### 那么如果不归属前端端问题抛出后实际相应数据应该是这样：

C端订单：

* 小程序：29个；

* 前端H5：41个；

* android : 51个；

* ios：51个；



其实看到这个数据基本上符合1.5倍比例了，但是客户端问题是没有经过详细筛选的，也就是说其实这套理想数据是不太准确的，但是可以做参考使用。

>  当然、因为前端禅道内夹杂其他端同学端问题，我在统计时并未将其他端也做详细分类处理，因为考虑到我对他们项目内分类标准不熟悉，而且前端去筛选客户端问题也不够客观，所以就先按照禅道统计数据来看，毕竟该报告也属于部门内部文档、不对外公布。


由以上各项数据以及之前项目数据来看，大家这段时间蛮辛苦的，也付出了很多，进步也很明显，这是值得鼓励和庆贺的，但是和客户端还是没有达到1:1的效率和质量，差距也是很明显的。后续我是这么考虑的：

1、责任划分明确制；

<p style="text-indent:2em">

1>  项目启动前期划分的模块产生的问题收集成表（按照最终指向人且状态为```已解决```+开发人员模块划分细则表），模块划分肯定基本上是相对公平的，那么收集上来的数据也基本上是准确的。主要目的是形成可视化数据图表，直观的看看问题在哪，下次及时作出调整。

</p>

<p style='text-indent:2em'>

2> 不仅项目内部，开发人员数据图表化，项目与项目之间也做对比。前者主要细化到个人，后者主要是看部门整体是否属于上升的一个过程。前者考验的是开发人员、后者考验的是管理者。

> 由该项目各端负责人收集整理开发问题数据细则，由前端负责人收集整理项目整体问题数据细则

</p>

2、需求文档理解化：
<p style='text-indent:2em'>

1> 需求文档的理解程度很大一部分真的会影响到后续提测质量。这个不多说，开发必须熟悉和理解产品和交互想法，如果感觉（顶层设计）有问题，及时提出和相关负责人交涉，看是否有必要改动，无论改动与否，都按照文档来处理业务，即使是改动也要求对方将线上相关文档做下修正，保证都属于正确且最新。

</p>

3、开发规则标准化：
<p style='text-indent:2em'>

1> 这个就是老生常谈来，因为之前汉森其实已经给大家制定过一份开发规则手册，之前的老同事基本上达到人手一份纸质版，后续我会多打印几份给新同事，达到一人一份，大家可以多看看，毕竟代码风格统一是很重要的一项内容，随着开发人员越来越多，标准显得至关重要。当然在当前开发规则框架内，大家可以按照更高的标准来要求自己，这样当然是最好不过了，对于标准的制定也是积极吸收大家意见，有什么好的想法可以直接找汉森，或者找我聊聊都可以，希望标准能越来越完善，项目越来越好。

</p>

4、工作效率正常化：

<p style='text-indent:2em'>

1> 正常的工作时间，就好好工作，私事最好私下处理，尽量不要加班，不要上班时间处理私人问题，下班时间处理工作内容，本末倒置、得不偿失，还落得个效率低的名声。

</p>

---

结束语：<br/>
我感觉如果能够完全按照此标准执行下去，
项目本身看数据、
开发人员看自己、
工作效率稍提升、
前端肯定没问题。







