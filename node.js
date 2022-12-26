
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var today  = new Date();
const complete_date=today.toLocaleDateString("en-US", options);
const date_array= complete_date.split(",")
let day= date_array[0]
let date= date_array[1]
let year= date_array[2]

const day_el= document.createElement("div")
day_el.classList.add("day")
day_el.innerText=day;

const date_el= document.createElement("div")
date_el.classList.add("date")
date_el.innerText= date+","+year;


const date_box_el= document.getElementById("date_box")
date_box_el.classList.add("main_date_box")

date_box_el.appendChild(day_el)
date_box_el.appendChild(date_el)



const item_list_el= document.getElementById("item_list")
const pinned_elements_el= document.getElementById("pinned_elements")
const line_el= document.getElementById("line")

const itemSet = localStorage.getItem('val') !== null

if(!itemSet){
    all_items=[]
}
function localsthandler(){
    all_items= JSON.parse(localStorage.getItem("val"))

    all_items.sort((a, b) => a.val.localeCompare(b.val));
    console.log(all_items)
    all_items.forEach((item)=>{
        if(item.val!=""){
            const input_field_text_el= document.getElementById("input_field_text")
            input_field_text_el.value= item.val
            addinput(1, item.memo, item.pin, item.mar)

        }
   
    })
}

if(itemSet){
    localsthandler()
}

