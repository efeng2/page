# (Hugging Face) How to Train and Evaluate Transformer Models (Code + Practice)
2024-08-03
## 1. Hugging Face's `datasets` Library
Hugging Face's `datasets` library greatly simplifies the process of downloading and preprocessing datasets.
In addition to this, the following Python libraries are used in this practice: `transformers`, `pytorch`, `evaluate`, and `numpy`. The model used is `bert-base-uncased`.

The database used in this practice is MRPC (Microsoft Research Paraphrase Corpus), a binary classification dataset for determining whether two sentences have the same meaning.
## 2. How to Download Datasets from Hugging Face
```python
# Download datasets
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
The `load_dataset` function returns a `DatasetDict` object, which contains the training set, validation set, and test set.
- `load_dataset` downloads and loads Hugging Face datasets
- `glue` is the name of the dataset, this parameter specifies the source of the dataset
- `mrpc` specifies the specific dataset within the GLUE collection. If you want to load a different dataset, change these two parameters.
After executing this line of code, the `load_dataset` function will download the MRPC dataset (if it's not already present locally) to the folder `C:\Users\\<username>\.cache\huggingface\datasets` and load it into the `raw_datasets` variable.
## 3. Accessing the Database + Data Preprocessing
Before training the model, we need to do some preprocessing.
Taking BERT as an example, BERT requires data in this format:
```bash
{
    'input_ids': [[101, 2054, 2003, 1996, 2564, 102, 102, 2054, 2003, 1996, 2564, 102], ...],
    'attention_mask': [[1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1], ...],
    'token_type_ids': [[0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1], ...],
    'labels': [0, 1, ...]
    ... # and other parameters
}
```
You can access any split of the dataset through its key and any element through its index.
```py
# Access the training set part of the previously loaded dataset
print(raw_datasets["train"])
```
```bash
Dataset({
    features: ['sentence1', 'sentence2', 'label', 'idx'],
    num_rows: 3668
})
```
We can see the format of this dataset,
- `features` column names
- `num_rows` number of rows
Let's look at an example of the data to know its format
```py
# Access the zeroth row of the training set
print(raw_datasets["train"][0])
```
```bash
{'sentence1': 'Amrozi accused his brother , whom he called " the witness " , of deliberately distorting his evidence .', 'sentence2': 'Referring to him as only " the witness " , Amrozi accused his brother of deliberately distorting his evidence .', 'label': 1, 'idx': 0}
```
We can see that `label` is already in the correct format (numeric), so we don't need to change it.
The `label` is the target label for the classification task. To see what `label` represents, we can access the dataset's `features`
```py
# Provides more information about each column
print(raw_datasets["train"].features)
```
```bash
{'sentence1': Value(dtype='string', id=None), 'sentence2': Value(dtype='string', id=None), 'label': ClassLabel(names=['not_equivalent', 'equivalent'], id=None), 'idx': Value(dtype='int32', id=None)}
```
At the `label` position, we can see the names represented by the numbers. This is a dataset for distinguishing whether two sentences are synonymous, so `0` represents `not_equivalent` and `1` represents `equivalent`.
Next, we need to use the tokenizer to convert the text in the dataset (sentence1, 2) into a numerical format.
The `.map()` function allows you to apply a function to all splits of a given dataset.
```py
# Load Tokenizer
from transformers import AutoTokenizer
# Use BERT model
checkpoint = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)
# Encode sentence1 and sentence2 in example
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
After these steps, `tokenized_datasets` will have these columns added: `input_ids`, `token_type_ids`, `attention_mask`
- `truncation=True` means that if the input sequence exceeds the model's maximum length limit, it will be truncated.
- `batched=True` means that the function will operate on the data in batches, which is generally more efficient than processing one by one.
The last thing we need to do is to pad all examples to the length of the longest sentence when we batch them together.
## 4. Dynamic Padding
To improve computational efficiency, **batching** is commonly used during training. However, since input sequences vary in length, they cannot be directly combined into a batch. **Dynamic Padding** ensures that all sequences in a batch have the same length, allowing for efficient batching.
Unlike **static padding**, dynamic padding pads `input_ids` to the length of the longest sequence in the batch, rather than to the length of the longest sequence in the entire dataset. This significantly reduces the amount of padding required throughout the training process.
To do this, we create a `data_collator`, which when instantiated, requires a tokenizer to know which token to use for padding, and whether the model pads on the left or right side.
```py
from transformers import DataCollatorWithPadding
data_collator = DataCollatorWithPadding(tokenizer=tokenizer)
```
## 5. Model Fine-Tuning and Evaluation with the Trainer API
Using the Transformer's Trainer, you can easily train or fine-tune Transformer models.
The Trainer API can receive datasets, models, and training hyper-parameters and can execute training on any GPU, CPU, or GPUs. The Trainer will automatically handle PyTorch-related operations based on the model's signature.
During training, we also need detailed information about the model's training status and performance. This information is useful for monitoring training progress, fine-tuning the model, and comparing the performance of different training configurations.
```bash
from transformers import TrainingArguments, AutoModelForSequenceClassification, Trainer
import evaluate
import numpy as np
# Used to calculate the model's performance metrics during evaluation
def compute_metrics(eval_preds):
    metric = evaluate.load("glue", "mrpc")
    logits, labels = eval_preds
    predictions = np.argmax(logits, axis=-1)
    return metric.compute(predictions=predictions, references=labels)
# Define the model
training_args = TrainingArguments("test-trainer", evaluation_strategy="epoch")
model = AutoModelForSequenceClassification.from_pretrained(checkpoint, num_labels=2)
# Create Trainer
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
The `compute_metrics` function is used to calculate the model's performance metrics during evaluation.
- `evaluate.load` loads the evaluation metrics for the MRPC task in the GLUE dataset
- `metric.compute` uses the loaded metric to calculate the performance between predictions and true labels
Define the model
- `training_args` specifies the output directory for the new training model as "test-trainer" and sets the evaluation strategy to evaluate after each epoch.
- `AutoModelForSequenceClassification.from_pretrained` loads a pre-trained model for sequence classification
- `num_labels=2` indicates that the model output has two categories, suitable for binary classification tasks like MRPC
Create Trainer
- `train_dataset` and `eval_dataset` specify the datasets to be used for training and evaluation, respectively.
- `data_collator` is used to organize the data into the format required by the model.
- `tokenizer` is used for processing text data.
- `compute_metrics` specifies the function to be used for metric calculation during evaluation.
After performing these operations, the model will start training, and relevant evaluation metrics will be output during the training process.
```bash
{'eval_loss': 0.3850872814655304, 'eval_accuracy': 0.8480392156862745, 'eval_f1': 0.8945578231292517, 'eval_runtime': 2.3665, 'eval_samples_per_second': 172.405, 'eval_steps_per_second': 21.551, 'epoch': 1.0}                                                                                                                                      
{'loss': 0.541, 'grad_norm': 6.380190372467041, 'learning_rate': 3.184458968772695e-05, 'epoch': 1.09}                                                                     
{'eval_loss': 0.4046363830566406, 'eval_accuracy': 0.8676470588235294, 'eval_f1': 0.9078498293515358, 'eval_runtime': 2.2491, 'eval_samples_per_second': 181.402, 'eval_steps_per_second': 22.675, 'epoch': 2.0}                                                                                                                                      
{'eval_loss': 0.6162229180335999, 'eval_accuracy': 0.8676470588235294, 'eval_f1': 0.9084745762711864, 'eval_runtime': 2.3316, 'eval_samples_per_second': 174.988, 'eval_steps_per_second': 21.874, 'epoch': 3.0}                                                                                                                                      
{'train_runtime': 115.26, 'train_samples_per_second': 95.471, 'train_steps_per_second': 11.947, 'train_loss': 0.35547709967142965, 'epoch': 3.0}
```
## References
[Hugging Face Natural Language Processing Tutorial (Official)](https://www.bilibili.com/video/BV1P54y1H7Xj?p=21&vd_source=f0f3c9343fe5f087ee05fae9ec07ef38)
[Hugging Face Official Tutorial | Fine-tuning a model with the Trainer API](https://huggingface.co/learn/nlp-course/en/chapter3/3?fw=pt)
[Transformers Documentation | BERT Parameters](https://huggingface.co/docs/transformers/en/model_doc/bert)

