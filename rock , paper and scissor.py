import random
test = "Rock, Paper and Scissors"
print(test.center(100))
choices = ["rock", "paper", "scissors"]
rounds = int(input("\nHow many matches do you want to play? "))
user_score = 0
computer_score = 0
for i in range(1, rounds + 1):
    print(f" Round {i} ")
    user = input("Enter your choice (rock/paper/scissors): ").lower().strip()

    if user == "r":
        user = "rock"
    elif user == "p":
        user = "paper"
    elif user == "s":
        user = "scissors"
    if user not in choices:
        print("Invalid choice! Round skipped.")
        continue
    computer = random.choice(choices)
    print("You chose:", user)
    print("Computer chose:", computer)
    if user == computer:
        print("It's a tie!! ")
    elif (user == "rock" and computer == "scissors") or \
         (user == "paper" and computer == "rock") or \
         (user == "scissors" and computer == "paper"):
        print("You win this round! ")
        user_score += 1
    else:
        print("Computer wins this round! ")
        computer_score += 1
print("Final Result")
print(f"You: {user_score} | Computer: {computer_score}")
if user_score > computer_score:
    print(" You won the match!")
elif user_score < computer_score:
    print(" Computer won the match!")
else:
    print(" It's a tie overall!")
