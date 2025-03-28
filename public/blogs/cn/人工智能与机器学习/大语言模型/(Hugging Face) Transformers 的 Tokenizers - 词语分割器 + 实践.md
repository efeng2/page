# (Hugging Face) Transformers 的 Tokenizers - 词语分割器 + 实践
2024-07-27

# 分词器（Tokenizers）
**Tokenization**，即对句子变成token进行处理，是自然语言处理（NLP）中最基本且首要的步骤，指将输入文本分割为可处理的token单元。

理想的Tokenization状态会满足以下条件：所有的token都能准确传达原意，构建的词汇表既全面又不过于庞大，不存在词汇表外的词汇（OOV）问题，并且在构建输入数据时，确保输入长度合理。

由于机器本身无法直接理解文本内容，因此我们需借助**分词器**（tokenizers）将文字转化为机器能够识别的数字编码。

常见的tokenization方法包括：**基于单词的**分词器（Word-Based Tokenization），**基于字符的**分词器（Character-Based Tokenization），以及**基于子词的**分词器（Subword-based Tokenization）
# 基于单词分割（Word-Based Tokenization）
又称**词粒度**，分词按空格分割或按标点符号分割，词汇表中每个单词都被赋予一个独特的ID

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/92d61edabd3f425cb6fcff5a92234cd8.png)

优点：
- 每个ID都承载着自己的含义，没有歧义

缺点：
- 相似含义的单词会被分配到完全不同的ID，例如单词 "dog" 和 "dogs" 需要两个不同的ID来表示，且它们之间没有直接的联系。
- 如果需要的模型词库庞大，需要的ID量也会变得非常大
- 如果单词不存在于词库中则无法直接表示，或者只能用代表所有未收录词汇的通用符号替代，导致文本信息丢失（这类词汇被称为未登录词 **Out-Of-Vocabulary Words**，简称**OOV**）

常见的**词粒度分割器**包括：Jieba（中文），LTP（中文）等

# 基于字符分割（Character-Based Tokenization）
又称**字粒度**，它将原始文本按字符分割。在英文中文本按字母分割，在中文中文本则按字分割。
词汇表中每个字符赐予一个独特的ID
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/5f873086412f414cabf0ac30ee043f44.png)

优点：
- 词表很小
- 没有 OOV 问题

缺点：
- 模型需要同时理解多个token才能获取信息。
- 对于英语使用字母这样的语言，每个token储存的信息太少（在中文中没有这个问题，在bert-based-chinese模型中在使用）
# 基于子词的分词 （Subword-Based Tokenization）
又称**子词粒度**，将原始文本转换为子词 ，介于基于单词分割和基于字符分割之间。
分词算法规则为**常用词**不被分割成更小的子词，而**罕见词**应被分解成有意义的子词，如单词后缀、词根、等。

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/f7a7289ece2b496db576d6bda90f46b9.png)

机器需要知道token是独立的单词还是某个单词的后缀，通常会引入特定的符号作为标识，比如在BERT模型中会使用 "##s" 来指示这个token是词后缀

优点：
- 通过组合子词来表示新词，减少OOV问题
- 词表比基于单词分割的词表小
- 捕捉单词词根、前缀和后缀，对理解单词的含义和用法有帮助

缺点：
- 分割规则复杂
- 子词分割有时可能会产生歧义

常见的**子词粒度分割器**包括：Byte Pair Encoding（BPE），SentencePiece，WordPiece 等

# 实践

在本次实践中，我们将采用transformer库，并在Python环境下进行操作。
我们将使用BERT模型中的两个版本：bert-base-uncased 和 bert-base-chinese。

首先，我们使用 AutoTokenizer 将文本分割成为tokens，输出中我们可以看到 BERT 使用的是子词粒度的分词器。

```py
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
tokens = tokenizer.tokenize("Let's try to tokenize!")
print(tokens)
```


```bash
['let', "'", 's', 'try', 'to', 'token', '##ize', '!']
```

接下来的步骤是将这些子词映射到模型的词典中相应的ID，为了让模型能够理解这些tokens，tokens与模型的词库中的ID必须匹配。所以，在实例化模型时必须要下载相应的模型。

```py
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
inputs = tokenizer("Let's try to tokenize!")
input_ids = tokenizer.convert_tokens_to_ids(tokens)

print(input_ids)
```

```bash
[2292, 1005, 1055, 3046, 2000, 19204, 4697, 999]
```

最后，tokenizer会在这些ID的基础上，添加模型需要的特殊符号。
加入代码

```py
final_inputs = tokenizer.prepare_for_model(input_ids)
print(final_inputs["input_ids"])
```

```bash
[101, 2292, 1005, 1055, 3046, 2000, 19204, 4697, 999, 102]
```

tokenizer添加的第一个数字代表开始符，最后一个数字代表结束符。
我们可以使用解码方法来查看tokenizer的最终输出转换回文本的样子。
加入代码

```py
print(tokenizer.decode(final_inputs["input_ids"]))
```
```bash
[CLS] let's try to tokenize! [SEP]
```

解码后我们可以看到 BERT 的起始符是 [CLS]，分隔/结束符是 [SEP]。
其他的模型可能会使用不同的符号来表示开始和结束。

中文分词例子我们使用 bert-base-chinese 模型，在下面的例子中，我们可以看到他是使用的是一个字粒度的分词器。

```py
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("bert-base-chinese")
tokens = tokenizer.tokenize("我们来尝试分词！")

print(tokens)
```

```bash
['我', '们', '来', '尝', '试', '分', '词', '！']
```

# 参考文献
[哔哩哔哩 | Hugging Face自然语言处理教程(官方)](https://www.bilibili.com/video/BV1P54y1H7Xj?p=13&vd_source=d6512fde6b80f0eb41f8f7969d291f8d)
[NLP中的Tokenization方法——BPE（Byte-Pair Encoding）](https://blog.csdn.net/xiao_ling_yun/article/details/129517312)