# （Hugging Face）如何训练和评估 Transformer 模型（代码 + 实践）

## 1. Hugging Face 的 datasets 库
Hugging Face 的 ` datasets`  库极大地简化了数据集的下载和预处理过程。

除此之外，本次实践还采用了以下Python库： `transformers` ，`pytorch` ，`evaluate` ，跟 `numpy`  ，使用的模型是 bert-base-uncased

此实践使用的数据库是 MRPC（Microsoft Research Paraphrase Corpus）一个用于判断两个句子是否是一样的意思的二分类数据集

## 2. 如何下载 Hugging Face 上的数据库

```python
# 下载 datasets
from datasets import load_dataset

raw_datasets = load_dataset("glue", "mrpc")
print(raw_datasets)
```

```bash
DatasetDict({
    train: Dataset({
        features: ['sentence1', 'sentence2', 'label', 'idx'],
        num_rows: 3668
    })
    validation: Dataset({
        features: ['sentence1', 'sentence2', 'label', 'idx'],
        num_rows: 408
    })
    test: Dataset({
        features: ['sentence1', 'sentence2', 'label', 'idx'],
        num_rows: 1725
    })
})
```
` load_dataset` 函数返回一个 `DatasetDict`  对象，其中包含训练集、验证集和测试集。

- ` load_dataset` 下载和加载hugging face的数据集
- ` glue` 数据集的名称，这个参数指定了数据集的来源
- ` mrpc` 这个参数指定了在GLUE集合中的具体数据集。如果想要载入别的dataset改这两个参数

执行这行代码后，load_dataset函数会下载MRPC数据集（如果本地没有的话），会下载到本地的 C:\Users\\\<*用户名*>\\.cache\huggingface\datasets文件夹中，并将其加载到raw_datasets变量中。
## 3. 访问数据库 + 数据预处理

在训练模型之前，我们需要做一些预处理。
这里拿BERT 做例子，BERT需要这个格式的数据

```bash
{
    'input_ids': [[101, 2054, 2003, 1996, 2564, 102, 102, 2054, 2003, 1996, 2564, 102], ...],
    'attention_mask': [[1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1], ...],
    'token_type_ids': [[0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1], ...],
    'labels': [0, 1, ...]
    ... # 以及其他参数
}
```
可以通过其键访问数据集的任何分割，以及通过其索引访问任何元素。

```py
# 访问之前加载的数据集的训练集部分
print(raw_datasets["train"])
```

```bash
Dataset({
    features: ['sentence1', 'sentence2', 'label', 'idx'],
    num_rows: 3668
})
```
我们可以看到这个 dataset 的格式，
- `features` 列名称
- ` num_rows`  行数

我们来看一个data的例子来知道它的格式

```py
# 访问训练集的第零行
print(raw_datasets["train"][0])
```

```bash
{'sentence1': 'Amrozi accused his brother , whom he called " the witness " , of deliberately distorting his evidence .', 'sentence2': 'Referring to him as only " the witness " , Amrozi accused his brother of deliberately distorting his evidence .', 'label': 1, 'idx': 0}
```

我们可以看到，`label`已经是正确的格式了（数字），所以不用动。
`label` 是对于分类任务的目标标签，为了查看 `label` 代表什么，我们可以访问数据集的 `features` 

```py
# 用来提供关于每一列的更多信息
print(raw_datasets["train"].features)
```

```bash
{'sentence1': Value(dtype='string', id=None), 'sentence2': Value(dtype='string', id=None), 'label': ClassLabel(names=['not_equivalent', 'equivalent'], id=None), 'idx': Value(dtype='int32', id=None)}
```

在`label`的位置我们可以看到数字代表的名字，这是一个区分两个句子是否同义的数据集，所以 `0` 代表 `not_equivalent`（不同义）， `1` 代表 `equivalent`（同义）

下面， 我们需要使用 tokenizer 把数据集中的文字（sentence1、2）转换为数字的格式

`.map()` 允许您对给定数据集的所有分割应用一个函数。

```py
# 载入 Tokenizer
from transformers import AutoTokenizer

# 使用 BERT model
checkpoint = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)

# 对 example 中的 sentence1 和 sentence2 进行编码
def tokenize_function(example):
    return tokenizer(example["sentence1"], example["sentence2"], truncation=True)

tokenized_datasets = raw_datasets.map(tokenize_function, batched=True)
print(tokenized_datasets)
```

```bash
DatasetDict({
    train: Dataset({
        features: ['sentence1', 'sentence2', 'label', 'idx', 'input_ids', 'token_type_ids', 'attention_mask'],
        num_rows: 3668
    })
    validation: Dataset({
        features: ['sentence1', 'sentence2', 'label', 'idx', 'input_ids', 'token_type_ids', 'attention_mask'],
        num_rows: 408
    })
    test: Dataset({
        features: ['sentence1', 'sentence2', 'label', 'idx', 'input_ids', 'token_type_ids', 'attention_mask'],
        num_rows: 1725
    })
})
```

经过这些步骤后，`tokenized_datasets`将加入这些列：`input_ids`，`token_type_ids`，`attention_mask`

- `truncation=True` 表示如果输入序列超过了模型的最大长度限制，将进行截断处理。
- `batched=True` 表示在处理数据时，函数将以批处理（batch）的方式对数据进行操作，这通常比逐个处理更高效


