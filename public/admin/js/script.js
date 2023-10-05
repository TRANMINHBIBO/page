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

// alert
const showAlert = document.querySelector("[show-alert]");

if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]");
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time);
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    })
}
// preview image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    uploadImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file);
        }

    });
}
// end preview image

// delete-image-preview
const buttonDeletePreviewImage = document.querySelector("[button-delete-previewImage]");
if(buttonDeletePreviewImage){
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    buttonDeletePreviewImage.addEventListener("click", () => {
        uploadImageInput.value = "";
        uploadImagePreview.src = "";
    }) 
}
// end-image-preview

// sort
const sort = document.querySelector("[sort]");
if(sort){
    let url = new URL(window.location.href);
    const sortSelect = sort.querySelector("[sort-select]");
    const sortClear = sort.querySelector("[sort-clear]");
    sortSelect.addEventListener("change", (e) => {
        const value = e.target.value;
        console.log(value.split("-"));
        const [sortKey, sortValue] = value.split("-");
        url.searchParams.set("sortKey", sortKey);
        url.searchParams.set("sortValue", sortValue);
        window.location.href = url.href;
    })
    sortClear.addEventListener("click", () => {
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");
        window.location.href = url.href;
    })

    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");
    if(sortKey && sortValue){
        const stringSort = `${sortKey}-${sortValue}`;
        const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`);
        optionSelected.selected = true;
    }
}
// end sort