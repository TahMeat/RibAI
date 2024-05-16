import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
import warnings

# transformer library has an internal error that displays the wrong warning.
warnings.filterwarnings("ignore", message="A decoder-only architecture is being used, but right-padding was detected!")


MAX_LENGTH_AI = 1000
CHAT_HISTORY = 15

if __name__ == "__main__":
    # set up pre-trained model
    tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium", padding_side='left')
    model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")

    # start conversation
    history, chatOutput = [], None

    print("Rib-AI, using DialoGPT, is ready to chat, type \"quit\" to exit.")

    while True:
        # user input
        userInput = input(">> User: ")
        if userInput.lower() == "quit":
            break

        # encode new input, add to history
        newInput = tokenizer.encode(userInput + tokenizer.eos_token, return_tensors='pt')
        botInput = torch.cat([chatOutput.clone().detach(), newInput], dim=-1) if history else newInput

        # generate response
        chatOutput = model.generate(botInput, max_length=MAX_LENGTH_AI, pad_token_id=tokenizer.eos_token_id)
        response = tokenizer.decode(chatOutput[:, botInput.shape[-1]:][0], skip_special_tokens=True,
                                    padding_size="left")

        print("Rib-AI: " + response)

        # update history
        if history:
            history[-1] = chatOutput
        else:
            history.append(chatOutput)
        history = history[-CHAT_HISTORY:]
