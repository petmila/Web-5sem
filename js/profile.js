function openProfile(event, content_id) {
    var i, profile_blocks, buttons;

    profile_blocks = document.getElementsByClassName("profile_block");
    for (i = 0; i < profile_blocks.length; i++) {
        profile_blocks[i].style.display = "none";
    }

    buttons = document.getElementsByClassName("profile_horisontal_menu__button");
    for (i = 0; i < buttons.length; i++) {
        buttons[i].className = buttons[i].className.replace(" active", "");
    }

    document.getElementById(content_id).style.display = "block";
    event.currentTarget.className += " active";
}

function addBookToProfile(event) {
    var add_button_form = event.currentTarget.parentElement;
    const texts = {
        name: 'Название:',
        author: 'Автор:',
        year: 'Год издания:',
        condition: 'Состояние:',
        description: 'Описание:'
    }
    let book_info = createBookInfo(texts, true); 
    add_button_form.parentElement.insertBefore(book_info, add_button_form);
}

function handleBookInfoInputForm(event) {
    event.preventDefault();
    var i, texts, text_content;
    let input_value = event.currentTarget.querySelector('input').value;
    texts = event.currentTarget.parentElement.getElementsByClassName('book_information__book_info_line');
    for (i = 0; i < texts.length; i++) {
        text_content = texts[i].innerText.split([':'])
        if (text_content[1] === '') {
            texts[i].innerHTML += ' ' + input_value;
            if (text_content[0] === 'Описание'){
                saveNewBookInProfile(event.currentTarget.parentElement);
            }
            break;
        }
    }
}

function saveNewBookInProfile(book_info){
    book_info.querySelector('form').remove();
    let div_buttons = document.createElement('div');
    let form_buttons = document.createElement("form");
    let delete_button = document.createElement("input");
    delete_button.className = 'profile_block__button';
    delete_button.value = 'Удалить';
    delete_button.type = 'button';
    form_buttons.appendChild(delete_button);
    div_buttons.className = 'book_information__buttons_line';
    div_buttons.appendChild(form_buttons);
    book_info.appendChild(div_buttons);
    let info_lines = book_info.getElementsByClassName('book_information__book_info_line');
    const new_book_dict = {
        name: info_lines[0].textContent,
        author: info_lines[1].textContent,
        year: info_lines[2].textContent,
        condition: info_lines[3].textContent,
        description: info_lines[4].textContent
    }
    localStorage.setItem(localStorage.length + 1, JSON.stringify(new_book_dict));
}

function createBookInfoLine(name) {
    let line = document.createElement('p');
    line.className = 'book_information__book_info_line';
    let b_name = document.createElement('b');
    let name_content = name.split([':']);
    b_name.textContent = name_content[0] + ':';
    line.appendChild(b_name);
    line.innerHTML += ' ' + name_content[1];
    return line;
}

function createBookInfo(texts, required_input_flag) {
    let book_div = document.createElement("div");
    book_div.className = 'book_information';
    let book_image = document.createElement("img");
    book_image.className = 'book_information__book_image';
    book_div.appendChild(book_image);
    let book_text = document.createElement("div");
    book_text.className = 'book_information__book_info_text';
    book_text.appendChild(createBookInfoLine(texts['name']));
    book_text.appendChild(createBookInfoLine(texts['author']));
    book_text.appendChild(createBookInfoLine(texts['year']));
    book_text.appendChild(createBookInfoLine(texts['condition']));
    book_text.appendChild(createBookInfoLine(texts['description']));
    if (required_input_flag){
        let form_input = document.createElement("form");
        form_input.id = 'book_info_input_form'; 
        let input = document.createElement("input");
        form_input.addEventListener('submit', handleBookInfoInputForm);
        form_input.appendChild(input);
        book_text.appendChild(form_input);
    } else {
        let div_buttons = document.createElement('div');
        let form_buttons = document.createElement("form");
        let delete_button = document.createElement("input");
        delete_button.className = 'profile_block__button';
        delete_button.value = 'Удалить';
        delete_button.type = 'button';
        form_buttons.appendChild(delete_button);
        div_buttons.className = 'book_information__buttons_line';
        div_buttons.appendChild(form_buttons);
        book_text.appendChild(div_buttons);
    }
    book_div.appendChild(book_text);
    return book_div;
}

(function loadProfileFromLocalStorage(){
    let add_button_form = document.getElementById('book_to_profile_add_button').parentElement;
    if (localStorage.length != 0) {
        for (let i = 0; i < localStorage.length; i++) {
            let id = localStorage.key(i);
            let info = JSON.parse(localStorage.getItem(id));
            let book = createBookInfo(info, false);
            add_button_form.parentElement.insertBefore(book, add_button_form);
        }
    }
}());

document.getElementById('my_books').style.display = "block";