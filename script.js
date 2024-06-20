 let tasks=
    [
        {
            title:" ",
            date:"",
            isDone:false
        },
     
    ];
    function getTaskFromStorage(){
    tasks=JSON.parse(localStorage.getItem("taskObj"))??[];
    }
    getTaskFromStorage();
    fillTaskInThePage();


function addTask() 
{
    let currenDat=addDate();
    let newTask=prompt("أدخل عنوان المهمة");
    let taskObj=
    {
        title:newTask,
        date:currenDat,
        isDone:false
    };
    tasks.push(taskObj);
     storeTaskInStorage();
    fillTaskInThePage();
}
    

function fillTaskInThePage()
    {   let index=0;
        document.getElementById("tasks").innerHTML="";
        for (task of tasks)
        {   
            let content =
            `  
                <!--Task-->
                    <div  class="task ${task.isDone?'done':''}" >
                                    
                                    <!--task Info-->
                                    <div  style="width: 70%;margin-right: 20px;">
                                    <h3>${task.title}</h3>
                                    <span>
                                        <span class="material-symbols-outlined">
                                            calendar_month
                                        </span>
                                        ${task.date}
                                    </span>
                                    </div>
                                    <!--//task Info//-->
                                
                                    <!--task option-->
                                    <div  id="taskBtn" style="width:20%;">
                                    <button class="circular" onclick="deleteTask(${index})" style="color: aliceblue; background-color: rgb(105, 11, 11);"><span class="material-symbols-outlined">
                                        delete
                                    </span></button>
                                   ${task.isDone ? `
                                     <button  class="circular" onclick="taskIsDone(${index})" style="color: aliceblue;background-color: rgb(108, 83, 101);"><span class="material-symbols-outlined">
                                        cancel
                                    </span></button>
                                   `:` 
                                   
                                   <button  class="circular" onclick="taskIsDone(${index})" style="color: aliceblue;background-color: rgb(15, 83, 24);"><span class="material-symbols-outlined">
                                        check
                                    </span></button>`} 
                                   
                                    
                                    <button class="circular" onclick="taskEdit(${index})" style="color: aliceblue;background-color: rgb(87, 69, 226);"><span class="material-symbols-outlined">
                                        edit
                                    </span></button>
                                    </div>
                                    <!--//task option//-->
                                </div>
                                <!--//Task//-->
            `
            document.getElementById("tasks").innerHTML+=content;
            index++;
        }
   }

function addDate()
    {
        var today = new Date();
        var day = String(today.getDate()).padStart(2, '0');
        var month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        var year = today.getFullYear();

        var currentDate = day + '-' + month + '-' + year;
        return currentDate;
      
   }

function deleteTask(index)

    { 
        let task=tasks[index];
     let beSure= confirm("هل انت متاكد من حذف "+task.title+"؟");
     if(beSure){
       tasks.splice(index,1);
        storeTaskInStorage();
       fillTaskInThePage();


        }
     
else
{
    alert("تم الغاء الحذف")
}
}


function taskIsDone(index)
{
    tasks[index].isDone=! tasks[index].isDone;
   storeTaskInStorage();
   fillTaskInThePage();
}
function taskEdit(index){
   let editTask = prompt("أدخل عنوان المهمة الجديد",tasks[index].title);
   tasks[index].title=editTask;
   tasks[index].date=addDate();
    storeTaskInStorage();
    fillTaskInThePage();
}

function storeTaskInStorage(){
   localStorage.setItem("taskObj", JSON.stringify(tasks)); 
}
