from flask import Flask, request, jsonify
from transformers import AutoModelForCausalLM, AutoTokenizer

app = Flask(__name__)

model_name = "microsoft/DialoGPT-small"
tokenizer = AutoTokenizer.from_pretrained(model_name, padding_side='left')
model = AutoModelForCausalLM.from_pretrained(model_name)

@app.route('/generate', methods=['POST'])
def generate_response():
    # user input
    data = request.get_json()

    # encode new input, add to history
    input_text = data.get("text", "")
    newInput = tokenizer.encode(input_text + tokenizer.eos_token, return_tensors='pt')
    botInput = newInput

    # generate response
    output = model.generate(botInput, max_length=50, pad_token_id=tokenizer.eos_token_id)
    response = tokenizer.decode(output[:, botInput.shape[-1]:][0], skip_special_tokens=True, 
                                padding_size="left")

    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
