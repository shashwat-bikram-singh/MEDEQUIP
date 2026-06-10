x = "who wants to be a millionaire"
print(x.center(100))

questions = [
    {"q": "Which animal is known as the 'King of the Jungle'?", "opts": ["A. Tiger", "B. Lion", "C. Elephant", "D. Leopard"], "ans": "B"},
    {"q": "What is H₂O commonly known as?", "opts": ["A. Salt", "B. Water", "C. Sugar", "D. Oxygen"], "ans": "B"},
    {"q": "Which fruit is famous for keeping the doctor away?", "opts": ["A. Apple", "B. Banana", "C. Grapes", "D. Mango"], "ans": "A"},
    {"q": "How many continents are there in the world?", "opts": ["A. 5", "B. 6", "C. 7", "D. 8"], "ans": "C"},
    {"q": "Which color is a mix of red and blue?", "opts": ["A. Green", "B. Purple", "C. Yellow", "D. Orange"], "ans": "B"},
    {"q": "Who is known as the \"Father of Computers\"?", "opts": ["A. Charles Babbage", "B. Alan Turing", "C. Bill Gates", "D. Steve Jobs"], "ans": "A"},
    {"q": "What is the hardest natural substance on Earth?", "opts": ["A. Gold", "B. Iron", "C. Diamond", "D. Platinum"], "ans": "C"},
    {"q": "Which country hosted the 2016 Summer Olympics?", "opts": ["A. China", "B. Brazil", "C. Japan", "D. Russia"], "ans": "B"},
    {"q": "What is the main gas found in the air we breathe?", "opts": ["A. Oxygen", "B. Nitrogen", "C. Carbon dioxide", "D. Hydrogen"], "ans": "B"},
    {"q": "Which organ in the human body pumps blood?", "opts": ["A. Brain", "B. Lungs", "C. Kidney", "D. Heart"], "ans": "D"}
]

levels = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]

total_money = 0

for i in range(len(questions)):
    question = questions[i]
    print(f"\nQuestion for Rs. {levels[i]}:")
    print(question['q'])
    for opt in question['opts']:
        print(opt)
    
    reply = input("Enter your answer (A-D): ").strip().upper()
    
    if reply == question['ans']:
        print(f"Correct answer! You have won Rs. {levels[i]}.")
        total_money += levels[i]
    else:
        print("Wrong answer!")
        break

print(f"\nGame over! You won a total of Rs. {total_money}.")


