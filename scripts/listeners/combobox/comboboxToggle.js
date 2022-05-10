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
        list.style.top = '100%';
    }

    // remove the style of custom combobox
    const closeCombobox = (type) => {
    const btnComboboxContainer = document.querySelector(`#dropdown-input-${type}`);
    const input = document.querySelector(`#input-${type}`);
    const btn = document.querySelector(`#btn-${type}`);
    const list = document.querySelector(`#${type}-list`);

        btnComboboxContainer.classList.remove('container-input-show');
        btn.classList.remove('btn-input-show');
        btn.classList.remove('show');
        btn.firstChild.textContent = (type == 'appliances') ? 'appareils' : type;
        input.classList.remove('input-show');
        list.classList.remove('show');
    }

    const toggleOpeningCombobox = () => {
    const btn = document.querySelector(`#btn-${type}`);

        if (btn.classList.contains('btn-input-show')) {
            closeCombobox(type)
        } else {
            document.querySelectorAll('.dropdown-toggle').forEach(btn=> {
                if(btn.classList.contains('btn-input-show')) {
                //     const otherType = btn
                //     console.log(otherType)
                const otherType = btn.classList[0]
                closeCombobox(otherType)
                console.log(otherType)
                } 
            });

            openCombobox(type)
        }
    }

    return {
        closeCombobox,
        toggleOpeningCombobox
    }

}


export default comboboxToggle