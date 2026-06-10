a = "to do- list"
print(a.center(100))

def task():
    tasks = []
    print("-------------WELCOME TO TASK MANAGEMENT--------------")
    try:
        total_task = int(input("Enter how many tasks you want to add: "))
    except ValueError:
        print("Invalid input. Please enter a number.")
        return
    
    for i in range(1, total_task + 1):
        task_name = input(f"Enter the task {i}: ")
        tasks.append(task_name)
    
    print("Today's tasks are:", tasks)  
    
    while True:
        try:
            operation = int(input("Enter 1-add\n2-update\n3-delete\n4-view\n5-exit: "))
        except ValueError:
            print("Invalid input. Please enter a number.")
            continue
        
        if operation == 1:
            add = input("Enter the task you want to add: ")
            tasks.append(add)
            print(f"Task '{add}' has been successfully added.")
        
        elif operation == 2:
            updated_var = input("Enter the task you want to update: ")
            if updated_var in tasks:
                up = input("Enter new task: ")
                ind = tasks.index(updated_var)
                tasks[ind] = up
                print(f"Updated task to '{up}'.")
            else:
                print("Task not found.")
        
        elif operation == 3:
            deleted_var = input("Enter which task you want to delete: ")
            if deleted_var in tasks:
                ind = tasks.index(deleted_var)
                del tasks[ind]
                print(f"Task '{deleted_var}' has been deleted.")
            else:
                print("Task not found.")
        
        elif operation == 4:
            print(f"Total tasks: {tasks}")
        
        elif operation == 5:
            print("Closing the program.")
            break
        
        else:
            print("Invalid input.")


task()
