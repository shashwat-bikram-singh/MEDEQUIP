seats = int(input("Enter seats available: "))
tickets = int(input("Enter tickets requested: "))
if tickets % 2 != 0:
    print("Invalid ticket count")
elif tickets > seats:
    print("Insufficient seats")
else:
    seats -= tickets
    print(seats)