### Lambda 作用域

在lambda表达式中访问外层作用域和老版本的匿名对象中的方式很相似 你可以直接访问标记了final的外层局部变量, 或者实例的字段以及静态变量 

还记得第一节中的formula例子么, 接口Formula定义了一个默认方法sqrt可以直接被formula的实例包括匿名对象访问到, 但是在lambda表达式中这个是不行的  Lambda表达式中是无法访问到默认方法的, 以下代码将无法编译:

代码如下:

Formula formula = (a) -> sqrt( a * 100); Built-in Functional Interfaces

JDK 1.8 API包含了很多内建的函数式接口, 在老Java中常用到的比如Comparator或者Runnable接口, 这些接口都增加了@FunctionalInterface注解以便能用在lambda上  Java 8 API同样还提供了很多全新的函数式接口来让工作更加方便, 有一些接口是来自Google Guava库里的, 即便你对这些很熟悉了, 还是有必要看看这些是如何扩展到lambda上使用的 

**Predicate****接口**

Predicate 接口只有一个参数, 返回boolean类型 该接口包含多种默认方法来将Predicate组合成其他复杂的逻辑（比如:与, 或, 非）:

代码如下:

Predicate<String> predicate = (s) -> s.length() > 0;

predicate.test("foo"); // true predicate.negate().test("foo"); // false

Predicate<Boolean> nonNull = Objects::nonNull; Predicate<Boolean> isNull = Objects::isNull;

Predicate<String> isEmpty = String::isEmpty; Predicate<String> isNotEmpty = isEmpty.negate();

**Function** **接口**

Function 接口有一个参数并且返回一个结果, 并附带了一些可以和其他函数组合的默认方法（compose, andThen）:

代码如下:

Function<String, Integer> toInteger = Integer::valueOf; Function<String, String> backToString = toInteger.andThen(String::valueOf);

backToString.apply("123"); // "123"

**Supplier** **接口** Supplier 接口返回一个任意范型的值, 和Function接口不同的是该接口没有任何参数

代码如下:

Supplier<Person> personSupplier = Person::new; personSupplier.get(); // new Person

**Consumer** **接口** Consumer 接口表示执行在单个参数上的操作 

代码如下:

Consumer<Person> greeter = (p) -> System.out.println("Hello, " + p.firstName); greeter.accept(new Person("Luke", "Skywalker"));

**Comparator** **接口** Comparator 是老Java中的经典接口,  Java 8在此之上添加了多种默认方法:

代码如下:

Comparator<Person> comparator = (p1, p2) -> p1.firstName.compareTo(p2.firstName);

Person p1 = new Person("John", "Doe"); Person p2 = new Person("Alice", "Wonderland");

comparator.compare(p1, p2); // > 0 comparator.reversed().compare(p1, p2); // < 0

**Optional** **接口**

Optional 不是函数是接口, 这是个用来防止NullPointerException异常的辅助类型, 这是下一届中将要用到的重要概念, 现在先简单的看看这个接口能干什么:

Optional 被定义为一个简单的容器, 其值可能是null或者不是null 在Java 8之前一般某个函数应该返回非空对象但是偶尔却可能返回了null, 而在Java 8中, 不推荐你返回null而是返回Optional 

代码如下:

Optional<String> optional = Optional.of("bam");

optional.isPresent(); // true optional.get(); // "bam" optional.orElse("fallback"); // "bam"

optional.ifPresent((s) -> System.out.println(s.charAt(0))); // "b"

**Stream** **接口**

java.util.Stream 表示能应用在一组元素上一次执行的操作序列 Stream 操作分为中间操作或者最终操作两种, 最终操作返回一特定类型的计算结果, 而中间操作返回Stream本身, 这样你就可以将多个操作依次串起来 Stream 的创建需要指定一个数据源, 比如 java.util.Collection的子类, List或者Set,  Map不支持 Stream的操作可以串行执行或者并行执行 

首先看看Stream是怎么用, 首先创建实例代码的用到的数据List:

代码如下:

List<String> stringCollection = new ArrayList<>(); stringCollection.add("ddd2"); stringCollection.add("aaa2"); stringCollection.add("bbb1"); stringCollection.add("aaa1"); stringCollection.add("bbb3"); stringCollection.add("ccc"); stringCollection.add("bbb2"); stringCollection.add("ddd1");

Java 8扩展了集合类, 可以通过 Collection.stream() 或者 Collection.parallelStream() 来创建一个Stream 下面几节将详细解释常用的Stream操作:

**Filter** **过滤**

过滤通过一个predicate接口来过滤并只保留符合条件的元素, 该操作属于中间操作, 所以我们可以在过滤后的结果来应用其他Stream操作（比如forEach） forEach需要一个函数来对过滤后的元素依次执行 forEach是一个最终操作, 所以我们不能在forEach之后来执行其他Stream操作 

代码如下:

stringCollection .stream() .filter((s) -> s.startsWith("a")) .forEach(System.out::println);

// "aaa2", "aaa1"

**Sort** **排序**

排序是一个中间操作, 返回的是排序好后的Stream 如果你不指定一个自定义的Comparator则会使用默认排序 

代码如下:

stringCollection .stream() .sorted() .filter((s) -> s.startsWith("a")) .forEach(System.out::println);

