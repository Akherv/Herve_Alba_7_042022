const comboboxToggle = (type) => {

    // create the style of custom combobox
    const openCombobox = (type) => {
        const btnComboboxContainer = document.querySelector(`#dropdown-input-${type}`);
        const btn = document.querySelector(`#btn-${type}`);
        const input = document.querySelector(`#input-${type}`);
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
        const btn = document.querySelector(`#btn-${type}`);
        const input = document.querySelector(`#input-${type}`);
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

    // manage the opening toogle
    const toggleOpeningCombobox = () => {
        const btn = document.querySelector(`#btn-${type}`);

        if (btn.classList.contains('btn-input-show')) {
            closeCombobox(type);
        } else {
            document.querySelectorAll('.dropdown-toggle').forEach(btn => {
                if (btn.classList.contains('btn-input-show')) {
                    const otherType = btn.dataset.type;
                    closeCombobox(otherType);
                }
            });
            openCombobox(type);
        }
        closeOnClickOutside();
    }

    // close combobox on click outside the combobox element
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