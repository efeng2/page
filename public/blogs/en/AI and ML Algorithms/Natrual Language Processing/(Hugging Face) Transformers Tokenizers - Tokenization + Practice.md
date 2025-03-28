# (Hugging Face) Transformers Tokenizers - Tokenization + Practice
2024-07-27

## Tokenizers
**Tokenization**, the process of converting sentences into tokens for processing, is one of the most fundamental and initial steps in Natural Language Processing (NLP). It involves dividing the input text into manageable token units.

The ideal state of tokenization would meet the following conditions: all tokens accurately convey the original meaning, the vocabulary constructed is comprehensive yet not too extensive, there are no Out-Of-Vocabulary (OOV) issues, and the input length is reasonable when constructing the input data.
Since machines cannot directly understand text content, we need to use **tokenizers** to convert text into numerical codes that machines can recognize.
Common tokenization methods include: **Word-Based Tokenization**, **Character-Based Tokenization**, and **Subword-Based Tokenization**.
## Word-Based Tokenization
Also known as **word granularity**, this method splits text by spaces or punctuation. Each word in the vocabulary is assigned a unique ID.
![Tokenizer](https://i-blog.csdnimg.cn/direct/92d61edabd3f425cb6fcff5a92234cd8.png)
Advantages:
- Each ID carries its own meaning without ambiguity.
Disadvantages:
- Words with similar meanings are assigned completely different IDs. For example, "dog" and "dogs" require two different IDs to represent, and there is no direct connection between them.
- If the model's vocabulary is large, the number of IDs required will also become very large.
- If a word does not exist in the vocabulary, it cannot be directly represented, or it can only be replaced with a general symbol for all uncatalogued words, leading to loss of text information (such words are called Out-Of-Vocabulary Words,简称**OOV**).
Common **word granularity splitters** include: Jieba (Chinese), LTP (Chinese), etc.
## Character-Based Tokenization
Also known as **character granularity**, it splits the original text by character. In English, it splits by letter, and in Chinese, it splits by character.
Each character in the vocabulary is assigned a unique ID.
![Tokenizer](https://i-blog.csdnimg.cn/direct/5f873086412f414cabf0ac30ee043f44.png)
Advantages:
- The vocabulary is small.
- There are no OOV issues.
Disadvantages:
- The model needs to understand multiple tokens to obtain information.
- For languages like English that use letters, each token stores too little information (this is not a problem in Chinese, and it is used in the bert-based-chinese model).
## Subword-Based Tokenization
Also known as **subword granularity**, it converts the original text into subwords, falling between word-based and character-based tokenization.
The rule of the tokenization algorithm is that **common words** are not split into smaller subwords, while **rare words** should be decomposed into meaningful subwords, such as word suffixes, roots, etc.
![Tokenizer](https://i-blog.csdnimg.cn/direct/f7a7289ece2b496db576d6bda90f46b9.png)
Machines need to know whether a token is an independent word or a suffix of a word, and special symbols are usually introduced as identifiers. For example, in the BERT model, "##s" is used to indicate that this token is a suffix of a word.
Advantages:
- Reduces OOV issues by combining subwords to represent new words.
- The vocabulary is smaller than word-based tokenization.
- Helps in understanding the meaning and usage of words by capturing word roots, prefixes, and suffixes.
Disadvantages:
- The segmentation rules are complex.
- Subword segmentation may sometimes produce ambiguity.
Common **subword granularity splitters** include: Byte Pair Encoding (BPE), SentencePiece, WordPiece, etc.
## Practice
In this practice, we will use the transformer library and operate in a Python environment.
We will use two versions of the BERT model: bert-base-uncased and bert-base-chinese.
First, we use AutoTokenizer to split the text into tokens. From the output, we can see that BERT uses a subword granularity tokenizer.
```py
from transformers import AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
tokens = tokenizer.tokenize("Let's try to tokenize!")
print(tokens)
```
```bash
['let', "'", 's', 'try', 'to', 'token', '##ize', '!']
```
The next step is to map these subwords to the corresponding IDs in the model's dictionary. For the model to understand these tokens, the tokens must match the IDs in the model's vocabulary. Therefore, the corresponding model must be downloaded when instantiating the model.
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
Finally, the tokenizer will add the special symbols needed by the model on top of these IDs.
Add the following code:
```py
final_inputs = tokenizer.prepare_for_model(input_ids)
print(final_inputs["input_ids"])
```
```bash
[101, 2292, 1005, 1055, 3046, 2000, 19204, 4697, 999, 102]
```
The first number added by the tokenizer represents the start token, and the last number represents the end token.
We can use the decoding method to see what the final output of the tokenizer looks like when converted back to text.
Add the following code:
```py
print(tokenizer.decode(final_inputs["input_ids"]))
```
```bash
[CLS] let's try to tokenize! [SEP]
```
After decoding, we can see that the starting token for BERT is [CLS], and the separator/end token is [SEP].
Other models may use different symbols to represent the start and end.
For the Chinese tokenization example, we use the bert-base-chinese model. In the following example, we can see that it uses a character granularity tokenizer.
```py
from transformers import AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained("bert-base-chinese")
tokens = tokenizer.tokenize("我们来尝试分词！")
print(tokens)
```
```bash
['我', '们', '来', '尝', '试', '分', '词', '！']
```
## References
[哔哩哔哩 | Hugging Face自然语言处理教程(官方)](https://www.bilibili.com/video/BV1P54y1H7Xj?p=13&vd_source=d6512fde6b80f0eb41f8f7969d291f8d)
[NLP中的Tokenization方法——BPE（Byte-Pair Encoding）](https://blog.csdn.net/xiao_ling_yun/article/details/129517312)