最后一项我们需要做的是，当我们将元素一起进行批处理时，将所有 example 填充到最长的句子的长度

## 4. 动态填充

为了提高计算效率，通常会在训练时使用**批处理**（batching）。然而，由于输入序列长度不一，无法直接将它们组合成一个批次。**动态填充**（Dynamic Padding）确保在一个批次中的所有序列都具有相同的长度，从而可以有效地进行批处理。

与**静态填充**（static padding）不同·，动态填充在每个批次中只将 `input_ids` 填充到该批次中最长序列的长度，而不是填充到整个数据集中最长序列的长度。这样可以显著减少在整个训练过程中所需的填充量。

为了做这个，我们制作一个 `data_collator`，这个函数在实例化时，它需要一个分词器（tokenzier）以便知道使用哪个填充用的 token，以及模型填充在输入的左侧或右侧

```py
from transformers import DataCollatorWithPadding

data_collator = DataCollatorWithPadding(tokenizer=tokenizer)
```
## 5. Trainer API 模型微调和测评
使用 Transformer 的 Trainer 可以轻松训练或微调 Transformer 模型。

Trainer API　可以接收数据集、模型、训练 hyper-parameters，可以在任何的 GPU、CPU、GPUs 上执行训练。Trainer 会根据模型的签名自动处理 PyTorch 格式的相关操作

训练时我们也需要知道关于模型训练状态和性能的详细信息。这些信息对于监控训练进度、微调模型以及比较不同训练配置的性能都是非常有用的。

```bash
from transformers import TrainingArguments, AutoModelForSequenceClassification, Trainer
import evaluate
import numpy as np

# 用于在评估过程中计算模型的性能指标
def compute_metrics(eval_preds):
    metric = evaluate.load("glue", "mrpc")
    logits, labels = eval_preds
    predictions = np.argmax(logits, axis=-1)
    return metric.compute(predictions=predictions, references=labels)

# 定义模型
training_args = TrainingArguments("test-trainer", evaluation_strategy="epoch")
model = AutoModelForSequenceClassification.from_pretrained(checkpoint, num_labels=2)

# 创建 Trainer
trainer = Trainer(
    model,
    training_args,
    train_dataset=tokenized_datasets["train"],
    eval_dataset=tokenized_datasets["validation"],
    data_collator=data_collator,
    tokenizer=tokenizer,
    compute_metrics=compute_metrics,
)
trainer.train()
```

`compute_metrics` 函数用于在评估过程中计算模型的性能指标
- `evaluate.load` 加载GLUE数据集中的MRPC任务的评估指标
- `metric.compute`  使用加载的指标来计算预测和真实标签之间的性能

定义模型
- `training_args` 指定新训练模型的输出目录为 "test-trainer"，并且设置评估策略为每训练一个epoch后进行一次评估。
- `AutoModelForSequenceClassification.from_pretrained` 加载一个针对序列分类的预训练模型
- `num_labels=2` 表示模型输出有两个类别，适用于MRPC这样的二分类任务

创建 Trainer
- `train_dataset` 和 `eval_dataset` 分别指定训练和评估使用的数据集
- `data_collator` 用于将数据整理成模型所需的格式
- `tokenizer` 用于处理文本数据
- `compute_metrics` 指定在评估时使用的计算函数

经过这样的操作，模型将开始训练，并且训练过程中将输出相关的评估指标。

```bash
{'eval_loss': 0.3850872814655304, 'eval_accuracy': 0.8480392156862745, 'eval_f1': 0.8945578231292517, 'eval_runtime': 2.3665, 'eval_samples_per_second': 172.405, 'eval_steps_per_second': 21.551, 'epoch': 1.0}                                                                                                                                      
{'loss': 0.541, 'grad_norm': 6.380190372467041, 'learning_rate': 3.184458968772695e-05, 'epoch': 1.09}                                                                     
{'eval_loss': 0.4046363830566406, 'eval_accuracy': 0.8676470588235294, 'eval_f1': 0.9078498293515358, 'eval_runtime': 2.2491, 'eval_samples_per_second': 181.402, 'eval_steps_per_second': 22.675, 'epoch': 2.0}                                                                                                                                      
{'loss': 0.3135, 'grad_norm': 18.429800033569336, 'learning_rate': 1.3689179375453886e-05, 'epoch': 2.18}                                                                  
{'eval_loss': 0.6162229180335999, 'eval_accuracy': 0.8676470588235294, 'eval_f1': 0.9084745762711864, 'eval_runtime': 2.3316, 'eval_samples_per_second': 174.988, 'eval_steps_per_second': 21.874, 'epoch': 3.0}                                                                                                                                      
{'train_runtime': 115.26, 'train_samples_per_second': 95.471, 'train_steps_per_second': 11.947, 'train_loss': 0.35547709967142965, 'epoch': 3.0}
```
## 参考文献
[Hugging Face自然语言处理教程（官方）](https://www.bilibili.com/video/BV1P54y1H7Xj?p=21&vd_source=f0f3c9343fe5f087ee05fae9ec07ef38)
[Hugging Face 官方教程 | Fine-tuning a model with the Trainer API](https://huggingface.co/learn/nlp-course/en/chapter3/3?fw=pt)
[Transformers documentation | BERT 参数](https://huggingface.co/docs/transformers/en/model_doc/bert)