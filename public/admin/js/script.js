const buttonStatus = document.querySelectorAll("[button-status]");
if(buttonStatus.length > 0){
    let url = new URL(window.location.href);
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            if(status){
                url.searchParams.set("status", status);
            }
            else{
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
        });
    });
}
// form search
const formSearch = document.querySelector("#form-search");
if(formSearch){
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
        
        const keyword = e.target.elements.keyword.value;
        if(keyword){
            url.searchParams.set("keyword", keyword);
        }
        else{
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    })
}
// Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if(buttonPagination){
    let url = new URL(window.location.href);
    buttonPagination.forEach((button) => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page", page);
            window.location.href = url.href;
        });
    });
}
// End Pagination
// checkboxMulti
const checkBoxMulti = document.querySelector("[checkbox-multi]");
if(checkBoxMulti){
    const inputCheckAll = checkBoxMulti.querySelector("input[name=checkall]");
    const inputId = checkBoxMulti.querySelectorAll("input[name=id]");
    
    inputCheckAll.addEventListener("click", () => {
        
        if(inputCheckAll.checked == true){
            inputId.forEach((input) => {
                input.checked = true;
            })
        }
        else{
            inputId.forEach((input) => {
                input.checked = false;
            })
        }
    })
    inputId.forEach((input) => {
        input.addEventListener("click", () => {
            const inputIdChecked = checkBoxMulti.querySelectorAll("input[name=id]:checked");
            if(inputIdChecked.length == inputId.length) 
                inputCheckAll.checked = true;
            else
                inputCheckAll.checked = false;
        });
    });
}

// end CheckBoxMulti


// form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const typeChange = e.target.elements.type.value;
    if(typeChange == "changePosition"){
        const checkBoxMulti = document.querySelector("[checkbox-multi]");
        const inputChecked = checkBoxMulti.querySelectorAll("input[name='id']:checked");
        
        if(inputChecked.length > 0){
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");
            inputChecked.forEach((input) => {
                const id = input.value;
                const position = input
                .closest("tr")
                .querySelector("input[name='position']").value;
                ids.push(`${id}-${position}`);
                inputIds.value = ids.join(", ");
            });
            formChangeMulti.submit();
        }
        else{
            alert("chọn sản phẩm");
        }

    }
    else{
        
        if(typeChange == "deleted"){
            const isConfirm = confirm("Có chắc chắn xoá ?");
            if(!isConfirm){
                return;
            }
        }
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll(
            "input[name='id']:checked"
        );

        if(inputsChecked.length > 0) {
        let ids = [];
        const inputIds = formChangeMulti.querySelector("input[name='ids']");

        inputsChecked.forEach(input => {
            const id = input.value;
            ids.push(id);
        });

        inputIds.value = ids.join(", ");

        formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất một bản ghi!");
    }
    }
  });
}

// end form change multi