function addinput(localcheck, memo="", pin=false, mar= false){    
    const input_field_text_el= document.getElementById("input_field_text")
    input= input_field_text_el.value
    if(localcheck===0){                      //checking whether its local storage input or newly entered
        temp_dict={"val": input, "pin" : false, "mar": false, "memo":""}
        all_items.push(temp_dict)    
        localStorage.setItem("val",JSON.stringify(all_items))

    }
    const item_el= document.createElement("div")
    item_el.classList.add("item")

    const pinned_object_el= document.createElement("div")
    pinned_object_el.classList.add("pinned_object")
    pinned_object_el.innerHTML= `<i class="fa-solid fa-thumbtack"></i>`


    const  container_el= document.createElement("label")
    container_el.classList.add("container")

    const check_box_def_el= document.createElement("input")
    check_box_def_el.setAttribute("type", "checkbox")

    const checkmark_el= document.createElement("span")
    checkmark_el.classList.add("checkmark")

    container_el.appendChild(check_box_def_el)
    container_el.appendChild(checkmark_el)

    const item_text_box_el= document.createElement("div")
    item_text_box_el.classList.add("item_text_box")

    const item_text_el = document.createElement("label")
    item_text_el.classList.add("item_text")
    item_text_el.innerText=input

    const item_memo_el= document.createElement("input")
    item_memo_el.classList.add("item_memo")
    item_memo_el.setAttribute("readonly", "readonly")



    item_text_box_el.appendChild(item_text_el)
    item_text_box_el.appendChild(item_memo_el)





    const dorpdown_el= document.createElement("div")
    dorpdown_el.classList.add("dropdown")
    // dorpdown_el.setAttribute("id","drp");

    dorpdown_el.innerHTML= ` <i class="fa-solid fa-ellipsis" id="menu" ></i> `

    const dropdown_content_el= document.createElement("dropdown_content")
    dropdown_content_el.classList.add("dropdown-content")

    const delete_el= document.createElement("div")
    delete_el.innerHTML= `<i class="fa-solid fa-trash-can"></i>` + "Delete"

    const notes_el= document.createElement("div")
    notes_el.innerHTML=  `<i class="fa-solid fa-clipboard"></i>` + "Add a memo"

    const pin_el= document.createElement("div")

    pin_el.setAttribute("id","pindiv");
    pin_el.innerHTML= `<i class="fa-solid fa-thumbtack"></i>` + "Pin" 



    dropdown_content_el.appendChild(delete_el)
    dropdown_content_el.appendChild(notes_el)
    dropdown_content_el.appendChild(pin_el)


    dorpdown_el.appendChild(dropdown_content_el)

    item_el.appendChild(pinned_object_el)
    item_el.appendChild(container_el)
    item_el.appendChild(item_text_box_el)
    item_el.appendChild(dorpdown_el)
   

    item_list_el.appendChild(item_el)

    input_field_text_el.value=""
    input_field_text_el.focus()

    checkmark_el.addEventListener("click", ()=>{
        temp_val= item_el.children[2].firstChild.innerText
        all_items.forEach((item)=>{
            if(item.val === temp_val){
                if (item.mar === false){
                    item.mar= true
                    localStorage.setItem("val",JSON.stringify(all_items))
                }
                else if (item.mar === true){
                    item.mar= false
                    localStorage.setItem("val",JSON.stringify(all_items))
                
                }
                
            }
        })
  
    })

    delete_el.addEventListener("click", ()=>
    {
        if (pinned_elements_el.contains(item_el))
        {
            pinned_elements_el.removeChild(item_el)
            temp_val= item_el.children[2].firstChild.innerText
            all_items.forEach((item,ind)=>{
                if (item.val===temp_val){
                    all_items.splice(ind, 1); 
                    localStorage.setItem("val",JSON.stringify(all_items))
                }
            })            
            line_el.style.display= "none"
        }

        if (item_list_el.contains(item_el))
        {
            item_list_el.removeChild(item_el)
            temp_val= item_el.children[2].firstChild.innerText
            all_items.forEach((item,ind)=>{
                if (item.val===temp_val){
                    all_items.splice(ind, 1); 
                    localStorage.setItem("val",JSON.stringify(all_items))
                }
            })
        }    
    })
    
    notes_el.addEventListener("click", ()=>{
        item_memo_el.removeAttribute("readonly")
        item_memo_el.focus()
        item_memo_el.setAttribute("placeholder","add memo here")
    
    })

    
    if(memo!=""){
        item_memo_el.value= memo
    }
    if (pin === true){
        if (pin_el.innerHTML== `<i class="fa-solid fa-thumbtack"></i>`+"remove pin"){
            pin_el.innerHTML= `<i class="fa-solid fa-thumbtack"></i>`+"Pin"
            pinned_elements_el.removeChild(item_el)
            pinned_object_el.style.display="none"
            item_list_el.appendChild(item_el)
            if (pinned_elements_el.innerHTML==""){
                line_el.style.display= "none"
            }
        }
        else{
            line_el.style.display= "block"
            pinned_object_el.style.display="block"
            item_list_el.removeChild(item_el)
            pinned_elements_el.style.display="block"
            pinned_elements_el.appendChild(item_el)
            pin_el.innerHTML= `<i class="fa-solid fa-thumbtack"></i>`+"remove pin"

        }
    }
    if(mar === true ){
        check_box_def_el.click()
    }
    item_memo_el.addEventListener("keypress",(e)=>{
        if(e.key ==="Enter")
        {
            temp_val=item_memo_el.previousSibling.innerText
            all_items.forEach((item)=>{
                if(item.val===temp_val){
                    item.memo= item_memo_el.value
                    localStorage.setItem("val",JSON.stringify(all_items))
                }
            })
            item_memo_el.setAttribute("readonly", "readonly")
        }
    })

    pin_el.addEventListener("click", ()=>{   
        if (pin_el.innerHTML== `<i class="fa-solid fa-thumbtack"></i>`+"remove pin")
        {
            temp_val= item_el.children[2].firstChild.innerText
            all_items.forEach((item)=>{
                item.val = item.val.replace(/\s/g, '');
                if(item.val === temp_val){
                    if(item.pin=== false){
                        item.pin= true
                        localStorage.setItem("val",JSON.stringify(all_items))
                    }
                    else if (item.pin === true){
                        item.pin= false
                        localStorage.setItem("val",JSON.stringify(all_items))
                    }
                    
                }
            })
            console.log(all_items)
            pin_el.innerHTML= `<i class="fa-solid fa-thumbtack"></i>`+"Pin"
            pinned_elements_el.removeChild(item_el)
            pinned_object_el.style.display="none"
            item_list_el.appendChild(item_el)
            if (pinned_elements_el.innerHTML==""){
                line_el.style.display= "none"
            }
            location.reload()
        }
        else{
            temp_val= item_el.children[2].firstChild.innerText
            console.log("temp value", temp_val)
            all_items.forEach((item)=>{
                item.val = item.val.replace(/\s/g, '');
                if(item.val === temp_val){
                    console.log("item", item)
                    if(item.pin === false){
                        item.pin= true
                        localStorage.setItem("val",JSON.stringify(all_items))
                    }
                    else if (item.pin === true){
                        item.pin= false
                        localStorage.setItem("val",JSON.stringify(all_items))
                    }
                    
                }
            })
            line_el.style.display= "block"
            pinned_object_el.style.display="block"
            item_list_el.removeChild(item_el)
            pinned_elements_el.style.display="block"
            pinned_elements_el.appendChild(item_el)
            pin_el.innerHTML= `<i class="fa-solid fa-thumbtack"></i>`+"remove pin"
            location.reload()


        }
        
        

    })
    document.addEventListener("click",(e)=>{
        if(e.target.id!=="menu"){
            dropdown_content_el.style.display="none"

        }
    })

    dorpdown_el.addEventListener("click", ()=>{
        if (dropdown_content_el.style.display==="block"){
            dropdown_content_el.style.display="none"
        }
        else
        dropdown_content_el.style.display="block"
    })
}



const input_field_text_el= document.getElementById("input_field_text")
input_field_text_el.addEventListener("keypress",(e)=> {
        if(e.key ==="Enter"){
            addinput(0)
            location.reload()
        }
})





