import random

letters = "qwertyuiopasdfghjklzxcvbnm"
numbers = "1234567890"
specialnumbers = "[];'./,)(*&^%$#@!~)+=-_"

strength = input("choose : weak/medium/strong: ")

if strength == "weak":
    all_chars = letters
elif strength == "medium":
    all_chars = letters + numbers
else:
    all_chars = letters + numbers + specialnumbers

length = int(input("enter the password length: "))

password = ""

for i in range(length):
    password += random.choice(all_chars)

print("your password:", password)
