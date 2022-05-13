import { cleanValue, cleanValueArrAppliances } from "../../utils/cleanValues.js";
import { refreshArrFilteredRecipes, refreshArrSearchValues } from "../../searchAlgos/refreshAll.js";
import displayAll from "../../display/displayAll.js";
import { displaySearchBarCheckAppliances } from "../../display/displayAppliances.js";

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
            closeCombobox(type)
        } else {
            document.querySelectorAll('.dropdown-toggle').forEach(btn => {
                if (btn.classList.contains('btn-input-show')) {
                    const otherType = btn.dataset.type
                    closeCombobox(otherType)
                }
            });
            openCombobox(type)
        }
        closeOnClickOutside()
    }

    const closeOnClickOutside = () => {
        let insideEl = document.querySelector(`#form-${type}`);
        document.addEventListener('click', function (event) {
            const searchValue = cleanValue(event.target.value);
            let isClickInside = insideEl.contains(event.target)
            let isClickInsideChild = [...insideEl.children].forEach(child=>{
                child.parentElement.contains(event.target)
            });

            if (!isClickInside) {
                closeCombobox(type) 
            }
        })
    }

    return {
        closeCombobox,
        toggleOpeningCombobox,
        closeOnClickOutside
    }

}


export default comboboxToggle