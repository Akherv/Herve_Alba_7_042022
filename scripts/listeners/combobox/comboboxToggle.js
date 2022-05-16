const comboboxToggle = (type) => {

    // create the style of custom combobox
    const openCombobox = (type) => {
        const btnComboboxContainer = document.querySelector(`#dropdown-input-${type}`);
        const input = document.querySelector(`#input-${type}`);
        const btn = document.querySelector(`#btn-${type}`);
        const list = document.querySelector(`#${type}-list`);

        btnComboboxContainer.classList.add('container-input-show');
        btn.classList.add('btn-input-show');
        btn.classList.add('show');
        btn.firstChild.textContent = '';
        input.classList.add('input-show');
        list.classList.add('show');
        list.style.top = '98%';
    }

    // remove the style of custom combobox
    const closeCombobox = (type) => {
        const btnComboboxContainer = document.querySelector(`#dropdown-input-${type}`);
        const input = document.querySelector(`#input-${type}`);
        const btn = document.querySelector(`#btn-${type}`);
        const list = document.querySelector(`#${type}-list`);
        const form = document.querySelector(`#form-${type}`);

        btnComboboxContainer.classList.remove('container-input-show');
        btn.classList.remove('btn-input-show');
        btn.classList.remove('show');
        btn.firstChild.textContent = (type == 'appliances') ? 'appareils' : type;
        input.classList.remove('input-show');
        list.classList.remove('show');
        form.reset();
    }

    const toggleOpeningCombobox = () => {
        const btn = document.querySelector(`#btn-${type}`);

        if (btn.classList.contains('btn-input-show')) {
            closeCombobox(type);
        } else {
            const allDropdown = document.querySelectorAll('.dropdown-toggle');
            for (let i = 0; i < allDropdown.length; i++) { 
                if (allDropdown[i].classList.contains('btn-input-show')) {
                    const otherType = allDropdown[i].dataset.type;
                    closeCombobox(otherType);
                }
            }
            openCombobox(type);
        }
        closeOnClickOutside();
    }

    const closeOnClickOutside = () => {
        const insideEl = document.querySelector(`#form-${type}`);

        document.addEventListener('click', function (event) {
            const isClickInside = insideEl.contains(event.target);
         
            if (!isClickInside) {
                closeCombobox(type);
            }
        })
    }

    return {
        closeCombobox,
        toggleOpeningCombobox,
        closeOnClickOutside
    };

}

export default comboboxToggle;