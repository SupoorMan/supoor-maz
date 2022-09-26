![](./image/bean的生命周期.png)



1、实例化bean对象

​	通过反射的方式进行对象的创建, 此时的创建只是在堆空间中申请空间, 属性都是默认值

2、设置对象属性

​	给对象中的属性进行值的设置工作

3、检查Aware相关接口并设置相关依赖

​	如果对象中需要引用容器内部的对象, 那么需要调用aware接口的子类方法来进行统一的设置

4、BeanPostProcessor的前置处理

​	对生成的bean对象进行前置的处理工作

5、检查是否是InitializingBean的子类来决定是否调用afterPropertiesSet方法

​	判断当前bean对象是否设置了InitializingBean接口, 然后进行属性的设置等基本工作

6、检查是否配置有自定义的init-method方法

​	如果当前bean对象定义了初始化方法, 那么在此处调用初始化方法

7、BeanPostProcessor后置处理

​	对生成的bean对象进行后置的处理工作

8、注册必要的Destruction相关回调接口

​	为了方便对象的销毁, 在此处调用注销的回调接口, 方便对象进行销毁操作

9、获取并使用bean对象

​	通过容器来获取对象并进行使用

10、是否实现DisposableBean接口

​	判断是否实现了DisposableBean接口, 并调用具体的方法来进行对象的销毁工作

11、是否配置有自定义的destory方法

​	如果当前bean对象定义了销毁方法, 那么在此处调用销毁方法