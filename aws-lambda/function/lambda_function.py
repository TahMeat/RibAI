import json
from transformers import AutoModelForCausalLM, AutoTokenizer

model_name = "microsoft/DialoGPT-small"
tokenizer = AutoTokenizer.from_pretrained(model_name, padding_side='left')
model = AutoModelForCausalLM.from_pretrained(model_name)

def handler(event, context):
    # encode new input
    input_text = event.get("text", "")
    newInput = tokenizer.encode(input_text + tokenizer.eos_token, return_tensors='pt')
    botInput = newInput

    # generate response
    output = model.generate(botInput, max_length=50, pad_token_id=tokenizer.eos_token_id)
    response = tokenizer.decode(output[:, botInput.shape[-1]:][0], skip_special_tokens=True, 
                                padding_size="left")

    return {
        'statusCode': 200,
        'body': json.dumps({'response': response})
    }