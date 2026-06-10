count = int(input("enter the list size: "))
u_data = []

for i in range(count):
    u_data.append(int(input()))

even_total = 0
odd_total = 0
for x in u_data:
    if x % 2 == 0:
        even_total += x
    else:
        odd_total += x

listA = u_data[:]

listB = u_data[:]
listB.append(even_total)

listC = u_data[:]
listC.insert(1, odd_total)

listD = listC[:3]

print("Original List:", listA)
print("List after appending sum of even numbers:", listB)
print("List after inserting sum of odd numbers at index 1:", listC)

listC.pop()
print("List after removing last element:", listC)

sum_all = sum(u_data)
print("total is:", sum_all)

average_val = sum_all / len(u_data)
print("Average:", average_val)