// "aaa1", "aaa2"

需要注意的是, 排序只创建了一个排列好后的Stream, 而不会影响原有的数据源, 排序之后原数据stringCollection是不会被修改的:

代码如下:

System.out.println(stringCollection); // ddd2, aaa2, bbb1, aaa1, bbb3, ccc, bbb2, ddd1

**Map** **映射** 中间操作map会将元素根据指定的Function接口来依次将元素转成另外的对象, 下面的示例展示了将字符串转换为大写字符串 你也可以通过map来讲对象转换成其他类型, map返回的Stream类型是根据你map传递进去的函数的返回值决定的 

代码如下:

stringCollection .stream() .map(String::toUpperCase) .sorted((a, b) -> b.compareTo(a)) .forEach(System.out::println);

// "DDD2", "DDD1", "CCC", "BBB3", "BBB2", "AAA2", "AAA1"

**Match** **匹配**

Stream提供了多种匹配操作, 允许检测指定的Predicate是否匹配整个Stream 所有的匹配操作都是最终操作, 并返回一个boolean类型的值 

代码如下:

boolean anyStartsWithA = stringCollection .stream() .anyMatch((s) -> s.startsWith("a"));

System.out.println(anyStartsWithA); // true

boolean allStartsWithA = stringCollection .stream() .allMatch((s) -> s.startsWith("a"));

System.out.println(allStartsWithA); // false

boolean noneStartsWithZ = stringCollection .stream() .noneMatch((s) -> s.startsWith("z"));

System.out.println(noneStartsWithZ); // true

**Count** **计数** 计数是一个最终操作, 返回Stream中元素的个数, 返回值类型是long 

代码如下:

long startsWithB = stringCollection .stream() .filter((s) -> s.startsWith("b")) .count();

System.out.println(startsWithB); // 3

**Reduce** **规约**

这是一个最终操作, 允许通过指定的函数来讲stream中的多个元素规约为一个元素, 规越后的结果是通过Optional接口表示的:

代码如下:

Optional<String> reduced = stringCollection .stream() .sorted() .reduce((s1, s2) -> s1 + "#" + s2);

reduced.ifPresent(System.out::println); // "aaa1#aaa2#bbb1#bbb2#bbb3#ccc#ddd1#ddd2"

**并行****Streams**

前面提到过Stream有串行和并行两种, 串行Stream上的操作是在一个线程中依次完成, 而并行Stream则是在多个线程上同时执行 

下面的例子展示了是如何通过并行Stream来提升性能:

首先我们创建一个没有重复元素的大表:

代码如下:

int max = 1000000; List<String> values = new ArrayList<>(max); for (int i = 0; i < max; i++) { UUID uuid = UUID.randomUUID(); values.add(uuid.toString()); }

然后我们计算一下排序这个Stream要耗时多久,  串行排序:

代码如下:

long t0 = System.nanoTime();

long count = values.stream().sorted().count(); System.out.println(count);

long t1 = System.nanoTime();

long millis = TimeUnit.NANOSECONDS.toMillis(t1 - t0); System.out.println(String.format("sequential sort took: %d ms", millis));

// 串行耗时: 899 ms 并行排序:

代码如下:

long t0 = System.nanoTime();

long count = values.parallelStream().sorted().count(); System.out.println(count);

long t1 = System.nanoTime();

long millis = TimeUnit.NANOSECONDS.toMillis(t1 - t0); System.out.println(String.format("parallel sort took: %d ms", millis));

// 并行排序耗时: 472 ms 上面两个代码几乎是一样的, 但是并行版的快了50%之多, 唯一需要做的改动就是将stream()改为parallelStream() 

**Map**

前面提到过, Map类型不支持stream, 不过Map提供了一些新的有用的方法来处理一些日常任务 

代码如下:

Map<Integer, String> map = new HashMap<>();

for (int i = 0; i < 10; i++) { map.putIfAbsent(i, "val" + i); }

map.forEach((id, val) -> System.out.println(val)); 以上代码很容易理解,  putIfAbsent 不需要我们做额外的存在性检查, 而forEach则接收一个Consumer接口来对map里的每一个键值对进行操作 

下面的例子展示了map上的其他有用的函数:

代码如下:

map.computeIfPresent(3, (num, val) -> val + num); map.get(3); // val33

map.computeIfPresent(9, (num, val) -> null); map.containsKey(9); // false

map.computeIfAbsent(23, num -> "val" + num); map.containsKey(23); // true

map.computeIfAbsent(3, num -> "bam"); map.get(3); // val33

接下来展示如何在Map里删除一个键值全都匹配的项:

代码如下:

map.remove(3, "val3"); map.get(3); // val33

map.remove(3, "val33"); map.get(3); // null

另外一个有用的方法:

代码如下:

map.getOrDefault(42, "not found"); // not found

对Map的元素做合并也变得很容易了:

代码如下:

map.merge(9, "val9", (value, newValue) -> value.concat(newValue)); map.get(9); // val9

map.merge(9, "concat", (value, newValue) -> value.concat(newValue)); map.get(9); // val9concat

Merge做的事情是如果键名不存在则插入, 否则则对原键对应的值做合并操作并重新插入到map中 