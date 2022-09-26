---
title: Date API(Java 8)
author: tom
date: '2022-9-26'
---

## Date API(Java 8)


Java 8 在包java.time下包含了一组全新的时间日期API 新的日期API和开源的Joda-Time库差不多, 但又不完全一样, 下面的例子展示了这组新API里最重要的一些部分



### Clock 时钟

Clock类提供了访问当前日期和时间的方法, Clock是时区敏感的, 可以用来取代 System.currentTimeMillis() 来获取当前的**毫秒数** 某一个特定的时间点也可以使用Instant类来表示, Instant类也可以用来创建老的java.util.Date对象 

```java
Clock clock = Clock.systemDefaultZone(); 
long millis = clock.millis(); 

Instant instant = clock.instant(); 
Date date = Date.from(instant); //java.util.Date
```



### Timezones 时区

在新API中时区使用ZoneId来表示 时区可以很方便的使用静态方法of来获取到  时区定义了到UTS时间的时间差, 在Instant时间点对象到本地日期对象之间转换的时候是极其重要的 

```java
System.out.println(ZoneId.getAvailableZoneIds()); //打印时区

ZoneId zone1 = ZoneId.of("Europe/Berlin"); //设置时区
ZoneId zone2 = ZoneId.of("Brazil/East"); //设置时区
System.out.println(zone1.getRules()); 
System.out.println(zone2.getRules());
```



### LocalTime 本地时间

LocalTime 定义了一个没有时区信息的时间, 例如:晚上10点或者17:30:15 
下面的例子使用前面代码创建的时区创建了两个本地时间 之后比较时间并以小时和分钟为单位计算两个时间的时间差:

```java
LocalTime now1 = LocalTime.now(zone1); 
LocalTime now2 = LocalTime.now(zone2);
System.out.println(now1.isBefore(now2)); // false

long hoursBetween = ChronoUnit.HOURS.between(now1, now2); 
long minutesBetween = ChronoUnit.MINUTES.between(now1, now2);
System.out.println(hoursBetween); // -3 
System.out.println(minutesBetween); // -239
```



LocalTime 提供了多种工厂方法来简化对象的创建, 包括解析时间字符串 

```java
LocalTime late = LocalTime.of(23, 59, 59); 
System.out.println(late); // 23:59:59

DateTimeFormatter formatter = DateTimeFormatter.ofLocalizedTime(FormatStyle.SHORT).withLocale(Locale.GERMAN);
LocalTime leetTime = LocalTime.parse("13:37", formatter); 
System.out.println(leetTime); // 13:37
```



### LocalDate 本地日期

LocalDate 表示了一个确切的日期, 比如 2014-03-11 该对象值是不可变的, 用起来和LocalTime基本一致 下面的例子展示了如何给Date对象加减天/月/年 另外要注意的是这些对象是不可变的, 操作返回的总是一个新实例 

```java
LocalDate today = LocalDate.now(); 
LocalDate tomorrow = today.plus(1, ChronoUnit.DAYS); 
LocalDate yesterday = tomorrow.minusDays(2);
LocalDate independenceDay = LocalDate.of(2022, Month.JULY, 4); 
DayOfWeek dayOfWeek = independenceDay.getDayOfWeek();

System.out.println(dayOfWeek); // FRIDAY 
```


从字符串解析一个LocalDate类型和解析LocalTime一样简单:

```java
DateTimeFormatter formatter = DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM).withLocale(Locale.GERMAN);

LocalDate xmas = LocalDate.parse("24.12.2022", formatter); 
System.out.println(xmas); // 2022-12-24
```



### LocalDateTime 本地日期时间

LocalDateTime 同时表示了时间和日期, 相当于前两节内容合并到一个对象上了 LocalDateTime和LocalTime还有LocalDate一样, 都是不可变的 LocalDateTime提供了一些能访问具体字段的方法 

```java
LocalDateTime sylvester = LocalDateTime.of(2022, Month.DECEMBER, 31, 23, 59, 59);
DayOfWeek dayOfWeek = sylvester.getDayOfWeek(); 
System.out.println(dayOfWeek); // WEDNESDAY

Month month = sylvester.getMonth(); 
System.out.println(month); // DECEMBER

long minuteOfDay = sylvester.getLong(ChronoField.MINUTE_OF_DAY); 
System.out.println(minuteOfDay); // 1439
```


只要附加上时区信息, 就可以将其转换为一个时间点Instant对象, Instant时间点对象可以很容易的转换为老式的java.util.Date 

```java
Instant instant = sylvester.atZone(ZoneId.systemDefault()).toInstant();
Date legacyDate = Date.from(instant); 

System.out.println(legacyDate); // Wed Dec 31 23:59:59 CET 2022
```


格式化LocalDateTime和格式化时间和日期一样的, 除了使用预定义好的格式外, 我们也可以自己定义格式:

```java
//新版的DateTimeFormatter是不可变的, 所以它是线程安全的
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd, yyyy - HH:mm");

LocalDateTime parsed = LocalDateTime.parse("Nov 03, 2022 - 07:13", formatter); 
String string = formatter.format(parsed);
System.out.println(string); // Nov 03, 2022 - 07:13
```

